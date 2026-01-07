<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- Header du builder -->
    <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center space-x-4">
        <NuxtLink 
          :to="isTemplateMode ? '/dashboard/admin/templates' : '/dashboard/sales-pages'" 
          class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="hidden sm:inline">Retour</span>
        </NuxtLink>
        
        <div class="h-6 w-px bg-gray-300 hidden sm:block" />
        
        <!-- Mode Template: afficher le nom du template -->
        <div v-if="isTemplateMode" class="flex items-center">
          <span class="text-sm text-gray-500 mr-2">Template:</span>
          <span class="text-lg font-semibold text-gray-900">{{ templateData?.name || 'Chargement...' }}</span>
        </div>
        
        <!-- Mode Page: champ titre éditable -->
        <input
          v-else
          v-model="page.title"
          type="text"
          placeholder="Entrez le titre de la page"
          class="text-lg font-semibold bg-transparent border-b-2 focus:outline-none focus:ring-0 w-40 sm:w-64 transition-colors"
          :class="page.title ? 'border-transparent' : 'border-red-300 placeholder-red-400'"
        />
      </div>
      
      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Toggle Preview -->
        <button
          @click="togglePreview"
          class="flex items-center px-3 py-2 rounded-lg transition-colors"
          :class="previewMode ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span class="ml-2 hidden sm:inline">{{ previewMode ? 'Éditer' : 'Aperçu' }}</span>
        </button>
        
        <!-- Sauvegarder -->
        <button
          @click="handleSave"
          :disabled="isSaving"
          class="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <svg v-if="isSaving" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span class="ml-2 hidden sm:inline">{{ isDirty ? 'Sauvegarder*' : 'Sauvegarder' }}</span>
        </button>
        
        <!-- Publier (seulement pour les pages, pas les templates) -->
        <button
          v-if="page.id && !isTemplateMode"
          @click="handlePublish"
          class="flex items-center px-4 py-2 rounded-lg transition-colors"
          :class="page.is_published ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span class="ml-2 hidden sm:inline">{{ page.is_published ? 'Dépublier' : 'Publier' }}</span>
        </button>
      </div>
    </header>
    
    <!-- Message d'erreur -->
    <div 
      v-if="saveError" 
      class="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center justify-between"
    >
      <div class="flex items-center text-red-700">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm font-medium">{{ saveError }}</span>
      </div>
      <button @click="saveError = null" class="text-red-500 hover:text-red-700">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Contenu principal -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Gauche - Blocs -->
      <aside 
        v-if="!previewMode"
        class="w-64 lg:w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden flex-shrink-0"
      >
        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
          <button
            @click="activeTab = 'blocks'"
            class="flex-1 py-3 text-sm font-medium transition-colors"
            :class="activeTab === 'blocks' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'"
          >
            Blocs
          </button>
          <button
            @click="activeTab = 'settings'"
            class="flex-1 py-3 text-sm font-medium transition-colors"
            :class="activeTab === 'settings' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'"
          >
            Paramètres
          </button>
        </div>
        
        <!-- Contenu Tab Blocs -->
        <div v-if="activeTab === 'blocks'" class="flex-1 overflow-y-auto p-4">
          <p class="text-xs text-gray-500 mb-3">Cliquez pour ajouter</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="blockType in blockTypes"
              :key="blockType.value"
              @click="addBlock(blockType.value)"
              class="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
            >
              <div class="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center mb-2">
                <span class="text-xl">{{ getBlockIcon(blockType.value) }}</span>
              </div>
              <span class="text-xs text-gray-700 text-center">{{ blockType.label }}</span>
            </button>
          </div>
        </div>
        
        <!-- Contenu Tab Paramètres -->
        <div v-if="activeTab === 'settings'" class="flex-1 overflow-y-auto p-4 space-y-6">
          <!-- Informations -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Informations</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Slug (URL)</label>
                <div class="flex">
                  <span class="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500">
                    leekpay.me/
                  </span>
                  <input
                    v-model="page.slug"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="mon-offre"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-xs text-gray-500 mb-1">Titre SEO</label>
                <input
                  v-model="page.meta_title"
                  type="text"
                  maxlength="70"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Titre pour les moteurs de recherche"
                />
              </div>
              
              <div>
                <label class="block text-xs text-gray-500 mb-1">Description SEO</label>
                <textarea
                  v-model="page.meta_description"
                  rows="2"
                  maxlength="160"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Description pour les moteurs de recherche"
                />
              </div>
            </div>
          </div>
          
          <!-- Lien de paiement -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Checkout</h3>
            <select
              v-model="page.payment_link_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option :value="null">Aucun lien de paiement</option>
              <option v-for="link in paymentLinks" :key="link.id" :value="link.id">
                {{ link.title }} - {{ link.amount }} {{ link.currency }}
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-1">Les boutons CTA redirigeront vers ce lien</p>
          </div>
          
          <!-- Thème -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Thème</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Couleur principale</label>
                <div class="flex items-center space-x-2">
                  <input
                    v-model="page.theme.primaryColor"
                    type="color"
                    class="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    v-model="page.theme.primaryColor"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-xs text-gray-500 mb-1">Police</label>
                <select
                  v-model="page.theme.fontFamily"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Domaine personnalisé -->
          <div v-if="page.id">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Domaine personnalisé</h3>
            <CustomDomainConfig
              :page-id="page.id"
              :custom-domain="page.custom_domain"
              :domain-verified="page.domain_verified"
              @updated="handleDomainUpdate"
            />
          </div>
          
          <!-- Tracking & Analytics -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Tracking & Analytics
            </h3>
            <div class="space-y-3">
              <!-- Facebook Pixel -->
              <div>
                <label class="flex items-center text-xs text-gray-500 mb-1">
                  <svg class="w-4 h-4 mr-1.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Pixel ID
                </label>
                <input
                  v-model="page.settings.tracking.facebookPixelId"
                  type="text"
                  placeholder="Ex: 1234567890123456"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <!-- Google Analytics -->
              <div>
                <label class="flex items-center text-xs text-gray-500 mb-1">
                  <svg class="w-4 h-4 mr-1.5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                  </svg>
                  Google Analytics (GA4)
                </label>
                <input
                  v-model="page.settings.tracking.googleAnalyticsId"
                  type="text"
                  placeholder="Ex: G-XXXXXXXXXX"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <!-- Google Tag Manager -->
              <div>
                <label class="flex items-center text-xs text-gray-500 mb-1">
                  <svg class="w-4 h-4 mr-1.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.25L19.5 6.5v10L12 21.25 4.5 16.5v-10L12 2.25z"/>
                    <path d="M12 6.75L7.5 9.5v5l4.5 2.75 4.5-2.75v-5L12 6.75z"/>
                  </svg>
                  Google Tag Manager
                </label>
                <input
                  v-model="page.settings.tracking.googleTagManagerId"
                  type="text"
                  placeholder="Ex: GTM-XXXXXXX"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <!-- TikTok Pixel -->
              <div>
                <label class="flex items-center text-xs text-gray-500 mb-1">
                  <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok Pixel ID
                </label>
                <input
                  v-model="page.settings.tracking.tiktokPixelId"
                  type="text"
                  placeholder="Ex: CXXXXXXXXXX"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <!-- Code personnalisé (avancé) -->
              <div>
                <label class="flex items-center text-xs text-gray-500 mb-1">
                  <svg class="w-4 h-4 mr-1.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  Code personnalisé (avancé)
                </label>
                <textarea
                  v-model="page.settings.tracking.customCode"
                  rows="3"
                  placeholder="<script>...</script>"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 resize-none font-mono text-xs"
                />
                <p class="text-[10px] text-gray-400 mt-1">Pour d'autres scripts de tracking (Hotjar, Clarity, etc.)</p>
              </div>
              
              <!-- Bouton Appliquer -->
              <button
                @click="handleSave"
                :disabled="isSaving"
                class="w-full mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ isSaving ? 'Enregistrement...' : 'Appliquer' }}
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Zone de Preview/Édition -->
      <main class="flex-1 overflow-y-auto bg-gray-200">
        <div 
          class="max-w-5xl mx-auto my-4 sm:my-8 bg-white shadow-xl rounded-lg overflow-hidden"
          :class="{ 'ring-2 ring-emerald-400': !previewMode }"
        >
          <!-- Message si vide -->
          <div 
            v-if="!hasBlocks"
            class="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
          >
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Commencez à créer</h3>
            <p class="text-gray-500 mb-6 max-w-sm">
              Ajoutez des blocs depuis le panneau de gauche pour construire votre page de vente
            </p>
            <button
              @click="addBlock('hero')"
              class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Ajouter un Hero
            </button>
          </div>
          
          <!-- Blocs -->
          <draggable
            v-if="hasBlocks"
            v-model="page.blocks"
            item-key="id"
            :disabled="previewMode"
            handle=".drag-handle"
            ghost-class="opacity-50"
            @end="reorderBlocks"
            class="min-h-[60vh]"
          >
            <template #item="{ element: block }">
              <div 
                class="relative group"
                :class="{ 'ring-2 ring-emerald-400 ring-inset': selectedBlockId === block.id && !previewMode }"
                @click="selectBlock(block.id)"
              >
                <!-- Actions du bloc -->
                <div 
                  v-if="!previewMode"
                  class="absolute top-2 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="drag-handle p-1.5 bg-white rounded shadow hover:bg-gray-50 cursor-move"
                    title="Déplacer"
                  >
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                  <button
                    @click.stop="duplicateBlock(block.id)"
                    class="p-1.5 bg-white rounded shadow hover:bg-gray-50"
                    title="Dupliquer"
                  >
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    @click.stop="removeBlock(block.id)"
                    class="p-1.5 bg-white rounded shadow hover:bg-red-50"
                    title="Supprimer"
                  >
                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <!-- Rendu du bloc -->
                <SalesBlockRenderer 
                  :block="block" 
                  :checkout-url="checkoutUrl"
                />
              </div>
            </template>
          </draggable>
        </div>
      </main>
      
      <!-- Sidebar Droite - Propriétés du bloc sélectionné -->
      <aside 
        v-if="!previewMode && selectedBlock"
        class="w-72 lg:w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden flex-shrink-0"
      >
        <div class="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="font-semibold text-gray-900">Propriétés</h3>
          <button @click="selectBlock(null)" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4">
          <BlockPropsEditor
            :block="selectedBlock"
            @update="updateBlockProps(selectedBlock.id, $event)"
          />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useSalesPageBuilder } from '~/composables/useSalesPageBuilder'
import SalesBlockRenderer from '~/components/sales-page/SalesBlockRenderer.vue'
import BlockPropsEditor from '~/components/sales-page/BlockPropsEditor.vue'
import CustomDomainConfig from '~/components/sales-page/CustomDomainConfig.vue'

const props = defineProps<{
  pageId?: string | number
  templateId?: number | null
  editTemplateId?: number | null  // Pour éditer un template existant (mode admin)
}>()

const {
  page,
  blockTypes,
  selectedBlockId,
  selectedBlock,
  isDirty,
  isSaving,
  isLoading,
  previewMode,
  hasBlocks,
  fetchBlockTypes,
  fetchPage,
  savePage,
  publishPage,
  unpublishPage,
  addBlock,
  removeBlock,
  duplicateBlock,
  updateBlockProps,
  selectBlock,
  reorderBlocks,
  togglePreview,
  applyTemplate,
} = useSalesPageBuilder()

const activeTab = ref<'blocks' | 'settings'>('blocks')
const paymentLinks = ref<any[]>([])
const isTemplateMode = computed(() => !!props.editTemplateId)
const templateData = ref<{ name: string; category: string } | null>(null)

// Charger les liens de paiement pour le checkout
const fetchPaymentLinks = async () => {
  try {
    const config = useRuntimeConfig()
    const { token } = useAuth()
    if (!token.value) return
    
    const response = await $fetch<{ data: any[] }>(
      '/payment-links',
      {
        baseURL: config.public.apiBaseURL,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    paymentLinks.value = response.data || []
  } catch (err) {
    console.error('Erreur chargement payment links:', err)
  }
}

const checkoutUrl = computed(() => {
  if (!page.value.payment_link_id) return ''
  const link = paymentLinks.value.find(l => l.id === page.value.payment_link_id)
  if (!link) return ''
  const config = useRuntimeConfig()
  const baseUrl = config.public.appUrl || 'https://leekpay.me'
  return `${baseUrl}/${link.custom_url}`
})

const getBlockIcon = (type: string): string => {
  const icons: Record<string, string> = {
    header: '📑',
    hero: '🎯',
    text: '📝',
    image: '🖼️',
    video: '🎬',
    features: '✅',
    testimonials: '💬',
    pricing: '💰',
    faq: '❓',
    cta: '🔘',
    countdown: '⏰',
    product: '🛒',
    grid: '⊞',
    footer: '📄',
  }
  return icons[type] || '📦'
}

const saveError = ref<string | null>(null)

const handleSave = async () => {
  saveError.value = null
  
  // En mode template, sauvegarder le template
  if (isTemplateMode.value) {
    try {
      await saveTemplateChanges()
      saveError.value = null
    } catch (err: any) {
      saveError.value = err.message || 'Erreur lors de la sauvegarde du template'
    }
    return
  }
  
  // Validation du titre (seulement pour les pages)
  if (!page.value.title || page.value.title.trim() === '') {
    saveError.value = 'Le titre de la page est obligatoire'
    // Focus sur le champ titre
    const titleInput = document.querySelector('input[placeholder="Entrez le titre de la page"]') as HTMLInputElement
    if (titleInput) titleInput.focus()
    return
  }
  
  try {
    await savePage()
    saveError.value = null
  } catch (err: any) {
    saveError.value = err.data?.message || 'Erreur lors de la sauvegarde'
  }
}

const handlePublish = async () => {
  try {
    if (page.value.is_published) {
      await unpublishPage()
    } else {
      await publishPage()
    }
  } catch (err) {
    // Notification d'erreur
  }
}

const handleDomainUpdate = (data: { custom_domain: string | null; domain_verified: boolean }) => {
  page.value.custom_domain = data.custom_domain
  page.value.domain_verified = data.domain_verified
}

onMounted(async () => {
  await fetchBlockTypes()
  await fetchPaymentLinks()
  
  if (props.pageId) {
    await fetchPage(props.pageId)
  } else if (props.editTemplateId) {
    // Charger un template existant pour édition (mode admin)
    await loadTemplateForEdit(props.editTemplateId)
  } else if (props.templateId) {
    // Appliquer le template sélectionné (mode utilisateur)
    await applyTemplate(props.templateId)
  }
})

// Charger un template pour édition
const loadTemplateForEdit = async (templateId: number) => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  try {
    const response = await $fetch<any>(`/admin/sales-page-templates/${templateId}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success && response.data) {
      templateData.value = { name: response.data.name, category: response.data.category }
      page.value.blocks = response.data.blocks || []
      page.value.theme = response.data.theme || page.value.theme
      page.value.settings = {
        ...page.value.settings,
        showBranding: response.data.settings?.showBranding ?? true,
        customCss: response.data.settings?.customCss || '',
      }
    }
  } catch (err) {
    console.error('Erreur chargement template:', err)
  }
}

// Sauvegarder le template (mode admin)
const saveTemplateChanges = async () => {
  if (!props.editTemplateId || !templateData.value) return
  const config = useRuntimeConfig()
  const { token } = useAuth()
  try {
    await $fetch(`/admin/sales-page-templates/${props.editTemplateId}`, {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        name: templateData.value.name,
        category: templateData.value.category,
        blocks: page.value.blocks,
        theme: page.value.theme,
        settings: {
          showBranding: page.value.settings.showBranding,
          customCss: page.value.settings.customCss,
        },
      }
    })
    return true
  } catch (err) {
    console.error('Erreur sauvegarde template:', err)
    return false
  }
}

// Exposer pour la page parente
defineExpose({ saveTemplateChanges, templateData, isTemplateMode })
</script>
