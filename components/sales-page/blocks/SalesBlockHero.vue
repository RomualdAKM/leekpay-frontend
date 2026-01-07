<template>
  <!-- LAYOUT: SLIDER -->
  <section 
    v-if="layout === 'slider'"
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <!-- Slides -->
    <div class="relative w-full h-full">
      <div 
        v-for="(slide, index) in props.slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-500"
        :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img 
          v-if="slide.image"
          :src="slide.image"
          :alt="slide.title || ''"
          :class="template.styles.image || 'w-full h-full object-cover'"
          :style="imageStyles"
        />
        <div :class="template.styles.overlay" :style="overlayStyles"></div>
      </div>
      
      <!-- Content -->
      <div :class="template.styles.container" class="min-h-screen">
        <div :class="template.styles.content">
          <span 
            v-if="props.badge && template.config?.showBadge !== false"
            :class="template.styles.badge"
            :style="badgeStyles"
          >{{ props.badge }}</span>
          
          <h1 
            :class="template.styles.title"
            :style="titleStyles"
          >{{ currentSlideData?.title || props.title }}</h1>
          
          <p 
            v-if="currentSlideData?.subtitle || props.subtitle"
            :class="template.styles.subtitle"
          >{{ currentSlideData?.subtitle || props.subtitle }}</p>
          
          <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
            <component
              :is="props.ctaUrl ? 'a' : 'button'"
              v-if="props.ctaText"
              :href="props.ctaUrl || undefined"
              :target="props.ctaUrl ? props.ctaTarget : undefined"
              :class="template.styles.button"
              :style="buttonStyles"
              @click="!props.ctaUrl && $emit('cta-click')"
            >{{ props.ctaText }}</component>
            
            <component
              :is="props.secondaryButtonUrl ? 'a' : 'button'"
              v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
              :href="props.secondaryButtonUrl || undefined"
              :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
              :class="template.styles.buttonSecondary"
              :style="secondaryButtonStyles"
            >{{ props.secondaryButtonText }}</component>
          </div>
        </div>
      </div>
      
      <!-- Navigation Dots -->
      <div v-if="props.slides.length > 1" :class="template.styles.navigation">
        <button
          v-for="(_, index) in props.slides"
          :key="index"
          @click="currentSlide = index"
          :class="[template.styles.navDot, currentSlide === index && template.styles.navDotActive]"
        ></button>
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        v-if="template.styles.navArrow && props.slides.length > 1"
        @click="prevSlide"
        :class="[template.styles.navArrow, template.styles.navArrowLeft]"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button 
        v-if="template.styles.navArrow && props.slides.length > 1"
        @click="nextSlide"
        :class="[template.styles.navArrow, template.styles.navArrowRight]"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </section>

  <!-- LAYOUT: SPLIT (Image + Texte côte à côte) -->
  <section 
    v-else-if="layout === 'split-right' || layout === 'split-left'"
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Content -->
      <div :class="template.styles.content">
        <span 
          v-if="props.badge && template.config?.showBadge !== false"
          :class="template.styles.badge"
          :style="badgeStyles"
        >{{ props.badge }}</span>
        
        <h1 
          :class="template.styles.title"
          :style="titleStyles"
        >{{ props.title }}</h1>
        
        <p 
          v-if="props.subtitle"
          :class="template.styles.subtitle"
          :style="{ color: textColor }"
        >{{ props.subtitle }}</p>
        
        <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
          <component
            :is="props.ctaUrl ? 'a' : 'button'"
            v-if="props.ctaText"
            :href="props.ctaUrl || undefined"
            :target="props.ctaUrl ? props.ctaTarget : undefined"
            :class="template.styles.button"
            :style="buttonStyles"
            @click="!props.ctaUrl && $emit('cta-click')"
          >{{ props.ctaText }}</component>
          
          <component
            :is="props.secondaryButtonUrl ? 'a' : 'button'"
            v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
            :href="props.secondaryButtonUrl || undefined"
            :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
            :class="template.styles.buttonSecondary"
            :style="secondaryButtonStyles"
          >{{ props.secondaryButtonText }}</component>
        </div>
      </div>
      
      <!-- Image -->
      <div 
        v-if="props.mediaUrl"
        :class="template.styles.imageWrapper"
      >
        <img 
          :src="props.mediaUrl"
          :alt="props.title"
          :class="template.styles.image"
          :style="imageStyles"
        />
      </div>
    </div>
  </section>

  <!-- LAYOUT: FULLSCREEN (Image plein écran avec overlay) -->
  <section 
    v-else-if="layout === 'fullscreen'"
    :class="template.styles.section"
  >
    <!-- Background Image -->
    <div :class="template.styles.imageWrapper">
      <img 
        v-if="props.mediaUrl"
        :src="props.mediaUrl"
        :alt="props.title"
        :class="template.styles.image"
        :style="imageStyles"
      />
    </div>
    
    <!-- Overlay -->
    <div :class="template.styles.overlay" :style="overlayStyles"></div>
    
    <!-- Content -->
    <div :class="template.styles.container">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStylesFullscreen"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="template.styles.button"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >{{ props.ctaText }}</component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="template.styles.buttonSecondary"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: VIDEO BACKGROUND -->
  <section 
    v-else-if="layout === 'video'"
    :class="template.styles.section"
  >
    <!-- Background Video -->
    <div :class="template.styles.videoWrapper">
      <video 
        v-if="props.videoUrl"
        :src="props.videoUrl"
        :class="template.styles.video"
        autoplay
        muted
        loop
        playsinline
      />
    </div>
    
    <!-- Overlay -->
    <div :class="template.styles.overlay" :style="overlayStyles"></div>
    
    <!-- Content -->
    <div :class="template.styles.container">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStylesFullscreen"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="template.styles.button"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >{{ props.ctaText }}</component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="template.styles.buttonSecondary"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: STACKED (Image au-dessus du texte) -->
  <section 
    v-else-if="layout === 'stacked'"
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <!-- Image -->
    <div 
      v-if="props.mediaUrl"
      :class="template.styles.imageWrapper"
    >
      <img 
        :src="props.mediaUrl"
        :alt="props.title"
        :class="template.styles.image"
        :style="imageStyles"
      />
    </div>
    
    <!-- Content -->
    <div :class="template.styles.content">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStyles"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
        :style="{ color: textColor }"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="template.styles.button"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >{{ props.ctaText }}</component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="template.styles.buttonSecondary"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: CENTERED (Défaut - Texte centré) -->
  <section 
    v-else
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStyles"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
        :style="{ color: textColor }"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="template.styles.button"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >{{ props.ctaText }}</component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="template.styles.buttonSecondary"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import type { HeroLayout } from '~/composables/blockTemplates/hero'

interface SlideItem {
  image: string
  title?: string
  subtitle?: string
}

interface Props {
  templateId?: string
  title?: string
  subtitle?: string
  badge?: string
  // Media
  mediaUrl?: string | null
  videoUrl?: string | null
  // Background
  backgroundColor?: string
  // Bouton principal
  ctaText?: string
  ctaUrl?: string
  ctaTarget?: '_self' | '_blank'
  ctaColor?: string
  // Bouton secondaire
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  secondaryButtonTarget?: '_self' | '_blank'
  secondaryButtonColor?: string
  // Style des boutons
  buttonRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  buttonShadow?: 'none' | 'small' | 'medium' | 'large'
  secondaryButtonStyle?: 'outline' | 'filled' | 'ghost'
  buttonSize?: 'small' | 'medium' | 'large'
  buttonWidth?: 'auto' | 'full'
  buttonBorderWidth?: 'thin' | 'medium' | 'thick'
  buttonAlignment?: 'left' | 'center' | 'right'
  // Overlay
  overlayOpacity?: number
  overlayColor?: string
  // Typography
  fontFamily?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom'
  titleSizeCustom?: number
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  titleLetterSpacing?: 'tight' | 'normal' | 'wide' | 'wider'
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  // Espacements
  paddingY?: 'small' | 'medium' | 'large' | 'xlarge'
  contentGap?: 'small' | 'medium' | 'large'
  // Badge
  badgeColor?: string
  badgeStyle?: 'pill' | 'rounded' | 'square'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'zoom'
  // Image
  imagePosition?: 'top' | 'center' | 'bottom'
  imageFilter?: 'none' | 'grayscale' | 'blur' | 'sepia'
  // Slider
  slides?: SlideItem[]
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'hero-centered-clean',
  title: 'Titre principal',
  subtitle: 'Sous-titre de votre offre',
  badge: '',
  mediaUrl: null,
  videoUrl: null,
  backgroundColor: '#ffffff',
  ctaText: 'Acheter maintenant',
  ctaUrl: '',
  ctaTarget: '_self',
  ctaColor: '#1f2937',
  secondaryButtonText: '',
  secondaryButtonUrl: '',
  secondaryButtonTarget: '_self',
  secondaryButtonColor: '',
  buttonRadius: 'none',
  buttonShadow: 'none',
  secondaryButtonStyle: 'outline',
  buttonSize: 'medium',
  buttonWidth: 'auto',
  buttonBorderWidth: 'medium',
  buttonAlignment: 'center',
  overlayOpacity: 50,
  overlayColor: '#000000',
  fontFamily: '',
  titleSize: 'medium',
  titleSizeCustom: 48,
  titleWeight: 'bold',
  titleLetterSpacing: 'normal',
  titleTransform: 'none',
  paddingY: 'large',
  contentGap: 'medium',
  badgeColor: '',
  badgeStyle: 'pill',
  animation: 'none',
  imagePosition: 'center',
  imageFilter: 'none',
  slides: () => [],
  autoplay: true,
  autoplayInterval: 5000,
})

defineEmits(['cta-click'])

// Slider state
const currentSlide = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const currentSlideData = computed(() => {
  if (props.slides && props.slides.length > 0) {
    return props.slides[currentSlide.value]
  }
  return null
})

function nextSlide() {
  if (props.slides && props.slides.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
  }
}

function prevSlide() {
  if (props.slides && props.slides.length > 0) {
    currentSlide.value = currentSlide.value === 0 
      ? props.slides.length - 1 
      : currentSlide.value - 1
  }
}

onMounted(() => {
  if (props.autoplay && props.slides && props.slides.length > 1) {
    autoplayTimer = setInterval(nextSlide, props.autoplayInterval)
  }
})

onUnmounted(() => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
})

// Template actif
const template = computed(() => {
  return getTemplate('hero', props.templateId) || {
    id: 'hero-centered-clean',
    name: 'Default',
    category: 'minimal' as const,
    config: { layout: 'centered', showBadge: false, showSecondaryButton: false },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-3xl mx-auto text-center',
      title: 'text-4xl md:text-5xl font-light tracking-tight',
      subtitle: 'text-lg mt-6 opacity-70',
      buttonGroup: 'mt-10 flex justify-center gap-4',
      button: 'px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-medium uppercase tracking-widest border-2 transition-colors duration-200',
    }
  }
})

// Layout déterminé par le template
const layout = computed<HeroLayout>(() => {
  return (template.value.config?.layout as HeroLayout) || 'centered'
})

const sectionStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (layout.value !== 'fullscreen' && layout.value !== 'video') {
    styles.backgroundColor = props.backgroundColor
  }
  
  return styles
})

const overlayStyles = computed(() => {
  return {
    backgroundColor: props.overlayColor || '#000000',
    opacity: (props.overlayOpacity || 50) / 100
  }
})

const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Mappings pour les nouvelles props
const titleSizeMap: Record<string, string> = {
  'small': '1.5rem',
  'medium': '2.5rem',
  'large': '3.5rem',
  'xlarge': '4.5rem',
  'custom': 'custom'
}

const titleWeightMap: Record<string, string> = {
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'black': '900'
}

const letterSpacingMap: Record<string, string> = {
  'tight': '-0.025em',
  'normal': '0',
  'wide': '0.025em',
  'wider': '0.05em'
}

const paddingYMap: Record<string, string> = {
  'small': '3rem',
  'medium': '5rem',
  'large': '8rem',
  'xlarge': '12rem'
}

const contentGapMap: Record<string, string> = {
  'small': '1rem',
  'medium': '1.5rem',
  'large': '2.5rem'
}

const buttonSizeMap: Record<string, { px: string, py: string, fontSize: string }> = {
  'small': { px: '1rem', py: '0.5rem', fontSize: '0.75rem' },
  'medium': { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' },
  'large': { px: '2rem', py: '1.125rem', fontSize: '1rem' }
}

const borderWidthMap: Record<string, string> = {
  'thin': '1px',
  'medium': '2px',
  'thick': '3px'
}

const badgeStyleMap: Record<string, string> = {
  'pill': '9999px',
  'rounded': '6px',
  'square': '0'
}

const imagePositionMap: Record<string, string> = {
  'top': 'top',
  'center': 'center',
  'bottom': 'bottom'
}

const imageFilterMap: Record<string, string> = {
  'none': 'none',
  'grayscale': 'grayscale(100%)',
  'blur': 'blur(2px)',
  'sepia': 'sepia(100%)'
}

const titleStyles = computed(() => {
  const styles: Record<string, string> = {
    color: textColor.value
  }
  
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Taille du titre
  if (props.titleSize === 'custom' && props.titleSizeCustom) {
    styles.fontSize = `${props.titleSizeCustom}px`
  } else {
    styles.fontSize = titleSizeMap[props.titleSize || 'medium'] || '2.5rem'
  }
  
  // Poids
  styles.fontWeight = titleWeightMap[props.titleWeight || 'bold'] || '700'
  
  // Espacement des lettres
  styles.letterSpacing = letterSpacingMap[props.titleLetterSpacing || 'normal'] || '0'
  
  // Transformation
  if (props.titleTransform && props.titleTransform !== 'none') {
    styles.textTransform = props.titleTransform
  }
  
  return styles
})

const titleStylesFullscreen = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Taille du titre
  if (props.titleSize === 'custom' && props.titleSizeCustom) {
    styles.fontSize = `${props.titleSizeCustom}px`
  } else {
    styles.fontSize = titleSizeMap[props.titleSize || 'medium'] || '2.5rem'
  }
  
  // Poids
  styles.fontWeight = titleWeightMap[props.titleWeight || 'bold'] || '700'
  
  // Espacement des lettres
  styles.letterSpacing = letterSpacingMap[props.titleLetterSpacing || 'normal'] || '0'
  
  // Transformation
  if (props.titleTransform && props.titleTransform !== 'none') {
    styles.textTransform = props.titleTransform
  }
  
  return styles
})

const sectionDynamicStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Padding vertical
  const py = paddingYMap[props.paddingY || 'large'] || '8rem'
  styles.paddingTop = py
  styles.paddingBottom = py
  
  return styles
})

const containerDynamicStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Gap entre éléments
  styles.gap = contentGapMap[props.contentGap || 'medium'] || '1.5rem'
  
  return styles
})

// Classe dynamique pour l'alignement (override les classes Tailwind)
const buttonAlignmentClass = computed(() => {
  const alignMap: Record<string, string> = {
    'left': '!justify-start',
    'center': '!justify-center',
    'right': '!justify-end'
  }
  return alignMap[props.buttonAlignment || 'center'] || '!justify-center'
})

const buttonGroupStyles = computed(() => {
  return {}
})

const imageStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Position de l'image
  styles.objectPosition = imagePositionMap[props.imagePosition || 'center'] || 'center'
  
  // Filtre
  const filter = imageFilterMap[props.imageFilter || 'none'] || 'none'
  if (filter !== 'none') {
    styles.filter = filter
  }
  
  return styles
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})

// Mapping des valeurs de border-radius
const radiusMap: Record<string, string> = {
  'none': '0',
  'small': '4px',
  'medium': '8px',
  'large': '16px',
  'full': '9999px'
}

// Mapping des valeurs de box-shadow
const shadowMap: Record<string, string> = {
  'none': 'none',
  'small': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  'medium': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08)',
  'large': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)'
}

const buttonStyles = computed(() => {
  const ctaColor = props.ctaColor || '#1f2937'
  const hex = ctaColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const defaultBtnSize = { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' }
  const btnSize = buttonSizeMap[props.buttonSize || 'medium'] ?? defaultBtnSize
  
  return {
    backgroundColor: ctaColor,
    color: luminance > 0.5 ? '#1f2937' : '#ffffff',
    borderRadius: radiusMap[props.buttonRadius || 'none'] || '0',
    boxShadow: shadowMap[props.buttonShadow || 'none'] || 'none',
    paddingLeft: btnSize.px,
    paddingRight: btnSize.px,
    paddingTop: btnSize.py,
    paddingBottom: btnSize.py,
    fontSize: btnSize.fontSize,
    width: props.buttonWidth === 'full' ? '100%' : 'auto',
  }
})

const secondaryButtonStyles = computed(() => {
  const style = props.secondaryButtonStyle || 'outline'
  const color = props.secondaryButtonColor || props.ctaColor || textColor.value
  const defaultBtnSize = { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' }
  const btnSize = buttonSizeMap[props.buttonSize || 'medium'] ?? defaultBtnSize
  const bw = borderWidthMap[props.buttonBorderWidth || 'medium'] || '2px'
  
  const baseStyles: Record<string, string> = {
    borderRadius: radiusMap[props.buttonRadius || 'none'] || '0',
    boxShadow: shadowMap[props.buttonShadow || 'none'] || 'none',
    paddingLeft: btnSize.px,
    paddingRight: btnSize.px,
    paddingTop: btnSize.py,
    paddingBottom: btnSize.py,
    fontSize: btnSize.fontSize,
    borderWidth: bw,
    width: props.buttonWidth === 'full' ? '100%' : 'auto',
  }
  
  if (style === 'filled') {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return {
      ...baseStyles,
      backgroundColor: color,
      borderColor: color,
      color: luminance > 0.5 ? '#1f2937' : '#ffffff',
    }
  } else if (style === 'ghost') {
    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: color,
    }
  } else {
    // outline (default)
    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: color,
      color: color,
    }
  }
})

const badgeStyles = computed(() => {
  const badgeColor = props.badgeColor || props.ctaColor || '#1f2937'
  const badgeRadius = badgeStyleMap[props.badgeStyle || 'pill'] || '9999px'
  
  return {
    backgroundColor: `${badgeColor}15`,
    color: badgeColor,
    borderRadius: badgeRadius,
  }
})
</script>
