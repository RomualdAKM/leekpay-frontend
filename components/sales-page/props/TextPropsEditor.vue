<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="text" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- TITRE OPTIONNEL -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.title = !sections.title" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Titre</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.title ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.title" class="mt-3 space-y-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="localProps.showTitle" @change="emitUpdate" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"/>
          <span class="text-sm text-gray-700">Afficher un titre</span>
        </label>
        <div v-if="localProps.showTitle" class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Titre</label>
            <input v-model="localProps.title" @input="emitUpdate" type="text" placeholder="Votre titre..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Police</label>
              <select v-model="localProps.titleFontFamily" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Par défaut</option>
                <option value="Inter">Inter</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="Montserrat">Montserrat</option>
                <option value="'Lora', serif">Lora</option>
                <option value="Poppins">Poppins</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="'Open Sans'">Open Sans</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.titleSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
                <option value="xlarge">Très grand</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Poids</label>
              <select v-model="localProps.titleWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semi-gras</option>
                <option value="bold">Gras</option>
                <option value="extrabold">Extra gras</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Transformation</label>
              <select v-model="localProps.titleTransform" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="uppercase">MAJUSCULES</option>
                <option value="lowercase">minuscules</option>
                <option value="capitalize">Première Lettre</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur du titre</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Alignement</label>
              <select v-model="localProps.titleAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="left">Gauche</option>
                <option value="center">Centre</option>
                <option value="right">Droite</option>
                <option value="justify">Justifié</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Marge basse (px)</label>
              <input v-model.number="localProps.titleMarginBottom" @input="emitUpdate" type="number" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Opacité (%)</label>
              <input v-model.number="localProps.titleOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
              <span class="text-xs text-gray-500">{{ localProps.titleOpacity }}%</span>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Marge basse (px)</label>
              <input v-model.number="localProps.titleMarginBottom" @input="emitUpdate" type="number" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CONTENU -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte</label>
          <textarea v-model="localProps.content" @input="emitUpdate" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Écrivez votre texte ici... (HTML supporté)"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur du contenu</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.contentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.contentColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité (%)</label>
            <input v-model.number="localProps.contentOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
            <span class="text-xs text-gray-500">{{ localProps.contentOpacity }}%</span>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Largeur max</label>
            <select v-model="localProps.contentMaxWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="100%">100%</option>
              <option value="90%">90%</option>
              <option value="80%">80%</option>
              <option value="70%">70%</option>
              <option value="60%">60%</option>
              <option value="50%">50%</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.contentAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
              <option value="justify">Justifié</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Colonnes (pour texte long)</label>
            <select v-model.number="localProps.contentColumns" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option :value="1">1 colonne</option>
              <option :value="2">2 colonnes</option>
              <option :value="3">3 colonnes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- BOUTON OPTIONNEL -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.button = !sections.button" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.button ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.button" class="mt-3 space-y-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="localProps.showButton" @change="emitUpdate" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"/>
          <span class="text-sm text-gray-700">Afficher un bouton</span>
        </label>
        <div v-if="localProps.showButton" class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
            <input v-model="localProps.buttonText" @input="emitUpdate" type="text" placeholder="Cliquez ici" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Lien (URL)</label>
            <input v-model="localProps.buttonUrl" @input="emitUpdate" type="text" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Variante</label>
              <select v-model="localProps.buttonVariant" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="filled">Rempli</option>
                <option value="outlined">Contour</option>
                <option value="ghost">Fantôme</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.buttonSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
              <select v-model="localProps.buttonTarget" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="_self">Même fenêtre</option>
                <option value="_blank">Nouvel onglet</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Icône</label>
              <select v-model="localProps.buttonIcon" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="arrow-right">Flèche droite</option>
                <option value="external">Lien externe</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Fond bouton</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.buttonBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.buttonTextColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonTextColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
              <select v-model="localProps.buttonBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucun</option>
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
                <option value="full">Complet</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ombre</label>
              <select v-model="localProps.buttonShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="sm">Petite</option>
                <option value="md">Moyenne</option>
                <option value="lg">Grande</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement du bouton</label>
            <select v-model="localProps.buttonAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- TYPOGRAPHIE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.typography = !sections.typography" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Typographie</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.typography ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.typography" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Police</label>
          <select v-model="localProps.fontFamily" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Par défaut</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Lora', serif">Lora</option>
            <option value="'Poppins', sans-serif">Poppins</option>
            <option value="Georgia, serif">Georgia</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.fontSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.fontWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="light">Léger</option>
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Interligne</label>
            <select v-model="localProps.lineHeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="tight">Serré</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Aéré</option>
              <option value="loose">Très aéré</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.textAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
              <option value="justify">Justifié</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- APPARENCE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.appearance = !sections.appearance" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Apparence</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.appearance ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.appearance" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Type de fond</label>
          <select v-model="localProps.backgroundType" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="solid">Couleur unie</option>
            <option value="gradient">Dégradé</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        <div v-if="localProps.backgroundType === 'solid'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.textColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.textColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Début</label>
            <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fin</label>
            <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement</label>
            <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Largeur max</label>
            <select v-model="localProps.maxWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="full">Pleine largeur</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- BORDURE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.border = !sections.border" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bordure</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.border ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.border" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.borderStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="left">Gauche</option>
              <option value="top">Haut</option>
              <option value="bottom">Bas</option>
              <option value="all">Complète</option>
              <option value="card">Carte</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Épaisseur</label>
            <select v-model="localProps.borderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
              <option value="thick">Épaisse</option>
            </select>
          </div>
        </div>
        <div v-if="localProps.borderStyle !== 'none'">
          <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ANIMATION -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.animation = !sections.animation" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Animation</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.animation ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.animation" class="mt-3">
        <select v-model="localProps.animation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="none">Aucune</option>
          <option value="fade">Fondu</option>
          <option value="slide-up">Glisser haut</option>
          <option value="slide-left">Glisser gauche</option>
        </select>
      </div>
    </div>
    
    <!-- POSITIONNEMENT -->
    <PositioningSection
      :elements="['title', 'content', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{
        titleOffsetY: localProps.titleOffsetY,
        contentOffsetY: localProps.contentOffsetY,
        buttonOffsetY: localProps.buttonOffsetY
      }"
      :labels="elementLabels"
      @update:elements-order="updateProp('elementsOrder', $event)"
      @update:offsets="updateOffsets"
    />
    
    <!-- AVANCÉ -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="text-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Classes CSS</label>
          <input v-model="localProps.customClasses" @input="emitUpdate" type="text" placeholder="my-class" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  title: false,
  content: true,
  button: false,
  typography: false,
  appearance: false,
  border: false,
  animation: false,
  positioning: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'text-minimal-centered',
  // Titre
  showTitle: props.props.showTitle || false,
  title: props.props.title || '',
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || 'left',
  titleOpacity: props.props.titleOpacity ?? 100,
  titleMarginBottom: props.props.titleMarginBottom ?? 16,
  // Contenu
  content: props.props.content || '',
  contentColor: props.props.contentColor || '',
  contentAlign: props.props.contentAlign || 'left',
  contentOpacity: props.props.contentOpacity ?? 100,
  contentMaxWidth: props.props.contentMaxWidth || '100%',
  contentColumns: props.props.contentColumns ?? 1,
  // Bouton
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || '',
  buttonUrl: props.props.buttonUrl || '',
  buttonTarget: props.props.buttonTarget || '_self',
  buttonIcon: props.props.buttonIcon || 'none',
  buttonVariant: props.props.buttonVariant || 'filled',
  buttonSize: props.props.buttonSize || 'md',
  buttonBgColor: props.props.buttonBgColor || '#10b981',
  buttonTextColor: props.props.buttonTextColor || '#ffffff',
  buttonBorderRadius: props.props.buttonBorderRadius || 'md',
  buttonShadow: props.props.buttonShadow || 'none',
  buttonAlign: props.props.buttonAlign || 'left',
  // Typographie
  fontFamily: props.props.fontFamily || '',
  fontSize: props.props.fontSize || 'medium',
  fontWeight: props.props.fontWeight || 'normal',
  lineHeight: props.props.lineHeight || 'relaxed',
  textAlign: props.props.textAlign || 'left',
  // Apparence
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  textColor: props.props.textColor || '',
  accentColor: props.props.accentColor || '#3b82f6',
  paddingY: props.props.paddingY || 'large',
  maxWidth: props.props.maxWidth || 'medium',
  borderStyle: props.props.borderStyle || 'none',
  borderWidth: props.props.borderWidth || 'medium',
  animation: props.props.animation || 'none',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['title', 'content', 'button'],
  titleOffsetY: props.props.titleOffsetY || 0,
  contentOffsetY: props.props.contentOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// Labels pour le positionnement
const elementLabels: Record<string, string> = {
  title: 'Titre',
  content: 'Contenu',
  button: 'Bouton'
}

function updateOffsets(offsets: Record<string, number>) {
  Object.assign(localProps, offsets)
  emitUpdate()
}

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }
</script>
