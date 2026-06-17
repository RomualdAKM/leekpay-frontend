<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Comptabilité</h1>
        <p class="text-gray-600">Chiffre d'affaires − dépenses = profit net (en XOF).</p>
      </div>
      <div class="flex items-end gap-2">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Du</label>
          <input type="date" v-model="period.start" class="border border-gray-300 px-2 py-1 text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Au</label>
          <input type="date" v-model="period.end" class="border border-gray-300 px-2 py-1 text-sm" />
        </div>
        <button @click="loadAll" class="px-3 py-1.5 bg-gray-800 text-white text-sm hover:bg-gray-900">Appliquer</button>
      </div>
    </div>

    <div v-if="message" class="px-4 py-3 text-sm border" :class="message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'">
      {{ message.text }}
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else-if="summary">
      <!-- Cartes -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="border border-gray-200 p-4">
          <div class="text-xs text-gray-500 uppercase">Chiffre d'affaires</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">{{ fmt(summary.revenue.total) }}</div>
        </div>
        <div class="border border-gray-200 p-4">
          <div class="text-xs text-gray-500 uppercase">Dépenses</div>
          <div class="text-2xl font-bold text-gray-900 mt-1">{{ fmt(summary.expenses.total) }}</div>
        </div>
        <div class="border-2 p-4" :class="summary.net_profit >= 0 ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'">
          <div class="text-xs text-gray-500 uppercase">Profit net</div>
          <div class="text-2xl font-bold mt-1" :class="summary.net_profit >= 0 ? 'text-green-700' : 'text-red-700'">{{ fmt(summary.net_profit) }}</div>
        </div>
      </div>

      <!-- Détails -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="border border-gray-200">
          <div class="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 border-b">Revenus par source</div>
          <div class="divide-y divide-gray-100 text-sm">
            <div class="flex justify-between px-4 py-2"><span>Paiements</span><span class="font-medium">{{ fmt(summary.revenue.payments) }}</span></div>
            <div class="flex justify-between px-4 py-2"><span>Retraits (part LeekPay)</span><span class="font-medium">{{ fmt(summary.revenue.withdrawals) }}</span></div>
            <div class="flex justify-between px-4 py-2"><span>Abonnements</span><span class="font-medium">{{ fmt(summary.revenue.subscriptions) }}</span></div>
          </div>
        </div>
        <div class="border border-gray-200">
          <div class="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 border-b">Dépenses par catégorie</div>
          <div class="divide-y divide-gray-100 text-sm">
            <div v-for="(val, cat) in summary.expenses.by_category" :key="cat" class="flex justify-between px-4 py-2">
              <span class="capitalize">{{ cat }}</span><span class="font-medium">{{ fmt(val) }}</span>
            </div>
            <div v-if="!Object.keys(summary.expenses.by_category).length" class="px-4 py-3 text-gray-400">Aucune dépense sur la période.</div>
          </div>
        </div>
      </div>
    </template>

    <!-- Gestion des dépenses -->
    <div class="border border-gray-200">
      <div class="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 border-b flex items-center justify-between">
        <span>Dépenses</span>
        <button @click="openForm()" class="px-3 py-1 bg-green-600 text-white text-xs hover:bg-green-700">Ajouter</button>
      </div>

      <!-- Formulaire add/edit -->
      <div v-if="form.open" class="p-4 border-b bg-gray-50 grid grid-cols-1 sm:grid-cols-5 gap-2 items-end">
        <div><label class="block text-xs text-gray-500 mb-1">Montant</label><input type="number" step="any" min="0.01" v-model.number="form.amount" class="w-full border border-gray-300 px-2 py-1 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Devise</label>
          <select v-model="form.currency" class="w-full border border-gray-300 px-2 py-1 text-sm"><option v-for="c in currencies" :key="c">{{ c }}</option></select>
        </div>
        <div><label class="block text-xs text-gray-500 mb-1">Catégorie</label>
          <input list="cats" v-model="form.category" class="w-full border border-gray-300 px-2 py-1 text-sm" />
          <datalist id="cats"><option v-for="c in categories" :key="c" :value="c" /></datalist>
        </div>
        <div><label class="block text-xs text-gray-500 mb-1">Date</label><input type="date" v-model="form.expense_date" class="w-full border border-gray-300 px-2 py-1 text-sm" /></div>
        <div class="flex gap-2">
          <button @click="saveExpense" :disabled="savingExpense" class="px-3 py-1.5 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-40">{{ form.id ? 'Modifier' : 'Ajouter' }}</button>
          <button @click="form.open = false" class="px-3 py-1.5 text-sm text-gray-600">Annuler</button>
        </div>
        <div class="sm:col-span-5"><input v-model="form.description" placeholder="Description (optionnelle)" class="w-full border border-gray-300 px-2 py-1 text-sm" /></div>
      </div>

      <div class="divide-y divide-gray-100 text-sm">
        <div v-for="exp in expenses" :key="exp.id" class="flex items-center justify-between px-4 py-2">
          <div class="flex-1">
            <span class="font-medium">{{ Number(exp.amount).toLocaleString('fr-FR') }} {{ exp.currency }}</span>
            <span class="text-gray-500 ml-2 capitalize">{{ exp.category }}</span>
            <span class="text-gray-400 ml-2">{{ exp.expense_date }}</span>
            <span v-if="exp.description" class="text-gray-400 ml-2 italic">— {{ exp.description }}</span>
          </div>
          <div class="flex gap-2">
            <button @click="openForm(exp)" class="text-xs text-gray-600 hover:text-gray-900">Modifier</button>
            <button @click="removeExpense(exp)" class="text-xs text-red-600 hover:text-red-800">Supprimer</button>
          </div>
        </div>
        <div v-if="!loading && !expenses.length" class="px-4 py-4 text-gray-400">Aucune dépense.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard', middleware: 'admin' })

const config = useRuntimeConfig()
const { token } = useAuth()
const headers = computed(() => ({ Authorization: `Bearer ${token.value}` }))
const baseURL = config.public.apiBaseURL

const loading = ref(true)
const savingExpense = ref(false)
const message = ref(null)
const summary = ref(null)
const expenses = ref([])
const categories = ref([])
const currencies = ['XOF', 'XAF', 'EUR', 'USD', 'GHS']

const today = new Date()
const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
// Date locale (Y-m-d) SANS passer par UTC : toISOString() décalerait d'un jour
// pour les admins à fuseau non-UTC (ex. GMT+1 en début de mois -> mois précédent).
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const period = reactive({ start: iso(firstOfMonth), end: iso(today) })

const form = reactive({ open: false, id: null, amount: null, currency: 'XOF', category: 'other', description: '', expense_date: iso(today) })

const fmt = (n) => Number(n || 0).toLocaleString('fr-FR') + ' XOF'

const loadSummary = async () => {
  const res = await $fetch('/admin/accounting/summary', { baseURL, headers: headers.value, params: { start_date: period.start, end_date: period.end } })
  summary.value = res.data
}
const loadExpenses = async () => {
  const res = await $fetch('/admin/accounting/expenses', { baseURL, headers: headers.value, params: { start_date: period.start, end_date: period.end } })
  expenses.value = res.data.data ?? []
  categories.value = res.categories ?? []
}
const loadAll = async () => {
  loading.value = true
  message.value = null
  try {
    await Promise.all([loadSummary(), loadExpenses()])
  } catch (e) {
    message.value = { type: 'error', text: "Impossible de charger la comptabilité." }
  } finally {
    loading.value = false
  }
}

const openForm = (exp = null) => {
  if (exp) {
    Object.assign(form, { open: true, id: exp.id, amount: Number(exp.amount), currency: exp.currency, category: exp.category, description: exp.description || '', expense_date: exp.expense_date })
  } else {
    Object.assign(form, { open: true, id: null, amount: null, currency: 'XOF', category: 'other', description: '', expense_date: iso(today) })
  }
}

const saveExpense = async () => {
  if (savingExpense.value) return
  if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) {
    message.value = { type: 'error', text: 'Montant invalide.' }
    return
  }
  savingExpense.value = true
  message.value = null
  const body = { amount: Number(form.amount), currency: form.currency, category: form.category, description: form.description || null, expense_date: form.expense_date }
  try {
    if (form.id) {
      await $fetch(`/admin/accounting/expenses/${form.id}`, { method: 'PUT', baseURL, headers: headers.value, body })
    } else {
      await $fetch('/admin/accounting/expenses', { method: 'POST', baseURL, headers: headers.value, body })
    }
    form.open = false
    message.value = { type: 'success', text: 'Dépense enregistrée.' }
    await loadAll()
  } catch (e) {
    message.value = { type: 'error', text: e?.data?.message || "Échec de l'enregistrement." }
  } finally {
    savingExpense.value = false
  }
}

const removeExpense = async (exp) => {
  if (!confirm('Supprimer cette dépense ?')) return
  try {
    await $fetch(`/admin/accounting/expenses/${exp.id}`, { method: 'DELETE', baseURL, headers: headers.value })
    await loadAll()
  } catch (e) {
    message.value = { type: 'error', text: "Échec de la suppression." }
  }
}

onMounted(loadAll)
</script>
