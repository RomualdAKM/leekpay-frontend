<template>
  <!-- LAYOUT: SPLIT IMAGE -->
  <section 
    v-if="layoutType === 'split-image'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Grande image -->
        <div class="relative">
          <img 
            :src="displayItems[0]?.avatar || DEFAULT_AVATARS[0]" 
            :alt="displayItems[0]?.name"
            :style="{ borderRadius: cardBorderRadiusValue }"
            class="w-full h-auto object-cover aspect-[4/5]"
          />
        </div>
        <!-- Témoignage -->
        <div>
          <!-- Quote icon -->
          <svg v-if="props.showQuoteIcon" class="w-12 h-12 mb-6" :style="{ color: textColor, opacity: 0.3 }" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote :style="quoteStyles" class="text-xl md:text-2xl font-normal leading-relaxed mb-8">
            {{ displayItems[0]?.text }}
          </blockquote>
          <div class="mb-8">
            <p :style="{ color: props.titleColor || textColor }" class="text-lg font-bold">{{ displayItems[0]?.name }}</p>
            <p v-if="props.showRole" :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ displayItems[0]?.role }}</p>
          </div>
          <!-- Stats -->
          <div class="flex gap-8">
            <div>
              <p class="text-3xl font-bold" :style="{ color: props.accentColor || '#10B981' }">{{ props.stat1Value }}</p>
              <p :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ props.stat1Label }}</p>
            </div>
            <div>
              <p class="text-3xl font-bold" :style="{ color: props.titleColor || textColor }">{{ props.stat2Value }}</p>
              <p :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ props.stat2Label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: DARK SLIDER -->
  <section 
    v-else-if="layoutType === 'dark-slider'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 v-if="props.title" :style="titleStyles" class="text-3xl md:text-4xl font-bold tracking-tight mb-12">{{ props.title }}</h2>
      
      <!-- Slider Container -->
      <div class="relative">
        <!-- Flèches -->
        <button 
          @click="prevSlide"
          :style="{ backgroundColor: sliderButtonBg, color: textColor }"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button 
          @click="nextSlide"
          :style="{ backgroundColor: sliderButtonBg, color: textColor }"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        
        <!-- Slide -->
        <div class="px-8">
          <!-- Étoiles -->
          <div v-if="props.showRating" class="flex justify-center gap-1 mb-6">
            <svg v-for="star in 5" :key="star" :style="{ color: props.accentColor || '#fbbf24' }" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <blockquote :style="quoteStyles" class="text-xl md:text-2xl font-light leading-relaxed italic mb-8">
            "{{ displayItems[currentSlide]?.text }}"
          </blockquote>
          <div class="flex items-center justify-center gap-4">
            <div 
              v-if="props.showAvatar"
              :style="{ ...avatarStyles, backgroundColor: sliderButtonBg }"
              class="flex items-center justify-center font-semibold"
            >
              <span :style="{ color: textColor }">{{ getInitials(displayItems[currentSlide]?.name || 'C') }}</span>
            </div>
            <div class="text-left">
              <p :style="{ color: props.titleColor || textColor }" class="text-base font-semibold">{{ displayItems[currentSlide]?.name }}</p>
              <p v-if="props.showRole" :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ displayItems[currentSlide]?.role }}</p>
            </div>
          </div>
        </div>
        
        <!-- Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button 
            v-for="(_, idx) in displayItems" 
            :key="idx"
            @click="currentSlide = idx"
            :style="{ backgroundColor: currentSlide === idx ? (props.accentColor || textColor) : sliderButtonBg }"
            class="w-2 h-2 rounded-full transition-colors"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: QUOTE LARGE -->
  <section 
    v-else-if="layoutType === 'quote-large'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-4xl mx-auto px-6 text-center">
      <!-- Grande icône quote -->
      <svg v-if="props.showQuoteIcon" class="w-20 h-20 mx-auto mb-8" :style="{ color: textColor, opacity: 0.2 }" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote :style="quoteStyles" class="text-2xl md:text-3xl font-light leading-relaxed italic mb-10">
        "{{ displayItems[0]?.text }}"
      </blockquote>
      <div class="flex items-center justify-center gap-4">
        <img 
          v-if="props.showAvatar"
          :src="displayItems[0]?.avatar || DEFAULT_AVATARS[0]" 
          :alt="displayItems[0]?.name"
          :style="avatarStyles"
          class="ring-4"
        />
        <div class="text-left">
          <p :style="{ color: props.titleColor || textColor }" class="text-lg font-semibold">{{ displayItems[0]?.name }}</p>
          <p v-if="props.showRole" :style="{ color: textColor, opacity: 0.6 }" class="text-sm">{{ displayItems[0]?.role }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: GRID COMPACT -->
  <section 
    v-else-if="layoutType === 'grid-compact'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto px-6">
      <h2 v-if="props.title" :style="titleStyles" class="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">{{ props.title }}</h2>
      <div :class="gridClasses">
        <div 
          v-for="(item, index) in displayItems" 
          :key="index"
          :style="cardStyles"
          :class="['p-6', cardHoverClass]"
        >
          <!-- Étoiles -->
          <div v-if="props.showRating" class="flex gap-0.5 mb-3">
            <svg v-for="star in 5" :key="star" class="w-4 h-4" :style="{ color: star <= (item.rating || 5) ? (props.accentColor || '#fbbf24') : (textColor + '40') }" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p :style="{ color: textColor }" class="text-sm leading-relaxed mb-4">{{ item.text }}</p>
          <p :style="{ color: props.titleColor || textColor }" class="text-sm font-medium">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: REVIEWS LIST -->
  <section 
    v-else-if="layoutType === 'reviews-list'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-3xl mx-auto px-6">
      <!-- Header avec note moyenne -->
      <div class="text-center mb-10">
        <h2 v-if="props.title" :style="titleStyles" class="text-2xl md:text-3xl font-bold tracking-tight">{{ props.title }}</h2>
        <div class="flex items-center justify-center gap-2 mt-3">
          <div class="flex gap-0.5">
            <svg v-for="star in 5" :key="star" :style="{ color: props.accentColor || '#fbbf24' }" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span :style="{ color: props.titleColor || textColor }" class="text-xl font-bold">{{ props.averageRating }}</span>
          <span :style="{ color: textColor, opacity: 0.6 }">({{ props.totalReviews }} avis)</span>
        </div>
      </div>
      
      <!-- Liste des avis -->
      <div class="space-y-4">
        <div 
          v-for="(item, index) in displayItems" 
          :key="index"
          :style="cardStyles"
          :class="['p-6 relative', cardHoverClass]"
        >
          <div class="flex items-start justify-between mb-2">
            <div v-if="props.showRating" class="flex gap-0.5">
              <svg v-for="star in 5" :key="star" class="w-4 h-4" :style="{ color: star <= (item.rating || 5) ? (props.accentColor || '#fbbf24') : (textColor + '40') }" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span :style="{ color: textColor, opacity: 0.5 }" class="text-sm">{{ getReviewDate(index) }}</span>
          </div>
          <p :style="{ color: textColor }" class="text-base leading-relaxed mb-3">{{ item.text }}</p>
          <p :style="{ color: textColor, opacity: 0.7 }" class="text-sm font-medium">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: DÉFAUT (Grille standard) -->
  <section 
    v-else
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Header -->
      <div v-if="props.title || props.subtitle || isEditMode" :class="template.styles.header" :style="headerStyles">
        <h2 
          v-if="props.title || isEditMode"
          :class="[template.styles.title, editableClasses('title')]"
          :style="titleStyles"
          :contenteditable="isEditMode"
          :data-placeholder="'Titre de la section'"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
        >{{ props.title }}</h2>
        <p 
          v-if="props.subtitle || isEditMode"
          :class="[template.styles.subtitle, editableClasses('subtitle')]"
          :style="{ color: textColor }"
          :contenteditable="isEditMode"
          :data-placeholder="'Sous-titre (optionnel)'"
          @focus="onFocus('subtitle')"
          @blur="onBlur($event, 'subtitle')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.subtitle }}</p>
      </div>
      
      <!-- Grille -->
      <div :class="gridClasses">
        <div 
          v-for="(item, index) in displayItems"
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
          
          <!-- Étoiles en haut pour certains styles -->
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
          
          <!-- Texte du témoignage -->
          <blockquote 
            :class="[template.styles.quote, editableClasses(`items[${index}].text`)]"
            :style="quoteStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Témoignage...'"
            @focus="onArrayFocus('items', index, 'text')"
            @blur="onArrayBlur($event, 'items', index, 'text')"
            @keydown="onKeydown($event, false)"
            @paste="onPaste"
          >"{{ item.text }}"</blockquote>
          
          <!-- Auteur -->
          <div :class="template.styles.authorWrapper">
            <!-- Avatar -->
            <img 
              v-if="props.showAvatar"
              :src="item.avatar || DEFAULT_AVATARS[index % DEFAULT_AVATARS.length]"
              :alt="item.name"
              :class="template.styles.avatar"
              :style="avatarStyles"
            />
            
            <!-- Nom et rôle -->
            <div :class="template.styles.authorInfo">
              <p 
                :class="[template.styles.author, editableClasses(`items[${index}].name`)]"
                :style="{ color: textColor }"
                :contenteditable="isEditMode"
                :data-placeholder="'Nom'"
                @focus="onArrayFocus('items', index, 'name')"
                @blur="onArrayBlur($event, 'items', index, 'name')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
              >{{ item.name }}</p>
              <p 
                v-if="props.showRole && (item.role || isEditMode)" 
                :class="[template.styles.role, editableClasses(`items[${index}].role`)]" 
                :style="{ color: textColor }"
                :contenteditable="isEditMode"
                :data-placeholder="'Rôle'"
                @focus="onArrayFocus('items', index, 'role')"
                @blur="onArrayBlur($event, 'items', index, 'role')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
              >{{ item.role }}</p>
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

<script lang="ts">
// Avatars par défaut libres de droit (Unsplash - faces professionnelles)
export const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
]

export const DEFAULT_TESTIMONIAL_ITEMS = [
  { 
    name: 'Marc Dupont', 
    role: 'CEO, TechStart', 
    company: 'TechStart',
    text: 'Un service exceptionnel qui a transformé mon business. Les résultats ont dépassé toutes mes attentes.', 
    avatar: DEFAULT_AVATARS[0], 
    rating: 5 
  },
  { 
    name: 'Sophie Martin', 
    role: 'Directrice Marketing', 
    company: 'MarketPro',
    text: 'Une solution complète et intuitive. Je recommande vivement à tous les entrepreneurs.', 
    avatar: DEFAULT_AVATARS[1], 
    rating: 5 
  },
  { 
    name: 'Thomas Bernard', 
    role: 'Fondateur, InnoLab', 
    company: 'InnoLab',
    text: 'Le meilleur investissement que j\'ai fait pour mon entreprise. Support client au top !', 
    avatar: DEFAULT_AVATARS[2], 
    rating: 5 
  },
]
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

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
  blockId?: string  // ID du bloc pour l'édition inline
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
  // Stats (Split Image)
  stat1Value?: string
  stat1Label?: string
  stat2Value?: string
  stat2Label?: string
  // Stats (Reviews List)
  averageRating?: string
  totalReviews?: string
  // Avancé
  cssId?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'testimonials-minimal-centered',
  title: "Ce qu'ils en disent",
  subtitle: '',
  items: () => DEFAULT_TESTIMONIAL_ITEMS,
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
  stat1Value: '+45%',
  stat1Label: 'Satisfaction',
  stat2Value: '2x',
  stat2Label: 'Conversions',
  averageRating: '4.9',
  totalReviews: '1894',
  cssId: '',
  customClasses: '',
})

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, emitArrayPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

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
    'min-w-[20px]',
    isFieldActive(field) 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

// Handlers d'édition - champs simples
const onFocus = (field: string) => {
  if (props.blockId) {
    startEditing(props.blockId, field)
  }
}

const onBlur = (e: FocusEvent, field: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

// Handlers d'édition - champs dans array
const onArrayFocus = (arrayKey: string, index: number, propKey: string) => {
  if (props.blockId) {
    startEditing(props.blockId, `${arrayKey}[${index}].${propKey}`)
  }
}

const onArrayBlur = (e: FocusEvent, arrayKey: string, index: number, propKey: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
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

// Slide actuel pour le carrousel
const currentSlide = ref(0)

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? displayItems.value.length - 1 : currentSlide.value - 1
}

const nextSlide = () => {
  currentSlide.value = currentSlide.value === displayItems.value.length - 1 ? 0 : currentSlide.value + 1
}

// Génère une date fictive pour les avis
const getReviewDate = (index: number) => {
  const dates = ['Il y a 2 jours', 'Il y a 1 semaine', 'Il y a 2 semaines', 'Il y a 3 semaines', 'Il y a 1 mois']
  return dates[index % dates.length]
}

// Détecte le type de layout à partir du templateId
const layoutType = computed(() => {
  const id = props.templateId || ''
  if (id.includes('split-image')) return 'split-image'
  if (id.includes('dark-slider')) return 'dark-slider'
  if (id.includes('quote-large')) return 'quote-large'
  if (id.includes('grid-compact')) return 'grid-compact'
  if (id.includes('reviews-list')) return 'reviews-list'
  return 'default'
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

// Items avec fallback aux données par défaut
const displayItems = computed(() => {
  const items = props.items && props.items.length > 0 ? props.items : DEFAULT_TESTIMONIAL_ITEMS
  return items.map((item, index) => ({
    ...item,
    avatar: item.avatar || DEFAULT_AVATARS[index % DEFAULT_AVATARS.length],
    text: item.text || 'Témoignage...',
    name: item.name || 'Client',
    role: item.role || 'Entrepreneur',
    company: item.company || '',
    rating: item.rating ?? 5,
  }))
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
  styles.fontSize = fontSizeMap[props.quoteFontSize || 'medium'] || '1rem'
  
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

// Helper initiales
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Rayon de bordure pour images
const cardBorderRadiusMap: Record<string, string> = {
  none: '0',
  small: '0.375rem',
  medium: '0.75rem',
  large: '1.5rem',
}
const cardBorderRadiusValue = computed(() => cardBorderRadiusMap[props.cardBorderRadius || 'medium'] || '0.75rem')

// Couleur de fond pour boutons slider (contraste avec le bg)
const sliderButtonBg = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)'
})
</script>
