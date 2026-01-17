<template>
  <div class="p-4 sm:p-6 space-y-6">
    <div>
      <p class="text-sm text-gray-500">Gagnez des commissions en partageant votre code promo</p>
    </div>

    <div v-if="!user?.is_premium" class="border border-gray-200 p-6">
      <div class="flex items-start gap-4">
        <Gift class="w-6 h-6 text-gray-400 flex-shrink-0" />
        <div class="flex-1">
          <h3 class="font-medium text-gray-900 mb-2">Programme d'affiliation</h3>
          <p class="text-sm text-gray-500 mb-4">
            Passez Premium pour générer votre code promo. 15% pour vos amis, 15% pour vous.
          </p>
          <NuxtLink 
            to="/dashboard/subscription" 
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
          >
            <span>Passer Premium</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="border border-gray-200 p-6">
        <div class="flex items-center gap-2 mb-3">
          <Gift class="w-5 h-5 text-gray-400" />
          <h3 class="font-medium text-gray-900">Votre code promo</h3>
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Partagez votre code. {{ affiliation.discount_percent }}% de réduction pour eux, {{ affiliation.commission_percent }}% de commission pour vous.
        </p>

        <div v-if="loading" class="py-8 text-center text-gray-500">
          <RefreshCw class="w-5 h-5 animate-spin mx-auto mb-2" />
          Chargement...
        </div>

        <div v-else>
          <div v-if="affiliation.code" class="flex items-center gap-3">
            <div class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 font-mono text-base font-semibold text-center tracking-widest">
              {{ affiliation.code }}
            </div>
            <button
              @click="copyCode"
              class="p-3 bg-green-600 text-white hover:bg-green-700 transition-colors"
              :class="{ 'bg-emerald-600': codeCopied }"
            >
              <Copy class="w-5 h-5" />
            </button>
          </div>

          <div v-else class="text-center py-4">
            <p class="text-gray-500 mb-4">Aucun code généré</p>
            <button
              @click="generateCode"
              :disabled="codeGenerating"
              class="px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              <RefreshCw v-if="codeGenerating" class="w-4 h-4 animate-spin" />
              <span>{{ codeGenerating ? 'Génération...' : 'Générer mon code' }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 p-6">
        <div class="flex items-center gap-2 mb-4">
          <Users class="w-5 h-5 text-gray-400" />
          <h3 class="font-medium text-gray-900">Statistiques</h3>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 border border-gray-200 text-center">
            <p class="text-2xl font-semibold text-gray-900">{{ affiliation.usage_count }}</p>
            <p class="text-sm text-gray-500">Utilisations</p>
          </div>
          <div class="p-4 border border-gray-200 text-center">
            <p class="text-2xl font-semibold text-gray-900">{{ affiliation.total_earned.toLocaleString() }} FCFA</p>
            <p class="text-sm text-gray-500">Gains totaux</p>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-500 border-l-2 border-gray-200 pl-3">
          Vos commissions sont créditées dans votre solde. 
          <NuxtLink to="/dashboard/withdrawals" class="text-gray-900 underline">Retirer</NuxtLink>
        </p>
      </div>
    </template>

    <div v-if="showToast" class="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 text-sm">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gift, Users, Copy, RefreshCw } from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { user, token } = useAuth()

const loading = ref(true)
const codeGenerating = ref(false)
const codeCopied = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const affiliation = ref({
  code: null as string | null,
  usage_count: 0,
  total_earned: 0,
  discount_percent: 15,
  commission_percent: 15
})

const displayToast = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 3000)
}

const fetchAffiliation = async () => {
  if (!user.value?.is_premium) {
    loading.value = false
    return
  }
  
  loading.value = true
  try {
    const response = await $fetch<any>('/affiliation/my-code', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success && response.data) {
      affiliation.value = {
        code: response.data.code,
        usage_count: response.data.usage_count || 0,
        total_earned: response.data.total_earnings || 0,
        discount_percent: response.data.discount_percent || 15,
        commission_percent: response.data.commission_percent || 15
      }
    }
  } catch (err) {
    console.error('Erreur fetch affiliation:', err)
  } finally {
    loading.value = false
  }
}

const generateCode = async () => {
  codeGenerating.value = true
  try {
    const response = await $fetch<any>('/affiliation/generate-code', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success && response.data) {
      affiliation.value.code = response.data.code
      displayToast('Code promo généré avec succès')
    }
  } catch (err: any) {
    displayToast(err.data?.message || 'Erreur lors de la génération du code')
  } finally {
    codeGenerating.value = false
  }
}

const copyCode = async () => {
  if (!affiliation.value.code) return
  try {
    await navigator.clipboard.writeText(affiliation.value.code)
    codeCopied.value = true
    displayToast('Code copié dans le presse-papier')
    setTimeout(() => { codeCopied.value = false }, 2000)
  } catch (err) {
    console.error('Erreur copie:', err)
  }
}

onMounted(() => {
  fetchAffiliation()
})

watch(() => user.value?.is_premium, (isPremium) => {
  if (isPremium) {
    fetchAffiliation()
  }
})
</script>
