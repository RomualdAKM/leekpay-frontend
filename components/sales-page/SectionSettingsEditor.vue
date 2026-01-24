<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h4 class="text-sm font-semibold text-gray-900 flex items-center">
        <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Paramètres de la section
      </h4>
      <p class="text-xs text-gray-500 mt-1">Personnalisez l'apparence de cette section</p>
    </div>

    <!-- Background -->
    <div class="space-y-3">
      <button 
        @click="sections.background = !sections.background"
        class="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Arrière-plan
        </span>
        <svg 
          class="w-4 h-4 transition-transform" 
          :class="{ 'rotate-180': sections.background }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-if="sections.background" class="space-y-3 pl-6">
        <!-- Couleur de fond -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              :value="localSettings.backgroundColor || '#ffffff'"
              @input="updateSetting('backgroundColor', ($event.target as HTMLInputElement).value)"
              class="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              :value="localSettings.backgroundColor || '#ffffff'"
              @input="updateSetting('backgroundColor', ($event.target as HTMLInputElement).value)"
              class="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="#ffffff"
            />
            <button
              v-if="localSettings.backgroundColor"
              @click="updateSetting('backgroundColor', '')"
              class="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Réinitialiser"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Image de fond -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Image de fond</label>
          <input
            type="text"
            :value="localSettings.backgroundImage"
            @input="updateSetting('backgroundImage', ($event.target as HTMLInputElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="URL de l'image"
          />
        </div>
        
        <!-- Options image (si image définie) -->
        <div v-if="localSettings.backgroundImage" class="space-y-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select
              :value="localSettings.backgroundSize || 'cover'"
              @change="updateSetting('backgroundSize', ($event.target as HTMLSelectElement).value)"
              class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="cover">Couvrir</option>
              <option value="contain">Contenir</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label class="block text-xs text-gray-500 mb-1">Position</label>
            <select
              :value="localSettings.backgroundPosition || 'center'"
              @change="updateSetting('backgroundPosition', ($event.target as HTMLSelectElement).value)"
              class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="center">Centre</option>
              <option value="top">Haut</option>
              <option value="bottom">Bas</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Espacements -->
    <div class="space-y-3">
      <button 
        @click="sections.spacing = !sections.spacing"
        class="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Espacements
        </span>
        <svg 
          class="w-4 h-4 transition-transform" 
          :class="{ 'rotate-180': sections.spacing }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-if="sections.spacing" class="space-y-3 pl-6">
        <!-- Padding Haut -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Padding haut</label>
          <select
            :value="localSettings.paddingTop || 'large'"
            @change="updateSetting('paddingTop', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">Aucun</option>
            <option value="small">Petit (24px)</option>
            <option value="medium">Moyen (48px)</option>
            <option value="large">Grand (80px)</option>
            <option value="xlarge">Très grand (128px)</option>
          </select>
        </div>
        
        <!-- Padding Bas -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Padding bas</label>
          <select
            :value="localSettings.paddingBottom || 'large'"
            @change="updateSetting('paddingBottom', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">Aucun</option>
            <option value="small">Petit (24px)</option>
            <option value="medium">Moyen (48px)</option>
            <option value="large">Grand (80px)</option>
            <option value="xlarge">Très grand (128px)</option>
          </select>
        </div>
        
        <!-- Marge Haut -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Marge haut</label>
          <select
            :value="localSettings.marginTop || 'none'"
            @change="updateSetting('marginTop', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">Aucune</option>
            <option value="small">Petite (16px)</option>
            <option value="medium">Moyenne (32px)</option>
            <option value="large">Grande (64px)</option>
          </select>
        </div>
        
        <!-- Marge Bas -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Marge bas</label>
          <select
            :value="localSettings.marginBottom || 'none'"
            @change="updateSetting('marginBottom', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="none">Aucune</option>
            <option value="small">Petite (16px)</option>
            <option value="medium">Moyenne (32px)</option>
            <option value="large">Grande (64px)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Layout -->
    <div class="space-y-3">
      <button 
        @click="sections.layout = !sections.layout"
        class="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Layout
        </span>
        <svg 
          class="w-4 h-4 transition-transform" 
          :class="{ 'rotate-180': sections.layout }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-if="sections.layout" class="space-y-3 pl-6">
        <!-- Largeur max -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Largeur maximale</label>
          <select
            :value="localSettings.maxWidth || '7xl'"
            @change="updateSetting('maxWidth', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="full">Pleine largeur</option>
            <option value="7xl">7xl (1280px)</option>
            <option value="6xl">6xl (1152px)</option>
            <option value="5xl">5xl (1024px)</option>
            <option value="4xl">4xl (896px)</option>
          </select>
        </div>
        
        <!-- Hauteur min -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Hauteur minimale</label>
          <select
            :value="localSettings.minHeight || 'auto'"
            @change="updateSetting('minHeight', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="auto">Auto</option>
            <option value="half">50% écran</option>
            <option value="screen">Plein écran</option>
          </select>
        </div>
      </div>
    </div>

    <!-- CSS personnalisé -->
    <div class="space-y-3">
      <button 
        @click="sections.advanced = !sections.advanced"
        class="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Avancé
        </span>
        <svg 
          class="w-4 h-4 transition-transform" 
          :class="{ 'rotate-180': sections.advanced }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-if="sections.advanced" class="space-y-3 pl-6">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Classes CSS personnalisées</label>
          <input
            type="text"
            :value="localSettings.customClass"
            @input="updateSetting('customClass', ($event.target as HTMLInputElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500 font-mono"
            placeholder="ma-classe autre-classe"
          />
          <p class="text-[10px] text-gray-400 mt-1">Séparez les classes par des espaces</p>
        </div>
      </div>
    </div>

    <!-- Aperçu des colonnes -->
    <div class="pt-4 border-t border-gray-200">
      <h5 class="text-xs font-medium text-gray-700 mb-2">Colonnes ({{ section.columns.length }})</h5>
      <div class="flex gap-1 h-8">
        <div 
          v-for="(col, index) in section.columns" 
          :key="col.id"
          class="bg-emerald-100 rounded flex items-center justify-center text-[10px] text-emerald-700 font-medium"
          :style="{ width: col.width + '%' }"
        >
          {{ Math.round(col.width) }}%
        </div>
      </div>
      <p class="text-[10px] text-gray-400 mt-2">Utilisez le bouton de layout sur la section pour modifier les colonnes</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Section, SectionSettings } from '~/composables/useSalesPageBuilder'

interface Props {
  section: Section
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', settings: Partial<SectionSettings>): void
}>()

// Sections collapsibles
const sections = ref({
  background: true,
  spacing: true,
  layout: false,
  advanced: false,
})

// Local settings pour réactivité
const localSettings = computed(() => props.section.settings || {})

// Mettre à jour un paramètre
const updateSetting = (key: keyof SectionSettings, value: any) => {
  emit('update', { [key]: value })
}
</script>
