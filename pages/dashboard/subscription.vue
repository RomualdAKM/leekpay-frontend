<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div>
      <p class="text-gray-600 text-sm">Gérez votre abonnement Premium LeekPay</p>
    </div>

    <!-- Statut actuel -->
    <div class="bg-white rounded-xl border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div 
            class="w-14 h-14 rounded-xl flex items-center justify-center"
            :class="status.is_premium ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gray-100'"
          >
            <Crown v-if="status.is_premium" class="w-7 h-7 text-white" />
            <Lock v-else class="w-7 h-7 text-gray-400" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              {{ status.is_premium ? 'Compte Premium' : 'Compte Gratuit' }}
            </h2>
            <p v-if="status.is_premium" class="text-sm text-gray-500">
              Expire dans {{ status.days_remaining }} jours 
              <span class="text-gray-400">({{ formatDate(status.expires_at) }})</span>
            </p>
            <p v-else class="text-sm text-gray-500">
              Passez en Premium pour débloquer toutes les fonctionnalités
            </p>
          </div>
        </div>
        <span 
          v-if="status.is_premium"
          class="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-700"
        >
          Actif
        </span>
      </div>
    </div>

    <!-- Avantages Premium -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
      <div class="flex items-center gap-3 mb-6">
        <Crown class="w-6 h-6 text-amber-400" />
        <h3 class="text-xl font-semibold">Avantages Premium</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="font-medium">Frais de retrait réduits</p>
            <p class="text-sm text-gray-400">1.5% au lieu de 3%</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="font-medium">Publication de pages de vente</p>
            <p class="text-sm text-gray-400">Publiez vos pages librement</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="font-medium">Programme d'affiliation</p>
            <p class="text-sm text-gray-400">Générez un code promo et gagnez 15%</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="font-medium">Support prioritaire</p>
            <p class="text-sm text-gray-400">Assistance dédiée par WhatsApp</p>
          </div>
        </div>
      </div>

      <!-- Prix et action -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-700">
        <div>
          <p class="text-3xl font-bold">
            4 700 <span class="text-lg font-normal text-gray-400">FCFA/mois</span>
          </p>
        </div>
        
        <div v-if="!status.is_premium" class="w-full sm:w-auto">
          <!-- Code promo -->
          <div class="flex gap-2 mb-3">
            <input
              v-model="promoCode"
              type="text"
              placeholder="Code promo (optionnel)"
              class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:border-amber-500 focus:ring-amber-500"
              :disabled="promoValidating || subscribing"
              @blur="validatePromo"
            />
            <button
              v-if="promoCode && !promoValid"
              @click="validatePromo"
              :disabled="promoValidating"
              class="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 disabled:opacity-50"
            >
              {{ promoValidating ? '...' : 'Valider' }}
            </button>
          </div>
          
          <!-- Message promo -->
          <p v-if="promoMessage" class="text-sm mb-3" :class="promoValid ? 'text-emerald-400' : 'text-red-400'">
            {{ promoMessage }}
          </p>
          
          <!-- Prix avec réduction -->
          <p v-if="promoValid && promoDiscount > 0" class="text-sm text-emerald-400 mb-3">
            Prix après réduction : <span class="font-bold">{{ 4700 - promoDiscount }} FCFA</span>
          </p>
          
          <button
            @click="subscribe"
            :disabled="subscribing"
            class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="subscribing" class="w-5 h-5 animate-spin" />
            <span>{{ subscribing ? 'Redirection...' : 'Passer en Premium' }}</span>
          </button>
        </div>
        
        <div v-else>
          <button
            @click="showHistory = !showHistory"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600"
          >
            {{ showHistory ? 'Masquer l\'historique' : 'Voir l\'historique' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Historique des abonnements -->
    <div v-if="showHistory && history.length > 0" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="font-semibold text-gray-900">Historique des abonnements</h3>
      </div>
      <div class="divide-y divide-gray-100">
        <div 
          v-for="sub in history" 
          :key="sub.id"
          class="px-6 py-4 flex items-center justify-between"
        >
          <div>
            <p class="font-medium text-gray-900">
              {{ sub.paid_amount }} FCFA
              <span v-if="sub.discount_amount > 0" class="text-sm text-gray-500">
                ({{ sub.discount_amount }} FCFA de réduction)
              </span>
            </p>
            <p class="text-sm text-gray-500">
              {{ sub.starts_at }} → {{ sub.ends_at }}
            </p>
          </div>
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="{
              'bg-emerald-100 text-emerald-700': sub.status === 'active',
              'bg-gray-100 text-gray-600': sub.status === 'expired',
              'bg-red-100 text-red-600': sub.status === 'cancelled',
              'bg-orange-100 text-orange-600': sub.status === 'pending',
            }"
          >
            {{ sub.status_label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Message si success dans URL -->
    <div 
      v-if="route.query.status === 'success'"
      class="fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
    >
      <Check class="w-5 h-5" />
      <span>Paiement en cours de traitement...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Crown, Lock, Check, Loader2 } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const route = useRoute()
const { token, user } = useAuth()

const loading = ref(true)
const subscribing = ref(false)
const showHistory = ref(false)
const promoCode = ref('')
const promoValidating = ref(false)
const promoValid = ref(false)
const promoMessage = ref('')
const promoDiscount = ref(0)

const status = ref({
  is_premium: false,
  days_remaining: 0,
  expires_at: null as string | null,
  price: 4700,
})

const history = ref<any[]>([])

const fetchStatus = async () => {
  try {
    const response = await $fetch<any>('/subscription/status', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success) {
      status.value = response.data
      
      // Mettre à jour le cookie user avec le statut premium
      if (user.value && response.data.is_premium !== user.value.is_premium) {
        user.value = {
          ...user.value,
          is_premium: response.data.is_premium,
          premium_expires_at: response.data.expires_at
        }
      }
    }
  } catch (err) {
    console.error('Erreur fetch status:', err)
  } finally {
    loading.value = false
  }
}

const fetchHistory = async () => {
  try {
    const response = await $fetch<any>('/subscription/history', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success) {
      history.value = response.data
    }
  } catch (err) {
    console.error('Erreur fetch history:', err)
  }
}

const validatePromo = async () => {
  if (!promoCode.value.trim()) {
    promoValid.value = false
    promoMessage.value = ''
    promoDiscount.value = 0
    return
  }

  promoValidating.value = true
  try {
    const response = await $fetch<any>('/subscription/validate-promo', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { code: promoCode.value }
    })
    
    if (response.success && response.data.valid) {
      promoValid.value = true
      promoMessage.value = `Code valide ! -${response.data.discount_percent}%`
      promoDiscount.value = response.data.pricing.discount_amount
    } else {
      promoValid.value = false
      promoMessage.value = response.data.message || 'Code invalide'
      promoDiscount.value = 0
    }
  } catch (err: any) {
    promoValid.value = false
    promoMessage.value = err.data?.message || 'Erreur de validation'
    promoDiscount.value = 0
  } finally {
    promoValidating.value = false
  }
}

const subscribe = async () => {
  subscribing.value = true
  try {
    const response = await $fetch<any>('/subscription/subscribe', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { promo_code: promoCode.value || null }
    })
    
    if (response.success && response.data.payment_url) {
      window.location.href = response.data.payment_url
    } else {
      alert(response.message || 'Erreur lors de la création de l\'abonnement')
      subscribing.value = false
    }
  } catch (err: any) {
    alert(err.data?.message || 'Erreur lors de la création de l\'abonnement')
    subscribing.value = false
  }
}

const formatDate = (date: string | null) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchStatus()
  fetchHistory()
  
  // Si retour de paiement, rafraîchir après quelques secondes
  if (route.query.status === 'success') {
    setTimeout(() => {
      fetchStatus()
    }, 3000)
  }
})
</script>
