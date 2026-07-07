<template>
  <div class="font-sans bg-white">
    <!-- LIEN DE PAIEMENT EXEMPLE -->
    <section class="py-10 md:py-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[900px]">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Exemple de <span class="text-[#2ECC71] italic">lien de paiement</span>
          </h1>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Voici la page qu'ouvre un lien de paiement LeekPay : visuel du produit,
            description, et formulaire de paiement sécurisé, sans site web.
          </p>
        </div>

        <div class="border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/lien-exemple.png"
            alt="Exemple de page de lien de paiement LeekPay : Formation UX Design"
            class="w-full h-auto"
          />
        </div>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/dashboard/create-link"
            class="inline-block bg-[#2ECC71] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25"
          >
            Créer mon lien
          </NuxtLink>
          <NuxtLink
            to="/exemple-lien"
            target="_blank"
            class="inline-flex items-center gap-2 text-gray-900 font-medium px-7 py-3 rounded-lg border border-gray-300 hover:border-[#2ECC71] hover:text-[#27AE60] transition"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            Tester la page en direct
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
  title: 'Exemple de lien de paiement',
  ogTitle: 'Exemple de lien de paiement - LeekPay',
  description: 'Exemple de page de paiement créée avec un lien de paiement LeekPay.',
  ogDescription: 'Exemple de page de paiement créée avec un lien de paiement LeekPay.',
  robots: 'noindex',
})
</script>
