<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="product" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- CONTENU -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showTitle" @change="updateProp('showTitle', localProps.showTitle)" class="rounded"/>
          <label class="text-xs text-gray-500">Afficher le titre</label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre de section</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" placeholder="Nos produits phares" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille du titre</label>
            <select v-model="localProps.titleSize" @change="updateProp('titleSize', localProps.titleSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.titleWeight" @change="updateProp('titleWeight', localProps.titleWeight)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Moyen</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
              <option value="extrabold">Extra-gras</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <input type="color" v-model="localProps.titleColor" @input="updateProp('titleColor', localProps.titleColor)" class="w-10 h-10 rounded border border-gray-300 cursor-pointer"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <div class="grid grid-cols-3 gap-1">
              <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('titleAlign', a)" :class="['px-2 py-1 text-xs rounded border', localProps.titleAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
                {{ a === 'left' ? 'G' : a === 'center' ? 'C' : 'D' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité</label>
            <div class="flex items-center gap-1">
              <input type="range" min="0" max="100" v-model.number="localProps.titleOpacity" @input="updateProp('titleOpacity', localProps.titleOpacity)" class="flex-1"/>
              <span class="text-xs text-gray-500 w-7">{{ localProps.titleOpacity }}%</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showSubtitle" @change="updateProp('showSubtitle', localProps.showSubtitle)" class="rounded"/>
          <label class="text-xs text-gray-500">Afficher le sous-titre</label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre de section</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" placeholder="Découvrez notre sélection..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.subtitleSize" @change="updateProp('subtitleSize', localProps.subtitleSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.subtitleWeight" @change="updateProp('subtitleWeight', localProps.subtitleWeight)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Moyen</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <input type="color" v-model="localProps.subtitleColor" @input="updateProp('subtitleColor', localProps.subtitleColor)" class="w-10 h-10 rounded border border-gray-300 cursor-pointer"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <div class="grid grid-cols-3 gap-1">
              <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('subtitleAlign', a)" :class="['px-2 py-1 text-xs rounded border', localProps.subtitleAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
                {{ a === 'left' ? 'G' : a === 'center' ? 'C' : 'D' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité</label>
            <div class="flex items-center gap-2">
              <input type="range" min="0" max="100" v-model.number="localProps.subtitleOpacity" @input="updateProp('subtitleOpacity', localProps.subtitleOpacity)" class="flex-1"/>
              <span class="text-xs text-gray-500 w-8">{{ localProps.subtitleOpacity }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                @update:model-value="(val) => updateProductImage(Number(idx), val)"
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
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Accent</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Début</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientStart" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fin</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientEnd" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
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

    <!-- BOUTON CTA -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cta = !sections.cta" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton CTA</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cta ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.cta" class="mt-3 space-y-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showButton" @change="updateProp('showButton', localProps.showButton)" class="rounded"/>
          <label class="text-xs text-gray-500">Afficher le bouton</label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
          <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL du bouton</label>
          <input v-model="localProps.buttonUrl" @input="emitUpdate" type="text" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.buttonSize" @change="updateProp('buttonSize', localProps.buttonSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="sm">Petit</option>
              <option value="md">Moyen</option>
              <option value="lg">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Rayon</label>
            <select v-model="localProps.buttonBorderRadius" @change="updateProp('buttonBorderRadius', localProps.buttonBorderRadius)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucun</option>
              <option value="sm">Petit</option>
              <option value="md">Moyen</option>
              <option value="lg">Grand</option>
              <option value="full">Rond</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ombre</label>
            <select v-model="localProps.buttonShadow" @change="updateProp('buttonShadow', localProps.buttonShadow)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucune</option>
              <option value="sm">Petite</option>
              <option value="md">Moyenne</option>
              <option value="lg">Grande</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- POSITIONNEMENT -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.positioning = !sections.positioning" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Positionnement</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.positioning ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.positioning" class="mt-3">
        <PositioningSection
          :elements="['title', 'subtitle', 'products', 'button']"
          :elements-order="localProps.elementsOrder"
          :offsets="{
            titleOffsetY: localProps.titleOffsetY,
            subtitleOffsetY: localProps.subtitleOffsetY,
            productsOffsetY: localProps.productsOffsetY,
            buttonOffsetY: localProps.buttonOffsetY
          }"
          :labels="{ title: 'Titre', subtitle: 'Sous-titre', products: 'Grille de produits', button: 'Bouton CTA' }"
          @update:elements-order="updateProp('elementsOrder', $event)"
          @update:offsets="updateOffsets"
        />
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
import PositioningSection from './PositioningSection.vue'

interface Product { id: string; image: string | null; name: string; description: string; price: string; originalPrice: string; buttonText: string; buttonUrl: string }

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const uploadImage = inject<(file: File) => Promise<string | null>>('uploadImage')

const sections = reactive({ content: false, products: true, options: false, appearance: false, cta: false, positioning: false, advanced: false })
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
  title: props.props.title || '',
  subtitle: props.props.subtitle || '',
  // Titre
  showTitle: props.props.showTitle !== false,
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || 'center',
  titleOpacity: props.props.titleOpacity !== undefined ? props.props.titleOpacity : 100,
  titleMarginBottom: props.props.titleMarginBottom || 16,
  // Sous-titre
  showSubtitle: props.props.showSubtitle !== false,
  subtitleSize: props.props.subtitleSize || 'medium',
  subtitleWeight: props.props.subtitleWeight || 'normal',
  subtitleColor: props.props.subtitleColor || '',
  subtitleAlign: props.props.subtitleAlign || 'center',
  subtitleOpacity: props.props.subtitleOpacity !== undefined ? props.props.subtitleOpacity : 70,
  headerAlignment: props.props.headerAlignment || 'center',
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'Découvrir tous les produits',
  buttonUrl: props.props.buttonUrl || '',
  buttonSize: props.props.buttonSize || 'md',
  buttonBorderRadius: props.props.buttonBorderRadius || 'full',
  buttonShadow: props.props.buttonShadow || 'lg',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['title', 'subtitle', 'products', 'button'],
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  productsOffsetY: props.props.productsOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['title', 'subtitle', 'products', 'button']
requiredElements.forEach(el => {
  if (localProps.elementsOrder && !localProps.elementsOrder.includes(el)) {
    localProps.elementsOrder.push(el)
  }
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  emitUpdate()
}

const toggleProduct = (id: string) => { expandedProduct.value = expandedProduct.value === id ? null : id }

function addProduct() {
  const newId = Date.now().toString()
  if (!localProps.products) localProps.products = []
  localProps.products.push({ id: newId, image: null, name: 'Nouveau produit', description: '', price: '0', originalPrice: '', buttonText: 'Acheter', buttonUrl: '' })
  expandedProduct.value = newId
  emitUpdate()
}

function removeProduct(idx: number) { localProps.products.splice(idx, 1); emitUpdate() }

// Mise à jour de l'image produit avec valeur explicite
function updateProductImage(index: number, value: string) {
  if (localProps.products && localProps.products[index]) {
    localProps.products[index].image = value
    emitUpdate()
  }
}

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num)) return String(price)
  return num.toLocaleString('fr-FR')
}
</script>
