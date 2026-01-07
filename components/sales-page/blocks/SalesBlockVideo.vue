<template>
  <section 
    :class="[template.styles.section, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Titre (au-dessus) -->
      <h3 
        v-if="props.title && props.titlePosition === 'top'"
        :class="template.styles.title"
        :style="titleStyles"
      >
        {{ props.title }}
      </h3>
      
      <!-- Player vidéo -->
      <div 
        :class="template.styles.videoWrapper"
        :style="videoWrapperStyles"
      >
        <div :class="template.styles.video" class="relative bg-black">
          <!-- YouTube -->
          <iframe
            v-if="props.type === 'youtube' && youtubeId"
            :src="`https://www.youtube.com/embed/${youtubeId}${youtubeParams}`"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          />
          
          <!-- Vimeo -->
          <iframe
            v-else-if="props.type === 'vimeo' && vimeoId"
            :src="`https://player.vimeo.com/video/${vimeoId}${vimeoParams}`"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"
          />
          
          <!-- URL directe -->
          <video
            v-else-if="props.type === 'url' && props.url"
            :src="props.url"
            :autoplay="props.autoplay"
            :loop="props.loop"
            :muted="props.muted"
            :controls="props.showControls"
            class="absolute inset-0 w-full h-full object-cover"
            playsinline
          />
          
          <!-- Placeholder -->
          <div 
            v-else 
            class="absolute inset-0 flex items-center justify-center bg-gray-900"
          >
            <div class="text-center text-white">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm opacity-75">Ajoutez une URL vidéo</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Titre (en-dessous) -->
      <h3 
        v-if="props.title && props.titlePosition === 'bottom'"
        :class="template.styles.title"
        :style="titleStyles"
      >
        {{ props.title }}
      </h3>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface Props {
  templateId?: string
  type?: 'youtube' | 'vimeo' | 'url'
  url?: string
  title?: string
  // Lecture
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  showControls?: boolean
  // Couleurs
  backgroundColor?: string
  // Aspect
  aspectRatio?: 'video' | 'wide' | 'ultrawide' | 'square'
  maxWidth?: 'small' | 'medium' | 'large' | 'full'
  // Bordure
  borderRadius?: 'none' | 'small' | 'medium' | 'large'
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  borderColor?: string
  // Titre
  titlePosition?: 'top' | 'bottom'
  titleAlign?: 'left' | 'center' | 'right'
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  // Espacement
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'zoom'
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'video-minimal-centered',
  type: 'youtube',
  url: '',
  title: '',
  autoplay: false,
  loop: false,
  muted: false,
  showControls: true,
  backgroundColor: '#ffffff',
  aspectRatio: 'video',
  maxWidth: 'large',
  borderRadius: 'none',
  borderWidth: 'none',
  borderColor: '#e5e7eb',
  titlePosition: 'bottom',
  titleAlign: 'center',
  titleSize: 'medium',
  titleWeight: 'medium',
  paddingY: 'large',
  animation: 'none',
})

// Template actif
const template = computed(() => {
  return getTemplate('video', props.templateId) || {
    id: 'video-minimal-centered',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-12 md:py-16 px-6',
      container: 'max-w-3xl mx-auto',
      videoWrapper: 'relative overflow-hidden',
      video: 'w-full aspect-video',
      title: 'text-sm font-light mt-4 opacity-70 text-center',
    }
  }
})

// Mappings
const paddingYMap: Record<string, string> = {
  'none': '0',
  'small': '1.5rem',
  'medium': '3rem',
  'large': '5rem',
  'xlarge': '8rem'
}

const maxWidthMap: Record<string, string> = {
  'small': '32rem',
  'medium': '48rem',
  'large': '64rem',
  'full': '100%'
}

const borderRadiusMap: Record<string, string> = {
  'none': '0',
  'small': '0.375rem',
  'medium': '0.75rem',
  'large': '1.5rem'
}

const borderWidthMap: Record<string, string> = {
  'none': '0',
  'thin': '1px',
  'medium': '2px',
  'thick': '4px'
}

const aspectRatioMap: Record<string, string> = {
  'video': '16/9',
  'wide': '21/9',
  'ultrawide': '32/9',
  'square': '1/1'
}

const titleSizeMap: Record<string, string> = {
  'small': '0.875rem',
  'medium': '1.125rem',
  'large': '1.5rem',
  'xlarge': '2rem'
}

const titleWeightMap: Record<string, string> = {
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700'
}

// Styles
const sectionStyles = computed(() => {
  const styles: Record<string, string> = {
    backgroundColor: props.backgroundColor || '#ffffff'
  }
  
  styles.paddingTop = paddingYMap[props.paddingY || 'large'] || '5rem'
  styles.paddingBottom = paddingYMap[props.paddingY || 'large'] || '5rem'
  
  return styles
})

const videoWrapperStyles = computed(() => {
  const styles: Record<string, string> = {
    maxWidth: maxWidthMap[props.maxWidth || 'large'] || '64rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
  
  styles.borderRadius = borderRadiusMap[props.borderRadius || 'none'] || '0'
  styles.overflow = 'hidden'
  styles.aspectRatio = aspectRatioMap[props.aspectRatio || 'video'] || '16/9'
  
  const bw = borderWidthMap[props.borderWidth || 'none']
  if (bw && bw !== '0') {
    styles.borderWidth = bw
    styles.borderColor = props.borderColor || '#e5e7eb'
    styles.borderStyle = 'solid'
  }
  
  return styles
})

const titleStyles = computed(() => {
  const styles: Record<string, string> = {
    textAlign: props.titleAlign || 'center',
    fontSize: titleSizeMap[props.titleSize || 'medium'] || '1.125rem',
    fontWeight: titleWeightMap[props.titleWeight || 'medium'] || '500'
  }
  
  if (props.titlePosition === 'top') {
    styles.marginBottom = '1.5rem'
  } else {
    styles.marginTop = '1.5rem'
  }
  
  return styles
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})

// YouTube params
const youtubeParams = computed(() => {
  const params: string[] = []
  if (props.autoplay) params.push('autoplay=1')
  if (props.loop) params.push('loop=1')
  if (props.muted) params.push('mute=1')
  if (!props.showControls) params.push('controls=0')
  return params.length > 0 ? '?' + params.join('&') : ''
})

// Vimeo params
const vimeoParams = computed(() => {
  const params: string[] = []
  if (props.autoplay) params.push('autoplay=1')
  if (props.loop) params.push('loop=1')
  if (props.muted) params.push('muted=1')
  return params.length > 0 ? '?' + params.join('&') : ''
})

// Extraire l'ID YouTube
const youtubeId = computed(() => {
  if (!props.url) return null
  const match = props.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : null
})

// Extraire l'ID Vimeo
const vimeoId = computed(() => {
  if (!props.url) return null
  const match = props.url.match(/(?:vimeo\.com\/)(\d+)/)
  return match ? match[1] : null
})
</script>
