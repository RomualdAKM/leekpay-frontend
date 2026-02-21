<template>
  <div class="font-sans bg-white">
    <!-- HERO -->
<section class="bg-[#2ECC71] text-white pt-10 pb-4 md:pt-14 md:pb-6 px-6 md:px-12 overflow-hidden">
  <div class="container mx-auto max-w-[1100px] grid md:grid-cols-[1fr_0.8fr] gap-6 lg:gap-7 items-start">
    <div
      class="flex flex-col"
      v-motion="{
        initial: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
      }"

    >
      <div class="space-y-4">
        <span class="inline-flex w-max items-center gap-3 border-2 border-white/70 bg-white/10 text-white text-[20px] md:text-[22px] font-semibold px-4 md:px-5 py-2 rounded-full leading-none">
          <span class="w-6 h-6 bg-white rounded-full"></span>
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

      <div class="flex flex-wrap gap-3 mt-7">
        <NuxtLink
          to="/dashboard/create-link"
          class="bg-white text-[#2ECC71] px-8 py-3.5 rounded-[24px] text-[19px] md:text-[20px] font-semibold shadow-sm hover:bg-gray-100 transition"
        >
          Créer un lien
        </NuxtLink>
        <button
          type="button"
          class="border-2 border-white text-white px-8 py-3.5 rounded-[24px] text-[19px] md:text-[20px] font-semibold hover:bg-white/10 transition"
        >
          vidéo de démo
        </button>
      </div>
    </div>

    <div
      class="w-full flex justify-center md:justify-end"
      v-motion="{
        initial: { opacity: 0, x: 60, scale: 0.98 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
      }"

    >
      <img
        src="~/assets/img/leekpay_link/img_principal_link.png"
        alt="Liens de paiement LeekPay"
        class="h-auto max-h-[400px] max-w-[320px] md:max-w-[360px] rounded-xl shadow-lg"
      />
    </div>
  </div>
</section>

    <!-- BENEFITS -->
    <section class="py-8 md:py-10 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1000px] grid md:grid-cols-3 gap-6">
        <div
          class="flex items-start gap-3"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          <span class="mt-1 w-5 h-5 rounded-full border-2 border-[#2ECC71] flex items-center justify-center">
            <svg class="w-3 h-3 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Rapide</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Créez un lien de paiement et encaissez en quelques minutes, sans étapes inutiles ni complexité.</p>
          </div>
        </div>

        <div
          class="flex items-start gap-3"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
          }"

        >
          <span class="mt-1 w-5 h-5 rounded-full border-2 border-[#2ECC71] flex items-center justify-center">
            <svg class="w-3 h-3 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Flexible</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Vos clients paient quand et où ils le souhaitent, sur mobile ou ordinateur, sans contrainte.</p>
          </div>
        </div>

        <div
          class="flex items-start gap-3"
          v-motion="{
            initial: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
          }"

        >
          <span class="mt-1 w-5 h-5 rounded-full border-2 border-[#2ECC71] flex items-center justify-center">
            <svg class="w-3 h-3 text-[#2ECC71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <h3 class="text-gray-900 text-[22px] md:text-[24px] font-semibold leading-tight">Sécurisé</h3>
            <p class="text-gray-600 text-[16px] md:text-[18px] leading-[1.28]">Chaque transaction est protégée par des standards de sécurité élevés et fiables.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CREATE LINK SECTION -->
    <section class="py-8 md:py-10 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="bg-[#E9F8EF] rounded-2xl p-6 md:p-8 grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
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
            class="w-full flex justify-center"
            v-motion="{
              initial: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <img
              src="~/assets/img/leekpay_link/img_create_link.png"
              alt="Créer un lien de paiement"
              class="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-8 md:py-10 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px] text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
          v-motion="{
            initial: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          Comment ça marche ?
        </h2>
        <p
          class="text-gray-600 text-xl md:text-[22px] max-w-2xl mx-auto leading-[1.25]"
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
          <div class="hidden md:block absolute left-[12.5%] right-[12.5%] top-7 h-[2px] bg-[#2ECC71]"></div>

          <div class="relative grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-4">
            <div class="flex flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center">1</div>
              <p class="mt-4 text-[18px] md:text-[18px] text-[#2ECC71] font-semibold leading-[1.1] whitespace-nowrap">Crée<br />ton lien</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full border-[3px] border-[#2ECC71] bg-white text-[#2ECC71] text-[20px] italic font-bold leading-none flex items-center justify-center">2</div>
              <p class="mt-4 text-[18px] md:text-[18px] text-[#2ECC71] font-semibold leading-[1.1] whitespace-nowrap">Personnalise<br />les paramètres</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full bg-[#2ECC71] text-white text-[20px] italic font-bold leading-none flex items-center justify-center">3</div>
              <p class="mt-4 text-[18px] md:text-[18px] text-[#2ECC71] font-semibold leading-[1.1] whitespace-nowrap">Partage<br />le lien</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-14 h-14 rounded-full border-[3px] border-[#2ECC71] bg-white text-[#2ECC71] text-[20px] italic font-bold leading-none flex items-center justify-center">4</div>
              <p class="mt-4 text-[18px] md:text-[18px] text-[#2ECC71] font-semibold leading-[1.1] whitespace-nowrap">Le client<br />paie</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- USE CASES -->
    <section class="py-10 md:py-12 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-[1100px]">
        <div class="bg-[#D9EDE2] rounded-2xl p-6 md:p-8 grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 items-center">
          <div
            class="w-full flex justify-center md:justify-start"
            v-motion="{
              initial: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            <img
              src="~/assets/img/leekpay_link/img_use_case_link.png"
              alt="Cas d'usage liens de paiement"
              class="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] h-auto rounded-[22px] border border-[#2ECC71]"
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
    <section class="py-8 md:py-10 px-6 md:px-12">
      <div class="container mx-auto max-w-[1100px]">
        <div
          class="bg-[#2ECC71] rounded-2xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600 } }
          }"

        >
          <div class="text-white">
            <h3 class="text-xl md:text-[30px] font-bold italic mb-1">Tu es prêt à recevoir tes premiers paiements ?</h3>
            <p class="text-white/90 text-lg md:text-[20px] leading-[1.25]">
              Commence dès aujourd'hui et encaisse tes paiements
              <br class="hidden md:block" />
              en toute simplicité.
            </p>
          </div>
          <NuxtLink
            to="/dashboard/create-link"
            class="bg-white text-[#2ECC71] px-6 py-3 rounded-full text-lg font-semibold shadow-sm hover:bg-gray-100 transition"
          >
            Créer un lien
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-8 px-6 md:px-12 bg-[#0A1F44]">
      <div class="container mx-auto max-w-[1000px]">
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
  title: 'Liens de paiement LeekPay',
  ogTitle: 'Liens de paiement LeekPay - Encaissez en ligne',
  description: 'Créez des liens de paiement et encaissez instantanément via mobile money, carte bancaire et wallet.',
  ogDescription: 'Créez des liens de paiement et encaissez instantanément via mobile money, carte bancaire et wallet.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})
</script>
