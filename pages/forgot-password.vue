<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center px-6 md:px-12 py-12">
      <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
        <!-- Formulaire de réinitialisation -->
        <div class="w-full">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 mb-6">Mot de passe oublié ?</h1>
            <p class="text-gray-700 mb-6">
              Entrez votre adresse e-mail ci-dessous et nous vous enverrons un mot de passe temporaire.
            </p>
          </div>

          <!-- Message de succès -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-green-700 text-sm">{{ successMessage }}</p>
            </div>
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
                    :class="{ 'border-red-300': apiErrors.email }"
                    required
                />
              </div>
              <!-- Erreur de validation pour l'email -->
              <div v-if="apiErrors.email" class="text-red-600 text-sm mt-1">
                {{ apiErrors.email[0] }}
              </div>
            </div>

            <!-- Erreur globale -->
            <div v-if="apiErrors.global" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
              {{ apiErrors.global[0] }}
            </div>

            <!-- Bouton Réinitialiser -->
            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition shadow-md disabled:opacity-70"
            >
              {{ loading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe' }}
            </button>

            <!-- Lien Se connecter -->
            <p class="text-center text-sm text-slate-600 mt-4">
              Se souvenir du mot de passe ?
              <NuxtLink to="/login" class="text-green-500 hover:underline font-medium">Se connecter</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const loading = ref(false)
const apiErrors = ref({})
const successMessage = ref('')

const config = useRuntimeConfig()

const handleSubmit = async () => {
  loading.value = true
  apiErrors.value = {}
  successMessage.value = ''

  try {
    const response = await $fetch('/forgot-password', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: {
        email: email.value
      }
    })

    successMessage.value = response.message
    email.value = '' // Réinitialiser le champ email
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Une erreur est survenue lors de l\'envoi de l\'email.'] }
    }
  } finally {
    loading.value = false
  }
}
</script>