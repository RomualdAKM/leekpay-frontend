<template>
  <div class="space-y-2">
    <!-- Sélecteur de type - Style minimaliste -->
    <div class="flex border border-gray-300 rounded-lg overflow-hidden">
      <button
        type="button"
        @click="selectType('payment_link')"
        :class="[
          'flex-1 px-3 py-1.5 text-xs font-medium transition-colors',
          localType === 'payment_link'
            ? 'bg-gray-100 text-gray-900'
            : 'bg-white text-gray-500 hover:text-gray-700'
        ]"
      >
        Lien de paiement
      </button>
      <button
        type="button"
        @click="selectType('custom')"
        :class="[
          'flex-1 px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-300',
          localType === 'custom'
            ? 'bg-gray-100 text-gray-900'
            : 'bg-white text-gray-500 hover:text-gray-700'
        ]"
      >
        Lien personnalisé
      </button>
    </div>

    <!-- Sélecteur de lien de paiement -->
    <template v-if="localType === 'payment_link'">
      <div v-if="loadingLinks" class="text-xs text-gray-400 py-1">
        Chargement...
      </div>
      
      <template v-else-if="paymentLinks.length === 0">
        <p class="text-xs text-gray-500 py-1">Aucun lien actif disponible</p>
        <a href="/dashboard/create-link" target="_blank" class="text-xs text-emerald-600 hover:underline">
          + Créer un lien
        </a>
      </template>
      
      <template v-else>
        <select
          v-model="selectedLinkId"
          @change="onLinkSelect"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Sélectionner...</option>
          <option v-for="link in paymentLinks" :key="link.id" :value="link.id">
            {{ link.title }}
          </option>
        </select>
        
        <!-- URL générée (lecture seule) -->
        <div v-if="selectedLink" class="flex items-center gap-2">
          <input
            :value="`leekpay.me/${selectedLink.custom_url}`"
            readonly
            class="flex-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500"
          />
          <a 
            :href="`https://leekpay.me/${selectedLink.custom_url}`" 
            target="_blank"
            class="text-xs text-gray-400 hover:text-emerald-600"
            title="Ouvrir"
          >
            ↗
          </a>
        </div>
      </template>
    </template>

    <!-- Input lien personnalisé -->
    <template v-else>
      <input
        v-model="localUrl"
        @input="onCustomUrlInput"
        type="text"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

interface PaymentLink {
  id: number
  title: string
  custom_url: string
  amount_type: 'fixed' | 'flexible'
  fixed_amount?: number
  currency?: {
    code: string
    symbol: string
  }
}

interface Props {
  modelValue?: string
  linkType?: 'custom' | 'payment_link'
  paymentLinkId?: number | null
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '#',
  linkType: 'custom',
  paymentLinkId: null,
  placeholder: '#checkout ou https://...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:linkType': [value: 'custom' | 'payment_link']
  'update:paymentLinkId': [value: number | null]
  'change': [payload: { url: string; linkType: 'custom' | 'payment_link'; paymentLinkId: number | null }]
}>()

// Configuration API
const config = useRuntimeConfig()
const { token } = useAuth()

// État local
const localType = ref<'custom' | 'payment_link'>(props.linkType)
const localUrl = ref(props.modelValue)
const selectedLinkId = ref<number | string>(props.paymentLinkId || '')
const paymentLinks = ref<PaymentLink[]>([])
const loadingLinks = ref(false)

// Lien sélectionné
const selectedLink = computed(() => {
  if (!selectedLinkId.value) return null
  return paymentLinks.value.find(l => l.id === Number(selectedLinkId.value))
})

// Charger les liens de paiement
async function fetchPaymentLinks() {
  if (!token.value) {
    console.warn('[LinkSelector] Pas de token')
    return
  }
  
  loadingLinks.value = true
  try {
    const response = await $fetch<any>('/payment-links', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      params: { status: 'active', expired: 'false', per_page: 100 }
    })
    
    paymentLinks.value = Array.isArray(response.data) ? response.data : []
  } catch (err) {
    console.error('[LinkSelector] Erreur:', err)
    paymentLinks.value = []
  } finally {
    loadingLinks.value = false
  }
}

// Changer le type de lien
function selectType(type: 'custom' | 'payment_link') {
  localType.value = type
  emit('update:linkType', type)
  
  if (type === 'custom') {
    selectedLinkId.value = ''
    emit('update:paymentLinkId', null)
  }
  emitChange()
}

// Sélectionner un lien de paiement
function onLinkSelect() {
  const link = paymentLinks.value.find(l => l.id === Number(selectedLinkId.value))
  if (link) {
    localUrl.value = `https://leekpay.me/${link.custom_url}`
    emit('update:modelValue', localUrl.value)
    emit('update:paymentLinkId', link.id)
  } else {
    emit('update:paymentLinkId', null)
  }
  emitChange()
}

// Input personnalisé
function onCustomUrlInput() {
  emit('update:modelValue', localUrl.value)
  emitChange()
}

// Émettre le changement
function emitChange() {
  emit('change', {
    url: localUrl.value,
    linkType: localType.value,
    paymentLinkId: localType.value === 'payment_link' ? (selectedLinkId.value ? Number(selectedLinkId.value) : null) : null
  })
}

// Synchroniser avec les props
watch(() => props.modelValue, (newVal) => {
  if (newVal !== localUrl.value) localUrl.value = newVal
})

watch(() => props.linkType, (newVal) => {
  if (newVal !== localType.value) localType.value = newVal
})

watch(() => props.paymentLinkId, (newVal) => {
  if (newVal !== selectedLinkId.value) selectedLinkId.value = newVal || ''
})

onMounted(() => {
  fetchPaymentLinks()
})
</script>
