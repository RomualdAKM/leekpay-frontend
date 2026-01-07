<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Titre -->
      <h2 
        v-if="props.title"
        class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        :style="{ color: props.textColor }"
      >
        {{ props.title }}
      </h2>
      
      <!-- Texte -->
      <p 
        v-if="props.text"
        :class="template.styles.text"
        :style="{ color: props.textColor, opacity: props.title ? 0.85 : 1 }"
      >
        {{ props.text }}
      </p>
      
      <!-- Boutons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <!-- Bouton Principal -->
        <a
          v-if="props.buttonText && props.buttonUrl"
          :href="props.buttonUrl"
          :target="props.buttonTarget"
          :class="[
            template.styles.button,
            props.buttonStyle === 'outlined' ? 'bg-transparent border-2' : ''
          ]"
          :style="primaryButtonStyles"
        >
          {{ props.buttonText }}
        </a>
        <button
          v-else-if="props.buttonText"
          :class="[
            template.styles.button,
            props.buttonStyle === 'outlined' ? 'bg-transparent border-2' : ''
          ]"
          :style="primaryButtonStyles"
          @click="$emit('cta-click')"
        >
          {{ props.buttonText }}
        </button>
        
        <!-- Bouton Secondaire -->
        <a
          v-if="props.showSecondaryButton && props.secondaryButtonText"
          :href="props.secondaryButtonUrl || '#'"
          :target="props.buttonTarget"
          class="px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-80"
          :style="secondaryButtonStyles"
        >
          {{ props.secondaryButtonText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface Props {
  templateId?: string
  title?: string
  text?: string
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonStyle?: 'filled' | 'outlined'
  buttonBgColor?: string
  buttonColor?: string
  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  backgroundColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'cta-minimal-1',
  title: '',
  text: 'Profitez de cette offre exclusive maintenant !',
  buttonText: 'Commencer',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonStyle: 'filled',
  buttonBgColor: '#ffffff',
  buttonColor: '#1f2937',
  showSecondaryButton: false,
  secondaryButtonText: 'En savoir plus',
  secondaryButtonUrl: '',
  backgroundColor: '#10b981',
  textColor: '#ffffff',
})

defineEmits(['cta-click'])

// Template actif
const template = computed(() => {
  return getTemplate('cta', props.templateId) || {
    id: 'cta-minimal-1',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-2xl mx-auto text-center',
      text: 'text-xl md:text-2xl font-light tracking-tight',
      button: 'px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all duration-200',
    }
  }
})

const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

const primaryButtonStyles = computed(() => {
  if (props.buttonStyle === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color: props.buttonBgColor || props.textColor,
      borderColor: props.buttonBgColor || props.textColor,
    }
  }
  return {
    backgroundColor: props.buttonBgColor || '#ffffff',
    color: props.buttonColor || '#1f2937',
  }
})

const secondaryButtonStyles = computed(() => ({
  color: props.textColor,
  borderBottom: `1px solid ${props.textColor}40`,
}))
</script>
