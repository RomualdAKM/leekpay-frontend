<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col" :style="{ gap: '1rem' }">
        <!-- Titre optionnel -->
        <h2 
          v-if="props.showTitle && (props.title || isEditMode)"
          :class="editableClasses('title')"
          :style="{ ...titleStyles, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          data-placeholder="Titre de la section"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
        >{{ props.title }}</h2>
        
        <!-- Description optionnelle -->
        <p 
          v-if="props.showDescription && (props.description || isEditMode)"
          :class="editableClasses('description')"
          :style="{ ...descriptionStyles, ...descriptionPositionStyles }"
          :contenteditable="isEditMode"
          data-placeholder="Description de l'image"
          @focus="onFocus('description')"
          @blur="onBlur($event, 'description')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.description }}</p>
        
        <figure :style="imagePositionStyles">
          <!-- Image Wrapper -->
          <div 
            :class="template.styles.imageWrapper"
            :style="imageWrapperStyles"
          >
            <img 
              :src="imageSrc"
              :alt="props.alt || 'Image'"
              :class="template.styles.image"
              :style="imageStyles"
              loading="lazy"
            />
            
            <!-- Overlay -->
            <div 
              v-if="props.overlayEnabled"
              class="absolute inset-0"
              :style="overlayStyles"
            />
          </div>
          
          <!-- Caption (éditable inline) -->
          <figcaption 
            v-if="props.caption || isEditMode"
            :class="[template.styles.caption, editableClasses('caption')]"
            :style="captionStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Légende de l\'image'"
            @focus="onFocus('caption')"
            @blur="onBlur($event, 'caption')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.caption }}</figcaption>
        </figure>
        
        <!-- Bouton optionnel -->
        <div v-if="props.showButton && (props.buttonText || isEditMode)" :style="{ ...buttonContainerStyles, ...buttonPositionStyles }">
          <component
            :is="props.buttonUrl ? 'a' : 'button'"
            :href="props.buttonUrl || undefined"
            :target="props.buttonUrl ? props.buttonTarget : undefined"
            class="inline-flex items-center gap-2"
            :style="buttonStyles"
          >
            {{ props.buttonText || 'Bouton' }}
            <svg v-if="props.buttonIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
            <svg v-else-if="props.buttonIcon === 'external'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Image par défaut libre de droit (Unsplash)
export const DEFAULT_IMAGE_SRC = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&auto=format&fit=crop&q=80'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface Props {
  blockId?: string
  templateId?: string
  src?: string | null
  alt?: string
  caption?: string
  // Titre optionnel
  showTitle?: boolean
  title?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  titleColor?: string
  titleAlign?: 'left' | 'center' | 'right'
  // Description optionnelle
  showDescription?: boolean
  description?: string
  descriptionColor?: string
  // Bouton optionnel
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonIcon?: 'none' | 'arrow-right' | 'external'
  buttonBgColor?: string
  buttonTextColor?: string
  buttonAlign?: 'left' | 'center' | 'right'
  // Couleurs
  backgroundColor?: string
  // Image
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right'
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'wide' | 'ultrawide'
  maxHeight?: 'auto' | 'small' | 'medium' | 'large' | 'full'
  // Effets
  filter?: 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast'
  hoverEffect?: 'none' | 'zoom' | 'brightness' | 'grayscale'
  // Bordure
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  borderColor?: string
  // Overlay
  overlayEnabled?: boolean
  overlayColor?: string
  overlayOpacity?: number
  // Espacement
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  // Caption
  captionAlign?: 'left' | 'center' | 'right'
  captionSize?: 'small' | 'medium' | 'large'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'zoom'
  // Positionnement des éléments
  elementsOrder?: ('title' | 'description' | 'image' | 'button')[]
  titleOffsetY?: number
  descriptionOffsetY?: number
  imageOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'image-minimal-centered',
  src: DEFAULT_IMAGE_SRC,
  alt: '',
  caption: '',
  // Titre
  showTitle: false,
  title: '',
  titleSize: 'large',
  titleWeight: 'bold',
  titleColor: '',
  titleAlign: 'center',
  // Description
  showDescription: false,
  description: '',
  descriptionColor: '',
  // Bouton
  showButton: false,
  buttonText: '',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonIcon: 'none',
  buttonBgColor: '#10b981',
  buttonTextColor: '#ffffff',
  buttonAlign: 'center',
  // Autres
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
  // Positionnement
  elementsOrder: () => ['title', 'description', 'image', 'button'] as ('title' | 'description' | 'image' | 'button')[],
  titleOffsetY: 0,
  descriptionOffsetY: 0,
  imageOffsetY: 0,
  buttonOffsetY: 0,
})

// Édition inline
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

// Image avec fallback par défaut
const imageSrc = computed(() => {
  return props.src || DEFAULT_IMAGE_SRC
})

// Template actif
const template = computed(() => {
  return getTemplate('image', props.templateId) || {
    id: 'image-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-3xl mx-auto',
      imageWrapper: 'relative overflow-hidden',
      image: 'w-full h-auto',
      caption: 'text-xs text-center opacity-50 mt-3',
    }
  }
})

// Mappings
const paddingYMap: Record<string, string> = {
  'none': '0',
  'small': '1.5rem',
  'medium': '3rem',
  'large': '5rem',
  'xlarge': '8rem'
}

const borderRadiusMap: Record<string, string> = {
  'none': '0',
  'small': '0.375rem',
  'medium': '0.75rem',
  'large': '1.5rem',
  'full': '9999px'
}

const borderWidthMap: Record<string, string> = {
  'none': '0',
  'thin': '1px',
  'medium': '2px',
  'thick': '4px'
}

const aspectRatioMap: Record<string, string> = {
  'auto': 'auto',
  'square': '1/1',
  'video': '16/9',
  'portrait': '3/4',
  'wide': '21/9',
  'ultrawide': '32/9'
}

const maxHeightMap: Record<string, string> = {
  'auto': 'none',
  'small': '300px',
  'medium': '500px',
  'large': '700px',
  'full': '100vh'
}

const filterMap: Record<string, string> = {
  'none': 'none',
  'grayscale': 'grayscale(100%)',
  'sepia': 'sepia(100%)',
  'blur': 'blur(2px)',
  'brightness': 'brightness(1.1)',
  'contrast': 'contrast(1.1)'
}

const hoverEffectMap: Record<string, string> = {
  'none': '',
  'zoom': 'hover:scale-105',
  'brightness': 'hover:brightness-110',
  'grayscale': 'hover:grayscale-0'
}

const captionSizeMap: Record<string, string> = {
  'small': '0.75rem',
  'medium': '0.875rem',
  'large': '1rem'
}

// Styles
const sectionStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.backgroundColor || '#ffffff'
  }
  
  styles.paddingTop = paddingYMap[props.paddingY || 'medium'] || '3rem'
  styles.paddingBottom = paddingYMap[props.paddingY || 'medium'] || '3rem'
  
  return styles
})

const imageWrapperStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  styles.borderRadius = borderRadiusMap[props.borderRadius || 'none'] || '0'
  styles.overflow = 'hidden'
  
  const bw = borderWidthMap[props.borderWidth || 'none']
  if (bw && bw !== '0') {
    styles.borderWidth = bw
    styles.borderColor = props.borderColor || '#e5e7eb'
    styles.borderStyle = 'solid'
  }
  
  return styles
})

const imageStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  styles.objectFit = props.objectFit || 'cover'
  styles.objectPosition = props.objectPosition || 'center'
  
  const ar = aspectRatioMap[props.aspectRatio || 'auto']
  if (ar && ar !== 'auto') {
    styles.aspectRatio = ar
  }
  
  const mh = maxHeightMap[props.maxHeight || 'auto']
  if (mh && mh !== 'none') {
    styles.maxHeight = mh
  }
  
  const filter = filterMap[props.filter || 'none']
  if (filter && filter !== 'none') {
    styles.filter = filter
  }
  
  // Transition pour hover effects
  styles.transition = 'all 0.3s ease'
  
  return styles
})

const overlayStyles = computed(() => {
  return {
    backgroundColor: props.overlayColor || '#000000',
    opacity: (props.overlayOpacity || 30) / 100
  }
})

const captionStyles = computed(() => {
  return {
    textAlign: props.captionAlign || 'center',
    fontSize: captionSizeMap[props.captionSize || 'small'] || '0.75rem'
  }
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})

// Styles du titre
const titleSizeMap: Record<string, string> = {
  'small': '1.25rem',
  'medium': '1.5rem',
  'large': '2rem',
  'xlarge': '2.5rem'
}

const fontWeightMap: Record<string, string> = {
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700'
}

const titleStyles = computed(() => {
  return {
    color: props.titleColor || '#1f2937',
    fontSize: titleSizeMap[props.titleSize || 'large'] || '2rem',
    fontWeight: fontWeightMap[props.titleWeight || 'bold'] || '700',
    textAlign: props.titleAlign || 'center',
    marginBottom: '1rem'
  }
})

// Styles de la description
const descriptionStyles = computed(() => {
  return {
    color: props.descriptionColor || '#6b7280',
    fontSize: '1rem',
    textAlign: props.titleAlign || 'center',
    marginBottom: '1.5rem',
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

// Styles du conteneur du bouton
const buttonContainerStyles = computed(() => {
  const alignMap: Record<string, string> = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
  }
  return {
    display: 'flex',
    justifyContent: alignMap[props.buttonAlign || 'center'] || 'center'
  }
})

// Styles du bouton
const buttonStyles = computed(() => {
  return {
    backgroundColor: props.buttonBgColor || '#10b981',
    color: props.buttonTextColor || '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none'
  }
})

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['title', 'description', 'image', 'button']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element as any)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

const titlePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.titleOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('title'))
  return styles
})

const descriptionPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.descriptionOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('description'))
  return styles
})

const imagePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.imageOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('image'))
  return styles
})

const buttonPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.buttonOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('button'))
  return styles
})
</script>
