<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center px-6 md:px-12 py-12">
      <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
        <!-- Formulaire de création de compte -->
        <div class="w-full md:w-1/2">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 mb-6">Créer un compte</h1>
          </div>

          <form class="space-y-6">
            <!-- Nom & Prénoms -->
            <div>
              <label for="nom" class="block text-sm font-medium text-slate-700 mb-1">Nom et Prénoms</label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                    type="text"
                    id="nom"
                    placeholder="Nom et Prénoms"
                    class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Adresse e-mail</label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                    type="email"
                    id="email"
                    placeholder="Adresse e-mail"
                    class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                />
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
                    type="password"
                    id="password"
                    placeholder="Mot de passe"
                    class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                />
              </div>
            </div>

            <!-- Confirmation du mot de passe -->
            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-slate-700 mb-1">Confirmer le mot de passe</label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="Confirmer le mot de passe"
                    class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                />
              </div>
            </div>

            <!-- Bouton Continuer -->
            <button
                type="submit"
                class="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition shadow-md"
            >
              Continuer
            </button>

            <!-- Lien Se connecter -->
            <p class="text-center text-sm text-slate-600 mt-4">
              Déjà un compte ?
              <a href="/login" class="text-green-500 hover:underline font-medium">Se connecter</a>
            </p>
          </form>
        </div>

        <!-- Image à droite (masquée sur mobile) -->
        <div class="hidden md:block w-full md:w-1/2 relative">
          <div class="absolute inset-0 bg-gray-50 rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <img
                src="~/assets/img/register_img.jpg"
                alt="Illustration"
                class="w-full h-auto rounded-xl shadow-lg"
            />
            <div class="mt-6 space-y-4">
              <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                <img src="~/assets/img/formations.png" alt="Mooy Africa" class="h-8 w-auto" />
                <div>
                  <p class="text-red-500 font-medium">Argent envoyé</p>
                  <p class="text-sm text-gray-700">10 000 FCFA</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                <img src="~/assets/img/Logo_de_LeekPay_avec_arrière-plan.png" alt="LeekPay" class="h-8 w-auto" />
                <div>
                  <p class="text-green-500 font-medium">Argent reçu</p>
                  <p class="text-sm text-gray-700">25 000 FCFA</p>
                </div>
              </div>
            </div>
            <!-- Accroches captivantes -->
            <div class="mt-8 space-y-3 text-center">
              <p class="text-lg font-bold text-green-600">✓ Encaissez en 1 clic</p>
              <p class="text-lg font-bold text-green-600">✓ Zéro frais cachés</p>
              <p class="text-lg font-bold text-green-600">✓ Sécurisé & instantané</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
</script>