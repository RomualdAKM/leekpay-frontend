<template>
  <div 
    :class="columnClasses"
    :style="columnStyles"
    @click.stop="handleClick"
  >
    <!-- Zone de drop pour les blocs -->
    <div v-if="isEditMode && !previewMode && column.blocks.length === 0" class="min-h-[100px]">
      <!-- Placeholder vide -->
      <div 
        class="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors"
        :class="{ 'border-emerald-400 bg-emerald-50': isSelected }"
      >
        <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="text-sm text-gray-400">Glissez un bloc ici</p>
        
        <!-- Boutons rapides pour ajouter des blocs -->
        <div class="flex flex-wrap gap-1 mt-3 justify-center">
          <button 
            v-for="type in quickBlockTypes" 
            :key="type.value"
            @click.stop="$emit('add-block', type.value)"
            class="px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:border-emerald-300 hover:text-emerald-600 transition-colors"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Blocs de la colonne -->
    <draggable
      v-else-if="isEditMode && !previewMode"
      v-model="localBlocks"
      item-key="id"
      :group="{ name: 'blocks', pull: true, put: true }"
      ghost-class="opacity-50"
      drag-class="dragging-block"
      handle=".drag-block-handle"
      @change="onDragChange"
      class="min-h-[50px] space-y-4"
    >
      <template #item="{ element: block }">
        <div 
          class="relative group/block"
          :class="{ 'ring-2 ring-emerald-400 ring-inset rounded': selectedBlockId === block.id }"
        >
          <!-- Actions du bloc -->
          <div 
            class="absolute top-2 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover/block:opacity-100 transition-opacity"
          >
            <button
              class="drag-block-handle p-1 bg-white rounded shadow hover:bg-gray-50 cursor-move"
              title="Déplacer"
            >
              <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
              </svg>
            </button>
            <button
              @click.stop="$emit('remove-block', block.id)"
              class="p-1 bg-white rounded shadow hover:bg-red-50"
              title="Supprimer"
            >
              <svg class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Rendu du bloc -->
          <SalesBlockRenderer
            :block="block"
            :checkout-url="checkoutUrl"
            @update-props="handleBlockUpdate(block.id, $event)"
          />
        </div>
      </template>
    </draggable>
    
    <!-- Mode preview: rendu simple -->
    <div v-else class="space-y-4">
      <SalesBlockRenderer
        v-for="block in column.blocks"
        :key="block.id"
        :block="block"
        :checkout-url="checkoutUrl"
      />
    </div>
    
    <!-- Bouton ajouter bloc (mode édition) -->
    <button
      v-if="isEditMode && !previewMode && column.blocks.length > 0"
      @click.stop="showAddMenu = !showAddMenu"
      class="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors flex items-center justify-center"
    >
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Ajouter un bloc
    </button>
    
    <!-- Menu d'ajout de bloc -->
    <div 
      v-if="showAddMenu && isEditMode"
      class="absolute left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border p-3 z-30 min-w-[250px]"
      @click.stop
    >
      <div class="grid grid-cols-3 gap-2">
        <button 
          v-for="type in allBlockTypes" 
          :key="type.value"
          @click="addBlock(type.value)"
          class="p-2 hover:bg-gray-100 rounded flex flex-col items-center text-center"
        >
          <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mb-1">
            <span class="text-gray-500 text-xs">{{ type.value.charAt(0).toUpperCase() }}</span>
          </div>
          <span class="text-xs text-gray-600">{{ type.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import type { Column, Block, BlockType } from '~/composables/useSalesPageBuilder'
import SalesBlockRenderer from '~/components/sales-page/SalesBlockRenderer.vue'

interface Props {
  column: Column
  sectionId: string
  isEditMode: boolean
  previewMode: boolean
  isSelected: boolean
  checkoutUrl?: string
  selectedBlockId?: string | null
  blockTypes?: BlockType[]
}

const props = withDefaults(defineProps<Props>(), {
  checkoutUrl: '',
  selectedBlockId: null,
  blockTypes: () => [],
})

const emit = defineEmits<{
  (e: 'select', columnId: string): void
  (e: 'add-block', blockType: string): void
  (e: 'remove-block', blockId: string): void
  (e: 'update-block', payload: { blockId: string; props: any }): void
  (e: 'reorder', blocks: Block[]): void
  (e: 'block-moved-in', payload: { blockId: string; newIndex: number }): void
  (e: 'block-moved-out', blockId: string): void
}>()

const showAddMenu = ref(false)

// Copie locale des blocs pour le drag & drop
const localBlocks = ref<Block[]>([...props.column.blocks])

// Synchroniser avec les props
watch(() => props.column.blocks, (newBlocks) => {
  localBlocks.value = [...newBlocks]
}, { deep: true })

// Types de blocs rapides
const quickBlockTypes = computed(() => {
  return [
    { value: 'text', label: 'Texte' },
    { value: 'image', label: 'Image' },
    { value: 'cta', label: 'CTA' },
  ]
})

// Tous les types de blocs
const allBlockTypes = computed(() => {
  if (props.blockTypes.length > 0) {
    return props.blockTypes
  }
  return [
    { value: 'text', label: 'Texte' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Vidéo' },
    { value: 'cta', label: 'CTA' },
    { value: 'hero', label: 'Hero' },
    { value: 'features', label: 'Features' },
    { value: 'testimonials', label: 'Témoignages' },
    { value: 'pricing', label: 'Tarifs' },
    { value: 'faq', label: 'FAQ' },
    { value: 'countdown', label: 'Countdown' },
    { value: 'product', label: 'Produit' },
  ]
})

const handleClick = () => {
  if (props.isEditMode && !props.previewMode) {
    emit('select', props.column.id)
  }
}

const addBlock = (type: string) => {
  emit('add-block', type)
  showAddMenu.value = false
}

const handleBlockUpdate = (blockId: string, newProps: any) => {
  emit('update-block', { blockId, props: newProps })
}

// Handler pour les changements de drag & drop
const onDragChange = (evt: any) => {
  // Un bloc a été ajouté depuis une autre colonne
  if (evt.added) {
    const { element: block, newIndex } = evt.added
    emit('block-moved-in', { blockId: block.id, newIndex })
  }
  // Un bloc a été retiré vers une autre colonne
  if (evt.removed) {
    const { element: block } = evt.removed
    emit('block-moved-out', block.id)
  }
  // Un bloc a été réordonné dans la même colonne
  if (evt.moved) {
    emit('reorder', localBlocks.value)
  }
}

// Classes et styles
const columnClasses = computed(() => {
  const classes = ['relative', 'transition-all', 'duration-150']
  
  if (props.isEditMode && !props.previewMode) {
    classes.push('cursor-pointer')
    if (props.isSelected) {
      classes.push('ring-2', 'ring-emerald-300', 'ring-offset-2', 'rounded-lg')
    }
  }
  
  return classes.join(' ')
})

const columnStyles = computed(() => {
  const settings = props.column.settings || {}
  const styles: Record<string, string> = {}
  
  // Largeur (sera géré par le grid parent pour le responsive)
  // styles.width = `${props.column.width}%`
  
  // Alignement vertical
  const alignMap: Record<string, string> = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
  }
  if (settings.verticalAlign) {
    styles.alignSelf = alignMap[settings.verticalAlign] || 'flex-start'
  }
  
  // Padding
  const paddingMap: Record<string, string> = {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  }
  if (settings.padding) {
    styles.padding = paddingMap[settings.padding] || '0'
  }
  
  return styles
})
</script>
