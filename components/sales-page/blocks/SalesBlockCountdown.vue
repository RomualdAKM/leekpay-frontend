<template>
  <section 
    :class="template.styles.section"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Header -->
      <div v-if="props.title || props.subtitle" class="text-center" :class="{ 'mb-8 md:mb-12': props.title }">
        <h3 
          v-if="props.title"
          :class="template.styles.title"
          :style="{ color: props.textColor }"
        >
          {{ props.title }}
        </h3>
        <p 
          v-if="props.subtitle"
          class="mt-2 text-sm md:text-base opacity-70"
          :style="{ color: props.textColor }"
        >
          {{ props.subtitle }}
        </p>
      </div>
      
      <!-- Timer -->
      <div :class="template.styles.timer">
        <!-- Jours -->
        <div v-if="props.showDays" class="flex flex-col items-center">
          <div 
            :class="[template.styles.digit, getDigitClass]"
            :style="digitStyles"
          >
            {{ timeLeft.days }}
          </div>
          <span 
            v-if="props.showLabels"
            :class="template.styles.label"
            :style="{ color: props.textColor }"
          >
            {{ props.dayLabel || 'Jours' }}
          </span>
        </div>
        
        <span 
          v-if="props.showDays && props.showHours && props.showSeparators" 
          :class="template.styles.separator" 
          :style="{ color: props.textColor }"
        >:</span>
        
        <!-- Heures -->
        <div v-if="props.showHours" class="flex flex-col items-center">
          <div 
            :class="[template.styles.digit, getDigitClass]"
            :style="digitStyles"
          >
            {{ timeLeft.hours }}
          </div>
          <span 
            v-if="props.showLabels"
            :class="template.styles.label"
            :style="{ color: props.textColor }"
          >
            {{ props.hourLabel || 'Heures' }}
          </span>
        </div>
        
        <span 
          v-if="props.showHours && props.showMinutes && props.showSeparators" 
          :class="template.styles.separator" 
          :style="{ color: props.textColor }"
        >:</span>
        
        <!-- Minutes -->
        <div v-if="props.showMinutes" class="flex flex-col items-center">
          <div 
            :class="[template.styles.digit, getDigitClass]"
            :style="digitStyles"
          >
            {{ timeLeft.minutes }}
          </div>
          <span 
            v-if="props.showLabels"
            :class="template.styles.label"
            :style="{ color: props.textColor }"
          >
            {{ props.minuteLabel || 'Minutes' }}
          </span>
        </div>
        
        <span 
          v-if="props.showMinutes && props.showSeconds && props.showSeparators" 
          :class="template.styles.separator" 
          :style="{ color: props.textColor }"
        >:</span>
        
        <!-- Secondes -->
        <div v-if="props.showSeconds" class="flex flex-col items-center">
          <div 
            :class="[template.styles.digit, getDigitClass]"
            :style="digitStyles"
          >
            {{ timeLeft.seconds }}
          </div>
          <span 
            v-if="props.showLabels"
            :class="template.styles.label"
            :style="{ color: props.textColor }"
          >
            {{ props.secondLabel || 'Secondes' }}
          </span>
        </div>
      </div>
      
      <!-- Message expiré -->
      <p 
        v-if="isExpired"
        class="mt-6 text-base font-medium text-center"
        :style="{ color: props.textColor }"
      >
        {{ props.expiredMessage || 'Cette offre a expiré' }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface Props {
  templateId?: string
  title?: string
  subtitle?: string
  endDate?: string | null
  showDays?: boolean
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  showLabels?: boolean
  showSeparators?: boolean
  digitStyle?: 'simple' | 'boxed' | 'rounded' | 'circle'
  dayLabel?: string
  hourLabel?: string
  minuteLabel?: string
  secondLabel?: string
  expiredMessage?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'countdown-minimal-1',
  title: 'Offre expire dans',
  subtitle: '',
  endDate: null,
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  showLabels: true,
  showSeparators: true,
  digitStyle: 'simple',
  dayLabel: 'Jours',
  hourLabel: 'Heures',
  minuteLabel: 'Minutes',
  secondLabel: 'Secondes',
  expiredMessage: 'Cette offre a expiré',
  backgroundColor: '#fef3c7',
  textColor: '#92400e',
  accentColor: '',
})

const template = computed(() => {
  return getTemplate('countdown', props.templateId) || {
    styles: {
      section: 'py-10 md:py-14 px-6',
      container: 'max-w-2xl mx-auto text-center',
      title: 'text-lg font-light mb-6 opacity-80',
      timer: 'flex justify-center gap-6',
      digit: 'text-4xl md:text-5xl font-light tracking-tight',
      label: 'text-xs uppercase tracking-wider opacity-50 mt-2',
      separator: 'text-3xl opacity-30 self-center',
    }
  }
})

// Classes pour le style des chiffres
const getDigitClass = computed(() => {
  switch (props.digitStyle) {
    case 'boxed':
      return 'px-4 py-3 border-2'
    case 'rounded':
      return 'px-4 py-3 border-2 rounded-xl'
    case 'circle':
      return 'w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2'
    default:
      return ''
  }
})

const sectionStyles = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

const timeLeft = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
})

const isExpired = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const digitStyles = computed(() => {
  const bg = props.backgroundColor || '#fef3c7'
  const hex = bg.replace('#', '')
  if (hex.length !== 6) return { color: props.accentColor || props.textColor }
  
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  const styles: Record<string, string> = {
    color: props.accentColor || props.textColor || '#92400e',
  }
  
  // Ajouter des styles pour les variantes boxées
  if (props.digitStyle !== 'simple') {
    styles.backgroundColor = luminance > 0.5 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.12)'
    styles.borderColor = props.accentColor || (luminance > 0.5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)')
  }
  
  return styles
})

const calculateTimeLeft = () => {
  let targetDate: Date
  
  if (!props.endDate) {
    // Si pas de date, afficher un compte à rebours de démo (24h depuis maintenant)
    targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
  } else {
    targetDate = new Date(props.endDate)
  }
  
  updateTimeLeft(targetDate)
}

const updateTimeLeft = (end: Date) => {
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  
  if (diff <= 0) {
    isExpired.value = true
    timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    if (timer) clearInterval(timer)
    return
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  timeLeft.value = {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  }
}

onMounted(() => {
  calculateTimeLeft()
  timer = setInterval(calculateTimeLeft, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
