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
          <h1 class="text-[34px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold text-gray-900 leading-[1.15] mb-6">
            <span class="italic text-[#2ECC71]">LeekPay</span>, la solution simple
            <br class="hidden md:block" />
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
            class="w-full h-auto max-h-[440px] max-w-[360px] md:max-w-[420px] rounded-2xl shadow-xl"
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
            <img
              src="~/assets/img/about/img_ce_que_nous_faisons.png"
              alt="Fonctionnalités LeekPay"
              class="w-full h-auto max-w-[400px] rounded-2xl shadow-md"
            />
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
            class="w-full flex justify-center"
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
            v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <img
              src="~/assets/img/about/img_a_qui_saddresse.png"
              alt="Personnes ciblées par LeekPay"
              class="w-full h-auto max-w-[380px] rounded-2xl shadow-md"
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
              dans votre utilisation de <span class="font-semibold italic text-white">LeekPay</span>.
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
    <footer class="py-8 px-6 md:px-12 bg-[#0A1F44]">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <img
              src="~/assets/ressource_new_landing_page/Mascotte LeekPay 1.png"
              alt="LeekPay"
              class="w-12 h-12"
            />
            <span class="text-white text-2xl font-bold">LeekPay</span>
          </div>

          <div class="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61583629531362"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg class="w-5 h-5 text-[#0A1F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=221787814572&text=Bonjour%2C+j%27ai+besoin+d%27aide+concernant+LeekPay&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg class="w-5 h-5 text-[#0A1F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/leekpay?igsh=MXBtNXM4cWh0NDB2Yw=="
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg class="w-5 h-5 text-[#0A1F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/leekpay-officiel-12937a3b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg class="w-5 h-5 text-[#0A1F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div class="text-white text-sm md:text-base">
            © 2026 LeekPay. Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
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
