<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
    <section class="py-10 md:py-16 px-6 md:px-12 overflow-hidden">
      <div class="container mx-auto max-w-[1100px] grid md:grid-cols-[1fr_0.9fr] gap-10 l:gap-12 items-center">
        <div
          class="flex flex-col"
          v-motion="{
            initial: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <h1 class="text-[36px] sm:text-[42px] md:text-[50px] lg:text-[52px] font-bold text-gray-900 leading-[1.18] mb-6">
            <span class="italic text-[#2ECC71]">LeekPay</span>, la solution simple
            <!-- <br class="hidden md:block" /> -->
            pour encaisser en ligne
          </h1>
          <p class="text-gray-700 text-[18px] md:text-[21px] leading-[1.3] max-w-[540px]">
            une plateforme de paiement conçue pour permettre aux entrepreneurs, freelances,
            commerçants et entreprises d’encaisser facilement les paiements en ligne,
            via des <strong class="text-gray-900 font-semibold">liens de paiement</strong>, des
            <strong class="text-gray-900 font-semibold">pages de vente</strong>, des
            <strong class="text-gray-900 font-semibold">factures numériques</strong>
            et une <strong class="text-gray-900 font-semibold">API puissante</strong>.
          </p>
        </div>

        <div
          class="w-full flex justify-center md:justify-end"
          v-motion="{
            initial: { opacity: 0, x: 60, scale: 0.98 },
            visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <img
            src="~/assets/img/about/img_principal_about.png"
            alt="Présentation LeekPay"
            class="w-full h-auto max-h-[440px] max-w-[360px] md:max-w-[420px] rounded-2xl"
          />
        </div>
      </div>
    </section>

    <!-- NOTRE VISION -->
    <section class="bg-[#2ECC71] text-white py-12 md:py-14 px-6 md:px-12">
      <div
        class="container mx-auto max-w-[1100px]"
        v-motion="{
          initial: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 600 } }
        }"
        v-motion-visibility="{ once: true, threshold: 0.2 }"
      >
        <h2 class="text-[28px] md:text-[36px] font-bold mb-4 italic leading-tight">Notre vision</h2>
        <p class="text-white/95 max-w-4xl text-[18px] md:text-[22px] leading-[1.3]">
          Simplifier l’accès aux paiements digitaux pour permettre à chacun de développer
          son activité, vendre en ligne et encaisser en toute sécurité, sans complexité technique.
        </p>
      </div>
    </section>

    <!-- CE QUE NOUS FAISONS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="border border-[#2ECC71] rounded-3xl p-6 md:p-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
          <div
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <h3 class="text-[#2ECC71] text-2xl md:text-[32px] font-bold italic mb-4 leading-tight">Ce que nous faisons</h3>
            <p class="text-gray-700 leading-[1.3] text-[18px] md:text-[20px]">
              Nous mettons à disposition une infrastructure complète permettant de créer des liens de paiement,
              concevoir des pages de vente, envoyer des factures numériques et intégrer les paiements via API. Notre
              plateforme centralise la gestion des paiements, le suivi des transactions et la sécurité des données.
            </p>
          </div>
          <div
            class="w-full flex justify-center"
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <!-- Menu codé (réplique fidèle de la maquette) -->
            <div class="w-full max-w-[400px] bg-white border-2 border-[#2ECC71] rounded-3xl shadow-md p-6 md:p-8" aria-hidden="true">
              <p class="flex items-center gap-3 bg-[#DFF5E7] rounded-md px-4 py-3 mb-7">
                <svg class="w-5 h-5 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>
                <span class="text-[15px] font-semibold tracking-[0.15em] text-[#2ECC71]">TABLEAU DE BORD</span>
              </p>
              <div class="flex items-center justify-between mb-2.5">
                <span class="text-[15px] tracking-[0.08em] text-gray-400">LIENS DE PAIEMENTS</span>
                <span class="w-9 h-9 bg-[#2ECC71] rounded-md text-white flex items-center justify-center text-2xl font-bold leading-none pb-0.5">+</span>
              </div>
              <p class="flex items-center gap-3 pl-4 mb-6">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                <span class="text-[17px] font-semibold text-gray-900">Mes liens</span>
              </p>
              <div class="flex items-center justify-between mb-2.5">
                <span class="text-[15px] tracking-[0.08em] text-gray-400">PAGES DE VENTE</span>
                <span class="w-9 h-9 bg-[#2ECC71] rounded-md text-white flex items-center justify-center text-2xl font-bold leading-none pb-0.5">+</span>
              </div>
              <p class="flex items-center gap-3 pl-4 mb-6">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5a.75.75 0 01.75.75v12a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V6a.75.75 0 01.75-.75zM3 9.75h18M9.75 9.75V18.75" /></svg>
                <span class="text-[17px] font-semibold text-gray-900">Mes pages</span>
              </p>
              <div class="flex items-center justify-between mb-2.5">
                <span class="text-[15px] tracking-[0.08em] text-gray-400">FACTURES</span>
                <span class="w-9 h-9 bg-[#2ECC71] rounded-md text-white flex items-center justify-center text-2xl font-bold leading-none pb-0.5">+</span>
              </div>
              <p class="flex items-center gap-3 pl-4">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span class="text-[17px] font-semibold text-gray-900">Mes factures</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOS VALEURS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px] text-center">
        <h2
          class="text-[32px] md:text-[48px] font-bold text-gray-900 mb-3 italic"
          v-motion="{
            initial: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
          v-motion-visibility="{ once: true }"
        >
          Nos valeurs
        </h2>
        <p
          class="text-gray-600 max-w-2xl mx-auto mb-10 text-[18px] md:text-[21px] leading-[1.35]"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"
          v-motion-visibility="{ once: true }"
        >
          Chez <span class="text-[#2ECC71] font-semibold italic">LeekPay</span>, nos valeurs guident chaque décision, chaque
          fonctionnalité et chaque amélioration que nous apportons à la plateforme.
        </p>

        <div class="grid md:grid-cols-2 gap-5 md:gap-7 max-w-[900px] mx-auto">
          <div
            class="bg-[#EAF7EF] rounded-2xl p-5 md:p-6 text-left flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <span class="text-4xl md:text-5xl font-black text-[#2ecc712b]">01</span>
            <div>
              <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight">Simplicité</h3>
              <p class="text-gray-600 text-base md:text-[18px] leading-snug">Des outils faciles à utiliser, accessibles à tous.</p>
            </div>
          </div>
          <div
            class="bg-[#EAF7EF] rounded-2xl p-5 md:p-6 text-left flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <span class="text-4xl md:text-5xl font-black text-[#2ecc712b]">02</span>
            <div>
              <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight">Sécurité</h3>
              <p class="text-gray-600 text-base md:text-[18px] leading-snug">Protection des transactions et des données.</p>
            </div>
          </div>
          <div
            class="bg-[#EAF7EF] rounded-2xl p-5 md:p-6 text-left flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <span class="text-4xl md:text-5xl font-black text-[#2ecc712b]">03</span>
            <div>
              <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight">Fiabilité</h3>
              <p class="text-gray-600 text-base md:text-[18px] leading-snug">Une plateforme stable et performante.</p>
            </div>
          </div>
          <div
            class="bg-[#EAF7EF] rounded-2xl p-5 md:p-6 text-left flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <span class="text-4xl md:text-5xl font-black text-[#2ecc712b]">04</span>
            <div>
              <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight">Innovation</h3>
              <p class="text-gray-600 text-base md:text-[18px] leading-snug">Amélioration continue de nos services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- A QUI S'ADRESSE LEEKPAY -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="border border-[#2ECC71] rounded-3xl p-6 md:p-10 grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-center">
          <div
            class="w-full self-stretch"
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <img
              src="~/assets/img/about/img_a_qui_saddresse.png"
              alt="Personnes ciblées par LeekPay"
              class="w-full h-full object-cover rounded-2xl border border-[#2ECC71] shadow-md"
            />
          </div>
          <div
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <h3 class="text-[#2ECC71] text-2xl md:text-[32px] font-bold italic mb-4 leading-tight">À qui s’adresse LeekPay ?</h3>
            <p class="text-gray-700 leading-[1.3] text-[18px] md:text-[20px]">
              <span class="text-[#2ECC71] font-semibold italic">LeekPay</span> s’adresse aux freelances, entrepreneurs, e-commerçants,
              commerçants, prestataires de services, écoles, associations et entreprises souhaitant encaisser
              rapidement et gérer leurs paiements simplement.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA CONTACT -->
    <section id="contact" class="py-10 md:py-12 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl p-7 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
          v-motion-visibility="{ once: true, threshold: 0.2 }"
        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-[24px] md:text-[32px] font-bold italic mb-2 leading-tight">Une question ? Un projet ?</h3>
            <p class="text-white/95 text-[17px] md:text-[19px] leading-snug">
              Notre équipe est à votre écoute pour vous accompagner
              <br class="hidden md:block" />
              dans votre utilisation de <span class="font-semibold italic text-white">LeekPay</span>
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send/?phone=221787814572&text=Bonjour,%20j'ai%20une%20question%20concernant%20LeekPay"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white text-[#2ECC71] px-10 py-4 rounded-full text-lg font-bold shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 inline-flex items-center"
          >
            Contactez-nous
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
  title: 'À propos',
  ogTitle: 'À propos - LeekPay',
  description: 'Découvrez LeekPay, notre vision, nos valeurs et la solution simple pour encaisser en ligne.',
  ogDescription: 'Découvrez LeekPay, notre vision, nos valeurs et la solution simple pour encaisser en ligne.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>
