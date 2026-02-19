<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="footer" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- CONTENU -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte copyright</label>
          <input v-model="localProps.text" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
    
    <!-- RÉSEAUX SOCIAUX -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.socials = !sections.socials" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Réseaux sociaux</h4>
        <div class="flex items-center gap-2">
          <input v-model="localProps.showSocials" @change="emitUpdate" type="checkbox" class="rounded" @click.stop/>
          <ChevronDown :class="['w-4 h-4 transition-transform', sections.socials ? 'rotate-180' : '']"/>
        </div>
      </button>
      <div v-show="sections.socials && localProps.showSocials" class="mt-3 space-y-2">
        <div v-for="(social, idx) in localProps.socials" :key="idx" class="flex items-center gap-2">
          <select v-model="social.type" @change="emitUpdate" class="w-28 px-2 py-1.5 border border-gray-300 rounded text-sm">
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter/X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <input v-model="social.url" @input="emitUpdate" type="url" placeholder="https://..." class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"/>
          <button v-if="localProps.socials.length > 1" @click="removeSocial(idx)" class="text-red-500 p-1">×</button>
        </div>
        <button @click="addSocial" class="text-xs text-emerald-600 font-medium">+ Ajouter</button>
      </div>
    </div>
    
    <!-- LIENS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.links = !sections.links" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Liens ({{ localProps.links?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.links ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.links" class="mt-3 space-y-2">
        <div v-for="(link, idx) in localProps.links" :key="idx" class="flex items-center gap-2">
          <input v-model="link.label" @input="emitUpdate" type="text" placeholder="Libellé" class="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"/>
          <input v-model="link.url" @input="emitUpdate" type="url" placeholder="https://..." class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"/>
          <button @click="removeLink(idx)" class="text-red-500 p-1">×</button>
        </div>
        <button @click="addLink" class="text-xs text-emerald-600 font-medium">+ Ajouter un lien</button>
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
        <div v-if="localProps.backgroundType === 'solid'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.textColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.textColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Début</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientStart" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fin</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientEnd" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement vertical</label>
          <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- POSITIONNEMENT -->
    <PositioningSection
      v-show="sections.positioning"
      :elements="['links', 'socials', 'text']"
      :elements-order="localProps.elementsOrder"
      :offsets="localProps"
      :labels="{ links: 'Liens', socials: 'Sociaux', text: 'Copyright' }"
      @update:elements-order="updateProp('elementsOrder', $event)"
      @update:offsets="updateOffsets"
    />

    <!-- AVANCÉ -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="footer" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
import PositioningSection from './PositioningSection.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  content: true,
  socials: false,
  links: false,
  appearance: false,
  positioning: false,
  advanced: false,
})

const getInitialSocials = (p: Record<string, any>) => p.socials?.length ? p.socials : [{ type: 'facebook', url: '' }]
const getInitialLinks = (p: Record<string, any>) => p.links?.length ? p.links : []

const localProps = reactive({
  templateId: props.props.templateId || 'footer-minimal-centered',
  text: props.props.text || '© 2024 Votre entreprise',
  textAlign: props.props.textAlign || 'center',
  showSocials: props.props.showSocials ?? true,
  socials: getInitialSocials(props.props),
  links: getInitialLinks(props.props),
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#1f2937',
  gradientStart: props.props.gradientStart || '#1f2937',
  gradientEnd: props.props.gradientEnd || '#111827',
  textColor: props.props.textColor || '#9ca3af',
  paddingY: props.props.paddingY || 'medium',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['links', 'socials', 'text'],
  linksOffsetY: props.props.linksOffsetY || 0,
  socialsOffsetY: props.props.socialsOffsetY || 0,
  textOffsetY: props.props.textOffsetY || 0,
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key === 'socials') localProps.socials = getInitialSocials(newVal)
    else if (key === 'links') localProps.links = getInitialLinks(newVal)
    else if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  emitUpdate()
}

function addSocial() { localProps.socials.push({ type: 'instagram', url: '' }); emitUpdate() }
function removeSocial(idx: number) { localProps.socials.splice(idx, 1); emitUpdate() }
function addLink() { localProps.links.push({ label: 'Lien', url: '' }); emitUpdate() }
function removeLink(idx: number) { localProps.links.splice(idx, 1); emitUpdate() }
</script>
