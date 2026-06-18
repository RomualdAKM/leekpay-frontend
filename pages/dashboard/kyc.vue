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
        <div class="mb-6 p-4 bg-amber-50 border border-amber-200">
          <p class="text-sm font-medium text-gray-700 mb-2">Photos à prendre EN DIRECT avec votre caméra :</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Recto de la carte d'identité</li>
            <li>• Verso de la carte d'identité</li>
            <li>• Selfie avec la carte en main</li>
          </ul>
          <p class="text-xs text-amber-700 mt-2">
            Pour limiter la fraude, l'import de fichiers n'est pas autorisé : vous devez
            <strong>capturer les photos en direct</strong> via la caméra (de préférence un téléphone).
          </p>
        </div>

        <!-- Capture caméra en direct, étape par étape (1 seule caméra active à la fois) -->
        <div class="space-y-3 mb-5">
          <div v-for="(doc, i) in docs" :key="doc.key" class="border border-gray-200 p-3">
            <!-- Photo déjà prise -->
            <div v-if="captured[doc.key]" class="flex items-center gap-3">
              <img :src="previews[doc.key]" :alt="doc.label" class="h-16 w-16 object-cover border border-gray-200" />
              <div class="flex-1">
                <p class="text-sm font-medium text-green-700">✓ {{ doc.label }}</p>
                <button type="button" @click="retake(doc.key)" class="text-xs text-gray-600 underline">Reprendre</button>
              </div>
            </div>

            <!-- Étape courante : caméra -->
            <CameraCapture
              v-else-if="i === currentStep"
              :label="doc.label"
              :facing-mode="doc.facing"
              :hint="doc.hint"
              @captured="onCaptured(doc.key, $event)"
            />

            <!-- Étape à venir -->
            <div v-else class="text-sm text-gray-400 py-1">{{ i + 1 }}. {{ doc.label }} — en attente</div>
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
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { CheckCircle, XCircle, Clock } from 'lucide-vue-next'

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

// Les 3 documents à capturer, dans l'ordre (assistant pas-à-pas).
const docs = [
  { key: 'id_card_front', label: 'Recto de la carte', facing: 'environment', hint: 'Cadrez le RECTO de votre pièce, bien lisible.' },
  { key: 'id_card_back', label: 'Verso de la carte', facing: 'environment', hint: 'Cadrez le VERSO de votre pièce, bien lisible.' },
  { key: 'selfie_with_card', label: 'Selfie avec la carte', facing: 'user', hint: 'Votre visage + la carte d\'identité tenue en main.' },
]

const captured = reactive({ id_card_front: null, id_card_back: null, selfie_with_card: null }) // File de chaque doc
const previews = reactive({ id_card_front: null, id_card_back: null, selfie_with_card: null }) // URL d'aperçu

// Étape courante = 1er document non encore capturé (-1 si tous pris).
const currentStep = computed(() => docs.findIndex((d) => !captured[d.key]))
const canSubmit = computed(() => docs.every((d) => captured[d.key]))

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

// Photo capturée en direct par le composant CameraCapture (aucun import de fichier).
const onCaptured = (key, file) => {
  if (previews[key]) URL.revokeObjectURL(previews[key])
  captured[key] = file
  previews[key] = URL.createObjectURL(file)
}

const retake = (key) => {
  if (previews[key]) URL.revokeObjectURL(previews[key])
  captured[key] = null
  previews[key] = null
}

onBeforeUnmount(() => {
  Object.values(previews).forEach((url) => { if (url) URL.revokeObjectURL(url) })
})

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
    formData.append('id_card_front', captured.id_card_front)
    formData.append('id_card_back', captured.id_card_back)
    formData.append('selfie_with_card', captured.selfie_with_card)
    
    const response = await $fetch(`${config.public.apiBaseURL}/kyc/submit`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: formData
    })
    
    if (response.success) {
      showToastNotification('Documents soumis', 'success')
      kycStatus.value = 'pending'
      latestVerification.value = response.data
      // Libérer les ressources tout de suite (le formulaire est désormais masqué).
      Object.keys(previews).forEach((k) => {
        if (previews[k]) URL.revokeObjectURL(previews[k])
        previews[k] = null
        captured[k] = null
      })
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
