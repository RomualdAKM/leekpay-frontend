<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="countdown" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- CONTENU -->
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
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" placeholder="Ne manquez pas cette offre" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('textAlign', a)" :class="['px-3 py-1.5 text-xs rounded border', localProps.textAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- DATE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.date = !sections.date" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Date de fin</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.date ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.date" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Date et heure</label>
          <input v-model="localProps.endDate" @input="emitUpdate" type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <p class="text-xs text-gray-400">Laissez vide pour un compteur de démo (24h)</p>
      </div>
    </div>
    
    <!-- AFFICHAGE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.display = !sections.display" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Affichage</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.display ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.display" class="mt-3 space-y-2">
        <label class="flex items-center gap-2"><input v-model="localProps.showDays" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Jours</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showHours" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Heures</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showMinutes" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Minutes</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showSeconds" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Secondes</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showLabels" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Labels (Jours, Heures...)</span></label>
        <label class="flex items-center gap-2"><input v-model="localProps.showSeparators" @change="emitUpdate" type="checkbox" class="rounded"/><span class="text-xs text-gray-600">Séparateurs (:)</span></label>
      </div>
    </div>
    
    <!-- STYLE -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.style = !sections.style" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Style</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.style ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.style" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style des chiffres</label>
          <select v-model="localProps.digitStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="simple">Simple</option>
            <option value="boxed">En boîte</option>
            <option value="rounded">Arrondi</option>
            <option value="circle">Cercle</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille des chiffres</label>
          <select v-model="localProps.digitSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
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
        <div v-if="localProps.backgroundType === 'solid'">
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur texte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.textColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.textColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border rounded text-xs"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur accent (chiffres)</label>
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
    
    <!-- AVANCÉ -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="countdown" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
import { reactive, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  content: true,
  date: false,
  display: false,
  style: false,
  appearance: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'countdown-minimal-centered',
  title: props.props.title || '',
  subtitle: props.props.subtitle || '',
  textAlign: props.props.textAlign || 'center',
  endDate: props.props.endDate || '',
  showDays: props.props.showDays ?? true,
  showHours: props.props.showHours ?? true,
  showMinutes: props.props.showMinutes ?? true,
  showSeconds: props.props.showSeconds ?? true,
  showLabels: props.props.showLabels ?? true,
  showSeparators: props.props.showSeparators ?? true,
  digitStyle: props.props.digitStyle || 'boxed',
  digitSize: props.props.digitSize || 'large',
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ef4444',
  gradientStart: props.props.gradientStart || '#ef4444',
  gradientEnd: props.props.gradientEnd || '#f97316',
  textColor: props.props.textColor || '#ffffff',
  accentColor: props.props.accentColor || '#ffffff',
  paddingY: props.props.paddingY || 'medium',
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
</script>
