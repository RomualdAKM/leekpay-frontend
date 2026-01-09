<template>
  <div>
    <!-- Écran de choix initial -->
    <div v-if="showTemplateChoice" class="min-h-screen bg-white flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <!-- Header -->
        <div class="mb-12">
          <NuxtLink to="/dashboard/sales-pages" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
            </svg>
            Retour
          </NuxtLink>
          <h1 class="text-3xl font-light text-gray-900 tracking-tight">Nouvelle page</h1>
        </div>
        
        <!-- Info -->
        <p class="text-sm text-gray-500 border-l-2 border-gray-200 pl-4 mb-10">
          Pour une meilleure expérience, utilisez un ordinateur ou activez le mode bureau sur mobile.
        </p>
        
        <!-- Options -->
        <div class="space-y-4">
          <button
            @click="startFromScratch"
            class="w-full flex items-center justify-between p-5 border border-gray-200 hover:border-gray-900 transition-colors text-left group"
          >
            <div>
              <h3 class="font-medium text-gray-900">Page vierge</h3>
              <p class="text-sm text-gray-500 mt-1">Construire de zéro</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          
          <button
            @click="showTemplateGallery = true"
            class="w-full flex items-center justify-between p-5 border border-gray-200 hover:border-gray-900 transition-colors text-left group"
          >
            <div>
              <h3 class="font-medium text-gray-900">Utiliser un modèle</h3>
              <p class="text-sm text-gray-500 mt-1">Démarrer avec un design existant</p>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal Galerie de templates -->
    <div v-if="showTemplateGallery" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-start justify-center min-h-screen px-4 py-8">
        <div class="fixed inset-0 bg-black/50" @click="showTemplateGallery = false"/>
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-5xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Choisir un template</h2>
              <p class="text-sm text-gray-500">Sélectionnez un template pour commencer</p>
            </div>
            <button @click="showTemplateGallery = false" class="p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Filtres -->
          <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              v-for="(label, key) in templateCategories"
              :key="key"
              @click="selectedCategory = key === selectedCategory ? '' : key"
              class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
              :class="selectedCategory === key ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ label }}
            </button>
          </div>
          
          <!-- Loading -->
          <div v-if="loadingTemplates" class="flex justify-center py-12">
            <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/>
          </div>
          
          <!-- Grille de templates -->
          <div v-else-if="filteredTemplates.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
            <button
              v-for="template in filteredTemplates"
              :key="template.id"
              @click="selectTemplate(template)"
              class="bg-white rounded-lg border-2 border-gray-200 overflow-hidden text-left hover:border-emerald-500 hover:shadow-lg transition-all"
              :class="{ 'ring-2 ring-emerald-500 border-emerald-500': selectedTemplateId === template.id }"
            >
              <div class="aspect-video bg-gray-100 relative">
                <img
                  v-if="template.thumbnail_url"
                  :src="template.thumbnail_url"
                  :alt="template.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span
                  v-if="selectedTemplateId === template.id"
                  class="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
              </div>
              <div class="p-3">
                <h3 class="font-medium text-gray-900 text-sm">{{ template.name }}</h3>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ template.description || 'Aucune description' }}</p>
              </div>
            </button>
          </div>
          
          <!-- Empty state -->
          <div v-else class="py-12 text-center">
            <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p class="text-gray-500">Aucun template disponible</p>
          </div>
          
          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              @click="showTemplateGallery = false"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              @click="useSelectedTemplate"
              :disabled="!selectedTemplateId"
              class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Utiliser ce template
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Builder -->
    <ClientOnly v-if="!showTemplateChoice">
      <SalesPageBuilder :template-id="pendingTemplateId" />
      <template #fallback>
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-600">Chargement du builder...</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SalesPageBuilder from '~/components/sales-page/SalesPageBuilder.vue'
import { useAuth } from '~/composables/useAuth'

const config = useRuntimeConfig()
const { token } = useAuth()

const showTemplateChoice = ref(true)
const showTemplateGallery = ref(false)
const loadingTemplates = ref(false)
const templates = ref<any[]>([])
const templateCategories = ref<Record<string, string>>({ '': 'Tous' })
const selectedCategory = ref('')
const selectedTemplateId = ref<number | null>(null)
const pendingTemplateId = ref<number | null>(null)

const filteredTemplates = computed(() => {
  if (!selectedCategory.value) return templates.value
  return templates.value.filter(t => t.category === selectedCategory.value)
})

const fetchTemplates = async () => {
  loadingTemplates.value = true
  try {
    const response = await $fetch<any>('/sales-page-templates', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    templates.value = response.data || []
    if (response.categories) {
      templateCategories.value = { '': 'Tous', ...response.categories }
    }
  } catch (err) {
    console.error('Erreur:', err)
  } finally {
    loadingTemplates.value = false
  }
}

const startFromScratch = () => {
  pendingTemplateId.value = null
  showTemplateChoice.value = false
}

const selectTemplate = (template: any) => {
  selectedTemplateId.value = template.id
}

const useSelectedTemplate = () => {
  if (!selectedTemplateId.value) return
  pendingTemplateId.value = selectedTemplateId.value
  showTemplateGallery.value = false
  showTemplateChoice.value = false
}

onMounted(() => {
  fetchTemplates()
})

definePageMeta({ layout: 'editor' })
</script>
