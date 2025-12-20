<template>
  <div class="p-2 sm:p-2 space-y-2">
    <div>
      <!-- <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Transactions</h1> -->
      <p class="text-sm text-gray-600">Historique de tous vos paiements</p>
    </div>

    <div class="bg-white">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Rechercher</label>
          <input
            v-model="searchTerm"
            @input="fetchTransactions"
            type="text"
            placeholder="Client, lien, ID..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="statusFilter"
            @change="fetchTransactions"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="all">Tous</option>
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Mode de paiement</label>
          <select
            v-model="methodFilter"
            @change="fetchTransactions"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="all">Tous</option>
            <option value="card">Carte bancaire</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">Crypto</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <p class="text-xs text-gray-600 mb-1">Revenus</p>
        <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(totalRevenue) }}</p>
      </div>
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <p class="text-xs text-gray-600 mb-1">Payées</p>
        <p class="text-2xl font-semibold text-gray-900">{{ completedCount }}</p>
      </div>
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <p class="text-xs text-gray-600 mb-1">En attente</p>
        <p class="text-2xl font-semibold text-gray-900">{{ pendingCount }}</p>
      </div>
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <p class="text-xs text-gray-600 mb-1">Échouées</p>
        <p class="text-2xl font-semibold text-gray-900">{{ failedCount }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg border border-gray-200">
      <div v-if="loading" class="text-center py-12">
        <p class="text-sm text-gray-500">Chargement...</p>
      </div>
      
      <div v-else-if="filteredTransactions.length === 0" class="text-center py-12">
        <p class="text-sm text-gray-500">Aucune transaction trouvée</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Référence</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Lien</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-600">Montant</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Mode</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-600">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              @click="viewDetails(transaction)"
              class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td class="px-4 py-3 text-sm text-gray-600">{{ transaction.transaction_reference }}</td>
              <td class="px-4 py-3">
                <div class="text-sm text-gray-900">{{ transaction.payer_name || '-' }}</div>
                <div class="text-xs text-gray-500">{{ transaction.payer_email || '-' }}</div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-700">{{ transaction.payment_link?.title || '-' }}</td>
              <td class="px-4 py-3 text-sm text-right font-medium text-gray-900">
                {{ formatCurrency(transaction.amount, transaction.currency?.code) }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ getPaymentMethodText(transaction.payment_method) }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(transaction.created_at) }}</td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(transaction.status)">{{ getStatusText(transaction.status) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="!loading && pagination.last_page > 1" class="bg-white ">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">
          {{ pagination.total }} transaction{{ pagination.total > 1 ? 's' : '' }} au total
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="changePage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-2 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>
          
          <div class="flex items-center gap-1">
            <button
              v-for="page in getPageNumbers()"
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-3 py-1 text-sm rounded-lg transition-colors',
                page === pagination.current_page
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="selectedTransaction"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeDetails"
    >
      <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-900">Détails de la transaction</h3>
          <button
            @click="closeDetails"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="px-6 py-5 space-y-5">
          <!-- Statut et référence -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Référence Transaction</p>
              <p class="text-sm text-gray-900 font-mono">{{ selectedTransaction.transaction_reference }}</p>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Statut</p>
            <span :class="getStatusClass(selectedTransaction.status)">{{ getStatusText(selectedTransaction.status) }}</span>
          </div>

          <!-- Informations du client -->
          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Informations du client</h4>
            <div class="grid grid-cols-1 gap-3">
              <div>
                <p class="text-xs text-gray-500 mb-1">Nom complet</p>
                <p class="text-sm text-gray-900">{{ selectedTransaction.payer_name || '-' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Email</p>
                <p class="text-sm text-gray-900">{{ selectedTransaction.payer_email || '-' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Téléphone</p>
                <p class="text-sm text-gray-900">{{ selectedTransaction.payer_phone || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Informations du lien -->
          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Lien de paiement</h4>
            <div>
              <p class="text-xs text-gray-500 mb-1">Titre</p>
              <p class="text-sm text-gray-900">{{ selectedTransaction.payment_link?.title || '-' }}</p>
            </div>
          </div>

          <!-- Détails financiers -->
          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Détails financiers</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Montant</p>
                <p class="text-sm font-semibold text-gray-900">
                  {{ formatCurrency(selectedTransaction.amount, selectedTransaction.currency?.code) }}
                </p>
              </div>
              <!-- <div>
                <p class="text-xs text-gray-500 mb-1">Frais LeekPay</p>
                <p class="text-sm text-gray-900">
                  {{ formatCurrency(selectedTransaction.leekpay_fee, selectedTransaction.currency?.code) }}
                </p>
              </div> -->
              <!-- <div>
                <p class="text-xs text-gray-500 mb-1">Frais agrégateur</p>
                <p class="text-sm text-gray-900">
                  {{ formatCurrency(selectedTransaction.aggregator_fee, selectedTransaction.currency?.code) }}
                </p>
              </div> -->
              <div>
                <p class="text-xs text-gray-500 mb-1">Montant net</p>
                <p class="text-sm font-semibold text-green-700">
                  {{ formatCurrency(selectedTransaction.net_amount, selectedTransaction.currency?.code) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Méthode de paiement -->
          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Paiement</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Mode de paiement</p>
                <p class="text-sm text-gray-900">{{ getPaymentMethodText(selectedTransaction.payment_method) }}</p>
              </div>
              <!-- <div>
                <p class="text-xs text-gray-500 mb-1">Fournisseur</p>
                <p class="text-sm text-gray-900">{{ selectedTransaction.payment_provider || '-' }}</p>
              </div> -->
            </div>
          </div>

          <!-- Analytics -->
          <div v-if="selectedTransaction.analytics" class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Informations supplémentaires</h4>
            <div class="grid grid-cols-1 gap-3">
              <div v-if="selectedTransaction.analytics.country">
                <p class="text-xs text-gray-500 mb-1">Pays</p>
                <p class="text-sm text-gray-900">{{ selectedTransaction.analytics.country }}</p>
              </div>
              <div v-if="selectedTransaction.analytics.referrer">
                <p class="text-xs text-gray-500 mb-1">Source (Referrer)</p>
                <p class="text-sm text-gray-900 break-all">{{ selectedTransaction.analytics.referrer }}</p>
              </div>
              <div v-if="selectedTransaction.analytics.user_agent">
                <p class="text-xs text-gray-500 mb-1">Navigateur (User Agent)</p>
                <p class="text-xs text-gray-700 break-all font-mono bg-gray-50 p-2 rounded">{{ selectedTransaction.analytics.user_agent }}</p>
              </div>
            </div>
          </div>

          <!-- Dates -->
          <div class="border-t border-gray-100 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Dates</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Date de création</p>
                <p class="text-sm text-gray-900">{{ formatDate(selectedTransaction.created_at) }}</p>
              </div>
              <div v-if="selectedTransaction.processed_at">
                <p class="text-xs text-gray-500 mb-1">Date de traitement</p>
                <p class="text-sm text-gray-900">{{ formatDate(selectedTransaction.processed_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            @click="closeDetails"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token, user } = useAuth()
const searchTerm = ref('')
const statusFilter = ref('all')
const methodFilter = ref('all')
const selectedTransaction = ref(null)
const transactions = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
})
const stats = ref({
  total_amount: 0,
  paid_transactions: 0,
  pending_transactions: 0,
  failed_transactions: 0
})
const loading = ref(false)

const viewDetails = (transaction) => {
  selectedTransaction.value = transaction
}

const closeDetails = () => {
  selectedTransaction.value = null
}

const fetchTransactions = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams()
    if (searchTerm.value) params.append('search', searchTerm.value)
    if (statusFilter.value !== 'all') params.append('status', statusFilter.value)
    if (methodFilter.value !== 'all') params.append('payment_method', methodFilter.value)
    params.append('per_page', pagination.value.per_page)
    params.append('page', pagination.value.current_page)

    const response = await fetch(`${config.public.apiBaseURL}/transactions?${params}`, {
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
    console.log('Données reçues:', data)
    console.log('Meta pagination:', data.meta)
    
    transactions.value = data.data || []
    
    if (data.meta) {
      pagination.value = {
        current_page: data.meta.current_page,
        last_page: data.meta.last_page,
        per_page: data.meta.per_page,
        total: data.meta.total
      }
      console.log('Pagination mise à jour:', pagination.value)
    }
    
    if (data.stats) {
      stats.value = data.stats
    }
  } catch (error) {
    console.error('Erreur:', error)
    transactions.value = []
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || page > pagination.value.last_page) return
  pagination.value.current_page = page
  fetchTransactions()
}

const getPageNumbers = () => {
  const pages = []
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  
  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i)
    } else if (current >= last - 2) {
      for (let i = last - 4; i <= last; i++) pages.push(i)
    } else {
      for (let i = current - 2; i <= current + 2; i++) pages.push(i)
    }
  }
  
  return pages
}

onMounted(() => {
  fetchTransactions()
})

const getStatusClass = (status) => {
  const statusValue = typeof status === 'object' ? status.value : status
  const classes = {
    completed: 'text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200',
    paid: 'text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200',
    pending: 'text-xs px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200',
    failed: 'text-xs px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200'
  }
  return classes[statusValue] || 'text-xs px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200'
}

const getStatusText = (status) => {
  const statusValue = typeof status === 'object' ? status.value : status
  const labels = {
    completed: 'Payé',
    paid: 'Payé',
    pending: 'En attente',
    failed: 'Échoué'
  }
  return labels[statusValue] || statusValue
}

const getPaymentMethodText = (method) => {
  const methodValue = typeof method === 'object' ? method.value : method
  const labels = {
    card: 'Carte bancaire',
    mobile_money: 'Mobile Money',
    paypal: 'PayPal',
    crypto: 'Crypto'
  }
  return labels[methodValue] || methodValue
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatAmount = (value) => {
  return Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

// Nouvelle fonction pour formater les montants avec devise
const formatCurrency = (amount, currencyCode) => {
  // Utiliser la devise de l'utilisateur connecté si aucune devise n'est fournie
  const code = currencyCode || user.value?.currency?.code || 'XOF'
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

const filteredTransactions = computed(() => {
  return transactions.value
})

const totalRevenue = computed(() => {
  return filteredTransactions.value
      .filter(t => {
        const status = typeof t.status === 'object' ? t.status.value : t.status
        return status === 'completed' || status === 'paid'
      })
      .reduce((sum, t) => sum + Number(t.amount || 0), 0)
})

const completedCount = computed(() => {
  return filteredTransactions.value.filter(t => {
    const status = typeof t.status === 'object' ? t.status.value : t.status
    return status === 'completed' || status === 'paid'
  }).length
})

const pendingCount = computed(() => {
  return filteredTransactions.value.filter(t => {
    const status = typeof t.status === 'object' ? t.status.value : t.status
    return status === 'pending'
  }).length
})

const failedCount = computed(() => {
  return filteredTransactions.value.filter(t => {
    const status = typeof t.status === 'object' ? t.status.value : t.status
    return status === 'failed'
  }).length
})
</script>