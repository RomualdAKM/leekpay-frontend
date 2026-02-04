<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Carrousel Bannières -->
    <div v-if="banners.length > 0" class="relative overflow-hidden">
      <div class="relative">
        <a 
          v-if="banners[currentBannerIndex]"
          :href="banners[currentBannerIndex].url || '#'"
          :target="banners[currentBannerIndex].url ? '_blank' : '_self'"
          rel="noopener noreferrer"
          class="block"
        >
          <img 
            :src="banners[currentBannerIndex].image_url" 
            :alt="banners[currentBannerIndex].title"
            class="w-full h-56 sm:h-40 md:h-48 object-contain object-center transition-opacity duration-500 bg-gray-50"
          />
        </a>
        
        <!-- Indicateurs -->
        <div v-if="banners.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(_, index) in banners"
            :key="index"
            @click="currentBannerIndex = index"
            :class="[
              'w-2 h-2 rounded-full transition-colors',
              index === currentBannerIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            ]"
          />
        </div>
        
        <!-- Flèches navigation -->
        <template v-if="banners.length > 1">
          <button 
            @click="prevBanner"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            @click="nextBanner"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </template>
      </div>
    </div>

    <!-- Header + Actions rapides -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span>👋</span>
          <span>Salut {{ user?.first_name || user?.name || 'there' }}</span>
        </h1>
        <p class="text-sm text-gray-500 mt-1">Vue d'ensemble de votre activité</p>
      </div>
      
      <!-- 3 Boutons d'action rapide -->
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          to="/dashboard/create-link"
          class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Lien
        </NuxtLink>
        <NuxtLink
          to="/dashboard/invoices/create"
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Facture
        </NuxtLink>
        <NuxtLink
          to="/dashboard/sales-pages/create"
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Page
        </NuxtLink>
      </div>
    </div>

    <!-- Filtre période -->
    <div class="flex items-center gap-3">
      <select
        v-model="selectedPeriod"
        @change="fetchDashboard"
        class="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
        :disabled="loading"
      >
        <option value="">Toute la période</option>
        <option value="today">Aujourd'hui</option>
        <option value="this_week">Cette semaine</option>
        <option value="this_month">Ce mois</option>
        <option value="last_month">Mois dernier</option>
        <option value="this_year">Cette année</option>
      </select>
      <button
        v-if="selectedPeriod"
        @click="selectedPeriod = ''; fetchDashboard()"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        Réinitialiser
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="border border-red-200 p-4">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- Métriques globales -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total collecté -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Total collecté</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ formatAmount(data.transactions.collected) }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ user?.currency?.symbol || 'XOF' }}</p>
        </div>
        
        <!-- Transactions -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Transactions</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ data.transactions.total }}</p>
          <p class="text-xs mt-1">
            <span class="text-green-600">{{ data.transactions.paid }} payées</span>
            <span v-if="data.transactions.pending > 0" class="text-gray-400"> · {{ data.transactions.pending }} en attente</span>
          </p>
        </div>
        
        <!-- Liens de paiement -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Liens</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ data.links.total }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ data.links.active }} actifs · {{ data.links.clicks }} clics</p>
        </div>
        
        <!-- Factures -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Factures</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ data.invoices.total }}</p>
          <p class="text-xs mt-1">
            <span class="text-green-600">{{ data.invoices.paid }} payées</span>
            <span v-if="data.invoices.pending > 0" class="text-gray-400"> · {{ data.invoices.pending }} en attente</span>
          </p>
        </div>
      </div>

      <!-- Section Pages de vente -->
      <div class="border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Pages de vente</p>
          <NuxtLink to="/dashboard/sales-pages" class="text-xs text-green-600 hover:text-green-700">
            Voir tout
          </NuxtLink>
        </div>
        <div class="flex items-baseline gap-6">
          <div>
            <p class="text-2xl font-semibold text-gray-900">{{ data.sales_pages.total }}</p>
            <p class="text-xs text-gray-400">pages créées</p>
          </div>
          <div>
            <p class="text-2xl font-semibold text-gray-900">{{ data.sales_pages.published }}</p>
            <p class="text-xs text-gray-400">publiées</p>
          </div>
          <div>
            <p class="text-2xl font-semibold text-gray-900">{{ data.sales_pages.views }}</p>
            <p class="text-xs text-gray-400">vues</p>
          </div>
        </div>
      </div>

      <!-- Graphique revenus + Performance -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Revenus 7 jours -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-4">Revenus (7 derniers jours)</p>
          <div v-if="data.daily_stats.length > 0" class="space-y-2">
            <div v-for="stat in data.daily_stats" :key="stat.date" class="flex items-center gap-3">
              <span class="text-xs text-gray-500 w-16">{{ formatShortDate(stat.date) }}</span>
              <div class="flex-1 bg-gray-100 h-2">
                <div
                  class="bg-green-600 h-full transition-all"
                  :style="{ width: getBarWidth(stat.revenue) + '%' }"
                ></div>
              </div>
              <span class="text-xs font-medium text-gray-700 w-20 text-right">{{ formatAmount(stat.revenue) }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-6">Aucune donnée</p>
        </div>

        <!-- Performance mensuelle -->
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide mb-4">Performance mensuelle</p>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-gray-400">Ce mois</p>
              <p class="text-xl font-semibold text-gray-900">{{ formatAmount(data.monthly_performance.current) }} {{ user?.currency?.symbol || 'XOF' }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Mois précédent</p>
              <p class="text-xl font-semibold text-gray-900">{{ formatAmount(data.monthly_performance.previous) }} {{ user?.currency?.symbol || 'XOF' }}</p>
            </div>
            <div v-if="data.monthly_performance.growth_rate !== 0">
              <p class="text-xs text-gray-400">Évolution</p>
              <p :class="['text-xl font-semibold', data.monthly_performance.growth_rate > 0 ? 'text-green-600' : 'text-red-600']">
                {{ data.monthly_performance.growth_rate > 0 ? '+' : '' }}{{ data.monthly_performance.growth_rate }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dernières transactions -->
      <div class="border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Dernières transactions</p>
          <NuxtLink to="/dashboard/transactions" class="text-xs text-green-600 hover:text-green-700">
            Voir tout
          </NuxtLink>
        </div>
        <div v-if="data.recent_transactions.length > 0" class="divide-y divide-gray-100">
          <div v-for="tx in data.recent_transactions" :key="tx.id" class="flex items-center justify-between py-3">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ tx.payment_link?.title || 'Transaction' }}</p>
              <p class="text-xs text-gray-400">{{ formatDate(tx.created_at) }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-900">{{ formatAmount(tx.amount) }} {{ tx.currency?.symbol }}</span>
              <span :class="[
                'text-xs px-2 py-0.5',
                tx.status === 'paid' ? 'bg-green-50 text-green-700' :
                tx.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                'bg-red-50 text-red-700'
              ]">
                {{ getStatusLabel(tx.status) }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-400 text-center py-6">Aucune transaction</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token, user } = useAuth()

const loading = ref(true)
const error = ref('')
const selectedPeriod = ref('')

// Bannières
const banners = ref([])
const currentBannerIndex = ref(0)
let bannerInterval = null

const fetchBanners = async () => {
  try {
    const response = await $fetch('/banners/active', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    banners.value = response.data || []
    if (banners.value.length > 1) {
      startBannerAutoplay()
    }
  } catch (err) {
    console.error('Erreur chargement bannières:', err)
  }
}

const startBannerAutoplay = () => {
  bannerInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length
  }, 5000)
}

const prevBanner = () => {
  currentBannerIndex.value = currentBannerIndex.value === 0 
    ? banners.value.length - 1 
    : currentBannerIndex.value - 1
}

const nextBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length
}

const data = ref({
  links: { total: 0, active: 0, clicks: 0, collected: 0 },
  invoices: { total: 0, paid: 0, pending: 0, amount_total: 0, amount_paid: 0 },
  sales_pages: { total: 0, published: 0, views: 0 },
  transactions: { total: 0, paid: 0, pending: 0, collected: 0 },
  daily_stats: [],
  recent_transactions: [],
  monthly_performance: { current: 0, previous: 0, growth_rate: 0 }
})

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams()
    if (selectedPeriod.value) {
      params.append('period', selectedPeriod.value)
    }

    const response = await $fetch(`/dashboard/global?${params.toString()}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })

    data.value = response.data
  } catch (err) {
    console.error('Erreur chargement dashboard:', err)
    error.value = 'Impossible de charger les données'
  } finally {
    loading.value = false
  }
}

const formatAmount = (value) => {
  return Number(value || 0).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'À l\'instant'
  if (hours < 24) return `Il y a ${hours}h`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `Il y a ${days}j`
  
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const formatShortDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getBarWidth = (revenue) => {
  if (data.value.daily_stats.length === 0) return 0
  const maxRevenue = Math.max(...data.value.daily_stats.map(s => s.revenue))
  return maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0
}

const getStatusLabel = (status) => {
  const labels = { paid: 'Payée', pending: 'En attente', failed: 'Échouée' }
  return labels[status] || status
}

onMounted(() => {
  fetchBanners()
  fetchDashboard()
})

onUnmounted(() => {
  if (bannerInterval) {
    clearInterval(bannerInterval)
  }
})
</script>
