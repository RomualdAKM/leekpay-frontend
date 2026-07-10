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
          v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <div class="space-y-4">
            <span class="inline-flex w-max items-center gap-2 border border-white/70 bg-white/10 text-white text-[15px] md:text-[16px] font-semibold px-3 md:px-3.5 py-1.5 rounded-full leading-none">
              Facturez en ligne, simplement
            </span>

            <h1 class="text-[34px] sm:text-[36px] md:text-[40px] lg:text-[46px] font-normal leading-[1.12]">
              <span class="md:whitespace-nowrap">Créez des <span class="italic font-bold">factures </span></span>
              <br class="hidden md:block" />
              <span class="md:whitespace-nowrap"><span class="italic font-bold">numériques</span> téléchargeables</span>
              <br class="hidden md:block" />
              avec paiement intégré.
            </h1>

            <p class="text-white/95 text-[18px] md:text-[21px] leading-[1.24]">
              Générez vos factures en quelques clics,<br class="hidden md:block" />
              envoyez-les à vos clients par lien, et recevez<br class="hidden md:block" />
              vos paiements simplement et en toute sécurité.
            </p>
          </div>

          <div class="mx-auto mt-7 flex w-full max-w-[360px] flex-col gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:flex-wrap">
            <NuxtLink
              to="/dashboard/invoices/create"
              class="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-2.5 text-center text-[16px] font-semibold text-[#2ECC71] shadow-sm transition hover:bg-gray-100 sm:w-auto sm:text-[17px]"
            >
              Créer une facture
            </NuxtLink>
            <NuxtLink
              to="/exemples/facture"
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
          v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <!-- Facture codée (réplique fidèle de la maquette) -->
          <div class="w-full max-w-[440px] md:max-w-[560px] lg:max-w-[620px] bg-white rounded-lg shadow-lg overflow-hidden text-left text-gray-900" aria-hidden="true">
            <div class="h-2.5 bg-gradient-to-r from-[#0A1F44] to-[#2ECC71]"></div>
            <div class="p-4 md:p-6">
              <p class="text-[14px] font-bold text-[#1F2A44]">Entreprise Démo Services</p>
              <p class="text-[12px] text-gray-600 mt-1">123 Avenue Principale</p>
              <p class="text-[12px] text-gray-600">10000 <span class="ml-10">Ville-Test</span></p>
              <div class="mt-2.5 space-y-1 text-[12px]">
                <p><span class="inline-block w-16 font-bold text-[#1F2A44]">Email</span><span class="text-gray-700">contact@entreprise-demo.com</span></p>
                <p><span class="inline-block w-16 font-bold text-[#1F2A44]">Tel</span><span class="text-gray-700">+221 78 781 45 72</span></p>
                <p><span class="inline-block w-16 font-bold text-[#1F2A44]">N TVA</span><span class="text-gray-700">TVA-XXXX-123456</span></p>
              </div>
              <div class="border border-gray-200 rounded-md p-3.5 mt-5 grid grid-cols-[1.4fr_1fr] gap-2 bg-gray-50/50">
                <div>
                  <p class="text-[10px] font-semibold tracking-wider text-gray-400">CLIENT</p>
                  <p class="text-[13px] font-bold text-[#1F2A44] mt-1.5">Client Démonstration</p>
                  <p class="text-[12px] text-gray-600 mt-0.5">45 Rue</p>
                  <p class="text-[12px] text-gray-600">20000 <span class="ml-8">Ville-Client</span></p>
                </div>
                <div class="pt-5 space-y-1.5 text-[12px]">
                  <p class="font-bold text-[#1F2A44]">Email</p>
                  <p class="font-bold text-[#1F2A44]">Tel</p>
                </div>
              </div>
              <div class="mt-4 border border-gray-200 rounded-sm overflow-hidden">
                <div class="grid grid-cols-[1.6fr_1fr_1.2fr] bg-[#EAF7EF] text-[12px] font-bold text-[#1F2A44] text-center">
                  <p class="py-2.5 border-r border-gray-200">Description</p>
                  <p class="py-2.5 border-r border-gray-200">Quantite</p>
                  <p class="py-2.5">Prix unitaire HT</p>
                </div>
                <div class="grid grid-cols-[1.6fr_1fr_1.2fr] text-[12px]">
                  <div class="px-3 py-2.5 border-r border-gray-200">
                    <p class="font-bold text-[#1F2A44]">Prestation de service</p>
                    <p class="text-[11px] text-gray-400">Offre standard</p>
                  </div>
                  <p class="py-2.5 border-r border-gray-200 text-center self-center text-gray-700">1</p>
                  <p class="py-2.5 text-center self-center text-gray-700">50000</p>
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
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Pourquoi choisir les <span class="text-[#2ECC71] italic">factures numériques</span> ?</h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">Des factures professionnelles, payables en ligne, qui vous font gagner du temps.</p>
        </div>
        <div class="grid gap-5 md:grid-cols-3 md:gap-6">
        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Rapide</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Créez et envoyez une facture en moins d'une minute.</p>
          </div>
        </div>

        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Flexible</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Vos clients peuvent télécharger leur facture à tout moment.</p>
          </div>
        </div>

        <div
          class="bg-[#EAF7EF] rounded-2xl p-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left transition-transform duration-300 hover:-translate-y-1"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <span class="w-11 h-11 rounded-full bg-[#2ECC71] shadow-md shadow-[#2ECC71]/25 flex items-center justify-center flex-shrink-0 md:mt-0.5">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Sécurisé</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Transactions sécurisées et données protégées.</p>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- CREATE INVOICES SECTION -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="bg-[#EAF7EF] rounded-3xl p-6 md:p-10 grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <h2 class="text-[#2ECC71] text-2xl md:text-[36px] font-bold italic mb-3">Créez des factures numériques</h2>
            <p class="text-gray-700 text-lg md:text-[19px] leading-[1.28]">
              professionnelles et téléchargeables avec un lien de paiement intégré automatiquement.
              Envoyez vos factures instantanément à vos clients, sans impression ni déplacement.
              Recevez des notifications en temps réel dès qu'un paiement est effectué. Accédez à
              l'historique de toutes vos factures et transactions. Gérez vos factures depuis mobile,
              tablette ou ordinateur.
            </p>
          </div>

          <div
            class="w-full self-stretch"
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <img
              src="~/assets/img/invoices/img_create_invoices.png"
              alt="Créer des factures"
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
          v-motion-visibility="{ once: true }"
        >
          Comment ça marche ?
        </h2>
        <p
          class="text-gray-600 text-[18px] md:text-[22px] max-w-2xl mx-auto leading-[1.3]"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"
          v-motion-visibility="{ once: true }"
        >
          Quelques clics suffisent pour créer une facture,
          l'envoyer à votre client et recevoir votre paiement.
        </p>

        <div
          class="mt-10 md:mt-12 relative max-w-[980px] mx-auto"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <div class="hidden md:block absolute left-[12.5%] right-[12.5%] top-7 border-t-2 border-dashed border-[#2ECC71]/40 origin-left" aria-hidden="true" v-motion="{ initial: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 900, delay: 250, easing: 'easeOut' } } }"></div>

          <div class="relative grid grid-cols-1 md:grid-cols-4 justify-items-center gap-y-9 md:gap-y-0 md:gap-x-4">
            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">1</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Créez votre<br class="hidden md:block" /> facture</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">2</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Ajoutez<br class="hidden md:block" /> les informations</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">3</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Envoyez ou<br class="hidden md:block" /> partagez</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">4</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Le client<br class="hidden md:block" /> paie</p>
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
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <img
              src="~/assets/img/invoices/img_usecase_invoices.png"
              alt="Cas d'usage factures"
              class="w-full h-full object-cover rounded-2xl border border-[#2ECC71]"
            />
          </div>
          <div
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <h3 class="text-[#2ECC71] text-3xl md:text-[44px] font-bold italic leading-[1.08] mb-4">Cas d'usage</h3>
            <p class="text-[#111827] leading-[1.24] text-lg md:text-[19px]">
              Idéal pour les freelances, entrepreneurs, commerçants, prestataires de services,
              écoles et associations qui souhaitent envoyer des factures numériques à leurs
              clients et encaisser rapidement.
            </p>
            <svg
              class="mt-6 w-full max-w-[420px]"
              viewBox="0 0 520 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 36C92 16 140 12 170 16C189 18 198 23 198 31C198 39 224 39 248 36C312 28 368 20 430 12"
                stroke="#2ECC71"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
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
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-xl md:text-[30px] font-bold italic mb-1">Prêt à créer vos factures numériques&nbsp;?</h3>
            <p class="text-white/90 text-lg md:text-[20px] leading-[1.25]">
              Générez des factures professionnelles, envoyez-les
              <br class="hidden md:block" />
              à vos clients et encaissez sans perdre de temps.
            </p>
          </div>
          <NuxtLink
            to="/dashboard/invoices/create"
            class="inline-flex w-full justify-center rounded-lg bg-white px-10 py-4 text-lg font-bold text-[#2ECC71] shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95 sm:w-auto"
          >
            Créer une facture
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
  title: 'Factures LeekPay',
  ogTitle: 'Factures LeekPay - Encaissez plus vite',
  description: 'Créez des factures numériques téléchargeables avec paiement intégré. Rapide, flexible et sécurisé.',
  ogDescription: 'Créez des factures numériques téléchargeables avec paiement intégré. Rapide, flexible et sécurisé.',
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
