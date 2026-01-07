<template>
  <header 
    :class="template.styles.section"
    :style="{ backgroundColor: props.backgroundColor }"
  >
    <div :class="template.styles.container">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <img 
          v-if="props.logoUrl" 
          :src="props.logoUrl" 
          alt="Logo"
          :class="template.styles.logo"
        />
        <div v-else class="h-8 w-24 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
          Logo
        </div>
      </div>
      
      <!-- Menu Desktop -->
      <nav v-if="props.menuItems?.length" :class="template.styles.nav" class="hidden md:flex">
        <a 
          v-for="(item, index) in props.menuItems" 
          :key="index"
          :href="item.url || '#'"
          class="transition-opacity hover:opacity-70"
          :style="{ color: textColor }"
        >
          {{ item.label }}
        </a>
      </nav>
      
      <!-- Menu Mobile Toggle -->
      <button 
        v-if="props.menuItems?.length"
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2"
        :style="{ color: textColor }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <nav 
      v-if="mobileMenuOpen && props.menuItems?.length"
      class="md:hidden mt-4 pb-4 border-t pt-4"
    >
      <div class="flex flex-col space-y-3">
        <a 
          v-for="(item, index) in props.menuItems" 
          :key="index"
          :href="item.url || '#'"
          class="text-base font-medium px-2 py-2"
          :style="{ color: textColor }"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'

interface MenuItem {
  label: string
  url?: string
}

interface Props {
  templateId?: string
  logoUrl?: string | null
  menuItems?: MenuItem[]
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  templateId: 'header-minimal-1',
  logoUrl: null,
  menuItems: () => [],
  backgroundColor: '#ffffff',
})

const mobileMenuOpen = ref(false)

// Template actif
const template = computed(() => {
  return getTemplate('header', props.templateId) || {
    id: 'header-minimal-1',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-6 px-6 border-b',
      container: 'max-w-5xl mx-auto flex items-center justify-between',
      logo: 'h-8',
      nav: 'flex gap-6 text-sm font-light',
    }
  }
})

const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})
</script>
