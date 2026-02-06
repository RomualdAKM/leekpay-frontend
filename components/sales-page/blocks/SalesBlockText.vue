<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container" :style="containerStyles">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col" :style="{ gap: '1rem' }">
        <!-- Titre optionnel -->
        <h2 
          v-if="props.showTitle && (props.title || isEditMode)"
          :class="[template.styles.title, editableClasses('title')]"
          :style="{ ...titleStyles, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          data-placeholder="Titre de la section"
          @focus="onFocus('title')"
          @blur="onBlurText($event, 'title')"
          @keydown="onKeydown"
        >{{ props.title }}</h2>
        
        <!-- Contenu / Description -->
        <div 
          v-if="!isEditMode"
          :class="template.styles.text"
          :style="{ ...textStyles, ...contentPositionStyles }"
          v-html="props.content"
        />
        <!-- Mode édition: contenteditable avec HTML -->
        <div 
          v-else
          :class="[template.styles.text, editableClasses('content')]"
          :style="{ ...textStyles, ...contentPositionStyles }"
          contenteditable="true"
          data-placeholder="Écrivez votre contenu ici..."
          @focus="onFocus('content')"
          @blur="onBlur($event, 'content')"
          @keydown="onKeydown"
          ref="contentRef"
          v-html="props.content"
        />
        
        <!-- Bouton optionnel -->
        <div v-if="props.showButton && (props.buttonText || isEditMode)" :style="{ ...buttonContainerStyles, ...buttonPositionStyles }">
          <component
            :is="props.buttonUrl ? 'a' : 'button'"
            :href="props.buttonUrl || undefined"
            :target="props.buttonUrl ? props.buttonTarget : undefined"
            :class="[template.styles.button, 'inline-flex items-center gap-2']"
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

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface Props {
  blockId?: string  // ID du bloc pour l'édition inline
  templateId?: string
  content?: string
  // Titre optionnel
  showTitle?: boolean
  title?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  titleColor?: string
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
  // Positionnement des éléments
  elementsOrder?: ('title' | 'content' | 'button')[]
  titleOffsetY?: number
  contentOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'text-minimal-centered',
  content: '<p>Votre contenu ici...</p>',
  // Titre
  showTitle: false,
  title: '',
  titleSize: 'large',
  titleWeight: 'bold',
  titleColor: '',
  // Bouton
  showButton: false,
  buttonText: '',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonIcon: 'none',
  buttonBgColor: '#10b981',
  buttonTextColor: '#ffffff',
  buttonAlign: 'left',
  // Couleurs
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
  // Positionnement
  elementsOrder: () => ['title', 'content', 'button'] as ('title' | 'content' | 'button')[],
  titleOffsetY: 0,
  contentOffsetY: 0,
  buttonOffsetY: 0,
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

// Handler pour le titre (texte simple, pas HTML)
const onBlurText = (e: FocusEvent, field: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
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

// Taille du titre
const titleSizeMap: Record<string, string> = {
  'small': '1.25rem',
  'medium': '1.5rem',
  'large': '2rem',
  'xlarge': '2.5rem'
}

// Styles du titre
const titleStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.titleColor || props.textColor || autoTextColor.value,
    fontSize: titleSizeMap[props.titleSize || 'large'] || '2rem',
    fontWeight: fontWeightMap[props.titleWeight || 'bold'] || '700',
    marginBottom: '1rem',
    textAlign: props.textAlign || 'left'
  }
  return styles
})

// Styles du conteneur du bouton (pour l'alignement)
const buttonContainerStyles = computed(() => {
  const alignMap: Record<string, string> = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
  }
  return {
    display: 'flex',
    justifyContent: alignMap[props.buttonAlign || props.textAlign || 'left'] || 'flex-start'
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

// Calcul de l'ordre CSS pour chaque élément
const getElementOrder = (element: string): number => {
  const defaultOrder = ['title', 'content', 'button']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element as any)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

// Styles de positionnement pour le titre
const titlePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.titleOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('title'))
  return styles
})

// Styles de positionnement pour le contenu
const contentPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.contentOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('content'))
  return styles
})

// Styles de positionnement pour le bouton
const buttonPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.buttonOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('button'))
  return styles
})
</script>
