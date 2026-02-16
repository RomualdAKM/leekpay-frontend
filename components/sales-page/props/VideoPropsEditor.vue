<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="video" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- SOURCE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.source = !sections.source" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Source</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.source ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.source" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Type</label>
          <select v-model="localProps.type" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="url">URL directe (MP4)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL</label>
          <input v-model="localProps.url" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" :placeholder="urlPlaceholder"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre (optionnel)</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        
        <!-- Options avancées de titre -->
        <div class="pt-3 border-t border-gray-200 mt-3">
          <h5 class="text-xs font-medium text-gray-600 mb-2">Personnalisation du titre</h5>
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
          <div class="grid grid-cols-2 gap-3 mt-3">
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
          <div class="grid grid-cols-2 gap-3 mt-3">
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
          <div class="grid grid-cols-2 gap-3 mt-3">
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
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Marge basse (px)</label>
            <input v-model.number="localProps.titleMarginBottom" @input="emitUpdate" type="number" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- LECTURE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.playback = !sections.playback" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Lecture</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.playback ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.playback" class="mt-3 space-y-2">
        <label class="flex items-center gap-2"><input v-model="localProps.autoplay" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Lecture automatique</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.loop" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Boucle</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.muted" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Muet</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showControls" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Afficher les contrôles</span></label>
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
          <textarea v-model="localProps.description" @input="emitUpdate" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Description de la vidéo..."/>
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
              <option value="video">Vidéo (16:9)</option>
              <option value="wide">Large (21:9)</option>
              <option value="ultrawide">Ultra large (32:9)</option>
              <option value="square">Carré (1:1)</option>
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
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
            <select v-model="localProps.borderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Bordure</label>
            <select v-model="localProps.borderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
              <option value="thick">Épaisse</option>
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
        <div v-if="localProps.backgroundType === 'solid'">
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
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
      :elements="['title', 'video', 'description', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{
        titleOffsetY: localProps.titleOffsetY,
        videoOffsetY: localProps.videoOffsetY,
        descriptionOffsetY: localProps.descriptionOffsetY,
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="video-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
import { reactive, watch, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  source: true,
  playback: false,
  description: false,
  button: false,
  display: false,
  appearance: false,
  positioning: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'video-minimal-centered',
  type: props.props.type || 'youtube',
  url: props.props.url || '',
  title: props.props.title || '',
  titleTag: props.props.titleTag || 'h3',
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
  buttonAlign: props.props.buttonAlign || 'center',
  // Lecture
  autoplay: props.props.autoplay || false,
  loop: props.props.loop || false,
  muted: props.props.muted || false,
  showControls: props.props.showControls ?? true,
  // Affichage
  aspectRatio: props.props.aspectRatio || 'video',
  maxWidth: props.props.maxWidth || 'large',
  borderRadius: props.props.borderRadius || 'none',
  borderWidth: props.props.borderWidth || 'none',
  borderColor: props.props.borderColor || '#e5e7eb',
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  paddingY: props.props.paddingY || 'large',
  animation: props.props.animation || 'none',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  order: props.props.order !== undefined ? props.props.order : 0,
  offsetX: props.props.offsetX || 0,
  offsetY: props.props.offsetY || 0,
  elementsOrder: props.props.elementsOrder || ['title', 'video', 'description', 'button'],
  titleOffsetY: props.props.titleOffsetY || 0,
  videoOffsetY: props.props.videoOffsetY || 0,
  descriptionOffsetY: props.props.descriptionOffsetY || 0,
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
  video: 'Vidéo',
  description: 'Description',
  button: 'Bouton'
}

function updateOffsets(offsets: Record<string, number>) {
  Object.assign(localProps, offsets)
  emitUpdate()
}

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

const urlPlaceholder = computed(() => {
  if (localProps.type === 'youtube') return 'https://youtube.com/watch?v=...'
  if (localProps.type === 'vimeo') return 'https://vimeo.com/...'
  return 'https://.../video.mp4'
})
</script>
