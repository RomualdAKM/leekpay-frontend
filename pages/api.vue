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
              Intégrez les paiements par API simplement
            </span>

            <h1 class="max-w-[620px] text-[34px] sm:text-[36px] md:text-[40px] lg:text-[46px] font-normal leading-[1.12]">
              Intégrez les paiements à
              <br class="hidden md:block" />
              vos solutions grâce à
              <br class="hidden md:block" />
              <span class="md:whitespace-nowrap">une <span class="italic font-bold">API</span> simple et sécurisée</span>
            </h1>

            <p class="text-white/95 text-[18px] md:text-[21px] leading-[1.24]">
              Connectez votre site web, votre application mobile
              <br class="hidden md:block" />
              ou votre logiciel à notre infrastructure de paiement.
              <br class="hidden md:block" />
              Automatisez les encaissements, les notifications
              <br class="hidden md:block" />
              et le suivi des transactions.
            </p>
          </div>

          <div class="mx-auto mt-7 flex w-full max-w-[360px] flex-col gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:flex-wrap">
            <NuxtLink
              to="/docs"
              class="inline-flex w-full items-center justify-center rounded-lg bg-white px-6 py-2.5 text-center text-[16px] font-semibold text-[#2ECC71] shadow-sm transition hover:bg-gray-100 sm:w-auto sm:text-[17px]"
            >
              Voir la documentation
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-center text-[16px] font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:text-[17px]"
            >
              Commencer l'intégration
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
          <!-- Éditeur de code codé (réplique fidèle de la maquette) -->
          <div class="w-full max-w-[440px] md:max-w-[560px] lg:max-w-[620px] bg-white rounded-2xl border border-[#BFE8CF] shadow-lg p-5 md:p-7 text-left" aria-hidden="true">
            <div class="flex items-center gap-2.5 mb-4">
              <span class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#F02D2D]"></span>
              <span class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#F7E733]"></span>
              <span class="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#2ECC71]"></span>
            </div>
            <div class="border-t border-gray-400 mb-4"></div>
            <div class="text-[12px] md:text-[14px] leading-[2] font-medium">
              <p class="text-gray-400">// Initialize LeekPay API</p>
              <p><span class="text-[#2F80ED]">const</span> <span class="text-gray-800">leekpay =</span> <span class="text-[#2F80ED]">new</span> <span class="text-[#EB1C24]">LeekPay</span> <span class="text-gray-800">({</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">apiKey</span>&nbsp;&nbsp;<span class="text-[#27AE60]">"YOUR_API_KEY"</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">environment</span>&nbsp;&nbsp;<span class="text-[#27AE60]">"production"</span></p>
              <p class="text-gray-800">});</p>
              <p>&nbsp;</p>
              <p class="text-gray-400">// Create a payment link</p>
              <p><span class="text-[#2F80ED]">const</span> <span class="text-gray-800">paymentLink =</span> <span class="text-[#2F80ED]">await</span> <span class="text-gray-800">leekpay.paymentLinks.</span><span class="text-[#EB1C24]">create</span><span class="text-gray-800">({</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">amount</span>&nbsp;&nbsp;<span class="text-[#EB1C24]">5000</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">currency</span>&nbsp;&nbsp;<span class="text-[#27AE60]">"XOF"</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">description</span>&nbsp;&nbsp;<span class="text-[#27AE60]">"Online purchase"</span></p>
              <p class="pl-3"><span class="text-[#EB1C24]">redirectUrl</span>&nbsp;&nbsp;<span class="text-[#27AE60]">"https://yourwebsite.com/success"</span></p>
              <p class="text-gray-800">});</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-12 md:py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Pourquoi choisir l’<span class="text-[#2ECC71] italic">API LeekPay</span> ?</h2>
          <p class="text-gray-600 text-[17px] md:text-[19px] max-w-2xl mx-auto">Une intégration simple et sécurisée pour automatiser vos paiements à grande échelle.</p>
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
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Intégration en quelques lignes de code.</p>
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
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Sécurisée</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Chiffrement SSL et conformité aux standards.</p>
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
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Scalable</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Adaptée aux startups comme aux grandes plateformes.</p>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- INTEGRATION SECTION -->
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
            <h2 class="text-[#2ECC71] text-2xl md:text-[36px] font-bold italic mb-3">Intégrez votre solution de paiement</h2>
            <p class="text-gray-700 text-lg md:text-[19px] leading-[1.28]">
              Notre API vous permet de gérer les paiements directement depuis vos applications, sites web ou
              logiciels. Vous pouvez créer des paiements et des liens dynamiques, automatiser les confirmations
              grâce aux webhooks et suivre toutes les transactions en temps réel. Elle intègre un environnement
              de test (sandbox), une gestion sécurisée des clés d'accès et des permissions avancées pour garantir
              des intégrations fiables et sécurisées. L'API s'adapte aussi bien aux projets simples qu'aux
              plateformes à fort volume.
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
              src="~/assets/img/api/img_integrer_api.png"
              alt="Intégrer l'API LeekPay"
              class="w-full h-full object-cover rounded-2xl border border-[#2ECC71]"
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
          En quelques étapes, intégrez notre API à votre application,
          déclenchez des paiements et automatisez la gestion de vos transactions.
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
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Découvrez<br class="hidden md:block" /> la documentation</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">2</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Intégrez<br class="hidden md:block" /> l'API</p>
            </div>

            <div class="flex w-full max-w-[300px] flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center shadow-lg shadow-[#2ECC71]/30">3</div>
              <p class="mt-3 text-[17px] md:text-[18px] text-gray-900 font-semibold leading-[1.2] md:whitespace-nowrap">Configurez<br class="hidden md:block" /> &amp; Partagez</p>
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
              src="~/assets/img/api/img_cas_usage.png"
              alt="Cas d'usage API"
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
              Que vous développiez une application mobile, un SaaS ou une plateforme e-commerce,
              notre API vous permet d'intégrer facilement les paiements et d'automatiser
              vos flux financiers.
            </p>
            <svg
              class="mt-6 w-full max-w-[420px]"
              viewBox="0 0 520 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 28C86 18 170 18 258 18C314 18 360 18 418 18C374 24 326 30 274 35C252 37 236 39 224 42C240 44 262 43 304 39"
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
            <h3 class="text-xl md:text-[30px] font-bold italic mb-1">Démarrez votre intégration dès maintenant</h3>
            <p class="text-white/90 text-lg md:text-[20px] leading-[1.25]">
              Accédez à notre documentation API et commencez
              <br class="hidden md:block" />
              à intégrer les paiements en toute simplicité.
            </p>
          </div>
          <NuxtLink
            to="/docs"
            class="inline-flex w-full justify-center rounded-lg bg-white px-10 py-4 text-lg font-bold text-[#2ECC71] shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95 sm:w-auto"
          >
            Voir la documentation
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
  title: 'API LeekPay',
  ogTitle: 'API LeekPay - Intégrez les paiements',
  description: 'Intégrez les paiements LeekPay à vos applications grâce à une API simple, sécurisée et scalable.',
  ogDescription: 'Intégrez les paiements LeekPay à vos applications grâce à une API simple, sécurisée et scalable.',
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
