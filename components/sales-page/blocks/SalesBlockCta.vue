<template>
  <section 
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container" :style="containerStyles">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ gap: props.title ? '1.5rem' : '1rem' }">
        <!-- Titre (Editable Inline) -->
        <h2 
          v-if="props.title || isEditMode"
          class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          :class="editableClasses('title')"
          :style="{ color: props.textColor, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Titre (optionnel)'"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
          ref="titleRef"
        >{{ props.title }}</h2>
        
        <!-- Texte (Editable Inline) -->
        <p 
          v-if="props.text || isEditMode"
          :class="[template.styles.text, editableClasses('text')]"
          :style="{ color: props.textColor, opacity: props.title ? 0.85 : 1, ...textPositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Texte de votre CTA...'"
          @focus="onFocus('text')"
          @blur="onBlur($event, 'text')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
          ref="textRef"
        >{{ props.text }}</p>
        
        <!-- Boutons -->
        <div :class="buttonsContainerClass" :style="buttonsContainerPositionStyles">
          <!-- Bouton Principal -->
          <a
            v-if="props.buttonText && props.buttonUrl && !isEditMode"
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
              <ButtonIcon :icon="props.buttonIcon" />
            </span>
          </a>
          <button
            v-else-if="props.buttonText || isEditMode"
            :class="[
              template.styles.button,
              props.buttonStyle === 'outlined' ? 'bg-transparent border-2' : '',
              buttonHoverClass,
              isEditMode && 'cursor-text'
            ]"
            :style="primaryButtonStyles"
            @click="!isEditMode && $emit('cta-click')"
          >
            <span 
              class="flex items-center gap-2"
              :class="editableClasses('buttonText')"
              :contenteditable="isEditMode"
              :data-placeholder="'Texte du bouton'"
              @focus="onFocus('buttonText')"
              @blur="onBlur($event, 'buttonText')"
              @keydown="onKeydown($event, true)"
              @paste="onPaste"
              ref="buttonTextRef"
            >
              {{ props.buttonText || 'Commencer' }}
            </span>
            <ButtonIcon v-if="!isEditMode" :icon="props.buttonIcon" />
          </button>
          
          <!-- Bouton Secondaire -->
          <a
            v-if="props.showSecondaryButton && (props.secondaryButtonText || isEditMode)"
            :href="!isEditMode ? (props.secondaryButtonUrl || '#') : undefined"
            :target="props.buttonTarget"
            class="px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-80"
            :class="editableClasses('secondaryButtonText')"
            :style="secondaryButtonStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Texte secondaire'"
            @focus="onFocus('secondaryButtonText')"
            @blur="onBlur($event, 'secondaryButtonText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
            @click.prevent="isEditMode ? null : undefined"
            ref="secondaryButtonTextRef"
          >{{ props.secondaryButtonText }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, h, type FunctionalComponent } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'

// Composant fonctionnel pour les icônes du bouton
const ButtonIcon: FunctionalComponent<{ icon?: string }> = (props) => {
  if (!props.icon) return null
  const icons: Record<string, any> = {
    'arrow-right': h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 8l4 4m0 0l-4 4m4-4H3' })
    ]),
    'cart': h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' })
    ]),
    'download': h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' })
    ]),
    'play': h('svg', { class: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M8 5v14l11-7z' })
    ]),
    'check': h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })
    ]),
  }
  return icons[props.icon] || null
}
ButtonIcon.props = ['icon']

interface Props {
  blockId?: string  // ID du bloc pour l'édition inline
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
  // Positionnement
  elementsOrder?: string[]
  titleOffsetY?: number
  textOffsetY?: number
  buttonsOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
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
  // Positionnement
  elementsOrder: () => ['title', 'text', 'buttons'],
  titleOffsetY: 0,
  textOffsetY: 0,
  buttonsOffsetY: 0,
})

defineEmits(['cta-click'])

// Références DOM pour les éléments éditables
const titleRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const buttonTextRef = ref<HTMLElement | null>(null)
const secondaryButtonTextRef = ref<HTMLElement | null>(null)

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

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

// Handlers d'édition
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

const onKeydown = (e: KeyboardEvent, singleLine: boolean) => {
  // Empêcher Enter en mode single line
  if (singleLine && e.key === 'Enter') {
    e.preventDefault()
    ;(e.target as HTMLElement).blur()
  }
  // Escape pour annuler
  if (e.key === 'Escape') {
    ;(e.target as HTMLElement).blur()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

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
  const base = 'flex flex-col sm:flex-row gap-4'
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

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  return (props.elementsOrder || ['title', 'text', 'buttons']).indexOf(element)
}

const titlePositionStyles = computed(() => ({
  order: getElementOrder('title'),
  transform: props.titleOffsetY ? `translateY(${props.titleOffsetY}px)` : undefined
}))

const textPositionStyles = computed(() => ({
  order: getElementOrder('text'),
  transform: props.textOffsetY ? `translateY(${props.textOffsetY}px)` : undefined
}))

const buttonsContainerPositionStyles = computed(() => ({
  order: getElementOrder('buttons'),
  transform: props.buttonsOffsetY ? `translateY(${props.buttonsOffsetY}px)` : undefined,
  marginTop: getElementOrder('buttons') > 0 ? '1rem' : '0' // Ajustement dynamique du margin si pas en haut
}))
</script>

<style scoped>
[contenteditable="true"]:empty::before {
  content: attr(data-placeholder);
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  pointer-events: none;
}

[contenteditable="true"]:focus:empty::before {
  content: '';
}
</style>
