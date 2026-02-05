<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans shadow-md">
    <header class="bg-white py-2 px-6 md:px-12 shadow-md z-10">
      <div class="container mx-auto flex justify-between items-center ">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png"
            alt="LeekPay"
            class="h-24 w-auto"
          />
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-10">
          <NuxtLink to="/#fonctionnalites" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">Fonctionnalités</NuxtLink>
          <NuxtLink to="/#tarifs" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">Tarifs</NuxtLink>
          <NuxtLink to="/a-propos" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">À Propos</NuxtLink>
          <NuxtLink to="/#contact" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">Contact</NuxtLink>

          <NuxtLink to="/register" class="bg-[#2ECC71] text-white px-5 py-2 rounded-md font-medium hover:bg-[#27AE60] transition">
            Démarrer
          </NuxtLink>

          <NuxtLink to="/login" class="text-gray-900 hover:text-[#2ECC71] font-medium flex items-center gap-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Se connecter
          </NuxtLink>
        </nav>

        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-gray-900 p-2">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 mt-4 py-4 space-y-4">
          <NuxtLink to="/#fonctionnalites" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">Fonctionnalités</NuxtLink>
          <NuxtLink to="/#tarifs" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">Tarifs</NuxtLink>
          <NuxtLink to="/a-propos" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">À Propos</NuxtLink>
          <NuxtLink to="/#contact" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">Contact</NuxtLink>

          <NuxtLink to="/register" class="block bg-[#2ECC71] text-white text-center px-6 py-2.5 rounded-md font-medium hover:bg-[#27AE60] transition">
            Démarrer
          </NuxtLink>

          <NuxtLink to="/login" class="block text-center text-gray-900 hover:text-[#2ECC71] font-medium transition">
            Se connecter
          </NuxtLink>
        </div>
      </transition>
    </header>

    <main class="flex-grow">
      <slot />
    </main>
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
