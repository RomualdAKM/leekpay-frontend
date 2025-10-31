<script setup lang="ts">

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
              class="h-20 md:h-25 w-auto"
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

          <!-- Bouton "Se connecter" avec icône -->
          <NuxtLink to="/login" href="#" class="text-slate-900 hover:text-green-500 font-medium flex items-center gap-1 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Se connecter
          </NuxtLink>
        </nav>

        <!-- Menu mobile (hamburger) -->
        <div class="md:hidden flex items-center">
          <button class="text-slate-900 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-12 px-6 md:px-12">
      <div class="container mx-auto">
        <!-- Conteneur flexible pour grand écran -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
          <!-- Copyright (gauche sur desktop) -->
          <div class="text-sm text-gray-400">
            © 2025 LeekPay. Tous droits réservés.
          </div>

          <!-- Réseaux sociaux (centrés sur desktop) -->
          <div class="flex justify-center space-x-6">
            <!-- WhatsApp -->
            <a
                href="https://wa.me/229XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white hover:text-green-400 transition"
                aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 7.021 2.898l.015.015c1.904 1.898 2.94 4.375 2.94 7.014a9.89 9.89 0 01-9.884 9.884m8.413-18.297A11.87 11.87 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.047 24l6.305-1.654a11.88 11.88 0 005.693 1.448h.001c6.554 0 11.89-5.335 11.893-11.893A11.87 11.87 0 0012.05 0" />
              </svg>
            </a>

            <!-- Facebook -->
            <a
                href="https://www.facebook.com/profile.php?id=61579425551657"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white hover:text-blue-500 transition"
                aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <!-- Instagram -->
            <a
                href="https://instagram.com/leekpay"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white hover:text-pink-500 transition"
                aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Formulaire de contact (centré) -->
        <div class="mt-8 text-center">
          <form class="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
                type="email"
                id="email"
                placeholder="Votre email"
                class="flex-grow px-4 py-3 border border-green-400 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-slate-900"
            />
            <button
                type="submit"
                class="bg-green-400 text-white px-6 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-green-500 transition font-medium"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>