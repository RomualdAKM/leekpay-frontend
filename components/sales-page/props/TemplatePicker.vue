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
          class="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"
        >
          <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Prévisualisation simplifiée -->
        <div class="aspect-video rounded bg-gray-100 mb-1.5 flex items-center justify-center overflow-hidden">
          <div 
            class="w-full h-full flex items-center justify-center text-[8px] text-gray-400 p-1"
            :class="getPreviewClass(template)"
          >
            <span class="truncate">{{ getPreviewLabel(template) }}</span>
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
import type { BlockTemplate } from '~/composables/blockTemplates/types'

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

const getPreviewClass = (template: BlockTemplate): string => {
  const baseClasses: Record<string, string> = {
    minimal: 'border-b border-gray-200',
    modern: 'border border-gray-300',
    bold: 'border-2 border-gray-400 font-bold',
  }
  return baseClasses[template.category] || ''
}

const getPreviewLabel = (template: BlockTemplate): string => {
  const labels: Record<string, string> = {
    minimal: '—',
    modern: '◻',
    bold: '■',
  }
  return labels[template.category] || '•'
}
</script>
