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
              Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
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
            </div>

            <!-- Bouton Réinitialiser -->
            <button
                type="submit"
                class="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition shadow-md"
            >
              Réinitialiser le mot de passe
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

const handleSubmit = () => {
  // Ici, vous enverrez l'email à votre backend (Laravel)
  console.log('Email:', email.value)
  // Ex: await $fetch('/api/forgot-password', { method: 'POST', body: { email: email.value } })
  alert('Un lien de réinitialisation a été envoyé à votre adresse e-mail.')
}
</script>