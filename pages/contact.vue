<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
    <section class="py-10 md:py-16 px-6 md:px-12 overflow-hidden">
      <div class="container mx-auto max-w-[1100px] grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <div
          class="text-center md:text-left"
          v-motion="{
            initial: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
          }"
        >
          <h1 class="text-[34px] sm:text-[40px] md:text-[48px] font-bold text-gray-900 leading-[1.25] mb-5">
            Contactez <span class="italic text-[#2ECC71]">LeekPay</span>
          </h1>
          <p class="text-gray-700 text-[18px] md:text-[21px] leading-[1.35] max-w-xl mx-auto md:mx-0">
            Une question, un projet ou besoin d'aide sur votre compte ?
            Notre équipe vous répond rapidement, quel que soit le canal.
          </p>
        </div>
        <div
          class="flex justify-center md:justify-end"
          v-motion="{
            initial: { opacity: 0, x: 60, scale: 0.95 },
            visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
          }"
        >
          <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <span class="absolute inset-0 bg-[#2ECC71]/10 rounded-full" aria-hidden="true"></span>
            <img
              src="~/assets/img/Mascotte_LeekPay.webp"
              alt="Mascotte LeekPay"
              class="relative w-44 md:w-56 h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CANAUX DE CONTACT -->
    <section class="pb-12 md:pb-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="grid md:grid-cols-3 gap-5 md:gap-7">
          <!-- WhatsApp -->
          <a
            href="https://api.whatsapp.com/send/?phone=221787814572&text=Bonjour%2C+j%27ai+besoin+d%27aide+concernant+LeekPay&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-[#EAF7EF] rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600 } }
            }"
          >
            <span class="mx-auto mb-5 w-14 h-14 rounded-full bg-[#2ECC71] flex items-center justify-center transition-transform group-hover:scale-110">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight mb-2">WhatsApp</h3>
            <p class="text-gray-600 text-base leading-snug">
              Le moyen le plus rapide d'échanger avec notre équipe support.
            </p>
            <span class="mt-4 inline-flex items-center gap-1 text-[#27AE60] font-semibold text-sm">
              Écrivez-nous
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </span>
          </a>

          <!-- FAQ -->
          <NuxtLink
            to="/#support"
            class="group bg-[#EAF7EF] rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
            }"
          >
            <span class="mx-auto mb-5 w-14 h-14 rounded-full bg-[#2ECC71] flex items-center justify-center transition-transform group-hover:scale-110">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </span>
            <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight mb-2">Questions fréquentes</h3>
            <p class="text-gray-600 text-base leading-snug">
              La réponse à votre question s'y trouve peut-être déjà.
            </p>
            <span class="mt-4 inline-flex items-center gap-1 text-[#27AE60] font-semibold text-sm">
              Consulter la FAQ
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </span>
          </NuxtLink>

          <!-- Réseaux sociaux -->
          <div
            class="bg-[#EAF7EF] rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            v-motion="{
              initial: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
            }"
          >
            <span class="mx-auto mb-5 w-14 h-14 rounded-full bg-[#2ECC71] flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </span>
            <h3 class="text-[#2ECC71] text-[20px] font-bold leading-tight mb-2">Réseaux sociaux</h3>
            <p class="text-gray-600 text-base leading-snug mb-4">
              Suivez nos actualités et écrivez-nous en message privé.
            </p>
            <div class="flex items-center justify-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61583629531362"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#2ECC71] transition-colors group/icon"
              >
                <svg class="w-4 h-4 text-[#27AE60] group-hover/icon:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/leekpay?igsh=MXBtNXM4cWh0NDB2Yw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#2ECC71] transition-colors group/icon"
              >
                <svg class="w-4 h-4 text-[#27AE60] group-hover/icon:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/leekpay-officiel-12937a3b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#2ECC71] transition-colors group/icon"
              >
                <svg class="w-4 h-4 text-[#27AE60] group-hover/icon:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- POURQUOI NOUS CONTACTER -->
    <section class="pb-12 md:pb-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="border border-[#2ECC71] rounded-3xl p-6 md:p-10"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"
        >
          <h2 class="text-[#2ECC71] text-2xl md:text-[32px] font-bold italic mb-4 leading-tight">Dans quels cas nous écrire ?</h2>
          <ul class="grid md:grid-cols-2 gap-x-10 gap-y-4 text-gray-700 text-base md:text-lg">
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Aide sur votre compte</span> : inscription, vérification KYC, paramètres.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Paiements & retraits</span> : suivi d'une transaction ou d'une demande de retrait.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Intégration API</span> : accompagnement technique pour vos développements.</p>
            </li>
            <li class="flex gap-3">
              <span class="text-[#2ECC71] font-bold">+</span>
              <p><span class="font-semibold text-gray-900">Partenariats</span> : collaborations, presse et opportunités business.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-12 md:pb-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl p-7 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"
        >
          <div class="text-white text-center md:text-left">
            <h3 class="text-[24px] md:text-[32px] font-bold italic mb-2 leading-tight">Une question&nbsp;?<br class="md:hidden"> Un projet&nbsp;?</h3>
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
  title: 'Contact',
  ogTitle: 'Contact - LeekPay',
  description: 'Contactez l\'équipe LeekPay : support WhatsApp, réseaux sociaux et FAQ. Nous vous répondons rapidement.',
  ogDescription: 'Contactez l\'équipe LeekPay : support WhatsApp, réseaux sociaux et FAQ. Nous vous répondons rapidement.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>
