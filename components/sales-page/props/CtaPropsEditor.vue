<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="cta"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- CONTENU -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Contenu</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre (optionnel)</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" placeholder="Titre accrocheur" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte principal</label>
          <textarea v-model="localProps.text" @input="emitUpdate" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"></textarea>
        </div>
      </div>
    </div>
    
    <!-- BOUTON PRINCIPAL -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Bouton principal</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
          <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL du bouton</label>
          <input v-model="localProps.buttonUrl" @input="emitUpdate" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
          <select v-model="localProps.buttonTarget" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="_self">Même onglet</option>
            <option value="_blank">Nouvel onglet</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style du bouton</label>
          <select v-model="localProps.buttonStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="filled">Rempli</option>
            <option value="outlined">Contour</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond bouton</label>
            <div class="flex items-center space-x-1">
              <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
              <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte bouton</label>
            <div class="flex items-center space-x-1">
              <input v-model="localProps.buttonColor" @input="emitUpdate" type="color" class="w-8 h-8 rounded cursor-pointer border-0" />
              <input v-model="localProps.buttonColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- BOUTON SECONDAIRE -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton secondaire</h4>
        <input v-model="localProps.showSecondaryButton" @change="emitUpdate" type="checkbox" class="rounded" />
      </div>
      <div v-if="localProps.showSecondaryButton" class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte</label>
          <input v-model="localProps.secondaryButtonText" @input="emitUpdate" type="text" placeholder="En savoir plus" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">URL</label>
          <input v-model="localProps.secondaryButtonUrl" @input="emitUpdate" type="url" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const localProps = reactive({ ...props.props })

watch(() => props.props, (newVal) => {
  Object.assign(localProps, newVal)
}, { deep: true })

const emitUpdate = () => {
  emit('update', { ...localProps })
}
</script>
