<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Statistiques Admin</h1>
        <p class="text-gray-600">Vue d'ensemble des performances de la plateforme</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <CalendarIcon class="w-4 h-4" />
        Dernière mise à jour: {{ new Date().toLocaleString('fr-FR') }}
      </div>
    </div>

    <!-- Indicateurs clés -->
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Utilisateurs Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total_users }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Transactions</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total_transactions }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CreditCardIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Volume Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(stats.total_volume) }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUpIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Profit LeekPay</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(stats.leekpay_profit) }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSignIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Retraits en attente -->
    <div v-if="stats" class="bg-white p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Retraits en Attente</h3>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-3xl font-bold text-orange-600">{{ stats.pending_withdrawals }}</p>
          <p class="text-sm text-gray-600">demandes à traiter</p>
        </div>
        <NuxtLink 
          to="/dashboard/admin/withdrawals"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Gérer les retraits
        </NuxtLink>
      </div>
    </div>

    <!-- Graphiques mensuels -->
    <div v-if="stats && stats.monthly_stats" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Évolution des transactions -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Évolution des Transactions</h3>
        <div class="space-y-3">
          <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
            <span class="text-sm text-gray-600">{{ month.month_name }}</span>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-green-600 h-2 rounded-full" 
                  :style="{ width: `${(month.transactions / Math.max(...stats.monthly_stats.map(m => m.transactions))) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-12 text-right">{{ month.transactions }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Évolution du volume -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Évolution du Volume</h3>
        <div class="space-y-3">
          <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
            <span class="text-sm text-gray-600">{{ month.month_name }}</span>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-green-600 h-2 rounded-full" 
                  :style="{ width: `${(month.volume / Math.max(...stats.monthly_stats.map(m => m.volume))) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-20 text-right">{{ formatCurrency(month.volume) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>

    <!-- Erreur -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-center gap-2">
        <AlertCircleIcon class="w-5 h-5 text-red-600" />
        <p class="text-red-800 font-medium">Erreur de chargement</p>
      </div>
      <p class="text-red-600 text-sm mt-1">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { 
  CalendarIcon, 
  UsersIcon, 
  CreditCardIcon, 
  TrendingUpIcon, 
  DollarSignIcon,
  AlertCircleIcon 
} from 'lucide-vue-next'

// Layout dashboard
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

// État réactif
const stats = ref(null)
const loading = ref(true)
const error = ref(null)

// Composables
const config = useRuntimeConfig()
const { token } = useAuth()

// Fonction pour formater les montants
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount || 0)
}

// Charger les statistiques
const loadStats = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`${config.public.apiBaseURL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors du chargement des statistiques')
    }
    
    const data = await response.json()
    
    if (data.success) {
      stats.value = data.data
    } else {
      throw new Error(data.message || 'Erreur lors du chargement des statistiques')
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des statistiques'
    console.error('Erreur stats admin:', err)
  } finally {
    loading.value = false
  }
}

// Charger les données au montage
onMounted(() => {
  loadStats()
  
  // Actualiser toutes les 5 minutes (uniquement côté client)
  const refreshInterval = setInterval(() => {
    loadStats()
  }, 5 * 60 * 1000)
  
  // Nettoyer l'intervalle à la destruction du composant
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
  })
})
</script>