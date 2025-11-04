<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestion des Retraits</h1>
        <p class="text-gray-600">Approuver ou rejeter les demandes de retrait</p>
      </div>
      <button 
        @click="loadWithdrawals" 
        :disabled="loading"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
      >
        <RefreshCwIcon class="w-4 h-4 inline mr-2" :class="{ 'animate-spin': loading }" />
        Actualiser
      </button>
    </div>

    <!-- Filtres -->
    <div class="bg-white">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <label class="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Nom d'utilisateur ou email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-48">
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadWithdrawals"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processed">Traité</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des retraits -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading && !withdrawals.length" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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

      <div v-else-if="!withdrawals.length" class="p-6 text-center">
        <WalletIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">Aucune demande de retrait trouvée</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Méthode
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="withdrawal in withdrawals" :key="withdrawal.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <UserIcon class="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ withdrawal.user?.name }}</div>
                    <div class="text-sm text-gray-500">{{ withdrawal.user?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(withdrawal.amount) }}
                </div>
                <div class="text-sm text-gray-500">
                  Frais: {{ formatCurrency(withdrawal.total_fees) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ withdrawal.withdrawal_method?.name }}</div>
                <div class="text-sm text-gray-500">{{ withdrawal.withdrawal_method?.type }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(withdrawal.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(withdrawal.status)"
                >
                  {{ getStatusLabel(withdrawal.status) }}
                </span>
                <!-- Badge statut payout -->
                <span 
                  v-if="withdrawal.payout_status"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2"
                  :class="getPayoutStatusClass(withdrawal.payout_status)"
                >
                  {{ getPayoutStatusLabel(withdrawal.payout_status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <!-- Bouton Payer via Moneroo -->
                  <button
                    v-if="canPayAutomatically(withdrawal)"
                    @click="openPayoutModal(withdrawal)"
                    class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                  >
                    💸 Payer via Moneroo
                  </button>
                  <button
                    v-if="withdrawal.status === 'pending'"
                    @click="openModal(withdrawal, 'processed')"
                    class="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                  >
                    Approuver
                  </button>
                  <button
                    v-if="withdrawal.status === 'pending'"
                    @click="openModal(withdrawal, 'rejected')"
                    class="text-red-600 hover:text-red-900 px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                  >
                    Rejeter
                  </button>
                  <button
                    @click="viewDetails(withdrawal)"
                    class="text-blue-600 hover:text-blue-900 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                  >
                    Détails
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
            <span class="px-3 py-1 text-sm bg-blue-600 text-white rounded">
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

    <!-- Modal de confirmation -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ modalAction === 'processed' ? 'Approuver' : 'Rejeter' }} la demande
        </h3>
        <p class="text-gray-600 mb-4">
          Êtes-vous sûr de vouloir {{ modalAction === 'processed' ? 'approuver' : 'rejeter' }} 
          cette demande de retrait de {{ formatCurrency(selectedWithdrawal?.amount) }} ?
        </p>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Notes administratives (optionnel)
          </label>
          <textarea
            v-model="adminNotes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ajouter des notes..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="updateWithdrawalStatus"
            :disabled="updating"
            class="px-4 py-2 text-white rounded-lg disabled:opacity-50"
            :class="modalAction === 'processed' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'"
          >
            {{ updating ? 'Traitement...' : (modalAction === 'processed' ? 'Approuver' : 'Rejeter') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Détails du retrait</h3>
          <button
            @click="closeDetailsModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedWithdrawalDetails" class="space-y-6">
          <!-- Informations générales -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Informations générales</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">ID de la demande</label>
                <p class="text-sm text-gray-900">#{{ selectedWithdrawalDetails.id }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Date de création</label>
                <p class="text-sm text-gray-900">{{ formatDate(selectedWithdrawalDetails.created_at) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Statut</label>
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(selectedWithdrawalDetails.status)"
                >
                  {{ getStatusLabel(selectedWithdrawalDetails.status) }}
                </span>
              </div>
              <div v-if="selectedWithdrawalDetails.processed_at">
                <label class="text-sm font-medium text-gray-600">Date de traitement</label>
                <p class="text-sm text-gray-900">{{ formatDate(selectedWithdrawalDetails.processed_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Informations utilisateur -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Utilisateur</h4>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon class="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ selectedWithdrawalDetails.user?.name }}</p>
                <p class="text-sm text-gray-600">{{ selectedWithdrawalDetails.user?.email }}</p>
                <p class="text-sm text-gray-600">ID: {{ selectedWithdrawalDetails.user?.id }}</p>
              </div>
            </div>
          </div>

          <!-- Informations financières -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Informations financières</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Montant demandé</label>
                <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(selectedWithdrawalDetails.amount) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Frais</label>
                <p class="text-lg font-semibold text-red-600">{{ formatCurrency(selectedWithdrawalDetails.total_fees) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Montant net</label>
                <p class="text-lg font-semibold text-green-600">
                  {{ formatCurrency(selectedWithdrawalDetails.amount - selectedWithdrawalDetails.total_fees) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Méthode de retrait -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Méthode de retrait</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Nom de la méthode</label>
                <p class="text-sm text-gray-900">{{ selectedWithdrawalDetails.withdrawal_method?.provider_name || 'Non spécifié' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Type</label>
                <p class="text-sm text-gray-900">{{ selectedWithdrawalDetails.withdrawal_method?.method_type || 'Non spécifié' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Numéro de compte</label>
                <p class="text-sm text-gray-900">{{ selectedWithdrawalDetails.withdrawal_method?.account_number || 'Non spécifié' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Nom du compte</label>
                <p class="text-sm text-gray-900">{{ selectedWithdrawalDetails.withdrawal_method?.account_name || 'Non spécifié' }}</p>
              </div>
            </div>
          </div>

          <!-- Notes administratives -->
          <div v-if="selectedWithdrawalDetails.admin_notes" class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-3">Notes administratives</h4>
            <p class="text-sm text-gray-700">{{ selectedWithdrawalDetails.admin_notes }}</p>
          </div>

          <!-- Actions -->
          <div v-if="selectedWithdrawalDetails.status === 'pending'" class="flex justify-end gap-3 pt-4 border-t">
            <button
              @click="openModalFromDetails('rejected')"
              class="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
            >
              Rejeter
            </button>
            <button
              @click="openModalFromDetails('processed')"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approuver
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation payout -->
    <div v-if="showPayoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          💸 Payer via Moneroo
        </h3>
        <p class="text-gray-600 mb-4">
          Êtes-vous sûr de vouloir envoyer automatiquement <strong>{{ formatCurrency(selectedWithdrawal?.net_amount) }}</strong> via Moneroo ?
        </p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
          <p class="text-sm text-blue-900">
            <strong>📌 Détails du transfert :</strong><br>
            Méthode : {{ selectedWithdrawal?.withdrawal_method?.provider_name }}<br>
            Numéro : {{ selectedWithdrawal?.withdrawal_method?.account_number }}<br>
            Bénéficiaire : {{ selectedWithdrawal?.user?.name }}
          </p>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-200">
          <p class="text-sm text-yellow-900">
            ⚠️ L'utilisateur recevra une notification email et l'argent sera envoyé automatiquement sur son compte Mobile Money.
          </p>
        </div>

        <div class="flex justify-end gap-3">
          <button
            @click="closePayoutModal"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="processPayoutAutomatically"
            :disabled="processingPayout"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {{ processingPayout ? 'Envoi en cours...' : 'Confirmer et envoyer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  RefreshCwIcon, 
  AlertCircleIcon, 
  WalletIcon, 
  UserIcon 
} from 'lucide-vue-next'

// Layout dashboard et middleware admin
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

// État réactif
const withdrawals = ref([])
const pagination = ref(null)
const loading = ref(true)
const error = ref(null)
const updating = ref(false)

// Filtres
const filters = ref({
  search: '',
  status: 'all'
})

// Modal
const showModal = ref(false)
const showDetailsModal = ref(false)
const showPayoutModal = ref(false)
const selectedWithdrawal = ref(null)
const selectedWithdrawalDetails = ref(null)
const modalAction = ref('')
const adminNotes = ref('')
const processingPayout = ref(false)

// Composables
const config = useRuntimeConfig()
const { token } = useAuth()

// Fonction pour formater les montants
const formatCurrency = (amount) => {
  // Utiliser la devise de l'utilisateur connecté ou XOF par défaut
  const currencyCode = 'XOF' // Dans le contexte admin, on utilise XOF par défaut
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0
  }).format(amount || 0)
}

// Fonction pour formater les dates
const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR')
}

// Fonction pour obtenir la classe CSS du statut
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Fonction pour obtenir le label du statut
const getStatusLabel = (status) => {
  const labels = {
    pending: 'En attente',
    processed: 'Traité',
    rejected: 'Rejeté'
  }
  return labels[status] || status
}

// Charger les demandes de retrait
const loadWithdrawals = async (page = 1) => {
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
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/withdrawal-requests?${params}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du chargement des retraits')
    }
    
    const data = await response.json()
    
    if (data.success) {
      withdrawals.value = data.data.data
      pagination.value = {
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        from: data.data.from,
        to: data.data.to,
        total: data.data.total
      }
    } else {
      throw new Error(data.message || 'Erreur lors du chargement des retraits')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des retraits'
    console.error('Erreur retraits admin:', err)
  } finally {
    loading.value = false
  }
}

// Recherche avec debounce
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadWithdrawals()
  }, 500)
}

// Changer de page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    loadWithdrawals(page)
  }
}

// Ouvrir le modal
const openModal = (withdrawal, action) => {
  selectedWithdrawal.value = withdrawal
  modalAction.value = action
  adminNotes.value = ''
  showModal.value = true
}

// Fermer le modal
const closeModal = () => {
  showModal.value = false
  selectedWithdrawal.value = null
  modalAction.value = ''
  adminNotes.value = ''
}

// Mettre à jour le statut du retrait
const updateWithdrawalStatus = async () => {
  try {
    updating.value = true
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/withdrawal-requests/${selectedWithdrawal.value.id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: modalAction.value,
        admin_notes: adminNotes.value
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la mise à jour')
    }
    
    const data = await response.json()
    
    if (data.success) {
      // Mettre à jour la liste
      await loadWithdrawals(pagination.value?.current_page || 1)
      closeModal()
      
      // Notification de succès (vous pouvez ajouter un système de toast)
      console.log('Statut mis à jour avec succès')
    } else {
      throw new Error(data.message || 'Erreur lors de la mise à jour')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors de la mise à jour du statut'
    console.error('Erreur mise à jour statut:', err)
  } finally {
    updating.value = false
  }
}

// Fonctions pour la modal de détails
const viewDetails = async (withdrawal) => {
  try {
    loading.value = true
    const response = await fetch(`${config.public.apiBaseURL}/admin/withdrawal-requests/${withdrawal.id}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails')
    }

    const data = await response.json()
    selectedWithdrawalDetails.value = data.data
    showDetailsModal.value = true
  } catch (error) {
    console.error('Erreur:', error)
    // Vous pouvez ajouter une notification d'erreur ici
  } finally {
    loading.value = false
  }
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedWithdrawalDetails.value = null
}

const openModalFromDetails = (action) => {
  modalAction.value = action
  selectedWithdrawal.value = selectedWithdrawalDetails.value
  showDetailsModal.value = false
  showModal.value = true
  adminNotes.value = ''
}

// Fonctions pour le payout automatique
const canPayAutomatically = (withdrawal) => {
  return withdrawal.status === 'pending' && 
         withdrawal.withdrawal_method?.method_type === 'mobile_money' &&
         !withdrawal.payout_id
}

const getPayoutStatusClass = (status) => {
  const classes = {
    initiated: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPayoutStatusLabel = (status) => {
  const labels = {
    initiated: '⏳ En cours',
    completed: '✅ Envoyé',
    failed: '❌ Échoué'
  }
  return labels[status] || status
}

const openPayoutModal = (withdrawal) => {
  selectedWithdrawal.value = withdrawal
  showPayoutModal.value = true
}

const closePayoutModal = () => {
  showPayoutModal.value = false
  selectedWithdrawal.value = null
}

const processPayoutAutomatically = async () => {
  try {
    processingPayout.value = true
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/withdrawal-requests/${selectedWithdrawal.value.id}/process-payout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du traitement du payout')
    }
    
    const data = await response.json()
    
    if (data.success) {
      // Recharger la liste des retraits
      await loadWithdrawals(pagination.value?.current_page || 1)
      closePayoutModal()
      
      // Notification de succès
      console.log('Payout initié avec succès')
    } else {
      throw new Error(data.message || 'Erreur lors du traitement du payout')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du traitement du payout'
    console.error('Erreur payout:', err)
    alert(err.message)
  } finally {
    processingPayout.value = false
  }
}

// Charger les données au montage
onMounted(() => {
  loadWithdrawals()
})

// Nettoyer le timeout
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>