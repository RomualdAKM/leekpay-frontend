<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Toast notification -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showToast"
        :class="[
          'fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2',
          toastType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        ]"
      >
        <CheckCircle v-if="toastType === 'success'" class="h-5 w-5" />
        <XCircle v-else class="h-5 w-5" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Header -->
    <div>
      <h1 class="text-xl sm:text-2xl font-bold mb-1" style="color: #0A1F44">Vérification d'identité</h1>
      <p class="text-gray-600 text-sm">Vérifiez votre identité pour pouvoir effectuer des retraits</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>

    <template v-else>
      <!-- Status Card - Approved -->
      <div v-if="kycStatus === 'approved'" class="bg-green-50 border border-green-200 rounded-lg p-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 class="font-semibold text-green-800">Identité vérifiée</h3>
            <p class="text-sm text-green-700">
              Votre identité a été vérifiée le {{ formatDate(kycVerifiedAt) }}. Vous pouvez effectuer des retraits.
            </p>
          </div>
        </div>
        <div class="mt-4">
          <NuxtLink 
            to="/dashboard/withdrawals" 
            class="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <ArrowRight class="w-4 h-4" />
            Effectuer un retrait
          </NuxtLink>
        </div>
      </div>

      <!-- Status Card - Pending -->
      <div v-else-if="kycStatus === 'pending'" class="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock class="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 class="font-semibold text-orange-800">Vérification en cours</h3>
            <p class="text-sm text-orange-700">
              Vos documents sont en cours d'examen. Nous vous notifierons par email une fois la vérification terminée.
            </p>
          </div>
        </div>
        
        <!-- Documents submitted preview -->
        <div v-if="latestVerification" class="mt-4 pt-4 border-t border-orange-200">
          <p class="text-sm text-orange-700 mb-2">Documents soumis le {{ formatDate(latestVerification.submitted_at) }}</p>
        </div>
      </div>

      <!-- Status Card - Rejected -->
      <div v-else-if="kycStatus === 'rejected'" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle class="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 class="font-semibold text-red-800">Vérification refusée</h3>
            <p class="text-sm text-red-700">
              Votre vérification a été refusée. Veuillez soumettre de nouveaux documents.
            </p>
          </div>
        </div>
        
        <div v-if="latestVerification?.rejection_reason" class="mt-4 p-3 bg-red-100 rounded-lg">
          <p class="text-sm font-medium text-red-800">Motif du refus :</p>
          <p class="text-sm text-red-700">{{ latestVerification.rejection_reason }}</p>
        </div>
      </div>

      <!-- Upload Form - Show if not submitted, rejected, or not approved -->
      <div v-if="kycStatus !== 'approved' && kycStatus !== 'pending'" class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="font-semibold text-lg mb-4" style="color: #0A1F44">Soumettre vos documents</h3>
        
        <div class="space-y-6">
          <!-- Instructions -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-medium text-blue-800 mb-2">Documents requis :</h4>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• Photo du recto de votre carte d'identité</li>
              <li>• Photo du verso de votre carte d'identité</li>
              <li>• Photo selfie avec votre carte d'identité en main</li>
            </ul>
          </div>

          <!-- ID Card Front -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Photo recto de la carte d'identité *
            </label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer"
              :class="{ 'border-green-500 bg-green-50': idCardFrontPreview }"
              @click="$refs.idCardFrontInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop($event, 'id_card_front')"
            >
              <input 
                ref="idCardFrontInput"
                type="file" 
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="handleFileChange($event, 'id_card_front')"
              />
              <div v-if="idCardFrontPreview">
                <img :src="idCardFrontPreview" alt="Recto carte" class="max-h-40 mx-auto rounded-lg mb-2" />
                <p class="text-sm text-green-600">Cliquez pour changer</p>
              </div>
              <div v-else>
                <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p class="text-sm text-gray-600">Cliquez ou glissez-déposez l'image</p>
                <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
              </div>
            </div>
          </div>

          <!-- ID Card Back -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Photo verso de la carte d'identité *
            </label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer"
              :class="{ 'border-green-500 bg-green-50': idCardBackPreview }"
              @click="$refs.idCardBackInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop($event, 'id_card_back')"
            >
              <input 
                ref="idCardBackInput"
                type="file" 
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="handleFileChange($event, 'id_card_back')"
              />
              <div v-if="idCardBackPreview">
                <img :src="idCardBackPreview" alt="Verso carte" class="max-h-40 mx-auto rounded-lg mb-2" />
                <p class="text-sm text-green-600">Cliquez pour changer</p>
              </div>
              <div v-else>
                <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p class="text-sm text-gray-600">Cliquez ou glissez-déposez l'image</p>
                <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
              </div>
            </div>
          </div>

          <!-- Selfie with Card -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Photo selfie avec la carte en main *
            </label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer"
              :class="{ 'border-green-500 bg-green-50': selfiePreview }"
              @click="$refs.selfieInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop($event, 'selfie_with_card')"
            >
              <input 
                ref="selfieInput"
                type="file" 
                accept="image/jpeg,image/png,image/jpg"
                class="hidden"
                @change="handleFileChange($event, 'selfie_with_card')"
              />
              <div v-if="selfiePreview">
                <img :src="selfiePreview" alt="Selfie" class="max-h-40 mx-auto rounded-lg mb-2" />
                <p class="text-sm text-green-600">Cliquez pour changer</p>
              </div>
              <div v-else>
                <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p class="text-sm text-gray-600">Cliquez ou glissez-déposez l'image</p>
                <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
              </div>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            @click="submitKyc"
            :disabled="!canSubmit || submitting"
            class="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <div v-if="submitting" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span v-if="submitting">Envoi en cours...</span>
            <span v-else>Soumettre pour vérification</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CheckCircle, XCircle, Clock, Upload, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const { token } = useAuth()
const config = useRuntimeConfig()

// State
const loading = ref(true)
const submitting = ref(false)
const kycStatus = ref('not_submitted')
const kycVerifiedAt = ref(null)
const latestVerification = ref(null)
const errorMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// File states
const idCardFront = ref(null)
const idCardBack = ref(null)
const selfieWithCard = ref(null)
const idCardFrontPreview = ref(null)
const idCardBackPreview = ref(null)
const selfiePreview = ref(null)

// Computed
const canSubmit = computed(() => {
  return idCardFront.value && idCardBack.value && selfieWithCard.value
})

// Methods
const showToastNotification = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 4000)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleFileChange = (event, type) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Validate file
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    showToastNotification('Format non supporté. Utilisez JPG ou PNG.', 'error')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    showToastNotification('Fichier trop volumineux. Maximum 5 Mo.', 'error')
    return
  }
  
  // Set file and preview
  const reader = new FileReader()
  reader.onload = (e) => {
    if (type === 'id_card_front') {
      idCardFront.value = file
      idCardFrontPreview.value = e.target.result
    } else if (type === 'id_card_back') {
      idCardBack.value = file
      idCardBackPreview.value = e.target.result
    } else if (type === 'selfie_with_card') {
      selfieWithCard.value = file
      selfiePreview.value = e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const handleDrop = (event, type) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    const fakeEvent = { target: { files: [file] } }
    handleFileChange(fakeEvent, type)
  }
}

const loadKycStatus = async () => {
  try {
    loading.value = true
    const response = await $fetch(`${config.public.apiBaseURL}/kyc/status`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (response.success) {
      kycStatus.value = response.data.kyc_status?.value || response.data.kyc_status || 'not_submitted'
      kycVerifiedAt.value = response.data.kyc_verified_at
      latestVerification.value = response.data.latest_verification
    }
  } catch (error) {
    console.error('Erreur chargement statut KYC:', error)
  } finally {
    loading.value = false
  }
}

const submitKyc = async () => {
  if (!canSubmit.value) return
  
  try {
    submitting.value = true
    errorMessage.value = ''
    
    const formData = new FormData()
    formData.append('id_card_front', idCardFront.value)
    formData.append('id_card_back', idCardBack.value)
    formData.append('selfie_with_card', selfieWithCard.value)
    
    const response = await $fetch(`${config.public.apiBaseURL}/kyc/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: formData
    })
    
    if (response.success) {
      showToastNotification('Documents soumis avec succès !', 'success')
      kycStatus.value = 'pending'
      latestVerification.value = response.data
    }
  } catch (error) {
    console.error('Erreur soumission KYC:', error)
    errorMessage.value = error.data?.message || 'Erreur lors de la soumission des documents.'
    showToastNotification(errorMessage.value, 'error')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadKycStatus()
})
</script>
