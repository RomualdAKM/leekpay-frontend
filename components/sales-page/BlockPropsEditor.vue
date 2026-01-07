<template>
  <div class="space-y-4">
    <!-- Type de bloc -->
    <div class="pb-3 border-b border-gray-200">
      <span class="text-xs text-gray-500 uppercase tracking-wide">{{ getBlockLabel(block.type) }}</span>
    </div>
    
    <!-- Props dynamiques selon le type -->
    <component 
      :is="propsComponent"
      v-if="propsComponent"
      :props="block.props"
      @update="$emit('update', $event)"
    />
    
    <!-- Fallback si pas de props spécifiques -->
    <div v-else class="text-sm text-gray-500 text-center py-4">
      Ce bloc n'a pas de propriétés modifiables
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { Block } from '~/composables/useSalesPageBuilder'

interface Props {
  block: Block
}

const props = defineProps<Props>()
defineEmits(['update'])

const blockLabels: Record<string, string> = {
  header: 'En-tête',
  hero: 'Hero Section',
  text: 'Bloc Texte',
  image: 'Image',
  video: 'Vidéo',
  features: 'Caractéristiques',
  testimonials: 'Témoignages',
  pricing: 'Tarification',
  faq: 'FAQ',
  cta: 'Appel à l\'action',
  countdown: 'Compte à rebours',
  product: 'Produit',
  grid: 'Grille',
  footer: 'Pied de page',
}

const getBlockLabel = (type: string): string => {
  return blockLabels[type] || type
}

// Composants d'édition des props par type
const propsEditors: Record<string, any> = {
  hero: defineAsyncComponent(() => import('./props/HeroPropsEditor.vue')),
  text: defineAsyncComponent(() => import('./props/TextPropsEditor.vue')),
  features: defineAsyncComponent(() => import('./props/FeaturesPropsEditor.vue')),
  pricing: defineAsyncComponent(() => import('./props/PricingPropsEditor.vue')),
  cta: defineAsyncComponent(() => import('./props/CtaPropsEditor.vue')),
  countdown: defineAsyncComponent(() => import('./props/CountdownPropsEditor.vue')),
  faq: defineAsyncComponent(() => import('./props/FaqPropsEditor.vue')),
  testimonials: defineAsyncComponent(() => import('./props/TestimonialsPropsEditor.vue')),
  image: defineAsyncComponent(() => import('./props/ImagePropsEditor.vue')),
  video: defineAsyncComponent(() => import('./props/VideoPropsEditor.vue')),
  header: defineAsyncComponent(() => import('./props/HeaderPropsEditor.vue')),
  footer: defineAsyncComponent(() => import('./props/FooterPropsEditor.vue')),
  product: defineAsyncComponent(() => import('./props/ProductPropsEditor.vue')),
  grid: defineAsyncComponent(() => import('./props/GridPropsEditor.vue')),
}

const propsComponent = computed(() => {
  return propsEditors[props.block.type] || null
})
</script>
