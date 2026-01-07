<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="faq"
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
    
    <!-- QUESTIONS -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Questions</h4>
        <button @click="addItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="(item, index) in localProps.items" 
          :key="index"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div 
            class="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
            @click="toggleItem(index)"
          >
            <div class="flex items-center gap-2">
              <svg 
                class="w-4 h-4 text-gray-400 transition-transform" 
                :class="{ 'rotate-90': expandedItems.includes(index) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                {{ item.question || `Question ${index + 1}` }}
              </span>
            </div>
            <button 
              v-if="localProps.items.length > 1"
              @click.stop="removeItem(index)" 
              class="text-xs text-red-500 hover:text-red-600"
            >
              Supprimer
            </button>
          </div>
          
          <div v-if="expandedItems.includes(index)" class="p-3 space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Question</label>
              <input 
                v-model="item.question" 
                @input="emitUpdate" 
                type="text" 
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" 
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Réponse</label>
              <textarea 
                v-model="item.answer" 
                @input="emitUpdate" 
                rows="3"
                class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none" 
              ></textarea>
            </div>
          </div>
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

const defaultItems = [
  { question: 'Comment ça fonctionne ?', answer: 'C\'est très simple...' },
  { question: 'Quels sont les délais ?', answer: 'Les délais varient selon...' },
]

const getInitialItems = (propsData: Record<string, any>) => {
  if (propsData.items && Array.isArray(propsData.items) && propsData.items.length > 0) {
    return propsData.items
  }
  return defaultItems
}

const localProps = reactive({ 
  ...props.props,
  items: getInitialItems(props.props)
})

const expandedItems = ref<number[]>([0])

function toggleItem(index: number) {
  const idx = expandedItems.value.indexOf(index)
  if (idx === -1) {
    expandedItems.value.push(index)
  } else {
    expandedItems.value.splice(idx, 1)
  }
}

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, { 
    ...newVal,
    items: getInitialItems(newVal)
  }) 
}, { deep: true })

const emitUpdate = () => { emit('update', { ...localProps }) }

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
