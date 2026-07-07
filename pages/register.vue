<template>
  <div class="w-full max-w-md">
    <div class="mb-8 text-center">
      <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Créer un compte</h1>
      <p class="text-gray-600">Rejoignez <span class="text-[#2ECC71] font-semibold italic">LeekPay</span> et encaissez vos premiers paiements dès aujourd'hui.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Nom & Prénoms -->
      <div>
        <label for="nom" class="block text-sm font-medium text-slate-700 mb-1.5">Nom et Prénoms</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
              v-model="form.name"
              type="text"
              id="nom"
              placeholder="Nom et Prénoms"
              class="pl-11 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition"
              required
          />
        </div>
        <div v-if="apiErrors.name" class="text-red-600 text-xs mt-1.5">
          {{ apiErrors.name[0] }}
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">Adresse e-mail</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="Adresse e-mail"
              class="pl-11 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition"
              required
          />
        </div>
        <div v-if="apiErrors.email" class="text-red-600 text-xs mt-1.5">
          {{ apiErrors.email[0] }}
        </div>
      </div>

      <!-- Mot de passe -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Mot de passe"
              class="pl-11 pr-11 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition"
              required
          />
          <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <div v-if="apiErrors.password" class="text-red-600 text-xs mt-1.5">
          {{ apiErrors.password[0] }}
        </div>
      </div>

      <!-- Confirmation du mot de passe -->
      <div>
        <label for="passwordConfirm" class="block text-sm font-medium text-slate-700 mb-1.5">Confirmer le mot de passe</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
              v-model="form.password_confirmation"
              :type="showPasswordConfirm ? 'text' : 'password'"
              id="passwordConfirm"
              placeholder="Confirmer le mot de passe"
              class="pl-11 pr-11 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition"
              required
          />
          <button
              type="button"
              @click="showPasswordConfirm = !showPasswordConfirm"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              :aria-label="showPasswordConfirm ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
          >
            <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <div v-if="apiErrors.password_confirmation" class="text-red-600 text-xs mt-1.5">
          {{ apiErrors.password_confirmation[0] }}
        </div>
      </div>

      <!-- Sélection Devise -->
      <div>
        <label for="currency" class="block text-sm font-medium text-slate-700 mb-1.5">Devise</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <select
              id="currency"
              v-model="form.currency_id"
              class="pl-11 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition cursor-pointer"
              :class="form.currency_id === '' ? 'text-slate-400' : 'text-slate-900'"
              required
          >
            <option disabled value="">-- Sélectionnez une devise --</option>
            <option
                v-for="currency in currencies"
                :key="currency.id"
                :value="currency.id"
            >
              {{ currency.symbol }} - {{ currency.name }} ({{ currency.code }})
            </option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div v-if="apiErrors.currency_id" class="text-red-600 text-xs mt-1.5">
          {{ apiErrors.currency_id[0] }}
        </div>
      </div>

      <!-- Erreur globale -->
      <div v-if="apiErrors.global" class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
        {{ apiErrors.global[0] }}
      </div>

      <!-- Bouton Continuer -->
      <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#2ECC71] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {{ loading ? 'Création...' : 'Créer mon compte' }}
      </button>

      <p class="text-center text-xs text-gray-400">
        En créant un compte, vous acceptez les conditions d'utilisation de LeekPay.
      </p>

      <transition name="fade">
        <div v-if="successMessage" class="fixed top-4 right-4 z-50">
          <div class="border border-green-200 bg-white rounded-xl shadow-lg p-4 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm">
              <p class="text-slate-900 font-semibold">{{ successMessage }}</p>
              <p class="text-slate-600">Redirection en cours...</p>
            </div>
            <button type="button" @click="successMessage = ''" class="ml-2 text-slate-400 hover:text-slate-600 cursor-pointer" aria-label="Fermer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </transition>

      <!-- Lien Se connecter -->
      <p class="text-center text-sm text-slate-600">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-[#27AE60] hover:underline font-medium">Se connecter</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { useCurrencies } from '~/composables/useCurrencies'
const { trackCompleteRegistration, trackLead } = useFacebookPixel()

const { currencies, currenciesLoading } = useCurrencies()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  country_code: '',
  currency_id: '' // obligatoire pour le select
})

const loading = ref(false)
const apiErrors = ref({})
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const router = useRouter()
const config = useRuntimeConfig()
const successMessage = ref('')
const { setAuth } = useAuth()

onMounted(async () => {
  try {
    // Appel à une API gratuite (ipapi, ipwhois, ipinfo, etc.)
    const res = await $fetch('https://ipapi.co/json/')
    form.country_code = res.country_code
  } catch (err) {
    console.warn('Impossible de récupérer le country_code', err)
  }
})

const handleSubmit = async () => {
  loading.value = true
  apiErrors.value = {}
  successMessage.value = ''

  try {
    const response = await $fetch('/register', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: form
    })

    // Track successful registration with Facebook Pixel
    trackCompleteRegistration({
      content_name: 'LeekPay User Registration',
      status: 'completed',
      currency: form.currency_id
    })

    // Check if verification is required
    if (response.requires_verification) {
      successMessage.value = response.message
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(response.email)}`)
      }, 2000)
    } else {
      // Fallback for old behavior (should not happen with new flow)
      setAuth(response.token, response.user)
      successMessage.value = response.message
      setTimeout(() => {
        router.push('/dashboard')
      }, 2500)
    }
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Une erreur est survenue.'] }
    }
  } finally {
    loading.value = false
  }
}
</script>
