<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <figure>
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
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'image-minimal-centered',
  src: DEFAULT_IMAGE_SRC,
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
</script>
