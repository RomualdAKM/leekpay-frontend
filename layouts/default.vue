<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 py-3 px-6 md:px-12">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <img
              src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png"
              alt="LeekPay Logo"
              class="h-20 w-auto"
          />
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center space-x-6">
          <div class="relative group">
            <button class="text-slate-900 hover:text-green-500 font-medium flex items-center gap-1 transition">
              Produits
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
              <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-green-50">Tarifs</a>
              <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-green-50">Intégrations</a>
            </div>
          </div>

          <a href="#" class="text-slate-900 hover:text-green-500 font-medium transition">Tarifs</a>
          <a href="#" class="text-slate-900 hover:text-green-500 font-medium transition">Contacts</a>

          <div class="relative group">
            <button class="text-slate-900 hover:text-green-500 font-medium flex items-center gap-1 transition">
              Ressources
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
              <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-green-50">Documentation</a>
              <a href="#" class="block px-4 py-2 text-sm text-slate-700 hover:bg-green-50">Blog</a>
            </div>
          </div>

          <NuxtLink to="/register" class="bg-amber-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-amber-600 transition shadow-md">
            Démarrer
          </NuxtLink>

          <NuxtLink to="/login" class="text-slate-900 hover:text-green-500 font-medium flex items-center gap-1 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Se connecter
          </NuxtLink>
        </nav>

        <!-- Bouton menu mobile -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" class="text-slate-900 p-2">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200 mt-2 p-4 space-y-3">
          <a href="#" class="block text-slate-900 hover:text-green-500 font-medium transition">Produits</a>
          <a href="#" class="block text-slate-900 hover:text-green-500 font-medium transition">Tarifs</a>
          <a href="#" class="block text-slate-900 hover:text-green-500 font-medium transition">Contacts</a>
          <a href="#" class="block text-slate-900 hover:text-green-500 font-medium transition">Ressources</a>

          <NuxtLink to="/register" class="block bg-amber-500 text-white text-center px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition shadow-md">
            Démarrer
          </NuxtLink>

          <NuxtLink to="/login" class="block text-center text-slate-900 hover:text-green-500 font-medium transition">
            Se connecter
          </NuxtLink>
        </div>
      </transition>
    </header>

    <!-- Contenu principal -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <!-- (le tien reste inchangé, je ne le recopie pas ici pour raccourcir) -->
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
