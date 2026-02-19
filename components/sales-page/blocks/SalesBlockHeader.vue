<template>
  <header 
    :class="headerClasses"
    :style="headerStyles"
  >
    <div :class="containerClasses" :style="containerStyles">
      <!-- Layout: Logo Left -->
      <template v-if="props.layout !== 'logo-center'">
        <!-- Logo -->
        <div class="flex-shrink-0" :class="{ 'order-2': props.layout === 'logo-right' }">
          <a :href="props.logoLink || '/'" class="block">
            <img 
              v-if="props.logoUrl" 
              :src="props.logoUrl" 
              :alt="props.logoText || 'Logo'"
              :style="logoStyles"
              :class="['md:w-auto md:h-auto', logoClasses]"
              class="logo-responsive"
              @error="handleImageError"
            />
            <span 
              v-if="props.logoText || isEditMode"
              :class="['font-bold text-xl', editableClasses('logoText')]"
              :style="{ color: props.textColor || '#1f2937' }"
              :contenteditable="isEditMode"
              :data-placeholder="'Logo'"
              @focus="onFocus('logoText')"
              @blur="onBlur($event, 'logoText')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
            >{{ props.logoText }}</span>
            <div v-if="!props.logoUrl && !props.logoText" class="h-10 w-28 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded">
              Logo
            </div>
          </a>
        </div>
        
        <!-- Navigation Desktop -->
        <nav 
          v-if="props.showNavigation && props.navItems?.length" 
          class="hidden md:flex items-center"
          :class="[navPositionClasses, { 'order-1': props.layout === 'logo-right' }]"
          :style="navStyles"
        >
          <template v-for="(item, index) in props.navItems" :key="index">
            <!-- Séparateur avant (sauf premier élément) -->
            <span 
              v-if="props.navShowSeparator && index > 0" 
              class="select-none" 
              :style="navSeparatorStyle"
            >{{ navSeparator }}</span>
            
            <!-- Lien de navigation -->
            <a 
              :href="isEditMode ? undefined : (item.url || '#')"
              :class="[
                'nav-link-wrapper',
                linkClasses, 
                editableClasses(`navItems[${index}].text`),
                { 'hover-background': props.navHoverStyle === 'background' }
              ]"
              :style="linkStyles"
              :contenteditable="isEditMode"
              :data-placeholder="'Lien'"
              @focus="onArrayFocus('navItems', index, 'text')"
              @blur="onArrayBlur($event, 'navItems', index, 'text')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
              @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
              @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
            >
              {{ item.text }}
              <!-- Soulignement animé -->
              <span 
                v-if="props.navHoverStyle === 'underline' || props.navHoverStyle === 'border-bottom'"
                class="nav-underline absolute left-0 right-0 transition-all duration-300"
                :class="[
                  props.navHoverStyle === 'underline' ? 'bottom-0' : '-bottom-1',
                  props.navHoverAnimation === 'slide' ? 'underline-slide' : '',
                  props.navHoverAnimation === 'expand' ? 'underline-expand' : '',
                  props.navHoverAnimation === 'fade' ? 'underline-fade' : '',
                  props.navHoverAnimation === 'none' ? 'underline-fade' : ''
                ]"
                :style="{
                  backgroundColor: props.navUnderlineColor || '#10b981',
                  height: `${props.navUnderlineHeight || 2}px`
                }"
              ></span>
            </a>
          </template>
        </nav>
        
        <!-- CTA Buttons -->
        <div v-if="props.showCta || props.showSecondCta" :class="{ 'order-3': props.layout === 'logo-right' }" class="hidden md:flex items-center gap-3 ml-6">
          <!-- Primary CTA -->
          <a 
            v-if="props.showCta"
            :href="isEditMode ? undefined : (props.ctaUrl || '#')"
            :class="[ctaClasses, editableClasses('ctaText')]"
            :style="ctaStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Bouton'"
            @focus="onFocus('ctaText')"
            @blur="onBlur($event, 'ctaText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >
            <!-- Icône gauche -->
            <component 
              v-if="props.ctaIcon && props.ctaIconPosition === 'left'" 
              :is="getCtaIcon" 
              :style="{ width: `${props.ctaIconSize || 16}px`, height: `${props.ctaIconSize || 16}px` }"
            />
            <span>{{ props.ctaText || 'Acheter' }}</span>
            <!-- Icône droite -->
            <component 
              v-if="props.ctaIcon && props.ctaIconPosition !== 'left'" 
              :is="getCtaIcon" 
              :style="{ width: `${props.ctaIconSize || 16}px`, height: `${props.ctaIconSize || 16}px` }"
            />
            <!-- Slide effect overlay -->
            <span v-if="props.ctaHoverEffect === 'slide'" class="cta-slide-overlay"></span>
          </a>
          
          <!-- Secondary CTA -->
          <a 
            v-if="props.showSecondCta"
            :href="isEditMode ? undefined : (props.secondCtaUrl || '#')"
            :class="[secondCtaClasses, editableClasses('secondCtaText')]"
            :style="secondCtaStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Bouton 2'"
            @focus="onFocus('secondCtaText')"
            @blur="onBlur($event, 'secondCtaText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.secondCtaText || 'En savoir plus' }}</a>
        </div>
        
        <!-- Mobile Menu Toggle -->
        <button 
          v-if="(props.showNavigation && props.navItems?.length) || props.showCta"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 transition-colors"
          :style="{ color: props.textColor || '#1f2937' }"
        >
          <svg v-if="props.mobileMenuIcon !== 'dots'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </template>
      
      <!-- Layout: Logo Center -->
      <template v-else>
        <!-- Nav Left -->
        <nav 
          v-if="props.showNavigation && leftNavItems.length" 
          class="hidden md:flex items-center flex-1"
          :style="navStyles"
        >
          <template v-for="(item, index) in leftNavItems" :key="index">
            <!-- Séparateur avant (sauf premier élément) -->
            <span 
              v-if="props.navShowSeparator && index > 0" 
              class="select-none" 
              :style="navSeparatorStyle"
            >{{ navSeparator }}</span>
            
            <!-- Lien de navigation -->
            <a 
              :href="isEditMode ? undefined : (item.url || '#')"
              :class="[
                'nav-link-wrapper',
                linkClasses, 
                editableClasses(`navItems[${index}].text`),
                { 'hover-background': props.navHoverStyle === 'background' }
              ]"
              :style="linkStyles"
              :contenteditable="isEditMode"
              :data-placeholder="'Lien'"
              @focus="onArrayFocus('navItems', index, 'text')"
              @blur="onArrayBlur($event, 'navItems', index, 'text')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
              @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
              @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
            >
              {{ item.text }}
              <!-- Soulignement animé -->
              <span 
                v-if="props.navHoverStyle === 'underline' || props.navHoverStyle === 'border-bottom'"
                class="nav-underline absolute left-0 right-0 transition-all duration-300"
                :class="[
                  props.navHoverStyle === 'underline' ? 'bottom-0' : '-bottom-1',
                  props.navHoverAnimation === 'slide' ? 'underline-slide' : '',
                  props.navHoverAnimation === 'expand' ? 'underline-expand' : '',
                  props.navHoverAnimation === 'fade' ? 'underline-fade' : '',
                  props.navHoverAnimation === 'none' ? 'underline-fade' : ''
                ]"
                :style="{
                  backgroundColor: props.navUnderlineColor || '#10b981',
                  height: `${props.navUnderlineHeight || 2}px`
                }"
              ></span>
            </a>
          </template>
        </nav>
        
        <!-- Logo Center -->
        <div class="flex-shrink-0">
          <a :href="props.logoLink || '/'" class="block">
            <img 
              v-if="props.logoUrl" 
              :src="props.logoUrl" 
              :alt="props.logoText || 'Logo'"
              :style="logoStyles"
              :class="['md:w-auto md:h-auto', logoClasses]"
              class="logo-responsive"
              @error="handleImageError"
            />
            <span 
              v-if="props.logoText || isEditMode"
              :class="['font-bold text-xl', editableClasses('logoText')]"
              :style="{ color: props.textColor || '#1f2937' }"
              :contenteditable="isEditMode"
              :data-placeholder="'Logo'"
              @focus="onFocus('logoText')"
              @blur="onBlur($event, 'logoText')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
            >{{ props.logoText }}</span>
            <div v-if="!props.logoUrl && !props.logoText" class="h-10 w-28 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded">
              Logo
            </div>
          </a>
        </div>
        
        <!-- Nav Right + CTA -->
        <div class="hidden md:flex items-center flex-1 justify-end" :style="navStyles">
          <nav v-if="props.showNavigation && rightNavItems.length" class="flex items-center">
            <template v-for="(item, navIdx) in rightNavItems" :key="navIdx">
              <!-- Séparateur avant (sauf premier élément) -->
              <span 
                v-if="props.navShowSeparator && navIdx > 0" 
                class="select-none" 
                :style="navSeparatorStyle"
              >{{ navSeparator }}</span>
              
              <!-- Lien de navigation -->
              <a 
                :href="isEditMode ? undefined : (item.url || '#')"
                :class="[
                  'nav-link-wrapper',
                  linkClasses, 
                  editableClasses(`navItems[${leftNavItems.length + navIdx}].text`),
                  { 'hover-background': props.navHoverStyle === 'background' }
                ]"
                :style="linkStyles"
                :contenteditable="isEditMode"
                :data-placeholder="'Lien'"
                @focus="onArrayFocus('navItems', leftNavItems.length + navIdx, 'text')"
                @blur="onArrayBlur($event, 'navItems', leftNavItems.length + navIdx, 'text')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
                @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
                @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
              >
                {{ item.text }}
                <!-- Soulignement animé -->
                <span 
                  v-if="props.navHoverStyle === 'underline' || props.navHoverStyle === 'border-bottom'"
                  class="nav-underline absolute left-0 right-0 transition-all duration-300"
                  :class="[
                    props.navHoverStyle === 'underline' ? 'bottom-0' : '-bottom-1',
                    props.navHoverAnimation === 'slide' ? 'underline-slide' : '',
                    props.navHoverAnimation === 'expand' ? 'underline-expand' : '',
                    props.navHoverAnimation === 'fade' ? 'underline-fade' : '',
                    props.navHoverAnimation === 'none' ? 'underline-fade' : ''
                  ]"
                  :style="{
                    backgroundColor: props.navUnderlineColor || '#10b981',
                    height: `${props.navUnderlineHeight || 2}px`
                  }"
                ></span>
              </a>
            </template>
          </nav>
          
          <!-- CTA Buttons (layout center) -->
          <div v-if="props.showCta || props.showSecondCta" class="flex items-center gap-3 ml-6">
            <a 
              v-if="props.showCta"
              :href="isEditMode ? undefined : (props.ctaUrl || '#')"
              :class="[ctaClasses, editableClasses('ctaText')]"
              :style="ctaStyles"
              :contenteditable="isEditMode"
              :data-placeholder="'Bouton'"
              @focus="onFocus('ctaText')"
              @blur="onBlur($event, 'ctaText')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
            >
              <component 
                v-if="props.ctaIcon && props.ctaIconPosition === 'left'" 
                :is="getCtaIcon" 
                :style="{ width: `${props.ctaIconSize || 16}px`, height: `${props.ctaIconSize || 16}px` }"
              />
              <span>{{ props.ctaText || 'Acheter' }}</span>
              <component 
                v-if="props.ctaIcon && props.ctaIconPosition !== 'left'" 
                :is="getCtaIcon" 
                :style="{ width: `${props.ctaIconSize || 16}px`, height: `${props.ctaIconSize || 16}px` }"
              />
              <span v-if="props.ctaHoverEffect === 'slide'" class="cta-slide-overlay"></span>
            </a>
            <a 
              v-if="props.showSecondCta"
              :href="isEditMode ? undefined : (props.secondCtaUrl || '#')"
              :class="[secondCtaClasses, editableClasses('secondCtaText')]"
              :style="secondCtaStyles"
              :contenteditable="isEditMode"
              :data-placeholder="'Bouton 2'"
              @focus="onFocus('secondCtaText')"
              @blur="onBlur($event, 'secondCtaText')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
            >{{ props.secondCtaText || 'En savoir plus' }}</a>
          </div>
        </div>
        
        <!-- Mobile Toggle -->
        <button 
          v-if="(props.showNavigation && props.navItems?.length) || props.showCta"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2"
          :style="{ color: props.textColor || '#1f2937' }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </template>
    </div>
    
    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="mobileMenuOpen && props.mobileShowOverlay && (props.mobileMenuStyle === 'fullscreen' || props.mobileMenuStyle === 'sidebar')"
        class="fixed inset-0 z-30 md:hidden"
        :style="mobileOverlayStyles"
        @click="handleOverlayClick"
      ></div>
    </Transition>
    
    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      :enter-from-class="mobileMenuTransitionFrom"
      :enter-to-class="mobileMenuTransitionTo"
      :leave-from-class="mobileMenuTransitionTo"
      :leave-to-class="mobileMenuTransitionFrom"
    >
      <div 
        v-if="mobileMenuOpen"
        :class="mobileMenuClasses"
        :style="mobileMenuStyles"
      >
        <!-- Close button for fullscreen/sidebar -->
        <button 
          v-if="props.mobileShowCloseButton && (props.mobileMenuStyle === 'fullscreen' || props.mobileMenuStyle === 'sidebar')"
          @click="mobileMenuOpen = false"
          class="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors z-50"
          :style="{ color: props.textColor || '#1f2937' }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div :class="mobileMenuContainerClasses">
          <!-- Nav Links -->
          <nav v-if="props.showNavigation && props.navItems?.length" class="flex flex-col">
            <a 
              v-for="(item, index) in props.navItems" 
              :key="index"
              :href="item.url || '#'"
              :class="mobileLinkClasses"
              :style="mobileLinkStyles"
              @click="mobileMenuOpen = false"
            >
              {{ item.text }}
            </a>
          </nav>
          
          <!-- CTA Mobile -->
          <div v-if="props.showCta" class="px-4 pt-4">
            <a 
              :href="props.ctaUrl || '#'"
              :class="ctaClasses"
              :style="{ ...ctaStyles, width: '100%', display: 'block', textAlign: 'center' }"
              @click="mobileMenuOpen = false"
            >
              {{ props.ctaText || 'Acheter' }}
            </a>
          </div>
          
          <!-- Second CTA Mobile -->
          <div v-if="props.showSecondCta" class="px-4 pt-3">
            <a 
              :href="props.secondCtaUrl || '#'"
              :class="secondCtaClasses"
              :style="{ ...secondCtaStyles, width: '100%', display: 'block', textAlign: 'center' }"
              @click="mobileMenuOpen = false"
            >
              {{ props.secondCtaText || 'En savoir plus' }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInlineEdit } from '~/composables/useInlineEdit'
import { 
  ArrowRight, ArrowLeft, ShoppingCart, Check, ChevronRight, 
  ExternalLink, Download, Play, Heart, Star, Zap, Send
} from 'lucide-vue-next'

// Map des icônes disponibles
const iconMap: Record<string, any> = {
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'cart': ShoppingCart,
  'check': Check,
  'chevron-right': ChevronRight,
  'external-link': ExternalLink,
  'download': Download,
  'play': Play,
  'heart': Heart,
  'star': Star,
  'zap': Zap,
  'send': Send,
}

interface NavItem {
  text: string
  url?: string
}

interface Props {
  blockId?: string
  // Logo - Base
  logoUrl?: string | null
  logoText?: string
  logoWidth?: number
  logoHeight?: number
  logoLink?: string
  // Logo - Ajustement
  logoObjectFit?: 'contain' | 'cover' | 'fill' | 'none'
  logoObjectPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  logoOpacity?: number
  // Logo - Style
  logoBorderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  logoShadow?: 'none' | 'small' | 'medium' | 'large'
  logoShowBorder?: boolean
  logoBorderColor?: string
  logoBorderWidth?: number
  // Logo - Effets au survol
  logoHoverEffect?: 'none' | 'scale' | 'brightness' | 'opacity' | 'shadow' | 'lift'
  logoHoverScale?: number
  // Logo - Filtres
  logoFilter?: 'none' | 'grayscale' | 'sepia' | 'brightness' | 'contrast'
  logoFilterIntensity?: number
  logoFilterHoverReset?: boolean
  // Logo - Responsive
  logoMobileWidth?: number
  logoMobileHeight?: number
  logoHideOnMobile?: boolean
  // Logo - Animation
  logoAnimation?: 'none' | 'fade' | 'slide-up' | 'scale' | 'bounce'
  // Navigation
  showNavigation?: boolean
  navItems?: NavItem[]
  navPosition?: 'left' | 'center' | 'right'
  navGap?: 'small' | 'medium' | 'large' | 'xlarge'
  // Navigation - Padding des liens
  navLinkPaddingX?: number
  navLinkPaddingY?: number
  // Navigation - Style de survol
  navHoverStyle?: 'none' | 'underline' | 'background' | 'border-bottom'
  navHoverAnimation?: 'none' | 'slide' | 'fade' | 'expand'
  navHoverBgColor?: string
  navUnderlineHeight?: number
  navUnderlineColor?: string
  // Navigation - Séparateurs
  navShowSeparator?: boolean
  navSeparatorType?: 'pipe' | 'dot' | 'slash' | 'dash'
  navSeparatorColor?: string
  // Navigation - Lien actif
  navActiveStyle?: 'none' | 'color' | 'underline' | 'background' | 'bold'
  navActiveColor?: string
  // CTA
  showCta?: boolean
  ctaText?: string
  ctaUrl?: string
  ctaBgColor?: string
  ctaTextColor?: string
  ctaRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  ctaSize?: 'small' | 'medium' | 'large'
  ctaPaddingX?: number
  ctaPaddingY?: number
  ctaShadow?: 'none' | 'small' | 'medium' | 'large'
  // CTA - Icône
  ctaIcon?: string
  ctaIconPosition?: 'left' | 'right'
  ctaIconSize?: number
  ctaIconGap?: number
  // CTA - Bordure
  ctaShowBorder?: boolean
  ctaBorderStyle?: 'solid' | 'dashed' | 'dotted'
  ctaBorderColor?: string
  ctaBorderWidth?: number
  // CTA - Effets survol
  ctaHoverEffect?: 'none' | 'scale' | 'glow' | 'lift' | 'slide' | 'inverse'
  ctaHoverBgColor?: string
  ctaHoverTextColor?: string
  ctaHoverScale?: number
  // CTA - Animation
  ctaAnimation?: 'none' | 'pulse' | 'bounce' | 'shimmer'
  // CTA - Second bouton
  showSecondCta?: boolean
  secondCtaText?: string
  secondCtaUrl?: string
  secondCtaStyle?: 'outline' | 'ghost' | 'link'
  secondCtaColor?: string
  // Apparence
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  backgroundColor?: string
  gradientStart?: string
  gradientEnd?: string
  gradientDirection?: string
  height?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom'
  heightCustom?: number
  paddingX?: 'small' | 'medium' | 'large' | 'xlarge'
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl' | '4xl'
  sticky?: boolean
  scrollEffect?: 'none' | 'shadow' | 'shrink' | 'color'
  scrollBgColor?: string
  // Bordure
  showBorder?: boolean
  borderWidth?: string
  borderColor?: string
  shadow?: 'none' | 'small' | 'medium' | 'large'
  // Typographie
  textColor?: string
  fontFamily?: string
  fontSize?: 'xs' | 'sm' | 'base' | 'lg'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: 'tight' | 'normal' | 'wide' | 'wider'
  hoverColor?: string
  // Layout
  layout?: 'logo-left' | 'logo-center' | 'logo-right'
  alignItems?: 'start' | 'center' | 'end'
  // Mobile - Base
  mobileMenuIcon?: 'bars' | 'dots'
  mobileMenuStyle?: 'dropdown' | 'fullscreen' | 'sidebar'
  mobileMenuBg?: string
  // Mobile - Overlay
  mobileShowOverlay?: boolean
  mobileOverlayColor?: string
  mobileOverlayOpacity?: number
  // Mobile - Animation
  mobileMenuAnimation?: 'none' | 'slide' | 'fade' | 'scale'
  // Mobile - Style des liens
  mobileLinkPaddingX?: number
  mobileLinkPaddingY?: number
  mobileLinkFontSize?: 'sm' | 'base' | 'lg' | 'xl'
  mobileLinkFontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  mobileLinkShowBorder?: boolean
  mobileLinkBorderColor?: string
  // Mobile - Comportement
  mobileShowCloseButton?: boolean
  mobileCloseOnOverlayClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  // Logo - Base
  logoUrl: null,
  logoText: '',
  logoWidth: 120,
  logoHeight: 40,
  logoLink: '/',
  // Logo - Ajustement
  logoObjectFit: 'contain',
  logoObjectPosition: 'center',
  logoOpacity: 100,
  // Logo - Style
  logoBorderRadius: 'none',
  logoShadow: 'none',
  logoShowBorder: false,
  logoBorderColor: '#e5e7eb',
  logoBorderWidth: 1,
  // Logo - Effets au survol
  logoHoverEffect: 'none',
  logoHoverScale: 105,
  // Logo - Filtres
  logoFilter: 'none',
  logoFilterIntensity: 100,
  logoFilterHoverReset: true,
  // Logo - Responsive
  logoMobileWidth: 100,
  logoMobileHeight: 32,
  logoHideOnMobile: false,
  // Logo - Animation
  logoAnimation: 'none',
  // Navigation
  showNavigation: true,
  navItems: () => [
    { text: 'Accueil', url: '#' },
    { text: 'À propos', url: '#' },
  ],
  navPosition: 'right',
  navGap: 'medium',
  // Navigation - Padding des liens
  navLinkPaddingX: 0,
  navLinkPaddingY: 0,
  // Navigation - Style de survol
  navHoverStyle: 'none',
  navHoverAnimation: 'none',
  navHoverBgColor: '#f3f4f6',
  navUnderlineHeight: 2,
  navUnderlineColor: '#10b981',
  // Navigation - Séparateurs
  navShowSeparator: false,
  navSeparatorType: 'pipe',
  navSeparatorColor: '#d1d5db',
  // Navigation - Lien actif
  navActiveStyle: 'none',
  navActiveColor: '#10b981',
  // CTA
  showCta: true,
  ctaText: 'Acheter',
  ctaUrl: '#',
  ctaBgColor: '#10b981',
  ctaTextColor: '#ffffff',
  ctaRadius: 'medium',
  ctaSize: 'medium',
  ctaPaddingX: 24,
  ctaPaddingY: 12,
  ctaShadow: 'none',
  // CTA - Icône
  ctaIcon: '',
  ctaIconPosition: 'right',
  ctaIconSize: 16,
  ctaIconGap: 8,
  // CTA - Bordure
  ctaShowBorder: false,
  ctaBorderStyle: 'solid',
  ctaBorderColor: '#10b981',
  ctaBorderWidth: 2,
  // CTA - Effets survol
  ctaHoverEffect: 'none',
  ctaHoverBgColor: '#059669',
  ctaHoverTextColor: '#ffffff',
  ctaHoverScale: 105,
  // CTA - Animation
  ctaAnimation: 'none',
  // CTA - Second bouton
  showSecondCta: false,
  secondCtaText: 'En savoir plus',
  secondCtaUrl: '#',
  secondCtaStyle: 'outline',
  secondCtaColor: '#10b981',
  // Apparence
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  gradientStart: '#ffffff',
  gradientEnd: '#f3f4f6',
  gradientDirection: 'to-r',
  height: 'medium',
  heightCustom: 70,
  paddingX: 'medium',
  maxWidth: 'full',
  sticky: false,
  scrollEffect: 'none',
  scrollBgColor: '#ffffff',
  showBorder: true,
  borderWidth: '1',
  borderColor: '#e5e7eb',
  shadow: 'small',
  textColor: '#1f2937',
  fontFamily: '',
  fontSize: 'sm',
  fontWeight: 'medium',
  textTransform: 'none',
  letterSpacing: 'normal',
  hoverColor: '#10b981',
  layout: 'logo-left',
  alignItems: 'center',
  // Mobile - Base
  mobileMenuIcon: 'bars',
  mobileMenuStyle: 'dropdown',
  mobileMenuBg: '#ffffff',
  // Mobile - Overlay
  mobileShowOverlay: false,
  mobileOverlayColor: '#000000',
  mobileOverlayOpacity: 50,
  // Mobile - Animation
  mobileMenuAnimation: 'none',
  // Mobile - Style des liens
  mobileLinkPaddingX: 16,
  mobileLinkPaddingY: 12,
  mobileLinkFontSize: 'base',
  mobileLinkFontWeight: 'medium',
  mobileLinkShowBorder: false,
  mobileLinkBorderColor: '#e5e7eb',
  // Mobile - Comportement
  mobileShowCloseButton: true,
  mobileCloseOnOverlayClick: true,
})

const mobileMenuOpen = ref(false)

// Gérer les erreurs de chargement d'image
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

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

// Split nav items for center layout
const leftNavItems = computed(() => {
  const items = props.navItems || []
  return items.slice(0, Math.ceil(items.length / 2))
})

const rightNavItems = computed(() => {
  const items = props.navItems || []
  return items.slice(Math.ceil(items.length / 2))
})

// Classes
const headerClasses = computed(() => {
  const classes = ['relative', 'z-50']
  if (props.sticky) classes.push('sticky', 'top-0')
  return classes.join(' ')
})

const headerStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Background
  if (props.backgroundType === 'transparent') {
    styles.backgroundColor = 'transparent'
  } else if (props.backgroundType === 'gradient') {
    const dir = props.gradientDirection || 'to-r'
    const dirMap: Record<string, string> = {
      'to-r': 'to right',
      'to-l': 'to left',
      'to-b': 'to bottom',
      'to-t': 'to top',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
    }
    styles.background = `linear-gradient(${dirMap[dir] || 'to right'}, ${props.gradientStart}, ${props.gradientEnd})`
  } else {
    styles.backgroundColor = props.backgroundColor || '#ffffff'
  }
  
  // Border
  if (props.showBorder) {
    styles.borderBottom = `${props.borderWidth}px solid ${props.borderColor}`
  }
  
  // Shadow
  const shadowMap: Record<string, string> = {
    none: 'none',
    small: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
  if (props.shadow && props.shadow !== 'none') {
    styles.boxShadow = shadowMap[props.shadow] || 'none'
  }
  
  return styles
})

const containerClasses = computed(() => {
  const classes = ['flex', 'items-center']
  
  // Max width
  if (props.maxWidth !== 'full') {
    const maxWidthMap: Record<string, string> = {
      '7xl': 'max-w-7xl',
      '6xl': 'max-w-6xl',
      '5xl': 'max-w-5xl',
      '4xl': 'max-w-4xl',
    }
    classes.push(maxWidthMap[props.maxWidth] || 'max-w-7xl', 'mx-auto')
  }
  
  // Justify content based on layout
  if (props.layout === 'logo-center') {
    classes.push('justify-between')
  } else {
    classes.push('justify-between')
  }
  
  return classes.join(' ')
})

const containerStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Height
  const heightMap: Record<string, string> = {
    small: '48px',
    medium: '64px',
    large: '80px',
    xlarge: '100px',
  }
  styles.height = props.height === 'custom' 
    ? `${props.heightCustom}px` 
    : (heightMap[props.height || 'medium'] || '64px')
  
  // Padding X
  const paddingMap: Record<string, string> = {
    small: '16px',
    medium: '24px',
    large: '48px',
    xlarge: '64px',
  }
  styles.paddingLeft = paddingMap[props.paddingX || 'medium'] || '24px'
  styles.paddingRight = paddingMap[props.paddingX || 'medium'] || '24px'
  
  return styles
})

const logoStyles = computed(() => {
  const styles: Record<string, string> = {
    width: `${props.logoWidth}px`,
    height: `${props.logoHeight}px`,
  }
  
  // Object-fit
  styles.objectFit = props.logoObjectFit || 'contain'
  
  // Object-position
  styles.objectPosition = props.logoObjectPosition || 'center'
  
  // Opacité
  if (props.logoOpacity !== undefined && props.logoOpacity < 100) {
    styles.opacity = String(props.logoOpacity / 100)
  }
  
  // Border-radius
  const radiusMap: Record<string, string> = {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px',
  }
  if (props.logoBorderRadius && props.logoBorderRadius !== 'none') {
    styles.borderRadius = radiusMap[props.logoBorderRadius]
  }
  
  // Ombre
  const shadowMap: Record<string, string> = {
    none: 'none',
    small: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
  if (props.logoShadow && props.logoShadow !== 'none') {
    styles.boxShadow = shadowMap[props.logoShadow]
  }
  
  // Bordure
  if (props.logoShowBorder) {
    styles.border = `${props.logoBorderWidth || 1}px solid ${props.logoBorderColor || '#e5e7eb'}`
  }
  
  // Filtres
  if (props.logoFilter && props.logoFilter !== 'none') {
    const intensity = props.logoFilterIntensity || 100
    const filterMap: Record<string, string> = {
      grayscale: `grayscale(${intensity}%)`,
      sepia: `sepia(${intensity}%)`,
      brightness: `brightness(${intensity}%)`,
      contrast: `contrast(${intensity}%)`,
    }
    styles.filter = filterMap[props.logoFilter]
  }
  
  // Transition pour les effets hover
  styles.transition = 'all 0.3s ease'
  
  return styles
})

// Classes CSS pour le logo (hover, animation, responsive)
const logoClasses = computed(() => {
  const classes: string[] = []
  
  // Animation au chargement
  if (props.logoAnimation && props.logoAnimation !== 'none') {
    const animationMap: Record<string, string> = {
      fade: 'animate-fade',
      'slide-up': 'animate-slide-up',
      scale: 'animate-scale',
      bounce: 'animate-bounce',
    }
    classes.push(animationMap[props.logoAnimation])
  }
  
  // Masquer sur mobile
  if (props.logoHideOnMobile) {
    classes.push('hidden md:block')
  }
  
  // Effet au survol
  if (props.logoHoverEffect && props.logoHoverEffect !== 'none') {
    const hoverMap: Record<string, string> = {
      scale: 'hover:scale-105',
      brightness: 'hover:brightness-110',
      opacity: 'hover:opacity-80',
      shadow: 'hover:shadow-lg',
      lift: 'hover:-translate-y-1 hover:shadow-lg',
    }
    classes.push(hoverMap[props.logoHoverEffect], 'transition-all', 'duration-300')
  }
  
  // Reset filtre au survol
  if (props.logoFilterHoverReset && props.logoFilter !== 'none') {
    classes.push('hover:filter-none')
  }
  
  return classes.join(' ')
})

// Styles responsive pour mobile
const logoMobileStyles = computed(() => {
  return {
    '--logo-mobile-width': `${props.logoMobileWidth || 100}px`,
    '--logo-mobile-height': `${props.logoMobileHeight || 32}px`,
  }
})

const navPositionClasses = computed(() => {
  if (props.layout === 'logo-center') return ''
  
  const posMap: Record<string, string> = {
    left: 'mr-auto ml-8',
    center: 'mx-auto',
    right: 'ml-auto',
  }
  return posMap[props.navPosition || 'right']
})

const navStyles = computed(() => {
  const gapMap: Record<string, string> = {
    small: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
  }
  return {
    gap: gapMap[props.navGap || 'medium'],
  }
})

const linkClasses = computed(() => {
  const classes = ['transition-all', 'duration-200', 'relative']
  
  // Font size
  const sizeMap: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  }
  classes.push(sizeMap[props.fontSize || 'sm'])
  
  // Font weight
  const weightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  classes.push(weightMap[props.fontWeight || 'medium'])
  
  // Text transform
  if (props.textTransform && props.textTransform !== 'none') {
    classes.push(props.textTransform)
  }
  
  // Letter spacing
  const spacingMap: Record<string, string> = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
  }
  classes.push(spacingMap[props.letterSpacing || 'normal'])
  
  // Style de survol - classes CSS
  if (props.navHoverStyle === 'background') {
    classes.push('hover:rounded')
  }
  
  return classes.join(' ')
})

const linkStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.textColor || '#1f2937',
  }
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Padding des liens
  if (props.navLinkPaddingX && props.navLinkPaddingX > 0) {
    styles.paddingLeft = `${props.navLinkPaddingX}px`
    styles.paddingRight = `${props.navLinkPaddingX}px`
  }
  if (props.navLinkPaddingY && props.navLinkPaddingY > 0) {
    styles.paddingTop = `${props.navLinkPaddingY}px`
    styles.paddingBottom = `${props.navLinkPaddingY}px`
  }
  
  // Variables CSS pour les effets au survol
  styles['--hover-color'] = props.hoverColor || '#10b981'
  styles['--hover-bg'] = props.navHoverBgColor || '#f3f4f6'
  styles['--underline-color'] = props.navUnderlineColor || '#10b981'
  styles['--underline-height'] = `${props.navUnderlineHeight || 2}px`
  
  return styles
})

// Styles pour l'effet de soulignement animé
const linkHoverStyles = computed(() => {
  if (!props.navHoverStyle || props.navHoverStyle === 'none') return {}
  
  const styles: Record<string, string> = {}
  
  if (props.navHoverStyle === 'underline' || props.navHoverStyle === 'border-bottom') {
    styles.position = 'relative'
  }
  
  return styles
})

// Séparateur de navigation
const navSeparator = computed(() => {
  if (!props.navShowSeparator) return ''
  
  const separatorMap: Record<string, string> = {
    pipe: '|',
    dot: '•',
    slash: '/',
    dash: '—',
  }
  return separatorMap[props.navSeparatorType || 'pipe']
})

const navSeparatorStyle = computed(() => {
  return {
    color: props.navSeparatorColor || '#d1d5db',
    margin: '0 8px',
  }
})

function onLinkHover(e: MouseEvent, isHover: boolean) {
  const target = e.target as HTMLElement
  const hoverStyle = props.navHoverStyle || 'none'
  const hoverAnimation = props.navHoverAnimation || 'none'
  
  // Couleur de texte
  target.style.color = isHover ? (props.hoverColor || '#10b981') : (props.textColor || '#1f2937')
  
  // Fond au survol
  if (hoverStyle === 'background') {
    target.style.backgroundColor = isHover ? (props.navHoverBgColor || '#f3f4f6') : 'transparent'
  }
  
  // Soulignement
  if (hoverStyle === 'underline' || hoverStyle === 'border-bottom') {
    const underline = target.querySelector('.nav-underline') as HTMLElement
    if (underline) {
      if (hoverAnimation === 'slide') {
        underline.style.transform = isHover ? 'scaleX(1)' : 'scaleX(0)'
      } else if (hoverAnimation === 'expand') {
        underline.style.width = isHover ? '100%' : '0'
      } else if (hoverAnimation === 'fade') {
        underline.style.opacity = isHover ? '1' : '0'
      } else {
        underline.style.opacity = isHover ? '1' : '0'
      }
    }
  }
}

const ctaClasses = computed(() => {
  const classes = ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'transition-all', 'duration-200']
  
  // Radius
  const radiusMap: Record<string, string> = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-2xl',
    full: 'rounded-full',
  }
  classes.push(radiusMap[props.ctaRadius || 'medium'])
  
  // Animation
  if (props.ctaAnimation === 'pulse') {
    classes.push('cta-pulse')
  } else if (props.ctaAnimation === 'bounce') {
    classes.push('cta-bounce')
  } else if (props.ctaAnimation === 'shimmer') {
    classes.push('cta-shimmer')
  }
  
  // Hover effect classes
  if (props.ctaHoverEffect === 'scale') {
    classes.push('cta-hover-scale')
  } else if (props.ctaHoverEffect === 'glow') {
    classes.push('cta-hover-glow')
  } else if (props.ctaHoverEffect === 'lift') {
    classes.push('cta-hover-lift')
  } else if (props.ctaHoverEffect === 'slide') {
    classes.push('cta-hover-slide', 'overflow-hidden', 'relative')
  } else if (props.ctaHoverEffect === 'inverse') {
    classes.push('cta-hover-inverse')
  }
  
  return classes.join(' ')
})

const ctaStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.ctaBgColor || '#10b981',
    color: props.ctaTextColor || '#ffffff',
    paddingLeft: `${props.ctaPaddingX || 24}px`,
    paddingRight: `${props.ctaPaddingX || 24}px`,
    paddingTop: `${props.ctaPaddingY || 12}px`,
    paddingBottom: `${props.ctaPaddingY || 12}px`,
  }
  
  // Size adjustments
  const sizeMap: Record<string, { fontSize: string }> = {
    small: { fontSize: '12px' },
    medium: { fontSize: '14px' },
    large: { fontSize: '16px' },
  }
  const size = sizeMap[props.ctaSize || 'medium']
  styles.fontSize = size.fontSize
  
  // Shadow
  const shadowMap: Record<string, string> = {
    none: 'none',
    small: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
  if (props.ctaShadow && props.ctaShadow !== 'none') {
    styles.boxShadow = shadowMap[props.ctaShadow]
  }
  
  // Bordure
  if (props.ctaShowBorder) {
    styles.border = `${props.ctaBorderWidth || 2}px ${props.ctaBorderStyle || 'solid'} ${props.ctaBorderColor || '#10b981'}`
  }
  
  // Gap pour icône
  if (props.ctaIcon) {
    styles.gap = `${props.ctaIconGap || 8}px`
  }
  
  // Variables CSS pour hover
  styles['--cta-hover-bg'] = props.ctaHoverBgColor || '#059669'
  styles['--cta-hover-text'] = props.ctaHoverTextColor || '#ffffff'
  styles['--cta-hover-scale'] = `${(props.ctaHoverScale || 105) / 100}`
  styles['--cta-bg'] = props.ctaBgColor || '#10b981'
  styles['--cta-text'] = props.ctaTextColor || '#ffffff'
  
  return styles
})

// Second CTA styles
const secondCtaClasses = computed(() => {
  const classes = ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'transition-all', 'duration-200']
  
  // Radius (same as primary)
  const radiusMap: Record<string, string> = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-2xl',
    full: 'rounded-full',
  }
  classes.push(radiusMap[props.ctaRadius || 'medium'])
  
  return classes.join(' ')
})

const secondCtaStyles = computed(() => {
  const color = props.secondCtaColor || '#10b981'
  const style = props.secondCtaStyle || 'outline'
  
  const styles: Record<string, string> = {
    paddingLeft: `${props.ctaPaddingX || 24}px`,
    paddingRight: `${props.ctaPaddingX || 24}px`,
    paddingTop: `${props.ctaPaddingY || 12}px`,
    paddingBottom: `${props.ctaPaddingY || 12}px`,
  }
  
  // Size
  const sizeMap: Record<string, { fontSize: string }> = {
    small: { fontSize: '12px' },
    medium: { fontSize: '14px' },
    large: { fontSize: '16px' },
  }
  styles.fontSize = sizeMap[props.ctaSize || 'medium'].fontSize
  
  if (style === 'outline') {
    styles.backgroundColor = 'transparent'
    styles.color = color
    styles.border = `2px solid ${color}`
  } else if (style === 'ghost') {
    styles.backgroundColor = 'transparent'
    styles.color = color
    styles.border = 'none'
  } else if (style === 'link') {
    styles.backgroundColor = 'transparent'
    styles.color = color
    styles.border = 'none'
    styles.padding = '0'
    styles.textDecoration = 'underline'
  }
  
  return styles
})

// Computed pour l'icône CTA
const getCtaIcon = computed(() => {
  if (!props.ctaIcon) return null
  return iconMap[props.ctaIcon] || null
})

// Mobile menu
const mobileMenuTransitionFrom = computed(() => {
  const animation = props.mobileMenuAnimation || 'none'
  const style = props.mobileMenuStyle || 'dropdown'
  
  // Animation personnalisée
  if (animation !== 'none') {
    switch (animation) {
      case 'slide':
        return style === 'sidebar' ? 'translate-x-full' : '-translate-y-4 opacity-0'
      case 'fade':
        return 'opacity-0'
      case 'scale':
        return 'scale-95 opacity-0'
    }
  }
  
  // Animation par défaut selon le style
  if (style === 'fullscreen') return 'opacity-0'
  if (style === 'sidebar') return 'translate-x-full opacity-0'
  return 'opacity-0 -translate-y-2'
})

const mobileMenuTransitionTo = computed(() => {
  const animation = props.mobileMenuAnimation || 'none'
  const style = props.mobileMenuStyle || 'dropdown'
  
  // Animation personnalisée
  if (animation !== 'none') {
    switch (animation) {
      case 'slide':
        return style === 'sidebar' ? 'translate-x-0' : 'translate-y-0 opacity-100'
      case 'fade':
        return 'opacity-100'
      case 'scale':
        return 'scale-100 opacity-100'
    }
  }
  
  // Animation par défaut selon le style
  if (style === 'fullscreen') return 'opacity-100'
  if (style === 'sidebar') return 'translate-x-0 opacity-100'
  return 'opacity-100 translate-y-0'
})

const mobileMenuClasses = computed(() => {
  const base = ['md:hidden']
  
  if (props.mobileMenuStyle === 'fullscreen') {
    base.push('fixed', 'inset-0', 'z-40', 'pt-20')
  } else if (props.mobileMenuStyle === 'sidebar') {
    base.push('fixed', 'top-0', 'right-0', 'h-full', 'w-64', 'z-40', 'pt-20')
  } else {
    base.push('absolute', 'top-full', 'left-0', 'right-0', 'border-t')
  }
  
  return base.join(' ')
})

const mobileMenuStyles = computed(() => {
  return {
    backgroundColor: props.mobileMenuBg || '#ffffff',
  }
})

const mobileMenuContainerClasses = computed(() => {
  if (props.mobileMenuStyle === 'fullscreen') {
    return 'flex flex-col items-center justify-center h-full'
  }
  return 'py-4'
})

// Mobile overlay
const mobileOverlayStyles = computed(() => {
  return {
    backgroundColor: props.mobileOverlayColor || '#000000',
    opacity: (props.mobileOverlayOpacity || 50) / 100,
  }
})

// Mobile link styles
const mobileLinkClasses = computed(() => {
  const classes = ['transition-colors', 'block']
  
  // Font size
  const sizeMap: Record<string, string> = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  classes.push(sizeMap[props.mobileLinkFontSize || 'base'])
  
  // Font weight
  const weightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  classes.push(weightMap[props.mobileLinkFontWeight || 'medium'])
  
  return classes.join(' ')
})

const mobileLinkStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.textColor || '#1f2937',
    paddingLeft: `${props.mobileLinkPaddingX || 16}px`,
    paddingRight: `${props.mobileLinkPaddingX || 16}px`,
    paddingTop: `${props.mobileLinkPaddingY || 12}px`,
    paddingBottom: `${props.mobileLinkPaddingY || 12}px`,
  }
  
  if (props.mobileLinkShowBorder) {
    styles.borderBottom = `1px solid ${props.mobileLinkBorderColor || '#e5e7eb'}`
  }
  
  return styles
})

// Fermer le menu mobile au clic sur l'overlay
const handleOverlayClick = () => {
  if (props.mobileCloseOnOverlayClick !== false) {
    mobileMenuOpen.value = false
  }
}
</script>

<style scoped>
/* Effet de soulignement au survol */
.nav-link-wrapper:hover .nav-underline {
  opacity: 1 !important;
  transform: scaleX(1) !important;
  width: 100% !important;
}

/* Animation slide (de gauche à droite) */
.nav-underline.underline-slide {
  transform: scaleX(0);
  transform-origin: left;
}

/* Animation expand (du centre) */
.nav-underline.underline-expand {
  width: 0;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link-wrapper:hover .nav-underline.underline-expand {
  width: 100%;
}

/* Animation fade */
.nav-underline.underline-fade {
  opacity: 0;
}

/* Style fond au survol */
.nav-link-wrapper.hover-background:hover {
  background-color: var(--hover-bg, #f3f4f6);
  border-radius: 4px;
}

/* Responsive logo */
.logo-responsive {
  width: var(--logo-mobile-width, 100px);
  height: var(--logo-mobile-height, 32px);
}

@media (min-width: 768px) {
  .logo-responsive {
    width: auto;
    height: auto;
  }
}

/* ===== CTA Animations ===== */

/* Pulse animation */
.cta-pulse {
  animation: cta-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes cta-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Bounce animation */
.cta-bounce {
  animation: cta-bounce 1s infinite;
}

@keyframes cta-bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Shimmer animation */
.cta-shimmer {
  position: relative;
  overflow: hidden;
}

.cta-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: cta-shimmer 2s infinite;
}

@keyframes cta-shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Hover effects */
.cta-hover-scale:hover {
  transform: scale(var(--cta-hover-scale, 1.05));
}

.cta-hover-glow:hover {
  box-shadow: 0 0 20px var(--cta-bg, #10b981);
}

.cta-hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.cta-hover-inverse:hover {
  background-color: var(--cta-hover-bg, #059669) !important;
  color: var(--cta-hover-text, #ffffff) !important;
}

/* Slide effect */
.cta-hover-slide .cta-slide-overlay {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--cta-hover-bg, #059669);
  transition: left 0.3s ease;
  z-index: -1;
}

.cta-hover-slide:hover .cta-slide-overlay {
  left: 0;
}

.cta-hover-slide:hover {
  color: var(--cta-hover-text, #ffffff) !important;
}
</style>
