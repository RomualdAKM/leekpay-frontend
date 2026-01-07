<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Grille de produits -->
      <div :class="template.styles.grid">
        <div 
          v-for="product in productsList" 
          :key="product.id"
          :class="template.styles.card"
        >
          <!-- Image -->
          <div :class="template.styles.imageWrapper">
            <img 
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              :class="template.styles.image"
            />
            <div 
              v-else
              :class="[template.styles.image, 'bg-gray-100 flex items-center justify-center']"
            >
              <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <!-- Contenu -->
          <div :class="template.styles.content">
            <h3 
              :class="template.styles.name"
              :style="{ color: textColor }"
            >
              {{ product.name }}
            </h3>
            
            <p 
              v-if="product.description && template.styles.description !== 'hidden'"
              :class="template.styles.description"
              :style="{ color: textColor }"
            >
              {{ product.description }}
            </p>
            
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
            
            <!-- Bouton -->
            <a
              v-if="product.buttonText && product.buttonUrl"
              :href="product.buttonUrl"
              :target="props.buttonTarget"
              :class="template.styles.button"
              :style="buttonStyles"
            >
              {{ product.buttonText }}
            </a>
            <button
              v-else-if="product.buttonText"
              :class="template.styles.button"
              :style="buttonStyles"
              @click="$emit('product-click', product)"
            >
              {{ product.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

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
  templateId?: string
  columns?: number
  products?: Product[]
  currency?: string
  showOriginalPrice?: boolean
  buttonTarget?: '_self' | '_blank'
  backgroundColor?: string
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'product-grid-2',
  columns: 2,
  products: () => [],
  currency: 'FCFA',
  showOriginalPrice: false,
  buttonTarget: '_self',
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
})

defineEmits(['product-click'])

// Liste des produits avec fallback
const productsList = computed(() => {
  if (props.products && props.products.length > 0) {
    return props.products
  }
  return [{
    id: '1',
    image: null,
    name: 'Nom du produit',
    description: 'Description du produit.',
    price: '29900',
    originalPrice: '',
    buttonText: 'Acheter',
    buttonUrl: '',
  }]
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

// Formatage du prix
const formatPrice = (price: string | number): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return String(price)
  return num.toLocaleString('fr-FR')
}
</script>
