<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Providers de paiement</h1>
      <p class="text-gray-600">Choisissez le fournisseur utilisé pour les paiements Mobile Money entrants.</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Message -->
      <div
        v-if="message"
        class="px-4 py-3 text-sm border"
        :class="message.type === 'success'
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-700'"
      >
        {{ message.text }}
      </div>

      <!-- Avertissement -->
      <div class="bg-amber-50 border-l-2 border-amber-400 px-4 py-3 text-sm text-amber-800">
        La bascule s'applique aux <strong>nouvelles</strong> transactions Mobile Money. Les paiements déjà
        en cours restent traités et réconciliés par leur provider d'origine. Vous pouvez revenir sur
        Moneroo à tout moment.
      </div>

      <!-- Choix du provider -->
      <div class="border border-gray-200 divide-y divide-gray-200">
        <label
          v-for="p in data.available_providers"
          :key="p.value"
          class="flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed hover:bg-white': isDisabled(p.value) }"
        >
          <input
            type="radio"
            name="payments_provider"
            class="mt-1 accent-green-600"
            :value="p.value"
            v-model="selected"
            :disabled="isDisabled(p.value)"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-900">{{ p.label }}</span>

              <!-- Badge provider actif -->
              <span
                v-if="p.value === data.payments_provider"
                class="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded"
              >Actif</span>

              <!-- Badge environnement Zayono -->
              <span
                v-if="p.value === 'zayono' && data.zayono.configured"
                class="px-2 py-0.5 text-xs rounded"
                :class="data.zayono.environment === 'live'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'"
              >{{ data.zayono.environment === 'live' ? 'Live' : (data.zayono.environment === 'test' ? 'Test' : 'Inconnu') }}</span>
            </div>

            <p v-if="p.value === 'moneroo'" class="text-sm text-gray-500 mt-0.5">
              Fournisseur historique (Mobile Money). Toujours disponible.
            </p>
            <p v-else-if="p.value === 'zayono' && !data.zayono.configured" class="text-sm text-red-600 mt-0.5">
              Non configuré : renseignez <code class="text-xs bg-gray-100 px-1">ZAYONO_API_KEY</code> et
              <code class="text-xs bg-gray-100 px-1">ZAYONO_WEBHOOK_SECRET</code> côté serveur, puis videz le cache de config.
            </p>
            <p v-else-if="p.value === 'zayono'" class="text-sm text-gray-500 mt-0.5">
              Mobile Money via Zayono (page de paiement hébergée).
            </p>
          </div>
        </label>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button
          @click="save"
          :disabled="!isDirty || saving"
          class="px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {{ saving ? 'Enregistrement…' : 'Enregistrer' }}
        </button>
        <button
          v-if="isDirty"
          @click="selected = data.payments_provider"
          :disabled="saving"
          class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Annuler
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()

const loading = ref(true)
const saving = ref(false)
const message = ref(null)

const data = ref({
  payments_provider: 'moneroo',
  available_providers: [],
  zayono: { configured: false, environment: 'unknown', has_api_key: false, has_webhook_secret: false },
})
const selected = ref('moneroo')

const isDirty = computed(() => selected.value !== data.value.payments_provider)

const isDisabled = (provider) => provider === 'zayono' && !data.value.zayono?.configured

const loadSettings = async () => {
  loading.value = true
  try {
    const res = await $fetch('/admin/settings', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
    })
    data.value = res.data
    selected.value = res.data.payments_provider
  } catch (e) {
    message.value = { type: 'error', text: "Impossible de charger les réglages." }
  } finally {
    loading.value = false
  }
}

const save = async () => {
  if (!isDirty.value || saving.value) return
  saving.value = true
  message.value = null
  try {
    const res = await $fetch('/admin/settings', {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { payments_provider: selected.value },
    })
    data.value.payments_provider = res.data.payments_provider
    message.value = { type: 'success', text: res.message || 'Réglages mis à jour.' }
  } catch (e) {
    message.value = { type: 'error', text: e?.data?.message || "Échec de la mise à jour." }
    selected.value = data.value.payments_provider
  } finally {
    saving.value = false
  }
}

onMounted(loadSettings)
</script>
