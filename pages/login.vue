<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6 py-8">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Bienvenue !</h1>
        <p class="text-gray-600">Connectez-vous pour accéder à votre espace LeekPay.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Adresse e-mail</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
                v-model="email"
                type="email"
                id="email"
                placeholder="Adresse e-mail"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
            />
          </div>
          <div v-if="apiErrors.email" class="text-red-600 text-xs mt-1">
            {{ apiErrors.email[0] }}
          </div>
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Mot de passe"
                class="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
          <div v-if="apiErrors.password" class="text-red-600 text-xs mt-1">
            {{ apiErrors.password[0] }}
          </div>
        </div>

        <!-- Lien "Mot de passe oublié ?" -->
        <div class="flex justify-end">
          <NuxtLink to="/forgot-password" class="text-green-500 hover:underline text-sm font-medium">
            Mot de passe oublié ?
          </NuxtLink>
        </div>

        <!-- Message d'erreur global -->
        <div v-if="apiErrors.global" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
          {{ apiErrors.global[0] }}
        </div>

        <!-- Bouton "Se connecter" -->
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-3 px-6 rounded-sm font-medium hover:bg-green-700 transition shadow-sm disabled:opacity-70"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <!-- Lien "Pas encore de compte ?" -->
        <p class="text-center text-sm text-slate-600 mt-4">
          Pas encore de compte ?
          <NuxtLink to="/register" class="text-green-500 hover:underline font-medium">Créer un compte</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const apiErrors = ref({})

const router = useRouter()
const config = useRuntimeConfig()
const { setAuth } = useAuth()

const handleSubmit = async () => {
  loading.value = true
  apiErrors.value = {}

  try {
    const response = await $fetch('/login', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: {
        email: email.value,
        password: password.value
      }
    })

    // ✅ Sauvegarde en cookie (token + user)
    setAuth(response.token, response.user)

    // Redirection
    await router.push('/dashboard')
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Email ou mot de passe incorrect.'] }
    }
  } finally {
    loading.value = false
  }
}
</script>