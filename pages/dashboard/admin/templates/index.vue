<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Templates de Pages</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez les templates disponibles pour les utilisateurs</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Nouveau template
      </button>
    </div>
    
    <!-- Filtres -->
    <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <select
          v-model="filters.category"
          @change="fetchTemplates"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Toutes les catégories</option>
          <option v-for="(label, key) in categories" :key="key" :value="key">{{ label }}</option>
        </select>
        <select
          v-model="filters.is_active"
          @change="fetchTemplates"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Tous les statuts</option>
          <option value="1">Actifs</option>
          <option value="0">Inactifs</option>
        </select>
        <input
          v-model="filters.search"
          @input="debouncedSearch"
          type="text"
          placeholder="Rechercher..."
          class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/>
    </div>
    
    <!-- Liste -->
    <div v-else-if="templates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="template in templates"
        :key="template.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Thumbnail -->
        <div class="aspect-video bg-gray-100 relative">
          <img
            v-if="template.thumbnail_url"
            :src="template.thumbnail_url"
            :alt="template.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <!-- Badge statut -->
          <span
            class="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full"
            :class="template.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
          >
            {{ template.is_active ? 'Actif' : 'Inactif' }}
          </span>
        </div>
        
        <!-- Contenu -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="font-semibold text-gray-900">{{ template.name }}</h3>
            <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{{ categories[template.category] || template.category }}</span>
          </div>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ template.description || 'Aucune description' }}</p>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>{{ template.usage_count }} utilisations</span>
            <span>{{ formatDate(template.created_at) }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
          <NuxtLink
            :to="`/dashboard/admin/templates/${template.id}/edit`"
            class="flex-1 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-center"
          >
            Personnaliser
          </NuxtLink>
          <button
            @click="toggleTemplate(template)"
            class="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100"
            :class="template.is_active ? 'border-orange-300 text-orange-600' : 'border-emerald-300 text-emerald-600'"
          >
            {{ template.is_active ? 'Désactiver' : 'Activer' }}
          </button>
          <button
            @click="deleteTemplate(template)"
            class="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucun template</h3>
      <p class="text-gray-500 mb-4">Créez votre premier template de page de vente</p>
      <button @click="openCreateModal" class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
        Créer un template
      </button>
    </div>
    
    <!-- Modal Création -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black/50" @click="closeModal"/>
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Nouveau template</h2>
          
          <form @submit.prevent="saveTemplate" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Landing Page Pro"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                <select
                  v-model="form.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option v-for="(label, key) in categories" :key="key" :value="key">{{ label }}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Description du template..."
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                @change="handleThumbnail"
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>
            
            <div class="flex items-center">
              <input
                v-model="form.is_active"
                type="checkbox"
                id="is_active"
                class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label for="is_active" class="ml-2 text-sm text-gray-700">Activer ce template</label>
            </div>
            
            <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p class="text-sm text-emerald-800">
                Après la création, cliquez sur <strong>Personnaliser</strong> pour définir les blocs du template avec le builder.
              </p>
            </div>
            
            <div class="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
              >
                {{ saving ? 'Création...' : 'Créer le template' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()

const loading = ref(true)
const saving = ref(false)
const templates = ref<any[]>([])
const categories = ref<Record<string, string>>({})
const showModal = ref(false)

const filters = reactive({
  category: '',
  is_active: '',
  search: ''
})

const form = reactive({
  name: '',
  description: '',
  category: 'general',
  is_active: true,
  thumbnail: null as File | null
})

let searchTimeout: any = null

const fetchTemplates = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.is_active) params.append('is_active', filters.is_active)
    if (filters.search) params.append('search', filters.search)
    
    const response = await $fetch<any>(`/admin/sales-page-templates?${params}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    templates.value = response.data || []
    categories.value = response.categories || {}
  } catch (err) {
    console.error('Erreur:', err)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(fetchTemplates, 300)
}

const openCreateModal = () => {
  form.name = ''
  form.description = ''
  form.category = 'general'
  form.is_active = true
  form.thumbnail = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleThumbnail = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.thumbnail = input.files[0]
  }
}

const saveTemplate = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', form.category)
    formData.append('description', form.description || '')
    formData.append('is_active', form.is_active ? '1' : '0')
    if (form.thumbnail) {
      formData.append('thumbnail', form.thumbnail)
    }
    
    await $fetch('/admin/sales-page-templates', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body: formData
    })
    
    closeModal()
    await fetchTemplates()
  } catch (err: any) {
    console.error('Erreur:', err)
    alert(err.data?.message || 'Erreur lors de la création')
  } finally {
    saving.value = false
  }
}

const toggleTemplate = async (template: any) => {
  try {
    await $fetch(`/admin/sales-page-templates/${template.id}/toggle`, {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await fetchTemplates()
  } catch (err) {
    console.error('Erreur:', err)
  }
}

const deleteTemplate = async (template: any) => {
  if (!confirm(`Supprimer le template "${template.name}" ?`)) return
  
  try {
    await $fetch(`/admin/sales-page-templates/${template.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await fetchTemplates()
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

onMounted(fetchTemplates)
</script>
