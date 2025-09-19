<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="font-sans">

    <!-- Hero Section (2 colonnes : texte + image) -->
    <section class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Colonne Texte -->
          <div>
            <!-- Hero Section -->
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Recevez vos paiements, où que vous soyez.
            </h1>
            <p class="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
              La plateforme qui vous permet de générer des liens de paiement en 1 clic, de les partager sur WhatsApp, réseaux sociaux ou email, et d’encaisser instantanément via Mobile Money ou carte bancaire.
            </p>
            <button class="bg-amber-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-600 transition mt-2 shadow-md">
              Démarrer
            </button>
          </div>
          <!-- Colonne Image -->
          <div class="rounded-xl overflow-hidden">
            <img
                src="~/assets/img/ImageBanner.png"
                alt="Illustration principale LeekPay"
                class="w-full h-auto  object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section : Dans quels cas utiliser LeekPay ? -->
    <section class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <!-- Titre -->
        <h2 class="text-4xl font-bold text-slate-900 mb-12 text-center">Dans quels cas utiliser LeekPay ?</h2>

        <!-- Barre de tabs (desktop) — largeur adaptée à l'image + texte -->
        <div class="hidden md:block mb-8">
          <div class="bg-gray-100 rounded-lg p-1 flex justify-center border-b border-gray-200">
            <div class="flex space-x-4">
              <button
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
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
        <div class="md:hidden flex justify-center gap-4 mb-8">
          <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            </svg>
            <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
        </div>

        <!-- Conteneur centré pour le contenu -->
        <div class="max-w-5xl mx-auto">
          <!-- Contenu des onglets -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <!-- Image -->
            <img
                v-if="activeTab === 0"
                src="~/assets/img/formations.png"
                alt="Formations & consultations"
                class="w-full h-auto rounded-xl shadow-md border-2 border-green-500"
            />
            <img
                v-else-if="activeTab === 1"
                src="~/assets/img/formations.png"
                alt="Ventes en ligne"
                class="w-full h-auto rounded-xl shadow-md border-2 border-green-500"
            />
            <img
                v-else-if="activeTab === 2"
                src="~/assets/img/formations.png"
                alt="Associations & dons"
                class="w-full h-auto rounded-xl shadow-md border-2 border-green-500"
            />
            <img
                v-else-if="activeTab === 3"
                src="~/assets/img/formations.png"
                alt="Services & prestations"
                class="w-full h-auto rounded-xl shadow-md border-2 border-green-500"
            />

            <!-- Texte -->
            <div class="space-y-6">
              <h3 class="text-3xl font-bold text-slate-900">
                {{ tabs[activeTab].title }}
              </h3>
              <p class="text-xl text-gray-700 leading-relaxed">
                {{ tabs[activeTab].description }}
              </p>
              <ul class="space-y-4">
                <li v-for="(item, i) in tabs[activeTab].points" :key="i" class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-xl text-gray-700">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Adoption -->
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <div class="container mx-auto text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-12">LeekPay, adopté en Afrique et au-delà.</h2>

        <!-- Wrapper du carrousel -->
        <div class="relative max-w-4xl mx-auto px-8">
          <!-- Conteneur du carrousel -->
          <div ref="carousel" class="flex overflow-x-auto scroll-smooth pb-4 space-x-6 justify-center">
            <!-- Bénin -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-bj text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Bénin</span>
            </div>
            <!-- Côte d'Ivoire -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-ci text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Côte d'Ivoire</span>
            </div>
            <!-- Mali -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-ml text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Mali</span>
            </div>
            <!-- Sénégal -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-sn text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Sénégal</span>
            </div>
            <!-- Togo -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-tg text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Togo</span>
            </div>
            <!-- Burkina Faso -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-bf text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Burkina Faso</span>
            </div>
            <!-- Niger -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-ne text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Niger</span>
            </div>
            <!-- Guinée -->
            <div class="flex flex-col items-center flex-shrink-0">
              <span class="fi fi-gn text-3xl md:text-4xl rounded-lg shadow-sm"></span>
              <span class="text-xs text-gray-600 mt-2 font-medium whitespace-nowrap">Guinée</span>
            </div>
          </div>

          <!-- Flèches de navigation -->
          <button
              @click="scrollLeft"
              class="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition z-10"
              aria-label="Précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
              @click="scrollRight"
              class="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition z-10"
              aria-label="Suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicateurs de points (optionnel) -->
          <div class="flex justify-center mt-6 space-x-2">
            <button
                v-for="(country, index) in countries"
                :key="index"
                @click="scrollToIndex(index)"
                :class="[
            'w-2 h-2 rounded-full transition',
            currentIndex === index ? 'bg-green-500' : 'bg-gray-300'
          ]"
                class="focus:outline-none"
                :aria-label="`Aller à ${country}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités -->
    <section class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <!-- Titre principal avec mascotte -->
        <div class="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-16">
          <h2 class="text-3xl font-bold text-slate-900 leading-tight text-center md:text-left">
            De la création du lien au retrait de vos fonds,
          </h2>
          <span class="bg-orange-500 text-white px-4 py-2 rounded-md font-medium text-lg whitespace-nowrap">
        tout devient facile.
      </span>
          <img
              src="~/assets/img/Mascotte_LeekPay.png"
              alt="Mascotte LeekPay"
              class="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-md"
          />
        </div>

        <!-- Wrapper global -->
        <div class="space-y-20">
          <!-- Fonctionnalité 1 -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
            <div class="rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/creer_partage_partout.png"
                  alt="Création de liens"
                  class="w-auto h-auto max-h-80 md:max-h-96 object-contain rounded-xl shadow-md mx-auto border-4 border-green-100"
              />
            </div>
            <div>
              <div class="flex items-center mb-4">
                <div class="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
                <h2 class="text-3xl font-bold text-slate-900">Créez vos liens et partagez-les partout</h2>
              </div>
              <p class="text-lg text-gray-800 leading-relaxed mb-4">
                Créez en quelques secondes un lien de paiement adapté à vos besoins : montant fixe ou libre, description claire, image, expiration... Tout est pensé pour vous faciliter la vie.
              </p>
              <p class="text-lg text-gray-800 leading-relaxed">
                Diffusez vos liens de paiement sur WhatsApp, SMS, email ou réseaux sociaux, et offrez à vos clients une expérience fluide où qu'ils soient.
              </p>
            </div>
          </div>

          <!-- Fonctionnalité 2 -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
            <div>
              <div class="flex items-center mb-4">
                <div class="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
                <h2 class="text-3xl font-bold text-slate-900">Retraits rapides et flexibles</h2>
              </div>
              <p class="text-lg text-gray-800 leading-relaxed">
                Retirez vos fonds facilement via Mobile Money ou carte bancaire, avec historique détaillé et confirmation instantanée.
              </p>
            </div>
            <div class="rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/retrait_rapide_flexible.png"
                  alt="Retraits rapides"
                  class="w-auto h-auto max-h-80 md:max-h-96 object-contain rounded-xl shadow-md mx-auto border-4 border-green-100"
              />
            </div>
          </div>

          <!-- Fonctionnalité 3 -->
          <div class="grid md:grid-cols-2 gap-12 items-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
            <div class="rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/suivi_gestion.png"
                  alt="Suivi en temps réel"
                  class="w-auto h-auto max-h-80 md:max-h-96 object-contain rounded-xl shadow-md mx-auto border-4 border-green-100"
              />
            </div>
            <div>
              <div class="flex items-center mb-4">
                <div class="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
                <h2 class="text-3xl font-bold text-slate-900">Suivi et gestion en temps réel</h2>
              </div>
              <p class="text-lg text-gray-800 leading-relaxed mb-4">
                Gardez toujours un œil sur vos performances : chiffre d’affaires, montants collectés. Un tableau de bord simple et intuitif.
              </p>
              <p class="text-lg text-gray-800 leading-relaxed">
                Accédez à vos statistiques en temps réel, exportez vos données, et gérez vos paiements depuis n’importe quel appareil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment ça marche ? -->
    <section class="py-20 px-6 md:px-12 bg-green-50">
      <div class="container mx-auto">
        <!-- Titre principal -->
        <h2 class="text-3xl font-bold text-slate-900 mb-4 text-center">Comment ça marche ?</h2>
        <p class="text-slate-700 text-center mb-12 max-w-2xl mx-auto text-lg">
          Trois actions suffisent pour encaisser vos paiements
        </p>

        <!-- Étapes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- Étape 1 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Créez</h3>
            <p class="text-base text-gray-800 mb-4">
              Personnalisez votre lien de paiement <br> depuis votre tableau de bord.
            </p>
            <div class="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/how_creer.png"
                  alt="Étape 1"
                  class="w-full h-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>

          <!-- Étape 2 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Partagez</h3>
            <p class="text-base text-gray-800 mb-4">
              Diffusez-le par WhatsApp, <br> SMS, email ou réseaux sociaux.
            </p>
            <div class="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/how_partager.png"
                  alt="Étape 2"
                  class="w-full h-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>

          <!-- Étape 3 -->
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Encaissez</h3>
            <p class="text-base text-gray-800 mb-4">
              Recevez vos paiements instantanément <br> et suivez-les en temps réel.
            </p>
            <div class="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-xl overflow-hidden">
              <img
                  src="~/assets/img/how_encaisser.png"
                  alt="Étape 3"
                  class="w-full h-auto object-cover border-4 border-green-100 rounded-xl"
              />
            </div>
          </div>
        </div>

        <!-- Bouton Démarrer -->
        <div class="text-center">
          <button class="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-amber-600 transition shadow-lg">
            Démarrer
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Interactive (Accordéon) -->
    <section class="py-12 sm:py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-16">Questions fréquemment posées</h2>
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
          >
            <div class="flex items-start cursor-pointer group">
          <span class="text-green-500 mr-3 text-xl mt-1 transition-transform" :class="{ 'rotate-45': faq.isOpen }">
            {{ faq.isOpen ? '−' : '+' }}
          </span>
              <div>
                <h3 class="text-xl font-medium text-slate-900 group-hover:text-green-500 transition">
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
  </div>
</template>

<script setup>
// Gestion de l'onglet actif
const activeTab = ref(0)
const tabs = ref([
  {
    title: "Formations & consultations",
    description: "Encaissez vos frais de formation, ateliers ou consultations en toute simplicité.",
    points: [
      "Partagez un lien de paiement directement aux étudiants ou clients...",
      "Offrez la possibilité de régler par Mobile Money ou carte bancaire, avec un suivi instantané et sécurisé."
    ]
  },
  {
    title: "Ventes en ligne & réseaux sociaux",
    description: "Générez des liens de paiement pour vendre vos produits ou services sur Instagram, WhatsApp, Facebook…",
    points: [
      "Créez un lien personnalisé pour chaque produit ou service",
      "Acceptez les paiements via Mobile Money ou carte bancaire",
      "Suivez les ventes en temps réel depuis votre tableau de bord"
    ]
  },
  {
    title: "Associations & dons",
    description: "Collectez des dons ou contributions pour vos projets, événements ou associations.",
    points: [
      "Créez un lien de don unique et partagez-le sur vos réseaux",
      "Récevez les fonds immédiatement, même sans site web",
      "Donnez la possibilité de payer par Mobile Money ou carte bancaire"
    ]
  },
  {
    title: "Services & prestations diverses",
    description: "Facturez vos services professionnels, freelances ou prestations diverses.",
    points: [
      "Envoyez un lien de paiement à vos clients par email ou message",
      "Personnalisez le montant, la description et l’URL",
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
    question: "Puis-je personnaliser mon lien de paiement ?",
    answer: "Oui, absolument. Vous pouvez ajouter une description détaillée, fixer un montant (ou laisser le choix au client), ajouter une image ou un logo, et même personnaliser l'URL.",
    isOpen: false
  },
  {
    question: "Comment suivre mes paiements ?",
    answer: "Via votre tableau de bord LeekPay en temps réel. Vous y voyez tous les paiements reçus, les montants, les dates, les statuts et pouvez exporter les données.",
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

const carousel = ref(null)
const currentIndex = ref(0)
const countries = [
  'Bénin', 'Côte d\'Ivoire', 'Mali', 'Sénégal',
  'Togo', 'Burkina Faso', 'Niger', 'Guinée'
]

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

const scrollToIndex = (index) => {
  if (carousel.value) {
    const itemWidth = 120 // Largeur approximative d'un item + espace
    carousel.value.scrollTo({ left: index * itemWidth, behavior: 'smooth' })
    currentIndex.value = index
  }
}
</script>