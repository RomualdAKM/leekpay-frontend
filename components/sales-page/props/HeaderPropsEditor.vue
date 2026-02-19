<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <!-- ===== SECTION LOGO ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.logo = !sections.logo" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Logo</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.logo ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.logo" class="mt-3 space-y-4">
        <!-- Image du logo -->
        <div>
          <UiImageUploader
            v-model="localProps.logoUrl"
            label="Logo"
            @update:model-value="updateLogoUrl"
          />
        </div>
        
        <!-- Texte alternatif au logo -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte si pas de logo</label>
          <input v-model="localProps.logoText" @input="emitUpdate" type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Ma Marque" />
        </div>
        
        <!-- Taille du logo -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Largeur (px)</label>
            <input v-model.number="localProps.logoWidth" @input="emitUpdate" type="number" min="20" max="400"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="120" />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Hauteur (px)</label>
            <input v-model.number="localProps.logoHeight" @input="emitUpdate" type="number" min="20" max="200"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="40" />
          </div>
        </div>
        
        <!-- Lien du logo -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Lien du logo</label>
          <input v-model="localProps.logoLink" @input="emitUpdate" type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="/" />
        </div>
        
        <!-- Séparateur - Options avancées -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Options avancées</p>
          
          <!-- Ajustement de l'image -->
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ajustement</label>
              <select v-model="localProps.logoObjectFit" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="contain">Contenir</option>
                <option value="cover">Couvrir</option>
                <option value="fill">Remplir</option>
                <option value="none">Aucun</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Position</label>
              <select v-model="localProps.logoObjectPosition" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="center">Centre</option>
                <option value="top">Haut</option>
                <option value="bottom">Bas</option>
                <option value="left">Gauche</option>
                <option value="right">Droite</option>
              </select>
            </div>
          </div>
          
          <!-- Opacité -->
          <div class="mb-3">
            <label class="block text-xs text-gray-500 mb-1">Opacité ({{ localProps.logoOpacity || 100 }}%)</label>
            <input v-model.number="localProps.logoOpacity" @input="emitUpdate" type="range" min="10" max="100" step="5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        
        <!-- Séparateur - Style -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Style</p>
          
          <!-- Arrondi et Ombre -->
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
              <select v-model="localProps.logoBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun</option>
                <option value="small">Petit (4px)</option>
                <option value="medium">Moyen (8px)</option>
                <option value="large">Grand (16px)</option>
                <option value="full">Rond</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ombre</label>
              <select v-model="localProps.logoShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="small">Légère</option>
                <option value="medium">Moyenne</option>
                <option value="large">Forte</option>
              </select>
            </div>
          </div>
          
          <!-- Bordure -->
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="localProps.logoShowBorder" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Ajouter une bordure</label>
          </div>
          <div v-if="localProps.logoShowBorder" class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Épaisseur (px)</label>
              <input v-model.number="localProps.logoBorderWidth" @input="emitUpdate" type="number" min="1" max="10"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.logoBorderColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.logoBorderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Effets -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Effets</p>
          
          <!-- Effet au survol -->
          <div class="mb-3">
            <label class="block text-xs text-gray-500 mb-1">Effet au survol</label>
            <select v-model="localProps.logoHoverEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="scale">Zoom</option>
              <option value="brightness">Luminosité</option>
              <option value="opacity">Opacité réduite</option>
              <option value="shadow">Ombre portée</option>
              <option value="lift">Élévation</option>
            </select>
          </div>
          
          <!-- Filtre -->
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Filtre</label>
              <select v-model="localProps.logoFilter" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun</option>
                <option value="grayscale">Noir et blanc</option>
                <option value="sepia">Sépia</option>
                <option value="brightness">Luminosité</option>
                <option value="contrast">Contraste</option>
              </select>
            </div>
            <div v-if="localProps.logoFilter && localProps.logoFilter !== 'none'">
              <label class="block text-xs text-gray-500 mb-1">Intensité ({{ localProps.logoFilterIntensity || 100 }}%)</label>
              <input v-model.number="localProps.logoFilterIntensity" @input="emitUpdate" type="range" min="10" max="200" step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" />
            </div>
          </div>
          <div v-if="localProps.logoFilter && localProps.logoFilter !== 'none'" class="flex items-center gap-2 mb-3">
            <input type="checkbox" v-model="localProps.logoFilterHoverReset" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Désactiver le filtre au survol</label>
          </div>
          
          <!-- Animation -->
          <div>
            <label class="block text-xs text-gray-500 mb-1">Animation au chargement</label>
            <select v-model="localProps.logoAnimation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="fade">Fondu</option>
              <option value="slide-up">Glissement vers le haut</option>
              <option value="scale">Zoom</option>
              <option value="bounce">Rebond</option>
            </select>
          </div>
        </div>
        
        <!-- Séparateur - Responsive -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Mobile</p>
          
          <!-- Masquer sur mobile -->
          <div class="flex items-center gap-2 mb-3">
            <input type="checkbox" v-model="localProps.logoHideOnMobile" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Masquer le logo sur mobile</label>
          </div>
          
          <!-- Taille mobile -->
          <div v-if="!localProps.logoHideOnMobile" class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Largeur mobile (px)</label>
              <input v-model.number="localProps.logoMobileWidth" @input="emitUpdate" type="number" min="30" max="200"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="100" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Hauteur mobile (px)</label>
              <input v-model.number="localProps.logoMobileHeight" @input="emitUpdate" type="number" min="20" max="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="32" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SECTION NAVIGATION ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.navigation = !sections.navigation" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Navigation</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.navigation ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.navigation" class="mt-3 space-y-4">
        <!-- Activer la navigation -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showNavigation" @change="emitUpdate" 
            class="rounded text-emerald-500 focus:ring-emerald-500" />
          <label class="text-xs text-gray-600">Afficher la navigation</label>
        </div>
        
        <!-- Items de navigation -->
        <div v-if="localProps.showNavigation" class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-xs text-gray-500">Liens du menu</label>
            <button @click="addNavItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
          </div>
          
          <div v-for="(item, index) in (localProps.navItems || [])" :key="index" 
            class="p-3 bg-gray-50 rounded-lg space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs font-medium text-gray-600">Lien {{ index + 1 }}</span>
              <button @click="removeNavItem(index)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
            </div>
            <input :value="item.text" @input="updateNavItemField(index, 'text', $event)" 
              type="text" placeholder="Texte" class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" />
            <input :value="item.url" @input="updateNavItemField(index, 'url', $event)" 
              type="text" placeholder="URL (#section ou https://...)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" />
          </div>
        </div>
        
        <!-- Position et espacement -->
        <div v-if="localProps.showNavigation" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Position</label>
            <select v-model="localProps.navPosition" @change="emitUpdate" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement</label>
            <select v-model="localProps.navGap" @change="emitUpdate" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit (16px)</option>
              <option value="medium">Moyen (24px)</option>
              <option value="large">Grand (32px)</option>
              <option value="xlarge">Très grand (48px)</option>
            </select>
          </div>
        </div>
        
        <!-- Séparateur - Padding des liens -->
        <div v-if="localProps.showNavigation" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Padding des liens</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Horizontal (px)</label>
              <input v-model.number="localProps.navLinkPaddingX" @input="emitUpdate" type="number" min="0" max="40"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Vertical (px)</label>
              <input v-model.number="localProps.navLinkPaddingY" @input="emitUpdate" type="number" min="0" max="20"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0" />
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Style de survol -->
        <div v-if="localProps.showNavigation" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Effet au survol</p>
          <p class="text-[10px] text-gray-400 mb-3 italic">Visible uniquement sur la navigation desktop (pas mobile)</p>
          
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Style</label>
              <select v-model="localProps.navHoverStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun</option>
                <option value="underline">Soulignement</option>
                <option value="background">Fond coloré</option>
                <option value="border-bottom">Bordure bas</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Animation</label>
              <select v-model="localProps.navHoverAnimation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="slide">Glissement</option>
                <option value="fade">Fondu</option>
                <option value="expand">Expansion</option>
              </select>
            </div>
          </div>
          
          <!-- Couleurs pour le survol -->
          <div v-if="localProps.navHoverStyle === 'background'" class="mb-3">
            <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
            <div class="flex items-center gap-2">
              <input v-model="localProps.navHoverBgColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
              <input v-model="localProps.navHoverBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
            </div>
          </div>
          
          <div v-if="localProps.navHoverStyle === 'underline' || localProps.navHoverStyle === 'border-bottom'" class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur ligne</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.navUnderlineColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.navUnderlineColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Épaisseur (px)</label>
              <input v-model.number="localProps.navUnderlineHeight" @input="emitUpdate" type="number" min="1" max="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Séparateurs entre liens -->
        <div v-if="localProps.showNavigation" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Séparateurs</p>
          
          <div class="flex items-center gap-2 mb-3">
            <input type="checkbox" v-model="localProps.navShowSeparator" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Afficher des séparateurs</label>
          </div>
          
          <div v-if="localProps.navShowSeparator" class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Type</label>
              <select v-model="localProps.navSeparatorType" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="pipe">Barre |</option>
                <option value="dot">Point •</option>
                <option value="slash">Slash /</option>
                <option value="dash">Tiret —</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.navSeparatorColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.navSeparatorColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Lien actif -->
        <div v-if="localProps.showNavigation" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Lien actif</p>
          
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Style actif</label>
              <select v-model="localProps.navActiveStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun</option>
                <option value="color">Couleur</option>
                <option value="underline">Soulignement</option>
                <option value="background">Fond</option>
                <option value="bold">Gras</option>
              </select>
            </div>
            <div v-if="localProps.navActiveStyle && localProps.navActiveStyle !== 'none' && localProps.navActiveStyle !== 'bold'">
              <label class="block text-xs text-gray-500 mb-1">Couleur actif</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.navActiveColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.navActiveColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SECTION BOUTON CTA ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cta = !sections.cta" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton d'action</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cta ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.cta" class="mt-3 space-y-3">
        <!-- Activer le bouton CTA -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showCta" @change="emitUpdate" 
            class="rounded text-emerald-500 focus:ring-emerald-500" />
          <label class="text-xs text-gray-600">Afficher le bouton</label>
        </div>
        
        <template v-if="localProps.showCta">
          <!-- Texte du bouton -->
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <input v-model="localProps.ctaText" @input="emitUpdate" type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Acheter maintenant" />
          </div>
          
          <!-- URL du bouton -->
          <div>
            <label class="block text-xs text-gray-500 mb-1">Lien du bouton</label>
            <UiLinkSelector
              v-model="localProps.ctaUrl"
              :link-type="localProps.ctaLinkType || 'custom'"
              :payment-link-id="localProps.ctaPaymentLinkId"
              @update:link-type="(val) => { localProps.ctaLinkType = val; emitUpdate() }"
              @update:payment-link-id="(val) => { localProps.ctaPaymentLinkId = val; emitUpdate() }"
              @change="emitUpdate"
            />
          </div>
          
          <!-- Couleurs du bouton -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.ctaBgColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.ctaBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur texte</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.ctaTextColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.ctaTextColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
          
          <!-- Style du bouton -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
              <select v-model="localProps.ctaRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun (0px)</option>
                <option value="small">Petit (4px)</option>
                <option value="medium">Moyen (8px)</option>
                <option value="large">Grand (16px)</option>
                <option value="full">Complet (pill)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.ctaSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
              </select>
            </div>
          </div>
          
          <!-- Padding personnalisé du bouton -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Padding X (px)</label>
              <input v-model.number="localProps.ctaPaddingX" @input="emitUpdate" type="number" min="0" max="100"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="24" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Padding Y (px)</label>
              <input v-model.number="localProps.ctaPaddingY" @input="emitUpdate" type="number" min="0" max="50"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="12" />
            </div>
          </div>
          
          <!-- Ombre du bouton -->
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ombre</label>
            <select v-model="localProps.ctaShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="small">Légère</option>
              <option value="medium">Moyenne</option>
              <option value="large">Forte</option>
            </select>
          </div>
          
          <!-- Séparateur - Icône -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Icône</p>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Icône</label>
                <select v-model="localProps.ctaIcon" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="">Aucune</option>
                  <option value="arrow-right">Flèche droite →</option>
                  <option value="arrow-left">Flèche gauche ←</option>
                  <option value="cart">Panier 🛒</option>
                  <option value="check">Check ✓</option>
                  <option value="chevron-right">Chevron ›</option>
                  <option value="external-link">Lien externe</option>
                  <option value="download">Télécharger</option>
                  <option value="play">Lecture</option>
                  <option value="heart">Cœur</option>
                  <option value="star">Étoile</option>
                  <option value="zap">Éclair</option>
                  <option value="send">Envoyer</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Position</label>
                <select v-model="localProps.ctaIconPosition" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="left">Gauche</option>
                  <option value="right">Droite</option>
                </select>
              </div>
            </div>
            <div v-if="localProps.ctaIcon" class="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Taille (px)</label>
                <input v-model.number="localProps.ctaIconSize" @input="emitUpdate" type="number" min="12" max="32"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Espacement (px)</label>
                <input v-model.number="localProps.ctaIconGap" @input="emitUpdate" type="number" min="4" max="16"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
          
          <!-- Séparateur - Bordure -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Bordure</p>
            <div class="flex items-center gap-2 mb-3">
              <input type="checkbox" v-model="localProps.ctaShowBorder" @change="emitUpdate" 
                class="rounded text-emerald-500 focus:ring-emerald-500" />
              <label class="text-xs text-gray-600">Afficher une bordure</label>
            </div>
            <div v-if="localProps.ctaShowBorder" class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Style</label>
                <select v-model="localProps.ctaBorderStyle" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs">
                  <option value="solid">Solide</option>
                  <option value="dashed">Tirets</option>
                  <option value="dotted">Points</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Épaisseur</label>
                <input v-model.number="localProps.ctaBorderWidth" @input="emitUpdate" type="number" min="1" max="6"
                  class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Couleur</label>
                <div class="flex items-center gap-2">
                  <input v-model="localProps.ctaBorderColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                  <input v-model="localProps.ctaBorderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Séparateur - Effets survol -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Effet au survol</p>
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Type</label>
                <select v-model="localProps.ctaHoverEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="none">Aucun</option>
                  <option value="scale">Agrandir</option>
                  <option value="glow">Lueur</option>
                  <option value="lift">Soulever</option>
                  <option value="slide">Glissement</option>
                  <option value="inverse">Inverser</option>
                </select>
              </div>
              <div v-if="localProps.ctaHoverEffect === 'scale'">
                <label class="block text-xs text-gray-500 mb-1">Échelle (%)</label>
                <input v-model.number="localProps.ctaHoverScale" @input="emitUpdate" type="number" min="100" max="130"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
            <div v-if="localProps.ctaHoverEffect && localProps.ctaHoverEffect !== 'none'" class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Couleur fond hover</label>
                <div class="flex items-center gap-2">
                  <input v-model="localProps.ctaHoverBgColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                  <input v-model="localProps.ctaHoverBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
                </div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Couleur texte hover</label>
                <div class="flex items-center gap-2">
                  <input v-model="localProps.ctaHoverTextColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                  <input v-model="localProps.ctaHoverTextColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Séparateur - Animation -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Animation</p>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Animation continue</label>
              <select v-model="localProps.ctaAnimation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="pulse">Pulsation</option>
                <option value="bounce">Rebond</option>
                <option value="shimmer">Brillance</option>
              </select>
            </div>
          </div>
          
          <!-- Séparateur - Second bouton -->
          <div class="border-t border-gray-100 pt-3">
            <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Bouton secondaire</p>
            <div class="flex items-center gap-2 mb-3">
              <input type="checkbox" v-model="localProps.showSecondCta" @change="emitUpdate" 
                class="rounded text-emerald-500 focus:ring-emerald-500" />
              <label class="text-xs text-gray-600">Afficher un second bouton</label>
            </div>
            <div v-if="localProps.showSecondCta" class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Texte</label>
                <input v-model="localProps.secondCtaText" @input="emitUpdate" type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="En savoir plus" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Lien</label>
                <UiLinkSelector
                  v-model="localProps.secondCtaUrl"
                  :link-type="localProps.secondCtaLinkType || 'custom'"
                  :payment-link-id="localProps.secondCtaPaymentLinkId"
                  @update:link-type="(val) => { localProps.secondCtaLinkType = val; emitUpdate() }"
                  @update:payment-link-id="(val) => { localProps.secondCtaPaymentLinkId = val; emitUpdate() }"
                  @change="emitUpdate"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Style</label>
                  <select v-model="localProps.secondCtaStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="outline">Contour</option>
                    <option value="ghost">Transparent</option>
                    <option value="link">Lien</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Couleur</label>
                  <div class="flex items-center gap-2">
                    <input v-model="localProps.secondCtaColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                    <input v-model="localProps.secondCtaColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- ===== SECTION APPARENCE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.appearance = !sections.appearance" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Apparence</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.appearance ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.appearance" class="mt-3 space-y-3">
        <!-- Type de fond -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Type de fond</label>
          <select v-model="localProps.backgroundType" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="solid">Couleur unie</option>
            <option value="gradient">Dégradé</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        
        <!-- Couleur de fond (si solid) -->
        <div v-if="localProps.backgroundType === 'solid' || !localProps.backgroundType">
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center gap-2">
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <!-- Dégradé (si gradient) -->
        <template v-if="localProps.backgroundType === 'gradient'">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur 1</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.gradientStart" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.gradientStart" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur 2</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.gradientEnd" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.gradientEnd" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Direction</label>
            <select v-model="localProps.gradientDirection" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="to-r">Gauche → Droite</option>
              <option value="to-l">Droite → Gauche</option>
              <option value="to-b">Haut → Bas</option>
              <option value="to-t">Bas → Haut</option>
              <option value="to-br">Diagonale ↘</option>
              <option value="to-bl">Diagonale ↙</option>
            </select>
          </div>
        </template>
        
        <!-- Hauteur du header -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Hauteur</label>
          <select v-model="localProps.height" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit (48px)</option>
            <option value="medium">Moyen (64px)</option>
            <option value="large">Grand (80px)</option>
            <option value="xlarge">Très grand (100px)</option>
            <option value="custom">Personnalisé</option>
          </select>
        </div>
        
        <!-- Hauteur personnalisée -->
        <div v-if="localProps.height === 'custom'">
          <label class="block text-xs text-gray-500 mb-1">Hauteur (px)</label>
          <input v-model.number="localProps.heightCustom" @input="emitUpdate" type="number" min="30" max="200"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="70" />
        </div>
        
        <!-- Padding horizontal -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Padding horizontal</label>
          <select v-model="localProps.paddingX" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit (16px)</option>
            <option value="medium">Moyen (24px)</option>
            <option value="large">Grand (48px)</option>
            <option value="xlarge">Très grand (64px)</option>
          </select>
        </div>
        
        <!-- Largeur max du contenu -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Largeur max du contenu</label>
          <select v-model="localProps.maxWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="full">Pleine largeur</option>
            <option value="7xl">1280px</option>
            <option value="6xl">1152px</option>
            <option value="5xl">1024px</option>
            <option value="4xl">896px</option>
          </select>
        </div>
        
        <!-- Sticky -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.sticky" @change="emitUpdate" 
            class="rounded text-emerald-500 focus:ring-emerald-500" />
          <label class="text-xs text-gray-600">Header fixe (sticky)</label>
        </div>
        
        <!-- Effet au scroll (si sticky) -->
        <div v-if="localProps.sticky">
          <label class="block text-xs text-gray-500 mb-1">Effet au scroll</label>
          <select v-model="localProps.scrollEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="shadow">Ajouter ombre</option>
            <option value="shrink">Réduire hauteur</option>
            <option value="color">Changer couleur de fond</option>
          </select>
        </div>
        
        <!-- Couleur au scroll (si effet color) -->
        <div v-if="localProps.sticky && localProps.scrollEffect === 'color'">
          <label class="block text-xs text-gray-500 mb-1">Couleur au scroll</label>
          <div class="flex items-center gap-2">
            <input v-model="localProps.scrollBgColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
            <input v-model="localProps.scrollBgColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SECTION BORDURE ET OMBRE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.border = !sections.border" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bordure & Ombre</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.border ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.border" class="mt-3 space-y-3">
        <!-- Bordure en bas -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showBorder" @change="emitUpdate" 
            class="rounded text-emerald-500 focus:ring-emerald-500" />
          <label class="text-xs text-gray-600">Bordure en bas</label>
        </div>
        
        <template v-if="localProps.showBorder">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Épaisseur</label>
              <select v-model="localProps.borderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="1">1px</option>
                <option value="2">2px</option>
                <option value="3">3px</option>
                <option value="4">4px</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.borderColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.borderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
              </div>
            </div>
          </div>
        </template>
        
        <!-- Ombre -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ombre</label>
          <select v-model="localProps.shadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="small">Légère</option>
            <option value="medium">Moyenne</option>
            <option value="large">Forte</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ===== SECTION TYPOGRAPHIE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.typography = !sections.typography" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Typographie</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.typography ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.typography" class="mt-3 space-y-3">
        <!-- Couleur du texte -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur du texte</label>
          <div class="flex items-center gap-2">
            <input v-model="localProps.textColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
            <input v-model="localProps.textColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <!-- Police des liens -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Police</label>
          <select v-model="localProps.fontFamily" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Par défaut (System)</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Poppins', sans-serif">Poppins</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
          </select>
        </div>
        
        <!-- Taille et poids -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.fontSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="xs">Très petit (12px)</option>
              <option value="sm">Petit (14px)</option>
              <option value="base">Normal (16px)</option>
              <option value="lg">Grand (18px)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.fontWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="normal">Normal (400)</option>
              <option value="medium">Medium (500)</option>
              <option value="semibold">Semi-gras (600)</option>
              <option value="bold">Gras (700)</option>
            </select>
          </div>
        </div>
        
        <!-- Transformation -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Transformation</label>
          <select v-model="localProps.textTransform" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="uppercase">MAJUSCULES</option>
            <option value="lowercase">minuscules</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>
        
        <!-- Espacement lettres -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement des lettres</label>
          <select v-model="localProps.letterSpacing" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="tight">Serré</option>
            <option value="normal">Normal</option>
            <option value="wide">Espacé</option>
            <option value="wider">Très espacé</option>
          </select>
        </div>
        
        <!-- Couleur hover -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur au survol</label>
          <div class="flex items-center gap-2">
            <input v-model="localProps.hoverColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
            <input v-model="localProps.hoverColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SECTION DISPOSITION ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.layout = !sections.layout" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Disposition</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.layout ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.layout" class="mt-3 space-y-3">
        <!-- Layout -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Disposition</label>
          <select v-model="localProps.layout" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="logo-left">Logo à gauche</option>
            <option value="logo-center">Logo centré</option>
            <option value="logo-right">Logo à droite</option>
          </select>
        </div>
        
        <!-- Alignement vertical -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement vertical</label>
          <select v-model="localProps.alignItems" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="start">Haut</option>
            <option value="center">Centre</option>
            <option value="end">Bas</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ===== SECTION MOBILE ===== -->
    <div class="pb-4">
      <button @click="sections.mobile = !sections.mobile" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Mobile</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.mobile ? 'rotate-180' : '']" />
      </button>
      
      <div v-show="sections.mobile" class="mt-3 space-y-3">
        <!-- Style du menu hamburger -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Icône menu mobile</label>
          <select v-model="localProps.mobileMenuIcon" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="bars">Barres (☰)</option>
            <option value="dots">Points (⋮)</option>
          </select>
        </div>
        
        <!-- Style du menu mobile ouvert -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style menu ouvert</label>
          <select v-model="localProps.mobileMenuStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="dropdown">Déroulant</option>
            <option value="fullscreen">Plein écran</option>
            <option value="sidebar">Sidebar</option>
          </select>
        </div>
        
        <!-- Couleur de fond menu mobile -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond menu mobile</label>
          <div class="flex items-center gap-2">
            <input v-model="localProps.mobileMenuBg" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
            <input v-model="localProps.mobileMenuBg" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <!-- Séparateur - Animation -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Animation</p>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Animation d'ouverture</label>
            <select v-model="localProps.mobileMenuAnimation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune (défaut)</option>
              <option value="slide">Glissement</option>
              <option value="fade">Fondu</option>
              <option value="scale">Zoom</option>
            </select>
          </div>
        </div>
        
        <!-- Séparateur - Overlay -->
        <div v-if="localProps.mobileMenuStyle === 'fullscreen' || localProps.mobileMenuStyle === 'sidebar'" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Overlay</p>
          <div class="flex items-center gap-2 mb-3">
            <input type="checkbox" v-model="localProps.mobileShowOverlay" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Afficher un overlay sombre</label>
          </div>
          <div v-if="localProps.mobileShowOverlay" class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex items-center gap-2">
                <input v-model="localProps.mobileOverlayColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
                <input v-model="localProps.mobileOverlayColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Opacité ({{ localProps.mobileOverlayOpacity }}%)</label>
              <input v-model.number="localProps.mobileOverlayOpacity" @input="emitUpdate" type="range" min="10" max="90" step="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" />
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Style des liens -->
        <div class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Style des liens</p>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille texte</label>
              <select v-model="localProps.mobileLinkFontSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="sm">Petit</option>
                <option value="base">Normal</option>
                <option value="lg">Grand</option>
                <option value="xl">Très grand</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Poids</label>
              <select v-model="localProps.mobileLinkFontWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semi-gras</option>
                <option value="bold">Gras</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Padding X (px)</label>
              <input v-model.number="localProps.mobileLinkPaddingX" @input="emitUpdate" type="number" min="0" max="40"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Padding Y (px)</label>
              <input v-model.number="localProps.mobileLinkPaddingY" @input="emitUpdate" type="number" min="0" max="30"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="localProps.mobileLinkShowBorder" @change="emitUpdate" 
              class="rounded text-emerald-500 focus:ring-emerald-500" />
            <label class="text-xs text-gray-600">Bordure sous les liens</label>
          </div>
          <div v-if="localProps.mobileLinkShowBorder">
            <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
            <div class="flex items-center gap-2">
              <input v-model="localProps.mobileLinkBorderColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
              <input v-model="localProps.mobileLinkBorderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs" />
            </div>
          </div>
        </div>
        
        <!-- Séparateur - Comportement -->
        <div v-if="localProps.mobileMenuStyle === 'fullscreen' || localProps.mobileMenuStyle === 'sidebar'" class="border-t border-gray-100 pt-3">
          <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Comportement</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="localProps.mobileShowCloseButton" @change="emitUpdate" 
                class="rounded text-emerald-500 focus:ring-emerald-500" />
              <label class="text-xs text-gray-600">Afficher bouton fermer (×)</label>
            </div>
            <div v-if="localProps.mobileShowOverlay" class="flex items-center gap-2">
              <input type="checkbox" v-model="localProps.mobileCloseOnOverlayClick" @change="emitUpdate" 
                class="rounded text-emerald-500 focus:ring-emerald-500" />
              <label class="text-xs text-gray-600">Fermer au clic sur overlay</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

// Sections collapsibles
const sections = reactive({
  logo: true,
  navigation: true,
  cta: true,
  appearance: false,
  border: false,
  typography: false,
  layout: false,
  mobile: false,
})

// Props locales avec valeurs par défaut
const localProps = reactive({
  // Logo - Base
  logoUrl: '',
  logoText: '',
  logoWidth: 120,
  logoHeight: 40,
  logoLink: '/',
  // Logo - Ajustement
  logoObjectFit: 'contain',
  logoObjectPosition: 'center',
  logoOpacity: 100,
  // Logo - Style
  logoBorderRadius: 'none',
  logoShadow: 'none',
  logoShowBorder: false,
  logoBorderColor: '#e5e7eb',
  logoBorderWidth: 1,
  // Logo - Effets
  logoHoverEffect: 'none',
  logoHoverScale: 105,
  logoFilter: 'none',
  logoFilterIntensity: 100,
  logoFilterHoverReset: true,
  logoAnimation: 'none',
  // Logo - Responsive
  logoMobileWidth: 100,
  logoMobileHeight: 32,
  logoHideOnMobile: false,
  // Navigation
  showNavigation: true,
  navItems: [
    { text: 'Accueil', url: '#' },
    { text: 'À propos', url: '#' },
  ],
  navPosition: 'right',
  navGap: 'medium',
  // Navigation - Padding des liens
  navLinkPaddingX: 0,
  navLinkPaddingY: 0,
  // Navigation - Style de survol
  navHoverStyle: 'none',
  navHoverAnimation: 'none',
  navHoverBgColor: '#f3f4f6',
  navUnderlineHeight: 2,
  navUnderlineColor: '#10b981',
  // Navigation - Séparateurs
  navShowSeparator: false,
  navSeparatorType: 'pipe',
  navSeparatorColor: '#d1d5db',
  // Navigation - Lien actif
  navActiveStyle: 'none',
  navActiveColor: '#10b981',
  // CTA
  showCta: true,
  ctaText: 'Acheter',
  ctaUrl: '#',
  ctaLinkType: 'custom' as 'custom' | 'payment_link',
  ctaPaymentLinkId: null as number | null,
  ctaBgColor: '#10b981',
  ctaTextColor: '#ffffff',
  ctaRadius: 'medium',
  ctaSize: 'medium',
  ctaPaddingX: 24,
  ctaPaddingY: 12,
  ctaShadow: 'none',
  // CTA - Icône
  ctaIcon: '',
  ctaIconPosition: 'right',
  ctaIconSize: 16,
  ctaIconGap: 8,
  // CTA - Bordure
  ctaShowBorder: false,
  ctaBorderStyle: 'solid',
  ctaBorderColor: '#10b981',
  ctaBorderWidth: 2,
  // CTA - Effets survol
  ctaHoverEffect: 'none',
  ctaHoverBgColor: '#059669',
  ctaHoverTextColor: '#ffffff',
  ctaHoverScale: 105,
  // CTA - Animation
  ctaAnimation: 'none',
  // CTA - Second bouton
  showSecondCta: false,
  secondCtaText: 'En savoir plus',
  secondCtaUrl: '#',
  secondCtaLinkType: 'custom' as 'custom' | 'payment_link',
  secondCtaPaymentLinkId: null as number | null,
  secondCtaStyle: 'outline',
  secondCtaColor: '#10b981',
  // Apparence
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  gradientStart: '#ffffff',
  gradientEnd: '#f3f4f6',
  gradientDirection: 'to-r',
  height: 'medium',
  heightCustom: 70,
  paddingX: 'medium',
  maxWidth: 'full',
  sticky: false,
  scrollEffect: 'none',
  scrollBgColor: '#ffffff',
  // Bordure
  showBorder: true,
  borderWidth: '1',
  borderColor: '#e5e7eb',
  shadow: 'small',
  // Typographie
  textColor: '#1f2937',
  fontFamily: '',
  fontSize: 'sm',
  fontWeight: 'medium',
  textTransform: 'none',
  letterSpacing: 'normal',
  hoverColor: '#10b981',
  // Layout
  layout: 'logo-left',
  alignItems: 'center',
  // Mobile - Base
  mobileMenuIcon: 'bars',
  mobileMenuStyle: 'dropdown',
  mobileMenuBg: '#ffffff',
  // Mobile - Overlay
  mobileShowOverlay: false,
  mobileOverlayColor: '#000000',
  mobileOverlayOpacity: 50,
  // Mobile - Animation
  mobileMenuAnimation: 'none',
  // Mobile - Style des liens
  mobileLinkPaddingX: 16,
  mobileLinkPaddingY: 12,
  mobileLinkFontSize: 'base',
  mobileLinkFontWeight: 'medium',
  mobileLinkShowBorder: false,
  mobileLinkBorderColor: '#e5e7eb',
  // Mobile - Comportement
  mobileShowCloseButton: true,
  mobileCloseOnOverlayClick: true,
  ...props.props
})

watch(() => props.props, (newVal) => {
  Object.assign(localProps, newVal)
}, { deep: true })

const emitUpdate = () => {
  emit('update', { ...localProps })
}

// Mise à jour du logo avec valeur explicite pour éviter le problème de timing
const updateLogoUrl = (value: string) => {
  localProps.logoUrl = value
  emitUpdate()
}

// Navigation items management
function addNavItem() {
  localProps.navItems = [...(localProps.navItems || []), { text: '', url: '' }]
  emitUpdate()
}

function removeNavItem(index: number) {
  localProps.navItems = localProps.navItems.filter((_, i) => i !== index)
  emitUpdate()
}

function updateNavItem(index: number, field: string, value: string) {
  localProps.navItems = localProps.navItems.map((item, i) => 
    i === index ? { ...item, [field]: value } : item
  )
  emitUpdate()
}

function handleNavItemInput(index: number, field: string, event: Event) {
  const target = event.target as HTMLInputElement
  updateNavItem(index, field, target.value)
}

function updateNavItemField(index: number, field: string, event: Event) {
  const target = event.target as HTMLInputElement
  updateNavItem(index, field, target.value)
}
</script>
