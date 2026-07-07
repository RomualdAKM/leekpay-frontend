<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <!-- En-tête : retour vers le site -->
    <header class="flex items-center justify-between px-6 lg:px-12 py-3">
      <NuxtLink to="/" aria-label="Retour à l'accueil LeekPay">
        <img
          src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.webp"
          alt="LeekPay"
          class="h-12 w-auto"
        />
      </NuxtLink>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#27AE60] transition"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Retour à l'accueil
      </NuxtLink>
    </header>

    <!-- Contenu principal -->
    <main class="flex-grow flex items-start justify-center px-4 pt-6 md:pt-10 pb-10">
      <slot />
    </main>
  </div>
</template>
