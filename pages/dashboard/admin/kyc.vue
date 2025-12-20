<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestion KYC</h1>
        <p class="text-gray-600">Vérifier les demandes d'identité des utilisateurs</p>
      </div>
      <button 
        @click="loadKycVerifications" 
        :disabled="loading"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
      >
        <RefreshCwIcon class="w-4 h-4 inline mr-2" :class="{ 'animate-spin': loading }" />
        Actualiser
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <p class="text-sm text-gray-500">Total</p>
        <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
      </div>
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p class="text-sm text-orange-600">En attente</p>
        <p class="text-2xl font-semibold text-orange-700">{{ stats.pending }}</p>
      </div>
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-sm text-green-600">Approuvés</p>
        <p class="text-2xl font-semibold text-green-700">{{ stats.approved }}</p>
      </div>
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-sm text-red-600">Rejetés</p>
        <p class="text-2xl font-semibold text-red-700">{{ stats.rejected }}</p>
      </div>
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
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-48">
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadKycVerifications"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des KYC -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading && !verifications.length" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>

      <div v-else-if="!verifications.length" class="p-6 text-center">
        <ShieldCheck class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">Aucune demande de vérification KYC trouvée</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date soumission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="kyc in verifications" :key="kyc.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User class="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ kyc.user?.name }}</p>
                    <p class="text-sm text-gray-500">{{ kyc.user?.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(kyc.submitted_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusClass(kyc.status)
                  ]"
                >
                  {{ getStatusLabel(kyc.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="openKycModal(kyc)"
                  class="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Voir détails
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.lastPage > 1" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Page {{ pagination.currentPage }} sur {{ pagination.lastPage }}
        </p>
        <div class="flex gap-2">
          <button
            @click="goToPage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            class="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            @click="goToPage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage === pagination.lastPage"
            class="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Détail KYC -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
          
          <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold">Détails de la vérification KYC</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <div v-if="selectedKyc" class="p-6 space-y-6">
              <!-- User info -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 mb-2">Informations utilisateur</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Nom:</span>
                    <span class="ml-2 font-medium">{{ selectedKyc.user?.name }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Email:</span>
                    <span class="ml-2 font-medium">{{ selectedKyc.user?.email }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Pays:</span>
                    <span class="ml-2 font-medium">{{ selectedKyc.user?.country_code }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Date soumission:</span>
                    <span class="ml-2 font-medium">{{ formatDate(selectedKyc.submitted_at) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Documents -->
              <div>
                <h4 class="font-medium text-gray-900 mb-4">Documents soumis</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="border rounded-lg p-3">
                    <p class="text-sm text-gray-500 mb-2">Recto carte d'identité</p>
                    <img 
                      v-if="selectedKyc.id_card_front_url"
                      :src="selectedKyc.id_card_front_url"
                      alt="Recto carte"
                      class="w-full h-40 object-cover rounded cursor-pointer hover:opacity-90"
                      @click="openImageFullscreen(selectedKyc.id_card_front_url)"
                    />
                  </div>
                  <div class="border rounded-lg p-3">
                    <p class="text-sm text-gray-500 mb-2">Verso carte d'identité</p>
                    <img 
                      v-if="selectedKyc.id_card_back_url"
                      :src="selectedKyc.id_card_back_url"
                      alt="Verso carte"
                      class="w-full h-40 object-cover rounded cursor-pointer hover:opacity-90"
                      @click="openImageFullscreen(selectedKyc.id_card_back_url)"
                    />
                  </div>
                  <div class="border rounded-lg p-3">
                    <p class="text-sm text-gray-500 mb-2">Selfie avec carte</p>
                    <img 
                      v-if="selectedKyc.selfie_with_card_url"
                      :src="selectedKyc.selfie_with_card_url"
                      alt="Selfie"
                      class="w-full h-40 object-cover rounded cursor-pointer hover:opacity-90"
                      @click="openImageFullscreen(selectedKyc.selfie_with_card_url)"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Actions for pending -->
              <div v-if="selectedKyc.status === 'pending' || selectedKyc.status?.value === 'pending'" class="border-t pt-6">
                <h4 class="font-medium text-gray-900 mb-4">Actions</h4>
                
                <div class="space-y-4">
                  <!-- Approve -->
                  <button
                    @click="approveKyc"
                    :disabled="actionLoading"
                    class="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle class="w-5 h-5" />
                    Approuver la vérification
                  </button>
                  
                  <!-- Reject -->
                  <div class="space-y-2">
                    <textarea
                      v-model="rejectionReason"
                      placeholder="Motif du refus (obligatoire)..."
                      rows="3"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                    <button
                      @click="rejectKyc"
                      :disabled="actionLoading || !rejectionReason.trim()"
                      class="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle class="w-5 h-5" />
                      Rejeter la vérification
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Already processed -->
              <div v-else class="border-t pt-6">
                <div 
                  :class="[
                    'p-4 rounded-lg',
                    selectedKyc.status === 'approved' || selectedKyc.status?.value === 'approved' ? 'bg-green-50' : 'bg-red-50'
                  ]"
                >
                  <p :class="selectedKyc.status === 'approved' || selectedKyc.status?.value === 'approved' ? 'text-green-700' : 'text-red-700'">
                    {{ selectedKyc.status === 'approved' || selectedKyc.status?.value === 'approved' ? 'Cette vérification a été approuvée.' : 'Cette vérification a été rejetée.' }}
                  </p>
                  <p v-if="selectedKyc.rejection_reason" class="mt-2 text-sm text-red-600">
                    Motif: {{ selectedKyc.rejection_reason }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Image Fullscreen Modal -->
    <Teleport to="body">
      <div v-if="fullscreenImage" class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" @click="fullscreenImage = null">
        <button class="absolute top-4 right-4 text-white" @click="fullscreenImage = null">
          <X class="w-8 h-8" />
        </button>
        <img :src="fullscreenImage" alt="Document" class="max-w-full max-h-full object-contain" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { RefreshCwIcon, User, ShieldCheck, X, CheckCircle, XCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const { token } = useAuth()
const config = useRuntimeConfig()

// State
const loading = ref(false)
const actionLoading = ref(false)
const verifications = ref([])
const showModal = ref(false)
const selectedKyc = ref(null)
const rejectionReason = ref('')
const fullscreenImage = ref(null)

const filters = reactive({
  search: '',
  status: 'all'
})

const stats = reactive({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
})

const pagination = reactive({
  currentPage: 1,
  lastPage: 1,
  perPage: 15
})

let searchTimeout = null

// Methods
const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const statusValue = status?.value || status
  switch (statusValue) {
    case 'pending': return 'bg-orange-100 text-orange-700'
    case 'approved': return 'bg-green-100 text-green-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusLabel = (status) => {
  const statusValue = status?.value || status
  switch (statusValue) {
    case 'pending': return 'En attente'
    case 'approved': return 'Approuvé'
    case 'rejected': return 'Rejeté'
    default: return status
  }
}

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadKycVerifications()
  }, 500)
}

const loadKycVerifications = async (page = 1) => {
  try {
    loading.value = true
    
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: pagination.perPage.toString()
    })
    
    if (filters.status !== 'all') params.append('status', filters.status)
    if (filters.search) params.append('search', filters.search)
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/kyc?${params}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (response.success) {
      verifications.value = response.data.data || []
      pagination.currentPage = response.data.current_page || 1
      pagination.lastPage = response.data.last_page || 1
      
      if (response.stats) {
        stats.total = response.stats.total || 0
        stats.pending = response.stats.pending || 0
        stats.approved = response.stats.approved || 0
        stats.rejected = response.stats.rejected || 0
      }
    }
  } catch (error) {
    console.error('Erreur chargement KYC:', error)
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.lastPage) {
    loadKycVerifications(page)
  }
}

const openKycModal = async (kyc) => {
  try {
    const response = await $fetch(`${config.public.apiBaseURL}/admin/kyc/${kyc.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (response.success) {
      selectedKyc.value = response.data
      rejectionReason.value = ''
      showModal.value = true
    }
  } catch (error) {
    console.error('Erreur chargement détails KYC:', error)
  }
}

const closeModal = () => {
  showModal.value = false
  selectedKyc.value = null
  rejectionReason.value = ''
}

const openImageFullscreen = (url) => {
  fullscreenImage.value = url
}

const approveKyc = async () => {
  if (!selectedKyc.value) return
  
  try {
    actionLoading.value = true
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/kyc/${selectedKyc.value.id}/approve`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (response.success) {
      closeModal()
      loadKycVerifications(pagination.currentPage)
    }
  } catch (error) {
    console.error('Erreur approbation KYC:', error)
  } finally {
    actionLoading.value = false
  }
}

const rejectKyc = async () => {
  if (!selectedKyc.value || !rejectionReason.value.trim()) return
  
  try {
    actionLoading.value = true
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/kyc/${selectedKyc.value.id}/reject`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: {
        rejection_reason: rejectionReason.value.trim()
      }
    })
    
    if (response.success) {
      closeModal()
      loadKycVerifications(pagination.currentPage)
    }
  } catch (error) {
    console.error('Erreur rejet KYC:', error)
  } finally {
    actionLoading.value = false
  }
}

onMounted(() => {
  loadKycVerifications()
})
</script>
