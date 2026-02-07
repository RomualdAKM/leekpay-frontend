<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="testimonials" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- ===== CONTENU ===== -->
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
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement en-tête</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('headerAlignment', a)" :class="['px-3 py-1.5 text-xs rounded border', localProps.headerAlignment === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== TÉMOIGNAGES ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.items = !sections.items" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Témoignages ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.items ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.items" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
        </div>
        <div v-for="(item, index) in localProps.items" :key="index" class="border border-gray-200 rounded-lg p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">#{{ (index as number) + 1 }}</span>
            <button v-if="localProps.items.length > 1" @click="removeItem(index as number)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Nom</label>
                <input v-model="item.name" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Note</label>
                <select v-model.number="item.rating" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option v-for="n in 5" :key="n" :value="n">{{ n }} étoiles</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Rôle</label>
                <input v-model="item.role" @input="emitUpdate" type="text" placeholder="CEO..." class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Entreprise</label>
                <input v-model="item.company" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Témoignage</label>
              <textarea v-model="item.text" @input="emitUpdate" rows="2" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none"></textarea>
            </div>
            <div>
              <UiImageUploader
                v-model="item.avatar"
                label="Avatar"
                @update:model-value="emitUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== AFFICHAGE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.display = !sections.display" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Affichage</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.display ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.display" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2">
            <input v-model="localProps.showQuoteIcon" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Icône citation</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="localProps.showRating" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Étoiles</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="localProps.showAvatar" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Avatar</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="localProps.showRole" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Rôle</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="localProps.showCompany" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Entreprise</span>
          </label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Colonnes</label>
          <select v-model.number="localProps.columns" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option :value="1">1 colonne</option>
            <option :value="2">2 colonnes</option>
            <option :value="3">3 colonnes</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== AVATAR ===== -->
    <div v-if="localProps.showAvatar" class="border-b border-gray-200 pb-4">
      <button @click="sections.avatar = !sections.avatar" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Avatar</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.avatar ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.avatar" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
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
    </div>
    
    <!-- ===== CITATION ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.quote = !sections.quote" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Citation</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.quote ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.quote" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.quoteStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="normal">Normal</option>
              <option value="italic">Italique</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.quoteFontSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== CARTE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.card = !sections.card" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Carte</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.card ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.card" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond carte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.cardBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.cardBgColor" @input="emitUpdate" type="text" placeholder="Transparent" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Bordure</label>
            <select v-model="localProps.cardBorderWidth" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
              <option value="thick">Épaisse</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Coins</label>
            <select v-model="localProps.cardBorderRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
        <div v-if="localProps.cardBorderWidth !== 'none'">
          <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.cardBorderColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
            <input v-model="localProps.cardBorderColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Padding</label>
            <select v-model="localProps.cardPadding" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ombre</label>
            <select v-model="localProps.cardShadow" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucune</option>
              <option value="small">Légère</option>
              <option value="medium">Moyenne</option>
              <option value="large">Forte</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Effet hover</label>
          <select v-model="localProps.cardHoverEffect" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="lift">Soulever</option>
            <option value="scale">Agrandir</option>
            <option value="glow">Lueur</option>
          </select>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur accent (étoiles)</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur titre</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
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
          </select>
        </div>
      </div>
    </div>

    <!-- ===== BADGE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.badge = !sections.badge" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Badge</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.badge ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.badge" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.showBadge" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher le badge</span>
        </label>
        <div v-if="localProps.showBadge">
          <label class="block text-xs text-gray-500 mb-1">Texte du badge</label>
          <input v-model="localProps.badge" @input="emitUpdate" type="text" placeholder="TÉMOIGNAGES" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
      </div>
    </div>
    
    <!-- ===== STATISTIQUES (Split Image uniquement) ===== -->
    <div v-if="localProps.templateId?.includes('split-image')" class="border-b border-gray-200 pb-4">
      <button @click="sections.stats = !sections.stats" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Statistiques</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.stats ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.stats" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Stat 1 - Valeur</label>
            <input v-model="localProps.stat1Value" @input="emitUpdate" type="text" placeholder="+45%" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Stat 1 - Label</label>
            <input v-model="localProps.stat1Label" @input="emitUpdate" type="text" placeholder="Satisfaction" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Stat 2 - Valeur</label>
            <input v-model="localProps.stat2Value" @input="emitUpdate" type="text" placeholder="2x" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Stat 2 - Label</label>
            <input v-model="localProps.stat2Label" @input="emitUpdate" type="text" placeholder="Conversions" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== NOTE GLOBALE (Reviews List uniquement) ===== -->
    <div v-if="localProps.templateId?.includes('reviews-list')" class="border-b border-gray-200 pb-4">
      <button @click="sections.reviewStats = !sections.reviewStats" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Note globale</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.reviewStats ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.reviewStats" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Note moyenne</label>
            <input v-model="localProps.averageRating" @input="emitUpdate" type="text" placeholder="4.9" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Nombre d'avis</label>
            <input v-model="localProps.totalReviews" @input="emitUpdate" type="text" placeholder="1894" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== POSITIONNEMENT ===== -->
    <PositioningSection
      :elements="['badge', 'title', 'subtitle', 'items', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{ 
        badgeOffsetY: localProps.badgeOffsetY,
        titleOffsetY: localProps.titleOffsetY, 
        subtitleOffsetY: localProps.subtitleOffsetY, 
        itemsOffsetY: localProps.itemsOffsetY,
        buttonOffsetY: localProps.buttonOffsetY
      }"
      :labels="{ badge: 'Badge', title: 'Titre', subtitle: 'Sous-titre', items: 'Témoignages', button: 'Bouton CTA' }"
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="testimonials" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
  items: false,
  display: false,
  avatar: false,
  quote: false,
  card: false,
  appearance: false,
  animation: false,
  stats: true,
  reviewStats: true,
  badge: true,
  cta: false,
  positioning: false,
  advanced: false,
})

const defaultItems = [
  { name: 'Client 1', role: 'Entrepreneur', company: '', text: 'Un service exceptionnel qui a transformé mon business.', avatar: null, rating: 5 },
]

const localProps = reactive({
  templateId: props.props.templateId || 'testimonials-minimal-centered',
  title: props.props.title || "Ce qu'ils en disent",
  subtitle: props.props.subtitle || '',
  headerAlignment: props.props.headerAlignment || 'center',
  items: props.props.items || defaultItems,
  columns: props.props.columns || 3,
  showQuoteIcon: props.props.showQuoteIcon !== false ? false : props.props.showQuoteIcon,
  showRating: props.props.showRating !== false,
  showAvatar: props.props.showAvatar !== false,
  showRole: props.props.showRole !== false,
  showCompany: props.props.showCompany || false,
  avatarShape: props.props.avatarShape || 'circle',
  avatarSize: props.props.avatarSize || 'medium',
  quoteStyle: props.props.quoteStyle || 'normal',
  quoteFontSize: props.props.quoteFontSize || 'medium',
  cardBgColor: props.props.cardBgColor || '',
  cardBorderWidth: props.props.cardBorderWidth || 'none',
  cardBorderColor: props.props.cardBorderColor || '',
  cardBorderRadius: props.props.cardBorderRadius || 'none',
  cardPadding: props.props.cardPadding || 'medium',
  cardShadow: props.props.cardShadow || 'none',
  cardHoverEffect: props.props.cardHoverEffect || 'none',
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  accentColor: props.props.accentColor || '#10B981',
  titleColor: props.props.titleColor || '',
  paddingY: props.props.paddingY || 'large',
  animation: props.props.animation || 'none',
  stat1Value: props.props.stat1Value || '+45%',
  stat1Label: props.props.stat1Label || 'Satisfaction',
  stat2Value: props.props.stat2Value || '2x',
  stat2Label: props.props.stat2Label || 'Conversions',
  averageRating: props.props.averageRating || '4.9',
  totalReviews: props.props.totalReviews || '1894',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  showBadge: props.props.showBadge || false,
  badge: props.props.badge || 'Témoignages',
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'Démarrer maintenant',
  buttonUrl: props.props.buttonUrl || '',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['badge', 'title', 'subtitle', 'items', 'button'],
  badgeOffsetY: props.props.badgeOffsetY || 0,
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  itemsOffsetY: props.props.itemsOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['badge', 'title', 'subtitle', 'items', 'button']
requiredElements.forEach(el => {
  if (localProps.elementsOrder && !localProps.elementsOrder.includes(el)) {
    localProps.elementsOrder.push(el)
  }
})

// Migration des noms d'éléments (ex: testimonials -> items)
if (localProps.elementsOrder) {
  localProps.elementsOrder = localProps.elementsOrder.map(el => el === 'testimonials' ? 'items' : el)
  // S'assurer que 'badge' est présent
  if (!localProps.elementsOrder.includes('badge')) {
    localProps.elementsOrder.unshift('badge')
  }
}

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
  if (!localProps.items?.length) localProps.items = defaultItems
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => {
  (localProps as any)[key] = value
  emitUpdate()
}

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  // Migration des clés d'offset (ex: testimonialsOffsetY -> itemsOffsetY)
  if ('testimonialsOffsetY' in offsets) {
    localProps.itemsOffsetY = offsets.testimonialsOffsetY as number
    delete (localProps as any).testimonialsOffsetY
  }
  emitUpdate()
}

function addItem() {
  if (!localProps.items) localProps.items = []
  localProps.items.push({ name: 'Nouveau client', role: '', company: '', text: 'Votre témoignage ici...', avatar: null, rating: 5 })
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  emitUpdate()
}
</script>
