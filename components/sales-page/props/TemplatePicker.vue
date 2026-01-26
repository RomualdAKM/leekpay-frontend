<template>
  <div class="space-y-3">
    <label class="block text-xs text-gray-500 mb-2">Style du bloc</label>
    
    <!-- Filtre par catégorie -->
    <div class="flex gap-1 mb-3">
      <button
        v-for="cat in categories"
        :key="cat.value"
        @click="selectedCategory = cat.value"
        class="px-2 py-1 text-xs rounded transition-colors"
        :class="selectedCategory === cat.value 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        {{ cat.label }}
      </button>
    </div>
    
    <!-- Grille de templates -->
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="template in filteredTemplates"
        :key="template.id"
        @click="$emit('select', template.id)"
        class="relative p-2 rounded-lg border-2 transition-all text-left"
        :class="modelValue === template.id 
          ? 'border-emerald-500 bg-emerald-50' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'"
      >
        <!-- Indicateur sélectionné -->
        <div 
          v-if="modelValue === template.id"
          class="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center z-10"
        >
          <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Prévisualisation visuelle -->
        <div 
          class="aspect-video rounded mb-1.5 overflow-hidden flex items-center justify-center"
          :style="getPreviewBgStyle(template)"
        >
          <!-- Layout: Centered -->
          <div v-if="getLayoutType(template) === 'centered'" class="w-full h-full flex flex-col items-center justify-center p-1">
            <div class="w-3 h-3 rounded-full mb-1" :style="getIconStyle(template)"></div>
            <div class="w-6 h-0.5 rounded" :style="getAccentBarStyle(template)"></div>
            <div class="w-4 h-0.5 rounded mt-0.5 opacity-50" :style="getAccentBarStyle(template)"></div>
          </div>
          
          <!-- Layout: Cards/Grid -->
          <div v-else-if="getLayoutType(template) === 'cards' || getLayoutType(template) === 'grid'" class="w-full h-full flex items-center justify-center gap-0.5 p-1">
            <div 
              v-for="i in (getColumns(template) || 3)" 
              :key="i" 
              class="w-2 h-3 rounded-sm"
              :style="getCardPlaceholderStyle(template)"
            ></div>
          </div>
          
          <!-- Layout: List -->
          <div v-else-if="getLayoutType(template) === 'list'" class="w-full h-full flex flex-col justify-center gap-0.5 p-1">
            <div v-for="i in 3" :key="i" class="flex items-center gap-0.5">
              <div class="w-0.5 h-1.5 rounded-sm" :style="getAccentBarStyle(template)"></div>
              <div class="flex-1 h-0.5 rounded opacity-50" :style="getAccentBarStyle(template)"></div>
            </div>
          </div>
          
          <!-- Layout: Slider -->
          <div v-else-if="getLayoutType(template) === 'slider'" class="w-full h-full flex items-center justify-center gap-0.5 p-1">
            <div class="w-1 h-1 rounded-full opacity-30" :style="getIconStyle(template)"></div>
            <div class="w-4 h-3 rounded-sm" :style="getCardPlaceholderStyle(template)"></div>
            <div class="w-1 h-1 rounded-full opacity-30" :style="getIconStyle(template)"></div>
          </div>
          
          <!-- Layout: Single -->
          <div v-else-if="getLayoutType(template) === 'single'" class="w-full h-full flex flex-col items-center justify-center p-1">
            <div class="text-[6px] opacity-30" :style="getTextStyle(template)">"</div>
            <div class="w-8 h-0.5 rounded" :style="getAccentBarStyle(template)"></div>
            <div class="w-2 h-2 rounded-full mt-1" :style="getIconStyle(template)"></div>
          </div>
          
          <!-- Layout: Split -->
          <div v-else-if="getLayoutType(template) === 'split-left' || getLayoutType(template) === 'split-right'" class="w-full h-full flex items-center p-0.5">
            <div 
              class="w-1/2 h-full rounded-sm"
              :class="getLayoutType(template) === 'split-right' ? 'order-2' : ''"
              :style="getCardPlaceholderStyle(template)"
            ></div>
            <div class="w-1/2 h-full flex flex-col justify-center p-0.5 gap-0.5">
              <div class="w-full h-0.5 rounded" :style="getAccentBarStyle(template)"></div>
              <div class="w-3/4 h-0.5 rounded opacity-50" :style="getAccentBarStyle(template)"></div>
            </div>
          </div>
          
          <!-- Fallback -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <div class="w-3 h-3 rounded" :style="getIconStyle(template)"></div>
          </div>
        </div>
        
        <span class="text-[10px] text-gray-600 font-medium block truncate">{{ template.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { listTemplates } from '~/composables/blockTemplates'
import type { BlockTemplate, PreviewConfig } from '~/composables/blockTemplates/types'

interface Props {
  blockType: string
  modelValue?: string
}

const props = defineProps<Props>()
defineEmits(['select'])

const selectedCategory = ref<'all' | 'minimal' | 'modern' | 'bold'>('all')

const categories = [
  { value: 'all', label: 'Tous' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'modern', label: 'Modern' },
  { value: 'bold', label: 'Bold' },
] as const

const allTemplates = computed(() => {
  return listTemplates(props.blockType)
})

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') {
    return allTemplates.value
  }
  return allTemplates.value.filter(t => t.category === selectedCategory.value)
})

// Helper functions pour les previews
const getPreviewBgStyle = (template: BlockTemplate) => {
  const preview = template.preview
  if (!preview) {
    return { backgroundColor: '#f3f4f6' }
  }
  
  if (preview.bgType === 'gradient' && preview.bgValue) {
    return { background: preview.bgValue }
  }
  if (preview.bgType === 'dark') {
    return { backgroundColor: preview.bgValue || '#1f2937' }
  }
  if (preview.bgType === 'accent') {
    return { backgroundColor: preview.accentColor || '#10b981' }
  }
  return { backgroundColor: preview.bgValue || '#f3f4f6' }
}

const getLayoutType = (template: BlockTemplate): string => {
  return template.preview?.layoutType || 'centered'
}

const getColumns = (template: BlockTemplate): number => {
  return template.preview?.columns || template.config?.columns as number || 3
}

const getIconStyle = (template: BlockTemplate) => {
  const preview = template.preview
  const isDark = preview?.bgType === 'dark' || preview?.bgType === 'gradient'
  
  if (preview?.accentColor) {
    return { backgroundColor: preview.accentColor }
  }
  
  return {
    backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : '#d1d5db'
  }
}

const getAccentBarStyle = (template: BlockTemplate) => {
  const preview = template.preview
  const isDark = preview?.bgType === 'dark' || preview?.bgType === 'gradient'
  
  if (preview?.accentColor) {
    return { backgroundColor: preview.accentColor }
  }
  
  return {
    backgroundColor: isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af'
  }
}

const getCardPlaceholderStyle = (template: BlockTemplate) => {
  const preview = template.preview
  const isDark = preview?.bgType === 'dark' || preview?.bgType === 'gradient'
  
  return {
    backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
  }
}

const getTextStyle = (template: BlockTemplate) => {
  const preview = template.preview
  const isDark = preview?.bgType === 'dark' || preview?.bgType === 'gradient'
  
  return {
    color: isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af'
  }
}
</script>
