<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const featuresDropdownOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleFeaturesDropdown = () => {
  featuresDropdownOpen.value = !featuresDropdownOpen.value
}

const closeFeaturesDropdown = () => {
  featuresDropdownOpen.value = false
}

// Bandeau d'annonce crypto (refermable, mémorisé)
const showCryptoBanner = ref(false)
onMounted(() => {
  if (!localStorage.getItem('leekpay_crypto_banner_off')) {
    showCryptoBanner.value = true
  }
})
const dismissCryptoBanner = () => {
  showCryptoBanner.value = false
  localStorage.setItem('leekpay_crypto_banner_off', '1')
}
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans shadow-md">
    <!-- Bandeau nouveauté : paiements crypto -->
    <div v-if="showCryptoBanner" class="relative bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white text-center text-sm md:text-[15px] px-10 py-2.5">
      <NuxtLink to="/tarifs#crypto" class="font-medium hover:opacity-90">
        <span class="font-bold">Nouveau :</span> grâce à la crypto-monnaie, encaissez désormais partout dans le monde
        <span class="underline underline-offset-2 font-semibold ml-1 whitespace-nowrap">En savoir plus</span>
      </NuxtLink>
      <button @click="dismissCryptoBanner" class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition cursor-pointer" aria-label="Fermer l'annonce">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    <header class="bg-white/95 backdrop-blur py-2 px-6 lg:px-12 border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div class="mx-auto max-w-7xl flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.webp"
            alt="LeekPay"
            class="h-[72px] md:h-[88px] w-auto"
          />
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-6">
          <!-- Dropdown Fonctionnalités -->
          <div class="relative" @mouseleave="closeFeaturesDropdown">
            <button 
              @click="toggleFeaturesDropdown"
              @mouseenter="featuresDropdownOpen = true"
              class="text-gray-900 hover:text-[#2ECC71] font-medium transition flex items-center gap-1"
            >
              Fonctionnalités
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-3.5 w-3.5 opacity-60"
                :class="{ 'rotate-180': featuresDropdownOpen }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <transition name="dropdown">
              <div 
                v-if="featuresDropdownOpen"
                class="absolute top-full left-0 pt-2 z-50"
              >
                <div class="w-80 bg-white rounded-xl shadow-xl ring-1 ring-gray-900/5 p-2">
                  <NuxtLink
                    to="/payment-links"
                    @click="closeFeaturesDropdown"
                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <span class="mt-0.5 w-9 h-9 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center flex-shrink-0">
                      <svg class="h-4.5 w-4.5 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                      </svg>
                    </span>
                    <span>
                      <span class="block text-[15px] font-medium text-gray-900 group-hover:text-[#27AE60] transition">Liens de paiement</span>
                      <span class="block text-[13px] text-gray-500">Encaissez via un simple lien à partager</span>
                    </span>
                  </NuxtLink>
                  <NuxtLink
                    to="/sales-pages"
                    @click="closeFeaturesDropdown"
                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <span class="mt-0.5 w-9 h-9 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center flex-shrink-0">
                      <svg class="h-4.5 w-4.5 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </span>
                    <span>
                      <span class="block text-[15px] font-medium text-gray-900 group-hover:text-[#27AE60] transition">Pages de vente</span>
                      <span class="block text-[13px] text-gray-500">Vendez en ligne sans site web</span>
                    </span>
                  </NuxtLink>
                  <NuxtLink
                    to="/invoices"
                    @click="closeFeaturesDropdown"
                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <span class="mt-0.5 w-9 h-9 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center flex-shrink-0">
                      <svg class="h-4.5 w-4.5 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </span>
                    <span>
                      <span class="block text-[15px] font-medium text-gray-900 group-hover:text-[#27AE60] transition">Factures numériques</span>
                      <span class="block text-[13px] text-gray-500">Factures payables en ligne</span>
                    </span>
                  </NuxtLink>
                  <NuxtLink
                    to="/api"
                    @click="closeFeaturesDropdown"
                    class="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <span class="mt-0.5 w-9 h-9 rounded-lg bg-[#2ECC71]/10 flex items-center justify-center flex-shrink-0">
                      <svg class="h-4.5 w-4.5 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    </span>
                    <span>
                      <span class="block text-[15px] font-medium text-gray-900 group-hover:text-[#27AE60] transition">API LeekPay</span>
                      <span class="block text-[13px] text-gray-500">Intégrez le paiement à vos applications</span>
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>
          
          <NuxtLink to="/tarifs" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">Tarifs</NuxtLink>
          <NuxtLink to="/a-propos" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">À Propos</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-900 hover:text-[#2ECC71] font-medium transition">Contact</NuxtLink>

          <NuxtLink to="/register" class="bg-[#2ECC71] text-white px-4 py-1.5 text-[15px] rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-sm shadow-[#2ECC71]/25">
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
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 mt-3 py-4 space-y-4">
          <!-- Dropdown Fonctionnalités Mobile -->
          <div>
            <button
              @click="toggleFeaturesDropdown"
              class="w-full flex items-center justify-between text-gray-900 hover:text-[#2ECC71] font-medium transition"
            >
              <span>Fonctionnalités</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-3.5 w-3.5 opacity-60"
                :class="{ 'rotate-180': featuresDropdownOpen }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <transition name="dropdown">
              <div v-if="featuresDropdownOpen" class="mt-2 pl-4 space-y-2 border-l-2 border-[#2ECC71]/30 ml-1">
                <NuxtLink 
                  to="/payment-links" 
                  @click="toggleMobileMenu"
                  class="block text-gray-600 hover:text-[#2ECC71] transition py-1"
                >
                  Liens de paiement
                </NuxtLink>
                <NuxtLink 
                  to="/sales-pages" 
                  @click="toggleMobileMenu"
                  class="block text-gray-600 hover:text-[#2ECC71] transition py-1"
                >
                  Pages de vente
                </NuxtLink>
                <NuxtLink 
                  to="/invoices" 
                  @click="toggleMobileMenu"
                  class="block text-gray-600 hover:text-[#2ECC71] transition py-1"
                >
                  Factures
                </NuxtLink>
                <NuxtLink 
                  to="/api" 
                  @click="toggleMobileMenu"
                  class="block text-gray-600 hover:text-[#2ECC71] transition py-1"
                >
                  API
                </NuxtLink>
              </div>
            </transition>
          </div>
          
          <NuxtLink to="/tarifs" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">Tarifs</NuxtLink>
          <NuxtLink to="/a-propos" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">À Propos</NuxtLink>
          <NuxtLink to="/contact" @click="toggleMobileMenu" class="block text-gray-900 hover:text-[#2ECC71] font-medium transition">Contact</NuxtLink>

          <NuxtLink to="/register" @click="toggleMobileMenu" class="block bg-[#2ECC71] text-white text-center px-6 py-2.5 rounded-lg font-semibold hover:bg-[#27AE60] transition">
            Démarrer
          </NuxtLink>

          <NuxtLink to="/login" @click="toggleMobileMenu" class="block text-center text-gray-900 hover:text-[#2ECC71] font-medium transition">
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
