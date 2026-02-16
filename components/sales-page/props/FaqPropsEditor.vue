<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="faq" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- ===== CONTENU ===== -->
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
          <label class="block text-xs text-gray-500 mb-1">Titre</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
            <input type="color" v-model="localProps.titleColor" @input="updateProp('titleColor', localProps.titleColor)" class="w-full h-8 rounded border border-gray-300"/>
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
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
            <input type="color" v-model="localProps.subtitleColor" @input="updateProp('subtitleColor', localProps.subtitleColor)" class="w-full h-8 rounded border border-gray-300"/>
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
    
    <!-- ===== QUESTIONS ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.items = !sections.items" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Questions ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.items ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.items" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
        </div>
        <div v-for="(item, index) in localProps.items" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer" @click="toggleExpanded(index)">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-90': expandedItems.includes(index) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              <span class="text-sm font-medium text-gray-700 truncate max-w-[200px]">{{ item.question || `Question ${index + 1}` }}</span>
            </div>
            <button v-if="localProps.items.length > 1" @click.stop="removeItem(index)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <div v-if="expandedItems.includes(index)" class="p-3 space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Question</label>
              <input v-model="item.question" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Réponse</label>
              <textarea v-model="item.answer" @input="emitUpdate" rows="3" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- COMPORTEMENT -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cta = !sections.cta" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Comportement & CTA</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cta ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.cta" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.allowMultiple" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Autoriser plusieurs questions ouvertes</span>
        </label>
        <label class="flex items-center gap-2">
          <input v-model="localProps.expandFirstByDefault" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Ouvrir la première par défaut</span>
        </label>
        
        <div class="pt-2 border-t border-gray-100 mt-2 space-y-3">
          <label class="flex items-center gap-2">
            <input v-model="localProps.showButton" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600 font-semibold">Afficher un bouton CTA</span>
          </label>
          <div v-if="localProps.showButton" class="space-y-2 pl-6">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
              <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">URL du bouton</label>
              <input v-model="localProps.buttonUrl" @input="emitUpdate" type="text" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== APPARENCE ===== -->
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
        <div v-if="localProps.backgroundType === 'solid'">
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur accent (icône)</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
          <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== BOUTON CTA ===== -->
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
    
    <!-- ===== POSITIONNEMENT ===== -->
    <PositioningSection
      :elements="['badge', 'title', 'subtitle', 'items', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{ 
        badgeOffsetY: localProps.badgeOffsetY,
        titleOffsetY: localProps.titleOffsetY, 
        subtitleOffsetY: localProps.subtitleOffsetY, 
        itemsOffsetY: localProps.itemsOffsetY,
        buttonOffsetY: localProps.buttonOffsetY
      }"
      :labels="{ badge: 'Badge', title: 'Titre', subtitle: 'Sous-titre', items: 'Questions', button: 'Bouton CTA' }"
      @update:elements-order="updateProp('elementsOrder', $event)"
      @update:offsets="updateOffsets"
    />

    <!-- ===== AVANCÉ ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="faq" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
import { reactive, watch, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  content: true,
  items: false,
  appearance: false,
  cta: false,
  positioning: false,
  advanced: false,
})

const defaultItems = [
  { question: 'Comment ça fonctionne ?', answer: "C'est très simple..." },
  { question: 'Quels sont les délais ?', answer: 'Les délais varient selon...' },
]

const expandedItems = ref<number[]>([0])

const localProps = reactive({
  templateId: props.props.templateId || 'faq-minimal-1',
  title: props.props.title || 'Questions fréquentes',
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
  items: props.props.items || defaultItems,
  allowMultiple: props.props.allowMultiple || false,
  expandFirstByDefault: props.props.expandFirstByDefault !== false,
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  accentColor: props.props.accentColor || '#10b981',
  paddingY: props.props.paddingY || 'large',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  showBadge: props.props.showBadge || false,
  badge: props.props.badge || 'FAQ',
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'Démarrer maintenant',
  buttonUrl: props.props.buttonUrl || '',
  buttonTarget: props.props.buttonTarget || '_self',
  buttonSize: props.props.buttonSize || 'md',
  buttonBorderRadius: props.props.buttonBorderRadius || 'full',
  buttonShadow: props.props.buttonShadow || 'none',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['badge', 'title', 'subtitle', 'items', 'button'],
  badgeOffsetY: props.props.badgeOffsetY || 0,
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  itemsOffsetY: props.props.itemsOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['badge', 'title', 'subtitle', 'items', 'button']
requiredElements.forEach(el => {
  if (localProps.elementsOrder && !localProps.elementsOrder.includes(el)) {
    localProps.elementsOrder.push(el)
  }
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
  if (!localProps.items?.length) localProps.items = defaultItems
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => {
  (localProps as any)[key] = value
  emitUpdate()
}

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  emitUpdate()
}

function toggleExpanded(index: number) {
  const idx = expandedItems.value.indexOf(index)
  if (idx === -1) expandedItems.value.push(index)
  else expandedItems.value.splice(idx, 1)
}

function addItem() {
  if (!localProps.items) localProps.items = []
  localProps.items.push({ question: 'Nouvelle question ?', answer: 'Réponse...' })
  expandedItems.value.push(localProps.items.length - 1)
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  const expIdx = expandedItems.value.indexOf(index)
  if (expIdx !== -1) expandedItems.value.splice(expIdx, 1)
  emitUpdate()
}
</script>
