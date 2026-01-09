<template>
  <section 
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container" :style="containerStyles">
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
      <div :class="buttonsContainerClass">
        <!-- Bouton Principal -->
        <a
          v-if="props.buttonText && props.buttonUrl"
          :href="props.buttonUrl"
          :target="props.buttonTarget"
          :class="[
            template.styles.button,
            props.buttonStyle === 'outlined' ? 'bg-transparent border-2' : '',
            buttonHoverClass
          ]"
          :style="primaryButtonStyles"
        >
          <span class="flex items-center gap-2">
            {{ props.buttonText }}
            <svg v-if="props.buttonIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-if="props.buttonIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-if="props.buttonIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-if="props.buttonIcon === 'play'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-if="props.buttonIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </a>
        <button
          v-else-if="props.buttonText"
          :class="[
            template.styles.button,
            props.buttonStyle === 'outlined' ? 'bg-transparent border-2' : '',
            buttonHoverClass
          ]"
          :style="primaryButtonStyles"
          @click="$emit('cta-click')"
        >
          <span class="flex items-center gap-2">
            {{ props.buttonText }}
            <svg v-if="props.buttonIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-if="props.buttonIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-if="props.buttonIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-if="props.buttonIcon === 'play'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-if="props.buttonIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
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
  contentAlignment?: 'left' | 'center' | 'right'
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonStyle?: 'filled' | 'outlined'
  buttonBgColor?: string
  buttonColor?: string
  buttonIcon?: string
  buttonHoverEffect?: 'none' | 'darken' | 'lighten' | 'scale' | 'lift'
  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  backgroundColor?: string
  gradientStart?: string
  gradientEnd?: string
  textColor?: string
  paddingY?: 'small' | 'medium' | 'large' | 'xlarge'
  animation?: 'none' | 'fade' | 'slide-up' | 'scale' | 'bounce'
  cssId?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'cta-minimal-1',
  title: '',
  text: 'Profitez de cette offre exclusive maintenant !',
  contentAlignment: 'center',
  buttonText: 'Commencer',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonStyle: 'filled',
  buttonBgColor: '#ffffff',
  buttonColor: '#1f2937',
  buttonIcon: '',
  buttonHoverEffect: 'none',
  showSecondaryButton: false,
  secondaryButtonText: 'En savoir plus',
  secondaryButtonUrl: '',
  backgroundType: 'solid',
  backgroundColor: '#10b981',
  gradientStart: '#10b981',
  gradientEnd: '#059669',
  textColor: '#ffffff',
  paddingY: 'large',
  animation: 'none',
  cssId: '',
  customClasses: '',
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
    styles.background = `linear-gradient(to right, ${props.gradientStart}, ${props.gradientEnd})`
  } else if (props.backgroundType !== 'transparent') {
    styles.backgroundColor = props.backgroundColor || '#10b981'
  }
  
  return styles
})

const containerStyles = computed(() => ({
  textAlign: (props.contentAlignment || 'center') as 'left' | 'center' | 'right',
}))

const buttonsContainerClass = computed(() => {
  const base = 'flex flex-col sm:flex-row gap-4 mt-8'
  const alignMap: Record<string, string> = {
    left: 'items-start justify-start',
    center: 'items-center justify-center',
    right: 'items-end justify-end',
  }
  return `${base} ${alignMap[props.contentAlignment || 'center']}`
})

const buttonHoverClass = computed(() => {
  const effectMap: Record<string, string> = {
    none: '',
    darken: 'hover:brightness-90',
    lighten: 'hover:brightness-110',
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-1 hover:shadow-lg',
  }
  return `transition-all duration-300 ${effectMap[props.buttonHoverEffect || 'none']}`
})

const animationClass = computed(() => {
  if (props.animation === 'none') return ''
  return `animate-${props.animation}`
})

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
