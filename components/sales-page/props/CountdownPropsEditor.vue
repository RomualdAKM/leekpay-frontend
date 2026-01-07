<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="countdown"
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
          <label class="block text-xs text-gray-500 mb-1">Sous-titre (optionnel)</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" placeholder="Ne manquez pas cette offre" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
    </div>
    
    <!-- DATE/HEURE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Date de fin</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Date et heure</label>
          <input v-model="localProps.endDate" @input="emitUpdate" type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <p class="text-xs text-gray-400">Laissez vide pour un compteur de démo (24h)</p>
      </div>
    </div>
    
    <!-- AFFICHAGE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Affichage</h4>
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showDays" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Jours</label>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showHours" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Heures</label>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showMinutes" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Minutes</label>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showSeconds" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Secondes</label>
        </div>
      </div>
    </div>
    
    <!-- STYLE -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Style</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style des chiffres</label>
          <select v-model="localProps.digitStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="simple">Simple</option>
            <option value="boxed">En boîte</option>
            <option value="rounded">Arrondi</option>
            <option value="circle">Cercle</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showLabels" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Afficher les labels (Jours, Heures...)</label>
        </div>
        <div class="flex items-center space-x-2">
          <input v-model="localProps.showSeparators" @change="emitUpdate" type="checkbox" class="rounded" />
          <label class="text-xs text-gray-500">Afficher les séparateurs (:)</label>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur du texte</label>
          <div class="flex items-center space-x-2">
            <input v-model="localProps.textColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
            <input v-model="localProps.textColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur d'accent (chiffres)</label>
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

const localProps = reactive({ 
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  showLabels: true,
  showSeparators: true,
  ...props.props 
})

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, newVal) 
}, { deep: true })

const emitUpdate = () => { emit('update', { ...localProps }) }
</script>
