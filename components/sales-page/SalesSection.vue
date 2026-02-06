<template>
  <section 
    :class="sectionClasses"
    :style="sectionStyles"
    @click.stop="handleClick"
  >
    <!-- Actions de section (mode édition) -->
    <div 
      v-if="isEditMode && !previewMode"
      class="absolute top-2 right-2 z-20 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <!-- Changer le layout -->
      <div class="relative">
        <button
          @click.stop="showLayoutMenu = !showLayoutMenu"
          class="p-1.5 bg-white rounded shadow hover:bg-gray-50"
          title="Changer le layout"
        >
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <!-- Menu layout -->
        <div 
          v-if="showLayoutMenu"
          class="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border p-2 z-30 min-w-[200px]"
          @click.stop
        >
          <p class="text-xs text-gray-500 mb-2 px-2">Changer le layout</p>
          <div class="grid grid-cols-3 gap-1">
            <button 
              v-for="(widths, key) in layouts" 
              :key="key"
              @click="changeLayout(key)"
              class="p-2 hover:bg-gray-100 rounded flex flex-col items-center"
              :title="key"
            >
              <div class="flex w-full h-6 gap-0.5">
                <div 
                  v-for="(w, i) in widths" 
                  :key="i"
                  class="bg-emerald-400 h-full rounded-sm"
                  :style="{ width: w + '%' }"
                />
              </div>
              <span class="text-[10px] text-gray-400 mt-1">{{ key }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Drag handle -->
      <button
        class="drag-section-handle p-1.5 bg-white rounded shadow hover:bg-gray-50 cursor-move"
        title="Déplacer"
      >
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
        </svg>
      </button>
      
      <!-- Dupliquer -->
      <button
        @click.stop="$emit('duplicate', section.id)"
        class="p-1.5 bg-white rounded shadow hover:bg-gray-50"
        title="Dupliquer"
      >
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      
      <!-- Supprimer -->
      <button
        @click.stop="$emit('remove', section.id)"
        class="p-1.5 bg-white rounded shadow hover:bg-red-50"
        title="Supprimer"
      >
        <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    
    <!-- Contenu: Colonnes -->
    <div :class="containerClasses">
      <div :class="gridClasses">
        <SalesColumn
          v-for="column in section.columns"
          :key="column.id"
          :column="column"
          :section-id="section.id"
          :is-edit-mode="isEditMode"
          :preview-mode="previewMode"
          :is-selected="selectedColumnId === column.id"
          :selected-block-id="selectedBlockId"
          :checkout-url="checkoutUrl"
          @select="$emit('select-column', $event)"
          @select-block="$emit('select-block', $event)"
          @add-block="$emit('add-block', section.id, column.id, $event)"
          @remove-block="$emit('remove-block', section.id, column.id, $event)"
          @update-block="$emit('update-block', section.id, column.id, $event)"
          @block-moved-in="handleBlockMovedIn(column.id, $event)"
          @block-moved-out="handleBlockMovedOut(column.id, $event)"
          @reorder="handleReorder(column.id, $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Section, Column, SectionSettings } from '~/composables/useSalesPageBuilder'
import { COLUMN_LAYOUTS } from '~/composables/useSalesPageBuilder'
import SalesColumn from './SalesColumn.vue'

interface Props {
  section: Section
  isEditMode: boolean
  previewMode: boolean
  isSelected: boolean
  selectedColumnId: string | null
  selectedBlockId: string | null
  checkoutUrl?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', sectionId: string): void
  (e: 'select-column', columnId: string): void
  (e: 'select-block', blockId: string): void
  (e: 'remove', sectionId: string): void
  (e: 'duplicate', sectionId: string): void
  (e: 'change-layout', sectionId: string, layout: string): void
  (e: 'add-block', sectionId: string, columnId: string, blockType: string): void
  (e: 'remove-block', sectionId: string, columnId: string, blockId: string): void
  (e: 'update-block', sectionId: string, columnId: string, payload: { blockId: string; props: any }): void
  (e: 'block-moved', payload: { sectionId: string; fromColumnId: string; toColumnId: string; blockId: string; newIndex: number }): void
  (e: 'reorder-blocks', sectionId: string, columnId: string, blocks: any[]): void
}>()

const showLayoutMenu = ref(false)
const layouts = COLUMN_LAYOUTS

const handleClick = () => {
  if (props.isEditMode && !props.previewMode) {
    emit('select', props.section.id)
  }
}

const changeLayout = (layout: string) => {
  emit('change-layout', props.section.id, layout)
  showLayoutMenu.value = false
}

// ============ DRAG & DROP ENTRE COLONNES ============

// Variables temporaires pour suivre le déplacement
let pendingBlockMoveOut: { columnId: string; blockId: string } | null = null

// Quand un bloc arrive dans une colonne
const handleBlockMovedIn = (columnId: string, payload: { blockId: string; newIndex: number }) => {
  if (pendingBlockMoveOut) {
    // Le bloc vient d'une autre colonne de cette même section
    emit('block-moved', {
      sectionId: props.section.id,
      fromColumnId: pendingBlockMoveOut.columnId,
      toColumnId: columnId,
      blockId: payload.blockId,
      newIndex: payload.newIndex,
    })
    pendingBlockMoveOut = null
  }
}

// Quand un bloc quitte une colonne
const handleBlockMovedOut = (columnId: string, blockId: string) => {
  pendingBlockMoveOut = { columnId, blockId }
  // Sera traité par handleBlockMovedIn si le bloc arrive dans une autre colonne
  // Sinon, le bloc part vers une autre section (sera géré au niveau du builder)
}

// Réordonnement dans la même colonne
const handleReorder = (columnId: string, blocks: any[]) => {
  emit('reorder-blocks', props.section.id, columnId, blocks)
}

// ============ FIN DRAG & DROP ============

// Classes et styles
const sectionClasses = computed(() => {
  const classes = ['relative', 'group', 'transition-all', 'duration-150']
  
  if (props.isEditMode && !props.previewMode) {
    classes.push('cursor-pointer')
    // Cadre de section masqué - seules les colonnes ont un cadre
  }
  
  return classes.join(' ')
})

const sectionStyles = computed(() => {
  const settings = props.section.settings || {}
  const styles: Record<string, string> = {}
  
  // Background
  if (settings.backgroundColor) {
    styles.backgroundColor = settings.backgroundColor
  }
  if (settings.backgroundImage) {
    styles.backgroundImage = `url(${settings.backgroundImage})`
    styles.backgroundSize = settings.backgroundSize || 'cover'
    styles.backgroundPosition = settings.backgroundPosition || 'center'
  }
  
  // Padding
  const paddingMap: Record<string, string> = {
    none: '0',
    small: '1.5rem',
    medium: '3rem',
    large: '5rem',
    xlarge: '8rem',
  }
  styles.paddingTop = paddingMap[settings.paddingTop || 'large'] || '5rem'
  styles.paddingBottom = paddingMap[settings.paddingBottom || 'large'] || '5rem'
  
  // Margin
  const marginMap: Record<string, string> = {
    none: '0',
    small: '1rem',
    medium: '2rem',
    large: '4rem',
  }
  if (settings.marginTop) {
    styles.marginTop = marginMap[settings.marginTop] || '0'
  }
  if (settings.marginBottom) {
    styles.marginBottom = marginMap[settings.marginBottom] || '0'
  }
  
  // Min height
  const minHeightMap: Record<string, string> = {
    auto: 'auto',
    screen: '100vh',
    half: '50vh',
  }
  if (settings.minHeight && settings.minHeight !== 'auto') {
    styles.minHeight = minHeightMap[settings.minHeight]
  }
  
  return styles
})

const containerClasses = computed(() => {
  const settings = props.section.settings || {}
  const classes = ['mx-auto', 'px-4', 'sm:px-6', 'lg:px-8']
  
  // Max width
  const maxWidthMap: Record<string, string> = {
    full: 'w-full',
    '7xl': 'max-w-7xl',
    '6xl': 'max-w-6xl',
    '5xl': 'max-w-5xl',
    '4xl': 'max-w-4xl',
  }
  classes.push(maxWidthMap[settings.maxWidth || '7xl'] || 'max-w-7xl')
  
  return classes.join(' ')
})

const gridClasses = computed(() => {
  const colCount = props.section.columns.length
  const classes = ['grid', 'gap-4', 'md:gap-6', 'lg:gap-8']
  
  // Responsive grid
  if (colCount === 1) {
    classes.push('grid-cols-1')
  } else if (colCount === 2) {
    classes.push('grid-cols-1', 'md:grid-cols-2')
  } else if (colCount === 3) {
    classes.push('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  } else {
    classes.push('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  }
  
  return classes.join(' ')
})
</script>
