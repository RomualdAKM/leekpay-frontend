<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 py-4 px-6 md:px-12">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold text-slate-900">
          LeekPay
        </div>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-slate-900 hover:text-green-400 transition">Produits</a>
          <a href="#" class="text-slate-900 hover:text-green-400 transition">Ressources</a>
          <a href="#" class="text-slate-900 hover:text-green-400 transition">Se connecter</a>
        </nav>
        <button class="bg-amber-500 text-white px-5 py-2 rounded-md font-medium hover:bg-amber-600 transition shadow-md">
          Démarrer
        </button>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-10 px-6 md:px-12">
      <div class="container mx-auto text-center">
        <p>© 2025 LeekPay. Tous droits réservés.</p>
        <form class="mt-6 max-w-md mx-auto">
          <label for="email" class="block mb-2 text-sm font-medium">Écrivez-nous</label>
          <div class="flex">
            <input
                type="email"
                id="email"
                placeholder="Votre email"
                class="flex-grow px-4 py-2 border border-green-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-slate-900"
            />
            <button
                type="submit"
                class="bg-green-400 text-white px-6 py-2 rounded-r-md hover:bg-green-500 transition font-medium"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>