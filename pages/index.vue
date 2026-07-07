<template>
  <ClientOnly>
  <div class="font-sans overflow-x-clip">
    <!-- HERO SECTION -->
    <section class="py-16 md:py-24 px-6 lg:px-12 bg-white overflow-hidden">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
          <div
            class="max-w-xl min-w-0"
            v-motion="{
              initial: { opacity: 0, x: -90 },
              visible: { opacity: 1, x: 0, transition: { duration: 700, easing: 'easeOut' } }
            }"
          >
            <h1 class="text-4xl md:text-5xl lg:text-[58px] font-bold text-gray-900 leading-[1.18] mb-6">
              <span class="text-[#F39C12] italic">Encaissez</span>, <span class="text-[#F39C12] italic">vendez</span><br>
              et <span class="text-[#F39C12] italic">facturez</span> en ligne<br>
              en toute simplicité
            </h1>
            <p class="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
              Un seul outil pour créer vos liens de paiement,
              pages de vente et factures numériques,
              sans site web ni compétence technique.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <NuxtLink
                to="/register"
                class="inline-block bg-[#2ECC71] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#27AE60] transition text-base shadow-md shadow-[#2ECC71]/25"
              >
                Commencer gratuitement
              </NuxtLink>
              <NuxtLink
                to="/#fonctionnalites"
                class="inline-flex items-center gap-2 text-gray-900 font-medium px-7 py-3 rounded-lg border border-gray-300 hover:border-[#2ECC71] hover:text-[#27AE60] transition text-base"
              >
                Découvrir les fonctionnalités
              </NuxtLink>
            </div>
          </div>
          <div
            class="relative min-w-0 -ml-2 md:ml-6 -mr-32 md:-mr-48 lg:-mr-64"
            v-motion="{
              initial: { opacity: 0, x: 90, scale: 0.98 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 800, easing: 'easeOut' } }
            }"
          >
            <!-- Dashboard codé (réplique fidèle de la maquette) -->
            <div class="w-full min-w-[600px] md:min-w-[820px] bg-white rounded-xl border border-gray-300 shadow-2xl overflow-hidden transform rotate-6" aria-hidden="true">
              <div class="flex">
                <!-- Menu latéral -->
                <div class="w-[19%] min-w-[118px] border-r border-gray-200">
                  <div class="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
                    <div class="flex items-center gap-1">
                      <img src="~/assets/ressource_new_landing_page/Mascotte LeekPay 1.png" alt="" class="w-3.5 h-3.5" />
                      <span class="text-[11px] font-bold text-gray-900">LeekPay</span>
                    </div>
                    <span class="text-[9px] text-gray-400">&lsaquo;</span>
                  </div>
                  <div class="px-2 pt-2.5">
                    <p class="flex items-center gap-1.5 bg-[#EAF7EF] text-[#27AE60] text-[9px] font-semibold rounded-md px-2 py-1.5 mb-2">
                      <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>
                      Tableau de bord
                    </p>
                    <p class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 mb-1">
                      <span class="text-[7px] font-semibold tracking-wider text-gray-500">LIENS DE PAIEMENT</span>
                      <span class="w-3 h-3 bg-[#2ECC71] rounded-sm text-white text-[8px] font-bold flex items-center justify-center leading-none">+</span>
                    </p>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-700 px-2 py-1.5 mb-1">
                      <svg class="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                      Mes liens
                    </p>
                    <p class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 mb-1">
                      <span class="text-[7px] font-semibold tracking-wider text-gray-500">PAGES DE VENTE</span>
                      <span class="w-3 h-3 bg-[#2ECC71] rounded-sm text-white text-[8px] font-bold flex items-center justify-center leading-none">+</span>
                    </p>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-700 px-2 py-1.5 mb-1">
                      <svg class="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                      Mes pages
                    </p>
                    <p class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 mb-1">
                      <span class="text-[7px] font-semibold tracking-wider text-gray-500">FACTURES</span>
                      <span class="w-3 h-3 bg-[#2ECC71] rounded-sm text-white text-[8px] font-bold flex items-center justify-center leading-none">+</span>
                    </p>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-700 px-2 py-1.5 mb-1">
                      <svg class="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      Mes factures
                    </p>
                    <p class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 mb-1">
                      <span class="text-[7px] font-semibold tracking-wider text-gray-500">FINANCES</span>
                      <span class="text-[8px] text-gray-400">&#8963;</span>
                    </p>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-700 px-2 py-1.5">
                      <svg class="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                      Transactions
                    </p>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-700 px-2 py-1.5">
                      <svg class="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                      Retraits
                    </p>
                  </div>
                  <div class="px-2.5 mt-3 pt-2.5 border-t border-gray-100 pb-3">
                    <div class="flex items-center gap-1.5 mb-2">
                      <span class="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                        <svg class="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      </span>
                      <span class="min-w-0">
                        <span class="block text-[9px] font-semibold text-gray-900 leading-tight">ALEX</span>
                        <span class="block text-[7px] text-gray-400 truncate">qoder0001@gmail.com</span>
                      </span>
                    </div>
                    <p class="flex items-center gap-1.5 text-[9px] text-gray-600">
                      <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                      Déconnexion
                    </p>
                  </div>
                </div>
                <!-- Contenu principal -->
                <div class="flex-1 min-w-0">
                  <div class="px-4 py-2.5 border-b border-gray-200">
                    <p class="text-[11px] font-semibold text-gray-900">Tableau de bord</p>
                  </div>
                  <div class="px-4 py-3">
                    <div class="flex items-start justify-between mb-2.5">
                      <div>
                        <p class="text-[14px] font-bold text-gray-900">👋 Salut ALEX</p>
                        <p class="text-[9px] text-gray-500">Vue d'ensemble de votre activité</p>
                      </div>
                      <div class="flex gap-1.5">
                        <span class="bg-[#2ECC71] text-white text-[9px] font-semibold rounded px-2.5 py-1.5">+ Lien</span>
                        <span class="bg-white border border-gray-200 text-gray-700 text-[9px] font-semibold rounded px-2.5 py-1.5">+ Facture</span>
                        <span class="bg-white border border-gray-200 text-gray-700 text-[9px] font-semibold rounded px-2.5 py-1.5">+ Page</span>
                      </div>
                    </div>
                    <span class="inline-flex items-center gap-2 text-[9px] text-gray-700 bg-white border border-gray-300 rounded px-2.5 py-1.5 mb-2.5">Toute la période <span class="text-gray-400">&#8964;</span></span>
                    <!-- Cartes de stats -->
                    <div class="grid grid-cols-4 gap-2 mb-2">
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-1">TOTAL COLLECTÉ</p>
                        <p class="text-[15px] font-bold text-gray-900 leading-tight">79&#8239;240</p>
                        <p class="text-[8px] text-gray-400">CFA</p>
                      </div>
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-1">TRANSACTIONS</p>
                        <p class="text-[15px] font-bold text-gray-900 leading-tight">102</p>
                        <p class="text-[8px] text-gray-400"><span class="text-[#27AE60]">35 payées</span> · 48 en attente</p>
                      </div>
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-1">LIENS</p>
                        <p class="text-[15px] font-bold text-gray-900 leading-tight">38</p>
                        <p class="text-[8px] text-gray-400">38 actifs · 160 clics</p>
                      </div>
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-1">FACTURES</p>
                        <p class="text-[15px] font-bold text-gray-900 leading-tight">8</p>
                        <p class="text-[8px] text-gray-400"><span class="text-[#27AE60]">1 payées</span> · 7 en attente</p>
                      </div>
                    </div>
                    <!-- Pages de vente -->
                    <div class="bg-white border border-gray-200 rounded-md p-2.5 mb-2">
                      <div class="flex items-center justify-between mb-1.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500">PAGES DE VENTE</p>
                        <p class="text-[8px] font-semibold text-[#27AE60]">Voir tout</p>
                      </div>
                      <div class="flex gap-6">
                        <p class="text-[13px] font-bold text-gray-900 leading-tight">6 <span class="block text-[8px] font-normal text-gray-400">pages créées</span></p>
                        <p class="text-[13px] font-bold text-gray-900 leading-tight">3 <span class="block text-[8px] font-normal text-gray-400">publiées</span></p>
                        <p class="text-[13px] font-bold text-gray-900 leading-tight">17 <span class="block text-[8px] font-normal text-gray-400">vues</span></p>
                      </div>
                    </div>
                    <!-- Revenus + Performance -->
                    <div class="grid grid-cols-[1.45fr_1fr] gap-2">
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-2">REVENUS (7 DERNIERS JOURS)</p>
                        <div class="space-y-[5px]">
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">17 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">18 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">19 févr.</span><span class="flex-1 h-[5px] bg-[#2ECC71] rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">1000</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">20 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">21 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">22 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                          <div class="flex items-center gap-2"><span class="w-8 text-[8px] text-gray-500 flex-shrink-0">23 févr.</span><span class="flex-1 h-[5px] bg-gray-100 rounded-full"></span><span class="w-6 text-right text-[8px] text-gray-600 flex-shrink-0">0</span></div>
                        </div>
                      </div>
                      <div class="bg-white border border-gray-200 rounded-md p-2.5">
                        <p class="text-[7px] font-semibold tracking-wider text-gray-500 mb-1.5">PERFORMANCE MENSUELLE</p>
                        <p class="text-[8px] text-gray-400">Ce mois</p>
                        <p class="text-[13px] font-bold text-gray-900 leading-tight mb-1.5">9&#8239;000 CFA</p>
                        <p class="text-[8px] text-gray-400">Mois précédent</p>
                        <p class="text-[13px] font-bold text-gray-900 leading-tight mb-1.5">51&#8239;400 CFA</p>
                        <p class="text-[8px] text-gray-400">Évolution</p>
                        <p class="text-[12px] font-bold text-red-500 leading-tight">-82.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- USE CASES SECTION -->
    <section class="py-16 md:py-24 px-6 lg:px-12 bg-white">
      <div class="mx-auto max-w-7xl">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14 md:mb-16"
          v-motion="{
            initial: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 600, easing: 'easeOut' } }
          }"
        >
          Dans quels cas utiliser <span class="text-[#2ECC71] italic">LeekPay</span> ?
        </h2>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Vente en ligne -->
          <div
            class="relative bg-[#2ECC7142] rounded-xl p-8 pt-10 transition-transform duration-300 hover:-translate-y-1"
            v-motion="{
              initial: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 0 } }
            }"
          >
            <div class="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
              <img src="~/assets/ressource_new_landing_page/Frame_3.png" alt="" class="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div class="ml-10 md:ml-12">
              <span class="inline-block bg-white/70 text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
                Vente en ligne
              </span>
              <p class="text-gray-800 text-base leading-relaxed">
                Crée des <strong>liens de paiement</strong> et <strong>des pages de vente</strong> pour encaisser facilement depuis ton site, WhatsApp ou les réseaux sociaux.
              </p>
            </div>
          </div>

          <!-- Facturation -->
          <div
            class="relative bg-[#2ECC7142] rounded-xl p-8 pt-10 pr-16 md:pr-8 transition-transform duration-300 hover:-translate-y-1"
            v-motion="{
              initial: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }
            }"
          >
            <div class="mr-6 md:mr-12">
              <span class="inline-block bg-white/70 text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
                Facturation
              </span>
              <p class="text-gray-800 text-base leading-relaxed">
                Émets des <strong>factures numériques</strong> payables en ligne et reçois tes paiements plus rapidement, sans démarches complexes.
              </p>
            </div>
            <div class="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
              <img src="~/assets/ressource_new_landing_page/Frame_1.png" alt="" class="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </div>

          <!-- Services -->
          <div
            class="relative bg-[#2ECC7142] rounded-xl p-8 pt-10 transition-transform duration-300 hover:-translate-y-1"
            v-motion="{
              initial: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }
            }"
          >
            <div class="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
              <img src="~/assets/ressource_new_landing_page/Frame_4.png" alt="" class="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div class="ml-10 md:ml-12">
              <span class="inline-block bg-white/70 text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
                Services
              </span>
              <p class="text-gray-800 text-base leading-relaxed">
                <strong>Encaisse les paiements</strong> pour tes prestations, consultations ou missions, de façon simple et sécurisée.
              </p>
            </div>
          </div>

          <!-- Collecte -->
          <div
            class="relative bg-[#2ECC7142] rounded-xl p-8 pt-10 pr-16 md:pr-8 transition-transform duration-300 hover:-translate-y-1"
            v-motion="{
              initial: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }
            }"
          >
            <div class="mr-6 md:mr-12">
              <span class="inline-block bg-white/70 text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md mb-4">
                Collecte
              </span>
              <p class="text-gray-800 text-base leading-relaxed">
                <strong>Collecte des paiements</strong> pour tes formations, événements, dons ou abonnements en toute simplicité.
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
    <section class="pt-14 md:pt-20 bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 text-center mb-8 md:mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
          <em class="text-[#27AE60] italic">Encaissements et paiements</em><br>
          flexibles via plusieurs réseaux
        </h2>
      </div>

      <!-- Carrousel pleine largeur -->
      <div class="relative w-full overflow-hidden py-4 md:py-6 bg-gray-100">
        <div class="flex animate-marquee whitespace-nowrap">
          <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-8 md:h-16 mx-0.5 md:mx-1 flex-shrink-0" />
          <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-8 md:h-16 mx-0.5 md:mx-1 flex-shrink-0" />
          <img src="~/assets/ressource_new_landing_page/Component2.png" alt="Méthodes de paiement" class="h-8 md:h-16 mx-0.5 md:mx-1 flex-shrink-0" />
        </div>
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-100 to-transparent"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>
    </section>

    <!-- FEES BANNER -->
    <section id="tarifs" class="scroll-mt-24 py-16 md:py-24 px-6 lg:px-12 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
      <div class="mx-auto max-w-7xl">
        <div
          class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          v-motion="{
            initial: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 700 } }
          }"
        >
          <!-- Le gros 3% -->
          <div class="text-white text-center md:text-left">
            <span class="relative z-10 inline-block bg-[#FFD700] text-[#0A1F44] text-base md:text-xl font-bold px-5 py-1.5 rounded-md transform -rotate-6 shadow-md md:-ml-1 -mb-3 md:-mb-9">Tarifs</span>
            <h2 class="text-[80px] md:text-[180px] lg:text-[220px] font-black leading-none italic">
              3%
            </h2>
          </div>

          <!-- Le texte explicatif -->
          <div class="text-white max-w-3xl text-center md:text-left">
            <p class="text-xl md:text-[26px] lg:text-[40px] font-bold leading-[1.2] mb-1 md:mb-2">
              <span class="italic">DE FRAIS DE RETRAIT SEULEMENT</span>
            </p>
            <p class="text-xl md:text-[26px] lg:text-[40px] font-bold leading-[1.2] mb-1 md:mb-2">
              VOUS PERMETTANT DE CONSERVER
            </p>
            <p class="text-xl md:text-[26px] lg:text-[40px] font-bold leading-[1.2]">
              <span class="text-[#FFD700]">JUSQU'À 97 %</span> DU PAIEMENT REÇU
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section id="fonctionnalites" class="scroll-mt-24 py-16 md:py-24 px-6 lg:px-12 bg-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="text-center mb-12 md:mb-16"
          v-motion="{
            initial: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0, transition: { duration: 700 } }
          }"
        >
          <span class="inline-flex items-center gap-2 border border-gray-900 rounded-full px-2 py-1 text-sm font-bold mb-6">
            <span class="w-5 h-5 bg-gray-900 rounded-full"></span>
            Encaissez en ligne, simplement
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Créez, gérez et recevez<br>vos paiements en toute simplicité
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            <em class="text-[#2ECC71] italic font-bold">LeekPay</em> vous permet d'encaisser en ligne grâce à des liens de paiement, des pages de vente, des factures numériques et une API puissante, le tout sur une seule plateforme.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16">
          <!-- Liens de paiement -->
          <div
            class="group flex flex-col"
            v-motion="{
              initial: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
          >
            <div class="relative overflow-hidden rounded-[24px] bg-[#2ECC71] mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg flex-1 flex flex-col">
              <div class="px-7 pt-7 pb-6 md:px-8 md:pt-8 relative z-10">
                <h3 class="text-white text-2xl font-bold mb-3">Liens de paiement</h3>
                <p class="text-white text-sm md:text-[15px] leading-relaxed font-medium max-w-[400px] md:min-h-[92px]">
                  Créez des liens de paiement en quelques secondes et partagez-les via WhatsApp, email ou réseaux sociaux. Encaissez sans site web ni intégration technique.
                </p>
              </div>

              <!-- Fenêtre navigateur -->
              <div class="relative mt-auto ml-[19%] h-[330px]" aria-hidden="true">
                <div class="absolute inset-0 rounded-tl-[24px] overflow-hidden shadow-lg">
                  <div class="h-9 bg-[#25B863] rounded-tl-[24px] flex items-center gap-1.5 px-5">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div class="bg-[#F3FBF6] h-full px-4 pt-3">
                    <img src="~/assets/ressource_new_landing_page/Mascotte LeekPay 1.png" alt="" class="w-10 h-10 mb-2" />
                    <!-- Carte produit -->
                    <div class="ml-[32%] -mt-10 bg-white rounded-xl shadow-md overflow-hidden">
                      <img src="~/assets/ressource_new_landing_page/uiux-artwork.png" alt="" class="w-full h-[88px] object-cover object-left" />
                      <div class="px-3 pt-2 pb-2.5 text-center border-b border-gray-100">
                        <p class="text-[13px] font-bold text-gray-900 tracking-wide">FORMATION UX</p>
                        <p class="text-[10px] text-gray-500">Apprenez à concevoir des interfaces intuitives</p>
                      </div>
                      <div class="px-3 py-2 flex items-center justify-between border-b border-gray-100">
                        <p class="text-[10px] text-gray-500 flex items-center gap-1">
                          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Lien expire dans 5 jours 8h
                        </p>
                        <span class="text-[9px] font-semibold text-gray-600 bg-gray-100 rounded px-1.5 py-0.5">Valide</span>
                      </div>
                      <div class="bg-[#EAF7EF] px-3 py-1.5">
                        <p class="text-[11px] font-semibold text-gray-800">Effectuez votre paiement</p>
                      </div>
                      <div class="px-3 py-2 flex items-center justify-between">
                        <p class="text-[11px] text-gray-600">Montant</p>
                        <p class="text-[12px] font-bold text-[#27AE60]">25000.00 CFA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Moyens de paiement flottants -->
              <div class="absolute left-[5%] top-[56%] w-[38%] max-w-[190px] bg-white rounded-lg shadow-xl p-1.5 space-y-1" aria-hidden="true">
                <p class="bg-[#2ECC71] text-white text-[10px] font-semibold text-center rounded py-1.5">Mobile Money</p>
                <p class="text-[10px] text-gray-700 text-center py-1 border-b border-gray-100">Carte bancaire</p>
                <p class="text-[10px] text-gray-700 text-center py-1">PayPal</p>
              </div>

              <!-- Bouton paiement flottant -->
              <div class="absolute left-[13%] bottom-[7%] bg-white rounded-lg shadow-xl p-1.5" aria-hidden="true">
                <p class="bg-[#2ECC71] text-white text-[13px] font-bold rounded-md px-4 py-2">Paiement 25000 CFA</p>
              </div>
            </div>
            <NuxtLink to="/payment-links" class="w-full bg-[#2ECC71] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#27AE60] transition-colors inline-flex items-center justify-center gap-2">
              Voir les détails
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </NuxtLink>
          </div>

          <!-- Pages de vente -->
          <div
            class="group flex flex-col"
            v-motion="{
              initial: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
          >
            <div class="relative overflow-hidden rounded-[24px] bg-[#F39C12] mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg flex-1 flex flex-col">
              <div class="px-7 pt-7 pb-6 md:px-8 md:pt-8 relative z-10">
                <h3 class="text-white text-2xl font-bold mb-3">Pages de vente</h3>
                <p class="text-white text-sm md:text-[15px] leading-relaxed font-medium max-w-[420px] md:min-h-[92px]">
                  Créez des pages de vente simples et efficaces pour présenter vos produits ou services et accepter les paiements en ligne. Idéal pour les entrepreneurs, freelances et créateurs de contenu.
                </p>
              </div>

              <!-- Fenêtre navigateur : éditeur de page -->
              <div class="relative mt-auto ml-[19%] h-[330px]" aria-hidden="true">
                <div class="absolute inset-0 rounded-tl-[24px] overflow-hidden shadow-lg">
                  <div class="h-9 bg-[#DE8D0B] rounded-tl-[24px] flex items-center gap-1.5 px-5">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div class="bg-white h-full">
                    <!-- Barre outils -->
                    <div class="flex items-center gap-2 px-3 py-1.5 border-b border-gray-200">
                      <p class="text-[9px] text-gray-600">&larr; Retour</p>
                      <p class="text-[9px] font-bold text-gray-800">PAGE DE VENTE</p>
                      <p class="ml-3 text-[9px] text-gray-500 border border-gray-200 rounded-full px-2 py-0.5">pagedevente &middot; leekpay.me</p>
                    </div>
                    <div class="flex h-full">
                      <!-- Panneau blocs -->
                      <div class="w-[42%] border-r border-gray-200 px-2 pt-1.5">
                        <div class="flex gap-1 mb-1.5">
                          <span class="text-[9px] font-semibold text-white bg-gray-800 rounded px-2 py-0.5">Blocs</span>
                          <span class="text-[9px] text-gray-500 px-2 py-0.5">Paramètres</span>
                        </div>
                        <p class="text-[8px] text-gray-400 mb-1">Cliquez pour ajouter</p>
                        <div class="grid grid-cols-2 gap-1">
                          <span v-for="bloc in ['En-tête', 'Hero Section', 'Texte', 'Image', 'Caractéristiques', 'Tarification', 'FAQ', 'Appel à l\'action', 'Compte à rebours', 'Produit']" :key="bloc" class="border border-gray-200 rounded text-[8px] text-gray-600 text-center px-1 py-1.5 leading-tight">
                            {{ bloc }}
                          </span>
                        </div>
                      </div>
                      <!-- Aperçu -->
                      <div class="flex-1 pt-6 text-center px-3">
                        <p class="text-[16px] font-bold text-gray-900 font-serif">Titre principal</p>
                        <p class="text-[9px] text-gray-500 mt-1 mb-3">Sous-titre de votre offre</p>
                        <span class="inline-block bg-[#2ECC71] text-white text-[8px] font-bold rounded px-3 py-1.5 tracking-wide">ACHETER MAINTENANT</span>
                        <p class="text-[11px] font-semibold text-gray-800 mt-8">Ce que vous allez obtenir</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carte page flottante -->
              <div class="absolute left-[5%] top-[56%] w-[31%] max-w-[165px] bg-white rounded-lg shadow-xl p-2.5" aria-hidden="true">
                <div class="flex items-center gap-1.5">
                  <p class="text-[10px] font-bold text-gray-900">PAGE DE VENTE</p>
                  <span class="bg-[#2ECC71] text-white text-[8px] font-semibold rounded px-1.5 py-0.5">Publiée</span>
                </div>
                <p class="text-[10px] text-gray-600 mt-1">mapage.leekpay.me</p>
                <p class="text-[9px] text-gray-400">Modifiée le 14 janv. 2026</p>
                <div class="flex gap-1 mt-1.5">
                  <span class="text-[9px] text-gray-700 border border-gray-200 rounded px-2 py-0.5">Voir</span>
                  <span class="text-[9px] text-white bg-[#0A1F44] rounded px-2 py-0.5">Éditer</span>
                  <span class="text-[9px] text-gray-700 border border-gray-200 rounded px-2 py-0.5">Stats</span>
                </div>
              </div>

              <!-- Bouton nouvelle page flottant -->
              <div class="absolute left-[5%] bottom-[6%] bg-white/60 rounded-lg p-1.5 w-[42%] max-w-[210px]" aria-hidden="true">
                <p class="bg-[#2ECC71] text-white text-[13px] font-bold rounded-md px-4 py-2 text-center">+ Nouvelle page</p>
              </div>
            </div>
            <NuxtLink to="/sales-pages" class="w-full bg-[#F39C12] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#E67E22] transition-colors inline-flex items-center justify-center gap-2">
              Voir les détails
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </NuxtLink>
          </div>

          <!-- Factures numériques -->
          <div
            class="group flex flex-col"
            v-motion="{
              initial: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
          >
            <div class="relative overflow-hidden rounded-[24px] bg-[#C5824C] mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg flex-1 flex flex-col">
              <div class="px-7 pt-7 pb-6 md:px-8 md:pt-8 relative z-10">
                <h3 class="text-white text-2xl font-bold mb-3">Factures numériques</h3>
                <p class="text-white text-sm md:text-[15px] leading-relaxed font-medium max-w-[420px] md:min-h-[92px]">
                  Générez des factures professionnelles avec un lien de paiement intégré et suivez leur statut en temps réel. Facilitez le paiement de vos clients et réduisez les retards.
                </p>
              </div>

              <!-- Fenêtre navigateur : facture -->
              <div class="relative mt-auto ml-[19%] h-[330px]" aria-hidden="true">
                <div class="absolute inset-0 rounded-tl-[24px] overflow-hidden shadow-lg">
                  <div class="h-9 bg-[#B37038] rounded-tl-[24px] flex items-center gap-1.5 px-5">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div class="h-full bg-gradient-to-b from-white via-white to-[#EBCBA5] px-5 pt-4 relative">
                    <span class="absolute top-5 right-6 w-10 h-10 rounded-full bg-[#D2955C]"></span>
                    <p class="text-[20px] font-bold text-[#E67E22]">Facture</p>
                    <p class="text-[15px] font-bold text-[#1F2A44] mt-0.5">FA-2026-0007</p>
                    <span class="inline-block border border-gray-300 rounded-full text-[8px] font-semibold text-gray-500 tracking-wider px-2.5 py-0.5 mt-2">BROUILLON</span>
                    <p class="text-[9px] font-semibold tracking-widest text-[#8FA0B5] mt-3">SOLDE A PAYER</p>
                    <p class="text-[22px] font-bold text-[#17223B] leading-tight">547,56 $</p>
                    <p class="text-[10px] text-[#4C6FA8]">Echeance: 17/01/2026</p>
                    <div class="mt-3 text-[10px]">
                      <div class="flex justify-between py-1.5 border-t border-gray-200/70">
                        <span class="text-gray-400">Emission</span><span class="text-gray-700 font-medium mr-[15%]">11/01/2026</span>
                      </div>
                      <div class="flex justify-between py-1.5 border-t border-gray-200/70">
                        <span class="text-gray-400">Echeance</span><span class="text-gray-700 font-medium mr-[15%]">17/01/2026</span>
                      </div>
                      <div class="flex justify-between py-1.5 border-t border-gray-200/70">
                        <span class="text-gray-400">Client</span><span class="text-gray-700 font-medium mr-[15%]">Nom du client</span>
                      </div>
                      <div class="flex justify-between py-1.5 border-t border-gray-200/70">
                        <span class="text-gray-400">Devise</span><span class="text-gray-700 font-medium mr-[15%]">USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mini-table TVA flottante -->
              <div class="absolute left-[5%] top-[57%] w-[34%] max-w-[170px] bg-white rounded-md shadow-xl overflow-hidden" aria-hidden="true">
                <div class="grid grid-cols-2 bg-[#E9EEF6] px-2.5 py-1.5">
                  <p class="text-[9px] font-bold text-[#17223B]">TVA</p>
                  <p class="text-[9px] font-bold text-[#17223B] text-right">TOTAL</p>
                </div>
                <div class="grid grid-cols-2 px-2.5 py-1.5">
                  <p class="text-[9px] text-gray-700">17,00%</p>
                  <p class="text-[9px] text-gray-700 text-right">273,78 $</p>
                </div>
              </div>

              <!-- Étiquette facture flottante -->
              <div class="absolute left-[5%] bottom-[13%]" aria-hidden="true">
                <p class="bg-[#E5A33D] text-white text-[9px] font-bold tracking-wide px-2.5 py-1.5 rounded-sm shadow-lg">FACTURE FA-2026-0007</p>
              </div>
            </div>
            <NuxtLink to="/invoices" class="w-full bg-[#CD7F32] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B8701F] transition-colors inline-flex items-center justify-center gap-2">
              Voir les détails
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </NuxtLink>
          </div>

          <!-- API LeekPay -->
          <div
            class="group flex flex-col"
            v-motion="{
              initial: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 700 } }
            }"
          >
            <div class="relative overflow-hidden rounded-[24px] bg-[#189BD8] mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg flex-1 flex flex-col">
              <div class="px-7 pt-7 pb-6 md:px-8 md:pt-8 relative z-10">
                <h3 class="text-white text-2xl font-bold mb-3">API LeekPay</h3>
                <p class="text-white text-sm md:text-[15px] leading-relaxed font-medium max-w-[420px] md:min-h-[92px]">
                  Intégrez LeekPay à votre site web ou application grâce à notre API sécurisée. Automatisez les paiements et offrez une expérience fluide à vos utilisateurs.
                </p>
              </div>

              <!-- Fenêtre navigateur : éditeur de code -->
              <div class="relative mt-auto ml-[19%] h-[330px]" aria-hidden="true">
                <div class="absolute inset-0 rounded-tl-[24px] overflow-hidden shadow-lg">
                  <div class="h-9 bg-[#1288C4] rounded-tl-[24px] flex items-center gap-1.5 px-5">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div class="h-full bg-[#23272E] px-4 pt-3">
                    <div class="flex items-center gap-1.5 mb-3">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                    </div>
                    <pre class="font-mono text-[10px] leading-[1.7] whitespace-pre"><code><span class="text-[#7F848E]">// Initialize LeekPay API</span>
<span class="text-[#C678DD]">const</span> <span class="text-[#E5C07B]">leekpay</span> = <span class="text-[#C678DD]">new</span> <span class="text-[#98C379]">LeekPay</span>({
  <span class="text-[#E06C75]">apiKey</span>: <span class="text-[#E06C75]">"YOUR_API_KEY"</span>,
  <span class="text-[#E06C75]">environment</span>: <span class="text-[#98C379]">"production"</span>
});

<span class="text-[#7F848E]">// Create a payment link</span>
<span class="text-[#C678DD]">const</span> <span class="text-[#E5C07B]">paymentLink</span> = <span class="text-[#C678DD]">await</span> <span class="text-white">leekpay.paymentLinks.</span><span class="text-[#E06C75]">create</span>({
  <span class="text-[#E06C75]">amount</span>: <span class="text-[#D19A66]">5000</span>,
  <span class="text-[#E06C75]">currency</span>: <span class="text-[#98C379]">"XOF"</span>,
  <span class="text-[#E06C75]">description</span>: <span class="text-[#98C379]">"Online purchase"</span>,
  <span class="text-[#E06C75]">redirectUrl</span>: <span class="text-[#98C379]">"https://yourwebsite.com/success"</span>
});</code></pre>
                  </div>
                </div>
              </div>

              <!-- Carte clés API flottante -->
              <div class="absolute left-[5%] top-[55%] w-[44%] max-w-[220px] bg-white rounded-lg shadow-xl p-2.5 flex items-center justify-between gap-2" aria-hidden="true">
                <div>
                  <p class="text-[11px] font-bold text-gray-900">Clés API</p>
                  <p class="text-[9px] text-gray-500">Gérez vos clés d'intégration</p>
                </div>
                <p class="bg-[#0A1F44] text-white text-[9px] font-semibold rounded px-2 py-1 whitespace-nowrap">Nouvelle clé</p>
              </div>

              <!-- Bouton créer une clé flottant -->
              <div class="absolute left-[5%] bottom-[8%] bg-white rounded-lg shadow-xl p-1.5" aria-hidden="true">
                <p class="bg-[#0A1F44] text-white text-[13px] font-bold rounded-md px-4 py-2">Créer une clé</p>
              </div>
            </div>
            <NuxtLink to="/api" class="w-full bg-[#0EA5E9] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#0284C7] transition-colors inline-flex items-center justify-center gap-2">
              Voir les détails
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </NuxtLink>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/register"
            class="inline-block bg-[#2ECC71] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#27AE60] transition shadow-md shadow-[#2ECC71]/25"
          >
            Commencer gratuitement
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="py-16 md:py-24 px-6 lg:px-12 bg-[#2ECC7126]">
      <div class="mx-auto max-w-7xl text-center">
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
          class="text-gray-600 max-w-2xl mx-auto mb-14 md:mb-16"
          v-motion="{
            initial: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }
          }"
        >
          Liens de paiement, pages de vente ou factures numériques :<br>
          <em class="text-[#2ECC71] italic font-semibold">LeekPay</em> suit toujours la même logique, adaptée à chaque usage.
        </p>

        <div class="relative grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <!-- Ligne de liaison (desktop) -->
          <div
            class="hidden md:block absolute top-10 left-[17%] right-[17%] border-t-2 border-dashed border-[#2ECC71]/40 origin-left"
            aria-hidden="true"
            v-motion="{
              initial: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 900, delay: 250, easing: 'easeOut' } }
            }"
          ></div>

          <!-- Créez -->
          <div
            class="relative flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 0 } }
            }"
          >
            <div class="relative w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#2ECC71]/30">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span class="absolute -top-1 -right-1 w-7 h-7 bg-white text-[#27AE60] border-2 border-[#2ECC71] rounded-full text-xs font-bold flex items-center justify-center">1</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Créez</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Créez un lien de paiement, une page de vente ou une facture numérique en quelques clics.
            </p>
          </div>

          <!-- Diffusez -->
          <div
            class="relative flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }
            }"
          >
            <div class="relative w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#2ECC71]/30">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span class="absolute -top-1 -right-1 w-7 h-7 bg-white text-[#27AE60] border-2 border-[#2ECC71] rounded-full text-xs font-bold flex items-center justify-center">2</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Diffusez</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Partagez vos liens et facture ou générez du trafic vers vos pages de vente grâce aux outils de diffusion et de suivi.
            </p>
          </div>

          <!-- Encaissez -->
          <div
            class="relative flex flex-col items-center"
            v-motion="{
              initial: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 700, delay: 300 } }
            }"
          >
            <div class="relative w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#2ECC71]/30">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="absolute -top-1 -right-1 w-7 h-7 bg-white text-[#27AE60] border-2 border-[#2ECC71] rounded-full text-xs font-bold flex items-center justify-center">3</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Encaissez</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Vos clients paient en ligne et vous recevez votre argent en toute sécurité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="support" class="scroll-mt-24 py-16 md:py-24 px-6 lg:px-12 bg-white">
      <div class="mx-auto max-w-3xl">
        <div
          class="bg-[#D4F4DD] rounded-[30px] p-6 md:p-12"
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
                :aria-expanded="faq.isOpen"
                class="w-full flex items-center justify-between px-5 py-3.5 md:px-6 md:py-4 text-left cursor-pointer"
              >
                <span class="font-semibold text-gray-900 text-[15px] md:text-base pr-4">{{ faq.question }}</span>
                <span class="w-7 h-7 md:w-8 md:h-8 bg-[#2ECC71] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    v-if="faq.isOpen"
                    class="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div
                class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                :class="faq.isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <p class="px-5 md:px-6 pb-5 text-[15px] text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact link -->
          <p class="text-center text-gray-600 mt-8">
            D'autres questions ? <a href="https://wa.me/221787814572?text=Bonjour,%20j'ai%20une%20question%20concernant%20LeekPay" target="_blank" rel="noopener noreferrer" class="text-[#27AE60] font-medium hover:underline">Contactez-nous.</a>
          </p>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section id="contact" class="scroll-mt-24 pb-16 md:pb-24 px-6 lg:px-12 bg-white">
      <div class="mx-auto max-w-7xl">
        <div
          class="relative bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <!-- Décorations -->
          <div class="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 bg-white/10 rounded-full" aria-hidden="true"></div>

          <div class="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <!-- Left: World Map -->
            <div class="flex items-center justify-center">
              <img
                src="~/assets/ressource_new_landing_page/WorldMap.png"
                alt="Carte du monde - présence LeekPay"
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
                to="/register"
                class="inline-block bg-white text-[#27AE60] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              >
                Créer mon compte
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <AppFooter />
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
    answer: "LeekPay prend en charge les moyens de paiement Mobile Money dans 17 pays africains : Sénégal, Côte d'Ivoire, Bénin, Gabon, Togo, Burkina Faso, Mali, Cameroun, Niger, Kenya, Ouganda, Rwanda, Zambie, Guinée, RD Congo, Sierra Leone et Congo. Nous acceptons également PayPal et les cartes bancaires (Visa, Mastercard) pour les paiements internationaux.",
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

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
