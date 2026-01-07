<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="grid"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- OPTIONS DE GRILLE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Options</h4>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement</label>
            <select v-model="localProps.gap" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.verticalAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="top">Haut</option>
              <option value="center">Centre</option>
              <option value="bottom">Bas</option>
              <option value="stretch">Étirer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉLÉMENTS -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Éléments ({{ localProps.items?.length || 0 }})</h4>
        <div class="flex gap-1">
          <button 
            @click="addItem('text')"
            class="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            title="Ajouter texte"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <button 
            @click="addItem('image')"
            class="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            title="Ajouter image"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            @click="addItem('video')"
            class="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            title="Ajouter vidéo"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Liste des éléments -->
      <div class="space-y-2">
        <div 
          v-for="(item, index) in localProps.items" 
          :key="item.id"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Header -->
          <div 
            class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
            @click="toggleItem(item.id)"
          >
            <div class="flex items-center gap-2">
              <!-- Icône du type -->
              <div class="w-8 h-8 rounded bg-white border flex items-center justify-center">
                <svg v-if="item.type === 'text'" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <svg v-else-if="item.type === 'image'" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700 capitalize">{{ getItemLabel(item.type) }}</span>
            </div>
            <div class="flex items-center gap-1">
              <!-- Déplacer haut -->
              <button 
                v-if="index > 0"
                @click.stop="moveItem(index, -1)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <!-- Déplacer bas -->
              <button 
                v-if="index < localProps.items.length - 1"
                @click.stop="moveItem(index, 1)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <!-- Supprimer -->
              <button 
                @click.stop="removeItem(index)"
                class="p-1 text-gray-400 hover:text-red-500"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <!-- Chevron -->
              <svg 
                :class="['w-4 h-4 text-gray-400 transition-transform ml-1', expandedItem === item.id ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <!-- Contenu dépliable -->
          <div v-if="expandedItem === item.id" class="p-4 space-y-3">
            <!-- TEXTE -->
            <div v-if="item.type === 'text'">
              <label class="block text-xs text-gray-500 mb-1">Contenu HTML</label>
              <textarea 
                v-model="item.content" 
                @input="emitUpdate" 
                rows="4" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono resize-none"
                placeholder="<h2>Titre</h2><p>Paragraphe...</p>"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1">Supporte h1-h4, p, ul, ol, strong, em</p>
            </div>
            
            <!-- IMAGE -->
            <div v-else-if="item.type === 'image'" class="space-y-3">
              <div v-if="item.content" class="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img :src="item.content" class="w-full h-full object-cover" />
                <button 
                  @click="item.content = null; emitUpdate()"
                  class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <label v-else class="block">
                <div class="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors">
                  <svg class="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-xs text-gray-500">Ajouter image</span>
                </div>
                <input type="file" accept="image/*" class="hidden" @change="(e) => handleImageUpload(e, index)" />
              </label>
              <div>
                <label class="block text-xs text-gray-500 mb-1">URL de l'image</label>
                <input 
                  v-model="item.content" 
                  @input="emitUpdate" 
                  type="url" 
                  placeholder="https://..." 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Texte alternatif</label>
                <input 
                  v-model="item.alt" 
                  @input="emitUpdate" 
                  type="text" 
                  placeholder="Description de l'image" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                />
              </div>
            </div>
            
            <!-- VIDEO -->
            <div v-else-if="item.type === 'video'">
              <label class="block text-xs text-gray-500 mb-1">URL de la vidéo</label>
              <input 
                v-model="item.content" 
                @input="emitUpdate" 
                type="url" 
                placeholder="https://youtube.com/watch?v=..." 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
              />
              <p class="text-xs text-gray-400 mt-1">YouTube, Vimeo ou URL directe</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message si vide -->
      <div v-if="!localProps.items?.length" class="text-center py-6 text-gray-400">
        <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <p class="text-sm">Aucun élément</p>
        <p class="text-xs mt-1">Utilisez les boutons ci-dessus</p>
      </div>
    </div>
    
    <!-- APPARENCE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Apparence</h4>
      <div>
        <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.backgroundColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
          <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, inject, ref } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

interface GridItem {
  id: string
  type: 'text' | 'image' | 'video'
  content: string | null
  alt?: string
  span?: number
}

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const uploadImage = inject<(file: File) => Promise<string | null>>('uploadImage')

const expandedItem = ref<string | null>(null)

const localProps = reactive({ 
  templateId: 'grid-2-cols',
  gap: 'medium',
  verticalAlign: 'center',
  items: [] as GridItem[],
  backgroundColor: '#ffffff',
  ...props.props 
})

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, newVal) 
}, { deep: true })

const emitUpdate = () => { 
  emit('update', { ...localProps }) 
}

const toggleItem = (id: string) => {
  expandedItem.value = expandedItem.value === id ? null : id
}

const getItemLabel = (type: string): string => {
  const labels: Record<string, string> = {
    text: 'Texte',
    image: 'Image',
    video: 'Vidéo',
  }
  return labels[type] || type
}

const addItem = (type: 'text' | 'image' | 'video') => {
  const newId = Date.now().toString()
  if (!localProps.items) localProps.items = []
  
  const defaults: Record<string, any> = {
    text: { id: newId, type: 'text', content: '<p>Votre texte ici...</p>', span: 1 },
    image: { id: newId, type: 'image', content: null, alt: '', span: 1 },
    video: { id: newId, type: 'video', content: '', span: 1 },
  }
  
  localProps.items.push(defaults[type])
  expandedItem.value = newId
  emitUpdate()
}

const removeItem = (index: number) => {
  localProps.items.splice(index, 1)
  emitUpdate()
}

const moveItem = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= localProps.items.length) return
  
  const item = localProps.items[index]
  localProps.items.splice(index, 1)
  localProps.items.splice(newIndex, 0, item)
  emitUpdate()
}

const handleImageUpload = async (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  
  if (uploadImage) {
    const url = await uploadImage(file)
    if (url) {
      localProps.items[index].content = url
      emitUpdate()
    }
  } else {
    const reader = new FileReader()
    reader.onload = (event) => {
      localProps.items[index].content = event.target?.result as string
      emitUpdate()
    }
    reader.readAsDataURL(file)
  }
}
</script>
