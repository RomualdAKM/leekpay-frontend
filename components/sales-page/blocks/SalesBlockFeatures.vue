<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Header -->
      <div v-if="props.title || props.subtitle" :class="template.styles.header">
        <h2 
          v-if="props.title"
          :class="template.styles.title"
          :style="titleStyles"
        >
          {{ props.title }}
        </h2>
        <p 
          v-if="props.subtitle"
          :class="template.styles.subtitle"
          :style="{ color: textColor }"
        >
          {{ props.subtitle }}
        </p>
      </div>
      
      <!-- Grille de features -->
      <div :class="gridClasses" :style="gridStyles">
        <div 
          v-for="(item, index) in props.items"
          :key="index"
          :class="template.styles.card"
          :style="cardStyles"
        >
          <!-- Icône -->
          <div 
            v-if="props.showIcon"
            :class="template.styles.iconWrapper"
            :style="iconWrapperStyles"
          >
            <!-- Numérotation -->
            <span v-if="props.iconStyle === 'number'" :style="{ color: iconTextColor }">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <!-- Icône SVG -->
            <svg 
              v-else
              :class="template.styles.icon"
              :style="{ color: iconTextColor }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                :stroke-width="props.iconStyle === 'outlined' ? 1.5 : 2" 
                :d="getIconPath(item.icon || 'check')" 
              />
            </svg>
          </div>
          
          <!-- Contenu -->
          <div :class="props.layout === 'list' || props.layout === 'alternating' ? 'flex-1' : ''">
            <!-- Titre -->
            <h3 
              :class="template.styles.cardTitle"
              :style="cardTitleStyles"
            >
              {{ item.title }}
            </h3>
            
            <!-- Description -->
            <p 
              v-if="props.showDescription && item.description"
              :class="template.styles.cardText"
              :style="{ color: textColor }"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

// Types
type IconStyle = 'filled' | 'outlined' | 'none' | 'number'
type Layout = 'grid' | 'list' | 'alternating' | 'masonry' | 'carousel' | 'timeline'

interface FeatureItem {
  icon?: string
  title: string
  description?: string
}

interface Props {
  templateId?: string
  // Contenu
  title?: string
  subtitle?: string
  items?: FeatureItem[]
  // Layout
  layout?: Layout
  columns?: 2 | 3 | 4 | 6
  // Icône
  showIcon?: boolean
  iconStyle?: IconStyle
  iconColor?: string
  iconBgColor?: string
  iconSize?: 'small' | 'medium' | 'large'
  // Texte
  showDescription?: boolean
  titleColor?: string
  // Apparence
  backgroundColor?: string
  accentColor?: string
  // Carte
  cardBgColor?: string
  cardBorderColor?: string
  cardBorderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  cardBorderRadius?: 'none' | 'small' | 'medium' | 'large'
  cardPadding?: 'none' | 'small' | 'medium' | 'large'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'scale'
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'features-minimal-grid',
  title: 'Ce que vous allez obtenir',
  subtitle: '',
  items: () => [
    { icon: 'check', title: 'Fonctionnalité 1', description: 'Description de la fonctionnalité' },
    { icon: 'check', title: 'Fonctionnalité 2', description: 'Description de la fonctionnalité' },
    { icon: 'check', title: 'Fonctionnalité 3', description: 'Description de la fonctionnalité' },
  ],
  layout: 'grid',
  columns: 3,
  showIcon: true,
  iconStyle: 'filled',
  iconColor: '#ffffff',
  iconBgColor: '',
  iconSize: 'medium',
  showDescription: true,
  titleColor: '',
  backgroundColor: '#ffffff',
  accentColor: '#10B981',
  cardBgColor: '',
  cardBorderColor: '',
  cardBorderWidth: 'none',
  cardBorderRadius: 'none',
  cardPadding: 'medium',
  animation: 'none',
})

// Template actif
const template = computed(() => {
  return getTemplate('features', props.templateId) || {
    id: 'features-minimal-grid',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      header: 'text-center mb-12 md:mb-16',
      title: 'text-2xl md:text-3xl font-light tracking-tight',
      subtitle: 'text-base opacity-60 mt-4 max-w-2xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12',
      card: 'text-center',
      iconWrapper: 'w-12 h-12 mx-auto mb-4 flex items-center justify-center',
      icon: 'w-6 h-6',
      cardTitle: 'text-lg font-medium mb-2',
      cardText: 'text-sm opacity-60 leading-relaxed',
    }
  }
})

// Couleur du texte auto
const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Couleur icône auto
const iconBgColorFinal = computed(() => props.iconBgColor || props.accentColor || '#10B981')
const iconTextColor = computed(() => {
  if (props.iconColor) return props.iconColor
  if (props.iconStyle === 'outlined') return iconBgColorFinal.value
  return '#ffffff'
})

// Styles section
const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

// Styles titre
const titleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
}))

// Classes colonnes dynamiques - OVERRIDE le template avec !important classes
const gridClasses = computed(() => {
  const baseClasses = ['gap-6', 'md:gap-8']
  
  switch (props.layout) {
    case 'list':
      return [...baseClasses, 'flex', 'flex-col', 'space-y-6']
    case 'alternating':
      return [...baseClasses, 'flex', 'flex-col', 'space-y-12', 'md:space-y-16']
    case 'masonry':
      return [...baseClasses, 'columns-1', 'md:columns-2', 'lg:columns-3', 'space-y-6']
    case 'carousel':
      return [...baseClasses, 'flex', 'overflow-x-auto', 'snap-x', 'snap-mandatory', 'scrollbar-hide', '-mx-6', 'px-6', 'pb-4']
    case 'timeline':
      return [...baseClasses, 'relative', 'space-y-8']
    case 'grid':
    default:
      // Grille avec colonnes dynamiques
      const colsMap: Record<number, string[]> = {
        2: ['grid', 'grid-cols-1', 'md:grid-cols-2'],
        3: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'],
        4: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4'],
        6: ['grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-6'],
      }
      return [...baseClasses, ...(colsMap[props.columns || 3] || colsMap[3])]
  }
})

// Styles additionnels pour certains layouts
const gridStyles = computed(() => {
  if (props.layout === 'timeline') {
    return {
      paddingLeft: '3rem',
    }
  }
  return {}
})

// Styles icône wrapper
const iconWrapperStyles = computed(() => {
  const sizeMap: Record<string, string> = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
  }
  const size = sizeMap[props.iconSize || 'medium']
  
  const styles: Record<string, string> = {
    width: size,
    height: size,
  }
  
  if (props.iconStyle === 'filled') {
    styles.backgroundColor = iconBgColorFinal.value
  } else if (props.iconStyle === 'outlined') {
    styles.border = `2px solid ${iconBgColorFinal.value}`
  }
  
  return styles
})

// Styles carte
const cardStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.cardBgColor) {
    styles.backgroundColor = props.cardBgColor
  }
  
  if (props.cardBorderWidth !== 'none') {
    const borderWidthMap: Record<string, string> = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    }
    styles.borderWidth = borderWidthMap[props.cardBorderWidth]
    styles.borderStyle = 'solid'
    styles.borderColor = props.cardBorderColor || textColor.value
  }
  
  if (props.cardBorderRadius !== 'none') {
    const radiusMap: Record<string, string> = {
      small: '0.375rem',
      medium: '0.75rem',
      large: '1.5rem',
    }
    styles.borderRadius = radiusMap[props.cardBorderRadius]
  }
  
  if (props.cardPadding !== 'none') {
    const paddingMap: Record<string, string> = {
      small: '1rem',
      medium: '1.5rem',
      large: '2rem',
    }
    styles.padding = paddingMap[props.cardPadding]
  }
  
  return styles
})

// Styles titre carte
const cardTitleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
}))

// Icônes SVG paths
function getIconPath(icon: string): string {
  const icons: Record<string, string> = {
    check: 'M5 13l4 4L19 7',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    lightning: 'M13 10V3L4 14h7v7l9-11h-7z',
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    gift: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    sparkle: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    award: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    rocket: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
    users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  }
  return icons[icon] || icons.check
}
</script>
