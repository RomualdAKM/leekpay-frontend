<template>
  <div class="p-4 sm:p-6">
    <!-- Header + Filtre période -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Statistiques Admin</h1>
        <p class="text-sm text-gray-500">Vue d'ensemble de la plateforme</p>
      </div>
      <div class="flex items-center gap-3">
        <select 
          v-model="selectedPeriod" 
          @change="loadStats"
          class="px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="today">Aujourd'hui</option>
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="3m">3 mois</option>
          <option value="6m">6 mois</option>
          <option value="1y">1 an</option>
          <option value="all">Tout</option>
        </select>
        <span class="text-xs text-gray-400">{{ formatDateTime(new Date()) }}</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="border border-red-300 p-4 text-red-700 text-sm">
      {{ error }}
    </div>

    <template v-else-if="stats">
      <!-- KPIs Principaux -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Utilisateurs</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.users?.all_time || 0 }}</p>
          <p class="text-xs text-gray-400 mt-1">+{{ stats.users?.this_month || 0 }} ce mois</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Transactions</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.transactions?.total || 0 }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ stats.transactions?.conversion_rate || 0 }}% conversion</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Volume</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ formatCurrency(stats.transactions?.volume || 0) }}</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Profit LeekPay</p>
          <div class="mt-1 space-y-1">
            <div v-for="(profit, currency) in stats.leekpay_profit_by_currency" :key="currency" class="flex justify-between">
              <span class="text-xs text-gray-500">{{ currency }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ formatCurrencyByCode(profit, currency) }}</span>
            </div>
            <p v-if="!stats.leekpay_profit_by_currency || Object.keys(stats.leekpay_profit_by_currency).length === 0" class="text-sm text-gray-400">-</p>
          </div>
        </div>
      </div>

      <!-- Retraits + KYC -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">Retraits en attente</p>
              <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.withdrawals?.pending || 0 }}</p>
            </div>
            <NuxtLink to="/dashboard/admin/withdrawals" class="text-xs text-green-600 hover:text-green-700">
              Gérer →
            </NuxtLink>
          </div>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Retraits traités</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.withdrawals?.processed || 0 }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ formatCurrency(stats.withdrawals?.volume || 0) }}</p>
        </div>
        <div class="border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">KYC en attente</p>
              <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.kyc?.pending || 0 }}</p>
            </div>
            <NuxtLink to="/dashboard/admin/kyc" class="text-xs text-green-600 hover:text-green-700">
              Gérer →
            </NuxtLink>
          </div>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">KYC approuvés</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.kyc?.approved || 0 }}</p>
        </div>
      </div>

      <!-- Produits : Liens, Pages, Factures -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <!-- Liens de paiement -->
        <div class="border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-900">Liens de paiement</p>
            <NuxtLink to="/dashboard/admin/links" class="text-xs text-green-600 hover:text-green-700">Voir →</NuxtLink>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Total</span>
              <span class="font-medium">{{ stats.payment_links?.total || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Actifs</span>
              <span class="text-green-600">{{ stats.payment_links?.active || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Inactifs</span>
              <span class="text-gray-400">{{ stats.payment_links?.inactive || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Pages de vente -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Pages de vente</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Total</span>
              <span class="font-medium">{{ stats.sales_pages?.total || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Publiées</span>
              <span class="text-green-600">{{ stats.sales_pages?.published || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Brouillons</span>
              <span class="text-gray-400">{{ stats.sales_pages?.draft || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Vues</span>
              <span class="font-medium">{{ stats.sales_pages?.views || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Factures -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Factures</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Total</span>
              <span class="font-medium">{{ stats.invoices?.total || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Payées</span>
              <span class="text-green-600">{{ stats.invoices?.paid || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Envoyées</span>
              <span class="text-gray-600">{{ stats.invoices?.sent || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">En retard</span>
              <span class="text-red-600">{{ stats.invoices?.overdue || 0 }}</span>
            </div>
            <div class="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2">
              <span class="text-gray-500">Montant encaissé</span>
              <span class="font-medium">{{ formatCurrency(stats.invoices?.total_amount || 0) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Utilisateurs par pays -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Top 10 pays</p>
          <div class="space-y-2">
            <div v-for="country in stats.users?.by_country || []" :key="country.country_code" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ getCountryFlag(country.country_code) }}</span>
                <span class="text-sm text-gray-600">{{ getCountryName(country.country_code) }}</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ country.count }}</span>
            </div>
            <p v-if="!stats.users?.by_country?.length" class="text-sm text-gray-400 text-center py-4">Aucune donnée</p>
          </div>
        </div>

        <!-- Transactions par statut -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Transactions par statut</p>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Payées</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-100">
                  <div class="h-2 bg-green-600" :style="{ width: getTransactionPercent('paid') + '%' }"></div>
                </div>
                <span class="text-sm font-medium w-12 text-right">{{ stats.transactions?.by_status?.paid || 0 }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">En attente</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-100">
                  <div class="h-2 bg-yellow-500" :style="{ width: getTransactionPercent('pending') + '%' }"></div>
                </div>
                <span class="text-sm font-medium w-12 text-right">{{ stats.transactions?.by_status?.pending || 0 }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Échouées</span>
              <div class="flex items-center gap-2">
                <div class="w-24 h-2 bg-gray-100">
                  <div class="h-2 bg-red-500" :style="{ width: getTransactionPercent('failed') + '%' }"></div>
                </div>
                <span class="text-sm font-medium w-12 text-right">{{ stats.transactions?.by_status?.failed || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Évolutions mensuelles -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Transactions -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Évolution transactions</p>
          <div class="space-y-2">
            <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
              <span class="text-xs text-gray-500 w-16">{{ month.month_name }}</span>
              <div class="flex-1 mx-3">
                <div class="h-2 bg-gray-100">
                  <div class="h-2 bg-gray-800" :style="{ width: getMonthPercent(month.transactions, 'transactions') + '%' }"></div>
                </div>
              </div>
              <span class="text-xs font-medium text-gray-900 w-10 text-right">{{ month.transactions }}</span>
            </div>
          </div>
        </div>

        <!-- Volume -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Évolution volume</p>
          <div class="space-y-2">
            <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
              <span class="text-xs text-gray-500 w-16">{{ month.month_name }}</span>
              <div class="flex-1 mx-3">
                <div class="h-2 bg-gray-100">
                  <div class="h-2 bg-green-600" :style="{ width: getMonthPercent(month.volume, 'volume') + '%' }"></div>
                </div>
              </div>
              <span class="text-xs font-medium text-gray-900 w-20 text-right">{{ formatCompact(month.volume) }}</span>
            </div>
          </div>
        </div>

        <!-- Nouveaux utilisateurs -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Nouveaux utilisateurs</p>
          <div class="space-y-2">
            <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
              <span class="text-xs text-gray-500 w-16">{{ month.month_name }}</span>
              <div class="flex-1 mx-3">
                <div class="h-2 bg-gray-100">
                  <div class="h-2 bg-blue-500" :style="{ width: getMonthPercent(month.new_users, 'new_users') + '%' }"></div>
                </div>
              </div>
              <span class="text-xs font-medium text-gray-900 w-10 text-right">{{ month.new_users }}</span>
            </div>
          </div>
        </div>

        <!-- Profit -->
        <div class="border border-gray-200 p-4">
          <p class="text-sm font-medium text-gray-900 mb-3">Profit mensuel</p>
          <div class="space-y-2">
            <div v-for="month in stats.monthly_stats" :key="month.month" class="flex items-center justify-between">
              <span class="text-xs text-gray-500 w-16">{{ month.month_name }}</span>
              <div class="flex-1 mx-3">
                <div class="h-2 bg-gray-100">
                  <div class="h-2 bg-emerald-600" :style="{ width: getMonthPercent(month.profit, 'profit') + '%' }"></div>
                </div>
              </div>
              <span class="text-xs font-medium text-gray-900 w-20 text-right">{{ formatCompact(month.profit) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()

const stats = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedPeriod = ref('all')

const countryNames = {
  BJ: 'Bénin', SN: 'Sénégal', CI: 'Côte d\'Ivoire', TG: 'Togo', CM: 'Cameroun',
  BF: 'Burkina Faso', ML: 'Mali', GA: 'Gabon', CG: 'Congo', CD: 'RDC',
  FR: 'France', US: 'États-Unis', CA: 'Canada', BE: 'Belgique', CH: 'Suisse',
  MA: 'Maroc', DZ: 'Algérie', TN: 'Tunisie', NE: 'Niger', GN: 'Guinée'
}

const countryFlags = {
  BJ: '🇧🇯', SN: '🇸🇳', CI: '🇨🇮', TG: '🇹🇬', CM: '🇨🇲',
  BF: '🇧🇫', ML: '🇲🇱', GA: '🇬🇦', CG: '🇨🇬', CD: '🇨🇩',
  FR: '🇫🇷', US: '🇺🇸', CA: '🇨🇦', BE: '🇧🇪', CH: '🇨🇭',
  MA: '🇲🇦', DZ: '🇩🇿', TN: '🇹🇳', NE: '🇳🇪', GN: '🇬🇳'
}

const getCountryName = (code) => countryNames[code] || code
const getCountryFlag = (code) => countryFlags[code] || '🏳️'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(amount || 0)
}

const formatCurrencyByCode = (amount, currency) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount || 0)
}

const formatCompact = (amount) => {
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return (amount / 1000).toFixed(0) + 'K'
  return amount?.toString() || '0'
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const getTransactionPercent = (status) => {
  const total = (stats.value?.transactions?.by_status?.paid || 0) + 
                (stats.value?.transactions?.by_status?.pending || 0) + 
                (stats.value?.transactions?.by_status?.failed || 0)
  if (total === 0) return 0
  return Math.round((stats.value?.transactions?.by_status?.[status] || 0) / total * 100)
}

const getMonthPercent = (value, field) => {
  if (!stats.value?.monthly_stats?.length) return 0
  const max = Math.max(...stats.value.monthly_stats.map(m => m[field] || 0))
  if (max === 0) return 0
  return Math.round((value / max) * 100)
}

const loadStats = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/stats`, {
      params: { period: selectedPeriod.value },
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      stats.value = response.data
    } else {
      throw new Error(response.message || 'Erreur')
    }
  } catch (err) {
    error.value = err.message || 'Erreur de chargement'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
  const interval = setInterval(loadStats, 5 * 60 * 1000)
  onUnmounted(() => clearInterval(interval))
})
</script>
