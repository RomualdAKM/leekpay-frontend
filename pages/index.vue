<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>

<template>
  <ClientOnly>
    <div class="font-sans">

    <!-- === HERO SECTION ANIMÉE === -->
    <section class="py-4 sm:py-4 px-4 md:px-12 bg-white">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">

          <!-- Colonne Texte (animation slide depuis la gauche) -->
          <div
              v-motion="{
          initial: { opacity: 0, x: -90 },
          visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.25 }"
          >
            <h1 class="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Recevez vos paiements, où que vous soyez.
            </h1>
            <p class="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
               Créez vos liens de paiement et encaissez instantanément. Vos clients paient comme ils le souhaitent : Mobile Money, carte bancaire, PayPal. Une solution adaptée à votre business, <strong>où que se trouvent vos clients</strong>.
            </p>
            <!-- <p class="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
              La plateforme qui vous permet de générer des liens de paiement en 1 clic, de les partager
              sur WhatsApp, réseaux sociaux ou email, et d’encaisser instantanément via Mobile Money ou carte bancaire.
            </p> -->
            <NuxtLink
                to="/register"
                class="bg-amber-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-600 transition mt-2"
                v-motion="{
            initial: { opacity: 0, scale: 0.96 },
            visible: { opacity: 1, scale: 1, transition: { delay: 120, duration: 400 } }
          }"
            >
              Démarrer
            </NuxtLink>
          </div>

          <!-- Colonne Image (animation slide depuis la droite + léger pop) -->
          <div
              class="rounded-xl overflow-hidden"
              v-motion="{
          initial: { opacity: 0, x: 90, scale: 0.98 },
          visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.25 }"
          >
            <img
                src="~/assets/img/ImageBanner.png"
                alt="Illustration principale LeekPay"
                class="w-full h-auto object-contain mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
    <!-- === FIN HERO === -->

    <!-- Section : Dans quels cas utiliser LeekPay ? -->
    <section id="cas-usage" class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">

        <!-- Titre -->
        <h2
            v-motion="{
        initial: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 600, easing: 'easeOut' } }
      }"
            v-motion-visibility="{ once: true }"
            class="text-2xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          Dans quels cas utiliser LeekPay ?
        </h2>

        <!-- Barre de tabs (desktop) -->
        <div class="hidden md:block mb-8">
          <div class="bg-gray-100 rounded-lg p-1 flex justify-center border-b border-gray-200">
            <div class="flex space-x-4">
              <button
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
                  v-motion="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: index * 120, duration: 400 } }
            }"
                  :class="[
              'px-6 py-3 font-medium text-sm transition whitespace-nowrap',
              activeTab === index
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-800'
            ]"
              >
                {{ tab.title }}
              </button>
            </div>
          </div>
        </div>

        <!-- Icônes (mobile) -->
        <div
            class="md:hidden flex justify-center gap-4 mb-8 relative"
            v-motion="{
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 600 } }
      }"
            v-motion-visibility="{ once: true }"
        >
          <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="flex flex-col items-center"
          >
            <button
                @click="activeTab = index"
                class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white
          hover:bg-green-600 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
            >
            <!-- Icône 1: Ventes en ligne -->
            <!-- Icône 0: Formations -->
            <svg v-if="index === 0"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
              <!-- Icône 2: Associations & Dons -->
              <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <!-- Icône 3: Services & Prestations -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </button>

            <!-- Trait sous l'icône -->
            <div
                class="mt-2 w-8 h-1 rounded-full transition-all duration-300"
                :class="activeTab === index ? 'bg-green-600 opacity-100' : 'bg-transparent opacity-0'"
            ></div>
          </div>
        </div>

        <!-- Conteneur du contenu -->
        <div
            class="max-w-5xl mx-auto"
            v-motion="{
        initial: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 600 } }
      }"
            v-motion-visibility="{ once: true }"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

            <!-- Image avec transition douce sur changement d'onglet -->
            <transition name="fade" mode="out-in">
              <img
                  v-if="activeTab === 0"
                  key="img0"
                  src="~/assets/img/formation_consultation.png"
                  alt="Formations & consultations"
                  class="w-full h-auto rounded-xl shadow-md border-2 border-green-500 order-2 md:order-1"
              />
              <img
                  v-else-if="activeTab === 1"
                  key="img1"
                  src="~/assets/img/vente_enligen_rs.png"
                  alt="Ventes en ligne"
                  class="w-full h-auto rounded-xl shadow-md border-2 border-green-500 order-2 md:order-1"
              />
              <img
                  v-else-if="activeTab === 2"
                  key="img2"
                  src="~/assets/img/associations_dons.png"
                  alt="Associations & dons"
                  class="w-full h-auto rounded-xl shadow-md border-2 border-green-500 order-2 md:order-1"
              />
              <img
                  v-else
                  key="img3"
                  src="~/assets/img/services_prestations.png"
                  alt="Services & prestations"
                  class="w-full h-auto rounded-xl shadow-md border-2 border-green-500 order-2 md:order-1"
              />
            </transition>

            <!-- Texte -->
            <transition name="fade" mode="out-in">
              <div key="content" class="space-y-6 order-1 md:order-2">
                <h3 class="text-2xl font-bold" style="color: #2ECC71">
                  {{ tabs[activeTab].title }}
                </h3>
                <p class="text-xl text-gray-700 leading-relaxed">
                  {{ tabs[activeTab].description }}
                </p>
                <ul class="space-y-4">
                  <li
                      v-for="(item, i) in tabs[activeTab].points"
                      :key="i"
                      class="flex items-start text-xl"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-15 w-15 text-green-500 mr-3 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-xl text-gray-700">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Réseaux et agrégateurs – Slider automatique en fondu -->
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <div class="container mx-auto text-center">

        <!-- Titre animé depuis le haut -->
        <h2
            class="text-2xl font-bold text-slate-900 mb-12"
            v-motion="{
        initial: { opacity: 0, y: -40 },
        enter: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut' } }
      }"
        >
          Encaissements et paiements flexibles via plusieurs réseaux
        </h2>

        <div
            class="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            @mouseenter="isPaused = true"
            @mouseleave="isPaused = false"
            @focusin="isPaused = true"
            @focusout="isPaused = false"
            tabindex="0"
            role="region"
            aria-label="Partenaires de paiement"
        >
          <div
              v-for="(partner, index) in partners"
              :key="index"
              class="flex flex-col items-center absolute inset-0 transition-opacity duration-700 ease-in-out"
              :class="{
          'opacity-100 relative': currentPartnerIndex === index,
          'opacity-0 pointer-events-none': currentPartnerIndex !== index
        }"
              :aria-hidden="currentPartnerIndex !== index"
          >
            <!-- Animation manuelle : scale + fade -->
            <div
                class="transform transition-all duration-500 ease-out"
                :class="{
            'scale-100 translate-y-0': currentPartnerIndex === index,
            'scale-95 translate-y-5': currentPartnerIndex !== index
          }"
            >
              <img
                  :src="partner.logo"
                  :alt="partner.name"
                  class="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md object-contain
                   hover:scale-110 hover:-translate-y-1 cursor-pointer transition-transform duration-300"
              />
              <!-- <span class="mt-4 text-lg font-medium text-gray-800">{{ partner.name }}</span> -->
            </div>
          </div>

          <!-- Points de navigation -->
          <div class="flex justify-center gap-2 mt-8 relative z-10">
            <button
                v-for="(_, i) in partners"
                :key="i"
                @click="goToPartner(i)"
                :aria-label="`Voir ${partners[i].name}`"
                class="w-3 h-3 rounded-full transition-all"
                :class="currentPartnerIndex === i ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-500'"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités -->
    <section id="fonctionnalites" class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">

        <!-- Titre principal animé au scroll -->
        <div class="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-4 mb-16 text-center md:text-left"
             v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <h2
              class="text-3xl font-bold text-slate-900 leading-tight"
              v-motion="{
          initial: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut' } }
        }"
          >
            De la création du lien au retrait de vos fonds,
          </h2>
          <em
              class="text-orange-500 font-medium text-2xl not-italic relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-orange-300"
              v-motion="{
          initial: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }
        }"
          >
            tout devient facile.
          </em>
          <img
              src="~/assets/img/Mascotte_LeekPay.png"
              alt="Mascotte LeekPay"
              class="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-md mt-2 md:mt-0"
              v-motion="{
          initial: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 800, delay: 200 } }
        }"
          />
        </div>

        <!-- Wrapper global -->
        <div class="space-y-20">

          <!-- Fonctionnalité 1 : image à gauche -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition md:mx-auto md:max-w-6xl">
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: -60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <img
                  src="~/assets/img/creer_partage_partout.png"
                  alt="Création de liens"
                  class="w-auto h-auto lg:max-h-[420px] object-contain rounded-xl shadow-md ml-auto border-4 border-green-100 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
              />
            </div>
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: 60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <div class="max-w-xl mx-auto">
                <div class="flex items-center mb-4">
                  <div class="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
                  <h2 class="text-3xl font-bold text-slate-900">Créez vos liens et partagez-les partout</h2>
                </div>
                <p class="text-lg text-gray-800 leading-relaxed mb-4">
                  Créez en quelques secondes un lien de paiement adapté à vos besoins : montant fixe ou libre, description claire,fichier pdf, lien de redirection, image, expiration... Tout est pensé pour vous faciliter la vie.
                </p>
                <p class="text-lg text-gray-800 leading-relaxed">
                  Diffusez vos liens de paiement sur WhatsApp, SMS, email ou réseaux sociaux, et offrez à vos clients une expérience fluide où qu'ils soient.
                </p>
              </div>
            </div>
          </div>

          <!-- Fonctionnalité 2 : image à droite -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition md:mx-auto md:max-w-6xl">
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: -60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <div class="max-w-xl mx-auto md:ml-auto">
                <div class="flex items-center mb-4">
                  <div class="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
                  <h2 class="text-3xl font-bold text-slate-900">Retraits rapides et flexibles</h2>
                </div>
                <p class="text-lg text-gray-800 leading-relaxed">
                  Retirez vos fonds facilement via Mobile Money ou carte bancaire, avec historique détaillé et confirmation instantanée.
                </p>
              </div>
            </div>
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: 60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <img
                  src="~/assets/img/retrait_rapide_flexible.png"
                  alt="Retraits rapides"
                  class="w-auto h-auto lg:max-h-[420px] object-contain rounded-xl shadow-md mr-auto border-4 border-green-100 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
              />
            </div>
          </div>

          <!-- Fonctionnalité 3 : image à gauche -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition md:mx-auto md:max-w-6xl">
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: -60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <img
                  src="~/assets/img/suivi_gestion.png"
                  alt="Suivi en temps réel"
                  class="w-auto h-auto lg:max-h-[420px] object-contain rounded-xl shadow-md ml-auto border-4 border-green-100 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
              />
            </div>
            <div v-motion-visibility="{ once: true, threshold: 0.25 }"
                 v-motion="{
               initial: { opacity: 0, x: 60 },
               visible: { opacity: 1, x: 0, transition: { duration: 800, easing: 'easeOut' } }
             }"
            >
              <div class="max-w-xl mx-auto">
                <div class="flex items-center mb-4">
                  <div class="w-1 h-8 bg-green-600 rounded-full mr-3"></div>
                  <h2 class="text-3xl font-bold text-slate-900">Suivi et gestion en temps réel</h2>
                </div>
                <p class="text-lg text-gray-800 leading-relaxed mb-4">
                  Gardez toujours un œil sur vos performances : chiffre d’affaires, nombre de visiteurs, montants collectés. Un tableau de bord simple et intuitif.
                </p>
                <p class="text-lg text-gray-800 leading-relaxed">
                  Accédez à vos statistiques en temps réel, exportez vos données, et gérez vos paiements depuis n’importe quel appareil.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Comment ça marche ? -->
    <section id="comment-ca-marche" class="py-20 px-6 md:px-12 bg-green-50">
      <div class="container mx-auto">

        <!-- Titre principal -->
        <h2
            class="text-3xl font-bold text-slate-900 mb-4 text-center"
            v-motion="{
        initial: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut' } }
      }"
            v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          Comment ça marche ?
        </h2>
        <p
            class="text-slate-700 text-center mb-12 max-w-2xl mx-auto text-lg"
            v-motion="{
        initial: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }
      }"
            v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          Trois actions suffisent pour encaisser vos paiements
        </p>

        <!-- Étapes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          <!-- Étape 1 -->
          <div
              class="flex flex-col items-center text-center group cursor-pointer"
              v-motion="{
          initial: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut', delay: 0 } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.25 }"
              @mouseenter="$event.currentTarget.classList.add('transform', '-translate-y-2')"
              @mouseleave="$event.currentTarget.classList.remove('transform', '-translate-y-2')"
          >
            <!-- Icône animée -->
            <div
                class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>

            <!-- Titre -->
            <h3
                class="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600"
            >
              Créez
            </h3>

            <!-- Description -->
            <p class="text-base text-gray-800 mb-4 max-w-xs mx-auto text-center"
               v-motion="{
             initial: { opacity: 0, y: 20 },
             enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 100, ease: 'easeOut' } }
           }">
              Personnalisez votre lien de paiement depuis votre tableau de bord.
            </p>

            <!-- Flèche animée -->
            <div
                class="w-6 h-6 mb-3 animate-bounce"
                :class="{ 'animate-pulse': isHoveringStep1 }"
                @mouseenter="isHoveringStep1 = true"
                @mouseleave="isHoveringStep1 = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <!-- Image -->
            <div
                class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
            >
              <img
                  src="~/assets/img/how_creer.png"
                  alt="Étape 1"
                  class="w-4/5 h-auto mx-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>

          <!-- Étape 2 -->
          <div
              class="flex flex-col items-center text-center group cursor-pointer"
              v-motion="{
          initial: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut', delay: 150 } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.25 }"
              @mouseenter="$event.currentTarget.classList.add('transform', '-translate-y-2')"
              @mouseleave="$event.currentTarget.classList.remove('transform', '-translate-y-2')"
          >
            <div
                class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
              Partagez
            </h3>
            <p class="text-base text-gray-800 mb-4 max-w-xs mx-auto text-center"
               v-motion="{
             initial: { opacity: 0, y: 20 },
             enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 100, ease: 'easeOut' } }
           }">
              Diffusez-le par WhatsApp, SMS, email ou réseaux sociaux.
            </p>
            <div
                class="w-6 h-6 mb-3 animate-bounce"
                :class="{ 'animate-pulse': isHoveringStep2 }"
                @mouseenter="isHoveringStep2 = true"
                @mouseleave="isHoveringStep2 = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
                class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
            >
              <img
                  src="~/assets/img/how_partager.png"
                  alt="Étape 2"
                  class="w-4/5 h-auto mx-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>

          <!-- Étape 3 -->
          <div
              class="flex flex-col items-center text-center group cursor-pointer"
              v-motion="{
          initial: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut', delay: 300 } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.25 }"
              @mouseenter="$event.currentTarget.classList.add('transform', '-translate-y-2')"
              @mouseleave="$event.currentTarget.classList.remove('transform', '-translate-y-2')"
          >
            <div
                class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
              Encaissez
            </h3>
            <p class="text-base text-gray-800 mb-4 mb-4 max-w-xs mx-auto text-center"
               v-motion="{
             initial: { opacity: 0, y: 20 },
             enter: { opacity: 1, y: 0, transition: { duration: 600, delay: 100, ease: 'easeOut' } }
           }">
              Recevez vos paiements instantanément et suivez-les en temps réel.
            </p>
            <div
                class="w-6 h-6 mb-3 animate-bounce"
                :class="{ 'animate-pulse': isHoveringStep3 }"
                @mouseenter="isHoveringStep3 = true"
                @mouseleave="isHoveringStep3 = false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
                class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
            >
              <img
                  src="~/assets/img/how_encaisser.png"
                  alt="Étape 3"
                  class="w-4/5 h-auto mx-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>
        </div>

        <!-- Bouton Démarrer animé -->
        <div
            class="text-center"
            v-motion="{
        initial: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }
      }"
            v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          <NuxtLink
              to="/register"
              class="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Démarrer
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- FAQ Interactive (Accordéon) -->
    <section id="faq" class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-3xl">

        <h2
            class="text-3xl font-bold text-center text-slate-900 mb-16"
            v-motion="{
        initial: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 800, easing: 'easeOut' } }
      }"
            v-motion-visibility="{ once: true, threshold: 0.25 }"
        >
          Questions fréquemment posées
        </h2>

        <div class="space-y-6">
          <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="border-b border-gray-200 pb-6"
              @click="faq.isOpen = !faq.isOpen"
              :aria-expanded="faq.isOpen"
              role="button"
              tabindex="0"
              @keydown.enter.space.prevent="faq.isOpen = !faq.isOpen"
              v-motion="{
          initial: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 700, easing: 'easeOut', delay: index * 100 } }
        }"
              v-motion-visibility="{ once: true, threshold: 0.2 }"
          >
            <div class="flex items-start cursor-pointer group">
          <span
              class="text-green-500 mr-3 text-xl mt-1 transition-transform duration-300"
              :class="{ 'rotate-45': faq.isOpen }"
          >
            {{ faq.isOpen ? '−' : '+' }}
          </span>
              <div>
                <h3 class="text-xl font-medium text-slate-900 group-hover:text-green-500 transition-colors duration-200">
                  {{ faq.question }}
                </h3>
                <Transition name="fade">
                  <p
                      v-if="faq.isOpen"
                      class="text-lg text-gray-700 mt-4 leading-relaxed"
                  >
                    {{ faq.answer }}
                  </p>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 md:px-12 bg-gray-900">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <!-- Logo et nom -->
          <div class="flex items-center gap-3">
            <img 
              src="~/assets/img/Mascotte_LeekPay.png" 
              alt="Logo LeekPay" 
              class="w-12 h-12 rounded-full"
            />
            <span class="text-2xl font-bold text-white">LeekPay</span>
          </div>

          <!-- Réseaux sociaux -->
          <div class="flex items-center gap-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>

          <!-- Copyright -->
          <div class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} LeekPay. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Désactiver complètement le SSR pour cette page
definePageMeta({
  ssr: false
})

// Gestion de l'onglet actif
const activeTab = ref(0)

// Configuration SEO
useSeoMeta({
  title: 'La solution de paiement simplifiée pour l\'Afrique',
  ogTitle: 'LeekPay - La solution de paiement simplifiée pour l\'Afrique',
  description: 'Créez vos liens de paiement en quelques secondes et encaissez vos clients via Mobile Money, Carte Bancaire et PayPal. Idéal pour les vendeurs, formateurs et associations.',
  ogDescription: 'Créez vos liens de paiement en quelques secondes et encaissez vos clients via Mobile Money, Carte Bancaire et PayPal. Idéal pour les vendeurs, formateurs et associations.',
  ogImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'LeekPay - La solution de paiement simplifiée',
  twitterDescription: 'Recevez vos paiements partout en Afrique et à l\'international.',
  twitterImage: 'https://leekpay.me/Logo_de_LeekPay_avec_arriere-plan.png',
})

const tabs = ref([
  {
    title: "Ventes en ligne & réseaux sociaux",
    description: "Générez des liens de paiement pour vendre vos produits digitaux ou services sur Instagram, WhatsApp, Facebook…",
    points: [
      "Créez un lien personnalisé pour chaque produit ou service",
      "Acceptez les paiements via Mobile Money (+21 pays en Afrique), carte bancaire ou PayPal",
      "Suivez les ventes en temps réel depuis votre tableau de bord"
    ]
  },
  {
    title: "Formations & consultations",
    description: "Encaissez vos frais de formation, ateliers ou consultations en toute simplicité.",
    points: [
      "Partagez un lien de paiement directement aux étudiants ou clients...",
      "Offrez la possibilité de régler par Mobile Money, carte bancaire ou PayPal, avec un suivi instantané et sécurisé."
    ]
  },
  {
    title: "Associations & dons",
    description: "Collectez des dons ou contributions pour vos projets, événements ou associations.",
    points: [
      "Créez un lien de don unique et partagez-le sur vos réseaux",
      "Récevez les fonds immédiatement, même sans site web",
      "Donnez la possibilité de payer par Mobile Money, carte bancaire ou PayPal"
    ]
  },
  {
    title: "Services & prestations diverses",
    description: "Facturez vos services professionnels, freelances ou prestations diverses.",
    points: [
      "Envoyez un lien de paiement à vos clients par email ou message",
      "Personnalisez le montant, la description, image, pdf, et l’URL",
      "Retirez facilement vos fonds vers votre compte"
    ] 
  }
])

const faqs = ref([
  {
    question: "Qu'est-ce qu'un lien de paiement ?",
    answer: "C'est un lien unique et sécurisé que vous générez pour recevoir un paiement spécifique, sans avoir besoin d'un site web ou d'une boutique en ligne.",
    isOpen: false
  },
  {
    question: "Où puis-je utiliser un lien de paiement LeekPay ?",
    answer: "Partout ! Sur WhatsApp, par email, sur les réseaux sociaux (Facebook, Instagram), dans vos stories, ou même en SMS. Le lien fonctionne sur tous les appareils.",
    isOpen: false
  },
  {
    question: "Comment suivre mes paiements ?",
    answer: "Votre tableau de bord LeekPay vous offre une vue d'ensemble en temps réel de tous vos paiements : montants reçus, dates de transaction, statuts, nombre de clics, provenance géographique des visiteurs, et de nombreuses autres informations utiles",
    isOpen: false
  },
  {
    question: "Puis-je personnaliser mon lien de paiement ?",
    answer: "Oui, absolument. Vous avez la possibilité d'ajouter une description détaillée, de fixer un montant précis ou de laisser le choix au client, d'intégrer une image ou un fichier PDF, de configurer un lien de retour personnalisé, et même de personnaliser l'URL de votre page de paiement.",
    isOpen: false
  },
  {
    question: "Comment retirer mes fonds ?",
    answer: "En quelques clics depuis votre tableau de bord. Choisissez entre un virement vers votre compte Mobile Money (Orange Money, MTN Mobile Money, etc.) ou vers votre carte bancaire.",
    isOpen: false
  },
  {
    question: "Est-ce sécurisé ?",
    answer: "Oui, la sécurité est notre priorité. Toutes les transactions sont cryptées, et nous respectons les normes PCI DSS. Vos fonds sont protégés et vos données confidentielles.",
    isOpen: false
  }
])

// Importer les logos depuis assets
import orangeLogo from '~/assets/img/orange.png'
import mtnLogo from '~/assets/img/mtn.png'
import waveLogo from '~/assets/img/wave_logo.png'
import moovLogo from '~/assets/img/moov_logo.png'
import visaLogo from '~/assets/img/visa.png'
import paypalLogo from '~/assets/img/paypal.png'
import freeMoneyLogo from '~/assets/img/free_money_logo.png'
import airtelLogo from '~/assets/img/airtel_logo.svg'
import mpesaLogo from '~/assets/img/mpesa_logo.png'

// Partenaires de paiement
const partners = ref([
  { name: 'Orange Money', logo: orangeLogo },
  { name: 'MTN Money', logo: mtnLogo },
  { name: 'Wave', logo: waveLogo },
  { name: 'Moov Money', logo: moovLogo },
  { name: 'Cartes bancaires', logo: visaLogo },
  { name: 'PayPal', logo: paypalLogo },
  { name: 'Free Money', logo: freeMoneyLogo },
  { name: 'Airtel Money', logo: airtelLogo },
  { name: 'M-Pesa', logo: mpesaLogo }
])

const currentPartnerIndex = ref(0)
const isPaused = ref(false)
const interval = ref(null)

// Passer au partenaire suivant
const nextPartner = () => {
  currentPartnerIndex.value = (currentPartnerIndex.value + 1) % partners.value.length
}

// Aller à un partenaire spécifique
const goToPartner = (index) => {
  currentPartnerIndex.value = index
}

// Gestion de l’intervalle automatique
onMounted(() => {
  interval.value = setInterval(() => {
    if (!isPaused.value) nextPartner()
  }, 3000)
})

onBeforeUnmount(() => {
  if (interval.value) clearInterval(interval.value)
})
const isHoveringStep1 = ref(false)
const isHoveringStep2 = ref(false)
const isHoveringStep3 = ref(false)
</script>