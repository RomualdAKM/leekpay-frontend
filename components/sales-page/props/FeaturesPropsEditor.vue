<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="features"
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
    
    <!-- FONCTIONNALITÉS -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Fonctionnalités</h4>
        <button 
          @click="addItem" 
          class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
        >
          + Ajouter
        </button>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="(item, index) in localProps.items" 
          :key="index"
          class="border border-gray-200 rounded-lg p-3"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">#{{ index + 1 }}</span>
            <button 
              v-if="localProps.items.length > 1"
              @click="removeItem(index)" 
              class="text-xs text-red-500 hover:text-red-600"
            >
              Supprimer
            </button>
          </div>
          
          <div class="space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Icône</label>
              <select v-model="item.icon" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="check">Coche</option>
                <option value="star">Étoile</option>
                <option value="heart">Coeur</option>
                <option value="lightning">Éclair</option>
                <option value="shield">Bouclier</option>
                <option value="gift">Cadeau</option>
                <option value="clock">Horloge</option>
                <option value="globe">Globe</option>
                <option value="sparkle">Étincelle</option>
                <option value="award">Badge</option>
                <option value="rocket">Fusée</option>
                <option value="users">Utilisateurs</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Titre</label>
              <input 
                v-model="item.title" 
                @input="emitUpdate" 
                type="text" 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea 
                v-model="item.description" 
                @input="emitUpdate" 
                rows="2"
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none" 
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- LAYOUT -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Layout</h4>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Disposition</label>
          <select v-model="localProps.layout" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="grid">Grille</option>
            <option value="list">Liste</option>
            <option value="alternating">Alternée</option>
            <option value="masonry">Masonry</option>
            <option value="carousel">Carousel</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        
        <div v-if="localProps.layout === 'grid'">
          <label class="block text-xs text-gray-500 mb-1">Colonnes</label>
          <select v-model.number="localProps.columns" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option :value="2">2 colonnes</option>
            <option :value="3">3 colonnes</option>
            <option :value="4">4 colonnes</option>
            <option :value="6">6 colonnes</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ICÔNE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Icône</h4>
      
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showIcon" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Afficher les icônes</label>
        </div>
        
        <div v-if="localProps.showIcon">
          <label class="block text-xs text-gray-500 mb-1">Style</label>
          <select v-model="localProps.iconStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="filled">Rempli</option>
            <option value="outlined">Contour</option>
            <option value="number">Numéroté</option>
            <option value="none">Aucun</option>
          </select>
        </div>
        
        <div v-if="localProps.showIcon">
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select v-model="localProps.iconSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
        
        <div v-if="localProps.showIcon && localProps.iconStyle !== 'number'">
          <label class="block text-xs text-gray-500 mb-1">Couleur icône</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.iconColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.iconColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        
        <div v-if="localProps.showIcon">
          <label class="block text-xs text-gray-500 mb-1">Couleur fond icône</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.iconBgColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.iconBgColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- TEXTE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Texte</h4>
      
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showDescription" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Afficher les descriptions</label>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur titre</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.titleColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
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
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
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
import { reactive, watch } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

// Initialiser items si non défini
const defaultItems = [
  { icon: 'check', title: 'Fonctionnalité 1', description: 'Description de la fonctionnalité' },
  { icon: 'check', title: 'Fonctionnalité 2', description: 'Description de la fonctionnalité' },
  { icon: 'check', title: 'Fonctionnalité 3', description: 'Description de la fonctionnalité' },
]

const localProps = reactive({ 
  ...props.props,
  items: props.props.items || defaultItems
})

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, { 
    ...newVal,
    items: newVal.items || defaultItems
  }) 
}, { deep: true })

const emitUpdate = () => { emit('update', { ...localProps }) }

// Gestion des items
function addItem() {
  if (!localProps.items) localProps.items = []
  localProps.items.push({ 
    icon: 'check', 
    title: 'Nouvelle fonctionnalité', 
    description: 'Description' 
  })
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  emitUpdate()
}
</script>
