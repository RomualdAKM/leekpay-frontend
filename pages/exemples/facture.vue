<template>
  <div class="font-sans bg-white">
    <!-- FACTURE EXEMPLE -->
    <section class="py-10 md:py-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[900px]">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Exemple de <span class="text-[#2ECC71] italic">facture</span>
          </h1>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Voici une facture créée avec l'éditeur LeekPay : numérotation automatique,
            informations client, lignes de prestations, totaux et TVA.
          </p>
        </div>

        <div class="border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/facture-exemple.png"
            alt="Facture FA-2026-0001 créée avec LeekPay"
            class="w-full h-auto"
          />
        </div>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/dashboard/invoices/create"
            class="inline-block bg-[#2ECC71] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25"
          >
            Créer ma facture
          </NuxtLink>
          <a
            href="/facture-FA-2026-0001-leekpay-modern.pdf"
            target="_blank"
            class="inline-flex items-center gap-2 text-gray-900 font-medium px-7 py-3 rounded-lg border border-gray-300 hover:border-[#2ECC71] hover:text-[#27AE60] transition"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Télécharger en PDF
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Exemple de facture',
  ogTitle: 'Exemple de facture - LeekPay',
  description: 'Exemple de facture numérique professionnelle créée avec l\'éditeur de factures LeekPay.',
  ogDescription: 'Exemple de facture numérique professionnelle créée avec l\'éditeur de factures LeekPay.',
  robots: 'noindex',
})
</script>
