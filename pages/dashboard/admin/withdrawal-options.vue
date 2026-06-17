<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Opérateurs de retrait</h1>
      <p class="text-gray-600">Ajoutez et activez/désactivez les opérateurs proposés aux marchands pour leurs retraits.</p>
    </div>

    <div v-if="message" class="px-4 py-3 text-sm border" :class="message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'">
      {{ message.text }}
    </div>

    <!-- Ajout -->
    <div class="border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
      <div><label class="block text-xs text-gray-500 mb-1">Pays</label><input v-model="form.country" class="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="Bénin" /></div>
      <div><label class="block text-xs text-gray-500 mb-1">Libellé affiché</label><input v-model="form.label" class="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="MTN Mobile Money Bénin" /></div>
      <div><label class="block text-xs text-gray-500 mb-1">Code opérateur (provider_name)</label><input v-model="form.name" class="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="MTN Benin" /></div>
      <button @click="add" :disabled="adding" class="px-3 py-1.5 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-40">Ajouter</button>
      <p class="sm:col-span-4 text-xs text-gray-400">Le « code opérateur » doit correspondre au mapping payout (ex. « MTN Benin », « Orange Money Côte d'Ivoire »).</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="border border-gray-200 divide-y divide-gray-100">
      <div v-for="o in options" :key="o.id" class="flex items-center justify-between px-4 py-3" :class="{ 'opacity-50': !o.is_active }">
        <div>
          <div class="text-sm font-medium text-gray-900">
            {{ o.label }}
            <span class="text-gray-400 text-xs ml-2">{{ o.country }}</span>
            <span v-if="!o.is_active" class="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">Inactif</span>
          </div>
          <div class="text-xs text-gray-500">{{ o.name }}</div>
        </div>
        <div class="flex gap-3">
          <button @click="toggle(o)" class="text-xs font-medium" :class="o.is_active ? 'text-gray-600 hover:text-gray-900' : 'text-green-700 hover:text-green-900'">
            {{ o.is_active ? 'Désactiver' : 'Activer' }}
          </button>
          <button @click="remove(o)" class="text-xs text-red-600 hover:text-red-800">Supprimer</button>
        </div>
      </div>
      <div v-if="!options.length" class="px-4 py-6 text-gray-400">Aucun opérateur.</div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()
const baseURL = config.public.apiBaseURL
const headers = computed(() => ({ Authorization: `Bearer ${token.value}` }))

const loading = ref(true)
const adding = ref(false)
const message = ref(null)
const options = ref([])
const form = reactive({ country: '', label: '', name: '' })

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch('/admin/withdrawal-options', { baseURL, headers: headers.value })
    options.value = res.data ?? []
  } catch (e) {
    message.value = { type: 'error', text: 'Impossible de charger les opérateurs.' }
  } finally {
    loading.value = false
  }
}

const add = async () => {
  if (adding.value) return
  if (!form.name || !form.label) {
    message.value = { type: 'error', text: 'Le libellé et le code opérateur sont requis.' }
    return
  }
  adding.value = true
  message.value = null
  try {
    await $fetch('/admin/withdrawal-options', {
      method: 'POST', baseURL, headers: headers.value,
      body: { name: form.name, label: form.label, country: form.country || null, type: 'mobile_money', is_active: true },
    })
    form.country = ''; form.label = ''; form.name = ''
    message.value = { type: 'success', text: 'Opérateur ajouté.' }
    await load()
  } catch (e) {
    message.value = { type: 'error', text: e?.data?.message || "Échec de l'ajout." }
  } finally {
    adding.value = false
  }
}

const toggle = async (o) => {
  try {
    const res = await $fetch(`/admin/withdrawal-options/${o.id}/toggle`, { method: 'PATCH', baseURL, headers: headers.value })
    o.is_active = res.data.is_active
  } catch (e) {
    message.value = { type: 'error', text: "Échec de l'opération." }
  }
}

const remove = async (o) => {
  if (!confirm(`Supprimer « ${o.label} » ?`)) return
  try {
    await $fetch(`/admin/withdrawal-options/${o.id}`, { method: 'DELETE', baseURL, headers: headers.value })
    await load()
  } catch (e) {
    message.value = { type: 'error', text: 'Échec de la suppression.' }
  }
}

onMounted(load)
</script>
