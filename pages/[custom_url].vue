<template>
  <div>

  <div class="min-h-screen flex flex-col md:flex-row font-sans bg-gray-50">
    <div class="w-full md:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center  p-4 md:p-6">
      <div class="text-center max-w-lg w-full">
        <img
            v-if="paymentData?.image_url && !imageError"
            :src="paymentData.image_url"
            :alt="paymentTitle"
            class="w-full max-h-80 md:max-h-96 object-contain rounded-2xl shadow-lg mb-8"
            @error="handleImageError"
        />
        <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-3">{{ paymentTitle }}</h2>
        <p v-html="paymentDescription" class="text-gray-700 leading-relaxed text-sm md:text-base">
        </p>
      </div>
    </div>
    <div class="w-full md:w-1/2  flex items-center justify-center p-2 md:p-2">
      <div class="w-full max-w-md">
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>

        <div v-if="loading" class="bg-white p-2 md:p-2 rounded-xl shadow-md border border-gray-100">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p class="text-gray-600">Chargement du lien de paiement...</p>
          </div>
        </div>
        
        <div v-else-if="paymentData" class="bg-white p-2 md:p-8 rounded-sm shadow-sm border border-gray-100">
          <!-- Expiration Status -->
          <div v-if="expirationStatus.show" :class="expirationStatus.containerClass">
            <div class="flex items-center justify-between">
              <span :class="expirationStatus.textClass">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="expirationStatus.iconPath" />
                </svg>
                {{ expirationStatus.message }}
              </span>
              <span v-if="expirationStatus.badge" :class="expirationStatus.badgeClass">
                {{ expirationStatus.badge }}
              </span>
            </div>
          </div>
          <div class="text-center mb-4">
            <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2"></h1>
            <p class="text-base md:text-lg text-gray-700">Effectuez votre paiement</p>
            
            <!-- Affichage du montant avec détail des frais -->
            <div class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div class="space-y-2 text-sm">
                <!-- <div class="flex justify-between text-gray-700">
                  <span>Montant</span>
                  <span class="font-medium">{{ displayAmount }} {{ currency.symbol }}</span>
                </div>
                <div v-if="calculatedFees.total_fees > 0" class="flex justify-between text-gray-600">
                  <span>Frais de traitement ({{ Math.round((selectedPaymentMethod?.total_fee_rate || 0) * 100) }}%)</span>
                  <span>{{ calculatedFees.total_fees.toFixed(2) }} {{ currency.symbol }}</span>
                </div> -->
                <div class="border-t border-gray-300 pt-2 flex justify-between">
                  <span class="font-semibold text-gray-900">Montant</span>
                  <span class="text-2xl font-bold text-green-600">{{ displayAmount }} {{ currency.symbol }}</span>
                  <!-- <span class="font-semibold text-gray-900">Total à payer</span>
                  <span class="text-2xl font-bold text-green-600">{{ calculatedFees.total_amount.toFixed(2) }} {{ currency.symbol }}</span> -->
                </div>
              </div>
            </div>
          </div>


          <div v-if="paymentData.amount_type === 'flexible'" class="space-y-4 mb-4">
            <h2 class="text-lg font-semibold text-slate-900">Montant à payer</h2>
            <input
                v-model="formData.amount"
                type="number"
                placeholder="Entrez le montant"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                required
            />
          </div>
          <div class="space-y-2 mb-4">
            <h2 class="text-lg font-semibold text-slate-900">Vos informations</h2>
            <input
                v-model="formData.name"
                type="text"
                placeholder="Nom complet"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                required
            />
            <input
                v-model="formData.email"
                type="email"
                placeholder="Email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                required
            />
            <div class="space-y-2">
              <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Rechercher votre pays..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                    @focus="showCountryDropdown = true"
                />
                <div
                    v-if="showCountryDropdown"
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                >
                  <div
                      v-for="country in filteredCountries"
                      :key="country.code"
                      @click="selectCountry(country)"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm"
                  >
                    <span>{{ country.flag }}</span>
                    <span>{{ country.name }}</span>
                    <span class="text-gray-500">{{ country.dialCode }}</span>
                  </div>
                  <div v-if="filteredCountries.length === 0" class="px-4 py-2 text-gray-500 text-sm">
                    Aucun pays trouvé
                  </div>
                </div>
              </div>
              <div class="flex gap-1">
                <div class="px-2 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm min-w-[70px] flex items-center gap-2">
                  <span>{{ selectedCountry?.flag || '🇨🇮' }}</span>
                  <span>{{ selectedCountry?.dialCode || '+225' }}</span>
                </div>
                <input
                    v-model="formData.phoneNumber"
                    type="tel"
                    placeholder="Numéro (optionnel)"
                    class="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          <div id="payment-form" class="space-y-3 mb-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <button
              v-for="method in availablePaymentMethods"
              :key="method.value"
              type="button"
              @click="selectedPayment = method.value"
              :class="[
                'py-3 px-2 rounded-lg font-medium transition text-sm border',
                selectedPayment === method.value
                ? 'bg-green-600 text-white shadow-sm border-green-500'
                : 'border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300'
              ]"
              >
              <div class="flex flex-col items-center">
                <span class="text-xs mb-1">{{ method.label }}</span>
              </div>
            </button>
          </div>
          <label class="block text-sm font-medium text-slate-700">Choisissez votre mode de paiement</label>
        </div>

          <!-- Bouton de paiement -->
          <button
              @click="triggerPayment"
              :disabled="isProcessing || isPaymentExpired"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-sm font-semibold text-base hover:bg-green-600 transition shadow-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isProcessing" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
            <span v-else-if="isPaymentExpired">
              Lien expiré
            </span>
            <span v-else>
              {{ selectedPayment ? `Payer avec ${getSelectedPaymentLabel()}` : 'Sélectionnez un mode de paiement' }}
            </span>
          </button>

          <div class="mt-4 text-center mb-6 md:mb-4">
            <div class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Paiement 100% sécurisé</span>
            </div>
            <div class="flex justify-center gap-4">
              <img src="~/assets/img/mtn.png" alt="MTN" class="h-6 w-auto" />
              <img src="~/assets/img/orange.png" alt="Orange" class="h-6 w-auto" />
              <img src="~/assets/img/visa.png" alt="Visa" class="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bouton de paiement sticky (toujours visible) -->
  <div v-if="paymentData && !loading && showStickyButton" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-sm z-50 md:hidden">
    <div class="max-w-md mx-auto">
      <div class="flex items-center justify-between mb-3">
        <!-- <div class="text-sm">
          <span class="text-gray-600">Total: </span>
          <span class="font-bold text-xl text-gray-900">{{ displayAmount }} {{ currency.symbol }}</span>
        </div> -->
        <div v-if="expirationStatus.show" class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {{ expirationStatus.timeDisplay }}
        </div>
      </div>
      <button
          @click="scrollToPaymentForm"
          :disabled="isPaymentExpired"
          class="w-full bg-green-600 text-white py-3 px-4 rounded-sm font-semibold text-lg hover:bg-green-600 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
      >
        <span v-if="isPaymentExpired">
          Lien expiré
        </span>
        <span v-else>
          Paiement {{ displayAmount }} {{ currency.symbol }}
        </span>
      </button>
    </div>

    
  </div>
  <!-- Footer -->
   <div class="mt-4 pt-4 border-t border-gray-200">
     <div class="text-center">
       <a 
         href="https://leekpay.me" 
         target="_blank" class="flex items-center justify-center mb-1">
         <img 
           src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png" 
           alt="LeekPay Logo" 
           class="h-16 w-auto"
         >
     </a>
       <p class="text-xs text-gray-500 mb-2">
         Propulsé par LeekPay - Solution de paiement simple et sécurisée
       </p>
       <a 
         href="https://leekpay.me" 
         target="_blank"
         rel="noopener noreferrer"
         class="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
       >
         <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
         </svg>
         Découvrir LeekPay
       </a>
     </div>
   </div>
  </div>

</template>

<script setup>


definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()



const { searchQuery, filteredCountries, getCountryByDialCode } = useCountries()

const loading = ref(true)
const isProcessing = ref(false)
const error = ref('')
const paymentData = ref(null)
const selectedPayment = ref('mobile_money')
const timeLeft = ref(600)
const imageError = ref(false)
const showCountryDropdown = ref(false)
const selectedCountry = ref(null)
const showStickyButton = ref(true)

// Configuration des métadonnées SEO réactives
const pageTitle = computed(() => 
  paymentData.value?.title 
    ? `${paymentData.value.title} - LeekPay` 
    : 'Paiement - LeekPay'
)

const pageDescription = computed(() => 
  paymentData.value?.description 
    ? paymentData.value.description.replace(/<[^>]*>/g, '').substring(0, 160) 
    : 'Effectuez votre paiement de manière simple et sécurisée avec LeekPay'
)

const pageImage = computed(() => 
  paymentData.value?.image_url || 'https://leekpay.me/logo-leekpay.png'
)

const pageUrl = computed(() => 
  `https://leekpay.me/${route.params.custom_url}`
)

// Utiliser useSeoMeta pour les métadonnées réactives
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage,
  ogUrl: pageUrl,
  ogType: 'website',
  ogSiteName: 'LeekPay',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: pageImage,
})

useHead({
  link: [
    { rel: 'canonical', href: pageUrl }
  ]
})

const formData = ref({
  name: '',
  email: '',
  phoneNumber: '',
  amount: null
})

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseURL || 'https://leekpay.fr/api'

const customUrl = computed(() => route.params.custom_url)
const fetchPaymentData = async () => {
  if (!customUrl.value) {
    error.value = 'URL de paiement invalide'
    loading.value = false
    return
  }

  try {
    const response = await $fetch(`${apiBaseUrl}/public/payment/${customUrl.value}`)
    
    if (response.success) {
      paymentData.value = response.data
      
      if (paymentData.value.amount_type === 'fixed') {
        formData.value.amount = paymentData.value.fixed_amount
      }
      
      if (paymentData.value.expires_at) {
        const expiresAt = new Date(paymentData.value.expires_at)
        const now = new Date()
        const diffInSeconds = Math.max(0, Math.floor((expiresAt - now) / 1000))
        timeLeft.value = diffInSeconds
        if (diffInSeconds > 0) {
          startTimer()
        }
      }
      
      error.value = ''
    } else {
      error.value = response.message || 'Erreur lors du chargement du lien de paiement'
    }
  } catch (err) {
    console.error('Erreur API:', err)
    if (err.status === 404) {
      error.value = 'Lien de paiement non trouvé'
    } else if (err.status === 410) {
      error.value = 'Ce lien de paiement n\'est plus disponible'
    } else if (err.status === 500) {
      error.value = 'Erreur technique du serveur. Veuillez réessayer.'
    } else {
      error.value = err.data?.message || 'Erreur de connexion. Veuillez réessayer.'
    }
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!formData.value.name.trim()) {
    return 'Le nom est requis'
  }
  if (!formData.value.email.trim()) {
    return 'L\'email est requis'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    return 'Format d\'email invalide'
  }
  if (paymentData.value?.amount_type === 'flexible') {
    if (!formData.value.amount || formData.value.amount <= 0) {
      return 'Le montant est requis et doit être supérieur à 0'
    }
  }
  return null
}

const triggerPayment = async () => {
  const validationError = validateForm()
  if (validationError) {
    error.value = validationError
    return
  }

  isProcessing.value = true
  error.value = ''

  try {
    const fullPhoneNumber = formData.value.phoneNumber?.trim() 
      ? `${selectedCountry.value?.dialCode || '+225'}${formData.value.phoneNumber.trim()}`
      : null

    const paymentPayload = {
      payment_method: selectedPayment.value,
      payer_name: formData.value.name.trim(),
      payer_email: formData.value.email.trim(),
      payer_phone: fullPhoneNumber
    }

    if (paymentData.value.amount_type === 'flexible') {
      paymentPayload.amount = parseFloat(formData.value.amount)
    } else {
      paymentPayload.amount = parseFloat(paymentData.value.fixed_amount)
    }

    const response = await $fetch(`${apiBaseUrl}/public/payment/${customUrl.value}/initialize`, {
      method: 'POST',
      body: paymentPayload
    })

    if (response.success) {
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url
      } else {
        await router.push(`/payment/success?transaction=${response.data.transaction_id}`)
      }
    } else {
      error.value = response.message || 'Erreur lors de l\'initialisation du paiement'
    }
  } catch (err) {
    console.error('Erreur lors du paiement:', err)
    if (err.status === 400) {
      error.value = err.data?.message || 'Données invalides'
    } else if (err.status === 404) {
      error.value = 'Lien de paiement non trouvé'
    } else if (err.status === 410) {
      error.value = 'Ce lien de paiement n\'est plus disponible'
    } else if (err.status === 500) {
      error.value = 'Erreur technique du serveur. Veuillez réessayer.'
    } else {
      error.value = err.data?.message || 'Erreur technique. Veuillez réessayer.'
    }
  } finally {
    isProcessing.value = false
  }
}

let timerInterval = null

const startTimer = () => {
  // Nettoyer le timer existant s'il y en a un
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      timerInterval = null
      // Optionnel: déclencher une action quand le timer expire
      console.log('Le lien de paiement a expiré')
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const expirationStatus = computed(() => {
  // Si pas de données de paiement, ne rien afficher
  if (!paymentData.value) {
    return { show: false }
  }

  // Si le lien est déjà expiré selon le backend
  if (paymentData.value.is_expired) {
    return {
      show: true,
      containerClass: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-6',
      textClass: 'text-red-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full',
      iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      message: 'Ce lien de paiement a expiré',
      badge: 'Expiré'
    }
  }

  // Si pas de date d'expiration définie
  if (!paymentData.value.expires_at) {
    return { show: false }
  }

  // Si le temps restant est épuisé (calculé côté frontend)
  if (timeLeft.value <= 0) {
    return {
      show: true,
      containerClass: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-6',
      textClass: 'text-red-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full',
      iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      message: 'Ce lien de paiement a expiré',
      badge: 'Expiré'
    }
  }

  // Si moins de 10 minutes restantes (urgent)
  if (timeLeft.value <= 600) {
    return {
      show: true,
      containerClass: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-6',
      textClass: 'text-red-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      message: `Lien expire dans ${formattedTime.value}`,
      badge: 'Urgent'
    }
  }

  // Si moins d'1 heure restante (attention)
  if (timeLeft.value <= 3600) {
    return {
      show: true,
      containerClass: 'bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6',
      textClass: 'text-orange-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      message: `Lien expire dans ${formattedTime.value}`,
      badge: 'Attention'
    }
  }

  // Si moins de 24 heures restantes (info)
  if (timeLeft.value <= 86400) {
    const hours = Math.floor(timeLeft.value / 3600)
    const minutes = Math.floor((timeLeft.value % 3600) / 60)
    const timeDisplay = hours > 0 ? `${hours}h ${minutes}min` : formattedTime.value
    
    return {
      show: true,
      containerClass: 'bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6',
      textClass: 'text-blue-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      message: `Lien expire dans ${timeDisplay}`,
      badge: 'Info'
    }
  }

  // Plus de 24 heures, afficher avec style neutre
  const days = Math.floor(timeLeft.value / 86400)
  const hours = Math.floor((timeLeft.value % 86400) / 3600)
  const minutes = Math.floor((timeLeft.value % 3600) / 60)
  
  let timeDisplay
  if (days > 0) {
    timeDisplay = days === 1 ? `${days} jour` : `${days} jours`
    if (hours > 0) {
      timeDisplay += ` ${hours}h`
    }
  } else if (hours > 0) {
    timeDisplay = `${hours}h ${minutes}min`
  } else {
    timeDisplay = formattedTime.value
  }
  
  return {
    show: true,
    containerClass: 'bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6',
    textClass: 'text-gray-700 font-medium flex items-center text-sm',
    badgeClass: 'text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    message: `Lien expire dans ${timeDisplay}`,
    badge: 'Valide'
  }
})

const isPaymentExpired = computed(() => {
  if (!paymentData.value) return false
  return paymentData.value.is_expired || timeLeft.value <= 0
})

const availablePaymentMethods = computed(() => {
  return paymentData.value?.available_payment_methods || []
})

const getSelectedPaymentLabel = () => {
  if (!selectedPayment.value) return ''
  const method = availablePaymentMethods.value.find(m => m.value === selectedPayment.value)
  return method ? method.label : selectedPayment.value
}

const displayAmount = computed(() => {
  if (!paymentData.value) return '0'
  
  if (paymentData.value.amount_type === 'fixed') {
    return paymentData.value.fixed_amount
  } else {
    return formData.value.amount || '0'
  }
})

// Calculer les frais en fonction de la méthode de paiement sélectionnée
const selectedPaymentMethod = computed(() => {
  return availablePaymentMethods.value.find(m => m.value === selectedPayment.value)
})

const calculatedFees = computed(() => {
  const amount = parseFloat(displayAmount.value) || 0
  if (!selectedPaymentMethod.value || amount === 0) {
    return {
      leekpay_fee: 0,
      aggregator_fee: 0,
      total_fees: 0,
      total_amount: amount
    }
  }
  
  const leekpayFee = Math.round(amount * (selectedPaymentMethod.value.leekpay_fee_rate || 0) * 100) / 100
  const aggregatorFee = Math.round(amount * (selectedPaymentMethod.value.aggregator_fee_rate || 0) * 100) / 100
  const totalFees = leekpayFee + aggregatorFee
  
  return {
    leekpay_fee: leekpayFee,
    aggregator_fee: aggregatorFee,
    total_fees: totalFees,
    total_amount: amount + totalFees
  }
})

const currency = computed(() => {
  return paymentData.value?.currency || { symbol: 'FCFA', code: 'XOF' }
})

const paymentTitle = computed(() => {
  return paymentData.value?.title || ''
})

const paymentDescription = computed(() => {
  return paymentData.value?.description || ''
})



const handleImageError = () => {
  imageError.value = true
}

const selectCountry = (country) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
  searchQuery.value = ''
}

const initializeDefaultCountry = () => {
  selectedCountry.value = getCountryByDialCode('+225')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showCountryDropdown.value = false
  }
}

const handleReturnParameters = () => {
  const status = route.query.status
  const transactionId = route.query.transaction
  
  if (status === 'success' && transactionId) {
    router.push(`/payment/success?transaction=${transactionId}`)
    return true
  }
  
  if (status === 'cancelled' && transactionId) {
    error.value = 'Le paiement a été annulé. Vous pouvez réessayer ci-dessous.'
    return false
  }
  
  return false
}

// Fonction pour vérifier si le formulaire de paiement est visible
const checkPaymentFormVisibility = () => {
  const paymentFormElement = document.getElementById('payment-form')
  if (paymentFormElement) {
    const rect = paymentFormElement.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    // Si le formulaire est visible (au moins 30% visible dans la fenêtre)
    const isVisible = rect.top < windowHeight * 0.7 && rect.bottom > 0
    
    // Cacher le bouton sticky si le formulaire est visible
    showStickyButton.value = !isVisible
  }
}

// Fonction pour faire défiler vers le formulaire de paiement
const scrollToPaymentForm = () => {
  const paymentFormElement = document.getElementById('payment-form')
  if (paymentFormElement) {
    paymentFormElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    // Cacher le bouton sticky après le scroll pour éviter la confusion
    setTimeout(() => {
      showStickyButton.value = false
    }, 800) // Délai pour laisser le temps au scroll de se terminer
  }
}

onMounted(() => {
  initializeDefaultCountry()
  document.addEventListener('click', handleClickOutside)
  
  // Ajouter le listener de scroll pour détecter la visibilité du formulaire
  window.addEventListener('scroll', checkPaymentFormVisibility)
  
  // Vérifier la visibilité initiale
  nextTick(() => {
    checkPaymentFormVisibility()
  })
  
  const shouldRedirect = handleReturnParameters()
  
  if (!shouldRedirect) {
    fetchPaymentData()
  }
})



onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', checkPaymentFormVisibility)
  stopTimer() // Nettoyer le timer pour éviter les fuites mémoire
})


</script>