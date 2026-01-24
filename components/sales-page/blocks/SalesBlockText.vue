<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container" :style="containerStyles">
      <div 
        v-if="!isEditMode"
        :class="template.styles.text"
        :style="textStyles"
        v-html="props.content"
      />
      <!-- Mode édition: contenteditable avec HTML -->
      <div 
        v-else
        :class="[template.styles.text, editableClasses('content')]"
        :style="textStyles"
        contenteditable="true"
        data-placeholder="Écrivez votre contenu ici..."
        @focus="onFocus('content')"
        @blur="onBlur($event, 'content')"
        @keydown="onKeydown"
        ref="contentRef"
        v-html="props.content"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface Props {
  blockId?: string  // ID du bloc pour l'édition inline
  templateId?: string
  content?: string
  // Couleurs
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  // Typographie
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge'
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  fontFamily?: string
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose'
  letterSpacing?: 'tight' | 'normal' | 'wide' | 'wider'
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  // Espacement
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  paddingX?: 'none' | 'small' | 'medium' | 'large'
  maxWidth?: 'small' | 'medium' | 'large' | 'full'
  // Bordure
  borderStyle?: 'none' | 'left' | 'top' | 'bottom' | 'all' | 'card'
  borderWidth?: 'thin' | 'medium' | 'thick'
  borderColor?: string
  borderRadius?: 'none' | 'small' | 'medium' | 'large'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'slide-left'
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'text-minimal-centered',
  content: '<p>Votre contenu ici...</p>',
  backgroundColor: '#ffffff',
  textColor: '',
  accentColor: '#3b82f6',
  fontSize: 'medium',
  fontWeight: 'normal',
  fontFamily: '',
  lineHeight: 'relaxed',
  letterSpacing: 'normal',
  textAlign: 'left',
  textTransform: 'none',
  paddingY: 'large',
  paddingX: 'medium',
  maxWidth: 'medium',
  borderStyle: 'none',
  borderWidth: 'medium',
  borderColor: '',
  borderRadius: 'none',
  animation: 'none',
})

// Référence DOM
const contentRef = ref<HTMLElement | null>(null)

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

// Champ en cours d'édition
const isFieldActive = (field: string) => activeEditField.value === field

// Classes pour les éléments éditables
const editableClasses = (field: string) => {
  if (!isEditMode.value) return ''
  return [
    'outline-none',
    'cursor-text',
    'transition-all',
    'duration-150',
    'min-h-[2em]',
    isFieldActive(field) 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

// Handlers d'édition
const onFocus = (field: string) => {
  if (props.blockId) {
    startEditing(props.blockId, field)
  }
}

const onBlur = (e: FocusEvent, field: string) => {
  const target = e.target as HTMLElement
  // Pour le rich text, on garde le HTML
  const newValue = target.innerHTML || ''
  
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  // Escape pour quitter l'édition
  if (e.key === 'Escape') {
    ;(e.target as HTMLElement).blur()
  }
}

// Template actif
const template = computed(() => {
  return getTemplate('text', props.templateId) || {
    id: 'text-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-base md:text-lg font-light leading-relaxed opacity-80',
    }
  }
})

// Calcul de la couleur de texte automatique
const autoTextColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Mappings
const fontSizeMap: Record<string, string> = {
  'small': '0.875rem',
  'medium': '1rem',
  'large': '1.25rem',
  'xlarge': '1.5rem'
}

const fontWeightMap: Record<string, string> = {
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700'
}

const lineHeightMap: Record<string, string> = {
  'tight': '1.25',
  'normal': '1.5',
  'relaxed': '1.75',
  'loose': '2'
}

const letterSpacingMap: Record<string, string> = {
  'tight': '-0.025em',
  'normal': '0',
  'wide': '0.025em',
  'wider': '0.05em'
}

const paddingYMap: Record<string, string> = {
  'none': '0',
  'small': '2rem',
  'medium': '4rem',
  'large': '6rem',
  'xlarge': '8rem'
}

const paddingXMap: Record<string, string> = {
  'none': '0',
  'small': '1rem',
  'medium': '1.5rem',
  'large': '2rem'
}

const maxWidthMap: Record<string, string> = {
  'small': '32rem',
  'medium': '48rem',
  'large': '64rem',
  'full': '100%'
}

const borderWidthMap: Record<string, string> = {
  'thin': '1px',
  'medium': '2px',
  'thick': '4px'
}

const borderRadiusMap: Record<string, string> = {
  'none': '0',
  'small': '0.375rem',
  'medium': '0.5rem',
  'large': '1rem'
}

// Styles
const sectionStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.backgroundColor || '#ffffff'
  }
  
  styles.paddingTop = paddingYMap[props.paddingY || 'large'] || '6rem'
  styles.paddingBottom = paddingYMap[props.paddingY || 'large'] || '6rem'
  styles.paddingLeft = paddingXMap[props.paddingX || 'medium'] || '1.5rem'
  styles.paddingRight = paddingXMap[props.paddingX || 'medium'] || '1.5rem'
  
  return styles
})

const containerStyles = computed(() => {
  const styles: Record<string, string> = {}
  const bc = props.borderColor || props.accentColor || '#3b82f6'
  const bw = borderWidthMap[props.borderWidth || 'medium'] || '2px'
  const br = borderRadiusMap[props.borderRadius || 'none'] || '0'
  
  styles.maxWidth = maxWidthMap[props.maxWidth || 'medium'] || '48rem'
  styles.marginLeft = 'auto'
  styles.marginRight = 'auto'
  
  // Bordures
  if (props.borderStyle === 'left') {
    styles.borderLeftWidth = bw
    styles.borderLeftColor = bc
    styles.borderLeftStyle = 'solid'
    styles.paddingLeft = '2rem'
  } else if (props.borderStyle === 'top') {
    styles.borderTopWidth = bw
    styles.borderTopColor = bc
    styles.borderTopStyle = 'solid'
    styles.paddingTop = '2rem'
  } else if (props.borderStyle === 'bottom') {
    styles.borderBottomWidth = bw
    styles.borderBottomColor = bc
    styles.borderBottomStyle = 'solid'
    styles.paddingBottom = '2rem'
  } else if (props.borderStyle === 'all' || props.borderStyle === 'card') {
    styles.borderWidth = bw
    styles.borderColor = bc
    styles.borderStyle = 'solid'
    styles.borderRadius = br
    styles.padding = '2rem'
  }
  
  return styles
})

const textStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.textColor || autoTextColor.value
  }
  
  if (props.fontFamily) styles.fontFamily = props.fontFamily
  styles.fontSize = fontSizeMap[props.fontSize || 'medium'] || '1rem'
  styles.fontWeight = fontWeightMap[props.fontWeight || 'normal'] || '400'
  styles.lineHeight = lineHeightMap[props.lineHeight || 'relaxed'] || '1.75'
  styles.letterSpacing = letterSpacingMap[props.letterSpacing || 'normal'] || '0'
  styles.textAlign = props.textAlign || 'left'
  
  if (props.textTransform && props.textTransform !== 'none') {
    styles.textTransform = props.textTransform
  }
  
  return styles
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})
</script>
