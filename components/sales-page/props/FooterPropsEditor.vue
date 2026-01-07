<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="footer"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <!-- CONTENU -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Contenu</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte copyright</label>
          <input v-model="localProps.text" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
      </div>
    </div>
    
    <!-- RÉSEAUX SOCIAUX -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Réseaux sociaux</h4>
        <input v-model="localProps.showSocials" @change="emitUpdate" type="checkbox" class="rounded" />
      </div>
      
      <div v-if="localProps.showSocials" class="space-y-3">
        <div 
          v-for="(social, index) in localProps.socials" 
          :key="index"
          class="flex items-center gap-2"
        >
          <select 
            v-model="social.type" 
            @change="emitUpdate" 
            class="w-28 px-2 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter/X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <input 
            v-model="social.url" 
            @input="emitUpdate" 
            type="url" 
            placeholder="https://..." 
            class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm" 
          />
          <button 
            v-if="localProps.socials.length > 1"
            @click="removeSocial(index)" 
            class="text-red-500 hover:text-red-600 p-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <button 
          @click="addSocial" 
          class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
        >
          + Ajouter un réseau
        </button>
      </div>
    </div>
    
    <!-- LIENS -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Liens</h4>
        <button @click="addLink" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
      </div>
      
      <div class="space-y-2">
        <div 
          v-for="(link, index) in localProps.links" 
          :key="index"
          class="flex items-center gap-2"
        >
          <input 
            v-model="link.label" 
            @input="emitUpdate" 
            type="text" 
            placeholder="Libellé" 
            class="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm" 
          />
          <input 
            v-model="link.url" 
            @input="emitUpdate" 
            type="url" 
            placeholder="https://..." 
            class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm" 
          />
          <button 
            v-if="localProps.links.length > 0"
            @click="removeLink(index)" 
            class="text-red-500 hover:text-red-600 p-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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

const getInitialSocials = (propsData: Record<string, any>) => {
  if (propsData.socials && Array.isArray(propsData.socials) && propsData.socials.length > 0) {
    return propsData.socials
  }
  return [{ type: 'facebook', url: '' }]
}

const getInitialLinks = (propsData: Record<string, any>) => {
  if (propsData.links && Array.isArray(propsData.links) && propsData.links.length > 0) {
    return propsData.links
  }
  return []
}

const localProps = reactive({ 
  ...props.props,
  socials: getInitialSocials(props.props),
  links: getInitialLinks(props.props)
})

watch(() => props.props, (newVal) => { 
  Object.assign(localProps, {
    ...newVal,
    socials: getInitialSocials(newVal),
    links: getInitialLinks(newVal)
  })
}, { deep: true })

const emitUpdate = () => { emit('update', { ...localProps }) }

function addSocial() {
  if (!localProps.socials) localProps.socials = []
  localProps.socials.push({ type: 'instagram', url: '' })
  emitUpdate()
}

function removeSocial(index: number) {
  localProps.socials.splice(index, 1)
  emitUpdate()
}

function addLink() {
  if (!localProps.links) localProps.links = []
  localProps.links.push({ label: 'Lien', url: '' })
  emitUpdate()
}

function removeLink(index: number) {
  localProps.links.splice(index, 1)
  emitUpdate()
}
</script>
