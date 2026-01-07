<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="video"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- Source -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Source</h4>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Type</label>
        <select v-model="localProps.type" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="url">URL directe (MP4)</option>
        </select>
      </div>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL</label>
        <input v-model="localProps.url" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" :placeholder="urlPlaceholder" />
      </div>
      
      <div>
        <label class="block text-xs text-gray-500 mb-1">Titre (optionnel)</label>
        <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
      </div>
    </div>
    
    <!-- Lecture -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Lecture</h4>
      
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <input v-model="localProps.autoplay" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500" />
          <label class="text-xs text-gray-600">Lecture automatique</label>
        </div>
        <div class="flex items-center gap-2">
          <input v-model="localProps.loop" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500" />
          <label class="text-xs text-gray-600">Boucle</label>
        </div>
        <div class="flex items-center gap-2">
          <input v-model="localProps.muted" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500" />
          <label class="text-xs text-gray-600">Muet</label>
        </div>
        <div class="flex items-center gap-2">
          <input v-model="localProps.showControls" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500" />
          <label class="text-xs text-gray-600">Afficher les contrôles</label>
        </div>
      </div>
    </div>
    
    <!-- Affichage -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Affichage</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Ratio -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ratio</label>
          <select v-model="localProps.aspectRatio" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="video">Vidéo (16:9)</option>
            <option value="wide">Large (21:9)</option>
            <option value="ultrawide">Ultra large (32:9)</option>
            <option value="square">Carré (1:1)</option>
          </select>
        </div>
        
        <!-- Largeur max -->
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
    
    <!-- Bordure -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Bordure</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Arrondi -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
          <select v-model="localProps.borderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
        
        <!-- Épaisseur -->
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
      
      <!-- Couleur bordure -->
      <div v-if="localProps.borderWidth && localProps.borderWidth !== 'none'">
        <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
        <div class="flex items-center gap-2">
          <input v-model="localProps.borderColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded cursor-pointer border-0" />
          <input v-model="localProps.borderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
        </div>
      </div>
    </div>
    
    <!-- Titre -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Titre</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Position -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Position</label>
          <select v-model="localProps.titlePosition" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="top">Au-dessus</option>
            <option value="bottom">En-dessous</option>
          </select>
        </div>
        
        <!-- Alignement -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <select v-model="localProps.titleAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Taille -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select v-model="localProps.titleSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        
        <!-- Poids -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Poids</label>
          <select v-model="localProps.titleWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="light">Léger</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semi-gras</option>
            <option value="bold">Gras</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Apparence -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Apparence</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Fond -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <input v-model="localProps.backgroundColor" @input="emitUpdate" type="color" class="w-full h-10 rounded cursor-pointer border-0" />
        </div>
        
        <!-- Espacement -->
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
      </div>
      
      <!-- Animation -->
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
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const localProps = reactive({ 
  templateId: 'video-minimal-centered',
  type: 'youtube',
  url: '',
  title: '',
  autoplay: false,
  loop: false,
  muted: false,
  showControls: true,
  backgroundColor: '#ffffff',
  aspectRatio: 'video',
  maxWidth: 'large',
  borderRadius: 'none',
  borderWidth: 'none',
  borderColor: '#e5e7eb',
  titlePosition: 'bottom',
  titleAlign: 'center',
  titleSize: 'medium',
  titleWeight: 'medium',
  paddingY: 'large',
  animation: 'none',
  ...props.props 
})
watch(() => props.props, (newVal) => { Object.assign(localProps, newVal) }, { deep: true })
const emitUpdate = () => { emit('update', { ...localProps }) }

const urlPlaceholder = computed(() => {
  if (localProps.type === 'youtube') return 'https://youtube.com/watch?v=...'
  if (localProps.type === 'vimeo') return 'https://vimeo.com/...'
  return 'https://.../video.mp4'
})
</script>
