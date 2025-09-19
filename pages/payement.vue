<template>
  <div class="min-h-screen flex flex-col md:flex-row font-sans bg-gray-50">
    <!-- Image à gauche (visible uniquement sur grand écran) -->
    <div class="hidden md:block md:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-12">
      <div class="text-center max-w-md">
        <img
            src="~/assets/img/register_img.jpg"
            alt="Paiement sécurisé avec LeekPay"
            class="w-full h-auto rounded-2xl shadow-lg mb-8"
        />
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Paiement rapide & sécurisé</h2>
        <p class="text-gray-700 leading-relaxed">
          Encaissez en quelques secondes, sans stress, avec Mobile Money, Carte bancaire ou PayPal.
        </p>
      </div>
    </div>

    <!-- Formulaire de paiement -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
      <div class="w-full max-w-md">
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <!-- Titre & Motif -->
          <div class="text-center mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Paiement pour Cotisation annuelle</h1>
            <p class="text-base md:text-lg text-gray-700">Accès premium - 12 mois</p>
            <p class="text-2xl md:text-3xl font-bold text-green-500 mt-2">4900 FCFA</p>
          </div>

          <!-- Compte à rebours -->
          <div v-if="timeLeft" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
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

          <!-- Formulaire de paiement -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Informations personnelles -->
            <div class="space-y-3">
              <h2 class="text-lg font-semibold text-slate-900">Vos informations</h2>
              <input
                  type="text"
                  placeholder="Nom complet"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                  required
              />
              <input
                  type="email"
                  placeholder="Email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                  required
              />
            </div>

            <!-- Mode de paiement -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Mode de paiement</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    @click="selectedPayment = 'mobile-money'"
                    :class="[
                    'px-4 py-3 rounded-lg font-medium transition text-sm',
                    selectedPayment === 'mobile-money'
                      ? 'bg-green-500 text-white'
                      : 'border border-gray-300 text-slate-700 hover:bg-gray-50'
                  ]"
                >
                  Mobile Money
                </button>
                <button
                    type="button"
                    @click="selectedPayment = 'card'"
                    :class="[
                    'px-4 py-3 rounded-lg font-medium transition text-sm',
                    selectedPayment === 'card'
                      ? 'bg-green-500 text-white'
                      : 'border border-gray-300 text-slate-700 hover:bg-gray-50'
                  ]"
                >
                  Carte bancaire
                </button>
              </div>
            </div>

            <!-- Pays -->
            <div v-if="selectedPayment">
              <label class="block text-sm font-medium text-slate-700 mb-2">Pays</label>
              <div class="relative">
                <select
                    v-model="selectedCountry"
                    @change="resetNetwork"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none bg-white text-sm"
                    required
                >
                  <option value="" disabled>Sélectionnez votre pays</option>
                  <option value="bj">🇧🇯 Bénin</option>
                  <option value="ci">🇨🇮 Côte d'Ivoire</option>
                  <option value="sn">🇸🇳 Sénégal</option>
                  <option value="ml">🇲🇱 Mali</option>
                  <option value="tg">🇹🇬 Togo</option>
                  <option value="bf">🇧🇫 Burkina Faso</option>
                  <option value="ne">🇳🇪 Niger</option>
                  <option value="gn">🇬🇳 Guinée</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Réseau + Numéro sur la même ligne (uniquement pour Mobile Money) -->
            <div v-if="selectedPayment === 'mobile-money' && selectedCountry" class="space-y-3">
              <label class="block text-sm font-medium text-slate-700">Mobile Money</label>
              <div class="flex gap-3">
                <div class="relative w-1/3">
                  <select
                      v-model="selectedNetwork"
                      class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none bg-white text-sm"
                      required
                  >
                    <option value="" disabled>Réseau</option>
                    <option v-for="network in getNetworks(selectedCountry)" :key="network.value" :value="network.value">
                      {{ network.label }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <input
                    type="tel"
                    placeholder="Numéro (sans indicatif)"
                    class="w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                    required
                />
              </div>
            </div>

            <!-- Détails carte bancaire -->
            <div v-if="selectedPayment === 'card'" class="space-y-3">
              <input
                  type="text"
                  placeholder="Numéro de carte"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                  required
              />
              <div class="grid grid-cols-2 gap-3">
                <input
                    type="text"
                    placeholder="MM/YY"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                    required
                />
                <input
                    type="text"
                    placeholder="CVV"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm"
                    required
                />
              </div>
              <!-- Option PayPal -->
              <div class="flex items-center">
                <input
                    id="paypal"
                    type="checkbox"
                    v-model="usePayPal"
                    class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <label for="paypal" class="ml-2 block text-sm text-slate-700">
                  Payer via PayPal
                </label>
              </div>
            </div>

            <!-- Bouton Payer -->
            <button
                type="submit"
                class="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-bold text-base hover:bg-green-600 transition shadow-md mt-4"
            >
              Payer 4900 FCFA
            </button>

            <!-- Sécurité -->
            <div class="mt-6 text-center">
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Paiement 100% sécurisé</span>
              </div>
              <div class="flex justify-center gap-4">
                <img src="~/assets/img/mtn.png" alt="MTN" class="h-6 w-auto" />
                <img src="~/assets/img/orange.png" alt="Orange" class="h-6 w-auto" />
                <img src="~/assets/img/visa.png" alt="Visa" class="h-6 w-auto" />
                <img src="~/assets/img/paypal.png" alt="PayPal" class="h-6 w-auto" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const selectedPayment = ref('mobile-money')
const selectedCountry = ref('')
const selectedNetwork = ref('')
const usePayPal = ref(false)
const timeLeft = ref('')

const countries = {
  bj: { name: 'Bénin', flag: 'bj' },
  ci: { name: 'Côte d\'Ivoire', flag: 'ci' },
  sn: { name: 'Sénégal', flag: 'sn' },
  ml: { name: 'Mali', flag: 'ml' },
  tg: { name: 'Togo', flag: 'tg' },
  bf: { name: 'Burkina Faso', flag: 'bf' },
  ne: { name: 'Niger', flag: 'ne' },
  gn: { name: 'Guinée', flag: 'gn' }
}

const networks = {
  bj: [
    { value: 'mtn', label: 'MTN' },
    { value: 'moov', label: 'Moov' },
    { value: 'orange', label: 'Orange' }
  ],
  ci: [
    { value: 'mtn', label: 'MTN' },
    { value: 'moov', label: 'Moov' },
    { value: 'orange', label: 'Orange' }
  ],
  sn: [
    { value: 'orange', label: 'Orange' },
    { value: 'free', label: 'Free' }
  ],
  ml: [
    { value: 'orange', label: 'Orange' },
    { value: 'malitel', label: 'Malitel' }
  ],
  tg: [
    { value: 'togocel', label: 'Togocel' },
    { value: 'moov', label: 'Moov' }
  ],
  bf: [
    { value: 'onatel', label: 'Onatel' },
    { value: 'orange', label: 'Orange' }
  ],
  ne: [
    { value: 'airtel', label: 'Airtel' },
    { value: 'orange', label: 'Orange' }
  ],
  gn: [
    { value: 'orange', label: 'Orange' },
    { value: 'cellcom', label: 'Cellcom' }
  ]
}

const getFlag = (code) => `https://flagcdn.com/w20/${code}.png`
const getCountryName = (code) => countries[code]?.name || ''
const getNetworks = (countryCode) => networks[countryCode] || []

const resetNetwork = () => {
  selectedNetwork.value = ''
}

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

const handleSubmit = () => {
  if (!selectedPayment || !selectedCountry) {
    alert('Veuillez sélectionner un mode de paiement et un pays.')
    return
  }
  if (selectedPayment === 'mobile-money' && !selectedNetwork) {
    alert('Veuillez sélectionner un réseau mobile.')
    return
  }
  if (selectedPayment === 'card' && usePayPal.value) {
    alert('Vous serez redirigé vers PayPal pour finaliser votre paiement.')
  } else {
    alert('Paiement en cours de traitement...')
  }
}
</script>