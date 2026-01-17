<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Bannières publicitaires</h1>
        <p class="text-gray-600">Gérer les bannières affichées dans le dashboard utilisateur</p>
      </div>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
      >
        Ajouter une bannière
      </button>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="banners.length === 0" class="border border-gray-200 p-8 text-center">
      <p class="text-gray-500">Aucune bannière créée</p>
      <button 
        @click="openCreateModal"
        class="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
      >
        Créer la première bannière
      </button>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="(banner, index) in banners" 
        :key="banner.id"
        class="border border-gray-200 p-4 flex items-center gap-4"
        :class="{ 'opacity-50': !banner.is_active }"
      >
        <div class="flex flex-col gap-1">
          <button 
            @click="moveUp(index)"
            :disabled="index === 0"
            class="p-1 hover:bg-gray-100 disabled:opacity-30"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
            </svg>
          </button>
          <button 
            @click="moveDown(index)"
            :disabled="index === banners.length - 1"
            class="p-1 hover:bg-gray-100 disabled:opacity-30"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <img 
          :src="banner.image_url" 
          :alt="banner.title"
          class="w-32 h-20 object-cover border border-gray-200"
        />

        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-900 truncate">{{ banner.title }}</h3>
          <p class="text-sm text-gray-500 truncate">{{ banner.url || 'Pas de lien' }}</p>
          <p class="text-xs text-gray-400 mt-1">Position: {{ banner.position }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="toggleBanner(banner)"
            :class="[
              'px-3 py-1 text-sm font-medium transition-colors',
              banner.is_active 
                ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ banner.is_active ? 'Actif' : 'Inactif' }}
          </button>
          
          <button
            @click="openEditModal(banner)"
            class="p-2 text-gray-600 hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          
          <button
            @click="confirmDelete(banner)"
            class="p-2 text-red-600 hover:bg-red-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-lg mx-4 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          {{ editingBanner ? 'Modifier la bannière' : 'Nouvelle bannière' }}
        </h2>
        
        <form @submit.prevent="saveBanner" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ex: Promotion été"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div 
              class="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-green-500 transition-colors"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <input 
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
              />
              <div v-if="imagePreview" class="mb-2">
                <img :src="imagePreview" class="max-h-40 mx-auto" />
              </div>
              <p class="text-sm text-gray-500">
                {{ imagePreview ? 'Cliquer pour changer l\'image' : 'Cliquer ou glisser une image' }}
              </p>
              <p class="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP (max 5MB)</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL de redirection (optionnel)</label>
            <input
              v-model="form.url"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="https://example.com/promo"
            />
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="saving || (!editingBanner && !form.image)"
              class="px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {{ saving ? 'Enregistrement...' : (editingBanner ? 'Modifier' : 'Créer') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-md mx-4 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">Supprimer la bannière</h2>
        <p class="text-gray-600 mb-4">
          Êtes-vous sûr de vouloir supprimer la bannière "{{ bannerToDelete?.title }}" ?
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="deleteBanner"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {{ deleting ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const { token } = useAuth()

const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const banners = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingBanner = ref(null)
const bannerToDelete = ref(null)
const imagePreview = ref('')

const form = ref({
  title: '',
  url: '',
  image: null
})

const fetchBanners = async () => {
  loading.value = true
  try {
    const response = await $fetch('/admin/banners', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    banners.value = response.data
  } catch (error) {
    console.error('Erreur chargement bannières:', error)
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  editingBanner.value = null
  form.value = { title: '', url: '', image: null }
  imagePreview.value = ''
  showModal.value = true
}

const openEditModal = (banner) => {
  editingBanner.value = banner
  form.value = {
    title: banner.title,
    url: banner.url || '',
    image: null
  }
  imagePreview.value = banner.image_url
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingBanner.value = null
  form.value = { title: '', url: '', image: null }
  imagePreview.value = ''
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const saveBanner = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    if (form.value.url) {
      formData.append('url', form.value.url)
    }
    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    if (editingBanner.value) {
      formData.append('_method', 'PUT')
      await $fetch(`/admin/banners/${editingBanner.value.id}`, {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` },
        body: formData
      })
    } else {
      await $fetch('/admin/banners', {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: { Authorization: `Bearer ${token.value}` },
        body: formData
      })
    }

    closeModal()
    await fetchBanners()
  } catch (error) {
    console.error('Erreur sauvegarde:', error)
    alert('Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}

const toggleBanner = async (banner) => {
  try {
    await $fetch(`/admin/banners/${banner.id}/toggle`, {
      method: 'PATCH',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    banner.is_active = !banner.is_active
  } catch (error) {
    console.error('Erreur toggle:', error)
  }
}

const confirmDelete = (banner) => {
  bannerToDelete.value = banner
  showDeleteModal.value = true
}

const deleteBanner = async () => {
  if (!bannerToDelete.value) return
  deleting.value = true
  try {
    await $fetch(`/admin/banners/${bannerToDelete.value.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    showDeleteModal.value = false
    bannerToDelete.value = null
    await fetchBanners()
  } catch (error) {
    console.error('Erreur suppression:', error)
  } finally {
    deleting.value = false
  }
}

const moveUp = async (index) => {
  if (index === 0) return
  const newOrder = [...banners.value]
  const temp = newOrder[index]
  newOrder[index] = newOrder[index - 1]
  newOrder[index - 1] = temp
  banners.value = newOrder
  await updateOrder()
}

const moveDown = async (index) => {
  if (index === banners.value.length - 1) return
  const newOrder = [...banners.value]
  const temp = newOrder[index]
  newOrder[index] = newOrder[index + 1]
  newOrder[index + 1] = temp
  banners.value = newOrder
  await updateOrder()
}

const updateOrder = async () => {
  try {
    await $fetch('/admin/banners/reorder', {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: { 
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: {
        order: banners.value.map(b => b.id)
      }
    })
  } catch (error) {
    console.error('Erreur réorganisation:', error)
  }
}

onMounted(() => {
  fetchBanners()
})
</script>
