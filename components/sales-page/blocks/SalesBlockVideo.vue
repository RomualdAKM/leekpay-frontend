<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col" :style="{ gap: '1.5rem' }">
        <!-- Titre (éditable inline) -->
        <component
          :is="props.titleTag || 'h3'"
          v-if="props.title || isEditMode"
          :class="[template.styles.title, editableClasses('title')]"
          :style="{ ...titleStyles, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Titre de la vidéo'"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
        >{{ props.title }}</component>
        
        <!-- Player vidéo -->
        <div 
          :class="template.styles.videoWrapper"
          :style="{ ...videoWrapperStyles, ...videoPositionStyles }"
        >
          <div :class="template.styles.video" class="relative bg-black">
            <!-- YouTube -->
            <iframe
              v-if="props.type === 'youtube' && youtubeId"
              :src="`https://www.youtube.com/embed/${youtubeId}${youtubeParams}`"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
            
            <!-- Vimeo -->
            <iframe
              v-else-if="props.type === 'vimeo' && vimeoId"
              :src="`https://player.vimeo.com/video/${vimeoId}${vimeoParams}`"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
            
            <!-- URL directe -->
            <video
              v-else-if="props.type === 'url' && props.url"
              :src="props.url"
              :autoplay="props.autoplay"
              :loop="props.loop"
              :muted="props.muted"
              :controls="props.showControls"
              class="absolute inset-0 w-full h-full object-cover"
              playsinline
            />
            
            <!-- Placeholder -->
            <div 
              v-else 
              class="absolute inset-0 flex items-center justify-center bg-gray-900"
            >
              <div class="text-center text-white">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm opacity-75">Ajoutez une URL vidéo</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Description optionnelle -->
        <div 
          v-if="props.showDescription && (props.description || isEditMode)"
          :class="editableClasses('description')"
          :style="{ ...descriptionStyles, ...descriptionPositionStyles }"
          :contenteditable="isEditMode"
          data-placeholder="Description de la vidéo"
          @focus="onFocus('description')"
          @blur="onBlur($event, 'description')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.description }}</div>
        
        <!-- Bouton optionnel -->
        <div v-if="props.showButton && (props.buttonText || isEditMode)" :style="{ ...buttonContainerStyles, ...buttonPositionStyles }">
          <component
            :is="props.buttonUrl ? 'a' : 'button'"
            :href="props.buttonUrl || undefined"
            :target="props.buttonUrl ? props.buttonTarget : undefined"
            :class="'inline-flex items-center gap-2'"
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
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface Props {
  blockId?: string
  templateId?: string
  type?: 'youtube' | 'vimeo' | 'url'
  url?: string
  title?: string
  // Titre
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  titleFontFamily?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  titleColor?: string
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  titleAlign?: 'left' | 'center' | 'right' | 'justify'
  titleOpacity?: number
  titleMarginBottom?: number
  // Description optionnelle
  showDescription?: boolean
  description?: string
  descriptionColor?: string
  descriptionAlign?: 'left' | 'center' | 'right' | 'justify'
  descriptionOpacity?: number
  // Bouton optionnel
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonIcon?: 'none' | 'arrow-right' | 'external'
  buttonVariant?: 'filled' | 'outlined' | 'ghost'
  buttonSize?: 'sm' | 'md' | 'lg'
  buttonBgColor?: string
  buttonTextColor?: string
  buttonBorderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  buttonShadow?: 'none' | 'sm' | 'md' | 'lg'
  buttonAlign?: 'left' | 'center' | 'right'
  // Lecture
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  showControls?: boolean
  // Couleurs
  backgroundColor?: string
  // Aspect
  aspectRatio?: 'video' | 'wide' | 'ultrawide' | 'square'
  maxWidth?: 'small' | 'medium' | 'large' | 'full'
  // Bordure
  borderRadius?: 'none' | 'small' | 'medium' | 'large'
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  borderColor?: string
  // Titre
  titlePosition?: 'top' | 'bottom'
  // Espacement
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'zoom'
  // Positionnement des éléments
  elementsOrder?: ('title' | 'video' | 'description' | 'button')[]
  titleOffsetY?: number
  videoOffsetY?: number
  descriptionOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'video-minimal-centered',
  type: 'youtube',
  url: '',
  title: '',
  // Titre
  titleTag: 'h3',
  titleFontFamily: '',
  titleSize: 'medium',
  titleWeight: 'medium',
  titleColor: '',
  titleTransform: 'none',
  titleAlign: 'center',
  titleOpacity: 100,
  titleMarginBottom: 16,
  // Description
  showDescription: false,
  description: '',
  descriptionColor: '',
  descriptionAlign: 'center',
  descriptionOpacity: 100,
  // Bouton
  showButton: false,
  buttonText: '',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonIcon: 'none',
  buttonVariant: 'filled',
  buttonSize: 'md',
  buttonBgColor: '#10b981',
  buttonTextColor: '#ffffff',
  buttonBorderRadius: 'md',
  buttonShadow: 'none',
  buttonAlign: 'center',
  // Lecture
  autoplay: false,
  loop: false,
  muted: false,
  showControls: true,
  backgroundColor: '#ffffff',
  aspectRatio: 'video',
  maxWidth: 'large',
  borderRadius: 'none',
  borderWidth: 'none',
  borderColor: '#e5e7eb',
  titlePosition: 'bottom',
  paddingY: 'large',
  animation: 'none',
  // Positionnement
  elementsOrder: () => ['title', 'video', 'description', 'button'] as ('title' | 'video' | 'description' | 'button')[],
  titleOffsetY: 0,
  videoOffsetY: 0,
  descriptionOffsetY: 0,
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

// Template actif
const template = computed(() => {
  return getTemplate('video', props.templateId) || {
    id: 'video-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-3xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-sm font-light mt-4 opacity-70 text-center',
    }
  }
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
  'bold': '700',
  'extrabold': '800'
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
  'small': '1.5rem',
  'medium': '3rem',
  'large': '5rem',
  'xlarge': '8rem'
}

const maxWidthMap: Record<string, string> = {
  'small': '32rem',
  'medium': '48rem',
  'large': '64rem',
  'full': '100%'
}

const borderRadiusMap: Record<string, string> = {
  'none': '0',
  'small': '0.375rem',
  'medium': '0.75rem',
  'large': '1.5rem'
}

const borderWidthMap: Record<string, string> = {
  'none': '0',
  'thin': '1px',
  'medium': '2px',
  'thick': '4px'
}

const aspectRatioMap: Record<string, string> = {
  'video': '16/9',
  'wide': '21/9',
  'ultrawide': '32/9',
  'square': '1/1'
}

const titleSizeMap: Record<string, string> = {
  'small': '0.875rem',
  'medium': '1.125rem',
  'large': '1.5rem',
  'xlarge': '2rem'
}

// Styles
const sectionStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.backgroundColor || '#ffffff'
  }
  
  styles.paddingTop = paddingYMap[props.paddingY || 'large'] || '5rem'
  styles.paddingBottom = paddingYMap[props.paddingY || 'large'] || '5rem'
  
  return styles
})

const videoWrapperStyles = computed(() => {
  const styles: Record<string, string> = {
    maxWidth: maxWidthMap[props.maxWidth || 'large'] || '64rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  
  styles.borderRadius = borderRadiusMap[props.borderRadius || 'none'] || '0'
  styles.overflow = 'hidden'
  styles.aspectRatio = aspectRatioMap[props.aspectRatio || 'video'] || '16/9'
  
  const bw = borderWidthMap[props.borderWidth || 'none']
  if (bw && bw !== '0') {
    styles.borderWidth = bw
    styles.borderColor = props.borderColor || '#e5e7eb'
    styles.borderStyle = 'solid'
  }
  
  return styles
})

const titleStyles = computed(() => {
  const styles: Record<string, string> = {
    textAlign: props.titleAlign || 'center',
    fontSize: titleSizeMap[props.titleSize || 'medium'] || '1.125rem',
    fontWeight: fontWeightMap[props.titleWeight || 'medium'] || '500',
    marginBottom: `${props.titleMarginBottom ?? 16}px`
  }
  
  // Police personnalisée
  if (props.titleFontFamily) {
    styles.fontFamily = props.titleFontFamily
  }
  
  // Transformation du texte
  if (props.titleTransform && props.titleTransform !== 'none') {
    styles.textTransform = props.titleTransform
  }
  
  // Opacité
  if (props.titleOpacity !== undefined && props.titleOpacity !== 100) {
    styles.opacity = (props.titleOpacity / 100).toString()
  }
  
  if (props.titlePosition === 'top') {
    styles.marginBottom = '1.5rem'
  } else {
    styles.marginTop = '1.5rem'
  }
  
  return styles
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})

// Styles de la description
const descriptionStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.descriptionColor || '#6b7280',
    fontSize: '1rem',
    textAlign: props.descriptionAlign || props.titleAlign || 'center',
    marginTop: '1rem',
    maxWidth: maxWidthMap[props.maxWidth || 'large'] || '64rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  
  // Opacité
  if (props.descriptionOpacity !== undefined && props.descriptionOpacity !== 100) {
    styles.opacity = (props.descriptionOpacity / 100).toString()
  }
  
  return styles
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
const buttonSizeMap: Record<string, { padding: string; fontSize: string }> = {
  'sm': { padding: '0.5rem 1rem', fontSize: '0.875rem' },
  'md': { padding: '0.75rem 1.5rem', fontSize: '1rem' },
  'lg': { padding: '1rem 2rem', fontSize: '1.125rem' }
}

const buttonBorderRadiusMap: Record<string, string> = {
  'none': '0',
  'sm': '0.25rem',
  'md': '0.5rem',
  'lg': '0.75rem',
  'full': '9999px'
}

const buttonShadowMap: Record<string, string> = {
  'none': 'none',
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
}

const buttonStyles = computed(() => {
  const variant = props.buttonVariant || 'filled'
  const size = buttonSizeMap[props.buttonSize || 'md']
  const bgColor = props.buttonBgColor || '#10b981'
  const textColor = props.buttonTextColor || '#ffffff'
  
  const baseStyles: Record<string, string> = {
    ...size,
    borderRadius: buttonBorderRadiusMap[props.buttonBorderRadius || 'md'] || '0.5rem',
    boxShadow: buttonShadowMap[props.buttonShadow || 'none'] || 'none',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
  
  // Variantes
  if (variant === 'filled') {
    baseStyles.backgroundColor = bgColor
    baseStyles.color = textColor
    baseStyles.border = 'none'
  } else if (variant === 'outlined') {
    baseStyles.backgroundColor = 'transparent'
    baseStyles.color = bgColor
    baseStyles.border = `2px solid ${bgColor}`
  } else if (variant === 'ghost') {
    baseStyles.backgroundColor = 'transparent'
    baseStyles.color = bgColor
    baseStyles.border = 'none'
  }
  
  return baseStyles
})

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['title', 'video', 'description', 'button']
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

const videoPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.videoOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('video'))
  return styles
})

const descriptionPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.descriptionOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('description'))
  return styles
})

const buttonPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.buttonOffsetY || 0
  if (offset !== 0) styles.transform = `translateY(${offset}px)`
  styles.order = String(getElementOrder('button'))
  return styles
})

// YouTube params
const youtubeParams = computed(() => {
  const params: string[] = []
  if (props.autoplay) params.push('autoplay=1')
  if (props.loop) params.push('loop=1')
  if (props.muted) params.push('mute=1')
  if (!props.showControls) params.push('controls=0')
  return params.length > 0 ? '?' + params.join('&') : ''
})

// Vimeo params
const vimeoParams = computed(() => {
  const params: string[] = []
  if (props.autoplay) params.push('autoplay=1')
  if (props.loop) params.push('loop=1')
  if (props.muted) params.push('muted=1')
  return params.length > 0 ? '?' + params.join('&') : ''
})

// Extraire l'ID YouTube
const youtubeId = computed(() => {
  if (!props.url) return null
  const match = props.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : null
})

// Extraire l'ID Vimeo
const vimeoId = computed(() => {
  if (!props.url) return null
  const match = props.url.match(/(?:vimeo\.com\/)(\d+)/)
  return match ? match[1] : null
})
</script>
