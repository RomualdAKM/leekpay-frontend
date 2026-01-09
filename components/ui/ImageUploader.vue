<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-xs text-gray-500">{{ label }}</label>
    
    <!-- Preview de l'image actuelle -->
    <div v-if="modelValue" class="relative group">
      <img 
        :src="modelValue" 
        :alt="label || 'Image'"
        class="w-full h-32 object-cover rounded-lg border border-gray-200"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
        <button 
          type="button"
          @click="triggerFileInput"
          class="p-2 bg-white rounded-full hover:bg-gray-100"
          title="Changer"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          type="button"
          @click="clearImage"
          class="p-2 bg-white rounded-full hover:bg-gray-100"
          title="Supprimer"
        >
          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Zone d'upload (si pas d'image ou mode URL) -->
    <div v-else>
      <!-- Mode Upload -->
      <div 
        v-if="!showUrlInput"
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
        class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors"
        :class="isDragging ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'"
      >
        <div v-if="isUploading" class="flex flex-col items-center">
          <svg class="w-8 h-8 text-emerald-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span class="text-xs text-gray-500 mt-2">Upload en cours...</span>
        </div>
        <div v-else class="flex flex-col items-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-xs text-gray-600 mt-2">Cliquez ou glissez une image</span>
          <span class="text-[10px] text-gray-400 mt-1">PNG, JPG, GIF, WebP (max 5MB)</span>
        </div>
      </div>
      
      <!-- Bouton pour basculer vers URL -->
      <button 
        v-if="!showUrlInput"
        type="button"
        @click="showUrlInput = true"
        class="text-xs text-gray-500 hover:text-emerald-600 mt-2"
      >
        Ou coller une URL
      </button>
      
      <!-- Mode URL -->
      <div v-if="showUrlInput" class="space-y-2">
        <input
          v-model="urlInput"
          type="url"
          placeholder="https://example.com/image.jpg"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
          @blur="applyUrl"
          @keyup.enter="applyUrl"
        />
        <button 
          type="button"
          @click="showUrlInput = false; urlInput = ''"
          class="text-xs text-gray-500 hover:text-emerald-600"
        >
          Uploader un fichier
        </button>
      </div>
    </div>
    
    <!-- Input file caché -->
    <input 
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/gif,image/webp"
      class="hidden"
      @change="handleFileSelect"
    />
    
    <!-- Message d'erreur -->
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const config = useRuntimeConfig()
const { token } = useAuth()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const isDragging = ref(false)
const showUrlInput = ref(false)
const urlInput = ref('')
const error = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    uploadFile(input.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files?.length) {
    uploadFile(files[0])
  }
}

const uploadFile = async (file: File) => {
  // Validation
  if (!file.type.startsWith('image/')) {
    error.value = 'Le fichier doit être une image'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'L\'image ne doit pas dépasser 5MB'
    return
  }
  
  error.value = ''
  isUploading.value = true
  
  try {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await $fetch<{ success: boolean; data: { url: string } }>(
      '/sales-pages/upload-image',
      {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: formData,
      }
    )
    
    if (response.success) {
      emit('update:modelValue', response.data.url)
    } else {
      error.value = 'Erreur lors de l\'upload'
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Erreur lors de l\'upload'
  } finally {
    isUploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const applyUrl = () => {
  if (urlInput.value && urlInput.value.startsWith('http')) {
    emit('update:modelValue', urlInput.value)
    showUrlInput.value = false
    urlInput.value = ''
  }
}

const clearImage = () => {
  emit('update:modelValue', '')
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="12"%3EImage%3C/text%3E%3C/svg%3E'
}
</script>
