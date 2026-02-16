<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ 
        gap: '2.5rem',
        alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start'),
        textAlign: props.headerAlignment || 'center'
      }">
        <!-- Titre -->
        <div v-if="(props.showTitle !== false) && (props.title || isEditMode)" :style="titlePositionStyles">
          <component 
            :is="props.titleTag || 'h2'"
            :class="[template.styles.title || 'text-3xl md:text-4xl font-bold tracking-tight', editableClasses('title')]"
            :style="titleStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Titre de la section'"
            @focus="onFocus('title')"
            @blur="onBlur($event, 'title')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.title }}</component>
        </div>

        <!-- Sous-titre -->
        <div v-if="(props.showSubtitle !== false) && (props.subtitle || isEditMode)" :style="subtitlePositionStyles">
          <p 
            :class="[template.styles.subtitle || 'text-lg opacity-70 max-w-2xl', editableClasses('subtitle')]"
            :style="subtitleStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Sous-titre (optionnel)'"
            @focus="onFocus('subtitle')"
            @blur="onBlur($event, 'subtitle')"
            @keydown="onKeydown($event, false)"
            @paste="onPaste"
          >{{ props.subtitle }}</p>
        </div>

        <!-- Bouton CTA global -->
        <div v-if="props.showButton || isEditMode" :style="buttonPositionStyles">
          <a
            :href="isEditMode ? undefined : props.buttonUrl"
            :target="props.buttonTarget || '_self'"
            class="inline-flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95"
            :class="[editableClasses('buttonTextGlobal')]"
            :style="ctaButtonStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Texte du bouton'"
            @focus="onFocus('buttonTextGlobal')"
            @blur="onBlur($event, 'buttonTextGlobal')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >
            {{ props.buttonText || 'Découvrir tous les produits' }}
          </a>
        </div>
      
        <!-- Grille de produits -->
        <div 
          :class="template.styles.grid"
          :style="productsPositionStyles"
        >
          <div 
            v-for="(product, index) in productsList" 
            :key="product.id"
            :class="template.styles.card"
          >
            <!-- Image -->
            <div :class="template.styles.imageWrapper">
              <img 
                :src="product.image || DEFAULT_PRODUCT_IMAGES[index % DEFAULT_PRODUCT_IMAGES.length]"
                :alt="product.name"
                :class="template.styles.image"
              />
            </div>
            
            <!-- Contenu -->
            <div :class="template.styles.content">
              <!-- Nom du produit (éditable inline) -->
              <h3 
                :class="[template.styles.name, editableClasses(`products[${index}].name`)]"
                :style="{ color: textColor }"
                :contenteditable="isEditMode"
                :data-placeholder="'Nom du produit'"
                @focus="onArrayFocus('products', index, 'name')"
                @blur="onArrayBlur($event, 'products', index, 'name')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
              >{{ product.name }}</h3>
              
              <!-- Description du produit (éditable inline) -->
              <p 
                v-if="product.description || isEditMode"
                :class="[template.styles.description !== 'hidden' ? template.styles.description : '', editableClasses(`products[${index}].description`)]"
                :style="{ color: textColor }"
                :contenteditable="isEditMode"
                :data-placeholder="'Description du produit'"
                @focus="onArrayFocus('products', index, 'description')"
                @blur="onArrayBlur($event, 'products', index, 'description')"
                @keydown="onKeydown($event, false)"
                @paste="onPaste"
              >{{ product.description }}</p>
              
              <!-- Prix -->
              <div :class="template.styles.priceWrapper">
                <span 
                  v-if="props.showOriginalPrice && product.originalPrice"
                  :class="template.styles.originalPrice"
                  :style="{ color: textColor }"
                >
                  {{ formatPrice(product.originalPrice) }} {{ props.currency }}
                </span>
                <span 
                  :class="template.styles.price"
                  :style="{ color: props.accentColor || textColor }"
                >
                  {{ formatPrice(product.price) }} {{ props.currency }}
                </span>
              </div>
              
              <!-- Bouton (éditable inline pour le texte) -->
              <a
                v-if="product.buttonText && product.buttonUrl"
                :href="isEditMode ? undefined : product.buttonUrl"
                :target="props.buttonTarget"
                :class="[template.styles.button, editableClasses(`products[${index}].buttonText`)]"
                :style="buttonStyles"
                :contenteditable="isEditMode"
                :data-placeholder="'Texte du bouton'"
                @focus="onArrayFocus('products', index, 'buttonText')"
                @blur="onArrayBlur($event, 'products', index, 'buttonText')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
                @click.prevent="handleClick(product)"
              >{{ product.buttonText }}</a>
              <button
                v-else-if="product.buttonText || isEditMode"
                :class="[template.styles.button, editableClasses(`products[${index}].buttonText`)]"
                :style="buttonStyles"
                :contenteditable="isEditMode"
                :data-placeholder="'Texte du bouton'"
                @focus="onArrayFocus('products', index, 'buttonText')"
                @blur="onArrayBlur($event, 'products', index, 'buttonText')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
                @click="!isEditMode && $emit('product-click', product)"
              >{{ product.buttonText || 'Acheter' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Images produits par défaut libres de droit (Unsplash)
export const DEFAULT_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&q=80',
]

export const DEFAULT_PRODUCTS = [
  {
    id: '1',
    image: DEFAULT_PRODUCT_IMAGES[0],
    name: 'Produit Premium',
    description: 'Un produit de qualité supérieure pour répondre à vos besoins.',
    price: '29900',
    originalPrice: '39900',
    buttonText: 'Acheter',
    buttonUrl: '',
  },
  {
    id: '2',
    image: DEFAULT_PRODUCT_IMAGES[1],
    name: 'Produit Standard',
    description: 'Le choix idéal pour commencer.',
    price: '19900',
    originalText: '',
    buttonText: 'Acheter',
    buttonUrl: '',
  }
]
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

interface Product {
  id: string
  image?: string | null
  name: string
  description?: string
  price: string
  originalPrice?: string
  buttonText?: string
  buttonUrl?: string
}

interface Props {
  blockId?: string
  templateId?: string
  columns?: number
  products?: Product[]
  currency?: string
  showOriginalPrice?: boolean
  buttonTarget?: '_self' | '_blank'
  backgroundColor?: string
  accentColor?: string
  // Nouveaux éléments globaux
  title?: string
  subtitle?: string
  // Titre optionnel
  showTitle?: boolean
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  titleFontFamily?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  titleColor?: string
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  titleAlign?: 'left' | 'center' | 'right' | 'justify'
  titleOpacity?: number
  titleMarginBottom?: number
  // Sous-titre optionnel
  showSubtitle?: boolean
  subtitleSize?: 'small' | 'medium' | 'large'
  subtitleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  subtitleColor?: string
  subtitleAlign?: 'left' | 'center' | 'right' | 'justify'
  subtitleOpacity?: number
  headerAlignment?: 'left' | 'center' | 'right'
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  buttonSize?: 'sm' | 'md' | 'lg'
  buttonBorderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  buttonShadow?: 'none' | 'sm' | 'md' | 'lg'
  // Positionnement
  elementsOrder?: string[]
  titleOffsetY?: number
  subtitleOffsetY?: number
  productsOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'product-grid-2',
  columns: 2,
  products: () => [],
  currency: 'FCFA',
  showOriginalPrice: false,
  buttonTarget: '_self',
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
  title: '',
  subtitle: '',
  // Titre
  showTitle: true,
  titleTag: 'h2',
  titleFontFamily: '',
  titleSize: 'large',
  titleWeight: 'bold',
  titleColor: '',
  titleTransform: 'none',
  titleAlign: 'center',
  titleOpacity: 100,
  titleMarginBottom: 16,
  // Sous-titre
  showSubtitle: true,
  subtitleSize: 'medium',
  subtitleWeight: 'normal',
  subtitleColor: '',
  subtitleAlign: 'center',
  subtitleOpacity: 70,
  headerAlignment: 'center',
  showButton: false,
  buttonText: 'Découvrir tous les produits',
  buttonUrl: '',
  buttonSize: 'md',
  buttonBorderRadius: 'full',
  buttonShadow: 'lg',
  // Positionnement
  elementsOrder: () => ['title', 'subtitle', 'products', 'button'],
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  productsOffsetY: 0,
  buttonOffsetY: 0,
})

defineEmits(['product-click'])

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

const handleClick = (product: Product) => {
  if (!isEditMode.value && product.buttonUrl) {
    window.open(product.buttonUrl, props.buttonTarget)
  }
}

// Liste des produits avec fallback et images par défaut
const productsList = computed(() => {
  const products = props.products && props.products.length > 0 ? props.products : DEFAULT_PRODUCTS
  return products.map((product, index) => ({
    ...product,
    image: product.image || DEFAULT_PRODUCT_IMAGES[index % DEFAULT_PRODUCT_IMAGES.length],
  }))
})

// Template actif
const template = computed(() => {
  return getTemplate('product', props.templateId) || {
    id: 'product-grid-2',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2 gap-8',
      card: 'flex flex-col',
      imageWrapper: 'mb-4',
      image: 'w-full aspect-square object-cover rounded-lg',
      content: '',
      name: 'text-lg font-medium tracking-tight mb-2',
      description: 'text-sm opacity-60 leading-relaxed mb-4',
      priceWrapper: 'flex items-center gap-3 mb-4',
      price: 'text-xl font-semibold',
      originalPrice: 'text-base line-through opacity-40',
      button: 'w-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200',
    }
  }
})

const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  if (hex.length !== 6) return '#1f2937'
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

const buttonStyles = computed(() => ({
  backgroundColor: props.accentColor || '#10b981',
  color: '#ffffff',
}))

// ============ STYLES TITRE ET SOUS-TITRE ============

const fontSizeMap: Record<string, string> = {
  small: '1.5rem',
  medium: '2rem',
  large: '2.5rem',
  xlarge: '3rem',
}

const fontWeightMap: Record<string, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const titleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
  fontFamily: props.titleFontFamily || undefined,
  fontSize: fontSizeMap[props.titleSize || 'large'],
  fontWeight: fontWeightMap[props.titleWeight || 'bold'],
  textTransform: props.titleTransform || 'none',
  textAlign: props.titleAlign || 'center',
  opacity: `${props.titleOpacity !== undefined ? props.titleOpacity : 100}%`,
  marginBottom: `${props.titleMarginBottom || 16}px`,
  width: '100%',
}))

// Styles sous-titre
const subtitleFontSizeMap: Record<string, string> = {
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem',
}

const subtitleStyles = computed(() => ({
  color: props.subtitleColor || textColor.value,
  fontSize: subtitleFontSizeMap[props.subtitleSize || 'medium'],
  fontWeight: fontWeightMap[props.subtitleWeight || 'normal'],
  textAlign: props.subtitleAlign || 'center',
  opacity: `${props.subtitleOpacity !== undefined ? props.subtitleOpacity : 70}%`,
  width: '100%',
}))

// Styles bouton CTA
const buttonSizeMap: Record<string, string> = {
  sm: '0.5rem 1rem',
  md: '0.75rem 1.5rem',
  lg: '1rem 2rem',
}

const buttonRadiusMap: Record<string, string> = {
  none: '0',
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1rem',
  full: '9999px',
}

const buttonShadowMap: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
}

const ctaButtonStyles = computed(() => ({
  backgroundColor: props.accentColor || '#10B981',
  color: '#ffffff',
  padding: buttonSizeMap[props.buttonSize || 'md'],
  borderRadius: buttonRadiusMap[props.buttonBorderRadius || 'full'],
  boxShadow: buttonShadowMap[props.buttonShadow || 'lg'],
  fontWeight: 600,
  fontSize: props.buttonSize === 'sm' ? '0.875rem' : props.buttonSize === 'lg' ? '1.125rem' : '1rem',
  opacity: props.showButton ? 1 : 0.5,
  transition: 'all 0.2s ease',
}))

// Formatage du prix
const formatPrice = (price: string | number): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return String(price)
  return num.toLocaleString('fr-FR')
}

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['title', 'subtitle', 'products', 'button']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

const titlePositionStyles = computed(() => ({
  order: getElementOrder('title'),
  transform: props.titleOffsetY ? `translateY(${props.titleOffsetY}px)` : undefined,
  width: '100%',
}))

const subtitlePositionStyles = computed(() => ({
  order: getElementOrder('subtitle'),
  transform: props.subtitleOffsetY ? `translateY(${props.subtitleOffsetY}px)` : undefined,
  marginTop: getElementOrder('subtitle') === getElementOrder('title') + 1 ? '-1rem' : '0',
  width: '100%',
}))

const productsPositionStyles = computed(() => ({
  order: getElementOrder('products'),
  transform: props.productsOffsetY ? `translateY(${props.productsOffsetY}px)` : undefined,
  marginTop: getElementOrder('products') > 0 ? '1rem' : '0',
  width: '100%'
}))

const buttonPositionStyles = computed(() => ({
  order: getElementOrder('button'),
  transform: props.buttonOffsetY ? `translateY(${props.buttonOffsetY}px)` : undefined,
  marginTop: '1.5rem'
}))
</script>
