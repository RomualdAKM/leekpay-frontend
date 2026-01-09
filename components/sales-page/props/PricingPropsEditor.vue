<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="pricing" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- ===== CONTENU ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('headerAlignment', a)" :class="['px-3 py-1.5 text-xs rounded border', localProps.headerAlignment === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== PLANS ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.plans = !sections.plans" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Plans ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.plans ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.plans" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addPlan" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
        </div>
        <div v-for="(plan, idx) in localProps.items" :key="idx" class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer" @click="togglePlan(idx)">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-90': expandedPlans.includes(idx) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              <span class="text-sm font-medium text-gray-700">{{ plan.name || `Plan ${idx + 1}` }}</span>
              <span v-if="plan.highlighted" class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Populaire</span>
            </div>
            <button v-if="localProps.items.length > 1" @click.stop="removePlan(idx)" class="text-xs text-red-500">Supprimer</button>
          </div>
          <div v-if="expandedPlans.includes(idx)" class="p-3 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Nom</label>
                <input v-model="plan.name" @input="emitUpdate" type="text" placeholder="Pro" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Prix</label>
                <input v-model="plan.price" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Devise</label>
                <select v-model="plan.currency" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option value="">Défaut</option>
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">€</option>
                  <option value="USD">$</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Période</label>
                <input v-model="plan.period" @input="emitUpdate" type="text" placeholder="/mois" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
            </div>
            <label class="flex items-center gap-2">
              <input v-model="plan.highlighted" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
              <span class="text-xs text-gray-600">Mettre en avant</span>
            </label>
            <div class="flex items-center gap-2">
              <input v-model="plan.showOriginalPrice" @change="emitUpdate" type="checkbox" class="rounded"/>
              <span class="text-xs text-gray-500">Prix barré</span>
              <input v-if="plan.showOriginalPrice" v-model="plan.originalPrice" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-sm"/>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="plan.showBadge" @change="emitUpdate" type="checkbox" class="rounded"/>
              <span class="text-xs text-gray-500">Badge</span>
              <input v-if="plan.showBadge" v-model="plan.badgeText" @input="emitUpdate" type="text" placeholder="POPULAIRE" class="flex-1 px-2 py-1 border rounded text-sm"/>
            </div>
            <div>
              <div class="flex justify-between mb-1">
                <label class="text-xs text-gray-500">Caractéristiques</label>
                <button @click="addFeature(idx)" class="text-xs text-emerald-600">+ Ajouter</button>
              </div>
              <div v-for="(f, fi) in plan.features" :key="fi" class="flex items-center gap-1 mb-1">
                <input v-model="plan.features[fi]" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-sm"/>
                <button v-if="plan.features.length > 1" @click="removeFeature(idx, fi)" class="text-red-500 text-xs">×</button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
                <input v-model="plan.ctaText" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border rounded text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">URL</label>
                <input v-model="plan.ctaUrl" @input="emitUpdate" type="url" class="w-full px-2 py-1.5 border rounded text-sm"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== STYLE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.style = !sections.style" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Style</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.style ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.style" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille prix</label>
            <select v-model="localProps.priceSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style bouton</label>
            <select v-model="localProps.buttonStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="filled">Rempli</option>
              <option value="outlined">Contour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== CARTE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.card = !sections.card" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Carte</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.card ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.card" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond carte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.cardBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.cardBgColor" @input="emitUpdate" type="text" placeholder="Transparent" class="flex-1 px-2 py-1 border rounded text-xs"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Bordure</label>
            <select v-model="localProps.cardBorderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Coins</label>
            <select v-model="localProps.cardBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ombre</label>
          <select v-model="localProps.cardShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="small">Légère</option>
            <option value="medium">Moyenne</option>
            <option value="large">Forte</option>
          </select>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border rounded-lg text-sm"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur accent</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
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
    
    <!-- ===== AVANCÉ ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="pricing" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  content: true,
  plans: false,
  style: false,
  card: false,
  appearance: false,
  advanced: false,
})

const createDefaultPlan = () => ({
  name: '', price: '0', currency: '', period: '/mois',
  originalPrice: null, showOriginalPrice: false,
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  showFeatures: true,
  showBadge: false, badgeText: 'POPULAIRE',
  ctaText: 'Commander', ctaUrl: '', highlighted: false,
})

const expandedPlans = ref<number[]>([0])

const localProps = reactive({
  templateId: props.props.templateId || 'pricing-minimal-1',
  title: props.props.title || 'Nos tarifs',
  subtitle: props.props.subtitle || '',
  headerAlignment: props.props.headerAlignment || 'center',
  items: props.props.items || [createDefaultPlan()],
  priceSize: props.props.priceSize || 'large',
  buttonStyle: props.props.buttonStyle || 'filled',
  cardBgColor: props.props.cardBgColor || '',
  cardBorderWidth: props.props.cardBorderWidth || 'thin',
  cardBorderRadius: props.props.cardBorderRadius || 'medium',
  cardShadow: props.props.cardShadow || 'none',
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
  if (!localProps.items?.length) localProps.items = [createDefaultPlan()]
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

function togglePlan(idx: number) {
  const i = expandedPlans.value.indexOf(idx)
  if (i === -1) expandedPlans.value.push(idx)
  else expandedPlans.value.splice(i, 1)
}

function addPlan() {
  localProps.items.push(createDefaultPlan())
  expandedPlans.value.push(localProps.items.length - 1)
  emitUpdate()
}

function removePlan(idx: number) {
  localProps.items.splice(idx, 1)
  const i = expandedPlans.value.indexOf(idx)
  if (i !== -1) expandedPlans.value.splice(i, 1)
  emitUpdate()
}

function addFeature(idx: number) {
  if (!localProps.items[idx].features) localProps.items[idx].features = []
  localProps.items[idx].features.push('Nouvelle caractéristique')
  emitUpdate()
}

function removeFeature(planIdx: number, fIdx: number) {
  localProps.items[planIdx].features.splice(fIdx, 1)
  emitUpdate()
}
</script>
