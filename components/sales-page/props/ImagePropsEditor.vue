<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="image" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
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
            @update:model-value="emitUpdate"
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
          <input type="color" v-model="localProps.overlayColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
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

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  image: true,
  display: false,
  effects: false,
  border: false,
  overlay: false,
  appearance: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'image-minimal-centered',
  src: props.props.src || null,
  alt: props.props.alt || '',
  caption: props.props.caption || '',
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
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }
</script>
