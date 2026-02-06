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
              class="object-contain"
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
          <a 
            v-for="(item, index) in props.navItems" 
            :key="index"
            :href="isEditMode ? undefined : (item.url || '#')"
            :class="[linkClasses, editableClasses(`navItems[${index}].text`)]"
            :style="linkStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Lien'"
            @focus="onArrayFocus('navItems', index, 'text')"
            @blur="onArrayBlur($event, 'navItems', index, 'text')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
            @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
            @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
          >{{ item.text }}</a>
        </nav>
        
        <!-- CTA Button (éditable inline) -->
        <div v-if="props.showCta" :class="{ 'order-3': props.layout === 'logo-right' }" class="hidden md:block ml-6">
          <a 
            :href="isEditMode ? undefined : (props.ctaUrl || '#')"
            :class="[ctaClasses, editableClasses('ctaText')]"
            :style="ctaStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Bouton'"
            @focus="onFocus('ctaText')"
            @blur="onBlur($event, 'ctaText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.ctaText || 'Acheter' }}</a>
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
          <a 
            v-for="(item, index) in leftNavItems" 
            :key="index"
            :href="isEditMode ? undefined : (item.url || '#')"
            :class="[linkClasses, editableClasses(`navItems[${index}].text`)]"
            :style="linkStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Lien'"
            @focus="onArrayFocus('navItems', index, 'text')"
            @blur="onArrayBlur($event, 'navItems', index, 'text')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
            @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
            @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
          >{{ item.text }}</a>
        </nav>
        
        <!-- Logo Center -->
        <div class="flex-shrink-0">
          <a :href="props.logoLink || '/'" class="block">
            <img 
              v-if="props.logoUrl" 
              :src="props.logoUrl" 
              :alt="props.logoText || 'Logo'"
              :style="logoStyles"
              class="object-contain"
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
            <a 
              v-for="(item, navIdx) in rightNavItems" 
              :key="navIdx"
              :href="isEditMode ? undefined : (item.url || '#')"
              :class="[linkClasses, editableClasses(`navItems[${leftNavItems.length + navIdx}].text`)]"
              :style="linkStyles"
              :contenteditable="isEditMode"
              :data-placeholder="'Lien'"
              @focus="onArrayFocus('navItems', leftNavItems.length + navIdx, 'text')"
              @blur="onArrayBlur($event, 'navItems', leftNavItems.length + navIdx, 'text')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
              @mouseenter="(e: MouseEvent) => !isEditMode && onLinkHover(e, true)"
              @mouseleave="(e: MouseEvent) => !isEditMode && onLinkHover(e, false)"
            >{{ item.text }}</a>
          </nav>
          <a 
            v-if="props.showCta"
            :href="isEditMode ? undefined : (props.ctaUrl || '#')"
            :class="[ctaClasses, 'ml-6', editableClasses('ctaText')]"
            :style="ctaStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Bouton'"
            @focus="onFocus('ctaText')"
            @blur="onBlur($event, 'ctaText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.ctaText || 'Acheter' }}</a>
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
        <div :class="mobileMenuContainerClasses">
          <!-- Nav Links -->
          <nav v-if="props.showNavigation && props.navItems?.length" class="flex flex-col">
            <a 
              v-for="(item, index) in props.navItems" 
              :key="index"
              :href="item.url || '#'"
              class="py-3 px-4 text-base font-medium transition-colors"
              :style="{ color: props.textColor || '#1f2937' }"
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
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface NavItem {
  text: string
  url?: string
}

interface Props {
  blockId?: string
  // Logo
  logoUrl?: string | null
  logoText?: string
  logoWidth?: number
  logoHeight?: number
  logoLink?: string
  // Navigation
  showNavigation?: boolean
  navItems?: NavItem[]
  navPosition?: 'left' | 'center' | 'right'
  navGap?: 'small' | 'medium' | 'large' | 'xlarge'
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
  // Mobile
  mobileMenuIcon?: 'bars' | 'dots'
  mobileMenuStyle?: 'dropdown' | 'fullscreen' | 'sidebar'
  mobileMenuBg?: string
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  logoUrl: null,
  logoText: '',
  logoWidth: 120,
  logoHeight: 40,
  logoLink: '/',
  showNavigation: true,
  navItems: () => [
    { text: 'Accueil', url: '#' },
    { text: 'À propos', url: '#' },
  ],
  navPosition: 'right',
  navGap: 'medium',
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
  mobileMenuIcon: 'bars',
  mobileMenuStyle: 'dropdown',
  mobileMenuBg: '#ffffff',
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
  return {
    width: `${props.logoWidth}px`,
    height: `${props.logoHeight}px`,
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
  const classes = ['transition-colors', 'duration-200']
  
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
  
  return classes.join(' ')
})

const linkStyles = computed(() => {
  const styles: Record<string, string> = {
    color: props.textColor || '#1f2937',
  }
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  return styles
})

function onLinkHover(e: MouseEvent, isHover: boolean) {
  const target = e.target as HTMLElement
  target.style.color = isHover ? (props.hoverColor || '#10b981') : (props.textColor || '#1f2937')
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
  
  return styles
})

// Mobile menu
const mobileMenuTransitionFrom = computed(() => {
  if (props.mobileMenuStyle === 'fullscreen') return 'opacity-0'
  if (props.mobileMenuStyle === 'sidebar') return 'translate-x-full opacity-0'
  return 'opacity-0 -translate-y-2'
})

const mobileMenuTransitionTo = computed(() => {
  if (props.mobileMenuStyle === 'fullscreen') return 'opacity-100'
  if (props.mobileMenuStyle === 'sidebar') return 'translate-x-0 opacity-100'
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
</script>
