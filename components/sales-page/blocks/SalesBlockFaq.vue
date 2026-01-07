<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Header -->
      <div v-if="props.title || props.subtitle" class="mb-12 md:mb-16" :class="headerAlignment">
        <h2 
          v-if="props.title"
          :class="template.styles.title"
          :style="{ color: textColor }"
        >
          {{ props.title }}
        </h2>
        <p 
          v-if="props.subtitle"
          class="mt-4 text-base md:text-lg font-light max-w-2xl"
          :class="headerAlignment"
          :style="{ color: textColor, opacity: 0.7 }"
        >
          {{ props.subtitle }}
        </p>
      </div>
      
      <!-- Liste des FAQ -->
      <div :class="template.styles.grid">
        <div 
          v-for="(item, index) in faqItems"
          :key="index"
          :class="[
            template.styles.card,
            { 'border-current/20': !template.styles.card?.includes('border-') }
          ]"
          :style="cardStyles"
        >
          <!-- Question -->
          <button 
            class="w-full flex items-center justify-between text-left group"
            :class="template.styles.question"
            :style="{ color: textColor }"
            @click="toggleItem(index)"
          >
            <span class="pr-4">{{ item.question }}</span>
            <div 
              class="flex-shrink-0 transition-all duration-300"
              :class="[
                template.styles.icon,
                { 'rotate-180': openItems.includes(index) }
              ]"
              :style="iconStyles"
            >
              <svg 
                class="w-full h-full"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <!-- Réponse -->
          <div 
            class="overflow-hidden transition-all duration-300 ease-in-out"
            :style="{ maxHeight: openItems.includes(index) ? '500px' : '0px' }"
          >
            <p 
              :class="template.styles.answer"
              :style="{ color: textColor }"
            >
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface FaqItem {
  question: string
  answer: string
}

interface Props {
  templateId?: string
  title?: string
  subtitle?: string
  items?: FaqItem[]
  backgroundColor?: string
  accentColor?: string
  allowMultiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'faq-minimal-1',
  title: 'Questions fréquentes',
  subtitle: '',
  items: () => [
    { question: 'Comment ça fonctionne ?', answer: 'C\'est très simple. Suivez les étapes indiquées et vous serez opérationnel en quelques minutes.' },
    { question: 'Quels sont les délais de livraison ?', answer: 'Nous livrons sous 24 à 48 heures en France métropolitaine.' },
    { question: 'Puis-je me faire rembourser ?', answer: 'Oui, nous offrons une garantie satisfait ou remboursé de 30 jours.' },
  ],
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
  allowMultiple: false,
})

// Support pour plusieurs items ouverts ou un seul
const openItems = ref<number[]>([0])

const toggleItem = (index: number) => {
  if (props.allowMultiple) {
    const idx = openItems.value.indexOf(index)
    if (idx === -1) {
      openItems.value.push(index)
    } else {
      openItems.value.splice(idx, 1)
    }
  } else {
    openItems.value = openItems.value.includes(index) ? [] : [index]
  }
}

// Items FAQ avec fallback
const faqItems = computed(() => {
  return props.items && props.items.length > 0 ? props.items : [
    { question: 'Comment ça fonctionne ?', answer: 'C\'est très simple.' },
  ]
})

// Template actif
const template = computed(() => {
  return getTemplate('faq', props.templateId) || {
    id: 'faq-minimal-1',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-2xl mx-auto',
      title: 'text-2xl md:text-3xl font-light tracking-tight text-center mb-12',
      grid: 'space-y-0',
      card: 'border-b py-6',
      question: 'text-base font-medium cursor-pointer',
      answer: 'text-sm opacity-70 mt-4 leading-relaxed',
      icon: 'w-5 h-5',
    }
  }
})

// Détermine si le header doit être centré
const headerAlignment = computed(() => {
  const titleClass = template.value.styles.title || ''
  return titleClass.includes('text-center') ? 'text-center mx-auto' : ''
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

const cardStyles = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  if (hex.length !== 6) return {}
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return {
    borderColor: luminance > 0.5 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
  }
})

const iconStyles = computed(() => ({
  color: props.accentColor || textColor.value,
}))
</script>
