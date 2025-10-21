<template>
  <div class="p-4 sm:p-6 space-y-6">
    <div>
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <p class="text-sm text-gray-600">Vue d'ensemble de vos performances</p>
    </div>

    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Filtrer par lien</label>
          <select
            v-model="selectedLink"
            @change="fetchDashboard"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            :disabled="loading"
          >
            <option value="">Tous les liens</option>
            <option v-for="link in allLinks" :key="link.id" :value="link.id">
              {{ link.title }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Période</label>
          <select
            v-model="selectedPeriod"
            @change="fetchDashboard"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            :disabled="loading"
          >
            <option value="">Toute la période</option>
            <option value="today">Aujourd'hui</option>
            <option value="this_week">Cette semaine</option>
            <option value="this_month">Ce mois-ci</option>
            <option value="last_month">Mois dernier</option>
            <option value="this_year">Cette année</option>
          </select>
        </div>
      </div>
      <p v-if="selectedLink || selectedPeriod" class="text-xs text-gray-500 mt-3">
        <span v-if="selectedLink">Lien : <strong>{{ getSelectedLinkTitle() }}</strong></span>
        <span v-if="selectedLink && selectedPeriod"> • </span>
        <span v-if="selectedPeriod">Période : <strong>{{ getPeriodLabel() }}</strong></span>
        <button @click="resetFilters" class="ml-2 text-blue-600 hover:underline" :disabled="loading">Réinitialiser</button>
      </p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <div v-if="selectedLink" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <InfoIcon class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-blue-900">Statistiques du lien sélectionné</p>
            <p class="text-xs text-blue-700 mt-1">
              Vous consultez les données uniquement pour "{{ getSelectedLinkTitle() }}". 
              Les chiffres ci-dessous reflètent uniquement ce lien.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Liens</span>
            <Link2Icon class="w-4 h-4 text-gray-400" />
          </div>
          <p class="text-2xl font-semibold text-gray-900">{{ metrics.total_links }}</p>
          <div class="flex items-center gap-2 mt-2 text-xs">
            <span class="text-green-600">{{ linkStatus.active_links }} actifs</span>
            <span class="text-gray-400">•</span>
            <span class="text-gray-500">{{ linkStatus.inactive_links }} inactifs</span>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Clics</span>
            <EyeIcon class="w-4 h-4 text-gray-400" />
          </div>
          <p class="text-2xl font-semibold text-gray-900">{{ formatNumber(metrics.total_clicks) }}</p>
          <p class="text-xs text-gray-500 mt-2">Taux: {{ metrics.conversion_rate }}%</p>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Transactions</span>
            <ActivityIcon class="w-4 h-4 text-gray-400" />
          </div>
          <p class="text-2xl font-semibold text-gray-900">{{ formatNumber(metrics.total_transactions) }}</p>
          <div class="flex items-center gap-2 mt-2 text-xs">
            <span class="text-green-600">{{ metrics.paid_transactions }} payées</span>
            <span class="text-gray-400">•</span>
            <span class="text-orange-500">{{ metrics.pending_transactions }} en attente</span>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Collecté</span>
            <DollarSignIcon class="w-4 h-4 text-gray-400" />
          </div>
          <p class="text-2xl font-semibold text-gray-900">{{ formatAmount(metrics.total_collected) }}</p>
          <p class="text-xs text-gray-500 mt-2">{{ userCurrencySymbol }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Évolution des revenus (7 derniers jours)</h3>
            <BarChartIcon class="w-4 h-4 text-gray-400" />
          </div>
          <div v-if="dailyStats.length > 0" class="space-y-2">
            <div v-for="stat in dailyStats" :key="stat.date" class="flex items-center gap-3">
              <span class="text-xs text-gray-500 w-20">{{ formatShortDate(stat.date) }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  class="bg-green-500 h-full transition-all"
                  :style="{ width: getBarWidth(stat.revenue) + '%' }"
                ></div>
              </div>
              <span class="text-xs font-medium text-gray-900 w-24 text-right">
                {{ formatAmount(stat.revenue) }} {{ userCurrencySymbol }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-sm text-gray-500">
            Aucune donnée disponible
          </div>
        </div>

        <div v-if="monthlyPerformance.growth_rate !== 0" class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Performance mensuelle</h3>
            <CalendarIcon class="w-4 h-4 text-gray-400" />
          </div>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Mois en cours</p>
              <p class="text-xl font-semibold text-gray-900">{{ formatAmount(monthlyPerformance.current_month_revenue) }} {{ userCurrencySymbol }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Mois précédent</p>
              <p class="text-xl font-semibold text-gray-900">{{ formatAmount(monthlyPerformance.last_month_revenue) }} {{ userCurrencySymbol }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Évolution</p>
              <p :class="[
                'text-xl font-semibold',
                monthlyPerformance.growth_rate > 0 ? 'text-green-600' : 'text-red-600'
              ]">
                {{ monthlyPerformance.growth_rate > 0 ? '+' : '' }}{{ monthlyPerformance.growth_rate }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Liens les plus rentables</h3>
            <TrendingUpIcon class="w-4 h-4 text-gray-400" />
          </div>
          <div v-if="topEarningLinks.length > 0" class="space-y-3">
            <div v-for="link in topEarningLinks" :key="link.id" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ link.title }}</p>
                <p class="text-xs text-gray-500 truncate">{{ link.custom_url }}</p>
              </div>
              <span class="text-sm font-semibold text-gray-900 ml-4">
                {{ formatAmount(link.total_collected) }} {{ getCurrencySymbol(link.currency_id) }}
              </span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-sm text-gray-500">
            Aucune donnée disponible
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Liens les plus cliqués</h3>
            <MousePointerClickIcon class="w-4 h-4 text-gray-400" />
          </div>
          <div v-if="topClickedLinks.length > 0" class="space-y-3">
            <div v-for="link in topClickedLinks" :key="link.id" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ link.title }}</p>
                <p class="text-xs text-gray-500 truncate">{{ link.custom_url }}</p>
              </div>
              <span class="text-sm font-semibold text-gray-900 ml-4">{{ link.click_count }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-sm text-gray-500">
            Aucune donnée disponible
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900">Dernières transactions</h3>
          <button
            @click="$router.push('/dashboard/transactions')"
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Voir tout
          </button>
        </div>
        <div v-if="recentTransactions.length > 0" class="space-y-3">
          <div v-for="transaction in recentTransactions" :key="transaction.id" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ transaction.payment_link?.title || 'Lien supprimé' }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(transaction.created_at) }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-gray-900">
                {{ formatAmount(transaction.amount) }} {{ transaction.currency?.symbol }}
              </span>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                transaction.status === 'paid' ? 'bg-green-100 text-green-700' :
                transaction.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              ]">
                {{ getStatusLabel(transaction.status) }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-sm text-gray-500">
          Aucune transaction récente
        </div>
      </div>

      <div v-if="analytics.top_countries.length > 0 || analytics.top_referrers.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Pays principaux</h3>
            <span class="text-xs text-gray-500">{{ analytics.total_clicks }} clics</span>
          </div>
          <div v-if="analytics.top_countries.length > 0" class="space-y-3">
            <div v-for="country in analytics.top_countries" :key="country.country" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ country.country || 'Inconnu' }}</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex-1 bg-gray-100 rounded-full h-2 w-24">
                  <div 
                    class="bg-blue-500 h-full rounded-full"
                    :style="{ width: getCountryBarWidth(country.total) + '%' }"
                  ></div>
                </div>
                <span class="text-sm font-semibold text-gray-900 w-12 text-right">{{ country.total }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-sm text-gray-500">
            Aucune donnée disponible
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">Sources principales</h3>
          </div>
          <div v-if="analytics.top_referrers.length > 0" class="space-y-3">
            <div v-for="referrer in analytics.top_referrers" :key="referrer.referrer" class="py-2 border-b border-gray-100 last:border-0">
              <div class="flex items-center justify-between mb-1">
                <p class="text-sm font-medium text-gray-900 truncate flex-1">{{ getDomainFromUrl(referrer.referrer) }}</p>
                <span class="text-sm font-semibold text-gray-900 ml-2">{{ referrer.total }}</span>
              </div>
              <p class="text-xs text-gray-500 truncate">{{ referrer.referrer }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-sm text-gray-500">
            Aucune donnée disponible
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Link2Icon,
  EyeIcon,
  DollarSignIcon,
  ActivityIcon,
  TrendingUpIcon,
  MousePointerClickIcon,
  BarChartIcon,
  CalendarIcon,
  InfoIcon
} from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()

const loading = ref(true)
const error = ref('')
const metrics = ref({
  total_links: 0,
  total_clicks: 0,
  total_collected: 0,
  total_transactions: 0,
  paid_transactions: 0,
  pending_transactions: 0,
  conversion_rate: 0
})

const linkStatus = ref({
  active_links: 0,
  inactive_links: 0,
  expired_links: 0
})

const topEarningLinks = ref([])
const topClickedLinks = ref([])
const recentTransactions = ref([])
const userCurrencySymbol = ref('XOF')

const selectedPeriod = ref('')
const selectedLink = ref('')
const allLinks = ref([])
const dailyStats = ref([])
const monthlyPerformance = ref({
  current_month_revenue: 0,
  last_month_revenue: 0,
  growth_rate: 0
})

const analytics = ref({
  top_countries: [],
  top_referrers: [],
  total_clicks: 0
})

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams()
    if (selectedPeriod.value) {
      params.append('period', selectedPeriod.value)
    }
    if (selectedLink.value) {
      params.append('link_id', selectedLink.value)
    }

    const response = await $fetch(`/dashboard?${params.toString()}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    const data = response.data
    metrics.value = data.global_metrics
    linkStatus.value = data.link_status
    topEarningLinks.value = data.top_performers.top_earning_links || []
    topClickedLinks.value = data.top_performers.top_clicked_links || []
    recentTransactions.value = data.recent_activity.recent_transactions || []
    dailyStats.value = data.daily_stats || []
    monthlyPerformance.value = data.monthly_performance || monthlyPerformance.value
    analytics.value = data.analytics || analytics.value
  } catch (err) {
    console.error('Erreur chargement dashboard:', err)
    error.value = 'Impossible de charger les données'
  } finally {
    loading.value = false
  }
}

const fetchAllLinks = async () => {
  try {
    const response = await $fetch('/payment-links?per_page=100', {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    allLinks.value = response.data || []
  } catch (err) {
    console.error('Erreur chargement liens:', err)
  }
}

const resetFilters = () => {
  selectedPeriod.value = ''
  selectedLink.value = ''
  fetchDashboard()
}

const getSelectedLinkTitle = () => {
  const link = allLinks.value.find(l => l.id === Number(selectedLink.value))
  return link ? link.title : ''
}

const getPeriodLabel = () => {
  const labels = {
    today: "Aujourd'hui",
    this_week: 'Cette semaine',
    this_month: 'Ce mois-ci',
    last_month: 'Mois dernier',
    this_year: 'Cette année'
  }
  return labels[selectedPeriod.value] || ''
}

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString()
}

const formatAmount = (value) => {
  return Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'Il y a quelques minutes'
  if (hours < 24) return `Il y a ${hours}h`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `Il y a ${days}j`
  
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getBarWidth = (revenue) => {
  if (dailyStats.value.length === 0) return 0
  const maxRevenue = Math.max(...dailyStats.value.map(s => s.revenue))
  return maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0
}

const formatShortDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const getCurrencySymbol = (currencyId) => {
  const map = { 1: '€', 2: '$', 3: 'XOF', 4: 'XAF' }
  return map[currencyId] || 'XOF'
}

const getStatusLabel = (status) => {
  const labels = {
    paid: 'Payée',
    pending: 'En attente',
    failed: 'Échouée'
  }
  return labels[status] || status
}

const getCountryBarWidth = (total) => {
  if (analytics.value.top_countries.length === 0) return 0
  const maxTotal = Math.max(...analytics.value.top_countries.map(c => c.total))
  return maxTotal > 0 ? (total / maxTotal) * 100 : 0
}

const getDomainFromUrl = (url) => {
  if (!url) return 'Direct'
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.length > 30 ? url.substring(0, 30) + '...' : url
  }
}

onMounted(() => {
  fetchAllLinks()
  fetchDashboard()
})
</script>