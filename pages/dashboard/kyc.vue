<template>
  <div class="p-4 sm:p-6">
    <!-- Toast -->
    <div
      v-if="showToast"
      class="fixed top-4 right-4 z-50 px-4 py-3 flex items-center gap-2"
      :class="toastType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'"
    >
      <CheckCircle v-if="toastType === 'success'" class="h-4 w-4" />
      <XCircle v-else class="h-4 w-4" />
      <span class="text-sm">{{ toastMessage }}</span>
    </div>

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-lg font-semibold text-gray-900">Vérification d'identité</h1>
      <p class="text-sm text-gray-500 mt-1">Vérifiez votre identité pour effectuer des retraits</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Approved -->
      <div v-if="kycStatus === 'approved'" class="border border-gray-200 p-5">
        <div class="flex items-start gap-3">
          <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-gray-900">Identité vérifiée</p>
            <p class="text-sm text-gray-500 mt-1">
              Vérifiée le {{ formatDate(kycVerifiedAt) }}
            </p>
            <NuxtLink 
              to="/dashboard/withdrawals" 
              class="inline-block mt-3 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition"
            >
              Effectuer un retrait
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Pending -->
      <div v-else-if="kycStatus === 'pending'" class="border border-gray-200 p-5">
        <div class="flex items-start gap-3">
          <Clock class="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-gray-900">Vérification en cours</p>
            <p class="text-sm text-gray-500 mt-1">
              Vos documents sont en cours d'examen. Notification par email à venir.
            </p>
            <p v-if="latestVerification" class="text-xs text-gray-400 mt-2">
              Soumis le {{ formatDate(latestVerification.submitted_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Rejected -->
      <div v-else-if="kycStatus === 'rejected'" class="border border-gray-200 p-5 mb-6">
        <div class="flex items-start gap-3">
          <XCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium text-gray-900">Vérification refusée</p>
            <p class="text-sm text-gray-500 mt-1">Veuillez soumettre de nouveaux documents.</p>
            <p v-if="latestVerification?.rejection_reason" class="text-sm text-red-600 mt-2">
              Motif : {{ latestVerification.rejection_reason }}
            </p>
          </div>
        </div>
      </div>

      <!-- Upload Form -->
      <div v-if="kycStatus !== 'approved' && kycStatus !== 'pending'" class="border border-gray-200 p-5">
        <h3 class="font-medium text-gray-900 mb-4">Soumettre vos documents</h3>
        
        <!-- Instructions -->
        <div class="mb-6 p-4 bg-gray-50 border border-gray-200">
          <p class="text-sm font-medium text-gray-700 mb-2">Documents requis :</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Recto de la carte d'identité</li>
            <li>• Verso de la carte d'identité</li>
            <li>• Selfie avec la carte en main</li>
          </ul>
        </div>

        <!-- ID Card Front -->
        <div class="mb-5">
          <label class="block text-sm text-gray-700 mb-2">Recto de la carte *</label>
          <div 
            class="border border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-gray-400 transition"
            :class="{ 'border-green-600 bg-green-50': idCardFrontPreview }"
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
              <img :src="idCardFrontPreview" alt="Recto" class="max-h-32 mx-auto mb-2" />
              <p class="text-xs text-gray-500">Cliquer pour changer</p>
            </div>
            <div v-else>
              <Upload class="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p class="text-sm text-gray-600">Cliquer ou glisser-déposer</p>
              <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
            </div>
          </div>
        </div>

        <!-- ID Card Back -->
        <div class="mb-5">
          <label class="block text-sm text-gray-700 mb-2">Verso de la carte *</label>
          <div 
            class="border border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-gray-400 transition"
            :class="{ 'border-green-600 bg-green-50': idCardBackPreview }"
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
              <img :src="idCardBackPreview" alt="Verso" class="max-h-32 mx-auto mb-2" />
              <p class="text-xs text-gray-500">Cliquer pour changer</p>
            </div>
            <div v-else>
              <Upload class="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p class="text-sm text-gray-600">Cliquer ou glisser-déposer</p>
              <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
            </div>
          </div>
        </div>

        <!-- Selfie -->
        <div class="mb-5">
          <label class="block text-sm text-gray-700 mb-2">Selfie avec la carte *</label>
          <div 
            class="border border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-gray-400 transition"
            :class="{ 'border-green-600 bg-green-50': selfiePreview }"
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
              <img :src="selfiePreview" alt="Selfie" class="max-h-32 mx-auto mb-2" />
              <p class="text-xs text-gray-500">Cliquer pour changer</p>
            </div>
            <div v-else>
              <Upload class="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p class="text-sm text-gray-600">Cliquer ou glisser-déposer</p>
              <p class="text-xs text-gray-400 mt-1">JPG, PNG (max 5 Mo)</p>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="mb-4 p-3 border border-red-300 text-red-700 text-sm">
          {{ errorMessage }}
        </div>

        <!-- Submit -->
        <button
          @click="submitKyc"
          :disabled="!canSubmit || submitting"
          class="w-full bg-green-600 text-white py-2.5 text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{{ submitting ? 'Envoi...' : 'Soumettre' }}</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CheckCircle, XCircle, Clock, Upload } from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const { token } = useAuth()
const config = useRuntimeConfig()

const loading = ref(true)
const submitting = ref(false)
const kycStatus = ref('not_submitted')
const kycVerifiedAt = ref(null)
const latestVerification = ref(null)
const errorMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const idCardFront = ref(null)
const idCardBack = ref(null)
const selfieWithCard = ref(null)
const idCardFrontPreview = ref(null)
const idCardBackPreview = ref(null)
const selfiePreview = ref(null)

const canSubmit = computed(() => idCardFront.value && idCardBack.value && selfieWithCard.value)

const showToastNotification = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 4000)
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
  
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    showToastNotification('Format non supporté. JPG ou PNG uniquement.', 'error')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    showToastNotification('Fichier trop volumineux (max 5 Mo)', 'error')
    return
  }
  
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
  if (file) handleFileChange({ target: { files: [file] } }, type)
}

const loadKycStatus = async () => {
  try {
    loading.value = true
    const response = await $fetch(`${config.public.apiBaseURL}/kyc/status`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      kycStatus.value = response.data.kyc_status?.value || response.data.kyc_status || 'not_submitted'
      kycVerifiedAt.value = response.data.kyc_verified_at
      latestVerification.value = response.data.latest_verification
    }
  } catch (error) {
    console.error('Erreur:', error)
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
      headers: { Authorization: `Bearer ${token.value}` },
      body: formData
    })
    
    if (response.success) {
      showToastNotification('Documents soumis', 'success')
      kycStatus.value = 'pending'
      latestVerification.value = response.data
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Erreur lors de la soumission'
    showToastNotification(errorMessage.value, 'error')
  } finally {
    submitting.value = false
  }
}

onMounted(loadKycStatus)
</script>
