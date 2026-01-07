<template>
  <div class="space-y-4">
    <!-- État actuel -->
    <div v-if="currentDomain" class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-start justify-between mb-2">
        <div class="flex items-center">
          <div 
            class="w-3 h-3 rounded-full mr-2"
            :class="domainVerified ? 'bg-emerald-500' : 'bg-orange-500'"
          />
          <span class="font-medium text-gray-900">{{ currentDomain }}</span>
        </div>
        <span 
          class="text-xs px-2 py-1 rounded-full"
          :class="domainVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'"
        >
          {{ domainVerified ? 'Vérifié' : 'En attente' }}
        </span>
      </div>
      
      <!-- Actions domaine existant -->
      <div class="flex flex-wrap gap-2 mt-3">
        <button
          v-if="!domainVerified"
          @click="verifyDomain"
          :disabled="isVerifying"
          class="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
        >
          <svg v-if="isVerifying" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Vérifier
        </button>
        <button
          v-if="!domainVerified"
          @click="toggleDnsInstructions"
          :disabled="isLoadingDns"
          class="flex-1 flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <svg v-if="isLoadingDns" class="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          </svg>
          <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          DNS
        </button>
        <button
          @click="removeDomain"
          :disabled="isRemoving"
          class="flex items-center justify-center px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          <svg v-if="isRemoving" class="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
      
      <!-- Instructions DNS -->
      <div v-if="showInstructions && dnsInstructions && dnsInstructions.length > 0" class="mt-4 border-t border-gray-200 pt-4">
        <h4 class="text-sm font-medium text-gray-900 mb-2">Configuration DNS</h4>
        <p class="text-xs text-gray-600 mb-3">
          Ajoutez ces enregistrements DNS chez votre registrar (Cloudflare, GoDaddy, etc.)
        </p>
        
        <div class="space-y-3">
          <div 
            v-for="(record, idx) in dnsInstructions" 
            :key="idx"
            class="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span class="font-medium px-2 py-0.5 rounded" :class="record.type === 'A' ? 'bg-blue-100 text-blue-700' : record.type === 'CNAME' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'">{{ record.type }}</span>
              <button 
                @click="copyToClipboard(record.value)"
                class="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Copier
              </button>
            </div>
            <div class="mt-2 space-y-1">
              <div class="flex items-center text-xs">
                <span class="text-gray-500 w-16">Nom:</span>
                <code class="flex-1 bg-gray-100 px-2 py-1 rounded font-mono">{{ record.name }}</code>
              </div>
              <div class="flex items-center text-xs">
                <span class="text-gray-500 w-16">Valeur:</span>
                <code class="flex-1 bg-gray-100 px-2 py-1 rounded font-mono break-all">{{ record.value }}</code>
              </div>
            </div>
            <p v-if="record.description" class="text-[10px] text-gray-400 mt-2">{{ record.description }}</p>
          </div>
        </div>
        
        <p class="text-xs text-orange-600 mt-3">
          <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          La propagation DNS peut prendre jusqu'à 48h
        </p>
      </div>
    </div>
    
    <!-- Formulaire ajout nouveau domaine -->
    <div v-else>
      <label class="block text-xs text-gray-500 mb-1">Votre domaine</label>
      <div class="flex gap-2">
        <input
          v-model="newDomain"
          type="text"
          placeholder="exemple.com"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
          :class="{ 'border-red-300': domainError }"
          @keyup.enter="setDomain"
        />
        <button
          @click="setDomain"
          :disabled="!newDomain || isAdding"
          class="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg v-if="isAdding" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span v-else>Ajouter</span>
        </button>
      </div>
      <p v-if="domainError" class="text-xs text-red-500 mt-1">{{ domainError }}</p>
      <p class="text-xs text-gray-500 mt-2">
        Entrez votre domaine sans http:// ni www. (ex: monsite.com)
      </p>
    </div>
    
    <!-- Message succès/erreur -->
    <div v-if="message" :class="messageType === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'" class="text-xs p-3 rounded-lg">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  pageId: number | string
  customDomain?: string | null
  domainVerified?: boolean
}>()

const emit = defineEmits<{
  (e: 'updated', data: { custom_domain: string | null; domain_verified: boolean }): void
}>()

const config = useRuntimeConfig()
const { token } = useAuth()

const currentDomain = ref(props.customDomain || null)
const domainVerified = computed(() => props.domainVerified || false)
const newDomain = ref('')
const domainError = ref('')
const isAdding = ref(false)
const isVerifying = ref(false)
const isRemoving = ref(false)
const isLoadingDns = ref(false)
const showInstructions = ref(false)
const dnsInstructions = ref<any>(null)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Charger les instructions DNS si domaine non vérifié
const fetchDnsInstructions = async () => {
  if (!currentDomain.value || domainVerified.value) return
  
  isLoadingDns.value = true
  try {
    const response = await $fetch<{ success: boolean; data: { instructions: any } }>(
      `/sales-pages/${props.pageId}/custom-domain/instructions`,
      {
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` }
      }
    )
    if (response.success && response.data?.instructions) {
      dnsInstructions.value = response.data.instructions
    }
  } catch (err) {
    console.error('Erreur chargement instructions DNS:', err)
    message.value = 'Erreur lors du chargement des instructions DNS'
    messageType.value = 'error'
  } finally {
    isLoadingDns.value = false
  }
}

// Toggle affichage instructions DNS
const toggleDnsInstructions = async () => {
  if (showInstructions.value) {
    showInstructions.value = false
    return
  }
  
  // Charger les instructions si pas encore chargées
  if (!dnsInstructions.value) {
    await fetchDnsInstructions()
  }
  
  if (dnsInstructions.value) {
    showInstructions.value = true
  }
}

// Ajouter un domaine
const setDomain = async () => {
  domainError.value = ''
  message.value = ''
  
  // Validation basique
  const domain = newDomain.value.trim().toLowerCase()
  if (!domain) {
    domainError.value = 'Veuillez entrer un domaine'
    return
  }
  
  // Validation format domaine
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i
  if (!domainRegex.test(domain)) {
    domainError.value = 'Format de domaine invalide'
    return
  }
  
  isAdding.value = true
  
  try {
    const response = await $fetch<{ success: boolean; message: string; instructions?: any }>(
      `/sales-pages/${props.pageId}/custom-domain`,
      {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` },
        body: { domain }
      }
    )
    
    if (response.success) {
      currentDomain.value = domain
      newDomain.value = ''
      dnsInstructions.value = response.instructions
      showInstructions.value = true
      message.value = 'Domaine ajouté ! Configurez vos DNS pour activer.'
      messageType.value = 'success'
      emit('updated', { custom_domain: domain, domain_verified: false })
    }
  } catch (err: any) {
    const errorMsg = err.data?.message || 'Erreur lors de l\'ajout du domaine'
    domainError.value = errorMsg
    message.value = errorMsg
    messageType.value = 'error'
  } finally {
    isAdding.value = false
  }
}

// Vérifier le domaine
const verifyDomain = async () => {
  message.value = ''
  isVerifying.value = true
  
  try {
    const response = await $fetch<{ success: boolean; verified: boolean; message: string }>(
      `/sales-pages/${props.pageId}/custom-domain/verify`,
      {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` }
      }
    )
    
    if (response.verified) {
      message.value = 'Domaine vérifié avec succès !'
      messageType.value = 'success'
      showInstructions.value = false
      emit('updated', { custom_domain: currentDomain.value, domain_verified: true })
    } else {
      message.value = response.message || 'Le domaine n\'est pas encore vérifié. Vérifiez vos DNS.'
      messageType.value = 'error'
    }
  } catch (err: any) {
    message.value = err.data?.message || 'Erreur lors de la vérification'
    messageType.value = 'error'
  } finally {
    isVerifying.value = false
  }
}

// Supprimer le domaine
const removeDomain = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce domaine ?')) return
  
  message.value = ''
  isRemoving.value = true
  
  try {
    await $fetch(
      `/sales-pages/${props.pageId}/custom-domain`,
      {
        method: 'DELETE',
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` }
      }
    )
    
    currentDomain.value = null
    dnsInstructions.value = null
    showInstructions.value = false
    message.value = 'Domaine supprimé'
    messageType.value = 'success'
    emit('updated', { custom_domain: null, domain_verified: false })
  } catch (err: any) {
    message.value = err.data?.message || 'Erreur lors de la suppression'
    messageType.value = 'error'
  } finally {
    isRemoving.value = false
  }
}

// Copier dans le presse-papier
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.value = 'Copié !'
    messageType.value = 'success'
    setTimeout(() => { message.value = '' }, 2000)
  } catch {
    // Fallback
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

onMounted(() => {
  if (currentDomain.value && !domainVerified.value) {
    fetchDnsInstructions()
  }
})
</script>
