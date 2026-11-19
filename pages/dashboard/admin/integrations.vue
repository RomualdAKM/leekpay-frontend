<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Intégrations</h1>
        <p class="text-gray-600">Sites qui ont intégré LeekPay, détectés automatiquement à chaque paiement</p>
      </div>
      <button
        @click="loadIntegrations()"
        :disabled="loading"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 shrink-0"
      >
        <RefreshCwIcon class="w-4 h-4 inline mr-2" :class="{ 'animate-spin': loading }" />
        Actualiser
      </button>
    </div>

    <!-- Résumé -->
    <div class="grid grid-cols-2 gap-4 max-w-md">
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Sites détectés</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ summary.domains }}</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Marchands</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ summary.merchants }}</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <label class="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
          <input
            v-model="search"
            type="text"
            placeholder="Site, nom ou email du marchand..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @input="debouncedSearch"
          />
        </div>
        <div class="min-w-56">
          <label class="block text-sm font-medium text-gray-700 mb-1">Périmètre</label>
          <select
            v-model="scope"
            @change="loadIntegrations()"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="integrations">API et widget uniquement</option>
            <option value="all">Toutes les sources (liens inclus)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading && !rows.length" class="flex items-center justify-center py-12">
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

      <div v-else-if="!rows.length" class="p-6 text-center">
        <GlobeIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">Aucun site intégrateur détecté pour le moment</p>
      </div>

      <div v-else>
        <!-- Desktop -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marchand</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Encaissé</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière activité</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="row in rows" :key="`${row.user_id}|${row.domain}`" class="hover:bg-gray-50">
                <td class="px-6 py-4 max-w-64">
                  <a
                    :href="row.url"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="text-sm font-medium text-green-700 hover:underline break-all"
                  >{{ row.domain }}</a>
                  <div class="text-xs text-gray-400">depuis {{ formatDate(row.first_seen) }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900 flex items-center gap-2">
                    {{ row.user?.name || '—' }}
                    <span v-if="row.user?.is_blocked" class="px-1.5 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700 rounded">Bloqué</span>
                  </div>
                  <div class="text-xs text-gray-500">{{ row.user?.email }}</div>
                  <div class="text-xs text-gray-400">
                    {{ row.api_keys_active }} clé(s) API active(s)
                    <template v-if="row.api_key_last_used_at"> · utilisée {{ formatDate(row.api_key_last_used_at) }}</template>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="c in row.channels"
                      :key="c"
                      class="inline-flex px-2 py-0.5 text-xs font-medium rounded"
                      :class="getSourceClass(c)"
                    >{{ getSourceLabel(c) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ row.sessions }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ row.transactions }}
                  <span class="text-xs text-gray-500">({{ row.paid_transactions }} payée{{ row.paid_transactions > 1 ? 's' : '' }})</span>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                  <div v-if="!row.paid_totals.length" class="text-gray-400 font-normal">—</div>
                  <div v-for="t in row.paid_totals" :key="t.currency">{{ formatCurrency(t.amount, t.currency) }}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ formatDate(row.last_seen) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <NuxtLink
                    :to="{ path: '/dashboard/admin/transactions', query: { source_domain: row.domain } }"
                    class="text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Voir transactions
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile -->
        <div class="md:hidden space-y-4 p-4">
          <div v-for="row in rows" :key="`m-${row.user_id}|${row.domain}`" class="border border-gray-200 rounded-lg p-4 space-y-2">
            <div class="flex items-start justify-between gap-2">
              <a :href="row.url" target="_blank" rel="noopener noreferrer nofollow" class="font-medium text-green-700 break-all">{{ row.domain }}</a>
              <div class="flex flex-wrap gap-1 shrink-0">
                <span
                  v-for="c in row.channels"
                  :key="c"
                  class="inline-flex px-2 py-0.5 text-xs font-medium rounded"
                  :class="getSourceClass(c)"
                >{{ getSourceLabel(c) }}</span>
              </div>
            </div>
            <div class="text-sm text-gray-900">{{ row.user?.name }} <span class="text-gray-500">· {{ row.user?.email }}</span></div>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div><span class="text-xs text-gray-500 block">Transactions</span>{{ row.transactions }} ({{ row.paid_transactions }} payées)</div>
              <div>
                <span class="text-xs text-gray-500 block">Encaissé</span>
                <span v-if="!row.paid_totals.length">—</span>
                <span v-for="t in row.paid_totals" :key="t.currency" class="block">{{ formatCurrency(t.amount, t.currency) }}</span>
              </div>
              <div><span class="text-xs text-gray-500 block">Sessions</span>{{ row.sessions }}</div>
              <div><span class="text-xs text-gray-500 block">Dernière activité</span>{{ formatDate(row.last_seen) }}</div>
            </div>
            <NuxtLink
              :to="{ path: '/dashboard/admin/transactions', query: { source_domain: row.domain } }"
              class="inline-block text-sm font-medium text-green-600"
            >Voir transactions →</NuxtLink>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">{{ pagination.total }} site(s)</div>
            <div class="flex items-center gap-2">
              <button
                @click="loadIntegrations(pagination.current_page - 1)"
                :disabled="pagination.current_page <= 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >Précédent</button>
              <span class="px-3 py-1 text-sm bg-green-600 text-white rounded">{{ pagination.current_page }}</span>
              <button
                @click="loadIntegrations(pagination.current_page + 1)"
                :disabled="pagination.current_page >= pagination.last_page"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RefreshCwIcon, AlertCircleIcon, GlobeIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()

const rows = ref([])
const summary = ref({ domains: 0, merchants: 0 })
const pagination = ref({ current_page: 1, last_page: 1, total: 0 })
const loading = ref(true)
const error = ref(null)
const search = ref('')
const scope = ref('integrations')

const SOURCE_LABELS = { api: 'API', widget: 'Widget', link: 'Lien', invoice: 'Facture', sales_page: 'Page de vente' }
const SOURCE_CLASSES = {
  api: 'bg-purple-100 text-purple-700',
  widget: 'bg-blue-100 text-blue-700',
  link: 'bg-gray-100 text-gray-700',
  invoice: 'bg-amber-100 text-amber-700',
  sales_page: 'bg-teal-100 text-teal-700'
}
const getSourceLabel = (c) => SOURCE_LABELS[c] || c
const getSourceClass = (c) => SOURCE_CLASSES[c] || 'bg-gray-50 text-gray-500'

const formatCurrency = (amount, currencyCode = 'XOF') => {
  const code = currencyCode || 'XOF'
  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: code === 'XOF' ? 0 : 2,
      maximumFractionDigits: code === 'XOF' ? 0 : 2
    }).format(amount || 0)
  } catch (e) {
    return `${amount} ${code}`
  }
}

const formatDate = (date) => {
  if (!date) return '—'
  const d = new Date(String(date).replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const loadIntegrations = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const params = new URLSearchParams({ page: String(page), per_page: '25', scope: scope.value })
    if (search.value.trim()) params.append('search', search.value.trim())

    const response = await fetch(`${config.public.apiBaseURL}/admin/integrations?${params}`, {
      headers: { Authorization: `Bearer ${token.value}`, Accept: 'application/json' }
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Erreur lors du chargement des intégrations')
    }

    rows.value = data.data.data
    summary.value = data.data.summary
    pagination.value = {
      current_page: data.data.current_page,
      last_page: data.data.last_page,
      total: data.data.total
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des intégrations'
  } finally {
    loading.value = false
  }
}

let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => loadIntegrations(), 400)
}

onMounted(() => loadIntegrations())
onUnmounted(() => clearTimeout(searchTimeout))
</script>
