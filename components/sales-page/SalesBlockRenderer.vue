<template>
  <component
    :is="blockComponent"
    v-if="blockComponent"
    v-bind="block.props"
    @cta-click="handleCtaClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Block } from '~/composables/useSalesPageBuilder'

// Import des composants blocs
import SalesBlockHeader from './blocks/SalesBlockHeader.vue'
import SalesBlockHero from './blocks/SalesBlockHero.vue'
import SalesBlockText from './blocks/SalesBlockText.vue'
import SalesBlockImage from './blocks/SalesBlockImage.vue'
import SalesBlockVideo from './blocks/SalesBlockVideo.vue'
import SalesBlockFeatures from './blocks/SalesBlockFeatures.vue'
import SalesBlockTestimonials from './blocks/SalesBlockTestimonials.vue'
import SalesBlockPricing from './blocks/SalesBlockPricing.vue'
import SalesBlockFaq from './blocks/SalesBlockFaq.vue'
import SalesBlockCta from './blocks/SalesBlockCta.vue'
import SalesBlockCountdown from './blocks/SalesBlockCountdown.vue'
import SalesBlockProduct from './blocks/SalesBlockProduct.vue'
import SalesBlockGrid from './blocks/SalesBlockGrid.vue'
import SalesBlockFooter from './blocks/SalesBlockFooter.vue'

interface Props {
  block: Block
  checkoutUrl?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['cta-click'])

// Mapping des types vers les composants
const blockComponents: Record<string, any> = {
  header: SalesBlockHeader,
  hero: SalesBlockHero,
  text: SalesBlockText,
  image: SalesBlockImage,
  video: SalesBlockVideo,
  features: SalesBlockFeatures,
  testimonials: SalesBlockTestimonials,
  pricing: SalesBlockPricing,
  faq: SalesBlockFaq,
  cta: SalesBlockCta,
  countdown: SalesBlockCountdown,
  product: SalesBlockProduct,
  grid: SalesBlockGrid,
  footer: SalesBlockFooter,
}

const blockComponent = computed(() => {
  return blockComponents[props.block.type] || null
})

const handleCtaClick = () => {
  if (props.checkoutUrl) {
    window.location.href = props.checkoutUrl
  }
  emit('cta-click')
}
</script>
