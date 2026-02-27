<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="grid" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- CONTENU -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.content = !sections.content" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Contenu</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.content ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.content" class="mt-3 space-y-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showTitle" @change="updateProp('showTitle', localProps.showTitle)" class="rounded"/>
          <label class="text-xs text-gray-500">Afficher le titre</label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Titre de section</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" placeholder="Notre expertise" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.titleSize" @change="updateProp('titleSize', localProps.titleSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.titleWeight" @change="updateProp('titleWeight', localProps.titleWeight)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Moyen</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
              <option value="extrabold">Extra-gras</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <input type="color" v-model="localProps.titleColor" @input="updateProp('titleColor', localProps.titleColor)" class="w-10 h-10 rounded border border-gray-300 cursor-pointer"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <div class="grid grid-cols-3 gap-1">
              <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('titleAlign', a)" :class="['px-2 py-1 text-xs rounded border', localProps.titleAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
                {{ a === 'left' ? 'G' : a === 'center' ? 'C' : 'D' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité</label>
            <div class="flex items-center gap-1">
              <input type="range" min="0" max="100" v-model.number="localProps.titleOpacity" @input="updateProp('titleOpacity', localProps.titleOpacity)" class="flex-1"/>
              <span class="text-xs text-gray-500 w-7">{{ localProps.titleOpacity }}%</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="localProps.showSubtitle" @change="updateProp('showSubtitle', localProps.showSubtitle)" class="rounded"/>
          <label class="text-xs text-gray-500">Afficher le sous-titre</label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre de section</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" placeholder="Découvrez ce que nous faisons..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.subtitleSize" @change="updateProp('subtitleSize', localProps.subtitleSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.subtitleWeight" @change="updateProp('subtitleWeight', localProps.subtitleWeight)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Moyen</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <input type="color" v-model="localProps.subtitleColor" @input="updateProp('subtitleColor', localProps.subtitleColor)" class="w-10 h-10 rounded border border-gray-300 cursor-pointer"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <div class="grid grid-cols-3 gap-1">
              <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('subtitleAlign', a)" :class="['px-2 py-1 text-xs rounded border', localProps.subtitleAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
                {{ a === 'left' ? 'G' : a === 'center' ? 'C' : 'D' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Opacité</label>
            <div class="flex items-center gap-2">
              <input type="range" min="0" max="100" v-model.number="localProps.subtitleOpacity" @input="updateProp('subtitleOpacity', localProps.subtitleOpacity)" class="flex-1"/>
              <span class="text-xs text-gray-500 w-8">{{ localProps.subtitleOpacity }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- OPTIONS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.options = !sections.options" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Options</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.options ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.options" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement</label>
            <select v-model="localProps.gap" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.verticalAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="top">Haut</option>
              <option value="center">Centre</option>
              <option value="bottom">Bas</option>
              <option value="stretch">Étirer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉLÉMENTS -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.items = !sections.items" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Éléments ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.items ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.items" class="mt-3 space-y-3">
        <div class="flex gap-1 justify-end">
          <button @click="addItem('text')" class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200" title="Texte">T</button>
          <button @click="addItem('image')" class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200" title="Image">🖼</button>
          <button @click="addItem('video')" class="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200" title="Vidéo">▶</button>
        </div>
        <div v-for="(item, idx) in localProps.items" :key="item.id" class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="flex items-center justify-between p-2 bg-gray-50 cursor-pointer" @click="toggleItem(item.id)">
            <span class="text-sm font-medium text-gray-700 capitalize">{{ getItemLabel(item.type) }}</span>
            <div class="flex items-center gap-1">
              <button v-if="idx > 0" @click.stop="moveItem(idx, -1)" class="p-1 text-gray-400 hover:text-gray-600">↑</button>
              <button v-if="idx < (localProps.items?.length || 0) - 1" @click.stop="moveItem(idx, 1)" class="p-1 text-gray-400 hover:text-gray-600">↓</button>
              <button @click.stop="removeItem(idx)" class="p-1 text-gray-400 hover:text-red-500">×</button>
              <ChevronDown :class="['w-4 h-4 text-gray-400 transition-transform', expandedItem === item.id ? 'rotate-180' : '']"/>
            </div>
          </div>
          <div v-if="expandedItem === item.id" class="p-3 space-y-3">
            <!-- TYPE: TEXTE -->
            <div v-if="item.type === 'text'" class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Contenu HTML</label>
                <textarea v-model="item.content" @input="emitUpdate" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono resize-none" placeholder="<h2>Titre</h2><p>Paragraphe...</p>"></textarea>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Alignement</label>
                  <select v-model="item.textAlign" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="left">Gauche</option>
                    <option value="center">Centre</option>
                    <option value="right">Droite</option>
                    <option value="justify">Justifié</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Taille</label>
                  <select v-model="item.textSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="small">Petit</option>
                    <option value="medium">Moyen</option>
                    <option value="large">Grand</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Poids</label>
                  <select v-model="item.textWeight" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semi-gras</option>
                    <option value="bold">Gras</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Couleur</label>
                  <div class="flex items-center gap-2">
                    <input type="color" v-model="item.textColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
                    <input v-model="item.textColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- TYPE: IMAGE -->
            <div v-else-if="item.type === 'image'" class="space-y-3">
              <UiImageUploader
                v-model="item.content"
                label="Image"
                @update:model-value="(val) => updateItemContent(Number(idx), val)"
              />
              <input v-model="item.alt" @input="emitUpdate" type="text" placeholder="Texte alternatif" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
                  <select v-model="item.imageRounded" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="none">Aucun</option>
                    <option value="sm">Petit</option>
                    <option value="md">Moyen</option>
                    <option value="lg">Grand</option>
                    <option value="full">Cercle</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Ajustement</label>
                  <select v-model="item.imageObjectFit" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="cover">Couvrir</option>
                    <option value="contain">Contenir</option>
                    <option value="fill">Remplir</option>
                    <option value="none">Original</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Ombre</label>
                <select v-model="item.imageShadow" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option value="none">Aucune</option>
                  <option value="sm">Légère</option>
                  <option value="md">Moyenne</option>
                  <option value="lg">Forte</option>
                </select>
              </div>
            </div>
            
            <!-- TYPE: VIDEO -->
            <div v-else-if="item.type === 'video'" class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">URL vidéo</label>
                <input v-model="item.content" @input="emitUpdate" type="url" placeholder="YouTube, Vimeo..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
                <select v-model="item.videoRounded" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option value="none">Aucun</option>
                  <option value="sm">Petit</option>
                  <option value="md">Moyen</option>
                  <option value="lg">Grand</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!localProps.items?.length" class="text-center py-4 text-gray-400 text-sm">Aucun élément</div>
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
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"/>
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
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== BOUTON CTA ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cta = !sections.cta" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton CTA</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cta ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.cta" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.showButton" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher le bouton global</span>
        </label>
        <div v-if="localProps.showButton" class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
            <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ouvrir dans</label>
            <select v-model="localProps.buttonTarget" @change="updateProp('buttonTarget', localProps.buttonTarget)" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="_self">Même onglet</option>
              <option value="_blank">Nouvel onglet</option>
            </select>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.buttonSize" @change="updateProp('buttonSize', localProps.buttonSize)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Rayon</label>
              <select v-model="localProps.buttonBorderRadius" @change="updateProp('buttonBorderRadius', localProps.buttonBorderRadius)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="none">Aucun</option>
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
                <option value="full">Complet</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ombre</label>
              <select v-model="localProps.buttonShadow" @change="updateProp('buttonShadow', localProps.buttonShadow)" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="none">Aucune</option>
                <option value="sm">Petite</option>
                <option value="md">Moyenne</option>
                <option value="lg">Grande</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- POSITIONNEMENT -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.positioning = !sections.positioning" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Positionnement</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.positioning ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.positioning" class="mt-3">
        <PositioningSection
          :elements="['title', 'subtitle', 'grid', 'button']"
          :elements-order="localProps.elementsOrder"
          :offsets="{
            titleOffsetY: localProps.titleOffsetY,
            subtitleOffsetY: localProps.subtitleOffsetY,
            gridOffsetY: localProps.gridOffsetY,
            buttonOffsetY: localProps.buttonOffsetY
          }"
          :labels="{ title: 'Titre', subtitle: 'Sous-titre', grid: 'Grille', button: 'Bouton CTA' }"
          @update:elements-order="updateProp('elementsOrder', $event)"
          @update:offsets="updateOffsets"
        />
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="grid-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
import { reactive, watch, ref, inject } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'

interface GridItem {
  id: string
  type: 'text' | 'image' | 'video'
  content: string | null
  alt?: string
  span?: number
  // Propriétés Texte
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textSize?: 'small' | 'medium' | 'large'
  textWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  textColor?: string
  // Propriétés Image
  imageRounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  imageObjectFit?: 'cover' | 'contain' | 'fill' | 'none'
  imageShadow?: 'none' | 'sm' | 'md' | 'lg'
  // Propriétés Vidéo
  videoRounded?: 'none' | 'sm' | 'md' | 'lg'
}

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const uploadImage = inject<(file: File) => Promise<string | null>>('uploadImage')

const sections = reactive({ content: false, options: true, items: true, appearance: false, cta: false, positioning: false, advanced: false })
const expandedItem = ref<string | null>(null)

const localProps = reactive({
  templateId: props.props.templateId || 'grid-2-cols',
  gap: props.props.gap || 'medium',
  verticalAlign: props.props.verticalAlign || 'center',
  items: props.props.items || [] as GridItem[],
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  paddingY: props.props.paddingY || 'medium',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  title: props.props.title || '',
  subtitle: props.props.subtitle || '',
  // Titre
  showTitle: props.props.showTitle !== false,
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || 'center',
  titleOpacity: props.props.titleOpacity !== undefined ? props.props.titleOpacity : 100,
  titleMarginBottom: props.props.titleMarginBottom || 16,
  // Sous-titre
  showSubtitle: props.props.showSubtitle !== false,
  subtitleSize: props.props.subtitleSize || 'medium',
  subtitleWeight: props.props.subtitleWeight || 'normal',
  subtitleColor: props.props.subtitleColor || '',
  subtitleAlign: props.props.subtitleAlign || 'center',
  subtitleOpacity: props.props.subtitleOpacity !== undefined ? props.props.subtitleOpacity : 70,
  headerAlignment: props.props.headerAlignment || 'center',
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'En savoir plus',
  buttonUrl: props.props.buttonUrl || '',
  buttonLinkType: props.props.buttonLinkType || 'custom',
  buttonPaymentLinkId: props.props.buttonPaymentLinkId || null,
  buttonTarget: props.props.buttonTarget || '_self',
  buttonSize: props.props.buttonSize || 'md',
  buttonBorderRadius: props.props.buttonBorderRadius || 'full',
  buttonShadow: props.props.buttonShadow || 'lg',
  accentColor: props.props.accentColor || '#10b981',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['title', 'subtitle', 'grid', 'button'],
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  gridOffsetY: props.props.gridOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['title', 'subtitle', 'grid', 'button']
requiredElements.forEach(el => {
  if (localProps.elementsOrder && !localProps.elementsOrder.includes(el)) {
    localProps.elementsOrder.push(el)
  }
})

watch(() => props.props, (newVal) => {
  Object.keys(newVal).forEach(key => {
    if (key in localProps) (localProps as any)[key] = newVal[key]
  })
}, { deep: true })

const emitUpdate = () => emit('update', { ...localProps })
const updateProp = (key: string, value: any) => { (localProps as any)[key] = value; emitUpdate() }

const updateOffsets = (offsets: Record<string, number>) => {
  Object.assign(localProps, offsets)
  emitUpdate()
}

const toggleItem = (id: string) => { expandedItem.value = expandedItem.value === id ? null : id }
const getItemLabel = (type: string) => ({ text: 'Texte', image: 'Image', video: 'Vidéo' }[type] || type)

function addItem(type: 'text' | 'image' | 'video') {
  const newId = Date.now().toString()
  if (!localProps.items) localProps.items = []
  const defaults: Record<string, GridItem> = {
    text: { 
      id: newId, 
      type: 'text', 
      content: '<p>Votre texte ici...</p>', 
      span: 1,
      textAlign: 'left',
      textSize: 'medium',
      textWeight: 'normal',
      textColor: ''
    },
    image: { 
      id: newId, 
      type: 'image', 
      content: null, 
      alt: '', 
      span: 1,
      imageRounded: 'md',
      imageObjectFit: 'cover',
      imageShadow: 'none'
    },
    video: { 
      id: newId, 
      type: 'video', 
      content: '', 
      span: 1,
      videoRounded: 'md'
    },
  }
  localProps.items.push(defaults[type])
  expandedItem.value = newId
  emitUpdate()
}

function removeItem(idx: number) { localProps.items.splice(idx, 1); emitUpdate() }

// Mise à jour du contenu image avec valeur explicite
function updateItemContent(index: number, value: string) {
  if (localProps.items && localProps.items[index]) {
    localProps.items[index].content = value
    emitUpdate()
  }
}

function moveItem(idx: number, dir: number) {
  const newIdx = idx + dir
  if (newIdx < 0 || newIdx >= localProps.items.length) return
  const item = localProps.items[idx]
  localProps.items.splice(idx, 1)
  localProps.items.splice(newIdx, 0, item)
  emitUpdate()
}
</script>
