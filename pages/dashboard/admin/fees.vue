<template>
  <div class="space-y-6 max-w-3xl">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Configuration des frais</h1>
      <p class="text-gray-600">Frais LeekPay (paiement, retrait, abonnement). Les modifications ne s'appliquent qu'aux <strong>nouvelles</strong> opérations.</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <div
        v-if="message"
        class="px-4 py-3 text-sm border"
        :class="message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'"
      >
        {{ message.text }}
      </div>

      <div class="bg-amber-50 border-l-2 border-amber-400 px-4 py-3 text-sm text-amber-800">
        Pour chaque barème de retrait, <strong>Part LeekPay + Part agrégateur doivent faire 100%</strong>.
        Les taux sont en pourcentage ; les minimums en montant de la devise.
      </div>

      <div v-for="group in groups" :key="group.title" class="border border-gray-200">
        <div class="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-200">
          {{ group.title }}
        </div>
        <div class="divide-y divide-gray-100">
          <div v-for="item in group.items" :key="item.key" class="flex items-center justify-between px-4 py-3">
            <span class="text-sm text-gray-700">{{ item.label }}</span>
            <div class="flex items-center gap-1">
              <input
                type="number"
                step="any"
                min="0"
                v-model.number="form[item.key]"
                class="w-28 text-right border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:border-green-500"
              />
              <span class="text-xs text-gray-400 w-8">{{ item.kind === 'rate' ? '%' : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="save"
          :disabled="!isDirty || saving"
          class="px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {{ saving ? 'Enregistrement…' : 'Enregistrer' }}
        </button>
        <button v-if="isDirty" @click="reset" :disabled="saving" class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
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

const groups = ref([])
const kinds = {}            // key -> 'rate' | 'amount'
const form = reactive({})   // key -> valeur affichée (% pour les taux)
const original = reactive({})

// Affichage : un taux 0.02 s'affiche 2 (%). Un montant reste tel quel.
const toDisplay = (key, kind, value) => kind === 'rate' ? Math.round(value * 100 * 10000) / 10000 : value
const toStored = (key, kind, display) => kind === 'rate' ? Number(display) / 100 : Number(display)

// Comparaison avec tolérance (évite un faux "dirty" dû aux flottants).
const changedKey = (k) => Math.abs((Number(form[k]) || 0) - (Number(original[k]) || 0)) > 1e-9
const isDirty = computed(() => Object.keys(form).some(changedKey))

const reset = () => {
  for (const k of Object.keys(original)) form[k] = original[k]
}

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch('/admin/fees', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
    })
    groups.value = res.data.groups
    for (const group of res.data.groups) {
      for (const item of group.items) {
        kinds[item.key] = item.kind
        const display = toDisplay(item.key, item.kind, res.data.fees[item.key])
        form[item.key] = display
        original[item.key] = display
      }
    }
  } catch (e) {
    message.value = { type: 'error', text: "Impossible de charger les frais." }
  } finally {
    loading.value = false
  }
}

const save = async () => {
  if (!isDirty.value || saving.value) return

  const changed = Object.keys(form).filter(changedKey)

  // Garde : refuser tout champ vide / non numérique avant l'envoi.
  const invalid = changed.find(k => !Number.isFinite(Number(form[k])))
  if (invalid) {
    message.value = { type: 'error', text: 'Veuillez saisir une valeur numérique valide pour tous les champs modifiés.' }
    return
  }

  saving.value = true
  message.value = null
  try {
    const fees = changed.map(k => ({ key: k, value: toStored(k, kinds[k], form[k]) }))

    const res = await $fetch('/admin/fees', {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { fees },
    })

    // Resynchroniser depuis la réponse autoritaire.
    for (const k of Object.keys(form)) {
      if (res.data.fees[k] !== undefined) {
        const d = toDisplay(k, kinds[k], res.data.fees[k])
        form[k] = d
        original[k] = d
      }
    }
    message.value = { type: 'success', text: res.message || 'Frais mis à jour.' }
  } catch (e) {
    message.value = { type: 'error', text: e?.data?.message || "Échec de la mise à jour." }
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
