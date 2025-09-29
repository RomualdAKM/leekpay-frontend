<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6 py-12">
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
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
                type="password"
                id="password"
                placeholder="Mot de passe"
                class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
            />
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
            class="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition shadow-md disabled:opacity-70"
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