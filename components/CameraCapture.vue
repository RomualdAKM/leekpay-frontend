<template>
  <div class="border border-gray-200 p-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }} <span class="text-red-500">*</span></label>

    <!-- Erreur caméra (BLOQUANT : aucun upload de secours) -->
    <div v-if="camError" class="p-4 bg-red-50 border border-red-200 text-sm text-red-700 space-y-2">
      <p>{{ camError }}</p>
      <button type="button" @click="start" class="underline font-medium">Réessayer</button>
    </div>

    <!-- Photo capturée -->
    <div v-else-if="isCaptured" class="text-center">
      <img :src="capturedUrl" :alt="label" class="max-h-56 mx-auto mb-3 border border-gray-200" />
      <button type="button" @click="retake" class="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50">
        Reprendre la photo
      </button>
    </div>

    <!-- Caméra en direct -->
    <div v-else-if="isLive" class="text-center">
      <div class="relative bg-black mx-auto overflow-hidden rounded" style="max-width: 360px;">
        <video ref="videoEl" autoplay playsinline muted class="w-full block"
          @loadedmetadata="isReady = true" @canplay="isReady = true"></video>
      </div>
      <p v-if="hint" class="text-xs text-gray-500 mt-2">{{ hint }}</p>
      <button type="button" @click="capture" :disabled="isStarting || !isReady || isCapturing"
        class="mt-3 px-6 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50">
        {{ !isReady ? 'Initialisation de la caméra…' : '📷 Capturer' }}
      </button>
    </div>

    <!-- Inactif : inviter à activer la caméra -->
    <div v-else class="text-center border border-dashed border-gray-300 p-6">
      <p class="text-sm text-gray-600 mb-1">Prise de photo en direct (pas d'import de fichier).</p>
      <p v-if="hint" class="text-xs text-gray-400 mb-3">{{ hint }}</p>
      <button type="button" @click="start" :disabled="isStarting"
        class="px-5 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-black disabled:opacity-50">
        {{ isStarting ? 'Activation…' : 'Activer la caméra' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  facingMode: { type: String, default: 'environment' }, // 'environment' (arrière) | 'user' (avant)
  hint: { type: String, default: '' },
})
const emit = defineEmits(['captured', 'cleared'])

const videoEl = ref(null)
const mediaStream = ref(null)
const capturedUrl = ref(null)
const isLive = ref(false)
const isCaptured = ref(false)
const isStarting = ref(false)
const isReady = ref(false)      // true quand une frame vidéo est décodée (drawImage exploitable)
const isCapturing = ref(false)  // garde anti double-clic sur Capturer
const camError = ref('')

const stopStream = () => {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((t) => t.stop())
    mediaStream.value = null
  }
}

const revokeUrl = () => {
  if (capturedUrl.value) {
    URL.revokeObjectURL(capturedUrl.value)
    capturedUrl.value = null
  }
}

const start = async () => {
  camError.value = ''
  isCaptured.value = false
  isReady.value = false
  revokeUrl()
  emit('cleared')

  if (!process.client || !navigator.mediaDevices?.getUserMedia) {
    camError.value = "Votre navigateur ne permet pas d'accéder à la caméra. Veuillez utiliser un téléphone avec caméra."
    return
  }

  isStarting.value = true
  try {
    stopStream()
    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: props.facingMode } },
      audio: false,
    })
    isLive.value = true
    await nextTick()
    if (videoEl.value) {
      videoEl.value.srcObject = mediaStream.value
      await videoEl.value.play().catch(() => {})
    }
  } catch (e) {
    isLive.value = false
    stopStream()
    if (e?.name === 'NotAllowedError' || e?.name === 'SecurityError') {
      camError.value = "Accès à la caméra refusé. Autorisez la caméra dans votre navigateur, puis réessayez."
    } else if (e?.name === 'NotFoundError' || e?.name === 'OverconstrainedError' || e?.name === 'DevicesNotFoundError') {
      camError.value = "Aucune caméra détectée sur cet appareil. Veuillez utiliser un téléphone avec caméra."
    } else {
      camError.value = "Impossible d'activer la caméra. Réessayez, ou utilisez un téléphone avec caméra."
    }
  } finally {
    isStarting.value = false
  }
}

const capture = () => {
  if (isCapturing.value) return // anti double-clic
  const video = videoEl.value
  if (!video || !video.videoWidth) return
  isCapturing.value = true

  const maxSide = 1600
  const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(video.videoWidth * scale)
  canvas.height = Math.round(video.videoHeight * scale)
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

  canvas.toBlob((blob) => {
    if (!blob) {
      camError.value = "Échec de la capture. Réessayez."
      isCapturing.value = false
      return
    }
    revokeUrl()
    capturedUrl.value = URL.createObjectURL(blob)
    const file = new File([blob], `kyc-${Date.now()}.jpg`, { type: 'image/jpeg' })
    isCaptured.value = true
    isLive.value = false
    stopStream()
    emit('captured', file)
    isCapturing.value = false
  }, 'image/jpeg', 0.85)
}

const retake = () => {
  start()
}

onBeforeUnmount(() => {
  stopStream()
  revokeUrl()
})
</script>
