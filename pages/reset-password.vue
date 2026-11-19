<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <main class="flex-grow flex items-center justify-center px-6 md:px-12 py-12">
      <div class="container mx-auto max-w-md w-full">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 mb-4">Nouveau mot de passe</h1>
          <p class="text-gray-700">
            Choisissez un nouveau mot de passe pour <strong>{{ email || 'votre compte' }}</strong>.
          </p>
        </div>

        <!-- Lien incomplet -->
        <div v-if="!token || !email" class="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Lien de réinitialisation incomplet.
          <NuxtLink to="/forgot-password" class="underline font-medium">Refaire une demande</NuxtLink>
        </div>

        <!-- Succès -->
        <div v-else-if="successMessage" class="space-y-4">
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {{ successMessage }}
          </div>
          <NuxtLink
            to="/login"
            class="block w-full text-center bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Se connecter
          </NuxtLink>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Nouveau mot de passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              minlength="8"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              :class="{ 'border-red-300': apiErrors.password }"
            />
            <p v-if="apiErrors.password" class="text-red-600 text-sm mt-1">{{ apiErrors.password[0] }}</p>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-slate-700 mb-1">Confirmer le mot de passe</label>
            <input
              id="password_confirmation"
              v-model="passwordConfirmation"
              type="password"
              autocomplete="new-password"
              minlength="8"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

          <div v-if="apiErrors.global" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
            {{ apiErrors.global[0] }}
            <NuxtLink to="/forgot-password" class="block underline font-medium mt-1">Refaire une demande</NuxtLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition shadow-md disabled:opacity-70"
          >
            {{ loading ? 'Enregistrement...' : 'Enregistrer le nouveau mot de passe' }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const config = useRuntimeConfig()

const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''))
const email = computed(() => (typeof route.query.email === 'string' ? route.query.email : ''))

const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)
const apiErrors = ref({})
const successMessage = ref('')

const handleSubmit = async () => {
  apiErrors.value = {}
  if (password.value !== passwordConfirmation.value) {
    apiErrors.value = { password: ['La confirmation du mot de passe ne correspond pas.'] }
    return
  }

  loading.value = true
  try {
    const response = await $fetch('/reset-password', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      body: {
        email: email.value,
        token: token.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    })
    successMessage.value = response.message || 'Mot de passe réinitialisé.'
    password.value = ''
    passwordConfirmation.value = ''
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Lien invalide ou expiré.'] }
    }
  } finally {
    loading.value = false
  }
}
</script>
