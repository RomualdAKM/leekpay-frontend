<template>
  <!-- LAYOUT: CLASSIC CARDS (3 colonnes avec coches/croix) -->
  <section 
    v-if="layoutType === 'classic-cards'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto px-6">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: '1rem' }">
        <!-- Badge -->
        <div v-if="props.showBadge && props.badge" :style="badgePositionStyles" class="flex justify-center">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge }}
          </span>
        </div>
        <div v-if="props.title || isEditMode" :style="titlePositionStyles" class="text-center">
          <h2 :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight">{{ props.title }}</h2>
        </div>
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles" class="text-center">
          <p :style="{ color: textColor, opacity: 0.6 }" class="text-base mt-4">{{ props.subtitle }}</p>
        </div>
        <div :class="gridClasses" :style="plansPositionStyles" class="mt-8">
          <div 
          v-for="(plan, idx) in plans" 
          :key="idx"
          :style="getCardStyles(plan)"
          :class="['p-8 relative', plan.highlighted ? 'ring-2 ring-offset-2 scale-105 z-10' : '', cardHoverClass]"
        >
          <span 
            v-if="plan.showBadge && plan.badgeText"
            :style="getBadgeStyles(plan)"
            class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full"
          >{{ plan.badgeText }}</span>
          <h3 :style="{ color: getTextColor(plan) }" class="text-xl font-semibold mb-1">{{ plan.name }}</h3>
          <p v-if="plan.description" :style="{ color: getTextColor(plan), opacity: 0.6 }" class="text-sm mb-4">{{ plan.description }}</p>
          <div class="mb-6">
            <div class="flex items-baseline">
              <span :style="getPriceStyles(plan)" class="text-5xl font-bold">{{ formatPrice(plan.price) }}</span>
              <span :style="{ color: getTextColor(plan), opacity: 0.6 }" class="text-sm ml-1">{{ plan.period }}</span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
            <li v-for="(f, fi) in plan.features" :key="fi" class="flex items-start gap-3">
              <svg 
                class="w-5 h-5 flex-shrink-0 mt-0.5" 
                :style="{ color: isFeatureIncluded(f) ? (plan.accentColor || accentColorFinal) : (getTextColor(plan) + '40') }" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path v-if="isFeatureIncluded(f)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span :style="{ color: getTextColor(plan), opacity: isFeatureIncluded(f) ? 1 : 0.4 }">{{ getFeatureText(f) }}</span>
            </li>
          </ul>
          <button :style="getButtonStyles(plan)" class="w-full py-3 text-sm font-medium tracking-wide rounded-lg transition-colors">{{ plan.ctaText || 'Commander' }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: SIMPLE PYRAMID (2+1 layout minimaliste) -->
  <section 
    v-else-if="layoutType === 'simple-pyramid'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-4xl mx-auto px-6">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: '1rem' }">
        <!-- Badge -->
        <div v-if="props.showBadge && props.badge" :style="badgePositionStyles" class="flex justify-center">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge }}
          </span>
        </div>
        <div v-if="props.title || isEditMode" :style="titlePositionStyles" class="text-center">
          <h2 :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight">{{ props.title }}</h2>
        </div>
        <div :style="plansPositionStyles" class="mt-8">
          <!-- Ligne 1 : 2 cartes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div 
              v-for="(plan, idx) in plans.slice(0, 2)" 
              :key="idx"
              :style="getCardStyles(plan)"
              :class="['p-8 text-center', plan.highlighted ? 'ring-2 ring-offset-2' : '', cardHoverClass]"
            >
              <h3 :style="{ color: getTextColor(plan) }" class="text-xl font-semibold mb-1">{{ plan.name }}</h3>
              <p v-if="plan.description" :style="{ color: getTextColor(plan), opacity: 0.6 }" class="text-sm mb-4">{{ plan.description }}</p>
              <div class="flex items-baseline justify-center mb-4">
                <span :style="getPriceStyles(plan)" class="text-5xl font-bold">{{ formatPrice(plan.price) }}</span>
                <span :style="{ color: getTextColor(plan), opacity: 0.6 }" class="text-sm ml-1">{{ plan.period }}</span>
              </div>
              <button :style="getButtonStyles(plan)" class="w-full py-3 text-sm font-medium tracking-wide rounded-full transition-colors">{{ plan.ctaText || 'Choisir' }}</button>
            </div>
          </div>
          <!-- Ligne 2 : 1 carte centrée -->
          <div v-if="plans.length > 2" class="max-w-md mx-auto">
            <div 
              :style="getCardStyles(thirdPlan)"
              :class="['p-8 text-center', thirdPlan.highlighted ? 'ring-2 ring-offset-2' : '', cardHoverClass]"
            >
              <h3 :style="{ color: getTextColor(thirdPlan) }" class="text-xl font-semibold mb-1">{{ thirdPlan.name }}</h3>
              <p v-if="thirdPlan.description" :style="{ color: getTextColor(thirdPlan), opacity: 0.6 }" class="text-sm mb-4">{{ thirdPlan.description }}</p>
              <div class="flex items-baseline justify-center mb-4">
                <span :style="getPriceStyles(thirdPlan)" class="text-5xl font-bold">{{ formatPrice(thirdPlan.price) }}</span>
                <span :style="{ color: getTextColor(thirdPlan), opacity: 0.6 }" class="text-sm ml-1">{{ thirdPlan.period }}</span>
              </div>
              <button :style="getButtonStyles(thirdPlan)" class="w-full py-3 text-sm font-medium tracking-wide rounded-full transition-colors">{{ thirdPlan.ctaText || 'Choisir' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: FLEXIBLE TOGGLE (Mensuel/Annuel) -->
  <section 
    v-else-if="layoutType === 'flexible-toggle'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto px-6">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: '1rem' }">
        <div v-if="props.title || isEditMode" :style="titlePositionStyles" class="text-center">
          <h2 :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight">{{ props.title }}</h2>
        </div>
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles" class="text-center">
          <p v-if="props.subtitle" :style="{ color: textColor, opacity: 0.6 }" class="text-base mt-4">{{ props.subtitle }}</p>
        </div>
        
        <!-- Badge -->
        <div v-if="props.showBadge && props.badge" :style="badgePositionStyles" class="flex justify-center mb-4">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge }}
          </span>
        </div>

        <div :style="plansPositionStyles" class="mt-4">
          <!-- Toggle Mensuel/Annuel -->
          <div class="flex justify-center mb-10">
            <div :style="{ backgroundColor: textColor + '10' }" class="inline-flex items-center p-1 rounded-full">
              <button 
                @click="billingCycle = 'monthly'"
                :style="billingCycle === 'monthly' ? { backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' } : { color: textColor }"
                class="px-6 py-2 text-sm font-medium rounded-full transition-colors"
              >Mensuel</button>
              <button 
                @click="billingCycle = 'yearly'"
                :style="billingCycle === 'yearly' ? { backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' } : { color: textColor }"
                class="px-6 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2"
              >
                Annuel
                <span v-if="props.yearlyDiscount" :style="{ backgroundColor: accentColorFinal, color: '#ffffff' }" class="px-2 py-0.5 text-xs font-bold rounded-full">{{ props.yearlyDiscount }}</span>
              </button>
            </div>
          </div>
          <div :class="gridClasses">
            <div 
              v-for="(plan, idx) in plans" 
              :key="idx"
              :style="getCardStyles(plan)"
              :class="['p-8 relative', plan.highlighted ? 'ring-2 ring-offset-2 scale-105 z-10' : '', cardHoverClass]"
            >
              <span 
                v-if="plan.showBadge && plan.badgeText"
                :style="getBadgeStyles(plan)"
                class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full"
              >{{ plan.badgeText }}</span>
              <h3 :style="{ color: getTextColor(plan) }" class="text-xl font-semibold mb-1">{{ plan.name }}</h3>
              <div class="mb-6">
                <div class="flex items-baseline">
                  <span :style="getPriceStyles(plan)" class="text-5xl font-bold">{{ formatPrice(billingCycle === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.price) }}</span>
                  <span :style="{ color: getTextColor(plan), opacity: 0.6 }" class="text-sm ml-1">{{ plan.period }}</span>
                </div>
              </div>
              <ul class="space-y-3 mb-8">
                <li v-for="(f, fi) in plan.features" :key="fi" class="flex items-start gap-3" :style="{ color: getTextColor(plan) }">
                  <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :style="{ color: plan.accentColor || accentColorFinal }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ typeof f === 'string' ? f : f.text }}</span>
                </li>
              </ul>
              <button :style="getButtonStyles(plan)" class="w-full py-3 text-sm font-medium tracking-wide rounded-lg transition-colors">{{ plan.ctaText || 'Choisir' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: ENTERPRISE SPLIT (features + contact) -->
  <section 
    v-else-if="layoutType === 'enterprise-split'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Gauche : Features -->
        <div class="flex flex-col h-full" :style="{ gap: '1rem' }">
          <!-- Badge -->
          <div v-if="props.enterpriseBadge" :style="{ order: -1 }">
            <span 
              :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
              class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded"
            >{{ props.enterpriseBadge }}</span>
          </div>
          <!-- Titre -->
          <div v-if="props.title || isEditMode" :style="titlePositionStyles">
            <h2 :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight mb-4">{{ props.title }}</h2>
          </div>
          <!-- Sous-titre -->
          <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
            <p v-if="props.subtitle" :style="{ color: textColor, opacity: 0.7 }" class="text-lg mb-8">{{ props.subtitle }}</p>
          </div>
          <!-- Features -->
          <div :style="plansPositionStyles">
            <ul class="space-y-4">
              <li v-for="(f, fi) in enterpriseFeatures" :key="fi" class="flex items-start gap-3" :style="{ color: textColor }">
                <svg class="w-5 h-5 flex-shrink-0 mt-1" :style="{ color: accentColorFinal }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base">{{ f }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- Droite : Carte contact -->
        <div :style="contactCardStyles" class="p-8 rounded-xl">
          <h3 :style="{ color: contactTextColor }" class="text-xl font-bold mb-2">{{ props.contactTitle || 'Parlons de vos besoins' }}</h3>
          <p :style="{ color: contactTextColor, opacity: 0.7 }" class="text-sm mb-6">{{ props.contactDescription || 'Notre équipe vous accompagne dans la mise en place' }}</p>
          <a 
            v-if="props.contactCtaUrl" 
            :href="props.contactCtaUrl" 
            target="_blank"
            :style="{ backgroundColor: accentColorFinal, color: '#ffffff' }" 
            class="block w-full py-4 text-base font-semibold rounded-lg transition-colors mb-4 text-center"
          >{{ props.contactCtaText || 'Demander un devis' }}</a>
          <button 
            v-else
            :style="{ backgroundColor: accentColorFinal, color: '#ffffff' }" 
            class="w-full py-4 text-base font-semibold rounded-lg transition-colors mb-4"
          >{{ props.contactCtaText || 'Demander un devis' }}</button>
          <p v-if="props.contactPhone" :style="{ color: contactTextColor }" class="text-center text-sm">
            ou appelez-nous : <a :href="'tel:' + props.contactPhone" :style="{ color: accentColorFinal }" class="font-medium">{{ props.contactPhone }}</a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: LIFETIME DEAL (offre unique avec urgence) -->
  <section 
    v-else-if="layoutType === 'lifetime-deal'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-lg mx-auto px-6 text-center">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: '1rem' }">
        <div v-if="props.title || isEditMode" :style="titlePositionStyles">
          <h2 :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight mb-4">{{ props.title }}</h2>
        </div>
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="{ color: textColor, opacity: 0.7 }" class="text-lg mb-8">{{ props.subtitle }}</p>
        </div>
        <div :style="plansPositionStyles" class="mt-4">
          <!-- Badge unique pour ce layout -->
          <span 
            v-if="firstPlan.showBadge && firstPlan.badgeText"
            :style="{ ...getBadgeStyles(firstPlan), ...badgePositionStyles }"
            class="inline-block px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-full mb-6"
          >{{ firstPlan.badgeText }}</span>
          <!-- Prix -->
          <div class="mb-8">
            <span v-if="firstPlan.showOriginalPrice && firstPlan.originalPrice" :style="{ color: textColor, opacity: 0.5 }" class="text-xl line-through mr-3">{{ formatPrice(firstPlan.originalPrice) }}{{ firstPlan.currency || props.currency }}</span>
            <span :style="getPriceStyles(firstPlan)" class="text-6xl md:text-7xl font-black">{{ formatPrice(firstPlan.price) }}</span>
            <span :style="{ color: textColor }" class="text-2xl font-bold">{{ firstPlan.currency || props.currency }}</span>
            <span v-if="props.discountBadge" :style="{ backgroundColor: '#ef4444', color: '#ffffff' }" class="ml-3 px-3 py-1 text-sm font-bold rounded-full">{{ props.discountBadge }}</span>
          </div>
          <!-- Features -->
          <ul class="space-y-3 text-left max-w-sm mx-auto mb-8">
            <li v-for="(f, fi) in firstPlan.features" :key="fi" class="flex items-start gap-3" :style="{ color: textColor }">
              <svg class="w-5 h-5 flex-shrink-0 mt-1" :style="{ color: accentColorFinal }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ getFeatureText(f) }}</span>
            </li>
          </ul>
          <!-- CTA -->
          <button :style="getButtonStyles(firstPlan)" class="w-full py-5 text-base font-bold rounded-xl transition-colors mb-4">{{ firstPlan.ctaText || 'Obtenir l\'accès' }}</button>
          <!-- Urgence -->
          <p v-if="props.showUrgency && props.urgencyText" :style="{ color: '#ef4444' }" class="text-sm font-medium mb-2">{{ props.urgencyText }}</p>
          <!-- Garantie -->
          <p v-if="firstPlan.showGuarantee && firstPlan.guaranteeText" :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ firstPlan.guaranteeText }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: DÉFAUT -->
  <section 
    v-else
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses]"
    :style="sectionStyles"
  >
    <div class="max-w-7xl mx-auto text-center px-6">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: '1rem' }">
        <!-- Badge -->
        <div v-if="props.showBadge && props.badge" :style="badgePositionStyles" class="flex justify-center mb-4">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge }}
          </span>
        </div>
        <div v-if="props.title || isEditMode" :style="titlePositionStyles">
          <h2 v-if="props.title" :class="template.styles.title" :style="titleStyles">{{ props.title }}</h2>
        </div>
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :class="template.styles.subtitle" :style="{ color: textColor }">{{ props.subtitle }}</p>
        </div>
        <div :class="gridClasses" :style="plansPositionStyles" class="mt-8">
          <div 
            v-for="(plan, planIndex) in plans" 
            :key="planIndex"
            :class="[template.styles.card, plan.highlighted ? 'ring-2 ring-offset-2 scale-105 z-10' : '', cardHoverClass]" 
            :style="getCardStyles(plan)"
          >
            <span 
              v-if="plan.showBadge && plan.badgeText"
              :class="template.styles.badge"
              :style="getBadgeStyles(plan)"
            >{{ plan.badgeText }}</span>
            <h3 v-if="plan.name" class="text-lg font-semibold mb-2" :style="{ color: getTextColor(plan) }">{{ plan.name }}</h3>
            <div :class="template.styles.priceWrapper">
              <p v-if="plan.showOriginalPrice && plan.originalPrice" :class="template.styles.originalPrice" :style="{ color: getTextColor(plan) }">
                {{ formatPrice(plan.originalPrice) }} {{ plan.currency || props.currency }}
              </p>
              <div :class="template.styles.priceRow">
                <span :class="template.styles.currency" :style="{ color: plan.priceColor || getTextColor(plan) }">{{ plan.currency || props.currency }}</span>
                <span :class="template.styles.price" :style="getPriceStyles(plan)">{{ formatPrice(plan.price) }}</span>
              </div>
              <p v-if="plan.showPeriod && plan.period" :class="template.styles.period" :style="{ color: getTextColor(plan) }">{{ plan.period }}</p>
            </div>
            <ul v-if="plan.showFeatures !== false && plan.features?.length" :class="template.styles.features">
              <li v-for="(feature, index) in plan.features" :key="index" :class="template.styles.featureItem" :style="{ color: getTextColor(plan) }">
                <svg :class="template.styles.featureIcon" :style="{ color: plan.accentColor || props.accentColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span :class="template.styles.featureText">{{ typeof feature === 'string' ? feature : feature.text }}</span>
              </li>
            </ul>
            <p v-if="plan.showGuarantee && plan.guaranteeText" :class="template.styles.guarantee" :style="{ color: getTextColor(plan) }">{{ plan.guaranteeText }}</p>
            <button :class="template.styles.button" :style="getButtonStyles(plan)">{{ plan.ctaText || 'Commander' }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

// Types
type ButtonStyle = 'filled' | 'outlined'
type PriceSize = 'small' | 'medium' | 'large' | 'xlarge'

interface PricingPlan {
  name?: string
  description?: string
  price?: string | number
  yearlyPrice?: string | number
  originalPrice?: string | number | null
  currency?: string
  period?: string
  features?: (string | { text: string; included?: boolean })[]
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
  blockId?: string
  templateId?: string
  // Contenu
  title?: string
  subtitle?: string
  headerAlignment?: 'left' | 'center' | 'right'
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
  cardPadding?: 'small' | 'medium' | 'large' | 'xlarge'
  cardShadow?: 'none' | 'small' | 'medium' | 'large'
  // Layout
  columns?: number
  cardHoverEffect?: 'none' | 'lift' | 'scale' | 'glow'
  // Toggle Mensuel/Annuel
  showBillingToggle?: boolean
  yearlyDiscount?: string
  // Enterprise Split
  enterpriseBadge?: string
  enterpriseFeatures?: string[]
  contactTitle?: string
  contactDescription?: string
  contactCtaText?: string
  contactPhone?: string
  contactCtaUrl?: string
  // Lifetime Deal
  showUrgency?: boolean
  urgencyText?: string
  discountBadge?: string
  // Avancé
  cssId?: string
  customClasses?: string
  // Positionnement
  elementsOrder?: string[]
  badge?: string // Added to match other blocks, though badgeText is main prop
  badgeOffsetY?: number
  titleOffsetY?: number
  subtitleOffsetY?: number
  plansOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'pricing-minimal-centered',
  title: '',
  subtitle: '',
  headerAlignment: 'center',
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
  cardPadding: 'large',
  cardShadow: 'none',
  columns: 1,
  cardHoverEffect: 'none',
  showBillingToggle: false,
  yearlyDiscount: '-20%',
  enterpriseBadge: 'ENTREPRISE',
  enterpriseFeatures: () => ['Déploiement dédié', 'SLA garanti 99.99%', 'Support dédié 24/7', 'Intégrations personnalisées'],
  contactTitle: 'Parlons de vos besoins',
  contactDescription: 'Notre équipe vous accompagne dans la mise en place',
  contactCtaText: 'Demander un devis',
  contactPhone: '+33 1 23 45 67 89',
  contactCtaUrl: '',
  showUrgency: false,
  urgencyText: 'Plus que 47 places disponibles !',
  discountBadge: '-70%',
  cssId: '',
  customClasses: '',
  // Positionnement
  elementsOrder: () => ['title', 'subtitle', 'plans'],
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  plansOffsetY: 0,
})

defineEmits(['cta-click'])

// Édition inline
const { isEditMode, emitPropUpdate, emitArrayPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

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

// Handlers pour les champs simples (title, subtitle)
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

// Handlers pour les champs dans items[]
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

const handleCtaClick = (plan: PricingPlan, _planIndex: number) => {
  if (!isEditMode.value && plan.ctaUrl) {
    window.open(plan.ctaUrl, plan.ctaTarget || '_self')
  }
}

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

// Détecte le type de layout à partir du templateId
const layoutType = computed(() => {
  const id = props.templateId || ''
  if (id.includes('classic-cards')) return 'classic-cards'
  if (id.includes('simple-pyramid')) return 'simple-pyramid'
  if (id.includes('flexible-toggle')) return 'flexible-toggle'
  if (id.includes('enterprise-split')) return 'enterprise-split'
  if (id.includes('lifetime-deal')) return 'lifetime-deal'
  return 'default'
})

// Toggle Mensuel/Annuel
const billingCycle = ref<'monthly' | 'yearly'>('monthly')

// Features Enterprise avec fallback
const enterpriseFeatures = computed(() => {
  return props.enterpriseFeatures && props.enterpriseFeatures.length > 0 
    ? props.enterpriseFeatures 
    : ['Déploiement dédié', 'SLA garanti 99.99%', 'Support dédié 24/7', 'Intégrations personnalisées']
})

// Effet hover carte
const cardHoverClass = computed(() => {
  const effectMap: Record<string, string> = {
    none: '',
    lift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
    scale: 'transition-transform duration-300 hover:scale-105',
    glow: 'transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/20',
  }
  return effectMap[props.cardHoverEffect || 'none'] || ''
})

// Styles carte contact (Enterprise) - utilise les mêmes props que les cartes normales
const contactCardBgColor = computed(() => props.cardBgColor || '#f8fafc')

const contactCardStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: contactCardBgColor.value,
  }
  
  // Border radius
  if (props.cardBorderRadius && props.cardBorderRadius !== 'none') {
    const radiusMap: Record<string, string> = {
      small: '0.5rem',
      medium: '1rem',
      large: '1.5rem',
    }
    styles.borderRadius = radiusMap[props.cardBorderRadius] || '0.75rem'
  } else {
    styles.borderRadius = '0.75rem'
  }
  
  // Border
  if (props.cardBorderWidth && props.cardBorderWidth !== 'none') {
    const borderWidthMap: Record<string, string> = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    }
    styles.borderWidth = borderWidthMap[props.cardBorderWidth] || '1px'
    styles.borderStyle = 'solid'
    styles.borderColor = props.cardBorderColor || accentColorFinal.value
  }
  
  // Shadow
  if (props.cardShadow && props.cardShadow !== 'none') {
    const shadowMap: Record<string, string> = {
      small: '0 1px 3px rgba(0,0,0,0.1)',
      medium: '0 4px 6px rgba(0,0,0,0.1)',
      large: '0 10px 25px rgba(0,0,0,0.15)',
    }
    styles.boxShadow = shadowMap[props.cardShadow] || ''
  }
  
  return styles
})

// Couleur texte pour carte contact (basée sur son propre fond)
const contactTextColor = computed(() => {
  const bg = contactCardBgColor.value
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Plans avec accès sécurisé
const firstPlan = computed(() => plans.value[0] || {} as PricingPlan)
const thirdPlan = computed(() => plans.value[2] || {} as PricingPlan)

// Helper pour vérifier si feature est incluse
function isFeatureIncluded(f: string | { text: string; included?: boolean }): boolean {
  if (typeof f === 'string') return true
  return f.included !== false
}

function getFeatureText(f: string | { text: string; included?: boolean }): string {
  return typeof f === 'string' ? f : f.text
}

// Styles section
const sectionStyles = computed(() => {
  const paddingYMap: Record<string, string> = {
    small: '2rem',
    medium: '4rem',
    large: '6rem',
    xlarge: '8rem',
  }
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
  
  // Shadow
  if (props.cardShadow && props.cardShadow !== 'none') {
    const shadowMap: Record<string, string> = {
      small: '0 1px 3px rgba(0,0,0,0.1)',
      medium: '0 4px 6px rgba(0,0,0,0.1)',
      large: '0 10px 25px rgba(0,0,0,0.15)',
    }
    styles.boxShadow = shadowMap[props.cardShadow] || ''
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

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['badge', 'title', 'subtitle', 'plans', 'cta']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

const badgePositionStyles = computed(() => ({
  order: getElementOrder('badge'),
  marginTop: props.badgeOffsetY ? `${props.badgeOffsetY}px` : undefined,
  marginBottom: '1rem' // Default spacing
}))

const titlePositionStyles = computed(() => ({
  order: getElementOrder('title'),
  transform: props.titleOffsetY ? `translateY(${props.titleOffsetY}px)` : undefined
}))

const subtitlePositionStyles = computed(() => ({
  order: getElementOrder('subtitle'),
  transform: props.subtitleOffsetY ? `translateY(${props.subtitleOffsetY}px)` : undefined
}))

const plansPositionStyles = computed(() => ({
  order: getElementOrder('plans'),
  transform: props.plansOffsetY ? `translateY(${props.plansOffsetY}px)` : undefined
}))

const buttonPositionStyles = computed(() => ({
  order: getElementOrder('cta'),
  transform: props.buttonOffsetY ? `translateY(${props.buttonOffsetY}px)` : undefined
}))
</script>
