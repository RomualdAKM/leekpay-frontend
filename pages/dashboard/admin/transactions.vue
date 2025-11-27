<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Transactions</h1>
        <p class="text-gray-600">Toutes les transactions de la plateforme</p>
      </div>
      <button 
        @click="loadTransactions" 
        :disabled="loading"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
      >
        <RefreshCwIcon class="w-4 h-4 inline mr-2" :class="{ 'animate-spin': loading }" />
        Actualiser
      </button>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <label class="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Référence, email payeur, nom utilisateur..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-48">
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadTransactions"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des transactions -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading && !transactions.length" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>

      <div v-else-if="error" class="p-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center gap-2">
            <AlertCircleIcon class="w-5 h-5 text-red-600" />
            <p class="text-red-800 font-medium">Erreur de chargement</p>
          </div>
          <p class="text-red-600 text-sm mt-1">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="!transactions.length" class="p-6 text-center">
        <CreditCardIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">Aucune transaction trouvée</p>
      </div>

      <div v-else>
        <!-- Desktop: Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lien
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auteur
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fournisseur
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Méthode
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-mono text-gray-900">{{ transaction.transaction_reference }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ transaction.payment_link?.title || 'N/A' }}</div>
                  <div class="text-xs text-gray-500">{{ transaction.payment_link?.custom_url }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <UserIcon class="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ transaction.user?.name }}</div>
                      <div class="text-xs text-gray-500">{{ transaction.user?.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ transaction.payer_email || 'N/A' }}</div>
                  <div class="text-xs text-gray-500">{{ transaction.payer_phone || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ formatProvider(transaction.payment_provider) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatPaymentMethod(transaction.payment_method) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">
                    {{ formatCurrency(transaction.amount, transaction.currency?.code) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(transaction.status)"
                  >
                    {{ getStatusLabel(transaction.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile: Cards -->
        <div class="md:hidden space-y-4 p-4">
          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-xs font-mono text-gray-500">{{ transaction.transaction_reference }}</div>
                  <div class="text-sm font-medium text-gray-900 mt-1">{{ transaction.payment_link?.title || 'N/A' }}</div>
                </div>
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(transaction.status)"
                >
                  {{ getStatusLabel(transaction.status) }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div class="text-xs text-gray-500">Auteur</div>
                  <div class="font-medium text-gray-900">{{ transaction.user?.name }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Client</div>
                  <div class="text-gray-900">{{ transaction.payer_email || 'N/A' }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Fournisseur</div>
                  <div class="font-medium text-gray-900">{{ formatProvider(transaction.payment_provider) }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Méthode</div>
                  <div class="text-gray-900">{{ formatPaymentMethod(transaction.payment_method) }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Montant</div>
                  <div class="font-semibold text-gray-900">
                    {{ formatCurrency(transaction.amount, transaction.currency?.code) }}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Date</div>
                  <div class="text-gray-900">{{ formatDate(transaction.created_at) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.last_page > 1" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Affichage de {{ pagination.from }} à {{ pagination.to }} sur {{ pagination.total }} résultats
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="changePage(pagination.current_page - 1)"
                :disabled="pagination.current_page <= 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <span class="px-3 py-1 text-sm bg-green-600 text-white rounded">
                {{ pagination.current_page }}
              </span>
              <button
                @click="changePage(pagination.current_page + 1)"
                :disabled="pagination.current_page >= pagination.last_page"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  RefreshCwIcon, 
  AlertCircleIcon, 
  CreditCardIcon, 
  UserIcon 
} from 'lucide-vue-next'

// Layout dashboard et middleware admin
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

// État réactif
const transactions = ref([])
const pagination = ref(null)
const loading = ref(true)
const error = ref(null)

// Filtres
const filters = ref({
  search: '',
  status: 'all'
})

// Composables
const config = useRuntimeConfig()
const { token } = useAuth()

// Fonction pour formater les montants
const formatCurrency = (amount, currencyCode = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0
  }).format(amount || 0)
}

// Fonction pour formater les dates
const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fonction pour obtenir la classe CSS du statut
const getStatusClass = (status) => {
  const classes = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

// Fonction pour obtenir le label du statut
const getStatusLabel = (status) => {
  const labels = {
    paid: 'Payé',
    pending: 'En attente',
    failed: 'Échoué'
  }
  return labels[status] || status
}

// Fonction pour formater le provider
const formatProvider = (provider) => {
  if (!provider) return 'N/A'
  const providers = {
    'moneroo': 'Moneroo',
    'paypal': 'PayPal',
    'stripe': 'Stripe',
    'orange_money': 'Orange Money',
    'mtn_money': 'MTN Money',
    'moov_money': 'Moov Money'
  }
  return providers[provider.toLowerCase()] || provider
}

// Fonction pour formater la méthode de paiement
const formatPaymentMethod = (method) => {
  if (!method) return 'N/A'
  const methods = {
    'card': 'Carte bancaire',
    'mobile_money': 'Mobile Money',
    'paypal': 'PayPal',
    'crypto': 'Crypto-monnaie'
  }
  return methods[method.toLowerCase()] || method
}

// Charger les transactions
const loadTransactions = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: '15'
    })
    
    if (filters.value.status !== 'all') {
      params.append('status', filters.value.status)
    }
    
    if (filters.value.search.trim()) {
      params.append('search', filters.value.search.trim())
    }
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/transactions?${params}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du chargement des transactions')
    }
    
    const data = await response.json()
    
    if (data.success) {
      transactions.value = data.data.data
      pagination.value = {
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        from: data.data.from,
        to: data.data.to,
        total: data.data.total
      }
    } else {
      throw new Error(data.message || 'Erreur lors du chargement des transactions')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des transactions'
    console.error('Erreur transactions admin:', err)
  } finally {
    loading.value = false
  }
}

// Recherche avec debounce
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadTransactions()
  }, 500)
}

// Changer de page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    loadTransactions(page)
  }
}

// Charger les données au montage
onMounted(() => {
  loadTransactions()
})

// Nettoyer le timeout
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>
