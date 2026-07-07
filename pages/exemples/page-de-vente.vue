<template>
  <div class="font-sans bg-white">
    <!-- PAGE DE VENTE EXEMPLE -->
    <section class="py-10 md:py-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[900px]">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Exemple de <span class="text-[#2ECC71] italic">page de vente</span>
          </h1>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Voici une page de vente créée avec l'éditeur LeekPay : votre marque, vos produits,
            vos prix et le paiement intégré, sans site web ni développeur.
          </p>
        </div>

        <div class="border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/page-vente-exemple.png"
            alt="Exemple de page de vente créée avec LeekPay : boutique de maroquinerie"
            class="w-full h-auto"
          />
        </div>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/dashboard/sales-pages/create"
            class="inline-block bg-[#2ECC71] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25"
          >
            Créer ma page de vente
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Exemple de page de vente',
  ogTitle: 'Exemple de page de vente - LeekPay',
  description: 'Exemple de page de vente professionnelle créée avec l\'éditeur LeekPay.',
  ogDescription: 'Exemple de page de vente professionnelle créée avec l\'éditeur LeekPay.',
  robots: 'noindex',
})
</script>
