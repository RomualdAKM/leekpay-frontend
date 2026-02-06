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
              <label class="block text-xs text-gray-500 mb-1">Fond bouton</label>
              <input type="color" v-model="localProps.buttonBgColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
              <input type="color" v-model="localProps.buttonTextColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
            </div>
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
  // Description
  showDescription: props.props.showDescription || false,
  description: props.props.description || '',
  descriptionColor: props.props.descriptionColor || '',
  // Bouton
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || '',
  buttonUrl: props.props.buttonUrl || '',
  buttonTarget: props.props.buttonTarget || '_self',
  buttonIcon: props.props.buttonIcon || 'none',
  buttonBgColor: props.props.buttonBgColor || '#10b981',
  buttonTextColor: props.props.buttonTextColor || '#ffffff',
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
