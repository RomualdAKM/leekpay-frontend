<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="image"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- Image -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Image</h4>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL de l'image</label>
        <input v-model="localProps.src" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://..." />
      </div>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Texte alternatif</label>
        <input v-model="localProps.alt" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
      </div>
      
      <div>
        <label class="block text-xs text-gray-500 mb-1">Légende</label>
        <input v-model="localProps.caption" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
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
            <option value="auto">Auto</option>
            <option value="square">Carré (1:1)</option>
            <option value="video">Vidéo (16:9)</option>
            <option value="portrait">Portrait (3:4)</option>
            <option value="wide">Large (21:9)</option>
          </select>
        </div>
        
        <!-- Hauteur max -->
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
        <!-- Ajustement -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ajustement</label>
          <select v-model="localProps.objectFit" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="cover">Couvrir</option>
            <option value="contain">Contenir</option>
            <option value="fill">Remplir</option>
            <option value="none">Original</option>
          </select>
        </div>
        
        <!-- Position -->
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
    
    <!-- Effets -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Effets</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Filtre -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Filtre</label>
          <select v-model="localProps.filter" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="grayscale">Noir & Blanc</option>
            <option value="sepia">Sépia</option>
            <option value="blur">Flou</option>
            <option value="brightness">Lumineux</option>
            <option value="contrast">Contrasté</option>
          </select>
        </div>
        
        <!-- Effet hover -->
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
            <option value="full">Cercle</option>
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
    
    <!-- Overlay -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Overlay</h4>
      
      <div class="flex items-center gap-2 mb-3">
        <input v-model="localProps.overlayEnabled" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500" />
        <label class="text-xs text-gray-600">Activer l'overlay</label>
      </div>
      
      <div v-if="localProps.overlayEnabled" class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur</label>
          <input v-model="localProps.overlayColor" @input="emitUpdate" type="color" class="w-full h-10 rounded cursor-pointer border-0" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Opacité: {{ localProps.overlayOpacity || 30 }}%</label>
          <input v-model.number="localProps.overlayOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full" />
        </div>
      </div>
    </div>
    
    <!-- Légende -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Légende</h4>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Alignement -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <select v-model="localProps.captionAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </div>
        
        <!-- Taille -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select v-model="localProps.captionSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Espacement & Animation -->
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
import { reactive, watch } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const localProps = reactive({ 
  templateId: 'image-minimal-centered',
  src: null,
  alt: '',
  caption: '',
  backgroundColor: '#ffffff',
  objectFit: 'cover',
  objectPosition: 'center',
  aspectRatio: 'auto',
  maxHeight: 'auto',
  filter: 'none',
  hoverEffect: 'none',
  borderRadius: 'none',
  borderWidth: 'none',
  borderColor: '#e5e7eb',
  overlayEnabled: false,
  overlayColor: '#000000',
  overlayOpacity: 30,
  paddingY: 'medium',
  captionAlign: 'center',
  captionSize: 'small',
  animation: 'none',
  ...props.props 
})
watch(() => props.props, (newVal) => { Object.assign(localProps, newVal) }, { deep: true })
const emitUpdate = () => { emit('update', { ...localProps }) }
</script>
