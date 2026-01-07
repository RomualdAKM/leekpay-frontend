<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <!-- Header avec container du template -->
    <div v-if="props.title || props.subtitle" :class="[template.styles.container, template.styles.header]">
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
    
    <!-- Grille de cartes - hors container pour être responsive -->
    <div :class="gridClasses">
        <!-- Carte de prix -->
        <div 
          v-for="(plan, planIndex) in plans" 
          :key="planIndex"
          :class="[template.styles.card, plan.highlighted ? 'ring-2 ring-offset-2 scale-105 z-10' : '']" 
          :style="getCardStyles(plan)"
        >
          <!-- Badge -->
          <span 
            v-if="plan.showBadge && plan.badgeText"
            :class="template.styles.badge"
            :style="getBadgeStyles(plan)"
          >
            {{ plan.badgeText }}
          </span>
          
          <!-- Nom du plan -->
          <h3 v-if="plan.name" class="text-lg font-semibold mb-2" :style="{ color: getTextColor(plan) }">
            {{ plan.name }}
          </h3>
          
          <!-- Prix -->
          <div :class="template.styles.priceWrapper">
            <!-- Prix barré -->
            <p 
              v-if="plan.showOriginalPrice && plan.originalPrice"
              :class="template.styles.originalPrice"
              :style="{ color: getTextColor(plan) }"
            >
              {{ formatPrice(plan.originalPrice) }} {{ plan.currency || props.currency }}
            </p>
            
            <!-- Prix actuel -->
            <div :class="template.styles.priceRow">
              <span :class="template.styles.currency" :style="{ color: plan.priceColor || getTextColor(plan) }">
                {{ plan.currency || props.currency }}
              </span>
              <span :class="template.styles.price" :style="getPriceStyles(plan)">
                {{ formatPrice(plan.price) }}
              </span>
            </div>
            
            <p v-if="plan.showPeriod && plan.period" :class="template.styles.period" :style="{ color: getTextColor(plan) }">
              {{ plan.period }}
            </p>
          </div>
          
          <!-- Liste des features -->
          <ul v-if="plan.showFeatures && plan.features?.length" :class="template.styles.features">
            <li 
              v-for="(feature, index) in plan.features"
              :key="index"
              :class="template.styles.featureItem"
              :style="{ color: getTextColor(plan) }"
            >
              <svg 
                :class="template.styles.featureIcon"
                :style="{ color: plan.accentColor || props.accentColor }" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span :class="template.styles.featureText">{{ feature }}</span>
            </li>
          </ul>
          
          <!-- Garantie -->
          <p 
            v-if="plan.showGuarantee && plan.guaranteeText"
            :class="template.styles.guarantee"
            :style="{ color: getTextColor(plan) }"
          >
            {{ plan.guaranteeText }}
          </p>
          
          <!-- Bouton CTA -->
          <a
            v-if="plan.ctaUrl"
            :href="plan.ctaUrl"
            :target="plan.ctaTarget || '_self'"
            :class="template.styles.button"
            :style="getButtonStyles(plan)"
          >
            {{ plan.ctaText || 'Commander' }}
          </a>
          <button
            v-else
            :class="template.styles.button"
            :style="getButtonStyles(plan)"
            @click="$emit('cta-click', planIndex)"
          >
            {{ plan.ctaText || 'Commander' }}
          </button>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

// Types
type ButtonStyle = 'filled' | 'outlined'
type PriceSize = 'small' | 'medium' | 'large' | 'xlarge'

interface PricingPlan {
  name?: string
  price?: string | number
  originalPrice?: string | number | null
  currency?: string
  period?: string
  features?: string[]
  showBadge?: boolean
  badgeText?: string
  badgeColor?: string
  badgeBgColor?: string
  showOriginalPrice?: boolean
  showPeriod?: boolean
  showFeatures?: boolean
  showGuarantee?: boolean
  guaranteeText?: string
  priceColor?: string
  ctaText?: string
  ctaUrl?: string
  ctaTarget?: '_self' | '_blank'
  buttonStyle?: ButtonStyle
  buttonColor?: string
  buttonBgColor?: string
  cardBgColor?: string
  accentColor?: string
  highlighted?: boolean
}

interface Props {
  templateId?: string
  // Contenu
  title?: string
  subtitle?: string
  // Plans multiples
  items?: PricingPlan[]
  // Props legacy (pour rétrocompatibilité)
  price?: string | number
  originalPrice?: string | number | null
  currency?: string
  period?: string
  features?: string[]
  // Badge
  showBadge?: boolean
  badgeText?: string
  badgeColor?: string
  badgeBgColor?: string
  // Affichage
  showOriginalPrice?: boolean
  showPeriod?: boolean
  showFeatures?: boolean
  showGuarantee?: boolean
  guaranteeText?: string
  // Prix
  priceSize?: PriceSize
  priceColor?: string
  priceFontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  // Bouton
  ctaText?: string
  ctaUrl?: string
  ctaTarget?: '_self' | '_blank'
  buttonStyle?: ButtonStyle
  buttonColor?: string
  buttonBgColor?: string
  // Apparence
  backgroundColor?: string
  accentColor?: string
  titleColor?: string
  // Carte
  cardBgColor?: string
  cardBorderColor?: string
  cardBorderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  cardBorderRadius?: 'none' | 'small' | 'medium' | 'large'
  cardPadding?: 'small' | 'medium' | 'large' | 'xlarge'
  // Layout
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'pricing-minimal-centered',
  title: '',
  subtitle: '',
  items: undefined,
  price: '0',
  originalPrice: null,
  currency: 'FCFA',
  period: '',
  features: () => ['Feature 1', 'Feature 2', 'Feature 3'],
  showBadge: false,
  badgeText: 'POPULAIRE',
  badgeColor: '#ffffff',
  badgeBgColor: '',
  showOriginalPrice: false,
  showPeriod: true,
  showFeatures: true,
  showGuarantee: false,
  guaranteeText: 'Garantie satisfait ou remboursé 30 jours',
  priceSize: 'large',
  priceColor: '',
  priceFontWeight: 'bold',
  ctaText: 'Commander maintenant',
  ctaUrl: '',
  ctaTarget: '_self',
  buttonStyle: 'filled',
  buttonColor: '#ffffff',
  buttonBgColor: '',
  backgroundColor: '#ffffff',
  accentColor: '#10B981',
  titleColor: '',
  cardBgColor: '',
  cardBorderColor: '',
  cardBorderWidth: 'none',
  cardBorderRadius: 'none',
  cardPadding: 'large',
  columns: 1,
})

defineEmits(['cta-click'])

// Créer les plans (soit depuis items, soit depuis les props legacy)
const plans = computed<PricingPlan[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  // Rétrocompatibilité : créer un plan depuis les props
  return [{
    name: '',
    price: props.price,
    originalPrice: props.originalPrice,
    currency: props.currency,
    period: props.period,
    features: props.features,
    showBadge: props.showBadge,
    badgeText: props.badgeText,
    badgeColor: props.badgeColor,
    badgeBgColor: props.badgeBgColor,
    showOriginalPrice: props.showOriginalPrice,
    showPeriod: props.showPeriod,
    showFeatures: props.showFeatures,
    showGuarantee: props.showGuarantee,
    guaranteeText: props.guaranteeText,
    priceColor: props.priceColor,
    ctaText: props.ctaText,
    ctaUrl: props.ctaUrl,
    ctaTarget: props.ctaTarget,
    buttonStyle: props.buttonStyle,
    buttonColor: props.buttonColor,
    buttonBgColor: props.buttonBgColor,
    cardBgColor: props.cardBgColor,
    accentColor: props.accentColor,
    highlighted: false,
  }]
})

// Grille responsive selon nombre de plans
const gridClasses = computed(() => {
  const count = plans.value.length
  if (count === 1) return 'max-w-lg mx-auto'
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto items-stretch'
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch'
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch'
})

// Template actif
const template = computed(() => {
  return getTemplate('pricing', props.templateId) || {
    id: 'pricing-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-7xl mx-auto text-center',
      header: 'mb-10',
      title: 'text-2xl md:text-3xl font-light tracking-tight',
      subtitle: 'text-base opacity-60 mt-4',
      card: 'py-10 px-6 relative transition-transform duration-200',
      badge: 'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold uppercase tracking-wide rounded-full',
      priceWrapper: 'mb-6',
      originalPrice: 'text-lg opacity-50 line-through mb-1',
      priceRow: 'flex items-baseline justify-center',
      currency: 'text-xl font-light opacity-70 mr-1',
      price: 'text-5xl md:text-6xl font-light tracking-tight',
      period: 'text-base font-light opacity-50 mt-2',
      features: 'mt-8 space-y-3 text-sm text-left',
      featureItem: 'flex items-start gap-3',
      featureIcon: 'w-5 h-5 flex-shrink-0 mt-0.5',
      featureText: 'opacity-80',
      guarantee: 'mt-6 text-xs opacity-50',
      button: 'mt-10 w-full py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200 rounded-lg',
    }
  }
})

// Helper pour calculer la couleur du texte
function getTextColor(plan: PricingPlan): string {
  const bg = plan.cardBgColor || props.cardBgColor || props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
}

const textColor = computed(() => getTextColor({}))
const accentColorFinal = computed(() => props.accentColor || '#10B981')

// Styles section
const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

// Styles titre
const titleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
}))

// Styles badge par plan
function getBadgeStyles(plan: PricingPlan) {
  return {
    backgroundColor: plan.badgeBgColor || props.badgeBgColor || accentColorFinal.value,
    color: plan.badgeColor || props.badgeColor || '#ffffff',
  }
}

// Styles prix par plan
function getPriceStyles(plan: PricingPlan) {
  const sizeMap: Record<string, string> = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
    xlarge: '5rem',
  }
  
  const weightMap: Record<string, number> = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  }
  
  return {
    color: plan.priceColor || props.priceColor || getTextColor(plan),
    fontSize: sizeMap[props.priceSize || 'large'],
    fontWeight: weightMap[props.priceFontWeight || 'bold'],
  }
}

// Styles carte par plan
function getCardStyles(plan: PricingPlan) {
  const styles: Record<string, string> = {}
  
  const bgColor = plan.cardBgColor || props.cardBgColor
  if (bgColor) {
    styles.backgroundColor = bgColor
  }
  
  if (props.cardBorderWidth && props.cardBorderWidth !== 'none') {
    const borderWidthMap: Record<string, string> = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    }
    styles.borderWidth = borderWidthMap[props.cardBorderWidth] || '1px'
    styles.borderStyle = 'solid'
    styles.borderColor = props.cardBorderColor || (plan.accentColor || accentColorFinal.value)
  }
  
  if (props.cardBorderRadius && props.cardBorderRadius !== 'none') {
    const radiusMap: Record<string, string> = {
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    }
    styles.borderRadius = radiusMap[props.cardBorderRadius] || '0.5rem'
  }
  
  if (props.cardPadding) {
    const paddingMap: Record<string, string> = {
      small: '1.5rem',
      medium: '2rem',
      large: '2.5rem',
      xlarge: '3rem',
    }
    styles.padding = paddingMap[props.cardPadding] || '2.5rem'
  }
  
  // Highlight ring color
  if (plan.highlighted) {
    styles.ringColor = plan.accentColor || accentColorFinal.value
  }
  
  return styles
}

// Styles bouton par plan
function getButtonStyles(plan: PricingPlan) {
  const btnBgColor = plan.buttonBgColor || props.buttonBgColor || plan.accentColor || accentColorFinal.value
  const btnColor = plan.buttonColor || props.buttonColor || '#ffffff'
  const style = plan.buttonStyle || props.buttonStyle
  
  if (style === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color: btnBgColor,
      border: `2px solid ${btnBgColor}`,
    }
  }
  
  return {
    backgroundColor: btnBgColor,
    color: btnColor,
  }
}

// Formater le prix
function formatPrice(price: string | number | null | undefined): string {
  if (price === null || price === undefined) return '0'
  const num = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('fr-FR').format(num)
}
</script>
