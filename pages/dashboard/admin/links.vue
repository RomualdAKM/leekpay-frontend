<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Liens de Paiement</h1>
        <p class="text-gray-600">Gérer tous les liens de la plateforme</p>
      </div>
      <button 
        @click="loadPaymentLinks" 
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
            placeholder="Titre, URL ou nom d'utilisateur..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-48">
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="filters.status"
            @change="loadPaymentLinks"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des liens -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading && !paymentLinks.length" class="flex items-center justify-center py-12">
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

      <div v-else-if="!paymentLinks.length" class="p-6 text-center">
        <LinkIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">Aucun lien de paiement trouvé</p>
      </div>

      <div v-else>
        <!-- Desktop: Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lien
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auteur
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collecté
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clics / Trans.
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
              <tr v-for="link in paymentLinks" :key="link.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <img 
                      v-if="link.image_url" 
                      :src="link.image_url" 
                      class="w-10 h-10 rounded object-cover mr-3"
                      alt="Image du lien"
                    />
                    <div class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center mr-3" v-else>
                      <LinkIcon class="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ link.title }}</div>
                      <div class="text-xs text-gray-500">{{ link.custom_url }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <UserIcon class="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ link.user?.name }}</div>
                      <div class="text-xs text-gray-500">{{ link.user?.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <span v-if="link.amount_type === 'fixed'" class="font-medium">
                      {{ formatCurrency(link.fixed_amount, link.currency?.code) }}
                    </span>
                    <span v-else class="text-gray-500 italic">Flexible</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-green-600">
                    {{ formatCurrency(link.total_collected, link.currency?.code) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <span class="font-medium">{{ link.click_count }}</span> clics
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ link.transactions_count }} transactions
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="link.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
                  >
                    {{ link.is_active ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="toggleLinkStatus(link)"
                    :disabled="toggling === link.id"
                    class="px-3 py-1 rounded border transition-colors"
                    :class="link.is_active 
                      ? 'text-red-600 border-red-200 hover:bg-red-50' 
                      : 'text-green-600 border-green-200 hover:bg-green-50'"
                  >
                    <div v-if="toggling === link.id" class="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin inline-block"></div>
                    <span v-else>{{ link.is_active ? 'Désactiver' : 'Activer' }}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile: Cards -->
        <div class="md:hidden space-y-4 p-4">
          <div
            v-for="link in paymentLinks"
            :key="link.id"
            class="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex items-center flex-1">
                  <img 
                    v-if="link.image_url" 
                    :src="link.image_url" 
                    class="w-12 h-12 rounded object-cover mr-3"
                    alt="Image du lien"
                  />
                  <div class="w-12 h-12 rounded bg-gray-200 flex items-center justify-center mr-3" v-else>
                    <LinkIcon class="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ link.title }}</div>
                    <div class="text-xs text-gray-500">{{ link.custom_url }}</div>
                  </div>
                </div>
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="link.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
                >
                  {{ link.is_active ? 'Actif' : 'Inactif' }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div class="text-xs text-gray-500">Auteur</div>
                  <div class="font-medium text-gray-900">{{ link.user?.name }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Collecté</div>
                  <div class="font-semibold text-green-600">
                    {{ formatCurrency(link.total_collected, link.currency?.code) }}
                  </div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Clics</div>
                  <div class="text-gray-900">{{ link.click_count }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Transactions</div>
                  <div class="text-gray-900">{{ link.transactions_count }}</div>
                </div>
              </div>

              <button
                @click="toggleLinkStatus(link)"
                :disabled="toggling === link.id"
                class="w-full px-3 py-2 rounded border transition-colors text-sm font-medium"
                :class="link.is_active 
                  ? 'text-red-600 border-red-200 hover:bg-red-50' 
                  : 'text-green-600 border-green-200 hover:bg-green-50'"
              >
                <div v-if="toggling === link.id" class="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin inline-block"></div>
                <span v-else>{{ link.is_active ? 'Désactiver' : 'Activer' }}</span>
              </button>
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
  LinkIcon, 
  UserIcon 
} from 'lucide-vue-next'

// Layout dashboard et middleware admin
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

// État réactif
const paymentLinks = ref([])
const pagination = ref(null)
const loading = ref(true)
const error = ref(null)
const toggling = ref(null)

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

// Charger les liens de paiement
const loadPaymentLinks = async (page = 1) => {
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
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/payment-links?${params}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du chargement des liens')
    }
    
    const data = await response.json()
    
    if (data.success) {
      paymentLinks.value = data.data.data
      pagination.value = {
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        from: data.data.from,
        to: data.data.to,
        total: data.data.total
      }
    } else {
      throw new Error(data.message || 'Erreur lors du chargement des liens')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des liens'
    console.error('Erreur liens admin:', err)
  } finally {
    loading.value = false
  }
}

// Toggle le statut d'un lien
const toggleLinkStatus = async (link) => {
  if (!confirm(`Voulez-vous vraiment ${link.is_active ? 'désactiver' : 'activer'} ce lien ?`)) {
    return
  }

  try {
    toggling.value = link.id
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/payment-links/${link.id}/toggle-status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la mise à jour')
    }
    
    const data = await response.json()
    
    if (data.success) {
      // Mettre à jour le lien dans la liste
      const index = paymentLinks.value.findIndex(l => l.id === link.id)
      if (index !== -1) {
        paymentLinks.value[index].is_active = !paymentLinks.value[index].is_active
      }
    } else {
      throw new Error(data.message || 'Erreur lors de la mise à jour')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors de la mise à jour du statut'
    console.error('Erreur toggle statut:', err)
    alert(err.message)
  } finally {
    toggling.value = null
  }
}

// Recherche avec debounce
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadPaymentLinks()
  }, 500)
}

// Changer de page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    loadPaymentLinks(page)
  }
}

// Charger les données au montage
onMounted(() => {
  loadPaymentLinks()
})

// Nettoyer le timeout
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>
