<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6 py-8">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Vérifiez votre email</h1>
        <p class="text-gray-600">
          Nous avons envoyé un code de vérification à<br />
          <span class="font-semibold text-slate-900">{{ email }}</span>
        </p>
      </div>

      <form @submit.prevent="handleVerify" class="space-y-6">
        <!-- Code Input -->
        <div>
          <label for="code" class="block text-sm font-medium text-slate-700 mb-1">
            Code de vérification (6 chiffres)
          </label>
          <input
            v-model="code"
            type="text"
            id="code"
            placeholder="000000"
            maxlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-center text-2xl font-mono tracking-widest"
            required
            autofocus
            @input="handleCodeInput"
          />
          <div v-if="apiErrors.code" class="text-red-600 text-xs mt-1">
            {{ apiErrors.code[0] }}
          </div>
        </div>

        <!-- Message d'erreur global -->
        <div v-if="apiErrors.global" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
          {{ apiErrors.global[0] }}
        </div>

        <!-- Bouton Vérifier -->
        <button
          type="submit"
          :disabled="loading || code.length !== 6"
          class="w-full bg-green-600 text-white py-3 px-6 rounded-sm font-medium hover:bg-green-700 transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Vérification...' : 'Vérifier' }}
        </button>

        <!-- Resend Code -->
        <div class="text-center">
          <p class="text-sm text-slate-600 mb-2">Vous n'avez pas reçu le code ?</p>
          <button
            type="button"
            @click="handleResend"
            :disabled="resendLoading || resendTimer > 0"
            class="text-green-600 hover:text-green-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="resendTimer > 0">Renvoyer dans {{ resendTimer }}s</span>
            <span v-else>{{ resendLoading ? 'Envoi...' : 'Renvoyer le code' }}</span>
          </button>
        </div>

        <!-- Success Message -->
        <transition name="fade">
          <div v-if="successMessage" class="fixed top-4 right-4 z-50">
            <div class="border border-green-300 bg-white rounded-md p-3 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm">
                <p class="text-slate-900 font-semibold">{{ successMessage }}</p>
                <p class="text-slate-700">Redirection vers votre tableau de bord...</p>
              </div>
            </div>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { setAuth } = useAuth()

const email = ref(route.query.email as string || '')
const code = ref('')
const loading = ref(false)
const resendLoading = ref(false)
const resendTimer = ref(0)
const apiErrors = ref<Record<string, string[]>>({})
const successMessage = ref('')

// Redirect if no email provided
onMounted(() => {
  if (!email.value) {
    router.push('/register')
  }
  startResendTimer()
})

// Auto-submit when 6 digits are entered
const handleCodeInput = () => {
  // Remove non-numeric characters
  code.value = code.value.replace(/\D/g, '')
  
  // Auto-submit when 6 digits
  if (code.value.length === 6) {
    handleVerify()
  }
}

const handleVerify = async () => {
  if (code.value.length !== 6) return
  
  loading.value = true
  apiErrors.value = {}
  successMessage.value = ''

  try {
    const response: any = await $fetch('/verify-email', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: {
        email: email.value,
        code: code.value
      }
    })

    // Save auth
    setAuth(response.token, response.user)

    successMessage.value = response.message
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (err: any) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Code invalide ou expiré.'] }
    }
    code.value = '' // Clear code on error
  } finally {
    loading.value = false
  }
}

const handleResend = async () => {
  resendLoading.value = true
  apiErrors.value = {}

  try {
    const response: any = await $fetch('/resend-verification', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: {
        email: email.value
      }
    })

    successMessage.value = response.message
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
    // Start timer
    startResendTimer()
  } catch (err: any) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Erreur lors du renvoi du code.'] }
    }
  } finally {
    resendLoading.value = false
  }
}

const startResendTimer = () => {
  resendTimer.value = 60
  const interval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
