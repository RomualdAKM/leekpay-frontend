<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="image" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
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
              <label class="block text-xs text-gray-500 mb-1">Balise HTML</label>
              <select v-model="localProps.titleTag" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
                <option value="p">Paragraphe</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Police</label>
              <select v-model="localProps.titleFontFamily" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Par défaut</option>
                <option value="'Inter', sans-serif">Inter</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Lora', serif">Lora</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.titleSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
                <option value="xlarge">Très grand</option>
              </select>
            </div>
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
              <label class="block text-xs text-gray-500 mb-1">Transformation</label>
              <select v-model="localProps.titleTransform" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="uppercase">Majuscules</option>
                <option value="lowercase">Minuscules</option>
                <option value="capitalize">Capitalisé</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur du titre</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Opacité: {{ localProps.titleOpacity }}%</label>
              <input v-model.number="localProps.titleOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Marge basse (px)</label>
            <input v-model.number="localProps.titleMarginBottom" @input="emitUpdate" type="number" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- DESCRIPTION OPTIONNELLE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.description = !sections.description" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.description ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.description" class="mt-3 space-y-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="localProps.showDescription" @change="emitUpdate" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"/>
          <span class="text-sm text-gray-700">Afficher une description</span>
        </label>
        <div v-if="localProps.showDescription">
          <label class="block text-xs text-gray-500 mb-1">Description</label>
          <textarea v-model="localProps.description" @input="emitUpdate" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Description de l'image..."/>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Alignement</label>
              <select v-model="localProps.descriptionAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="left">Gauche</option>
                <option value="center">Centre</option>
                <option value="right">Droite</option>
                <option value="justify">Justifié</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.descriptionColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
                <input v-model="localProps.descriptionColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Opacité: {{ localProps.descriptionOpacity }}%</label>
            <input v-model.number="localProps.descriptionOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- IMAGE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.image = !sections.image" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.image ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.image" class="mt-3 space-y-3">
        <div>
          <UiImageUploader
            v-model="localProps.src"
            label="Image"
            @update:model-value="updateProp('src', $event)"
          />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte alternatif</label>
          <input v-model="localProps.alt" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Légende</label>
          <input v-model="localProps.caption" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
            <label class="block text-xs text-gray-500 mb-1">Lien du bouton</label>
            <UiLinkSelector
              v-model="localProps.buttonUrl"
              :link-type="localProps.buttonLinkType || 'custom'"
              :payment-link-id="localProps.buttonPaymentLinkId"
              @update:link-type="(val) => { localProps.buttonLinkType = val; emitUpdate() }"
              @update:payment-link-id="(val) => { localProps.buttonPaymentLinkId = val; emitUpdate() }"
              @change="emitUpdate"
            />
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
              <label class="block text-xs text-gray-500 mb-1">Coins arrondis</label>
              <select v-model="localProps.buttonBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Carrés</option>
                <option value="sm">Léger</option>
                <option value="md">Moyen</option>
                <option value="lg">Arrondi</option>
                <option value="full">Plein</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ombre</label>
              <select v-model="localProps.buttonShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="sm">Légère</option>
                <option value="md">Moyenne</option>
                <option value="lg">Forte</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Fond bouton</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.buttonBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="text" placeholder="#10b981" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
              <div class="flex items-center gap-2">
                <input type="color" v-model="localProps.buttonTextColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonTextColor" @input="emitUpdate" type="text" placeholder="#ffffff" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.buttonAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- AFFICHAGE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.display = !sections.display" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Affichage</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.display ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.display" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ratio</label>
            <select v-model="localProps.aspectRatio" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="auto">Auto</option>
              <option value="square">Carré (1:1)</option>
              <option value="video">Vidéo (16:9)</option>
              <option value="portrait">Portrait (3:4)</option>
              <option value="wide">Large (21:9)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Hauteur max</label>
            <select v-model="localProps.maxHeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="auto">Auto</option>
              <option value="small">Petit (300px)</option>
              <option value="medium">Moyen (500px)</option>
              <option value="large">Grand (700px)</option>
              <option value="full">Plein écran</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ajustement</label>
            <select v-model="localProps.objectFit" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="cover">Couvrir</option>
              <option value="contain">Contenir</option>
              <option value="fill">Remplir</option>
              <option value="none">Original</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Position</label>
            <select v-model="localProps.objectPosition" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="center">Centre</option>
              <option value="top">Haut</option>
              <option value="bottom">Bas</option>
              <option value="left">Gauche</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- EFFETS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.effects = !sections.effects" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Effets</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.effects ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.effects" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Filtre</label>
            <select v-model="localProps.filter" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="grayscale">Noir et Blanc</option>
              <option value="sepia">Sépia</option>
              <option value="blur">Flou</option>
              <option value="brightness">Lumineux</option>
              <option value="contrast">Contrasté</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Effet survol</label>
            <select v-model="localProps.hoverEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="zoom">Zoom</option>
              <option value="brightness">Luminosité</option>
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
            <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
            <select v-model="localProps.borderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="full">Cercle</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Épaisseur</label>
            <select v-model="localProps.borderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
              <option value="thick">Épaisse</option>
            </select>
          </div>
        </div>
        <div v-if="localProps.borderWidth !== 'none'">
          <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.borderColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.borderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- OVERLAY -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.overlay = !sections.overlay" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Overlay</h4>
        <div class="flex items-center gap-2">
          <input v-model="localProps.overlayEnabled" @change="emitUpdate" type="checkbox" class="rounded" @click.stop/>
          <ChevronDown :class="['w-4 h-4 transition-transform', sections.overlay ? 'rotate-180' : '']"/>
        </div>
      </button>
      <div v-show="sections.overlay && localProps.overlayEnabled" class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.overlayColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.overlayColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Opacité: {{ localProps.overlayOpacity }}%</label>
          <input v-model.number="localProps.overlayOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
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
        <div v-if="localProps.backgroundType === 'solid'">
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Début</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientStart" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fin</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientEnd" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
          <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Animation</label>
          <select v-model="localProps.animation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="fade">Fondu</option>
            <option value="slide-up">Glisser haut</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- POSITIONNEMENT -->
    <PositioningSection
      :elements="['title', 'description', 'image', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{
        titleOffsetY: localProps.titleOffsetY,
        descriptionOffsetY: localProps.descriptionOffsetY,
        imageOffsetY: localProps.imageOffsetY,
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="image-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
  description: false,
  image: true,
  button: false,
  display: false,
  effects: false,
  border: false,
  overlay: false,
  appearance: false,
  positioning: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'image-minimal-centered',
  // Titre
  showTitle: props.props.showTitle || false,
  title: props.props.title || '',
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || 'center',
  titleOpacity: props.props.titleOpacity !== undefined ? props.props.titleOpacity : 100,
  titleMarginBottom: props.props.titleMarginBottom || 16,
  // Description
  showDescription: props.props.showDescription || false,
  description: props.props.description || '',
  descriptionColor: props.props.descriptionColor || '',
  descriptionAlign: props.props.descriptionAlign || 'center',
  descriptionOpacity: props.props.descriptionOpacity !== undefined ? props.props.descriptionOpacity : 100,
  // Image
  src: props.props.src || null,
  alt: props.props.alt || '',
  caption: props.props.caption || '',
  // Bouton
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || '',
  buttonUrl: props.props.buttonUrl || '',
  buttonLinkType: props.props.buttonLinkType || 'custom',
  buttonPaymentLinkId: props.props.buttonPaymentLinkId || null,
  buttonTarget: props.props.buttonTarget || '_self',
  buttonIcon: props.props.buttonIcon || 'none',
  buttonVariant: props.props.buttonVariant || 'filled',
  buttonSize: props.props.buttonSize || 'md',
  buttonBgColor: props.props.buttonBgColor || '#10b981',
  buttonTextColor: props.props.buttonTextColor || '#ffffff',
  buttonBorderRadius: props.props.buttonBorderRadius || 'md',
  buttonShadow: props.props.buttonShadow || 'none',
  buttonAlign: props.props.buttonAlign || 'center',
  // Affichage
  aspectRatio: props.props.aspectRatio || 'auto',
  maxHeight: props.props.maxHeight || 'auto',
  objectFit: props.props.objectFit || 'cover',
  objectPosition: props.props.objectPosition || 'center',
  filter: props.props.filter || 'none',
  hoverEffect: props.props.hoverEffect || 'none',
  borderRadius: props.props.borderRadius || 'none',
  borderWidth: props.props.borderWidth || 'none',
  borderColor: props.props.borderColor || '#e5e7eb',
  overlayEnabled: props.props.overlayEnabled || false,
  overlayColor: props.props.overlayColor || '#000000',
  overlayOpacity: props.props.overlayOpacity || 30,
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  paddingY: props.props.paddingY || 'medium',
  animation: props.props.animation || 'none',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  order: props.props.order !== undefined ? props.props.order : 0,
  offsetX: props.props.offsetX || 0,
  offsetY: props.props.offsetY || 0,
  elementsOrder: props.props.elementsOrder || ['title', 'description', 'image', 'button'],
  titleOffsetY: props.props.titleOffsetY || 0,
  descriptionOffsetY: props.props.descriptionOffsetY || 0,
  imageOffsetY: props.props.imageOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

// Labels pour le positionnement
const elementLabels: Record<string, string> = {
  title: 'Titre',
  description: 'Description',
  image: 'Image',
  button: 'Bouton'
}

function updateOffsets(offsets: Record<string, number>) {
  Object.assign(localProps, offsets)
  emitUpdate()
}

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }
</script>
