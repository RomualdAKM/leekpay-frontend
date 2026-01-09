<template>
  <section 
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Header -->
      <div v-if="props.title || props.subtitle" :class="template.styles.header" :style="headerStyles">
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
      
      <!-- Grille -->
      <div :class="gridClasses">
        <div 
          v-for="(item, index) in props.items"
          :key="index"
          :class="[template.styles.card, cardHoverClass]"
          :style="cardStyles"
        >
          <!-- Icône citation -->
          <svg 
            v-if="props.showQuoteIcon"
            :class="template.styles.quoteIcon"
            :style="{ color: props.accentColor }"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <!-- Texte du témoignage -->
          <blockquote 
            :class="template.styles.quote"
            :style="quoteStyles"
          >
            "{{ item.text }}"
          </blockquote>
          
          <!-- Étoiles -->
          <div v-if="props.showRating && item.rating" :class="template.styles.rating">
            <svg 
              v-for="star in 5" 
              :key="star"
              :class="template.styles.star"
              :style="{ color: star <= item.rating ? props.accentColor : textColor, opacity: star <= item.rating ? 1 : 0.2 }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          
          <!-- Auteur -->
          <div :class="template.styles.authorWrapper">
            <!-- Avatar -->
            <img 
              v-if="props.showAvatar && item.avatar"
              :src="item.avatar"
              :alt="item.name"
              :class="template.styles.avatar"
              :style="avatarStyles"
            />
            <div 
              v-else-if="props.showAvatar"
              :class="template.styles.avatar"
              :style="{ ...avatarStyles, backgroundColor: props.accentColor }"
              class="flex items-center justify-center text-white font-medium"
            >
              {{ getInitials(item.name) }}
            </div>
            
            <!-- Nom et rôle -->
            <div :class="template.styles.authorInfo">
              <p :class="template.styles.author" :style="{ color: textColor }">
                {{ item.name }}
              </p>
              <p 
                v-if="props.showRole && item.role" 
                :class="template.styles.role" 
                :style="{ color: textColor }"
              >
                {{ item.role }}
              </p>
              <p 
                v-if="props.showCompany && item.company" 
                :class="template.styles.company" 
                :style="{ color: textColor }"
              >
                {{ item.company }}
              </p>
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

// Types
type Layout = 'grid' | 'carousel' | 'single' | 'masonry' | 'list'
type AvatarShape = 'circle' | 'square' | 'rounded'

interface TestimonialItem {
  name: string
  role?: string
  company?: string
  text: string
  avatar?: string | null
  rating?: number
}

interface Props {
  templateId?: string
  // Contenu
  title?: string
  subtitle?: string
  items?: TestimonialItem[]
  headerAlignment?: 'left' | 'center' | 'right'
  // Layout
  layout?: Layout
  columns?: 1 | 2 | 3
  // Affichage
  showQuoteIcon?: boolean
  showRating?: boolean
  showAvatar?: boolean
  showRole?: boolean
  showCompany?: boolean
  // Avatar
  avatarShape?: AvatarShape
  avatarSize?: 'small' | 'medium' | 'large'
  // Texte
  quoteStyle?: 'normal' | 'italic'
  quoteFontSize?: 'small' | 'medium' | 'large'
  // Apparence
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  backgroundColor?: string
  gradientStart?: string
  gradientEnd?: string
  accentColor?: string
  titleColor?: string
  paddingY?: 'small' | 'medium' | 'large' | 'xlarge'
  // Carte
  cardBgColor?: string
  cardBorderColor?: string
  cardBorderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  cardBorderRadius?: 'none' | 'small' | 'medium' | 'large'
  cardPadding?: 'none' | 'small' | 'medium' | 'large'
  cardShadow?: 'none' | 'small' | 'medium' | 'large'
  cardHoverEffect?: 'none' | 'lift' | 'scale' | 'glow'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'scale'
  // Avancé
  cssId?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'testimonials-minimal-centered',
  title: "Ce qu'ils en disent",
  subtitle: '',
  items: () => [
    { name: 'Client 1', role: 'Entrepreneur', text: 'Un service exceptionnel qui a transformé mon business.', avatar: null, rating: 5 },
  ],
  headerAlignment: 'center',
  layout: 'grid',
  columns: 3,
  showQuoteIcon: false,
  showRating: true,
  showAvatar: true,
  showRole: true,
  showCompany: false,
  avatarShape: 'circle',
  avatarSize: 'medium',
  quoteStyle: 'normal',
  quoteFontSize: 'medium',
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  gradientStart: '#f8fafc',
  gradientEnd: '#ffffff',
  accentColor: '#10B981',
  titleColor: '',
  paddingY: 'large',
  cardBgColor: '',
  cardBorderColor: '',
  cardBorderWidth: 'none',
  cardBorderRadius: 'none',
  cardPadding: 'medium',
  cardShadow: 'none',
  cardHoverEffect: 'none',
  animation: 'none',
  cssId: '',
  customClasses: '',
})

// Template actif
const template = computed(() => {
  return getTemplate('testimonials', props.templateId) || {
    id: 'testimonials-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-4xl mx-auto',
      header: 'text-center mb-12 md:mb-16',
      title: 'text-2xl md:text-3xl font-light tracking-tight',
      subtitle: 'text-base opacity-60 mt-4',
      grid: 'space-y-10',
      card: 'text-center',
      quoteIcon: 'w-8 h-8 mx-auto mb-4 opacity-20',
      quote: 'text-lg md:text-xl font-light leading-relaxed italic opacity-80',
      rating: 'flex justify-center gap-1 mt-4',
      star: 'w-4 h-4',
      authorWrapper: 'flex items-center justify-center mt-6 gap-3',
      avatar: 'w-12 h-12 rounded-full',
      authorInfo: 'text-left',
      author: 'text-sm font-medium',
      role: 'text-xs opacity-50',
      company: 'text-xs opacity-40',
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

// Styles section
const paddingYMap: Record<string, string> = {
  small: '2rem',
  medium: '4rem',
  large: '6rem',
  xlarge: '8rem',
}

const sectionStyles = computed(() => {
  const py = paddingYMap[props.paddingY || 'large'] || '6rem'
  const styles: Record<string, string> = {
    paddingTop: py,
    paddingBottom: py,
  }
  
  if (props.backgroundType === 'gradient') {
    styles.background = `linear-gradient(to bottom, ${props.gradientStart}, ${props.gradientEnd})`
  } else if (props.backgroundType !== 'transparent') {
    styles.backgroundColor = props.backgroundColor || '#ffffff'
  }
  
  return styles
})

// Styles header
const headerStyles = computed(() => ({
  textAlign: (props.headerAlignment || 'center') as 'left' | 'center' | 'right',
}))

// Classes grille
const gridClasses = computed(() => {
  const colsMap: Record<number, string[]> = {
    1: ['space-y-8'],
    2: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-8'],
    3: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8'],
  }
  return colsMap[props.columns || 3] || colsMap[3]
})

// Classe hover carte
const cardHoverClass = computed(() => {
  const effectMap: Record<string, string> = {
    none: '',
    lift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
    scale: 'transition-transform duration-300 hover:scale-105',
    glow: 'transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/20',
  }
  return effectMap[props.cardHoverEffect || 'none'] || ''
})

// Animation
const animationClass = computed(() => {
  if (props.animation === 'none') return ''
  return `animate-${props.animation}`
})

// Styles titre
const titleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
}))

// Styles citation
const quoteStyles = computed(() => {
  const styles: Record<string, string> = {
    color: textColor.value,
  }
  
  if (props.quoteStyle === 'italic') {
    styles.fontStyle = 'italic'
  }
  
  const fontSizeMap: Record<string, string> = {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  }
  styles.fontSize = fontSizeMap[props.quoteFontSize || 'medium']
  
  return styles
})

// Styles avatar
const avatarStyles = computed(() => {
  const sizeMap: Record<string, string> = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
  }
  const size = sizeMap[props.avatarSize || 'medium']
  
  const radiusMap: Record<string, string> = {
    circle: '9999px',
    square: '0',
    rounded: '0.5rem',
  }
  const radius = radiusMap[props.avatarShape || 'circle']
  
  return {
    width: size,
    height: size,
    borderRadius: radius,
  }
})

// Styles carte
const cardStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.cardBgColor) {
    styles.backgroundColor = props.cardBgColor
  }
  
  if (props.cardBorderWidth && props.cardBorderWidth !== 'none') {
    const borderWidthMap: Record<string, string> = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    }
    styles.borderWidth = borderWidthMap[props.cardBorderWidth] || '1px'
    styles.borderStyle = 'solid'
    styles.borderColor = props.cardBorderColor || textColor.value
  }
  
  if (props.cardBorderRadius && props.cardBorderRadius !== 'none') {
    const radiusMap: Record<string, string> = {
      small: '0.375rem',
      medium: '0.75rem',
      large: '1.5rem',
    }
    styles.borderRadius = radiusMap[props.cardBorderRadius] || '0.375rem'
  }
  
  if (props.cardPadding && props.cardPadding !== 'none') {
    const paddingMap: Record<string, string> = {
      small: '1rem',
      medium: '1.5rem',
      large: '2rem',
    }
    styles.padding = paddingMap[props.cardPadding] || '1.5rem'
  }
  
  return styles
})

// Helper initiales
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
