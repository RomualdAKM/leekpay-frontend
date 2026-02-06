<template>
  <div class="border-b border-gray-200 pb-4">
    <button @click="isOpen = !isOpen" class="flex items-center justify-between w-full text-left">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Positionnement</h4>
      <ChevronDown :class="['w-4 h-4 transition-transform', isOpen ? 'rotate-180' : '']"/>
    </button>
    
    <div v-show="isOpen" class="mt-3 space-y-4">
      <!-- Réordonnement des éléments -->
      <div>
        <label class="block text-xs text-gray-500 mb-2">Ordre des éléments (glisser pour réorganiser)</label>
        <div class="space-y-1">
          <div
            v-for="(element, index) in localOrder"
            :key="element"
            class="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
            draggable="true"
            @dragstart="onDragStart($event, index)"
            @dragover.prevent
            @drop="onDrop($event, index)"
          >
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
            </svg>
            <span class="text-xs font-medium text-gray-700">{{ getElementLabel(element) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Offsets individuels -->
      <div class="space-y-3">
        <p class="text-xs text-gray-500">Décalage vertical (px)</p>
        
        <div v-for="element in localOrder" :key="`offset-${element}`">
          <label class="flex justify-between text-xs text-gray-500 mb-1">
            <span>{{ getElementLabel(element) }}</span>
            <span class="font-mono">{{ getOffset(element) }}px</span>
          </label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            :value="getOffset(element)"
            @input="onOffsetInput(element, $event)"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>
      
      <!-- Reset -->
      <button 
        @click="resetPositioning"
        class="w-full px-3 py-2 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Réinitialiser le positionnement
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  elements: string[]
  elementsOrder: string[]
  offsets: Record<string, number>
  labels?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => ({
    title: 'Titre',
    content: 'Contenu',
    description: 'Description',
    button: 'Bouton',
    image: 'Image',
    video: 'Vidéo',
    badge: 'Badge',
    subtitle: 'Sous-titre',
    buttons: 'Boutons'
  })
})

const emit = defineEmits<{
  (e: 'update:elementsOrder', value: string[]): void
  (e: 'update:offsets', value: Record<string, number>): void
}>()

const isOpen = ref(false)
const localOrder = ref([...props.elementsOrder])
const localOffsets = ref({ ...props.offsets })

// Sync avec props
watch(() => props.elementsOrder, (newVal) => {
  localOrder.value = [...newVal]
}, { deep: true })

watch(() => props.offsets, (newVal) => {
  localOffsets.value = { ...newVal }
}, { deep: true })

function getElementLabel(element: string): string {
  return props.labels[element] || element
}

function getOffset(element: string): number {
  return localOffsets.value[`${element}OffsetY`] || 0
}

function updateOffset(element: string, value: number) {
  localOffsets.value[`${element}OffsetY`] = value
  emit('update:offsets', { [`${element}OffsetY`]: value })
}

function onOffsetInput(element: string, event: Event) {
  const target = event.target as HTMLInputElement
  updateOffset(element, target.valueAsNumber)
}

// Drag & drop
let draggedIndex: number | null = null

function onDragStart(event: DragEvent, index: number) {
  draggedIndex = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function onDrop(event: DragEvent, targetIndex: number) {
  if (draggedIndex === null || draggedIndex === targetIndex) return
  
  const newOrder = [...localOrder.value]
  const [removed] = newOrder.splice(draggedIndex, 1)
  newOrder.splice(targetIndex, 0, removed)
  
  localOrder.value = newOrder
  emit('update:elementsOrder', newOrder)
  draggedIndex = null
}

function resetPositioning() {
  localOrder.value = [...props.elements]
  
  const resetOffsets: Record<string, number> = {}
  props.elements.forEach(el => {
    resetOffsets[`${el}OffsetY`] = 0
  })
  localOffsets.value = resetOffsets
  
  emit('update:elementsOrder', [...props.elements])
  emit('update:offsets', resetOffsets)
}
</script>
