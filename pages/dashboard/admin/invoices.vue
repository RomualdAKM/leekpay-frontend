<template>
  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Factures</h1>
        <p class="text-sm text-gray-500">Toutes les factures de la plateforme</p>
      </div>
      <button @click="loadInvoices" :disabled="loading" class="px-3 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50">
        Actualiser
      </button>
    </div>

    <!-- Filtres -->
    <div class="border border-gray-200 p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <label class="block text-xs text-gray-500 mb-1">Rechercher</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="N° facture, client ou utilisateur..."
            class="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-40">
          <label class="block text-xs text-gray-500 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadInvoices"
            class="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="all">Tous</option>
            <option value="draft">Brouillon</option>
            <option value="sent">Envoyée</option>
            <option value="paid">Payée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading && !invoices.length" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="border border-red-300 p-4 text-red-700 text-sm">
      {{ error }}
    </div>

    <!-- Empty -->
    <div v-else-if="!invoices.length" class="border border-gray-200 p-8 text-center">
      <p class="text-gray-500">Aucune facture trouvée</p>
    </div>

    <!-- Liste -->
    <div v-else class="border border-gray-200 divide-y divide-gray-200">
      <div v-for="invoice in invoices" :key="invoice.id" class="p-4 hover:bg-gray-50 transition">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-medium text-gray-900">{{ invoice.number }}</h3>
              <span 
                class="text-xs px-2 py-0.5"
                :class="getStatusClass(invoice.status)"
              >
                {{ getStatusLabel(invoice.status) }}
              </span>
              <span v-if="invoice.is_overdue" class="text-xs px-2 py-0.5 bg-red-600 text-white">
                En retard
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ invoice.client_name }} · {{ invoice.client_email }}</p>
            <div class="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>Par {{ invoice.user?.name }}</span>
              <span>Émise le {{ formatDate(invoice.issue_date) }}</span>
              <span v-if="invoice.due_date">Échéance {{ formatDate(invoice.due_date) }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">{{ formatCurrency(invoice.total, invoice.currency?.code) }}</p>
            <p v-if="invoice.paid_amount > 0" class="text-xs text-green-600">Payé: {{ formatCurrency(invoice.paid_amount, invoice.currency?.code) }}</p>
            <a
              v-if="invoice.public_url"
              :href="invoice.public_url"
              target="_blank"
              class="inline-block mt-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
            >
              Voir
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex items-center justify-between mt-4 text-sm">
      <span class="text-gray-500">{{ pagination.from }}-{{ pagination.to }} sur {{ pagination.total }}</span>
      <div class="flex gap-2">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page <= 1"
          class="px-3 py-1 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Préc.
        </button>
        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page >= pagination.last_page"
          class="px-3 py-1 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Suiv.
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', middleware: 'admin' })

const config = useRuntimeConfig()
const { token } = useAuth()

const invoices = ref([])
const pagination = ref(null)
const loading = ref(true)
const error = ref(null)
const filters = ref({ search: '', status: 'all' })

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

const formatCurrency = (amount, code = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: code, minimumFractionDigits: 0 }).format(amount || 0)
}

const getStatusClass = (status) => {
  const classes = {
    draft: 'bg-gray-200 text-gray-600',
    sent: 'bg-blue-100 text-blue-700',
    paid: 'bg-green-600 text-white',
    cancelled: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-200 text-gray-600'
}

const getStatusLabel = (status) => {
  const labels = { draft: 'Brouillon', sent: 'Envoyée', paid: 'Payée', cancelled: 'Annulée' }
  return labels[status] || status
}

const loadInvoices = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const params = new URLSearchParams({ page: page.toString(), per_page: '15' })
    if (filters.value.status !== 'all') params.append('status', filters.value.status)
    if (filters.value.search.trim()) params.append('search', filters.value.search.trim())
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/invoices?${params}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      invoices.value = response.data.data
      pagination.value = {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
        total: response.data.total
      }
    }
  } catch (err) {
    error.value = err.message || 'Erreur de chargement'
  } finally {
    loading.value = false
  }
}

let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => loadInvoices(), 500)
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) loadInvoices(page)
}

onMounted(() => loadInvoices())
onUnmounted(() => clearTimeout(searchTimeout))
</script>
