<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <div class="flex items-center gap-3 mb-2">
        <NuxtLink to="/dashboard/sales-pages" class="text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Analytics</h1>
          <p v-if="analytics?.page" class="text-sm text-gray-500">{{ analytics.page.title }}</p>
        </div>
      </div>
      
      <!-- Période -->
      <div class="flex items-center gap-3 mt-4">
        <select 
          v-model="selectedPeriod"
          @change="fetchAnalytics"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="90">90 derniers jours</option>
          <option value="365">12 derniers mois</option>
        </select>
        
        <a
          v-if="analytics?.page?.public_url"
          :href="analytics.page.public_url"
          target="_blank"
          class="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Voir la page
        </a>
      </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/>
    </div>
    
    <!-- Erreur -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
    </div>
    
    <!-- Contenu -->
    <div v-else-if="analytics" class="space-y-6">
      <!-- Stats résumées -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-xl p-5 border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Visites totales</p>
              <p class="text-2xl font-bold text-gray-900">{{ analytics.summary.total_visits }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-5 border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-gray-500">Visiteurs uniques</p>
              <p class="text-2xl font-bold text-gray-900">{{ analytics.summary.unique_visitors }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Graphique journalier (simplifié) -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h3 class="font-semibold text-gray-900 mb-4">Visites par jour</h3>
        <div v-if="analytics.daily_visits.length > 0" class="space-y-2">
          <div 
            v-for="day in analytics.daily_visits.slice(-14)" 
            :key="day.date"
            class="flex items-center gap-3"
          >
            <span class="text-xs text-gray-500 w-20">{{ formatDate(day.date) }}</span>
            <div class="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
              <div 
                class="h-full bg-emerald-500 rounded"
                :style="{ width: getBarWidth(day.visits) + '%' }"
              />
            </div>
            <span class="text-sm font-medium text-gray-700 w-12 text-right">{{ day.visits }}</span>
          </div>
        </div>
        <p v-else class="text-gray-500 text-sm text-center py-8">Aucune donnée pour cette période</p>
      </div>
      
      <!-- Pays et Referrers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top Pays -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4">Pays principaux</h3>
          <div v-if="analytics.top_countries.length > 0" class="space-y-3">
            <div 
              v-for="country in analytics.top_countries" 
              :key="country.country"
              class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ getCountryFlag(country.country) }}</span>
                <span class="text-sm font-medium text-gray-900">{{ getCountryName(country.country) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div 
                    class="bg-emerald-500 h-2 rounded-full"
                    :style="{ width: getCountryPercentage(country.total) + '%' }"
                  />
                </div>
                <span class="text-sm font-semibold text-gray-900 w-10 text-right">{{ country.total }}</span>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 text-sm text-center py-4">Aucune donnée</p>
        </div>
        
        <!-- Top Referrers -->
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4">Sources de trafic</h3>
          <div v-if="analytics.top_referrers.length > 0" class="space-y-3">
            <div 
              v-for="referrer in analytics.top_referrers" 
              :key="referrer.referrer"
              class="py-2 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-900 truncate flex-1">{{ getDomainFromUrl(referrer.referrer) }}</span>
                <span class="text-sm font-semibold text-gray-900 ml-2">{{ referrer.total }}</span>
              </div>
              <p class="text-xs text-gray-500 truncate">{{ referrer.referrer }}</p>
            </div>
          </div>
          <p v-else class="text-gray-500 text-sm text-center py-4">Aucune donnée (trafic direct)</p>
        </div>
      </div>
      
      <!-- Dernières visites -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold text-gray-900">Dernières visites</h3>
        </div>
        <div class="overflow-x-auto">
          <table v-if="analytics.recent_visits.length > 0" class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pays</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">IP</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(visit, idx) in analytics.recent_visits.slice(0, 20)" :key="idx" class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm text-gray-900">{{ formatDateTime(visit.visited_at) }}</td>
                <td class="px-4 py-3 text-sm">
                  <span class="inline-flex items-center gap-1">
                    <span>{{ getCountryFlag(visit.country) }}</span>
                    <span class="text-gray-700">{{ visit.country || 'N/A' }}</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">
                  {{ visit.referrer ? getDomainFromUrl(visit.referrer) : 'Direct' }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-500 font-mono hidden lg:table-cell">{{ maskIp(visit.visitor_ip) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-gray-500 text-sm text-center py-8">Aucune visite enregistrée</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const config = useRuntimeConfig()
const { token } = useAuth()

const loading = ref(true)
const error = ref('')
const analytics = ref<any>(null)
const selectedPeriod = ref('30')

const fetchAnalytics = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: any; message?: string }>(
      `/sales-pages/${route.params.id}/analytics`,
      {
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` },
        params: { days: selectedPeriod.value }
      }
    )
    if (response.success) {
      analytics.value = response.data
    } else {
      error.value = response.message || 'Erreur lors du chargement'
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Erreur lors du chargement des analytics'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const maxVisits = computed(() => {
  if (!analytics.value?.daily_visits) return 1
  return Math.max(...analytics.value.daily_visits.map((d: any) => d.visits), 1)
})

const maxCountryTotal = computed(() => {
  if (!analytics.value?.top_countries?.length) return 1
  return Math.max(...analytics.value.top_countries.map((c: any) => c.total), 1)
})

const getBarWidth = (visits: number) => {
  return Math.round((visits / maxVisits.value) * 100)
}

const getCountryPercentage = (total: number) => {
  return Math.round((total / maxCountryTotal.value) * 100)
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getDomainFromUrl = (url: string) => {
  if (!url) return 'Direct'
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.substring(0, 30)
  }
}

const maskIp = (ip: string) => {
  if (!ip) return 'N/A'
  const parts = ip.split('.')
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.*.*`
  }
  return ip.substring(0, 10) + '...'
}

// Mapping pays ISO -> drapeau emoji
const countryFlags: Record<string, string> = {
  'FR': '🇫🇷', 'US': '🇺🇸', 'GB': '🇬🇧', 'DE': '🇩🇪', 'ES': '🇪🇸', 
  'IT': '🇮🇹', 'CA': '🇨🇦', 'BE': '🇧🇪', 'CH': '🇨🇭', 'MA': '🇲🇦',
  'SN': '🇸🇳', 'CI': '🇨🇮', 'CM': '🇨🇲', 'TG': '🇹🇬', 'BJ': '🇧🇯',
  'ML': '🇲🇱', 'BF': '🇧🇫', 'NE': '🇳🇪', 'GN': '🇬🇳', 'GA': '🇬🇦',
  'CG': '🇨🇬', 'CD': '🇨🇩', 'Local': '🏠'
}

const countryNames: Record<string, string> = {
  'FR': 'France', 'US': 'États-Unis', 'GB': 'Royaume-Uni', 'DE': 'Allemagne', 
  'ES': 'Espagne', 'IT': 'Italie', 'CA': 'Canada', 'BE': 'Belgique', 
  'CH': 'Suisse', 'MA': 'Maroc', 'SN': 'Sénégal', 'CI': 'Côte d\'Ivoire',
  'CM': 'Cameroun', 'TG': 'Togo', 'BJ': 'Bénin', 'ML': 'Mali', 
  'BF': 'Burkina Faso', 'NE': 'Niger', 'GN': 'Guinée', 'GA': 'Gabon',
  'CG': 'Congo', 'CD': 'RD Congo', 'Local': 'Local'
}

const getCountryFlag = (code: string | null) => {
  if (!code) return '🌍'
  return countryFlags[code] || '🌍'
}

const getCountryName = (code: string | null) => {
  if (!code) return 'Inconnu'
  return countryNames[code] || code
}

onMounted(fetchAnalytics)
</script>
