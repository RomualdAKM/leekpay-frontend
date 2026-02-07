<template>
  <section 
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ 
        gap: '1.5rem',
        alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start'),
        textAlign: props.headerAlignment || 'center'
      }">
        <!-- Badge -->
        <div v-if="props.showBadge" class="flex" :style="badgePositionStyles">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge || 'Informations' }}
          </span>
        </div>

        <!-- Titre -->
        <h2 
          v-if="props.title || isEditMode"
          :class="[template.styles.title, sectionTitleSizeClass, editableClasses('title')]"
          :style="{ ...sectionTitleStyles, ...titlePositionStyles }"
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
          :class="[template.styles.subtitle || 'text-base opacity-70 max-w-2xl mx-auto', itemTextSizeClass, editableClasses('subtitle')]"
          :style="{ color: textColor, ...subtitlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Sous-titre (optionnel)'"
          @focus="onFocus('subtitle')"
          @blur="onBlur($event, 'subtitle')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.subtitle }}</p>

        <!-- Grille de Boxes -->
        <div 
          :class="[template.styles.grid, itemGapClass, 'w-full grid']" 
          :style="[itemsPositionStyles, gridColumnsStyle]"
        >
          <div 
            v-for="(item, index) in props.items"
            :key="index"
            :class="[template.styles.card, cardClasses]"
            :style="cardStyles"
          >
            <!-- Badge / Icon Container -->
            <div 
              v-if="props.showIcon"
              class="flex flex-col items-center"
            >
              <div 
                :class="[template.styles.badge, iconBadgeClasses]"
                :style="iconBadgeStyles"
              >
                <svg 
                  :class="[template.styles.icon, iconSizeClass]"
                  :style="iconSvgStyles"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    :stroke-width="iconStrokeWidth"
                    :d="getIconPath(item.icon || 'check')" 
                  />
                </svg>
              </div>

              <!-- Item-specific Image (for Bento/Avatar types if needed) -->
              <div 
                v-if="item.image && props.templateId === 'boxes-bento-refined'"
                class="w-full aspect-video rounded-2xl overflow-hidden mb-6"
              >
                <img :src="item.image" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex flex-col flex-1">
              <!-- Item-specific Badge (Sophisticated Dark style uses this) -->
              <span 
                v-if="item.badge && props.templateId === 'boxes-sophisticated-dark'"
                :class="template.styles.badge"
              >{{ item.badge }}</span>
              
              <span 
                v-else-if="item.badge"
                class="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-50"
                :style="{ color: props.accentColor }"
              >{{ item.badge }}</span>

              <!-- Title -->
              <h3 
                :class="[template.styles.itemTitle, itemTitleSizeClass, itemTitleWeightClass, editableClasses(`items[${index}].title`)]"
                :style="{ color: props.titleColor || textColor }"
                :contenteditable="isEditMode"
                @focus="onArrayFocus('items', index, 'title')"
                @blur="onArrayBlur($event, 'items', index, 'title')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
              >{{ item.title }}</h3>
              
              <!-- Description -->
              <p 
                v-if="(item.description || isEditMode) && props.showDescription"
                :class="[template.styles.itemText, itemTextSizeClass, editableClasses(`items[${index}].description`)]"
                :style="{ color: textColor }"
                :contenteditable="isEditMode"
                @focus="onArrayFocus('items', index, 'description')"
                @blur="onArrayBlur($event, 'items', index, 'description')"
                @keydown="onKeydown($event, false)"
                @paste="onPaste"
              >{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Bouton CTA global -->
        <div v-if="props.showButton || isEditMode" :style="buttonPositionStyles">
          <a
            :href="isEditMode ? undefined : props.buttonUrl"
            class="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            :class="[editableClasses('buttonText')]"
            :style="{ 
              backgroundColor: props.accentColor || '#10B981', 
              color: '#ffffff',
              opacity: props.showButton ? 1 : 0.5 
            }"
            :contenteditable="isEditMode"
            :data-placeholder="'Texte du bouton'"
            @focus="onFocus('buttonText')"
            @blur="onBlur($event, 'buttonText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >
            {{ props.buttonText || 'Démarrer maintenant' }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface BoxItem {
  id: string
  badge?: string
  title: string
  description?: string
  icon?: string
  image?: string
}

interface Props {
  blockId?: string
  templateId?: string
  title?: string
  subtitle?: string
  items?: BoxItem[]
  headerAlignment?: 'left' | 'center' | 'right'
  // Apparence
  backgroundColor?: string
  accentColor?: string
  titleColor?: string
  paddingY?: 'small' | 'medium' | 'large' | 'xlarge'
  cardBgColor?: string
  iconBgColor?: string
  iconColor?: string
  iconRadius?: 'none' | 'small' | 'medium' | 'full'
  iconSize?: 'small' | 'medium' | 'large'
  cardBorderRadius?: 'none' | 'small' | 'medium' | 'large' | 'xlarge' | 'full'
  cardShadow?: 'none' | 'small' | 'medium' | 'large'
  cardBorderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  cardBorderColor?: string
  cardHoverEffect?: 'none' | 'lift' | 'scale' | 'glow' | 'shadow'
  cardPadding?: 'none' | 'small' | 'medium' | 'large'
  sectionTitleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  itemTitleSize?: 'small' | 'medium' | 'large'
  itemTitleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  itemTextSize?: 'xs' | 'sm' | 'base'
  columns?: number
  itemGap?: 'small' | 'medium' | 'large' | 'xlarge'
  showIcon?: boolean
  showDescription?: boolean
  // CTA
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  // Positionnement
  elementsOrder?: string[]
  badge?: string
  showBadge?: boolean
  badgeOffsetY?: number
  titleOffsetY?: number
  subtitleOffsetY?: number
  itemsOffsetY?: number
  buttonOffsetY?: number
  cssId?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'boxes-professional-badge',
  title: 'Ce que nous proposons',
  subtitle: '',
  items: () => [],
  headerAlignment: 'center',
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
  paddingY: 'large',
  cardBorderRadius: 'large',
  showButton: false,
  buttonText: 'Démarrer maintenant',
  buttonUrl: '',
  elementsOrder: () => ['badge', 'title', 'subtitle', 'items', 'button'],
  badge: 'Informations',
  showBadge: false,
  badgeOffsetY: 0,
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  itemsOffsetY: 0,
  buttonOffsetY: 0,
})

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, emitArrayPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

// Template actif
const template = computed(() => {
  return getTemplate('boxes', props.templateId) || {
    id: 'boxes-professional-badge',
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-6xl mx-auto',
      title: 'text-3xl font-bold text-center mb-12',
      subtitle: 'text-base opacity-70 max-w-2xl mx-auto text-center',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-8',
      card: 'p-6 bg-white border border-gray-100 rounded-xl',
      badge: 'w-10 h-10 rounded-full flex items-center justify-center mb-4',
      itemTitle: 'text-lg font-bold mb-2',
      itemText: 'text-sm opacity-70',
      icon: 'w-6 h-6',
    }
  }
})

// Couleur du texte auto
const textColor = computed(() => {
  // Si une couleur de fond personnalisée est définie
  if (props.backgroundColor && props.backgroundColor !== 'transparent') {
    const hex = props.backgroundColor.replace('#', '')
    if (hex.length === 6) {
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      return luminance > 0.5 ? '#1f2937' : '#ffffff'
    }
  }

  // Sinon, on se base sur le template par défaut
  const darkTemplates = ['boxes-sophisticated-dark', 'boxes-cyber-mono', 'boxes-glass-luminous']
  if (darkTemplates.includes(props.templateId || '')) {
    return '#ffffff'
  }
  
  return '#1f2937'
})

// Styles dynamiques
const paddingYMap: Record<string, string> = {
  small: '2rem',
  medium: '4rem',
  large: '6rem',
  xlarge: '8rem',
}

const sectionStyles = computed(() => {
  const styles: Record<string, string> = {
    paddingTop: paddingYMap[props.paddingY || 'large'] || '6rem',
    paddingBottom: paddingYMap[props.paddingY || 'large'] || '6rem',
    color: textColor.value
  }
  
  if (props.backgroundColor && props.backgroundColor !== 'transparent') {
    styles.backgroundColor = props.backgroundColor
    // Important: Force foreground over background-image (template gradients)
    styles.backgroundImage = 'none'
  }
  
  return styles
})

const sectionTitleStyles = computed(() => ({
  color: props.titleColor || textColor.value
}))

const cardStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (props.cardBgColor) styles.backgroundColor = props.cardBgColor
  if (props.cardBorderColor && props.cardBorderWidth !== 'none') styles.borderColor = props.cardBorderColor
  return styles
})

const cardClasses = computed(() => {
  const classes = []
  
  // Radius
  const radiusMap = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-2xl',
    xlarge: 'rounded-3xl',
    full: 'rounded-[2rem]'
  }
  if (props.cardBorderRadius) classes.push(radiusMap[props.cardBorderRadius])

  // Shadow
  const shadowMap = {
    none: 'shadow-none',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-xl'
  }
  if (props.cardShadow) classes.push(shadowMap[props.cardShadow])

  // Border Width
  const borderMap = {
    none: 'border-0',
    thin: 'border',
    medium: 'border-2',
    thick: 'border-4'
  }
  if (props.cardBorderWidth) classes.push(borderMap[props.cardBorderWidth])

  // Padding
  const paddingMap = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6 md:p-8',
    large: 'p-10 md:p-12'
  }
  if (props.cardPadding) classes.push(paddingMap[props.cardPadding])

  // Hover effect
  const hoverMap = {
    none: '',
    lift: 'hover:-translate-y-1 transition-transform duration-300',
    scale: 'hover:scale-[1.02] transition-transform duration-300',
    glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-shadow duration-300',
    shadow: 'hover:shadow-2xl transition-shadow duration-300'
  }
  if (props.cardHoverEffect) classes.push(hoverMap[props.cardHoverEffect])

  return classes.join(' ')
})

// Icon styling
const iconBadgeStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Backwards compatibility/Template defaults logic
  const isSpecialTemplate = ['boxes-essential-minimal', 'boxes-sophisticated-dark'].includes(props.templateId || '')
  
  if (props.iconBgColor) {
    styles.backgroundColor = props.iconBgColor
  } else if (!isSpecialTemplate) {
    styles.backgroundColor = props.accentColor || '#10b981'
  }
  
  return styles
})

const iconBadgeClasses = computed(() => {
  const classes = ['flex items-center justify-center']
  
  // Radius
  const radiusMap = {
    none: 'rounded-none',
    small: 'rounded-lg',
    medium: 'rounded-xl',
    full: 'rounded-full'
  }
  if (props.iconRadius) classes.push(radiusMap[props.iconRadius])

  // Size
  const sizeMap = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }
  if (props.iconSize) classes.push(sizeMap[props.iconSize])

  return classes.join(' ')
})

const iconSvgStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (props.iconColor) styles.color = props.iconColor
  return styles
})

const iconSizeClass = computed(() => {
  const map = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }
  return map[props.iconSize || 'medium']
})

const iconStrokeWidth = computed(() => {
  return props.iconSize === 'large' ? '1.5' : '2'
})

// Typography Mappings
const sectionTitleSizeClass = computed(() => {
  const map = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl',
    xlarge: 'text-5xl md:text-6xl'
  }
  return props.sectionTitleSize ? map[props.sectionTitleSize] : ''
})

const itemTitleSizeClass = computed(() => {
  const map = {
    small: 'text-base',
    medium: 'text-lg md:text-xl',
    large: 'text-xl md:text-2xl'
  }
  return props.itemTitleSize ? map[props.itemTitleSize] : ''
})

const itemTitleWeightClass = computed(() => {
  const map = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
  return props.itemTitleWeight ? map[props.itemTitleWeight] : ''
})

const itemTextSizeClass = computed(() => {
  const map = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base'
  }
  return props.itemTextSize ? map[props.itemTextSize] : ''
})

// Grille et colonnes
const gridColumnsStyle = computed(() => {
  const cols = props.columns || 3
  return {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
  }
})

const itemGapClass = computed(() => {
  // If the template specifically defines gap-0, respect it unless explicitly overridden
  if (template.value.styles.grid?.includes('gap-0') && !props.itemGap) {
    return ''
  }
  
  const gap = props.itemGap || 'medium'
  const map: Record<string, string> = {
    small: 'gap-4',
    medium: 'gap-8',
    large: 'gap-12',
    xlarge: 'gap-16'
  }
  return map[gap]
})

// Positionnement
const getElementOrder = (element: string): number => {
  const order = props.elementsOrder || ['badge', 'title', 'subtitle', 'items', 'button']
  return order.indexOf(element)
}

const badgePositionStyles = computed(() => ({ order: getElementOrder('badge'), marginTop: `${props.badgeOffsetY}px` }))
const titlePositionStyles = computed(() => ({ order: getElementOrder('title'), marginTop: `${props.titleOffsetY}px` }))
const subtitlePositionStyles = computed(() => ({ order: getElementOrder('subtitle'), marginTop: `${props.subtitleOffsetY}px` }))
const itemsPositionStyles = computed(() => ({ order: getElementOrder('items'), marginTop: `${props.itemsOffsetY}px` }))
const buttonPositionStyles = computed(() => ({ order: getElementOrder('button'), marginTop: `${props.buttonOffsetY}px` }))

// Handlers d'édition
const isFieldActive = (field: string) => activeEditField.value === field
const editableClasses = (field: string) => {
  if (!isEditMode.value) return ''
  return [
    'outline-none cursor-text transition-all duration-150 rounded-sm',
    isFieldActive(field) ? 'ring-2 ring-emerald-400 ring-offset-2' : 'hover:ring-1 hover:ring-emerald-300'
  ].join(' ')
}

const onFocus = (field: string) => props.blockId && startEditing(props.blockId, field)
const onBlur = (e: FocusEvent, field: string) => {
  const newValue = (e.target as HTMLElement).innerText || ''
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

const onArrayFocus = (arrayKey: string, index: number, propKey: string) => {
  if (props.blockId) startEditing(props.blockId, `${arrayKey}[${index}].${propKey}`)
}

const onArrayBlur = (e: FocusEvent, arrayKey: string, index: number, propKey: string) => {
  const newValue = (e.target as HTMLElement).innerText || ''
  if (props.blockId) {
    emitArrayPropUpdate(props.blockId, arrayKey, index, propKey, newValue)
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

// Icon Path Helper (Simplified)
const getIconPath = (icon: string) => {
  const paths: Record<string, string> = {
    rocket: 'M9.75 17L9 20L12 21L15 20L14.25 17M3 13c3.608 0 8.21 4 8.21 4s4.602-4 8.21-4M12 3c0 0 7 2 7 8c0 4.22-3.086 7.748-7 7.95M12 3c0 0-7 2-7 8c0 4.22 3.086 7.748 7 7.95',
    check: 'M5 13l4 4L19 7',
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    sparkles: 'M5 3L4 6L1 7L4 8L5 11L6 8L9 7L6 6L5 3ZM19 13L18 16L15 17L18 18L19 21L20 18L23 17L20 16L19 13Z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'edit-3': 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z'
  }
  return paths[icon] || paths.check
}
</script>
