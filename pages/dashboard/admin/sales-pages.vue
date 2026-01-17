<template>
  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Pages de vente</h1>
        <p class="text-sm text-gray-500">Toutes les pages de la plateforme</p>
      </div>
      <button @click="loadSalesPages" :disabled="loading" class="px-3 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50">
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
            placeholder="Titre, slug ou utilisateur..."
            class="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-40">
          <label class="block text-xs text-gray-500 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadSalesPages"
            class="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="all">Tous</option>
            <option value="published">Publiées</option>
            <option value="draft">Brouillons</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading && !salesPages.length" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="border border-red-300 p-4 text-red-700 text-sm">
      {{ error }}
    </div>

    <!-- Empty -->
    <div v-else-if="!salesPages.length" class="border border-gray-200 p-8 text-center">
      <p class="text-gray-500">Aucune page trouvée</p>
    </div>

    <!-- Liste -->
    <div v-else class="border border-gray-200 divide-y divide-gray-200">
      <div v-for="page in salesPages" :key="page.id" class="p-4 hover:bg-gray-50 transition">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-medium text-gray-900">{{ page.title }}</h3>
              <span 
                class="text-xs px-2 py-0.5"
                :class="page.is_published ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'"
              >
                {{ page.is_published ? 'Publiée' : 'Brouillon' }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ page.slug }}.leekpay.me</p>
            <div class="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>Par {{ page.user?.name }}</span>
              <span>{{ page.analytics_count || 0 }} vues</span>
              <span>{{ formatDate(page.created_at) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              v-if="page.is_published"
              :href="page.public_url"
              target="_blank"
              class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
            >
              Voir
            </a>
            <button
              @click="toggleStatus(page)"
              :disabled="toggling === page.id"
              class="px-3 py-1.5 text-sm border transition"
              :class="page.is_published ? 'text-red-600 border-red-300 hover:bg-red-50' : 'text-green-600 border-green-300 hover:bg-green-50'"
            >
              <span v-if="toggling === page.id">...</span>
              <span v-else>{{ page.is_published ? 'Dépublier' : 'Publier' }}</span>
            </button>
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

const salesPages = ref([])
const pagination = ref(null)
const loading = ref(true)
const error = ref(null)
const toggling = ref(null)
const filters = ref({ search: '', status: 'all' })

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

const loadSalesPages = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const params = new URLSearchParams({ page: page.toString(), per_page: '15' })
    if (filters.value.status !== 'all') params.append('status', filters.value.status)
    if (filters.value.search.trim()) params.append('search', filters.value.search.trim())
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/sales-pages?${params}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      salesPages.value = response.data.data
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

const toggleStatus = async (page) => {
  if (!confirm(`${page.is_published ? 'Dépublier' : 'Publier'} cette page ?`)) return
  
  try {
    toggling.value = page.id
    const response = await $fetch(`${config.public.apiBaseURL}/admin/sales-pages/${page.id}/toggle-status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      const idx = salesPages.value.findIndex(p => p.id === page.id)
      if (idx !== -1) salesPages.value[idx].is_published = !salesPages.value[idx].is_published
    }
  } catch (err) {
    alert(err.message || 'Erreur')
  } finally {
    toggling.value = null
  }
}

let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => loadSalesPages(), 500)
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) loadSalesPages(page)
}

onMounted(() => loadSalesPages())
onUnmounted(() => clearTimeout(searchTimeout))
</script>
