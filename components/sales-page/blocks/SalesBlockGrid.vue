<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ 
        gap: '2.5rem',
        alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start'),
        textAlign: props.headerAlignment || 'center'
      }">
        <!-- Titre -->
        <h2 
          v-if="props.title || isEditMode"
          :class="['text-3xl md:text-4xl font-bold tracking-tight', editableClasses('title')]"
          :style="{ color: textColor, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Titre de la section'"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
        >{{ props.title }}</h2>

        <!-- Sous-titre -->
        <p 
          v-if="props.subtitle || isEditMode"
          :class="['text-lg opacity-70 max-w-2xl', editableClasses('subtitle')]"
          :style="{ color: textColor, ...subtitlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Sous-titre (optionnel)'"
          @focus="onFocus('subtitle')"
          @blur="onBlur($event, 'subtitle')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.subtitle }}</p>

        <!-- Bouton CTA global -->
        <div v-if="props.showButton || isEditMode" :style="buttonPositionStyles">
          <a
            :href="isEditMode ? undefined : props.buttonUrl"
            class="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
            :class="[editableClasses('buttonTextGlobal')]"
            :style="{ 
              backgroundColor: props.accentColor || '#10B981', 
              color: '#ffffff',
              opacity: props.showButton ? 1 : 0.5 
            }"
            :contenteditable="isEditMode"
            :data-placeholder="'Texte du bouton'"
            @focus="onFocus('buttonTextGlobal')"
            @blur="onBlur($event, 'buttonTextGlobal')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >
            {{ props.buttonText || 'En savoir plus' }}
          </a>
        </div>
      
        <div 
          :class="[template.styles.grid, gapClass, alignClass]"
          :style="gridPositionStyles"
        >
          <div 
            v-for="(item, index) in itemsList" 
            :key="item.id"
            :class="getItemClass(index)"
          >
            <!-- TYPE: TEXTE -->
            <div 
              v-if="item.type === 'text'" 
              class="prose prose-sm md:prose-base max-w-none"
              :style="{ color: textColor }"
              v-html="item.content"
            />
            
            <!-- TYPE: IMAGE -->
            <div v-else-if="item.type === 'image'" class="w-full">
              <img 
                v-if="item.content"
                :src="item.content"
                :alt="item.alt || ''"
                class="w-full h-auto object-cover rounded-lg"
              />
              <div 
                v-else
                class="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <!-- TYPE: VIDEO -->
            <div v-else-if="item.type === 'video'" class="w-full">
              <div v-if="item.content" class="relative w-full aspect-video rounded-lg overflow-hidden">
                <!-- YouTube -->
                <iframe
                  v-if="getVideoType(item.content) === 'youtube'"
                  :src="getYoutubeEmbedUrl(item.content)"
                  class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
                <!-- Vimeo -->
                <iframe
                  v-else-if="getVideoType(item.content) === 'vimeo'"
                  :src="getVimeoEmbedUrl(item.content)"
                  class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                />
                <!-- Direct URL -->
                <video
                  v-else
                  :src="item.content"
                  class="absolute inset-0 w-full h-full object-cover"
                  controls
                />
              </div>
              <div 
                v-else
                class="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface GridItem {
  id: string
  type: 'text' | 'image' | 'video'
  content: string | null
  alt?: string
  span?: number
}

interface Props {
  blockId?: string
  templateId?: string
  columns?: number
  gap?: 'none' | 'small' | 'medium' | 'large'
  verticalAlign?: 'top' | 'center' | 'bottom' | 'stretch'
  items?: GridItem[]
  backgroundColor?: string
  accentColor?: string
  // Nouveaux éléments globaux
  title?: string
  subtitle?: string
  headerAlignment?: 'left' | 'center' | 'right'
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  // Positionnement
  elementsOrder?: string[]
  titleOffsetY?: number
  subtitleOffsetY?: number
  gridOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'grid-2-cols',
  columns: 2,
  gap: 'medium',
  verticalAlign: 'center',
  items: () => [],
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
  title: '',
  subtitle: '',
  headerAlignment: 'center',
  showButton: false,
  buttonText: 'En savoir plus',
  buttonUrl: '',
  // Positionnement
  elementsOrder: () => ['title', 'subtitle', 'grid', 'button'],
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  gridOffsetY: 0,
  buttonOffsetY: 0,
})

// Édition inline
import { useInlineEdit } from '~/composables/useInlineEdit'
const { isEditMode, emitPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

const isFieldActive = (field: string) => activeEditField.value === field

const editableClasses = (field: string) => {
  if (!isEditMode.value) return ''
  return [
    'outline-none', 'cursor-text', 'transition-all', 'duration-150', 'min-w-[20px]',
    isFieldActive(field) 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

const onFocus = (field: string) => {
  if (props.blockId) startEditing(props.blockId, field)
}

const onBlur = (e: FocusEvent, field: string) => {
  const newValue = (e.target as HTMLElement).innerText || ''
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

const onKeydown = (e: KeyboardEvent, singleLine: boolean) => {
  if (singleLine && e.key === 'Enter') {
    e.preventDefault()
    ;(e.target as HTMLElement).blur()
  }
  if (e.key === 'Escape') {
    ;(e.target as HTMLElement).blur()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

// Liste des items avec fallback
const itemsList = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  return [
    { id: '1', type: 'text' as const, content: '<p>Contenu texte</p>', span: 1 },
    { id: '2', type: 'image' as const, content: null, span: 1 },
  ]
})

// Template actif
const template = computed(() => {
  return getTemplate('grid', props.templateId) || {
    id: 'grid-2-cols',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-12 md:py-20 px-6',
      container: 'max-w-6xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2',
    }
  }
})

// Gap classes
const gapClass = computed(() => {
  const gaps: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-4',
    medium: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12',
  }
  return gaps[props.gap] || gaps.medium
})

// Vertical align
const alignClass = computed(() => {
  const aligns: Record<string, string> = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch',
  }
  return aligns[props.verticalAlign] || aligns.center
})

// Text color based on background
const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  if (hex.length !== 6) return '#1f2937'
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

// Get item class with col-span
const getItemClass = (index: number) => {
  const item = itemsList.value[index]
  if (!item) return ''
  const templateStyles = template.value.styles as any
  
  // Si le template a des colSpans définis
  if (templateStyles.colSpans) {
    const spanClass = templateStyles.colSpans[index + 1]
    if (spanClass) return spanClass
  }
  
  // Sinon, utiliser le span de l'item
  if (item.span && item.span > 1) {
    return `col-span-${item.span}`
  }
  
  return ''
}

// Video helpers
const getVideoType = (url: string): 'youtube' | 'vimeo' | 'direct' => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('vimeo.com')) return 'vimeo'
  return 'direct'
}

const getYoutubeEmbedUrl = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  const videoId = match && match[2].length === 11 ? match[2] : null
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
}

const getVimeoEmbedUrl = (url: string): string => {
  const regExp = /vimeo\.com\/(\d+)/
  const match = url.match(regExp)
  const videoId = match ? match[1] : null
  return videoId ? `https://player.vimeo.com/video/${videoId}` : ''
}

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['title', 'subtitle', 'grid', 'button']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

const titlePositionStyles = computed(() => ({
  order: getElementOrder('title'),
  transform: props.titleOffsetY ? `translateY(${props.titleOffsetY}px)` : undefined
}))

const subtitlePositionStyles = computed(() => ({
  order: getElementOrder('subtitle'),
  transform: props.subtitleOffsetY ? `translateY(${props.subtitleOffsetY}px)` : undefined,
  marginTop: getElementOrder('subtitle') === getElementOrder('title') + 1 ? '-1rem' : '0'
}))

const gridPositionStyles = computed(() => ({
  order: getElementOrder('grid'),
  transform: props.gridOffsetY ? `translateY(${props.gridOffsetY}px)` : undefined,
  width: '100%'
}))

const buttonPositionStyles = computed(() => ({
  order: getElementOrder('button'),
  transform: props.buttonOffsetY ? `translateY(${props.buttonOffsetY}px)` : undefined,
  marginTop: '1.5rem'
}))
</script>

<style scoped>
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  color: inherit;
  margin-top: 0;
}

.prose :deep(p) {
  color: inherit;
  opacity: 0.8;
}

.prose :deep(ul),
.prose :deep(ol) {
  color: inherit;
}
</style>
