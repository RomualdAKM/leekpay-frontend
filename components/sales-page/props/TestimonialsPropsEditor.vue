<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="testimonials"
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
    
    <!-- TÉMOIGNAGES -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Témoignages</h4>
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
              <label class="block text-xs text-gray-500 mb-1">Nom</label>
              <input 
                v-model="item.name" 
                @input="emitUpdate" 
                type="text" 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Rôle / Fonction</label>
              <input 
                v-model="item.role" 
                @input="emitUpdate" 
                type="text" 
                placeholder="CEO, Entrepreneur..." 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Entreprise</label>
              <input 
                v-model="item.company" 
                @input="emitUpdate" 
                type="text" 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Témoignage</label>
              <textarea 
                v-model="item.text" 
                @input="emitUpdate" 
                rows="3"
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none" 
              ></textarea>
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">Note (1-5 étoiles)</label>
              <select v-model.number="item.rating" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option :value="5">5 étoiles</option>
                <option :value="4">4 étoiles</option>
                <option :value="3">3 étoiles</option>
                <option :value="2">2 étoiles</option>
                <option :value="1">1 étoile</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs text-gray-500 mb-1">URL Avatar (optionnel)</label>
              <input 
                v-model="item.avatar" 
                @input="emitUpdate" 
                type="url" 
                placeholder="https://..." 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- AFFICHAGE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Affichage</h4>
      
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showQuoteIcon" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Icône de citation</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showRating" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Étoiles de notation</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showAvatar" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Avatar</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showRole" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Rôle/Fonction</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showCompany" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Entreprise</label>
        </div>
      </div>
    </div>
    
    <!-- AVATAR -->
    <div v-if="localProps.showAvatar" class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Avatar</h4>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Forme</label>
          <select v-model="localProps.avatarShape" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="circle">Cercle</option>
            <option value="square">Carré</option>
            <option value="rounded">Arrondi</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select v-model="localProps.avatarSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- CITATION -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Citation</h4>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style</label>
          <select v-model="localProps.quoteStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="normal">Normal</option>
            <option value="italic">Italique</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille texte</label>
          <select v-model="localProps.quoteFontSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
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
        
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur titre</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.titleColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
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
  { name: 'Client 1', role: 'Entrepreneur', company: '', text: 'Un service exceptionnel qui a transformé mon business.', avatar: null, rating: 5 },
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
    name: 'Nouveau client', 
    role: '', 
    company: '',
    text: 'Votre témoignage ici...', 
    avatar: null,
    rating: 5 
  })
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  emitUpdate()
}
</script>
