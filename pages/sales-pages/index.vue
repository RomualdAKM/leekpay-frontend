<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
    <section class="bg-[#2ECC71] text-white py-14 md:py-20 px-6 md:px-12 overflow-hidden">
      <div class="container mx-auto max-w-[1100px] grid md:grid-cols-[1fr_0.95fr] gap-6 lg:gap-7 items-start">
        <div
          class="flex flex-col"
          v-motion="{
            initial: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
          }"

        >
          <div class="space-y-4">
            <span class="inline-flex w-max items-center gap-2 border border-white/70 bg-white/10 text-white text-[15px] md:text-[16px] font-semibold px-3 md:px-3.5 py-1.5 rounded-full leading-none">
              Vendez en ligne, simplement
            </span>

            <h1 class="text-[34px] sm:text-[36px] md:text-[40px] lg:text-[46px] font-normal leading-[1.12]">
              <span class="md:whitespace-nowrap">Créez des <span class="italic font-bold">pages de vente </span></span>
              <br class="hidden md:block" />
              <span class="md:whitespace-nowrap">professionnelles et efficaces.</span>
            </h1>

            <p class="text-white/95 text-[18px] md:text-[21px] leading-[1.24]">
              Lancez vos produits, services ou événements<br class="hidden md:block" />
              en ligne sans développeur, avec paiement intégré et design optimisé mobile.
            </p>
          </div>

          <div class="mx-auto mt-7 flex w-full max-w-[360px] flex-col gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:flex-wrap">
            <NuxtLink
              to="/dashboard/sales-pages/create"
              class="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-2.5 text-center text-[16px] font-semibold text-[#2ECC71] shadow-sm transition hover:bg-gray-100 sm:w-auto sm:text-[17px]"
            >
              Créer ma page
            </NuxtLink>
            <NuxtLink
              to="/exemples/page-de-vente"
              class="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-center text-[16px] font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:text-[17px]"
            >
              Voir un exemple
            </NuxtLink>
          </div>
        </div>

        <div
          class="hero-visual-wrap w-full flex justify-center md:justify-end md:items-start"
          v-motion="{
            initial: { opacity: 0, x: 60, scale: 0.98 },
            visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
          }"

        >
          <!-- Éditeur codé (réplique fidèle de la maquette) -->
          <div class="w-full max-w-[440px] md:max-w-[560px] lg:max-w-[620px] bg-white rounded-lg shadow-lg overflow-hidden flex text-left text-gray-900" aria-hidden="true">
            <!-- Panneau blocs -->
            <div class="w-[30%] border-r border-gray-300 p-3 md:p-4 space-y-3">
              <div class="border border-[#2ECC71] rounded-md p-3 text-center">
                <span class="mx-auto w-9 h-9 bg-[#2ECC71]/15 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                </span>
                <p class="text-[#2ECC71] text-[12px] font-medium mt-2">Image</p>
              </div>
              <div class="border border-[#2ECC71] rounded-md p-3 text-center">
                <span class="mx-auto w-9 h-9 bg-[#2ECC71]/15 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                </span>
                <p class="text-[#2ECC71] text-[12px] font-medium mt-2">Vidéo</p>
              </div>
              <div class="border border-[#2ECC71] rounded-md p-3 text-center">
                <span class="mx-auto w-9 h-9 bg-[#2ECC71]/15 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>
                </span>
                <p class="text-[#2ECC71] text-[12px] font-medium mt-2">Hero Section</p>
              </div>
            </div>
            <!-- Aperçu -->
            <div class="flex-1 p-4 md:p-5 text-center">
              <span class="mx-auto w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl leading-none">+</span>
              <p class="text-[15px] font-bold mt-2">Commencez à créer</p>
              <p class="text-[11px] text-gray-500 leading-snug mt-0.5 max-w-[300px] mx-auto">Ajoutez des blocs depuis le panneau de gauche pour construire votre page de vente</p>
              <p class="inline-block bg-[#2ECC71] text-white text-[12px] font-semibold rounded-full px-4 py-1.5 mt-2.5">Ajouter un Hero</p>
              <div class="grid grid-cols-2 gap-3 md:gap-4 mt-4 text-left">
                <div>
                  <div class="border border-gray-300 rounded-sm p-1"><img src="~/assets/img/sales/produit-photoshop.png" alt="" class="w-full h-20 md:h-28 object-contain" /></div>
                  <p class="text-[12px] md:text-[13px] font-bold mt-1.5">Formation Photoshop</p>
                  <p class="text-[9px] text-gray-400">Description du produit.</p>
                  <p class="text-[12px] font-semibold text-[#2ECC71] mt-0.5">20 €</p>
                  <p class="bg-[#2ECC71] text-white text-[12px] font-semibold text-center py-1.5 mt-1.5 rounded-sm">Acheter</p>
                </div>
                <div>
                  <div class="border border-gray-300 rounded-sm p-1"><img src="~/assets/img/sales/produit-cartable.png" alt="" class="w-full h-20 md:h-28 object-contain" /></div>
                  <p class="text-[12px] md:text-[13px] font-bold mt-1.5">Cartable en cuir</p>
                  <p class="text-[9px] text-gray-400">Description du produit.</p>
                  <p class="text-[12px] font-semibold text-[#2ECC71] mt-0.5">90000 CFA</p>
                  <p class="bg-[#2ECC71] text-white text-[12px] font-semibold text-center py-1.5 mt-1.5 rounded-sm">Acheter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Pourquoi choisir les <span class="text-[#2ECC71] italic">pages de vente</span> ?</h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">Des pages professionnelles qui présentent votre offre et encaissent pour vous, sans site web.</p>
        </div>
        <div class="grid gap-5 md:grid-cols-3 md:gap-6">
        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Rapide</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Créez et publiez votre page de vente en quelques minutes, sans aucune compétence technique.</p>
          </div>
        </div>

        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"

        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Flexible</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Construisez votre page de vente de A à Z, selon vos besoins et votre vision.</p>
          </div>
        </div>

        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
          }"

        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Sécurisé</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Tous les paiements sont protégés par un système de sécurité fiable et un chiffrement SSL.</p>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- CREATE SALES PAGES SECTION -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="bg-[#EAF7EF] rounded-3xl p-6 md:p-10 grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <h2 class="text-[#2ECC71] text-2xl md:text-[36px] font-bold italic mb-3">Créez votre page de vente</h2>
            <p class="text-gray-700 text-lg md:text-[19px] leading-[1.28]">
              grâce à un éditeur simple et intuitif, avec un paiement intégré automatiquement.
              Toutes vos pages sont responsive et optimisées pour mobile, et vous pouvez
              les partager facilement sur les réseaux sociaux. Suivez vos performances grâce
              aux statistiques détaillées, capturez des prospects avec le formulaire de leads,
              et dupliquez vos pages rapidement pour gagner du temps.
            </p>
          </div>

          <div
            class="w-full self-stretch"
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <img
              src="~/assets/img/sales/img_create_sale.png"
              alt="Créer une page de vente"
              class="w-full h-full object-cover rounded-2xl border border-[#2ECC71] shadow-md"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px] text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          v-motion="{
            initial: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          Comment ça marche ?
        </h2>
        <p
          class="text-gray-600 text-[18px] md:text-[22px] max-w-2xl mx-auto leading-[1.3]"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"

        >
          Quelques clics suffisent pour créer votre page,
          la partager et vendre automatiquement.
        </p>

        <div
          class="mt-10 md:mt-12 relative max-w-[980px] mx-auto"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
          <div class="hidden md:block absolute left-[11%] right-[11%] top-7 border-t-2 border-dashed border-[#2ECC71]/40 origin-left" aria-hidden="true" v-motion="{ initial: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 900, delay: 250, easing: 'easeOut' } } }"></div>

          <div class="relative grid grid-cols-1 md:grid-cols-4 justify-items-center gap-y-9 md:gap-y-0 md:gap-x-4">
            <div class="flex w-full max-w-[320px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">1</div>
              <p class="mt-3 text-gray-900 text-[17px] md:text-[18px] font-semibold leading-[1.2]">Construisez votre<br /> page avec l'éditeur</p>
            </div>

            <div class="flex w-full max-w-[320px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">2</div>
              <p class="mt-3 text-gray-900 text-[17px] md:text-[18px] font-semibold leading-[1.2]">Ajoutez<br class="hidden md:block" /> votre offre</p>
            </div>

            <div class="flex w-full max-w-[320px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">3</div>
              <p class="mt-3 text-gray-900 text-[17px] md:text-[18px] font-semibold leading-[1.2]">Partagez ou<br class="hidden md:block" /> diffusez</p>
            </div>

            <div class="flex w-full max-w-[320px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">4</div>
              <p class="mt-3 text-gray-900 text-[17px] md:text-[18px] font-semibold leading-[1.2]">Le client<br class="hidden md:block" /> paie</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- USE CASES -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="border border-[#2ECC71] rounded-3xl p-6 md:p-10 grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 items-center">
          <div
            class="w-full self-stretch"
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <img
              src="~/assets/img/sales/img_usecase_sale.png"
              alt="Cas d'usage pages de vente"
              class="w-full h-full object-cover rounded-2xl border border-[#2ECC71]"
            />
          </div>
          <div
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <h3 class="text-[#2ECC71] text-3xl md:text-[44px] font-bold italic leading-[1.08] mb-4">Cas d'usage</h3>
            <p class="text-[#111827] leading-[1.24] text-lg md:text-[19px]">
              Que vous vendiez des produits digitaux, des formations, des produits physiques
              ou des services, créez des pages de vente pour vendre facilement en ligne. Idéal
              également pour la collecte de paiements, de cotisations ou de contributions, avec
              un paiement automatique et sécurisé.
            </p>
            <svg
              class="mt-6 w-full max-w-[420px]"
              viewBox="0 0 520 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 36C118 43 230 43 338 42C386 42 427 42 462 40C481 39 496 36 506 31C497 23 484 18 468 15"
                stroke="#2ECC71"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ADVANTAGES -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="border border-[#2ECC71] rounded-3xl p-6 md:p-10"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
          <h3 class="text-[#2ECC71] text-xl md:text-2xl font-bold italic mb-6">Avantages exclusifs</h3>
          <ul class="space-y-4 text-gray-700 text-base md:text-lg">
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <div>
                <p class="font-semibold text-gray-900">Nom de domaine personnalisé</p>
                <p>Utilisez votre propre domaine pour renforcer votre crédibilité et inspirer confiance.</p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <div>
                <p class="font-semibold text-gray-900">Outils de tracking intégrés</p>
                <p>Connectez Facebook Pixel, Google Analytics (GA4), Google Tag Manager et TikTok Pixel.</p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <div>
                <p class="font-semibold text-gray-900">Suivi des performances</p>
                <p>Analysez les visites, les conversions et l'efficacité de vos campagnes.</p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <div>
                <p class="font-semibold text-gray-900">Code personnalisé (avancé)</p>
                <p>Ajoutez vos scripts marketing (Hotjar, Clarity, pixels externes, etc.).</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 md:py-16 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl p-7 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-xl md:text-[30px] font-bold italic mb-1">Prêt à créer votre page <br class="md:hidden">de vente&nbsp;?</h3>
            <p class="text-white/90 text-lg md:text-[20px] leading-[1.25]">
              Créez votre page de vente en quelques minutes
              <br class="hidden md:block" />
              et commencez à vendre sans complications.
            </p>
          </div>
          <NuxtLink
            to="/dashboard/sales-pages/create"
            class="inline-flex w-full justify-center rounded-lg bg-white px-10 py-4 text-lg font-bold text-[#2ECC71] shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95 sm:w-auto"
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
  title: 'Pages de vente LeekPay',
  ogTitle: 'Pages de vente LeekPay - Vendez en ligne',
  description: 'Créez des pages de vente professionnelles avec paiement intégré, rapides et sécurisées.',
  ogDescription: 'Créez des pages de vente professionnelles avec paiement intégré, rapides et sécurisées.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
@media (min-width: 768px) {
  .hero-visual-wrap {
    position: relative;
    right: -4rem;
  }
}

@media (min-width: 1200px) {
  .hero-visual-wrap {
    right: calc((100vw - 1100px) / -2 - 1.25rem);
  }
}
</style>
