<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="product"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- LISTE DES PRODUITS -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Produits ({{ localProps.products?.length || 0 }})</h4>
        <button 
          @click="addProduct"
          class="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          + Ajouter
        </button>
      </div>
      
      <!-- Produits -->
      <div class="space-y-3">
        <div 
          v-for="(product, index) in localProps.products" 
          :key="product.id"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Header du produit -->
          <div 
            class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
            @click="toggleProduct(product.id)"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ product.name || 'Sans nom' }}</p>
                <p class="text-xs text-gray-500">{{ formatPrice(product.price) }} {{ localProps.currency }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click.stop="removeProduct(index)"
                class="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <svg 
                :class="['w-4 h-4 text-gray-400 transition-transform', expandedProduct === product.id ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <!-- Détails du produit -->
          <div v-if="expandedProduct === product.id" class="p-4 space-y-4">
            <!-- Image -->
            <div>
              <label class="block text-xs text-gray-500 mb-2">Image</label>
              <div v-if="product.image" class="relative aspect-video rounded-lg overflow-hidden bg-gray-100 mb-2">
                <img :src="product.image" class="w-full h-full object-cover" />
                <button 
                  @click="product.image = null; emitUpdate()"
                  class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <label v-else class="block">
                <div class="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors mb-2">
                  <svg class="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-xs text-gray-500">Ajouter une image</span>
                </div>
                <input type="file" accept="image/*" class="hidden" @change="(e) => handleProductImage(e, index)" />
              </label>
              <input 
                v-model="product.image" 
                @input="emitUpdate" 
                type="url" 
                placeholder="URL de l'image" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
              />
            </div>
            
            <!-- Nom -->
            <div>
              <label class="block text-xs text-gray-500 mb-1">Nom</label>
              <input v-model="product.name" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            
            <!-- Description -->
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea v-model="product.description" @input="emitUpdate" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"></textarea>
            </div>
            
            <!-- Prix -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Prix</label>
                <input v-model="product.price" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div v-if="localProps.showOriginalPrice">
                <label class="block text-xs text-gray-500 mb-1">Prix barré</label>
                <input v-model="product.originalPrice" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
            
            <!-- Bouton -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
                <input v-model="product.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">URL</label>
                <input v-model="product.buttonUrl" @input="emitUpdate" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message si vide -->
      <div v-if="!localProps.products?.length" class="text-center py-8 text-gray-400">
        <svg class="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p class="text-sm">Aucun produit</p>
      </div>
    </div>
    
    <!-- OPTIONS GLOBALES -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Options</h4>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Devise</label>
            <select v-model="localProps.currency" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="FCFA">FCFA</option>
              <option value="€">EUR (€)</option>
              <option value="$">USD ($)</option>
              <option value="XOF">XOF</option>
              <option value="GNF">GNF</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ouvrir liens</label>
            <select v-model="localProps.buttonTarget" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="_self">Même onglet</option>
              <option value="_blank">Nouvel onglet</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showOriginalPrice" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Afficher prix barrés</label>
        </div>
      </div>
    </div>
    
    <!-- APPARENCE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Apparence</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur d'accent</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.accentColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, inject, ref } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

interface Product {
  id: string
  image: string | null
  name: string
  description: string
  price: string
  originalPrice: string
  buttonText: string
  buttonUrl: string
}

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const uploadImage = inject<(file: File) => Promise<string | null>>('uploadImage')

const expandedProduct = ref<string | null>(null)

const localProps = reactive({ 
  products: [] as Product[],
  currency: 'FCFA',
  showOriginalPrice: false,
  buttonTarget: '_self',
  backgroundColor: '#ffffff',
  accentColor: '#10b981',
  ...props.props 
})

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, newVal) 
}, { deep: true })

const emitUpdate = () => { 
  emit('update', { ...localProps }) 
}

const toggleProduct = (id: string) => {
  expandedProduct.value = expandedProduct.value === id ? null : id
}

const addProduct = () => {
  const newId = Date.now().toString()
  if (!localProps.products) localProps.products = []
  localProps.products.push({
    id: newId,
    image: null,
    name: 'Nouveau produit',
    description: '',
    price: '0',
    originalPrice: '',
    buttonText: 'Acheter',
    buttonUrl: '',
  })
  expandedProduct.value = newId
  emitUpdate()
}

const removeProduct = (index: number) => {
  localProps.products.splice(index, 1)
  emitUpdate()
}

const handleProductImage = async (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  
  if (uploadImage) {
    const url = await uploadImage(file)
    if (url) {
      localProps.products[index].image = url
      emitUpdate()
    }
  } else {
    const reader = new FileReader()
    reader.onload = (event) => {
      localProps.products[index].image = event.target?.result as string
      emitUpdate()
    }
    reader.readAsDataURL(file)
  }
}

const formatPrice = (price: string | number): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return String(price)
  return num.toLocaleString('fr-FR')
}
</script>
