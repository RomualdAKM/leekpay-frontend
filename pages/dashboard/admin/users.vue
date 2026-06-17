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
          <button
            @click="toggleBlock(u)"
            :disabled="busyId === u.id"
            class="px-3 py-1 text-xs font-medium disabled:opacity-40"
            :class="u.is_blocked ? 'text-green-700 hover:text-green-900' : 'text-red-600 hover:text-red-800'"
          >
            {{ u.is_blocked ? 'Débloquer' : 'Bloquer' }}
          </button>
        </div>
        <div v-if="!users.length" class="px-4 py-6 text-gray-400">Aucun utilisateur.</div>
      </div>

      <div v-if="pagination.last_page > 1" class="flex items-center justify-between text-sm">
        <button @click="load(pagination.current_page - 1)" :disabled="pagination.current_page <= 1" class="px-3 py-1 border border-gray-300 disabled:opacity-40">Précédent</button>
        <span class="text-gray-500">Page {{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button @click="load(pagination.current_page + 1)" :disabled="pagination.current_page >= pagination.last_page" class="px-3 py-1 border border-gray-300 disabled:opacity-40">Suivant</button>
      </div>
    </template>
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

onMounted(() => load(1))
</script>
