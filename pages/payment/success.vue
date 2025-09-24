<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Loading state -->
      <div v-if="loading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Vérification du statut de votre transaction...</p>
      </div>

      <!-- Success state -->
      <div v-else-if="transaction && transaction.status === 'paid'" class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Paiement réussi !</h2>
        <p class="text-gray-600 mb-6">Votre transaction a été traitée avec succès.</p>
        
        <!-- Transaction details -->
        <div class="bg-white p-6 rounded-lg shadow border border-gray-200 text-left mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Détails de la transaction</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">ID Transaction:</span>
              <span class="font-medium">#{{ transaction.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Montant:</span>
              <span class="font-medium">{{ transaction.amount }} {{ currency.symbol }}</span>
            </div>
            <div class="flex justify-between" v-if="transaction.total_fees > 0">
              <span class="text-gray-600">Frais:</span>
              <span class="font-medium">{{ transaction.total_fees }} {{ currency.symbol }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Date:</span>
              <span class="font-medium">{{ formatDate(transaction.processed_at) }}</span>
            </div>
            <div class="flex justify-between" v-if="transaction.payment_link">
              <span class="text-gray-600">Pour:</span>
              <span class="font-medium">{{ transaction.payment_link.title }}</span>
            </div>
          </div>
        </div>

        <!-- PDF Download if available -->
        <div v-if="transaction.payment_link?.pdf_url" class="mb-6">
          <a 
            :href="transaction.payment_link.pdf_url" 
            target="_blank"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Télécharger le reçu
          </a>
        </div>
      </div>

      <!-- Pending state -->
      <div v-else-if="transaction && transaction.status === 'pending'" class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-6">
          <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Paiement en cours...</h2>
        <p class="text-gray-600 mb-6">Votre transaction est en cours de traitement. Veuillez patienter.</p>
        
        <div class="bg-white p-6 rounded-lg shadow border border-gray-200 text-left mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Détails de la transaction</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">ID Transaction:</span>
              <span class="font-medium">#{{ transaction.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Montant:</span>
              <span class="font-medium">{{ transaction.amount }} {{ currency.symbol }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Statut:</span>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                En attente
              </span>
            </div>
          </div>
        </div>

        <button 
          @click="checkStatus"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Actualiser le statut
        </button>
      </div>

      <!-- Failed state -->
      <div v-else-if="transaction && transaction.status === 'failed'" class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-6">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Paiement échoué</h2>
        <p class="text-gray-600 mb-6">Une erreur s'est produite lors du traitement de votre paiement.</p>
        
        <div class="bg-white p-6 rounded-lg shadow border border-gray-200 text-left mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Détails de la transaction</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">ID Transaction:</span>
              <span class="font-medium">#{{ transaction.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Statut:</span>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Échoué
              </span>
            </div>
          </div>
        </div>

        <button 
          @click="goBackToPayment"
          class="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition"
        >
          Réessayer le paiement
        </button>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-6">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        
        <button 
          @click="checkStatus"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Réessayer
        </button>
      </div>

      <!-- Back to home -->
      <div class="text-center">
        <NuxtLink 
          to="/"
          class="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Retour à l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

// Imports
const route = useRoute()
const router = useRouter()

// État réactif
const loading = ref(true)
const error = ref('')
const transaction = ref(null)

// Configuration de l'API
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiUrl || 'http://localhost:8000/api'

// Récupération de l'ID de transaction depuis l'URL
const transactionId = computed(() => route.query.transaction)

// Devise par défaut
const currency = computed(() => {
  return { symbol: 'FCFA', code: 'XOF' }
})

// Fonction pour vérifier le statut de la transaction
const checkStatus = async () => {
  if (!transactionId.value) {
    error.value = 'ID de transaction manquant'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = ''
    
    const response = await $fetch(`${apiBaseUrl}/public/transaction/${transactionId.value}/status`)
    
    if (response.success) {
      transaction.value = response.data
    } else {
      error.value = response.message || 'Erreur lors de la récupération du statut'
    }
  } catch (err) {
    console.error('Erreur API:', err)
    if (err.status === 404) {
      error.value = 'Transaction non trouvée'
    } else {
      error.value = 'Erreur de connexion. Veuillez réessayer.'
    }
  } finally {
    loading.value = false
  }
}

// Fonction pour retourner au paiement
const goBackToPayment = () => {
  if (transaction.value?.payment_link?.custom_url) {
    router.push(`/${transaction.value.payment_link.custom_url}`)
  } else {
    router.push('/')
  }
}

// Fonction pour formater la date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Vérification automatique du statut toutes les 5 secondes pour les transactions en attente
let statusInterval = null

const startStatusPolling = () => {
  if (statusInterval) clearInterval(statusInterval)
  
  statusInterval = setInterval(() => {
    if (transaction.value?.status === 'pending') {
      checkStatus()
    } else {
      clearInterval(statusInterval)
    }
  }, 5000)
}

// Initialisation au montage du composant
onMounted(() => {
  checkStatus().then(() => {
    if (transaction.value?.status === 'pending') {
      startStatusPolling()
    }
  })
})

// Nettoyage à la destruction du composant
onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
})
</script>