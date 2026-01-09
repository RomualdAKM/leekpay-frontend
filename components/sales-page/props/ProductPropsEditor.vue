<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="product" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- PRODUITS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.products = !sections.products" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Produits ({{ localProps.products?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.products ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.products" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addProduct" class="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">+ Ajouter</button>
        </div>
        <div v-for="(product, idx) in localProps.products" :key="product.id" class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="flex items-center justify-between p-2 bg-gray-50 cursor-pointer" @click="toggleProduct(product.id)">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                <img v-if="product.image" :src="product.image" class="w-full h-full object-cover"/>
                <span v-else class="text-xs text-gray-400">?</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ product.name || 'Sans nom' }}</p>
                <p class="text-xs text-gray-500">{{ formatPrice(product.price) }} {{ localProps.currency }}</p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button @click.stop="removeProduct(idx)" class="p-1 text-gray-400 hover:text-red-500">×</button>
              <ChevronDown :class="['w-4 h-4 text-gray-400 transition-transform', expandedProduct === product.id ? 'rotate-180' : '']"/>
            </div>
          </div>
          <div v-if="expandedProduct === product.id" class="p-3 space-y-3">
            <div>
              <UiImageUploader
                v-model="product.image"
                label="Image"
                @update:model-value="emitUpdate"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Nom</label>
              <input v-model="product.name" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea v-model="product.description" @input="emitUpdate" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Prix</label>
                <input v-model="product.price" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              </div>
              <div v-if="localProps.showOriginalPrice">
                <label class="block text-xs text-gray-500 mb-1">Prix barré</label>
                <input v-model="product.originalPrice" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
                <input v-model="product.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">URL</label>
                <input v-model="product.buttonUrl" @input="emitUpdate" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!localProps.products?.length" class="text-center py-4 text-gray-400 text-sm">Aucun produit</div>
      </div>
    </div>
    
    <!-- OPTIONS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.options = !sections.options" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Options</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.options ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.options" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Devise</label>
            <select v-model="localProps.currency" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
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
        <label class="flex items-center gap-2"><input v-model="localProps.showOriginalPrice" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Afficher prix barrés</span></label>
      </div>
    </div>
    
    <!-- APPARENCE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.appearance = !sections.appearance" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Apparence</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.appearance ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.appearance" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Type de fond</label>
          <select v-model="localProps.backgroundType" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="solid">Couleur unie</option>
            <option value="gradient">Dégradé</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        <div v-if="localProps.backgroundType === 'solid'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond</label>
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Accent</label>
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-full h-10 rounded cursor-pointer border-0"/>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Début</label>
            <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fin</label>
            <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
          <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- AVANCÉ -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="products" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Classes CSS</label>
          <input v-model="localProps.customClasses" @input="emitUpdate" type="text" placeholder="my-class" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, inject } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'

interface Product { id: string; image: string | null; name: string; description: string; price: string; originalPrice: string; buttonText: string; buttonUrl: string }

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const uploadImage = inject<(file: File) => Promise<string | null>>('uploadImage')

const sections = reactive({ products: true, options: false, appearance: false, advanced: false })
const expandedProduct = ref<string | null>(null)

const localProps = reactive({
  templateId: props.props.templateId || 'product-grid',
  products: props.props.products || [] as Product[],
  currency: props.props.currency || 'FCFA',
  showOriginalPrice: props.props.showOriginalPrice || false,
  buttonTarget: props.props.buttonTarget || '_self',
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  accentColor: props.props.accentColor || '#10b981',
  paddingY: props.props.paddingY || 'large',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

const toggleProduct = (id: string) => { expandedProduct.value = expandedProduct.value === id ? null : id }

function addProduct() {
  const newId = Date.now().toString()
  if (!localProps.products) localProps.products = []
  localProps.products.push({ id: newId, image: null, name: 'Nouveau produit', description: '', price: '0', originalPrice: '', buttonText: 'Acheter', buttonUrl: '' })
  expandedProduct.value = newId
  emitUpdate()
}

function removeProduct(idx: number) { localProps.products.splice(idx, 1); emitUpdate() }

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return String(price)
  return num.toLocaleString('fr-FR')
}
</script>
