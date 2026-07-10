<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
    <section class="py-10 md:py-16 px-6 md:px-12 overflow-hidden">
      <div class="container mx-auto max-w-[1100px] text-center">
        <h1
          class="text-[25px] sm:text-[40px] md:text-[48px] font-bold text-gray-900 leading-[1.25] mb-5"
          v-motion="{
            initial: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, easing: 'easeOut' } }
          }"
        >
          Une tarification<br class="md:hidden"> <span class="italic text-[#2ECC71]">simple et transparente</span>
        </h1>
        <p
          class="text-gray-700 text-[18px] md:text-[21px] leading-[1.35] max-w-2xl mx-auto"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"
        >
          Créez votre compte gratuitement, sans frais cachés ni frais d'installation.
          Des frais clairs, connus à l'avance, sur chaque opération.
        </p>
      </div>
    </section>

    <!-- FRAIS DE RETRAIT : 2 FORMULES -->
    <section class="pb-12 md:pb-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frais de <span class="text-[#2ECC71] italic">retrait</span></h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Vous choisissez votre formule : sans engagement, ou avec l'abonnement LeekPay pour réduire vos frais.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          <!-- Standard -->
          <div
            class="border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col shadow-sm"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600 } }
            }"
          >
            <span class="inline-block w-max bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Sans abonnement</span>
            <p class="text-[64px] md:text-[80px] font-black italic leading-none text-gray-900">3<span class="text-[40px] md:text-[48px]">%</span></p>
            <p class="text-gray-600 text-base mt-2 mb-6">de frais par retrait de vos fonds</p>
            <ul class="space-y-3 text-[15px] text-gray-700 mb-8">
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Compte 100 % gratuit, sans engagement</li>
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Tous les outils inclus (liens, pages, factures, API)</li>
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Retraits traités sous 24 à 48 h ouvrées</li>
            </ul>
            <NuxtLink
              to="/register"
              class="mt-auto inline-block bg-[#2ECC71] text-white text-center px-7 py-3 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25"
            >
              Commencer gratuitement
            </NuxtLink>
          </div>

          <!-- Avec abonnement -->
          <div
            class="relative border-2 border-[#2ECC71] rounded-3xl p-8 md:p-10 flex flex-col shadow-lg shadow-[#2ECC71]/10"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
            }"
          >
            <span class="absolute -top-3.5 right-8 bg-[#FFD700] text-[#0A1F44] text-xs font-bold px-3 py-1 rounded-full shadow">Économisez 1 % par retrait</span>
            <span class="inline-block w-max bg-[#2ECC71]/10 text-[#27AE60] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Avec abonnement LeekPay</span>
            <p class="text-[64px] md:text-[80px] font-black italic leading-none text-[#27AE60]">2<span class="text-[40px] md:text-[48px]">%</span></p>
            <p class="text-gray-600 text-base mt-2 mb-6">de frais par retrait de vos fonds</p>
            <ul class="space-y-3 text-[15px] text-gray-700 mb-8">
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Tout ce qui est inclus dans la formule Standard</li>
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Frais de retrait réduits de 3 % à 2 %</li>
              <li class="flex gap-2.5"><svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>Idéal dès que vos volumes augmentent</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FRAIS DE PAIEMENT -->
    <section class="pb-12 md:pb-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frais au moment du <span class="text-[#2ECC71] italic">paiement</span></h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Lorsqu'un client paie via Mobile Money, les frais appliqués au paiement sont :
            <span class="font-semibold text-gray-800">frais du réseau (selon le pays et l'opérateur) + 3 % LeekPay</span>.
          </p>
        </div>

        <div class="max-w-[720px] mx-auto">
          <div class="border border-gray-200 rounded-2xl overflow-hidden">
            <div class="grid grid-cols-[1.2fr_1fr] bg-[#EAF7EF] text-[13px] md:text-[15px] font-bold text-[#0A1F44]">
              <p class="px-4 md:px-5 py-3">Pays</p>
              <p class="px-4 md:px-5 py-3 text-right">Frais totaux au paiement</p>
            </div>
            <div
              v-for="(row, i) in fraisPays"
              :key="row.pays"
              class="grid grid-cols-[1.2fr_1fr] text-[13px] md:text-[15px]"
              :class="i % 2 ? 'bg-gray-50/60' : 'bg-white'"
            >
              <p class="px-4 md:px-5 py-2.5 text-gray-800">{{ row.pays }}</p>
              <p class="px-4 md:px-5 py-2.5 text-right font-semibold text-[#27AE60] whitespace-nowrap">{{ row.frais }}</p>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-400 text-sm mt-4 max-w-xl mx-auto">
          Frais payés par le client au moment du paiement. Ils varient selon l'opérateur Mobile Money du pays.
        </p>
        <div class="mt-4 mx-auto max-w-xl md:max-w-none md:w-fit bg-[#0A1F44] text-white rounded-2xl px-5 md:px-7 py-3.5 text-sm md:text-base font-medium text-center leading-relaxed md:whitespace-nowrap">
          <svg class="w-5 h-5 inline-block align-text-bottom mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
          Pour tous les autres pays, payez par <strong class="font-bold">PayPal</strong>, <strong class="font-bold">carte bancaire</strong> (Visa, Mastercard) ou <strong class="font-bold">crypto-monnaie</strong>.
        </div>
        <div id="crypto" class="relative mt-8 mx-auto max-w-xl border-2 border-[#2ECC71] rounded-2xl px-5 md:px-7 pt-6 pb-5 text-center scroll-mt-32">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0A1F44] text-xs font-bold tracking-wide px-3.5 py-1 rounded-full shadow">NOUVEAU</span>
          <p class="font-bold text-gray-900 text-lg md:text-xl mb-2">Paiement en <span class="text-[#27AE60] italic">crypto-monnaie</span></p>
          <p class="text-gray-600 text-sm md:text-base leading-relaxed">
            Vos clients peuvent désormais régler en crypto-monnaie, où qu'ils soient dans le monde.
            Frais totaux au paiement : <strong class="text-[#27AE60]">8 %</strong>
            (5 % + 3 % de frais LeekPay).
          </p>
        </div>
      </div>
    </section>

    <!-- TOUT EST INCLUS -->
    <section class="pb-12 md:pb-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px] text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          v-motion="{
            initial: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
        >
          Tout est inclus, <span class="text-[#2ECC71] italic">gratuitement</span>
        </h2>
        <p
          class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto mb-10"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"
        >
          Quelle que soit votre formule, vous accédez à tous les outils
          <span class="text-[#2ECC71] font-semibold italic">LeekPay</span>.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          <div
            v-for="(item, i) in inclus"
            :key="item.title"
            class="bg-[#EAF7EF] rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: i * 80 } }
            }"
          >
            <span class="w-9 h-9 rounded-full bg-[#2ECC71] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div>
              <h3 class="text-gray-900 text-[17px] font-bold leading-tight mb-1">{{ item.title }}</h3>
              <p class="text-gray-600 text-[14px] leading-snug">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COMMENT FONCTIONNE LA TARIFICATION -->
    <section class="pb-12 md:pb-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="border border-[#2ECC71] rounded-3xl p-6 md:p-10"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"
        >
          <h2 class="text-[#2ECC71] text-2xl md:text-[32px] font-bold italic mb-4 leading-tight">Comment fonctionne la tarification ?</h2>
          <ul class="space-y-4 text-gray-700 text-base md:text-lg">
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Création de compte 100 % gratuite</span> : aucun frais d'installation, aucun engagement.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Au paiement</span> : le client paie les frais du réseau Mobile Money de son pays + 3 % LeekPay (voir tableau ci-dessus).</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Au retrait</span> : 3 % de frais sans abonnement, ou 2 % avec l'abonnement LeekPay.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Retraits traités sous 24 à 48 heures ouvrées</span> après votre demande.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Moyens de paiement acceptés</span> : Mobile Money dans de nombreux pays africains, PayPal, cartes bancaires (Visa, Mastercard) et crypto-monnaies.</p>
            </li>
          </ul>
          <p class="text-gray-500 text-[11px] sm:text-sm mt-6 text-center">
            Une question sur les tarifs ? <NuxtLink to="/contact" class="text-[#27AE60] font-medium hover:underline">Contactez-nous</NuxtLink>.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-12 md:pb-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl p-7 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-[24px] md:text-[32px] font-bold italic mb-2 leading-tight">Prêt à encaisser sans frais fixes ?</h3>
            <p class="text-white/95 text-[17px] md:text-[19px] leading-snug">
              Créez votre compte gratuitement et recevez
              <br class="hidden md:block" />
              vos premiers paiements dès aujourd'hui.
            </p>
          </div>
          <NuxtLink
            to="/register"
            class="bg-white text-[#2ECC71] px-10 py-4 rounded-lg text-lg font-bold shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 inline-flex items-center"
          >
            Créer mon compte
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<script setup>
const fraisPays = [
  { pays: 'Sénégal', frais: '5,5 %' },
  { pays: 'Côte d\'Ivoire', frais: '5,5 % – 6 %' },
  { pays: 'Bénin', frais: '5,5 % – 6 %' },
  { pays: 'Burkina Faso', frais: '6 %' },
  { pays: 'Mali', frais: '6 %' },
  { pays: 'Togo', frais: '6 %' },
  { pays: 'Cameroun', frais: '6 % – 7 %' },
  { pays: 'Niger', frais: '7 %' },
  { pays: 'RD Congo', frais: '7,5 %' },
  { pays: 'Congo', frais: '8 %' },
  { pays: 'Ghana', frais: '8 %' },
]

const inclus = [
  {
    title: 'Liens de paiement',
    text: 'Créez et partagez des liens de paiement illimités, sans site web.',
  },
  {
    title: 'Pages de vente',
    text: 'Concevez des pages de vente professionnelles avec paiement intégré.',
  },
  {
    title: 'Factures numériques',
    text: 'Émettez des factures payables en ligne et suivez leur statut.',
  },
  {
    title: 'API de paiement',
    text: 'Intégrez les paiements à vos applications avec notre documentation.',
  },
  {
    title: 'Tableau de bord & statistiques',
    text: 'Suivez vos transactions, revenus et performances en temps réel.',
  },
  {
    title: 'Support WhatsApp',
    text: 'Une équipe à votre écoute pour vous accompagner à chaque étape.',
  },
]

useSeoMeta({
  title: 'Tarifs',
  ogTitle: 'Tarifs - LeekPay',
  description: 'Tarification simple et transparente : retrait à 3 % sans abonnement ou 2 % avec abonnement. Compte gratuit, sans frais cachés.',
  ogDescription: 'Tarification simple et transparente : retrait à 3 % sans abonnement ou 2 % avec abonnement. Compte gratuit, sans frais cachés.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>
