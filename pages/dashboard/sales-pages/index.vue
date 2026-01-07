<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Pages de vente</h1>
        <p class="text-sm text-gray-500 mt-1">Créez et gérez vos pages de vente</p>
      </div>
      <NuxtLink 
        to="/dashboard/sales-pages/create" 
        class="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nouvelle page
      </NuxtLink>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p class="text-xs sm:text-sm text-gray-500">Total</p>
        <p class="text-2xl sm:text-3xl font-bold text-gray-900">{{ stats.total }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
        <p class="text-xs sm:text-sm text-gray-500">Publiées</p>
        <p class="text-2xl sm:text-3xl font-bold text-emerald-600">{{ stats.published }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 col-span-2 sm:col-span-1">
        <p class="text-xs sm:text-sm text-gray-500">Brouillons</p>
        <p class="text-2xl sm:text-3xl font-bold text-orange-500">{{ stats.draft }}</p>
      </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
    
    <!-- Empty state -->
    <div v-else-if="salesPages.length === 0" class="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune page de vente</h3>
      <p class="text-gray-500 mb-6">Créez votre première page de vente pour commencer</p>
      <NuxtLink to="/dashboard/sales-pages/create" class="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
        Créer une page
      </NuxtLink>
    </div>
    
    <!-- Liste des pages -->
    <div v-else class="grid gap-4 sm:gap-6">
      <div 
        v-for="page in salesPages" 
        :key="page.id"
        class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-gray-900 truncate">{{ page.title }}</h3>
              <span 
                class="px-2 py-0.5 text-xs font-medium rounded-full"
                :class="page.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'"
              >
                {{ page.is_published ? 'Publiée' : 'Brouillon' }}
              </span>
            </div>
            <p class="text-sm text-gray-500 truncate">{{ page.slug }}.leekpay.me</p>
            <p class="text-xs text-gray-400 mt-1">Modifiée le {{ formatDate(page.updated_at) }}</p>
          </div>
          
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <a
              v-if="page.is_published"
              :href="page.public_url"
              target="_blank"
              class="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir
            </a>
            <NuxtLink
              :to="`/dashboard/sales-pages/${page.id}/edit`"
              class="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Éditer
            </NuxtLink>
            <NuxtLink
              :to="`/dashboard/sales-pages/${page.id}/analytics`"
              class="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 text-sm border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Voir les analytics"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Stats
            </NuxtLink>
            <button
              @click="deletePage(page.id)"
              class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
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
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return
  
  try {
    await $fetch(`/sales-pages/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await fetchSalesPages()
  } catch (err) {
    console.error('Erreur suppression:', err)
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
