<template>
  <div class="p-4 sm:p-6 space-y-5 sm:space-y-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold flex items-center gap-2 flex-wrap">
          <span class="text-xl sm:text-2xl">🐸</span>
          <span class="text-[#2ECC71]">Salut</span>
          <span class="text-gray-900 font-bold uppercase">{{ user?.first_name || user?.name || 'there' }}</span>
        </h1>
        <p class="text-sm text-gray-500 mt-1">Vue d'ensemble de votre activité</p>
      </div>
      
      <!-- Boutons d'action rapide -->
      <div class="flex gap-2 sm:gap-3">
        <NuxtLink to="/dashboard/create-link" class="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60] transition-colors">
          <span>+</span> Lien
        </NuxtLink>
        <NuxtLink to="/dashboard/invoices/create" class="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60] transition-colors">
          <span>+</span> Facture
        </NuxtLink>
        <NuxtLink to="/dashboard/sales-pages/create" class="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60] transition-colors">
          <span>+</span> Page
        </NuxtLink>
      </div>
    </div>

    <!-- Filtre période -->
    <div class="relative inline-block">
      <select v-model="selectedPeriod" @change="fetchDashboard" class="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2ECC71] cursor-pointer" :disabled="loading">
        <option value="">Toute la période</option>
        <option value="today">Aujourd'hui</option>
        <option value="this_week">Cette semaine</option>
        <option value="this_month">Ce mois</option>
        <option value="last_month">Mois dernier</option>
        <option value="this_year">Cette année</option>
      </select>
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-8 h-8 border-3 border-[#2ECC71] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-5 sm:space-y-6">
      <!-- Cartes principales -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <p class="text-xs text-[#4A5568] uppercase tracking-wider font-semibold">TOTAL COLLECTÉ</p>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 sm:mt-4">{{ formatAmount(data.transactions.collected) }} {{ currencySymbol }}</p>
          <p class="text-sm text-gray-400 mt-2 sm:mt-3">{{ data.transactions.paid }} payées</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <p class="text-xs text-[#4A5568] uppercase tracking-wider font-semibold">TRANSACTIONS</p>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 sm:mt-4">{{ data.transactions.total }}</p>
          <p class="text-sm text-gray-400 mt-2 sm:mt-3">{{ data.transactions.paid }} payées</p>
        </div>
      </div>

      <!-- État des paiements -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button @click="showPaymentStatus = !showPaymentStatus" class="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors">
          <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wide">ÉTAT DES PAIEMENTS</h2>
          <svg class="w-5 h-5 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': !showPaymentStatus }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
        </button>
        <div v-show="showPaymentStatus" class="px-4 sm:px-6 pb-4 sm:pb-6">
          <div class="grid grid-cols-2 gap-3 sm:gap-6">
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="min-w-0">
                <p class="text-xs text-gray-400">Paiements échoués</p>
                <p class="text-base sm:text-xl font-bold text-gray-900">{{ data.transactions.failed || 0 }}</p>
                <p class="text-xs text-gray-400 truncate">{{ formatAmount(data.transactions.failed_amount || 0) }} {{ currencySymbol }} perdus</p>
              </div>
            </div>
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="min-w-0">
                <p class="text-xs text-gray-400">En attente</p>
                <p class="text-base sm:text-xl font-bold text-gray-900">{{ data.transactions.pending }}</p>
                <p class="text-xs text-gray-400 truncate">{{ formatAmount(data.transactions.pending_amount || 0) }} {{ currencySymbol }} à venir</p>
              </div>
            </div>
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
              <div class="min-w-0">
                <p class="text-xs text-gray-400">Taux de réussite</p>
                <p class="text-base sm:text-xl font-bold text-gray-900">{{ successRate }}%</p>
                <p class="text-xs text-gray-400 truncate">Sur {{ data.transactions.total }} transactions</p>
              </div>
            </div>
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span class="text-blue-500 font-bold text-xs sm:text-sm">$</span>
              </div>
              <div class="min-w-0">
                <p class="text-xs text-gray-400">Montant moyen</p>
                <p class="text-base sm:text-xl font-bold text-gray-900">{{ formatAmount(averageAmount) }} {{ currencySymbol }}</p>
                <p class="text-xs text-gray-400">Par transaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bannière 1 -->
      <div v-if="getBannerAt(0)" class="relative rounded-xl overflow-hidden border border-gray-200" :class="getBannerBgClass(0)">
        <div class="flex flex-col sm:flex-row">
          <div class="sm:w-2/5 h-40 sm:h-auto"><img :src="getBannerAt(0).image_url" :alt="getBannerAt(0).title" class="w-full h-full object-cover"/></div>
          <div class="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2"><span>🚀</span>{{ getBannerAt(0).title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ getBannerAt(0).description }}</p>
            <div class="mt-4"><a v-if="getBannerAt(0).url" :href="getBannerAt(0).url" target="_blank" class="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60]">{{ getBannerAt(0).button_text || 'Découvrir' }}</a></div>
          </div>
        </div>
        <button @click="closeBanner(getBannerAt(0).id)" class="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>

      <!-- 3 Cartes statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-xs sm:text-sm font-bold text-gray-900 uppercase">LIENS DE PAIEMENT</h3>
            <NuxtLink to="/dashboard/links" class="text-sm text-[#2ECC71] hover:text-[#27AE60] font-medium">Voir tout</NuxtLink>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">liens créés</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.links.total }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">actifs</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.links.active }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">clics totaux</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.links.clicks }}</span></div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-xs sm:text-sm font-bold text-gray-900 uppercase">PAGES DE VENTE</h3>
            <NuxtLink to="/dashboard/sales-pages" class="text-sm text-[#2ECC71] hover:text-[#27AE60] font-medium">Voir tout</NuxtLink>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">pages créées</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.sales_pages.total }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">publiées</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.sales_pages.published }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">vues</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.sales_pages.views }}</span></div>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-xs sm:text-sm font-bold text-gray-900 uppercase">FACTURES</h3>
            <NuxtLink to="/dashboard/invoices" class="text-sm text-[#2ECC71] hover:text-[#27AE60] font-medium">Voir tout</NuxtLink>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">factures créées</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.invoices.total }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">payées</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ data.invoices.paid }}</span></div>
            <div class="flex items-center justify-between py-2 sm:py-3"><span class="text-sm text-gray-600">total facturé</span><span class="text-base sm:text-lg font-semibold text-gray-900">{{ formatAmount(data.invoices.amount_total) }} {{ currencySymbol }}</span></div>
          </div>
        </div>
      </div>

      <!-- Bannière 2 -->
      <div v-if="getBannerAt(1)" class="relative rounded-xl overflow-hidden border border-gray-200" :class="getBannerBgClass(1)">
        <div class="flex flex-col sm:flex-row">
          <div class="sm:w-2/5 h-40 sm:h-auto"><img :src="getBannerAt(1).image_url" :alt="getBannerAt(1).title" class="w-full h-full object-cover"/></div>
          <div class="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2"><span>💎</span>{{ getBannerAt(1).title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ getBannerAt(1).description }}</p>
            <div class="mt-4"><a v-if="getBannerAt(1).url" :href="getBannerAt(1).url" target="_blank" class="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60]">{{ getBannerAt(1).button_text || 'Voir les offres' }}</a></div>
          </div>
        </div>
        <button @click="closeBanner(getBannerAt(1).id)" class="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>

      <!-- Graphiques -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 class="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4 sm:mb-6">REVENUS (7 DERNIERS JOURS)</h3>
          <div v-if="data.daily_stats.length > 0" class="space-y-2">
            <div v-for="stat in data.daily_stats" :key="stat.date" class="flex items-center justify-between py-1">
              <span class="text-sm text-gray-600">{{ formatShortDate(stat.date) }}</span>
              <span class="text-sm font-medium text-gray-900">{{ formatAmount(stat.revenue) }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-8">Aucune donnée</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 class="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4 sm:mb-6">PERFORMANCE MENSUELLE</h3>
          <div class="space-y-4 sm:space-y-6">
            <div><p class="text-sm text-gray-500">Ce mois</p><p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ formatAmount(data.monthly_performance.current) }} {{ currencySymbol }}</p></div>
            <div><p class="text-sm text-gray-500">Mois dernier</p><p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ formatAmount(data.monthly_performance.previous) }} {{ currencySymbol }}</p></div>
          </div>
        </div>
      </div>

      <!-- Bannière 3 -->
      <div v-if="getBannerAt(2)" class="relative rounded-xl overflow-hidden border border-gray-200" :class="getBannerBgClass(2)">
        <div class="flex flex-col sm:flex-row">
          <div class="sm:w-2/5 h-40 sm:h-auto"><img :src="getBannerAt(2).image_url" :alt="getBannerAt(2).title" class="w-full h-full object-cover"/></div>
          <div class="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2"><span>🎓</span>{{ getBannerAt(2).title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ getBannerAt(2).description }}</p>
            <div class="mt-4"><a v-if="getBannerAt(2).url" :href="getBannerAt(2).url" target="_blank" class="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#2ECC71] text-white text-sm font-medium rounded-lg hover:bg-[#27AE60]">{{ getBannerAt(2).button_text || 'Commencer' }}</a></div>
          </div>
        </div>
        <button @click="closeBanner(getBannerAt(2).id)" class="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>

      <!-- Dernières transactions -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h3 class="text-xs text-gray-400 uppercase tracking-wider font-medium">DERNIÈRES TRANSACTIONS</h3>
          <NuxtLink to="/dashboard/transactions" class="text-sm text-[#2ECC71] hover:text-[#27AE60] font-medium">Voir tout</NuxtLink>
        </div>
        <div v-if="data.recent_transactions.length > 0" class="divide-y divide-gray-100">
          <div v-for="tx in data.recent_transactions" :key="tx.id" class="flex items-center justify-between py-3 sm:py-4">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">{{ tx.payment_link?.title || 'Transaction' }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatDate(tx.created_at) }}</p>
            </div>
            <div class="flex items-center gap-2 sm:gap-3 ml-3">
              <span class="text-sm font-semibold text-gray-900 whitespace-nowrap">{{ formatAmount(tx.amount) }} {{ tx.currency?.symbol }}</span>
              <span :class="['text-xs px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap', tx.status === 'paid' ? 'bg-green-100 text-green-700' : tx.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700']">{{ getStatusLabel(tx.status) }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 sm:py-12">
          <p class="text-gray-500 font-medium">Aucune transaction pour le moment</p>
          <p class="text-sm text-gray-400 mt-1">Vos transactions apparaîtront ici</p>
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

const loading = ref(true)
const error = ref('')
const selectedPeriod = ref('')
const showPaymentStatus = ref(true)
const banners = ref([])
const closedBanners = ref([])

const visibleBanners = computed(() => banners.value.filter(b => !closedBanners.value.includes(b.id)))
const getBannerAt = (index) => visibleBanners.value[index] || null
const currencySymbol = computed(() => user.value?.currency?.symbol || 'CFA')
const successRate = computed(() => data.value.transactions.total === 0 ? 0 : Math.round((data.value.transactions.paid / data.value.transactions.total) * 100))
const averageAmount = computed(() => data.value.transactions.paid === 0 ? 0 : Math.round(data.value.transactions.collected / data.value.transactions.paid))

const closeBanner = (id) => closedBanners.value.push(id)
const getBannerBgClass = (index) => ['bg-green-50', 'bg-purple-50', 'bg-amber-50'][index % 3]

const data = ref({
  links: { total: 0, active: 0, clicks: 0 },
  invoices: { total: 0, paid: 0, pending: 0, amount_total: 0 },
  sales_pages: { total: 0, published: 0, views: 0 },
  transactions: { total: 0, paid: 0, pending: 0, collected: 0, failed: 0, failed_amount: 0, pending_amount: 0 },
  daily_stats: [],
  recent_transactions: [],
  monthly_performance: { current: 0, previous: 0 }
})

const fetchBanners = async () => {
  try {
    const response = await $fetch('/banners/active', { baseURL: config.public.apiBaseURL, headers: { Authorization: `Bearer ${token.value}` } })
    banners.value = response.data || []
  } catch (err) { console.error('Erreur bannières:', err) }
}

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams()
    if (selectedPeriod.value) params.append('period', selectedPeriod.value)
    const response = await $fetch(`/dashboard/global?${params.toString()}`, { baseURL: config.public.apiBaseURL, headers: { Authorization: `Bearer ${token.value}` } })
    data.value = response.data
  } catch (err) {
    console.error('Erreur dashboard:', err)
    error.value = 'Impossible de charger les données'
  } finally { loading.value = false }
}

const formatAmount = (value) => Number(value || 0).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const diff = Date.now() - date
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'À l\'instant'
  if (hours < 24) return `Il y a ${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `Il y a ${days}j`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
const formatShortDate = (dateString) => new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
const getStatusLabel = (status) => ({ paid: 'Payée', pending: 'En attente', failed: 'Échouée' })[status] || status

onMounted(() => { fetchBanners(); fetchDashboard() })
</script>
