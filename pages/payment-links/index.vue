<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
<section class="bg-[#2ECC71] text-white py-14 md:py-20 px-6 md:px-12 overflow-hidden">
  <div class="container mx-auto max-w-[1100px] grid md:grid-cols-[1.05fr_0.75fr] gap-10 lg:gap-20 items-start">
    <div
      class="flex flex-col"
      v-motion="{
        initial: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
      }"

    >
      <div class="space-y-4">
        <span class="inline-flex w-max items-center gap-2 border border-white/70 bg-white/10 text-white text-[15px] md:text-[16px] font-semibold px-3 md:px-3.5 py-1.5 rounded-full leading-none">
          Encaissez en ligne, simplement
        </span>

        <h1 class="text-[34px] sm:text-[38px] md:text-[44px] lg:text-[50px] font-normal leading-[1.12]">
          <span class="md:whitespace-nowrap">Créez des <span class="italic font-bold">liens de paiement</span></span>
          <br class="hidden md:block" />
          et encaissez instantanément
        </h1>

        <p class="text-white/95 text-[21px] md:text-[24px] leading-[1.24]">
          Recevez vos paiements via mobile money,<br class="hidden md:block" />
          carte bancaire et wallet en un simple clic.
        </p>
      </div>

      <div class="mx-auto mt-7 flex w-full max-w-[360px] flex-col gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:flex-wrap">
        <NuxtLink
          to="/dashboard/create-link"
          class="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-2.5 text-center text-[16px] font-semibold text-[#2ECC71] shadow-sm transition hover:bg-gray-100 sm:w-auto sm:text-[17px]"
        >
          Créer un lien
        </NuxtLink>
        <NuxtLink
          to="/exemples/lien-de-paiement"
          class="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-center text-[16px] font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:text-[17px]"
        >
          Voir un exemple
        </NuxtLink>
      </div>
    </div>

    <div
      class="w-full flex justify-center md:justify-end"
      v-motion="{
        initial: { opacity: 0, x: 60, scale: 0.98 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
      }"

    >
      <!-- Formulaire codé (réplique fidèle de la maquette) -->
      <div class="w-full max-w-[350px] md:max-w-[380px] bg-white rounded-2xl shadow-lg p-5 md:p-6 text-left text-gray-900" aria-hidden="true">
        <div class="flex items-center justify-between mb-5">
          <span class="space-y-1">
            <span class="block w-5 h-[2.5px] bg-gray-800 rounded"></span>
            <span class="block w-5 h-[2.5px] bg-gray-800 rounded"></span>
            <span class="block w-5 h-[2.5px] bg-gray-800 rounded"></span>
          </span>
          <span class="text-[14px] font-bold">Dashboard</span>
        </div>
        <p class="text-[14px] font-semibold mb-2">Type de montant</p>
        <div class="flex items-center gap-2.5 mb-4">
          <span class="relative w-10 h-5 bg-gray-300 rounded-full">
            <span class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></span>
          </span>
          <span class="text-[12px] font-semibold">Montant fixe</span>
        </div>
        <p class="text-[14px] font-semibold mb-1.5">Montant *</p>
        <div class="h-10 border border-gray-300 rounded-md mb-1"></div>
        <p class="text-[11px] text-gray-400 mb-3.5">Devise: CFA</p>
        <p class="text-[14px] font-semibold mb-1.5">Date d'expiration (optionnel)</p>
        <div class="h-10 border border-gray-300 rounded-md px-3 flex items-center justify-between mb-3.5">
          <span class="text-[12px] text-gray-600">jj/mm/aaaa</span>
          <svg class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
        </div>
        <p class="text-[14px] font-semibold mb-1.5 leading-snug">URL de redirection après paiement (optionnel)</p>
        <div class="h-10 border border-gray-300 rounded-md px-3 flex items-center mb-1.5">
          <span class="text-[12px] text-gray-400">https://example.com/success</span>
        </div>
        <p class="text-[11px] text-gray-400 leading-snug mb-5">Les utilisateurs seront redirigés vers cette URL après un paiement réussi</p>
        <p class="bg-[#2ECC71] text-white text-[14px] font-semibold text-center rounded-md py-3">Créer le lien de paiement</p>
      </div>
    </div>
  </div>
</section>

    <!-- BENEFITS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Pourquoi choisir les <span class="text-[#2ECC71] italic">liens de paiement</span> ?</h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">Un moyen simple, rapide et sécurisé d’encaisser vos clients, où qu’ils soient.</p>
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
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Créez un lien de paiement et encaissez en quelques minutes, sans étapes inutiles ni complexité.</p>
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
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Vos clients paient quand et où ils le souhaitent, sur mobile ou ordinateur, sans contrainte.</p>
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
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Chaque transaction est protégée par des standards de sécurité élevés et fiables.</p>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- CREATE LINK SECTION -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="bg-[#EAF7EF] rounded-3xl p-6 md:p-10 grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <h2 class="text-[#2ECC71] text-2xl md:text-[36px] font-bold italic mb-3">Créez un lien de paiement</h2>
            <p class="text-gray-700 text-lg md:text-[19px] leading-[1.28]">
              en quelques secondes et partagez-le facilement par WhatsApp, SMS ou email.
              Vos clients peuvent payer avec plusieurs moyens de paiement en toute sécurité
              grâce au chiffrement SSL. Vous recevez des notifications instantanées à chaque
              paiement et pouvez consulter à tout moment l'historique de vos transactions.
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
              src="~/assets/img/leekpay_link/img_create_link.png"
              alt="Créer un lien de paiement"
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
          Quelques clics suffisent pour créer un lien,
          recevoir un paiement et suivre vos transactions.
        </p>

        <div
          class="mt-10 md:mt-12 relative max-w-[980px] mx-auto"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
          <div class="hidden md:block absolute left-[12.5%] right-[12.5%] top-7 border-t-2 border-dashed border-[#2ECC71]/40 origin-left" aria-hidden="true" v-motion="{ initial: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 900, delay: 250, easing: 'easeOut' } } }"></div>

          <div class="relative grid grid-cols-1 md:grid-cols-4 justify-items-center gap-y-9 md:gap-y-0 md:gap-x-4">
            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">1</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Crée ton lien</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">2</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Personnalise les paramètres</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">3</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Partage le lien</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">4</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Le client paie</p>
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
              src="~/assets/img/leekpay_link/img_use_case_link.png"
              alt="Cas d'usage liens de paiement"
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
              Que vous soyez freelance, commerçant, école, ONG ou coach, vous pouvez utiliser
              les liens de paiement pour recevoir des paiements rapidement, même à distance.
              Vos clients paient facilement et vous gagnez du temps dans la gestion des paiements.
            </p>
            <svg
              class="mt-6 w-full max-w-[420px]"
              viewBox="0 0 520 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 34C82 20 136 10 218 12C250 13 272 16 278 23C283 29 270 34 263 39C254 45 285 44 313 40C379 31 442 20 516 14"
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

        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-xl md:text-[30px] font-bold italic mb-1">Tu es prêt à recevoir tes premiers paiements ?</h3>
            <p class="text-white/90 text-lg md:text-[20px] leading-[1.25]">
              Commence dès aujourd'hui et encaisse tes paiements
              <br class="hidden md:block" />
              en toute simplicité.
            </p>
          </div>
          <NuxtLink
            to="/dashboard/create-link"
            class="bg-white text-[#2ECC71] px-10 py-4 rounded-lg text-lg font-bold shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
          >
            Créer un lien
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
  title: 'Liens de paiement LeekPay',
  ogTitle: 'Liens de paiement LeekPay - Encaissez en ligne',
  description: 'Créez des liens de paiement et encaissez instantanément via mobile money, carte bancaire et wallet.',
  ogDescription: 'Créez des liens de paiement et encaissez instantanément via mobile money, carte bancaire et wallet.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>
