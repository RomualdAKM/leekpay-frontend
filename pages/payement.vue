<template>
  <div class="min-h-screen flex flex-col md:flex-row font-sans bg-gray-50">
    <!-- Section de gauche : visible sur TOUS les écrans -->
    <div class="w-full md:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-6 md:p-12">
      <div class="text-center max-w-lg w-full">
        <!-- Image agrandie -->
        <img
            :src="paymentImage"
            :alt="paymentTitle"
            class="w-full max-h-80 md:max-h-96 object-contain rounded-2xl shadow-lg mb-8"
        />
        <!-- Titre dynamique -->
        <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-3">{{ paymentTitle }}</h2>
        <!-- Description dynamique -->
        <p class="text-gray-700 leading-relaxed text-sm md:text-base">
          {{ paymentDescription }}
        </p>
      </div>
    </div>

    <!-- Formulaire de paiement -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
      <div class="w-full max-w-md">
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <!-- Titre & Montant -->
          <div class="text-center mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2"></h1>
            <p class="text-base md:text-lg text-gray-700">Effectuez votre paiement</p>
            <p class="text-2xl md:text-3xl font-bold text-green-500 mt-2">4900 FCFA</p>
          </div>

          <!-- Compte à rebours -->
          <div v-if="timeLeft" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div class="flex items-center justify-between">
              <span class="text-red-700 font-medium flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lien expiré dans {{ timeLeft }}
              </span>
              <span class="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Urgent</span>
            </div>
          </div>

          <!-- Informations personnelles -->
          <div class="space-y-4 mb-6">
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
          </div>

          <!-- Mode de paiement -->
          <div class="space-y-6 mb-8">
            <label class="block text-sm font-medium text-slate-700">Choisissez votre mode de paiement</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                  type="button"
                  @click="selectedPayment = 'mobile-money'"
                  :class="[
                    'px-4 py-4 rounded-lg font-medium transition text-sm',
                    selectedPayment === 'mobile-money'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'border border-gray-300 text-slate-700 hover:bg-gray-50'
                  ]"
              >
                Mobile Money
              </button>
              <button
                  type="button"
                  @click="selectedPayment = 'card'"
                  :class="[
                    'px-4 py-4 rounded-lg font-medium transition text-sm',
                    selectedPayment === 'card'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'border border-gray-300 text-slate-700 hover:bg-gray-50'
                  ]"
              >
                Carte bancaire
              </button>
            </div>
          </div>

          <!-- Bouton Payer -->
          <button
              @click="triggerPayment"
              :disabled="isProcessing"
              class="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-bold text-base hover:bg-green-600 transition shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isProcessing" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
            <span v-else>
              {{ selectedPayment ? `Payer avec ${selectedPayment === 'mobile-money' ? 'Mobile Money' : 'Carte'}` : 'Sélectionnez un mode de paiement' }}
            </span>
          </button>

          <!-- Sécurité -->
          <div class="mt-8 text-center">
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
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const selectedPayment = ref('')
const timeLeft = ref('')
const isProcessing = ref(false)

// Données du formulaire
const formData = ref({
  name: '',
  email: ''
})

// ➡️ DONNÉES DYNAMIQUES DU LIEN DE PAIEMENT
const paymentTitle = ref('Titre de mon lien de paiement')
const paymentDescription = ref('Encaissez en quelques secondes, sans stress, avec Mobile Money ou Carte bancaire.')
import registerImg from '~/assets/img/register_img.jpg'
const paymentImage = ref(registerImg) // ou URL dynamique depuis props/API

onMounted(() => {
  const now = new Date()
  const expiry = new Date(now.getTime() + 1000 * 60 * 60 * 2) // 2 heures

  const updateCountdown = () => {
    const diff = expiry - new Date()
    if (diff <= 0) {
      timeLeft.value = 'Lien expiré'
      clearInterval(intervalId)
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      timeLeft.value = `${minutes}m ${seconds.toString().padStart(2, '0')}s`
    }
  }

  updateCountdown()
  const intervalId = setInterval(updateCountdown, 1000)

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
})

const triggerPayment = () => {
  // Validation
  if (!formData.value.name.trim()) {
    alert('Veuillez entrer votre nom complet.')
    return
  }
  if (!formData.value.email.trim()) {
    alert('Veuillez entrer votre email.')
    return
  }
  if (!selectedPayment.value) {
    alert('Veuillez sélectionner un mode de paiement.')
    return
  }

  isProcessing.value = true

  // 🚀 Envoi à l’API
  console.log('Données envoyées :', {
    name: formData.value.name,
    email: formData.value.email,
    amount: 4900,
    currency: 'XOF',
    paymentMethod: selectedPayment.value
  })

  setTimeout(() => {
    if (selectedPayment.value === 'mobile-money') {
      alert('Redirection vers Mobile Money...')
    } else {
      alert('Redirection vers Carte bancaire...')
    }
    isProcessing.value = false
  }, 1500)
}
</script>