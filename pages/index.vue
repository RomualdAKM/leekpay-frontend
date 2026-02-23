<template>
  <ClientOnly>
  <div class="font-sans">
    <!-- HERO SECTION -->
    <section class="py-8 md:py-36 px-6 md:px-16 bg-white overflow-hidden">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-16 md:gap-0 items-start">
          <div 
            class="max-w-xl"
            v-motion="{
              initial: { opacity: 0, x: -90 },
              visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
            }"

          >
            <h1 class="text-3xl md:text-4xl lg:text-[48px] font-bold text-gray-900 leading-[1.2] mb-8">
              <span class="text-[#F39C12] italic">Encaissez</span>, <span class="text-[#F39C12] italic">vendez</span><br>
              et <span class="text-[#F39C12] italic">facturez</span> en ligne<br>
              en toute simplicité
            </h1>
            <p class="text-gray-900 text-base font-semibold mb-8">
              Un seul outil pour créer vos liens de paiement,<br>
              pages de vente et factures numériques,<br>
              sans site web ni compétence technique.
            </p>
            <NuxtLink
              to="/register"
              class="inline-block bg-[#27AE60] text-white px-7 py-3 rounded-md font-medium hover:bg-[#27AE60] transition text-base"
            >
              Commencer gratuitement
            </NuxtLink>
          </div>
          <div 
            class="relative -ml-2 md:-ml-16 -mr-34 md:-mr-24 lg:-mr-34"
            v-motion="{
              initial: { opacity: 0, x: 90, scale: 0.98 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
            }"

          >
            <img
              src="~/assets/ressource_new_landing_page/dashboard.png"
              alt="Dashboard LeekPay"
              class="w-full min-w-[600px] md:min-w-[700px] h-auto md:h-[500px] border border-gray-400 transform rotate-6"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- USE CASES SECTION -->
<section class="py-16 px-6 md:px-12 bg-white">
  <div class="container mx-auto">
    <h2 
      class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
      v-motion="{
        initial: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 600, easing: 'easeOut' } }
      }"

    >
      Dans quels cas utiliser <span class="text-[#2ECC71] italic">LeekPay</span> ?
    </h2>

    <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <!-- Vente en ligne -->
      <div 
        class="relative bg-[#2ECC7142] rounded-xl p-8 pt-12"
        v-motion="{
          initial: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 0 } }
        }"

      >
        <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
          <img src="~/assets/ressource_new_landing_page/Frame_3.png" alt="" class="w-12 h-12" />
        </div>
        <div class="ml-12">
          <span class="inline-block bg-[#2ECC7142] text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
            Vente en ligne
          </span>
          <p class="text-gray-800 text-base leading-relaxed">
            Crée des <strong>liens de paiement</strong> et <strong>des pages de vente</strong> pour encaisser facilement depuis ton site, WhatsApp ou les réseaux sociaux.
          </p>
        </div>
      </div>

      <!-- Facturation -->
      <div 
        class="relative bg-[#2ECC7142] rounded-xl p-8 pt-12 pr-20 md:pr-8"
        v-motion="{
          initial: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
        }"

      >
        <div class="ml-0">
          <span class="inline-block bg-[#2ECC7142] text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
            Facturation
          </span>
          <p class="text-gray-800 text-base leading-relaxed">
            Émets des <strong>factures numériques</strong> payables en ligne et reçois tes paiements plus rapidement, sans démarches complexes.
          </p>
        </div>
        <div class="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
          <img src="~/assets/ressource_new_landing_page/Frame_1.png" alt="" class="w-12 h-12" />
        </div>
      </div>

      <!-- Services -->
      <div 
        class="relative bg-[#2ECC7142] rounded-xl p-8 pt-12"
        v-motion="{
          initial: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
        }"

      >
        <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
          <img src="~/assets/ressource_new_landing_page/Frame_4.png" alt="" class="w-12 h-12" />
        </div>
        <div class="ml-12">
          <span class="inline-block bg-[#2ECC7142] text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
            Services
          </span>
          <p class="text-gray-800 text-base leading-relaxed">
            <strong>Encaisse les paiements</strong> pour tes prestations, consultations ou missions, de façon simple et sécurisée.
          </p>
        </div>
      </div>

      <!-- Collecte -->
      <div 
        class="relative bg-[#2ECC7142] rounded-xl p-8 pt-12 pr-20 md:pr-8"
        v-motion="{
          initial: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }
        }"

      >
        <div class="ml-0">
          <span class="inline-block bg-[#2ECC7142] text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
            Collecte
          </span>
          <p class="text-gray-800 text-base leading-relaxed">
            <strong>Collecte des paiements</strong> pour tes formations, événements,
            <br/> dons ou abonnements en toute simplicité.
          </p>
        </div>
        <div class="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
          <img src="~/assets/ressource_new_landing_page/Frame_2.png" alt="" class="w-10 h-10 md:w-12 md:h-12" />
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- PAYMENT METHODS SECTION -->
    <section class="bg-white">
      <div class="container mx-auto text-center">
        <h2 class="text-xl md:text-3xl font-bold mb-2">
          <em class="text-[#27AE60] italic">Encaissements et paiements</em>
        </h2>
        <p class="text-gray-900 text-base md:text-2xl font-bold mb-4">flexibles via plusieurs réseaux</p>

        <div class="overflow-hidden py-2 md:py-6 bg-gray-200">
          <div class="flex animate-marquee whitespace-nowrap">
            <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-6 md:h-16 mx-0.5 md:mx-1" />
            <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-6 md:h-16 mx-0.5 md:mx-1" />
            <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-6 md:h-16 mx-0.5 md:mx-1" />
          </div>
        </div>
      </div>
    </section>

    <!-- FEES BANNER -->
    <section class="py-12 md:py-20 px-6 md:px-12 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
    <div class="container mx-auto">
        <div 
          class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          v-motion="{
            initial: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 700 } }
          }"

        >
        <!-- Le gros 3% -->
        <div class="text-white">
            <h2 class="text-[80px] md:text-[220px] font-black leading-none italic">
            3%
            </h2>
        </div>

        <!-- Le texte explicatif -->
        <div class="text-white max-w-2xl text-center md:text-left">
            <p class="text-lg md:text-3xl font-bold leading-tight mb-1 md:mb-2">
            <span class="italic">DE FRAIS DE RETRAIT SEULEMENT</span>
            </p>
            <p class="text-lg md:text-3xl font-bold leading-tight mb-1">
            VOUS PERMETTANT DE CONSERVER
            </p>
            <p class="text-lg md:text-3xl font-bold leading-tight">
            <span class="text-[#FFD700]">JUSQU'À 97 %</span> DU PAIEMENT REÇU
            </p>
        </div>
        </div>
    </div>
    </section>

    <!-- FEATURES SECTION -->
    <section id="fonctionnalites" class="py-16 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <div 
          class="text-center mb-12"
          v-motion="{
            initial: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
          <span class="inline-flex items-center gap-2 border border-gray-900 rounded-full px-2 py-1 text-sm font-bold mb-6">
            <span class="w-5 h-5 bg-gray-900 rounded-full"></span>
            Encaissez en ligne, simplement
          </span>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Créez, gérez et recevez<br>vos paiements en toute simplicité
          </h2>
          <p class="text-gray-800 max-w-2xl mx-auto">
            <em class="text-[#33CC66] italic font-bold">LeekPay</em> vous permet d'encaisser en ligne grâce à des liens de paiement, des pages de vente, des factures numériques et une API puissante, le tout sur une seule plateforme.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
          <!-- Liens de paiement -->
          <div
            v-motion="{
              initial: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
          
            <img
              src="~/assets/ressource_new_landing_page/Liens-de-paiement 2.png"
              alt="Liens de paiement"
              class="w-full h-auto rounded-lg mb-4"
            />
            <NuxtLink to="/payment-links" class="w-full bg-[#2ECC71] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#27AE60] transition-colors inline-flex items-center justify-center">
              Voir les détails
            </NuxtLink>
          </div>

          <!-- Pages de vente -->
          <div
            v-motion="{
              initial: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
           
            <img
              src="~/assets/ressource_new_landing_page/Pages-de-vente 3.png"
              alt="Pages de vente"
              class="w-full h-auto rounded-lg mb-4"
            />
            <NuxtLink to="/sales-pages" class="w-full bg-[#F39C12] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#E67E22] transition-colors inline-flex items-center justify-center">
              Voir les détails
            </NuxtLink>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <!-- Factures numériques -->
          <div
            v-motion="{
              initial: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
           
            <img
              src="~/assets/ressource_new_landing_page/Factures-numériques 3.png"
              alt="Factures numériques"
              class="w-full h-auto rounded-lg mb-4"
            />
            <NuxtLink to="/invoices" class="w-full bg-[#CD7F32] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B8701F] transition-colors inline-flex items-center justify-center">
              Voir les détails
            </NuxtLink>
          </div>

          <!-- API LeekPay -->
          <div
            v-motion="{
              initial: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"

          >
            
            <img
              src="~/assets/ressource_new_landing_page/API-LeekPay 2.png"
              alt="API LeekPay"
              class="w-full h-auto rounded-lg mb-4"
            />
            <NuxtLink to="/api" class="w-full bg-[#0EA5E9] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#0284C7] transition-colors inline-flex items-center justify-center">
              Voir les détails
            </NuxtLink>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/register"
            class="inline-block bg-[#33CC66] text-white px-8 py-3.5 rounded-md font-medium hover:bg-[#27AE60] transition"
          >
            Commencer gratuitement
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="py-16 px-6 md:px-12 bg-[#2ECC7126]">
      <div class="container mx-auto text-center">
        <h2 
          class="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          v-motion="{
            initial: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
          Comment ça marche ?
        </h2>
        <p 
          class="text-gray-600 max-w-2xl mx-auto mb-12"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }
          }"

        >
          Liens de paiement, pages de vente ou factures numériques :<br>
          <em class="text-[##33CC66] not-italic italic font-semibold">LeekPay</em> suit toujours la même logique, adaptée à chaque usage.
        </p>

        <div class="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <!-- Créez -->
          <div 
            class="flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 0 } }
            }"

          >
            <div class="w-20 h-20 bg-[#33CC66] rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Créez</h3>
            <p class="text-gray-600 text-sm">
              Créez un lien de paiement, une page de vente ou une facture numérique en quelques clics.
            </p>
          </div>

          <!-- Diffusez -->
          <div 
            class="flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }
            }"

          >
            <div class="w-20 h-20 bg-[#33CC66] rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Diffusez</h3>
            <p class="text-gray-600 text-sm">
              Partagez vos liens et facture ou générez du trafic vers vos pages de vente grâce aux outils de diffusion et de suivi.
            </p>
          </div>

          <!-- Encaissez -->
          <div 
            class="flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 300 } }
            }"

          >
            <div class="w-20 h-20 bg-[#33CC66] rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Encaissez</h3>
            <p class="text-gray-600 text-sm">
              Vos clients paient en ligne et vous recevez votre argent en toute sécurité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="support" class="py-16 px-6 md:px-12 mt-25">
    <div class="container mx-auto max-w-3xl">
        <div 
          class="bg-[#D4F4DD] rounded-[30px] p-8 md:p-12"
          v-motion="{
            initial: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"

        >
        <h2 class="text-3xl md:text-4xl font-black text-center text-gray-900 mb-6 italic">
            FAQs
        </h2>
        <p class="text-center text-gray-900 mb-12 text-base md:text-lg">
            Tout ce que vous devez savoir pour accepter<br class="hidden md:block">
            des paiements et vendre en ligne avec <span class="text-[#2ECC71] font-bold italic">LeekPay</span>.
        </p>

        <div class="space-y-3">
            <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
            <button
                @click="faq.isOpen = !faq.isOpen"
                class="w-full flex items-center justify-between p-6 text-left"
            >
                <span class="font-semibold text-gray-900 text-base md:text-lg pr-4">{{ faq.question }}</span>
                <span class="w-10 h-10 bg-[#2ECC71] rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                    v-if="faq.isOpen"
                    class="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                </svg>
                <svg
                    v-else
                    class="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                </span>
            </button>
            <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
            >
                <div v-if="faq.isOpen" class="px-6 pb-6">
                <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                </div>
            </transition>
            </div>
        </div>
        </div>
    </div>
    </section>

<!-- CTA SECTION -->
<section id="contact" class="py-16 px-6 md:px-12">
  <div class="container mx-auto max-w-6xl">
    <div 
      class="relative bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    >
      <div class="grid md:grid-cols-2 gap-8 items-center relative z-10">
        <!-- Left: World Map -->
        <div class="flex items-center justify-center">
          <img 
            src="~/assets/ressource_new_landing_page/WorldMap.png" 
            alt="World Map"
            class="w-full max-w-md mx-auto"
          />
        </div>

        <!-- Right: Content - TOUJOURS CENTRÉ -->
        <div class="text-white text-center">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 italic">
            Prêt à commencer<br>
            l'aventure avec LeekPay ?
          </h2>
          <p class="text-base md:text-lg mb-8 opacity-95 leading-relaxed">
            Crée des liens de paiement,<br>
            des pages de vente et<br>
            des factures numériques<br>
            en toute simplicité.
          </p>
          <NuxtLink 
            to="/auth/register"
            class="inline-block bg-white text-[#2ECC71] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
          >
            Créer mon compte
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="py-8 px-6 md:px-12 bg-[#0A1F44]">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img
          src="~/assets/ressource_new_landing_page/Mascotte LeekPay 1.png"
          alt="LeekPay"
          class="w-12 h-12"
        />
        <span class="text-white text-2xl font-bold">LeekPay</span>
      </div>

      <!-- Social Icons -->
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
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  ssr: false
})

useSeoMeta({
  title: 'LeekPay - Encaissez, vendez et facturez en ligne',
  ogTitle: 'LeekPay - Encaissez, vendez et facturez en ligne',
  description: 'Un seul outil pour créer vos liens de paiement, pages de vente et factures numériques, sans site web ni compétence technique.',
  ogDescription: 'Un seul outil pour créer vos liens de paiement, pages de vente et factures numériques, sans site web ni compétence technique.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
})

const faqs = ref([
  {
    question: "Qu'est-ce que LeekPay ?",
    answer: "LeekPay est une plateforme de paiement en ligne qui vous permet d'encaisser vos clients facilement grâce à des liens de paiement, des pages de vente, des factures numériques et une API de paiement, sans avoir besoin de site web ni de compétences techniques.",
    isOpen: false
  },
  {
    question: "À qui s'adresse LeekPay ?",
    answer: "LeekPay est conçu pour les entrepreneurs, freelances, commerçants, PME, formateurs, vendeurs en ligne et startups qui souhaitent recevoir des paiements rapidement et simplement, en ligne ou via mobile.",
    isOpen: false
  },
  {
    question: "Qu'est-ce qu'un lien de paiement LeekPay ?",
    answer: "Un lien de paiement est un lien unique et sécurisé que vous générez pour encaisser un montant précis. Il suffit de le partager avec votre client pour qu'il puisse payer en quelques clics.",
    isOpen: false
  },
  {
    question: "Où puis-je utiliser un lien de paiement ?",
    answer: "Vous pouvez utiliser vos liens de paiement partout : WhatsApp, Email, Facebook & Instagram, Stories et publications, SMS. Le lien fonctionne sur tous les appareils (smartphone, tablette, ordinateur).",
    isOpen: false
  },
  {
    question: "Comment fonctionnent les pages de vente LeekPay ?",
    answer: "Les pages de vente vous permettent de présenter vos produits ou services (description, prix, images) et d'encaisser vos clients directement depuis la page. Aucun site web n'est nécessaire : LeekPay héberge votre page et gère le paiement. Vous pouvez également connecter votre propre nom de domaine et configurer vos outils de tracking (Facebook Pixel, Google Analytics, etc.).",
    isOpen: false
  },
  {
    question: "Puis-je créer des factures avec LeekPay ?",
    answer: "Oui. LeekPay vous permet de générer des factures numériques professionnelles que vous pouvez envoyer à vos clients. Ces factures incluent un bouton de paiement, permettant à vos clients de payer immédiatement.",
    isOpen: false
  },
  {
    question: "LeekPay propose-t-il une API de paiement ?",
    answer: "Oui. LeekPay met à disposition une API de paiement pour les développeurs et entreprises souhaitant intégrer les paiements directement dans leur application, site web ou système interne.",
    isOpen: false
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer: "LeekPay prend en charge les moyens de paiement Mobile Money dans plus de 14 pays africains, ainsi que PayPal et les cartes bancaires (Visa, Mastercard) pour les paiements internationaux.",
    isOpen: false
  },
  {
    question: "LeekPay est-il sécurisé ?",
    answer: "Oui. La sécurité est une priorité chez LeekPay. Toutes les transactions sont cryptées, conformes aux normes PCI DSS, et vos données ainsi que vos fonds sont strictement protégés.",
    isOpen: false
  },
  {
    question: "Comment et quand puis-je retirer mes fonds ?",
    answer: "Les demandes de retrait ne sont pas traitées automatiquement. Une fois votre demande effectuée, elle est traitée sous un délai de 24 à 48 heures ouvrées.",
    isOpen: false
  },
  {
    question: "Ai-je besoin de compétences techniques pour utiliser LeekPay ?",
    answer: "Non. LeekPay est conçu pour être simple et intuitif. Vous pouvez créer un lien de paiement, une facture ou une page de vente en quelques minutes, sans aucune compétence technique.",
    isOpen: false
  }
])
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
}

.animate-marquee {
  animation: marquee 15s linear infinite;
}
</style>
