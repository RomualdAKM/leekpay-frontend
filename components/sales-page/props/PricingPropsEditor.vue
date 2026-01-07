<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="pricing"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- CONTENU -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Contenu</h4>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
    </div>
    
    <!-- PLANS DE TARIFICATION -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Plans</h4>
        <button 
          @click="addPlan" 
          class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
        >
          + Ajouter un plan
        </button>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="(plan, planIndex) in localProps.items" 
          :key="planIndex"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Header du plan -->
          <div 
            class="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
            @click="togglePlan(planIndex)"
          >
            <div class="flex items-center gap-2">
              <svg 
                class="w-4 h-4 text-gray-400 transition-transform" 
                :class="{ 'rotate-90': expandedPlans.includes(planIndex) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-sm font-medium text-gray-700">
                {{ plan.name || `Plan ${planIndex + 1}` }}
              </span>
              <span v-if="plan.highlighted" class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                Mis en avant
              </span>
            </div>
            <button 
              v-if="localProps.items.length > 1"
              @click.stop="removePlan(planIndex)" 
              class="text-xs text-red-500 hover:text-red-600"
            >
              Supprimer
            </button>
          </div>
          
          <!-- Contenu du plan -->
          <div v-if="expandedPlans.includes(planIndex)" class="p-3 space-y-3">
            <!-- Nom du plan -->
            <div>
              <label class="block text-xs text-gray-500 mb-1">Nom du plan</label>
              <input 
                v-model="plan.name" 
                @input="emitUpdate" 
                type="text" 
                placeholder="Ex: Starter, Pro, Enterprise"
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <!-- Mise en avant -->
            <div class="flex items-center space-x-2">
              <input v-model="plan.highlighted" @change="emitUpdate" type="checkbox" class="rounded" />
              <label class="text-xs text-gray-500">Mettre en avant (populaire)</label>
            </div>
            
            <!-- Prix -->
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Prix</label>
                <input 
                  v-model="plan.price" 
                  @input="emitUpdate" 
                  type="text" 
                  class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Devise</label>
                <select v-model="plan.currency" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option value="">Par défaut</option>
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">€ EUR</option>
                  <option value="USD">$ USD</option>
                </select>
              </div>
            </div>
            
            <!-- Période -->
            <div class="flex items-center space-x-2">
              <input v-model="plan.showPeriod" @change="emitUpdate" type="checkbox" class="rounded" />
              <label class="text-xs text-gray-500">Période</label>
              <input 
                v-if="plan.showPeriod"
                v-model="plan.period" 
                @input="emitUpdate" 
                type="text" 
                placeholder="/mois"
                class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <!-- Prix barré -->
            <div class="flex items-center space-x-2">
              <input v-model="plan.showOriginalPrice" @change="emitUpdate" type="checkbox" class="rounded" />
              <label class="text-xs text-gray-500">Prix barré</label>
              <input 
                v-if="plan.showOriginalPrice"
                v-model="plan.originalPrice" 
                @input="emitUpdate" 
                type="text" 
                class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <!-- Badge -->
            <div class="flex items-center space-x-2">
              <input v-model="plan.showBadge" @change="emitUpdate" type="checkbox" class="rounded" />
              <label class="text-xs text-gray-500">Badge</label>
              <input 
                v-if="plan.showBadge"
                v-model="plan.badgeText" 
                @input="emitUpdate" 
                type="text" 
                placeholder="POPULAIRE"
                class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <!-- Caractéristiques -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs text-gray-500">Caractéristiques</label>
                <button 
                  @click="addPlanFeature(planIndex)" 
                  class="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  + Ajouter
                </button>
              </div>
              <div class="space-y-1">
                <div 
                  v-for="(feature, fIndex) in plan.features" 
                  :key="fIndex"
                  class="flex items-center gap-1"
                >
                  <input 
                    v-model="plan.features[fIndex]" 
                    @input="emitUpdate" 
                    type="text" 
                    class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" 
                  />
                  <button 
                    v-if="plan.features.length > 1"
                    @click="removePlanFeature(planIndex, fIndex)" 
                    class="text-red-500 hover:text-red-600 p-0.5"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Bouton CTA -->
            <div>
              <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
              <input 
                v-model="plan.ctaText" 
                @input="emitUpdate" 
                type="text" 
                placeholder="Commander"
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">URL bouton</label>
              <input 
                v-model="plan.ctaUrl" 
                @input="emitUpdate" 
                type="url" 
                placeholder="https://..."
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <!-- Garantie -->
            <div class="flex items-center space-x-2">
              <input v-model="plan.showGuarantee" @change="emitUpdate" type="checkbox" class="rounded" />
              <label class="text-xs text-gray-500">Garantie</label>
            </div>
            <input 
              v-if="plan.showGuarantee"
              v-model="plan.guaranteeText" 
              @input="emitUpdate" 
              type="text" 
              placeholder="Garantie 30 jours"
              class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- STYLE GLOBAL -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Style global</h4>
      
      <div class="space-y-3">
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
    
    <!-- CARTE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Carte</h4>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond carte</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.cardBgColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.cardBgColor" @input="emitUpdate" type="text" placeholder="Transparent" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Bordure</label>
          <select v-model="localProps.cardBorderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="thin">Fine</option>
            <option value="medium">Moyenne</option>
            <option value="thick">Épaisse</option>
          </select>
        </div>
        
        <div v-if="localProps.cardBorderWidth !== 'none'">
          <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.cardBorderColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.cardBorderColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Coins arrondis</label>
          <select v-model="localProps.cardBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Padding</label>
          <select v-model="localProps.cardPadding" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
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
import { reactive, watch, ref } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

// Plan par défaut
const createDefaultPlan = () => ({
  name: '',
  price: '0',
  currency: '',
  period: '/mois',
  originalPrice: null,
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  showBadge: false,
  badgeText: 'POPULAIRE',
  showOriginalPrice: false,
  showPeriod: true,
  showFeatures: true,
  showGuarantee: false,
  guaranteeText: 'Garantie 30 jours',
  ctaText: 'Commander',
  ctaUrl: '',
  highlighted: false,
})

const defaultItems = [createDefaultPlan()]

const localProps = reactive({ 
  ...props.props,
  items: props.props.items || defaultItems
})

// Plans expandés
const expandedPlans = ref<number[]>([0])

function togglePlan(index: number) {
  const idx = expandedPlans.value.indexOf(index)
  if (idx === -1) {
    expandedPlans.value.push(index)
  } else {
    expandedPlans.value.splice(idx, 1)
  }
}

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, { 
    ...newVal,
    items: newVal.items || defaultItems
  }) 
}, { deep: true })

const emitUpdate = () => { emit('update', { ...localProps }) }

// Gestion des plans
function addPlan() {
  if (!localProps.items) localProps.items = []
  localProps.items.push(createDefaultPlan())
  expandedPlans.value.push(localProps.items.length - 1)
  emitUpdate()
}

function removePlan(index: number) {
  localProps.items.splice(index, 1)
  const expIdx = expandedPlans.value.indexOf(index)
  if (expIdx !== -1) expandedPlans.value.splice(expIdx, 1)
  emitUpdate()
}

function addPlanFeature(planIndex: number) {
  if (!localProps.items[planIndex].features) {
    localProps.items[planIndex].features = []
  }
  localProps.items[planIndex].features.push('Nouvelle caractéristique')
  emitUpdate()
}

function removePlanFeature(planIndex: number, featureIndex: number) {
  localProps.items[planIndex].features.splice(featureIndex, 1)
  emitUpdate()
}
</script>
