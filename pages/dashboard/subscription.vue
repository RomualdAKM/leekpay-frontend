<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div>
      <p class="text-gray-500 text-sm">Gérez votre abonnement Premium</p>
    </div>

    <!-- Statut actuel -->
    <div class="bg-white border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div 
            class="w-14 h-14 flex items-center justify-center"
            :class="status.is_premium ? 'bg-green-600' : 'bg-gray-100'"
          >
            <Crown v-if="status.is_premium" class="w-7 h-7 text-white" />
            <Lock v-else class="w-7 h-7 text-gray-400" />
          </div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">
              {{ status.is_premium ? 'Compte Premium' : 'Compte Gratuit' }}
            </h2>
            <p v-if="status.is_premium" class="text-sm text-gray-500">
              Expire dans {{ status.days_remaining }} jours 
              <span class="text-gray-400">({{ formatDate(status.expires_at) }})</span>
            </p>
            <p v-else class="text-sm text-gray-500">
              Passez Premium pour débloquer toutes les fonctionnalités
            </p>
          </div>
        </div>
        <span 
          v-if="status.is_premium"
          class="px-3 py-1 text-sm border border-gray-200 text-gray-900"
        >
          Actif
        </span>
      </div>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div 
        v-if="toast.show" 
        class="fixed bottom-6 right-6 px-4 py-3 flex items-center gap-2 shadow-lg z-50"
        :class="toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'"
      >
        <Check v-if="toast.type === 'success'" class="w-5 h-5" />
        <AlertCircle v-else class="w-5 h-5" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <!-- Avantages Premium -->
    <div class="bg-gray-900 p-6 text-white">
      <div class="flex items-center gap-3 mb-6">
        <Crown class="w-6 h-6 text-green-600" />
        <h3 class="text-xl font-medium">Avantages Premium</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-medium">Frais de retrait réduits</p>
            <p class="text-sm text-gray-400">Économisez 33% sur chaque retrait : seulement 2% au lieu de 3%</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-medium">Pages de vente illimitées</p>
            <p class="text-sm text-gray-400">Créez et publiez autant de pages que vous souhaitez sans restriction</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-medium">Programme d'affiliation</p>
            <p class="text-sm text-gray-400">Générez un code promo personnel : vos filleuls obtiennent 15% de réduction et vous gagnez 15% de commission</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-medium">Support prioritaire</p>
            <p class="text-sm text-gray-400">Accès direct à notre équipe via WhatsApp pour une assistance rapide</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Check class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="font-medium">Thèmes de factures premium</p>
            <p class="text-sm text-gray-400">Accédez à 9 thèmes professionnels exclusifs pour personnaliser vos factures</p>
          </div>
        </div>
      </div>

      <!-- Prix et paiement -->
      <div class="pt-6 border-t border-gray-800">
        <!-- Prix -->
        <div class="mb-6">
          <p class="text-3xl font-semibold">
            <span v-if="walletPreview.discount_amount > 0" class="line-through text-gray-500 text-xl mr-2">9 600</span>
            {{ formatAmount(walletPreview.final_amount) }} <span class="text-lg font-normal text-gray-400">FCFA/an</span>
          </p>
          <p v-if="walletPreview.discount_amount > 0" class="text-sm text-green-400 mt-1">
            -{{ formatAmount(walletPreview.discount_amount) }} FCFA de réduction appliquée
          </p>
        </div>
        
        <div v-if="!status.is_premium">
          <!-- Code promo -->
          <div class="mb-6">
            <div class="flex gap-2 max-w-sm">
              <input
                v-model="promoCode"
                type="text"
                placeholder="Code promo (optionnel)"
                class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-600"
                :disabled="promoValidating || subscribing || walletSubscribing"
                @blur="validatePromo"
                @keyup.enter="validatePromo"
              />
              <button
                v-if="promoCode && !promoValid"
                @click="validatePromo"
                :disabled="promoValidating"
                class="px-4 py-2 bg-gray-700 text-white text-sm hover:bg-gray-600 disabled:opacity-50"
              >
                {{ promoValidating ? '...' : 'Appliquer' }}
              </button>
            </div>
            <p v-if="promoMessage" class="text-sm mt-2" :class="promoValid ? 'text-green-400' : 'text-red-400'">
              {{ promoMessage }}
            </p>
          </div>

          <!-- Boutons de paiement -->
          <div class="space-y-3 max-w-sm">
            <!-- Wallet LeekPay -->
            <button
              v-if="walletPreview.can_pay"
              @click="subscribeWithWallet"
              :disabled="walletSubscribing"
              class="w-full py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="walletSubscribing" class="w-5 h-5 animate-spin" />
              <Wallet v-else class="w-5 h-5" />
              <span>{{ walletSubscribing ? 'Paiement...' : 'Payer avec mon wallet' }}</span>
            </button>
            <p v-if="walletPreview.can_pay" class="text-xs text-gray-500 text-center -mt-1">
              Solde actuel : {{ formatAmount(walletPreview.current_balance) }} FCFA
            </p>
            
            <!-- Mobile Money -->
            <button
              @click="subscribe"
              :disabled="subscribing"
              class="w-full py-3 bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="subscribing" class="w-5 h-5 animate-spin" />
              <Smartphone v-else class="w-5 h-5" />
              <span>{{ subscribing ? 'Redirection...' : 'Payer par Mobile Money' }}</span>
            </button>
          </div>
        </div>
        
        <div v-else>
          <button
            @click="showHistory = !showHistory"
            class="px-4 py-2 bg-gray-800 text-white text-sm hover:bg-gray-700"
          >
            {{ showHistory ? 'Masquer l\'historique' : 'Voir l\'historique' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Historique des abonnements -->
    <div v-if="showHistory && history.length > 0" class="bg-white border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="font-medium text-gray-900">Historique des abonnements</h3>
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

  </div>
</template>

<script setup lang="ts">
import { Crown, Lock, Check, Loader2, Wallet, Smartphone, AlertCircle } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const route = useRoute()
const { token, user } = useAuth()

// États de base
const loading = ref(true)
const subscribing = ref(false)
const walletSubscribing = ref(false)
const showHistory = ref(false)

// Code promo
const promoCode = ref('')
const promoValidating = ref(false)
const promoValid = ref(false)
const promoMessage = ref('')
const promoDiscount = ref(0)

// Toast notification
const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

// Statut abonnement
const status = ref({
  is_premium: false,
  days_remaining: 0,
  expires_at: null as string | null,
  price: 9600,
})

// Preview wallet
const walletPreview = ref({
  original_price: 9600,
  discount_amount: 0,
  final_amount: 9600,
  current_balance: 0,
  balance_after_payment: 0,
  can_pay: false,
  missing_amount: 0,
  promo_code_info: null as any
})

const history = ref<any[]>([])

// Afficher un toast
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

// Formater les montants
const formatAmount = (value: number) => {
  return Number(value || 0).toLocaleString('fr-FR')
}

// Récupérer le statut de l'abonnement
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

// Récupérer l'historique des abonnements
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

// Récupérer le preview du paiement wallet
const fetchWalletPreview = async () => {
  try {
    const response = await $fetch<any>('/subscription/wallet-preview', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { promo_code: promoCode.value || null }
    })
    if (response.success) {
      walletPreview.value = response.data
    }
  } catch (err) {
    console.error('Erreur fetch wallet preview:', err)
  }
}

// Valider le code promo
const validatePromo = async () => {
  if (!promoCode.value.trim()) {
    promoValid.value = false
    promoMessage.value = ''
    promoDiscount.value = 0
    // Réinitialiser le preview wallet
    await fetchWalletPreview()
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
      // Mettre à jour le preview wallet avec le code promo
      await fetchWalletPreview()
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

// Souscrire via Mobile Money (Moneroo)
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
      showToast(response.message || 'Erreur lors de la création de l\'abonnement', 'error')
      subscribing.value = false
    }
  } catch (err: any) {
    showToast(err.data?.message || 'Erreur lors de la création de l\'abonnement', 'error')
    subscribing.value = false
  }
}

// Souscrire via Wallet LeekPay
const subscribeWithWallet = async () => {
  walletSubscribing.value = true
  try {
    const response = await $fetch<any>('/subscription/subscribe-wallet', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: { promo_code: promoCode.value || null }
    })
    
    if (response.success) {
      showToast('Félicitations ! Vous êtes maintenant Premium !', 'success')
      
      // Mettre à jour le statut et le user
      await fetchStatus()
      await fetchWalletPreview()
      
      // Mettre à jour le cookie user
      if (user.value) {
        user.value = {
          ...user.value,
          is_premium: true
        }
      }
    } else {
      showToast(response.message || 'Erreur lors du paiement', 'error')
    }
  } catch (err: any) {
    showToast(err.data?.message || 'Erreur lors du paiement', 'error')
  } finally {
    walletSubscribing.value = false
  }
}

// Formater une date
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
  fetchWalletPreview()
  
  // Si retour de paiement, rafraîchir après quelques secondes
  if (route.query.status === 'success') {
    showToast('Paiement en cours de vérification...', 'success')
    setTimeout(() => {
      fetchStatus()
    }, 3000)
  }
})
</script>

<style scoped>
/* Animation toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
