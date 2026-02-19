<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="cta" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- ===== CONTENU ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre (optionnel)</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" placeholder="Titre accrocheur" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte principal</label>
          <textarea v-model="localProps.text" @input="emitUpdate" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"></textarea>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('contentAlignment', a)" :class="['px-3 py-1.5 text-xs rounded border', localProps.contentAlignment === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== BOUTON PRINCIPAL ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.primaryBtn = !sections.primaryBtn" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton principal</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.primaryBtn ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.primaryBtn" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.buttonStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="filled">Rempli</option>
              <option value="outlined">Contour</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Lien du bouton</label>
          <UiLinkSelector
            v-model="localProps.buttonUrl"
            :link-type="localProps.buttonLinkType || 'custom'"
            :payment-link-id="localProps.buttonPaymentLinkId"
            @update:link-type="(val) => { localProps.buttonLinkType = val; emitUpdate() }"
            @update:payment-link-id="(val) => { localProps.buttonPaymentLinkId = val; emitUpdate() }"
            @change="emitUpdate"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond</label>
            <div class="flex items-center gap-1">
              <input type="color" v-model="localProps.buttonBgColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <div class="flex items-center gap-1">
              <input type="color" v-model="localProps.buttonColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.buttonColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Icône</label>
            <select v-model="localProps.buttonIcon" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="">Aucune</option>
              <option value="arrow-right">Flèche droite</option>
              <option value="cart">Panier</option>
              <option value="download">Télécharger</option>
              <option value="play">Play</option>
              <option value="check">Coche</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Effet hover</label>
            <select v-model="localProps.buttonHoverEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="darken">Assombrir</option>
              <option value="lighten">Éclaircir</option>
              <option value="scale">Agrandir</option>
              <option value="lift">Soulever</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
          <select v-model="localProps.buttonTarget" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="_self">Même onglet</option>
            <option value="_blank">Nouvel onglet</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== BOUTON SECONDAIRE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.secondaryBtn = !sections.secondaryBtn" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton secondaire</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.secondaryBtn ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.secondaryBtn" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.showSecondaryButton" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher bouton secondaire</span>
        </label>
        <div v-if="localProps.showSecondaryButton" class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte</label>
            <input v-model="localProps.secondaryButtonText" @input="emitUpdate" type="text" placeholder="En savoir plus" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Lien</label>
            <UiLinkSelector
              v-model="localProps.secondaryButtonUrl"
              :link-type="localProps.secondaryButtonLinkType || 'custom'"
              :payment-link-id="localProps.secondaryButtonPaymentLinkId"
              @update:link-type="(val) => { localProps.secondaryButtonLinkType = val; emitUpdate() }"
              @update:payment-link-id="(val) => { localProps.secondaryButtonPaymentLinkId = val; emitUpdate() }"
              @change="emitUpdate"
            />
          </div>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur du texte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.textColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.textColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
    
    <!-- ===== ANIMATION ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.animation = !sections.animation" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Animation</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.animation ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.animation" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Animation</label>
          <select v-model="localProps.animation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="fade">Fondu</option>
            <option value="slide-up">Glisser haut</option>
            <option value="scale">Zoom</option>
            <option value="bounce">Rebond</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== POSITIONNEMENT ===== -->
    <PositioningSection
      v-show="sections.positioning"
      :elements="['title', 'text', 'buttons']"
      :elements-order="localProps.elementsOrder"
      :offsets="localProps"
      :labels="{ title: 'Titre', text: 'Texte', buttons: 'Boutons' }"
      @update:elements-order="updateProp('elementsOrder', $event)"
      @update:offsets="updateOffsets"
    />

    <!-- ===== AVANCÉ ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.advanced = !sections.advanced" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avancé</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.advanced ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.advanced" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">ID CSS (ancre)</label>
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="cta-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
  primaryBtn: false,
  secondaryBtn: false,
  appearance: false,
  animation: false,
  positioning: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'cta-minimal-1',
  title: props.props.title || '',
  text: props.props.text || 'Profitez de cette offre exclusive maintenant !',
  contentAlignment: props.props.contentAlignment || 'center',
  buttonText: props.props.buttonText || 'Commencer',
  buttonUrl: props.props.buttonUrl || '',
  buttonLinkType: props.props.buttonLinkType || 'custom',
  buttonPaymentLinkId: props.props.buttonPaymentLinkId || null,
  buttonTarget: props.props.buttonTarget || '_self',
  buttonStyle: props.props.buttonStyle || 'filled',
  buttonBgColor: props.props.buttonBgColor || '#ffffff',
  buttonColor: props.props.buttonColor || '#1f2937',
  buttonIcon: props.props.buttonIcon || '',
  buttonHoverEffect: props.props.buttonHoverEffect || 'none',
  showSecondaryButton: props.props.showSecondaryButton || false,
  secondaryButtonText: props.props.secondaryButtonText || 'En savoir plus',
  secondaryButtonUrl: props.props.secondaryButtonUrl || '',
  secondaryButtonLinkType: props.props.secondaryButtonLinkType || 'custom',
  secondaryButtonPaymentLinkId: props.props.secondaryButtonPaymentLinkId || null,
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#10b981',
  gradientStart: props.props.gradientStart || '#10b981',
  gradientEnd: props.props.gradientEnd || '#059669',
  textColor: props.props.textColor || '#ffffff',
  paddingY: props.props.paddingY || 'large',
  animation: props.props.animation || 'none',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['title', 'text', 'buttons'],
  titleOffsetY: props.props.titleOffsetY || 0,
  textOffsetY: props.props.textOffsetY || 0,
  buttonsOffsetY: props.props.buttonsOffsetY || 0,
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => {
  (localProps as any)[key] = value
  emitUpdate()
}

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  emitUpdate()
}
</script>
