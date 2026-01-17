<template>
  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">Pages de vente</h1>
      </div>
      <NuxtLink 
        to="/dashboard/sales-pages/create" 
        class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nouvelle page
      </NuxtLink>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="border border-gray-200 p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Total</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.total }}</p>
      </div>
      <div class="border border-gray-200 p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Publiées</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.published }}</p>
      </div>
      <div class="border border-gray-200 p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Brouillons</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ stats.draft }}</p>
      </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
    
    <!-- Empty state -->
    <div v-else-if="salesPages.length === 0" class="border border-gray-200 p-8 text-center">
      <p class="text-gray-500 mb-4">Aucune page de vente</p>
      <NuxtLink to="/dashboard/sales-pages/create" class="text-green-600 hover:text-green-700 text-sm">
        Créer votre première page →
      </NuxtLink>
    </div>
    
    <!-- Liste -->
    <div v-else class="border border-gray-200 divide-y divide-gray-200">
      <div 
        v-for="page in salesPages" 
        :key="page.id"
        class="p-4 hover:bg-gray-50 transition-colors"
      >
        <!-- Info -->
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-medium text-gray-900">{{ page.title }}</h3>
              <span 
                class="text-xs px-2 py-0.5"
                :class="page.is_published ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'"
              >
                {{ page.is_published ? 'Publiée' : 'Brouillon' }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ page.slug }}.leekpay.me</p>
            <p class="text-xs text-gray-400 mt-0.5">Modifiée le {{ formatDate(page.updated_at) }}</p>
          </div>
          <button
            @click="deletePage(page.id)"
            class="p-1.5 text-gray-400 hover:text-red-600 transition flex-shrink-0"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-2">
          <a
            v-if="page.is_published"
            :href="page.public_url"
            target="_blank"
            class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
          >
            Voir
          </a>
          <NuxtLink
            :to="`/dashboard/sales-pages/${page.id}/edit`"
            class="px-3 py-1.5 text-sm bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Éditer
          </NuxtLink>
          <NuxtLink
            :to="`/dashboard/sales-pages/${page.id}/analytics`"
            class="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
          >
            Stats
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()

const salesPages = ref<any[]>([])
const stats = ref({ total: 0, published: 0, draft: 0 })
const loading = ref(true)

const fetchSalesPages = async () => {
  loading.value = true
  try {
    const response = await $fetch<{ data: any[]; stats: any }>('/sales-pages', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    salesPages.value = response.data || []
    stats.value = response.stats || { total: 0, published: 0, draft: 0 }
  } catch (err) {
    console.error('Erreur:', err)
  } finally {
    loading.value = false
  }
}

const deletePage = async (id: number) => {
  if (!confirm('Supprimer cette page ?')) return
  
  try {
    await $fetch(`/sales-pages/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await fetchSalesPages()
  } catch (err) {
    console.error('Erreur:', err)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(fetchSalesPages)
</script>
