<template>
  <div class="space-y-4">
    <!-- Template Picker -->
    <TemplatePicker
      block-type="hero"
      :model-value="props.props.templateId"
      @select="emit('update', { templateId: $event })"
    />
    
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Contenu</h4>
      
      <!-- Badge -->
      <div class="mb-3" v-if="showBadge">
        <label class="block text-xs text-gray-500 mb-1">Étiquette (optionnel)</label>
        <input
          :value="props.props.badge"
          @input="emit('update', { badge: ($event.target as HTMLInputElement).value })"
          type="text"
          placeholder="Nouveau, Offre limitée..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      
      <!-- Titre -->
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Titre</label>
        <input
          :value="props.props.title"
          @input="emit('update', { title: ($event.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      
      <!-- Sous-titre -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
        <textarea
          :value="props.props.subtitle"
          @input="emit('update', { subtitle: ($event.target as HTMLTextAreaElement).value })"
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 resize-none"
        />
      </div>
    </div>
    
    <!-- Section Média (si layout split, stacked, fullscreen, slider, video) -->
    <div class="border-t border-gray-200 pt-4" v-if="needsMedia">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Média</h4>
      
      <!-- Image URL -->
      <div v-if="currentLayout !== 'video'" class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL de l'image</label>
        <input
          :value="props.props.mediaUrl"
          @input="emit('update', { mediaUrl: ($event.target as HTMLInputElement).value })"
          type="url"
          placeholder="https://..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <!-- Video URL (si layout video) -->
      <div v-if="currentLayout === 'video'" class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL de la vidéo (MP4)</label>
        <input
          :value="props.props.videoUrl"
          @input="emit('update', { videoUrl: ($event.target as HTMLInputElement).value })"
          type="url"
          placeholder="https://...video.mp4"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <!-- Overlay Opacity (fullscreen, video, slider) -->
      <div v-if="hasOverlay">
        <label class="block text-xs text-gray-500 mb-1">Opacité de l'overlay: {{ props.props.overlayOpacity || 50 }}%</label>
        <input
          type="range"
          min="0"
          max="100"
          :value="props.props.overlayOpacity || 50"
          @input="emit('update', { overlayOpacity: parseInt(($event.target as HTMLInputElement).value) })"
          class="w-full"
        />
      </div>
    </div>
    
    <!-- Section Slides (si layout slider) -->
    <div class="border-t border-gray-200 pt-4" v-if="currentLayout === 'slider'">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Slides</h4>
        <button
          @click="addSlide"
          class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
        >+ Ajouter</button>
      </div>
      
      <div 
        v-for="(slide, index) in (props.props.slides || [])"
        :key="index"
        class="mb-4 p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs font-medium text-gray-600">Slide {{ index + 1 }}</span>
          <button
            @click="removeSlide(index)"
            class="text-xs text-red-500 hover:text-red-600"
          >Supprimer</button>
        </div>
        
        <input
          :value="slide.image"
          @input="updateSlide(index, 'image', ($event.target as HTMLInputElement).value)"
          type="url"
          placeholder="URL image"
          class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs mb-2"
        />
        <input
          :value="slide.title"
          @input="updateSlide(index, 'title', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Titre (optionnel)"
          class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
        />
      </div>
      
      <!-- Autoplay -->
      <div class="flex items-center gap-2 mt-3">
        <input
          type="checkbox"
          :checked="props.props.autoplay !== false"
          @change="emit('update', { autoplay: ($event.target as HTMLInputElement).checked })"
          id="autoplay"
          class="rounded text-emerald-500 focus:ring-emerald-500"
        />
        <label for="autoplay" class="text-xs text-gray-600">Lecture automatique</label>
      </div>
    </div>
    
    <!-- Section Bouton Principal -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Bouton principal</h4>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
        <input
          :value="props.props.ctaText"
          @input="emit('update', { ctaText: ($event.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL du bouton</label>
        <input
          :value="props.props.ctaUrl"
          @input="emit('update', { ctaUrl: ($event.target as HTMLInputElement).value })"
          type="url"
          placeholder="https://..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
          <select
            :value="props.props.ctaTarget || '_self'"
            @change="emit('update', { ctaTarget: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="_self">Même onglet</option>
            <option value="_blank">Nouvel onglet</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur</label>
          <div class="flex items-center gap-2">
            <input
              :value="props.props.ctaColor || '#1f2937'"
              @input="emit('update', { ctaColor: ($event.target as HTMLInputElement).value })"
              type="color"
              class="w-10 h-10 rounded cursor-pointer border-0"
            />
            <input
              :value="props.props.ctaColor || '#1f2937'"
              @input="emit('update', { ctaColor: ($event.target as HTMLInputElement).value })"
              type="text"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
      </div>
      
      <!-- Style des boutons -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
          <select
            :value="props.props.buttonRadius || 'none'"
            @change="emit('update', { buttonRadius: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucun</option>
            <option value="small">Petit (4px)</option>
            <option value="medium">Moyen (8px)</option>
            <option value="large">Grand (16px)</option>
            <option value="full">Complet (pill)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ombre</label>
          <select
            :value="props.props.buttonShadow || 'none'"
            @change="emit('update', { buttonShadow: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucune</option>
            <option value="small">Légère</option>
            <option value="medium">Moyenne</option>
            <option value="large">Forte</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Section Bouton Secondaire (si template le supporte) -->
    <div class="border-t border-gray-200 pt-4" v-if="showSecondaryButton">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Bouton secondaire</h4>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Texte</label>
        <input
          :value="props.props.secondaryButtonText"
          @input="emit('update', { secondaryButtonText: ($event.target as HTMLInputElement).value })"
          type="text"
          placeholder="En savoir plus..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">URL</label>
        <input
          :value="props.props.secondaryButtonUrl"
          @input="emit('update', { secondaryButtonUrl: ($event.target as HTMLInputElement).value })"
          type="url"
          placeholder="https://..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
          <select
            :value="props.props.secondaryButtonTarget || '_self'"
            @change="emit('update', { secondaryButtonTarget: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="_self">Même onglet</option>
            <option value="_blank">Nouvel onglet</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style</label>
          <select
            :value="props.props.secondaryButtonStyle || 'outline'"
            @change="emit('update', { secondaryButtonStyle: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="outline">Contour</option>
            <option value="filled">Rempli</option>
            <option value="ghost">Transparent</option>
          </select>
        </div>
      </div>
      
      <!-- Couleur du bouton secondaire -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Couleur (optionnel)</label>
        <div class="flex items-center gap-2">
          <input
            :value="props.props.secondaryButtonColor || ''"
            @input="emit('update', { secondaryButtonColor: ($event.target as HTMLInputElement).value })"
            type="color"
            class="w-10 h-10 rounded cursor-pointer border-0"
          />
          <input
            :value="props.props.secondaryButtonColor || ''"
            @input="emit('update', { secondaryButtonColor: ($event.target as HTMLInputElement).value })"
            type="text"
            placeholder="Utilise la couleur principale"
            class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
          />
        </div>
      </div>
    </div>
    
    <!-- Section Apparence -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Apparence</h4>
      
      <!-- Couleur de fond (si pas fullscreen/video) -->
      <div v-if="!hasOverlay" class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
        <div class="flex items-center gap-2">
          <input
            :value="props.props.backgroundColor || '#ffffff'"
            @input="emit('update', { backgroundColor: ($event.target as HTMLInputElement).value })"
            type="color"
            class="w-10 h-10 rounded cursor-pointer border-0"
          />
          <input
            :value="props.props.backgroundColor || '#ffffff'"
            @input="emit('update', { backgroundColor: ($event.target as HTMLInputElement).value })"
            type="text"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>
      
      <!-- Overlay (si fullscreen/video/slider) -->
      <div v-if="hasOverlay" class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Couleur de l'overlay</label>
        <div class="flex items-center gap-2">
          <input
            :value="props.props.overlayColor || '#000000'"
            @input="emit('update', { overlayColor: ($event.target as HTMLInputElement).value })"
            type="color"
            class="w-10 h-10 rounded cursor-pointer border-0"
          />
          <input
            :value="props.props.overlayColor || '#000000'"
            @input="emit('update', { overlayColor: ($event.target as HTMLInputElement).value })"
            type="text"
            class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
          />
        </div>
      </div>
      
      <!-- Espacement vertical -->
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
        <select
          :value="props.props.paddingY || 'large'"
          @change="emit('update', { paddingY: ($event.target as HTMLSelectElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="small">Petit</option>
          <option value="medium">Moyen</option>
          <option value="large">Grand</option>
          <option value="xlarge">Très grand</option>
        </select>
      </div>
      
      <!-- Animation -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Animation d'entrée</label>
        <select
          :value="props.props.animation || 'none'"
          @change="emit('update', { animation: ($event.target as HTMLSelectElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="none">Aucune</option>
          <option value="fade">Fondu</option>
          <option value="slide-up">Glisser vers le haut</option>
          <option value="slide-down">Glisser vers le bas</option>
          <option value="zoom">Zoom</option>
        </select>
      </div>
    </div>
    
    <!-- Section Typographie -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Typographie</h4>
      
      <!-- Police -->
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Police du titre</label>
        <select
          :value="props.props.fontFamily || ''"
          @change="emit('update', { fontFamily: ($event.target as HTMLSelectElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
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
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Taille du titre -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select
            :value="props.props.titleSize || 'medium'"
            @change="emit('update', { titleSize: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
            <option value="custom">Personnalisé</option>
          </select>
        </div>
        
        <!-- Taille personnalisée -->
        <div v-if="props.props.titleSize === 'custom'">
          <label class="block text-xs text-gray-500 mb-1">Taille (px)</label>
          <input
            :value="props.props.titleSizeCustom || 48"
            @input="emit('update', { titleSizeCustom: parseInt(($event.target as HTMLInputElement).value) })"
            type="number"
            min="16"
            max="200"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        
        <!-- Poids -->
        <div :class="props.props.titleSize === 'custom' ? '' : ''">
          <label class="block text-xs text-gray-500 mb-1">Poids</label>
          <select
            :value="props.props.titleWeight || 'bold'"
            @change="emit('update', { titleWeight: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="light">Léger (300)</option>
            <option value="normal">Normal (400)</option>
            <option value="medium">Medium (500)</option>
            <option value="semibold">Semi-gras (600)</option>
            <option value="bold">Gras (700)</option>
            <option value="black">Très gras (900)</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Espacement des lettres -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement lettres</label>
          <select
            :value="props.props.titleLetterSpacing || 'normal'"
            @change="emit('update', { titleLetterSpacing: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="tight">Serré</option>
            <option value="normal">Normal</option>
            <option value="wide">Écarté</option>
            <option value="wider">Très écarté</option>
          </select>
        </div>
        
        <!-- Transformation -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Transformation</label>
          <select
            :value="props.props.titleTransform || 'none'"
            @change="emit('update', { titleTransform: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucune</option>
            <option value="uppercase">MAJUSCULES</option>
            <option value="lowercase">minuscules</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Section Boutons (avancé) -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Boutons (avancé)</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Taille -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select
            :value="props.props.buttonSize || 'medium'"
            @change="emit('update', { buttonSize: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
        
        <!-- Largeur -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Largeur</label>
          <select
            :value="props.props.buttonWidth || 'auto'"
            @change="emit('update', { buttonWidth: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="auto">Auto</option>
            <option value="full">Pleine largeur</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Épaisseur bordure -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Épaisseur bordure</label>
          <select
            :value="props.props.buttonBorderWidth || 'medium'"
            @change="emit('update', { buttonBorderWidth: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="thin">Fine (1px)</option>
            <option value="medium">Moyenne (2px)</option>
            <option value="thick">Épaisse (3px)</option>
          </select>
        </div>
        
        <!-- Alignement -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <select
            :value="props.props.buttonAlignment || 'center'"
            @change="emit('update', { buttonAlignment: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Section Badge -->
    <div class="border-t border-gray-200 pt-4" v-if="showBadge">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Étiquette (Badge)</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Style du badge -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style</label>
          <select
            :value="props.props.badgeStyle || 'pill'"
            @change="emit('update', { badgeStyle: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="pill">Pilule</option>
            <option value="rounded">Arrondi</option>
            <option value="square">Carré</option>
          </select>
        </div>
        
        <!-- Couleur du badge -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur</label>
          <div class="flex items-center gap-2">
            <input
              :value="props.props.badgeColor || ''"
              @input="emit('update', { badgeColor: ($event.target as HTMLInputElement).value })"
              type="color"
              class="w-10 h-10 rounded cursor-pointer border-0"
            />
            <input
              :value="props.props.badgeColor || ''"
              @input="emit('update', { badgeColor: ($event.target as HTMLInputElement).value })"
              type="text"
              placeholder="Auto"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Section Image (si applicable) -->
    <div class="border-t border-gray-200 pt-4" v-if="needsMedia && currentLayout !== 'video'">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Image (avancé)</h4>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Position -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Position</label>
          <select
            :value="props.props.imagePosition || 'center'"
            @change="emit('update', { imagePosition: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="top">Haut</option>
            <option value="center">Centre</option>
            <option value="bottom">Bas</option>
          </select>
        </div>
        
        <!-- Filtre -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Filtre</label>
          <select
            :value="props.props.imageFilter || 'none'"
            @change="emit('update', { imageFilter: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucun</option>
            <option value="grayscale">Noir & Blanc</option>
            <option value="blur">Flou</option>
            <option value="sepia">Sépia</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TemplatePicker from './TemplatePicker.vue'
import { getTemplate } from '~/composables/blockTemplates'

interface Props {
  props: Record<string, any>
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

// Récupérer la config du template sélectionné
const templateConfig = computed(() => {
  const template = getTemplate('hero', props.props.templateId)
  return template?.config || {}
})

const currentLayout = computed(() => {
  return templateConfig.value.layout || 'centered'
})

const showBadge = computed(() => {
  return templateConfig.value.showBadge !== false
})

const showSecondaryButton = computed(() => {
  return templateConfig.value.showSecondaryButton === true
})

const needsMedia = computed(() => {
  return ['split-right', 'split-left', 'stacked', 'fullscreen', 'slider', 'video'].includes(currentLayout.value as string)
})

const hasOverlay = computed(() => {
  return templateConfig.value.overlayEnabled === true
})

// Gestion des slides
function addSlide() {
  const currentSlides = props.props.slides || []
  emit('update', {
    slides: [...currentSlides, { image: '', title: '' }]
  })
}

function removeSlide(index: number) {
  const currentSlides = [...(props.props.slides || [])]
  currentSlides.splice(index, 1)
  emit('update', { slides: currentSlides })
}

function updateSlide(index: number, field: string, value: string) {
  const currentSlides = [...(props.props.slides || [])]
  currentSlides[index] = { ...currentSlides[index], [field]: value }
  emit('update', { slides: currentSlides })
}
</script>
