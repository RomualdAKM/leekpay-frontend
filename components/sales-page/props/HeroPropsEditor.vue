<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <!-- Template Picker -->
    <TemplatePicker
      block-type="hero"
      :model-value="localProps.templateId"
      @select="updateProp('templateId', $event)"
    />
    
    <!-- ===== SECTION CONTENU ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div v-if="showBadge">
          <label class="block text-xs text-gray-500 mb-1">Étiquette (optionnel)</label>
          <input v-model="localProps.badge" @input="updateProp('badge', localProps.badge)" type="text" placeholder="Nouveau, Offre limitée..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre</label>
          <input v-model="localProps.title" @input="updateProp('title', localProps.title)" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <textarea v-model="localProps.subtitle" @input="updateProp('subtitle', localProps.subtitle)" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement du contenu</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="align in ['left', 'center', 'right']" :key="align" @click="updateProp('contentAlignment', align)" :class="['px-3 py-1.5 text-xs rounded border transition-colors', localProps.contentAlignment === align ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300 hover:border-gray-400']">
              {{ align === 'left' ? 'Gauche' : align === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Largeur max contenu</label>
          <select v-model="localProps.contentMaxWidth" @change="updateProp('contentMaxWidth', localProps.contentMaxWidth)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petite (640px)</option>
            <option value="medium">Moyenne (768px)</option>
            <option value="large">Grande (1024px)</option>
            <option value="xlarge">Très grande (1280px)</option>
            <option value="full">Pleine largeur</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION MEDIA ===== -->
    <div class="border-b border-gray-200 pb-4" v-if="needsMedia">
      <button @click="sections.media = !sections.media" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Média</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.media ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.media" class="mt-3 space-y-3">
        <div v-if="currentLayout !== 'video'">
          <UiImageUploader
            v-model="localProps.mediaUrl"
            label="Image"
            @update:model-value="updateProp('mediaUrl', $event)"
          />
        </div>
        
        <div v-if="currentLayout === 'video'">
          <label class="block text-xs text-gray-500 mb-1">URL de la vidéo (MP4)</label>
          <input v-model="localProps.videoUrl" @input="updateProp('videoUrl', localProps.videoUrl)" type="url" placeholder="https://...video.mp4" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div v-if="hasOverlay">
          <label class="block text-xs text-gray-500 mb-1">Opacité overlay: {{ localProps.overlayOpacity }}%</label>
          <input type="range" min="0" max="100" v-model.number="localProps.overlayOpacity" @input="updateProp('overlayOpacity', localProps.overlayOpacity)" class="w-full"/>
        </div>
        
        <div v-if="hasOverlay">
          <label class="block text-xs text-gray-500 mb-1">Couleur overlay</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.overlayColor" @input="updateProp('overlayColor', localProps.overlayColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.overlayColor" @input="updateProp('overlayColor', localProps.overlayColor)" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3" v-if="currentLayout !== 'video'">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Position image</label>
            <select v-model="localProps.imagePosition" @change="updateProp('imagePosition', localProps.imagePosition)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="top">Haut</option>
              <option value="center">Centre</option>
              <option value="bottom">Bas</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Filtre</label>
            <select v-model="localProps.imageFilter" @change="updateProp('imageFilter', localProps.imageFilter)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="grayscale">Noir & Blanc</option>
              <option value="blur">Flou</option>
              <option value="sepia">Sépia</option>
              <option value="brightness">Lumineux</option>
              <option value="contrast">Contraste</option>
            </select>
          </div>
        </div>
        
        <div v-if="currentLayout !== 'video'">
          <label class="block text-xs text-gray-500 mb-1">Arrondi image</label>
          <select v-model="localProps.imageRadius" @change="updateProp('imageRadius', localProps.imageRadius)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="full">Cercle</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION SLIDES (si slider) ===== -->
    <div class="border-b border-gray-200 pb-4" v-if="currentLayout === 'slider'">
      <button @click="sections.slides = !sections.slides" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Slides</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.slides ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.slides" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addSlide" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter slide</button>
        </div>
        
        <div v-for="(slide, index) in localProps.slides" :key="index" class="p-3 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-medium text-gray-600">Slide {{ index + 1 }}</span>
            <button @click="removeSlide(index)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <UiImageUploader
            v-model="slide.image"
            label="Image du slide"
            @update:model-value="updateSlides"
          />
          <input v-model="slide.title" @input="updateSlides" type="text" placeholder="Titre (optionnel)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs mt-2"/>
        </div>
        
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="localProps.autoplay" @change="updateProp('autoplay', localProps.autoplay)" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Lecture auto</span>
          </label>
          <div class="flex-1">
            <input type="number" v-model.number="localProps.autoplayInterval" @input="updateProp('autoplayInterval', localProps.autoplayInterval)" min="1000" step="500" class="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="Intervalle (ms)"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION BOUTON PRINCIPAL ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.ctaPrimary = !sections.ctaPrimary" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton Principal</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.ctaPrimary ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.ctaPrimary" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte</label>
          <input v-model="localProps.ctaText" @input="updateProp('ctaText', localProps.ctaText)" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL</label>
          <input v-model="localProps.ctaUrl" @input="updateProp('ctaUrl', localProps.ctaUrl)" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
            <select v-model="localProps.ctaTarget" @change="updateProp('ctaTarget', localProps.ctaTarget)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="_self">Même onglet</option>
              <option value="_blank">Nouvel onglet</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.ctaColor" @input="updateProp('ctaColor', localProps.ctaColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.ctaColor" @input="updateProp('ctaColor', localProps.ctaColor)" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur du texte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.ctaTextColor" @input="updateProp('ctaTextColor', localProps.ctaTextColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.ctaTextColor" @input="updateProp('ctaTextColor', localProps.ctaTextColor)" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Icône (optionnel)</label>
          <select v-model="localProps.ctaIcon" @change="updateProp('ctaIcon', localProps.ctaIcon)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Aucune</option>
            <option value="arrow-right">Flèche droite →</option>
            <option value="cart">Panier 🛒</option>
            <option value="download">Télécharger ⬇</option>
            <option value="play">Lecture ▶</option>
            <option value="check">Validation ✓</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
            <select v-model="localProps.buttonRadius" @change="updateProp('buttonRadius', localProps.buttonRadius)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="full">Complet</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ombre</label>
            <select v-model="localProps.buttonShadow" @change="updateProp('buttonShadow', localProps.buttonShadow)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="small">Légère</option>
              <option value="medium">Moyenne</option>
              <option value="large">Forte</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.buttonSize" @change="updateProp('buttonSize', localProps.buttonSize)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Largeur</label>
            <select v-model="localProps.buttonWidth" @change="updateProp('buttonWidth', localProps.buttonWidth)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="auto">Auto</option>
              <option value="full">Pleine largeur</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Effet hover</label>
          <select v-model="localProps.buttonHoverEffect" @change="updateProp('buttonHoverEffect', localProps.buttonHoverEffect)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="darken">Assombrir</option>
            <option value="lighten">Éclaircir</option>
            <option value="scale">Agrandir</option>
            <option value="lift">Soulever</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement boutons</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="align in ['left', 'center', 'right']" :key="align" @click="updateProp('buttonAlignment', align)" :class="['px-3 py-1.5 text-xs rounded border transition-colors', localProps.buttonAlignment === align ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300 hover:border-gray-400']">
              {{ align === 'left' ? 'Gauche' : align === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION BOUTON SECONDAIRE ===== -->
    <div class="border-b border-gray-200 pb-4" v-if="showSecondaryButton">
      <button @click="sections.ctaSecondary = !sections.ctaSecondary" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton Secondaire</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.ctaSecondary ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.ctaSecondary" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte</label>
          <input v-model="localProps.secondaryButtonText" @input="updateProp('secondaryButtonText', localProps.secondaryButtonText)" type="text" placeholder="En savoir plus..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL</label>
          <input v-model="localProps.secondaryButtonUrl" @input="updateProp('secondaryButtonUrl', localProps.secondaryButtonUrl)" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
            <select v-model="localProps.secondaryButtonTarget" @change="updateProp('secondaryButtonTarget', localProps.secondaryButtonTarget)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="_self">Même onglet</option>
              <option value="_blank">Nouvel onglet</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.secondaryButtonStyle" @change="updateProp('secondaryButtonStyle', localProps.secondaryButtonStyle)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="outline">Contour</option>
              <option value="filled">Rempli</option>
              <option value="ghost">Transparent</option>
              <option value="link">Lien</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.secondaryButtonColor" @input="updateProp('secondaryButtonColor', localProps.secondaryButtonColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.secondaryButtonColor" @input="updateProp('secondaryButtonColor', localProps.secondaryButtonColor)" type="text" placeholder="Utilise couleur principale" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Épaisseur bordure</label>
          <select v-model="localProps.buttonBorderWidth" @change="updateProp('buttonBorderWidth', localProps.buttonBorderWidth)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="thin">Fine (1px)</option>
            <option value="medium">Moyenne (2px)</option>
            <option value="thick">Épaisse (3px)</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION APPARENCE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.appearance = !sections.appearance" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Apparence</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.appearance ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.appearance" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Type de fond</label>
          <select v-model="localProps.backgroundType" @change="updateProp('backgroundType', localProps.backgroundType)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="solid">Couleur unie</option>
            <option value="gradient">Dégradé</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        
        <div v-if="localProps.backgroundType === 'solid'">
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="updateProp('backgroundColor', localProps.backgroundColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="updateProp('backgroundColor', localProps.backgroundColor)" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur début</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientStart" @input="updateProp('gradientStart', localProps.gradientStart)" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientStart" @input="updateProp('gradientStart', localProps.gradientStart)" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur fin</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientEnd" @input="updateProp('gradientEnd', localProps.gradientEnd)" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientEnd" @input="updateProp('gradientEnd', localProps.gradientEnd)" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        
        <div v-if="localProps.backgroundType === 'gradient'">
          <label class="block text-xs text-gray-500 mb-1">Direction dégradé</label>
          <select v-model="localProps.gradientDirection" @change="updateProp('gradientDirection', localProps.gradientDirection)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="to-r">Horizontal →</option>
            <option value="to-l">Horizontal ←</option>
            <option value="to-b">Vertical ↓</option>
            <option value="to-t">Vertical ↑</option>
            <option value="to-br">Diagonal ↘</option>
            <option value="to-bl">Diagonal ↙</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Hauteur section</label>
          <select v-model="localProps.sectionHeight" @change="updateProp('sectionHeight', localProps.sectionHeight)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="auto">Auto</option>
            <option value="small">Petite (400px)</option>
            <option value="medium">Moyenne (600px)</option>
            <option value="large">Grande (800px)</option>
            <option value="fullscreen">Plein écran</option>
            <option value="custom">Personnalisée</option>
          </select>
        </div>
        
        <div v-if="localProps.sectionHeight === 'custom'">
          <label class="block text-xs text-gray-500 mb-1">Hauteur (px)</label>
          <input type="number" v-model.number="localProps.sectionHeightCustom" @input="updateProp('sectionHeightCustom', localProps.sectionHeightCustom)" min="200" max="2000" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
          <select v-model="localProps.paddingY" @change="updateProp('paddingY', localProps.paddingY)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement horizontal</label>
          <select v-model="localProps.paddingX" @change="updateProp('paddingX', localProps.paddingX)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION TYPOGRAPHIE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.typography = !sections.typography" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Typographie</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.typography ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.typography" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Police titre</label>
          <select v-model="localProps.fontFamily" @change="updateProp('fontFamily', localProps.fontFamily)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Par défaut (System)</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Lora', serif">Lora</option>
            <option value="'Poppins', sans-serif">Poppins</option>
            <option value="'Oswald', sans-serif">Oswald</option>
            <option value="Georgia, serif">Georgia</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille titre</label>
            <select v-model="localProps.titleSize" @change="updateProp('titleSize', localProps.titleSize)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
              <option value="xxlarge">Énorme</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>
          <div v-if="localProps.titleSize === 'custom'">
            <label class="block text-xs text-gray-500 mb-1">Taille (px)</label>
            <input type="number" v-model.number="localProps.titleSizeCustom" @input="updateProp('titleSizeCustom', localProps.titleSizeCustom)" min="16" max="200" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div :class="localProps.titleSize === 'custom' ? '' : ''">
            <label class="block text-xs text-gray-500 mb-1">Poids titre</label>
            <select v-model="localProps.titleWeight" @change="updateProp('titleWeight', localProps.titleWeight)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="light">Léger (300)</option>
              <option value="normal">Normal (400)</option>
              <option value="medium">Medium (500)</option>
              <option value="semibold">Semi-gras (600)</option>
              <option value="bold">Gras (700)</option>
              <option value="black">Très gras (900)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur titre</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.titleColor" @input="updateProp('titleColor', localProps.titleColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.titleColor" @input="updateProp('titleColor', localProps.titleColor)" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement lettres</label>
            <select v-model="localProps.titleLetterSpacing" @change="updateProp('titleLetterSpacing', localProps.titleLetterSpacing)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="tighter">Très serré</option>
              <option value="tight">Serré</option>
              <option value="normal">Normal</option>
              <option value="wide">Écarté</option>
              <option value="wider">Très écarté</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Transformation</label>
            <select v-model="localProps.titleTransform" @change="updateProp('titleTransform', localProps.titleTransform)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="uppercase">MAJUSCULES</option>
              <option value="lowercase">minuscules</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Interligne titre</label>
          <select v-model="localProps.titleLineHeight" @change="updateProp('titleLineHeight', localProps.titleLineHeight)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="tight">Serré (1.1)</option>
            <option value="normal">Normal (1.3)</option>
            <option value="relaxed">Aéré (1.5)</option>
            <option value="loose">Espacé (1.75)</option>
          </select>
        </div>
        
        <hr class="border-gray-200"/>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Police sous-titre</label>
          <select v-model="localProps.subtitleFontFamily" @change="updateProp('subtitleFontFamily', localProps.subtitleFontFamily)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Comme le titre</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Roboto', sans-serif">Roboto</option>
            <option value="'Lora', serif">Lora</option>
            <option value="'Poppins', sans-serif">Poppins</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille sous-titre</label>
            <select v-model="localProps.subtitleSize" @change="updateProp('subtitleSize', localProps.subtitleSize)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité sous-titre</label>
            <input type="range" min="30" max="100" v-model.number="localProps.subtitleOpacity" @input="updateProp('subtitleOpacity', localProps.subtitleOpacity)" class="w-full"/>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur sous-titre</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.subtitleColor" @input="updateProp('subtitleColor', localProps.subtitleColor)" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.subtitleColor" @input="updateProp('subtitleColor', localProps.subtitleColor)" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION BADGE ===== -->
    <div class="border-b border-gray-200 pb-4" v-if="showBadge">
      <button @click="sections.badge = !sections.badge" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Étiquette (Badge)</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.badge ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.badge" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.badgeStyle" @change="updateProp('badgeStyle', localProps.badgeStyle)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="pill">Pilule</option>
              <option value="rounded">Arrondi</option>
              <option value="square">Carré</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.badgeColor" @input="updateProp('badgeColor', localProps.badgeColor)" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.badgeColor" @input="updateProp('badgeColor', localProps.badgeColor)" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille badge</label>
          <select v-model="localProps.badgeSize" @change="updateProp('badgeSize', localProps.badgeSize)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== SECTION ANIMATION ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.animation = !sections.animation" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Animation</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.animation ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.animation" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Animation d'entrée</label>
          <select v-model="localProps.animation" @change="updateProp('animation', localProps.animation)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="fade">Fondu</option>
            <option value="slide-up">Glisser haut</option>
            <option value="slide-down">Glisser bas</option>
            <option value="slide-left">Glisser gauche</option>
            <option value="slide-right">Glisser droite</option>
            <option value="zoom">Zoom</option>
            <option value="bounce">Rebond</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Durée animation (ms)</label>
          <input type="number" v-model.number="localProps.animationDuration" @input="updateProp('animationDuration', localProps.animationDuration)" min="100" max="2000" step="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Délai animation (ms)</label>
          <input type="number" v-model.number="localProps.animationDelay" @input="updateProp('animationDelay', localProps.animationDelay)" min="0" max="2000" step="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.animateOnScroll" @change="updateProp('animateOnScroll', localProps.animateOnScroll)" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Animer au scroll</span>
        </label>
      </div>
    </div>
    
    <!-- POSITIONNEMENT -->
    <PositioningSection
      :elements="['badge', 'title', 'subtitle', 'buttons']"
      :elements-order="localProps.elementsOrder"
      :offsets="{ 
        badgeOffsetY: localProps.badgeOffsetY, 
        titleOffsetY: localProps.titleOffsetY, 
        subtitleOffsetY: localProps.subtitleOffsetY, 
        buttonsOffsetY: localProps.buttonsOffsetY 
      }"
      :labels="elementLabels"
      @update:elements-order="updateProp('elementsOrder', $event)"
      @update:offsets="updateOffsets"
    />
    
    <!-- ===== SECTION AVANCÉ ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement éléments</label>
          <select v-model="localProps.contentGap" @change="updateProp('contentGap', localProps.contentGap)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement vertical</label>
          <select v-model="localProps.verticalAlignment" @change="updateProp('verticalAlignment', localProps.verticalAlignment)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="start">Haut</option>
            <option value="center">Centre</option>
            <option value="end">Bas</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="updateProp('cssId', localProps.cssId)" type="text" placeholder="hero-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Classes CSS personnalisées</label>
          <input v-model="localProps.customClasses" @input="updateProp('customClasses', localProps.customClasses)" type="text" placeholder="my-class another-class" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'
import { getTemplate } from '~/composables/blockTemplates'

interface SlideItem {
  image: string
  title?: string
  subtitle?: string
}

interface Props {
  props: Record<string, any>
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

// Sections collapsibles
const sections = reactive({
  content: true,
  media: false,
  slides: false,
  ctaPrimary: false,
  ctaSecondary: false,
  appearance: false,
  typography: false,
  badge: false,
  animation: false,
  positioning: false, // Nouvelle section positionnement
  advanced: false,
})

// Props locales avec valeurs par défaut
const localProps = reactive({
  templateId: props.props.templateId || 'hero-centered-clean',
  // Contenu
  badge: props.props.badge || '',
  title: props.props.title || 'Titre principal',
  subtitle: props.props.subtitle || 'Sous-titre de votre offre',
  contentAlignment: props.props.contentAlignment || 'center',
  contentMaxWidth: props.props.contentMaxWidth || 'large',
  // Media
  mediaUrl: props.props.mediaUrl || '',
  videoUrl: props.props.videoUrl || '',
  overlayOpacity: props.props.overlayOpacity ?? 50,
  overlayColor: props.props.overlayColor || '#000000',
  imagePosition: props.props.imagePosition || 'center',
  imageFilter: props.props.imageFilter || 'none',
  imageRadius: props.props.imageRadius || 'none',
  // Slides
  slides: props.props.slides || [] as SlideItem[],
  autoplay: props.props.autoplay !== false,
  autoplayInterval: props.props.autoplayInterval || 5000,
  // Bouton principal
  ctaText: props.props.ctaText || 'Acheter maintenant',
  ctaUrl: props.props.ctaUrl || '',
  ctaTarget: props.props.ctaTarget || '_self',
  ctaColor: props.props.ctaColor || '#1f2937',
  ctaTextColor: props.props.ctaTextColor || '',
  ctaIcon: props.props.ctaIcon || '',
  buttonRadius: props.props.buttonRadius || 'none',
  buttonShadow: props.props.buttonShadow || 'none',
  buttonSize: props.props.buttonSize || 'medium',
  buttonWidth: props.props.buttonWidth || 'auto',
  buttonHoverEffect: props.props.buttonHoverEffect || 'none',
  buttonAlignment: props.props.buttonAlignment || 'center',
  // Bouton secondaire
  secondaryButtonText: props.props.secondaryButtonText || '',
  secondaryButtonUrl: props.props.secondaryButtonUrl || '',
  secondaryButtonTarget: props.props.secondaryButtonTarget || '_self',
  secondaryButtonStyle: props.props.secondaryButtonStyle || 'outline',
  secondaryButtonColor: props.props.secondaryButtonColor || '',
  buttonBorderWidth: props.props.buttonBorderWidth || 'medium',
  // Apparence
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#667eea',
  gradientEnd: props.props.gradientEnd || '#764ba2',
  gradientDirection: props.props.gradientDirection || 'to-r',
  sectionHeight: props.props.sectionHeight || 'auto',
  sectionHeightCustom: props.props.sectionHeightCustom || 600,
  paddingY: props.props.paddingY || 'large',
  paddingX: props.props.paddingX || 'medium',
  // Typographie titre
  fontFamily: props.props.fontFamily || '',
  titleSize: props.props.titleSize || 'medium',
  titleSizeCustom: props.props.titleSizeCustom || 48,
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleLetterSpacing: props.props.titleLetterSpacing || 'normal',
  titleTransform: props.props.titleTransform || 'none',
  titleLineHeight: props.props.titleLineHeight || 'normal',
  // Typographie sous-titre
  subtitleFontFamily: props.props.subtitleFontFamily || '',
  subtitleSize: props.props.subtitleSize || 'medium',
  subtitleOpacity: props.props.subtitleOpacity ?? 70,
  subtitleColor: props.props.subtitleColor || '',
  // Badge
  badgeStyle: props.props.badgeStyle || 'pill',
  badgeColor: props.props.badgeColor || '',
  badgeSize: props.props.badgeSize || 'medium',
  // Animation
  animation: props.props.animation || 'none',
  animationDuration: props.props.animationDuration || 500,
  animationDelay: props.props.animationDelay || 0,
  animateOnScroll: props.props.animateOnScroll || false,
  // Avancé
  contentGap: props.props.contentGap || 'medium',
  verticalAlignment: props.props.verticalAlignment || 'center',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement (Option 1 + 2)
  elementsOrder: props.props.elementsOrder || ['badge', 'title', 'subtitle', 'buttons'] as ('badge' | 'title' | 'subtitle' | 'buttons')[],
  badgeOffsetY: props.props.badgeOffsetY || 0,
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  buttonsOffsetY: props.props.buttonsOffsetY || 0,
})

const elementLabels: Record<string, string> = {
  badge: 'Étiquette (Badge)',
  title: 'Titre',
  subtitle: 'Sous-titre',
  buttons: 'Boutons'
}

// Sync avec props parent
watch(() => props.props, (newProps) => {
  Object.keys(newProps).forEach(key => {
    if (key in localProps) {
      (localProps as any)[key] = newProps[key]
    }
  })
}, { deep: true })

function updateProp(key: string, value: any) {
  (localProps as any)[key] = value
  emit('update', { [key]: value })
}

function updateSlides() {
  emit('update', { slides: [...localProps.slides] })
}

function addSlide() {
  localProps.slides.push({ image: '', title: '' })
  updateSlides()
}

function removeSlide(index: number) {
  localProps.slides.splice(index, 1)
  updateSlides()
}

function updateOffsets(offsets: Record<string, number>) {
  Object.assign(localProps, offsets)
  emit('update', offsets)
}

// ============ FIN FONCTIONS POSITIONNEMENT ============

// Config template
const templateConfig = computed(() => {
  const template = getTemplate('hero', localProps.templateId)
  return template?.config || {}
})

const currentLayout = computed(() => templateConfig.value.layout || 'centered')
const showBadge = computed(() => templateConfig.value.showBadge !== false)
const showSecondaryButton = computed(() => templateConfig.value.showSecondaryButton === true)
const needsMedia = computed(() => ['split-right', 'split-left', 'stacked', 'fullscreen', 'slider', 'video'].includes(currentLayout.value as string))
const hasOverlay = computed(() => templateConfig.value.overlayEnabled === true)
</script>
