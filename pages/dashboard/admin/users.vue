<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <p class="text-gray-600">Gérer les comptes marchands. Un compte bloqué ne peut plus se connecter.</p>
      </div>
      <input
        v-model="search"
        @keyup.enter="load(1)"
        type="text"
        placeholder="Rechercher (nom, email)…"
        class="border border-gray-300 px-3 py-1.5 text-sm w-64"
      />
    </div>

    <div v-if="message" class="px-4 py-3 text-sm border" :class="message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'">
      {{ message.text }}
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <div class="border border-gray-200 divide-y divide-gray-100">
        <div v-for="u in users" :key="u.id" class="flex items-center justify-between px-4 py-3" :class="{ 'bg-red-50': u.is_blocked }">
          <div>
            <div class="text-sm font-medium text-gray-900">
              {{ u.name }}
              <span v-if="u.is_blocked" class="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Bloqué</span>
            </div>
            <div class="text-sm text-gray-500">{{ u.email }}</div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="openDetails(u)" class="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900">Détails</button>
            <button
              @click="toggleBlock(u)"
              :disabled="busyId === u.id"
              class="px-3 py-1 text-xs font-medium disabled:opacity-40"
              :class="u.is_blocked ? 'text-green-700 hover:text-green-900' : 'text-red-600 hover:text-red-800'"
            >
              {{ u.is_blocked ? 'Débloquer' : 'Bloquer' }}
            </button>
          </div>
        </div>
        <div v-if="!users.length" class="px-4 py-6 text-gray-400">Aucun utilisateur.</div>
      </div>

      <div v-if="pagination.last_page > 1" class="flex items-center justify-between text-sm">
        <button @click="load(pagination.current_page - 1)" :disabled="pagination.current_page <= 1" class="px-3 py-1 border border-gray-300 disabled:opacity-40">Précédent</button>
        <span class="text-gray-500">Page {{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button @click="load(pagination.current_page + 1)" :disabled="pagination.current_page >= pagination.last_page" class="px-3 py-1 border border-gray-300 disabled:opacity-40">Suivant</button>
      </div>
    </template>

    <!-- Modal : fiche détaillée d'un utilisateur (noms affichés via {{ }} = échappés, XSS neutralisé) -->
    <div v-if="detailOpen" class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 overflow-y-auto" @click.self="closeDetails">
      <div class="bg-white w-full max-w-2xl my-8 shadow-xl">
        <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Fiche utilisateur</h2>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>

        <div v-if="detailLoading" class="flex items-center justify-center py-16">
          <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div v-else-if="detail" class="p-5 space-y-5 text-sm">
          <!-- Identité -->
          <div>
            <div class="text-base font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
              {{ detail.user.name }}
              <span v-if="detail.user.is_blocked" class="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Bloqué</span>
              <span v-if="detail.user.is_premium" class="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">Premium</span>
              <span class="px-2 py-0.5 text-xs rounded" :class="kycBadge(detail.user.kyc_status)">KYC : {{ kycLabel(detail.user.kyc_status) }}</span>
            </div>
            <div class="text-gray-500">{{ detail.user.email }}</div>
            <div class="text-gray-500 mt-1">
              Pays : <span class="text-gray-800">{{ detail.user.country_code || '—' }}</span>
              · Adhésion : <span class="text-gray-800">{{ fmtDate(detail.user.joined_at) }}</span>
            </div>
            <div v-if="detail.user.is_blocked && detail.user.blocked_reason" class="text-red-600 mt-1">Motif du blocage : {{ detail.user.blocked_reason }}</div>
          </div>

          <!-- Profit LeekPay (mis en avant) -->
          <div class="border-2 border-green-300 bg-green-50 p-4">
            <div class="text-xs text-gray-500 uppercase">Profit généré pour LeekPay</div>
            <div class="text-2xl font-bold text-green-700">{{ fmtXof(detail.leekpay_profit_xof) }}</div>
            <div class="text-xs text-gray-500">part LeekPay sur paiements réussis + retraits traités · cumul depuis l'inscription</div>
          </div>

          <!-- Transactions -->
          <div class="border border-gray-200">
            <div class="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b">Transactions</div>
            <div class="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-gray-100">
              <div class="px-4 py-2"><span class="text-gray-500">Total</span><div class="font-semibold">{{ detail.transactions.total }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Réussies</span><div class="font-semibold text-green-700">{{ detail.transactions.paid }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Échouées</span><div class="font-semibold text-red-600">{{ detail.transactions.failed }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">En cours</span><div class="font-semibold text-orange-600">{{ detail.transactions.pending }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Taux de réussite</span><div class="font-semibold">{{ detail.transactions.success_rate }}%</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Volume encaissé</span><div class="font-semibold">{{ fmtXof(detail.transactions.volume_xof) }}</div></div>
            </div>
          </div>

          <!-- Retraits + solde -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="border border-gray-200">
              <div class="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b">Retraits</div>
              <div class="px-4 py-2 space-y-1">
                <div class="flex justify-between"><span class="text-gray-500">Traités</span><span>{{ detail.withdrawals.processed }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">En attente</span><span>{{ detail.withdrawals.pending }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Montant retiré</span><span class="font-medium">{{ fmtXof(detail.withdrawals.withdrawn_xof) }}</span></div>
              </div>
            </div>
            <div v-if="detail.user.balance" class="border border-gray-200">
              <div class="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b">Solde ({{ detail.user.currency?.code || '—' }})</div>
              <div class="px-4 py-2 space-y-1">
                <div class="flex justify-between"><span class="text-gray-500">Disponible</span><span class="font-medium">{{ fmtMoney(detail.user.balance.available, detail.user.currency) }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">En attente</span><span>{{ fmtMoney(detail.user.balance.pending, detail.user.currency) }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Total gagné</span><span>{{ fmtMoney(detail.user.balance.total_earned, detail.user.currency) }}</span></div>
              </div>
            </div>
          </div>

          <!-- Activité -->
          <div class="border border-gray-200">
            <div class="bg-gray-50 px-4 py-2 font-semibold text-gray-800 border-b">Activité</div>
            <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
              <div class="px-4 py-2"><span class="text-gray-500">Liens</span><div class="font-semibold">{{ detail.counts.payment_links }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Pages</span><div class="font-semibold">{{ detail.counts.sales_pages }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Factures</span><div class="font-semibold">{{ detail.counts.invoices }}</div></div>
              <div class="px-4 py-2"><span class="text-gray-500">Abonnements</span><div class="font-semibold">{{ detail.counts.subscriptions }}</div></div>
            </div>
          </div>
        </div>

        <div v-else class="p-5 text-red-600">Impossible de charger la fiche utilisateur.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard', middleware: 'admin' })

const config = useRuntimeConfig()
const { token } = useAuth()
const baseURL = config.public.apiBaseURL
const headers = computed(() => ({ Authorization: `Bearer ${token.value}` }))

const loading = ref(true)
const busyId = ref(null)
const message = ref(null)
const users = ref([])
const search = ref('')
const pagination = reactive({ current_page: 1, last_page: 1 })

const load = async (page = 1) => {
  loading.value = true
  message.value = null
  try {
    const res = await $fetch('/admin/users', { baseURL, headers: headers.value, params: { page, per_page: 20, search: search.value || undefined } })
    const p = res.data
    users.value = p.data ?? []
    pagination.current_page = p.current_page ?? 1
    pagination.last_page = p.last_page ?? 1
  } catch (e) {
    message.value = { type: 'error', text: 'Impossible de charger les utilisateurs.' }
  } finally {
    loading.value = false
  }
}

const toggleBlock = async (u) => {
  const action = u.is_blocked ? 'débloquer' : 'bloquer'
  if (!confirm(`Voulez-vous ${action} le compte de ${u.name} ?`)) return
  busyId.value = u.id
  message.value = null
  try {
    const res = await $fetch(`/admin/users/${u.id}/toggle-block`, { method: 'PUT', baseURL, headers: headers.value })
    u.is_blocked = res.data.is_blocked
    message.value = { type: 'success', text: res.message }
  } catch (e) {
    message.value = { type: 'error', text: e?.data?.message || "Échec de l'opération." }
  } finally {
    busyId.value = null
  }
}

// --- Fiche détaillée (modal) ---
const detailOpen = ref(false)
const detailLoading = ref(false)
const detail = ref(null)

let detailReqId = 0
const openDetails = async (u) => {
  const reqId = ++detailReqId // garde anti-race : seule la dernière requête s'applique
  detailOpen.value = true
  detailLoading.value = true
  detail.value = null
  try {
    const res = await $fetch(`/admin/users/${u.id}`, { baseURL, headers: headers.value })
    if (reqId !== detailReqId) return
    detail.value = res?.success ? res.data : null
  } catch (e) {
    if (reqId === detailReqId) detail.value = null
  } finally {
    if (reqId === detailReqId) detailLoading.value = false
  }
}
const closeDetails = () => { detailOpen.value = false; detail.value = null }

const fmtXof = (n) => Number(n || 0).toLocaleString('fr-FR') + ' XOF'
const fmtMoney = (n, cur) => Number(n || 0).toLocaleString('fr-FR') + (cur?.code ? ' ' + cur.code : '')
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '—'
const kycLabel = (s) => ({ approved: 'Approuvé', pending: 'En attente', rejected: 'Rejeté' }[s] || 'Non soumis')
const kycBadge = (s) => ({ approved: 'bg-green-100 text-green-700', pending: 'bg-orange-100 text-orange-700', rejected: 'bg-red-100 text-red-700' }[s] || 'bg-gray-100 text-gray-600')

onMounted(() => load(1))
</script>
