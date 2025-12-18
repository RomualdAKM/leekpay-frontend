<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-6">
        <img src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png" alt="LeekPay" class="h-10 mx-auto" />
      </div>

      <!-- Card principale -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header avec montant -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 text-center">
          <p class="text-sm opacity-90 mb-1">{{ description || 'Montant à payer' }}</p>
          <p class="text-3xl font-bold">
            {{ formatAmount(amount) }} {{ currencySymbol }}
          </p>
        </div>

        <!-- Formulaire -->
        <div class="p-6">
          <!-- Message d'erreur -->
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- Étape 1: Informations client -->
          <div v-if="step === 1" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                v-model="payerName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Jean Dupont"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="payerEmail"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="jean@example.com"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
              <input
                v-model="payerPhone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+229 90 00 00 00"
              />
            </div>

            <button
              @click="goToStep2"
              :disabled="!payerName || !payerEmail"
              class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>

          <!-- Étape 2: Choix méthode de paiement -->
          <div v-if="step === 2" class="space-y-4">
            <button @click="step = 1" class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>

            <p class="text-sm text-gray-600 mb-2">Choisissez votre méthode de paiement :</p>

            <div class="space-y-3">
              <!-- Mobile Money -->
              <button
                @click="selectPayment('mobile_money')"
                class="w-full p-4 border-2 rounded-lg flex items-center gap-4 hover:border-green-500 transition"
                :class="selectedPayment === 'mobile_money' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
              >
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="font-medium">Mobile Money</p>
                  <p class="text-xs text-gray-500">MTN, Moov, Orange, Wave...</p>
                </div>
              </button>

              <!-- Carte bancaire -->
              <button
                @click="selectPayment('card')"
                :disabled="isCardDisabled"
                class="w-full p-4 border-2 rounded-lg flex items-center gap-4 transition"
                :class="[
                  isCardDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' : 'hover:border-green-500',
                  selectedPayment === 'card' && !isCardDisabled ? 'border-green-500 bg-green-50' : 'border-gray-200'
                ]"
              >
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div class="text-left flex-1">
                  <p class="font-medium">Carte bancaire</p>
                  <p class="text-xs text-gray-500">Visa, Mastercard</p>
                </div>
                <span v-if="isCardDisabled" class="text-xs text-red-500">Min. {{ minCardAmount }} {{ currencySymbol }}</span>
              </button>

              <!-- PayPal -->
              <button
                @click="selectPayment('paypal')"
                :disabled="isPaypalDisabled"
                class="w-full p-4 border-2 rounded-lg flex items-center gap-4 transition"
                :class="[
                  isPaypalDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' : 'hover:border-green-500',
                  selectedPayment === 'paypal' && !isPaypalDisabled ? 'border-green-500 bg-green-50' : 'border-gray-200'
                ]"
              >
                <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span class="text-indigo-600 font-bold text-sm">PP</span>
                </div>
                <div class="text-left flex-1">
                  <p class="font-medium">PayPal</p>
                  <p class="text-xs text-gray-500">Compte PayPal ou carte</p>
                </div>
                <span v-if="isPaypalDisabled" class="text-xs text-red-500">Min. {{ minCardAmount }} {{ currencySymbol }}</span>
              </button>
            </div>

            <button
              @click="processPayment"
              :disabled="!selectedPayment || isProcessing"
              class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isProcessing" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isProcessing ? 'Traitement...' : 'Payer maintenant' }}
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-6 py-4 text-center">
          <p class="text-xs text-gray-500 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Paiement sécurisé par LeekPay
          </p>
        </div>
      </div>

      <!-- Bouton annuler -->
      <div class="text-center mt-4">
        <button @click="cancel" class="text-sm text-gray-500 hover:text-gray-700">
          Annuler le paiement
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()

// Paramètres reçus via query
const amount = ref(0)
const currency = ref('XOF')
const description = ref('')
const apiKey = ref('')
const returnUrl = ref('')
const cancelUrl = ref('')
const isCallback = ref(false)

// État du formulaire
const step = ref(1)
const payerName = ref('')
const payerEmail = ref('')
const payerPhone = ref('')
const selectedPayment = ref(null)
const isProcessing = ref(false)
const error = ref('')

// Seuil minimum pour carte/PayPal (équivalent 10 EUR)
const MIN_EUR = 10
const minCardAmount = computed(() => {
  const rates = { 'EUR': 10, 'USD': 11, 'XOF': 6560 }
  return rates[currency.value] || 6560
})

const isCardDisabled = computed(() => amount.value < minCardAmount.value)
const isPaypalDisabled = computed(() => amount.value < minCardAmount.value)

const currencySymbol = computed(() => {
  const symbols = { 'EUR': '€', 'USD': '$', 'XOF': 'CFA' }
  return symbols[currency.value] || 'CFA'
})

// Formater le montant
function formatAmount(value) {
  return new Intl.NumberFormat('fr-FR').format(value)
}

// Initialisation
onMounted(() => {
  amount.value = parseFloat(route.query.amount) || 0
  currency.value = route.query.currency || 'XOF'
  description.value = route.query.description || ''
  apiKey.value = route.query.key || ''
  returnUrl.value = route.query.return_url || ''
  cancelUrl.value = route.query.cancel_url || ''
  isCallback.value = route.query.callback === 'true'
  
  // Pré-remplir si fourni
  if (route.query.email) payerEmail.value = route.query.email
  if (route.query.name) payerName.value = route.query.name
})

function goToStep2() {
  if (!payerName.value || !payerEmail.value) {
    error.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }
  error.value = ''
  step.value = 2
}

function selectPayment(method) {
  if (method === 'card' && isCardDisabled.value) return
  if (method === 'paypal' && isPaypalDisabled.value) return
  selectedPayment.value = method
}

async function processPayment() {
  if (!selectedPayment.value || isProcessing.value) return
  
  isProcessing.value = true
  error.value = ''
  
  try {
    // Créer le checkout via la route publique widget (clé publique acceptée)
    const response = await $fetch(`${config.public.apiBaseURL}/public/widget/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        amount: amount.value,
        currency: currency.value,
        key: apiKey.value, // Clé publique (pk_xxx)
        description: description.value,
        return_url: returnUrl.value,
        customer_email: payerEmail.value,
        customer_name: payerName.value,
      },
    })

    if (response.success && response.data?.payment_url) {
      // Rediriger vers la page de paiement
      window.location.href = response.data.payment_url
    } else {
      throw new Error(response.message || 'Erreur lors de la création du paiement')
    }
  } catch (err) {
    console.error('Erreur paiement:', err)
    error.value = err.data?.message || err.message || 'Une erreur est survenue'
    isProcessing.value = false
  }
}

function cancel() {
  if (isCallback.value) {
    // Envoyer un message à la fenêtre parente
    window.parent.postMessage({ type: 'leekpay_cancel' }, '*')
  } else if (cancelUrl.value) {
    window.location.href = cancelUrl.value
  } else {
    window.history.back()
  }
}
</script>
