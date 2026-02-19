<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="boxes" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
    <!-- ===== CONTENU ===== -->
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
          <label class="block text-xs text-gray-500 mb-1">Titre</label>
          <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
    
    <!-- ===== BOÎTES ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.items = !sections.items" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Boîtes ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.items ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.items" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
        </div>
        <div v-for="(item, index) in localProps.items" :key="index" class="border border-gray-200 rounded-lg p-3 relative group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">#{{ (index as any) + 1 }}</span>
            <button v-if="localProps.items.length > 1" @click="removeItem(index as any)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Icône</label>
                <select v-model="item.icon" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                  <option value="check">Coche</option>
                  <option value="search">Loupe</option>
                  <option value="edit-3">Crayon</option>
                  <option value="rocket">Fusée</option>
                  <option value="user">Utilisateur</option>
                  <option value="sparkles">Étincelles</option>
                  <option value="star">Étoile</option>
                  <option value="lightning">Éclair</option>
                  <option value="shield">Bouclier</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Badge</label>
                <input v-model="item.badge" @input="emitUpdate" type="text" placeholder="Étape 1..." class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Titre</label>
              <input v-model="item.title" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea v-model="item.description" @input="emitUpdate" rows="2" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none"></textarea>
            </div>
            <div v-if="localProps.templateId === 'boxes-modern-avatar'">
              <UiImageUploader
                v-model="item.image"
                label="Image (Avatar)"
                @update:model-value="(val) => updateItemImage(Number(index), val)"
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
            <input v-model="localProps.showIcon" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Afficher icônes</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="localProps.showDescription" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
            <span class="text-xs text-gray-600">Descriptions</span>
          </label>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Colonnes</label>
          <select v-model.number="localProps.columns" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option :value="1">1 colonne</option>
            <option :value="2">2 colonnes</option>
            <option :value="3">3 colonnes</option>
            <option :value="4">4 colonnes</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Espacement items</label>
            <select v-model="localProps.itemGap" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Padding vertical</label>
            <select v-model="localProps.paddingY" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== ICÔNE ===== -->
    <div v-if="localProps.showIcon" class="border-b border-gray-200 pb-4">
      <button @click="sections.icon = !sections.icon" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Style Icône</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.icon ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.icon" class="mt-3 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur icône</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.iconColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.iconColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond icône</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.iconBgColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.iconBgColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.iconSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
            <select v-model="localProps.iconRadius" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="full">Cercle</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CARTE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.card = !sections.card" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Style Carte</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.card ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.card" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond carte</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.cardBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.cardBgColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Coins arrondis</label>
            <select v-model="localProps.cardBorderRadius" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucun</option>
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Extra large</option>
              <option value="full">Complet</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Ombre</label>
            <select v-model="localProps.cardShadow" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucune</option>
              <option value="small">Légère</option>
              <option value="medium">Moyenne</option>
              <option value="large">Prononcée</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Bordure</label>
            <select v-model="localProps.cardBorderWidth" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="none">Aucune</option>
              <option value="thin">Fine</option>
              <option value="medium">Moyenne</option>
              <option value="thick">Épaisse</option>
            </select>
          </div>
          <div v-if="localProps.cardBorderWidth !== 'none'">
            <label class="block text-xs text-gray-500 mb-1">Couleur bordure</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.cardBorderColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.cardBorderColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Effet Hover</label>
          <select v-model="localProps.cardHoverEffect" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
            <option value="none">Aucun</option>
            <option value="lift">Soulever</option>
            <option value="scale">Zoom</option>
            <option value="glow">Lueur</option>
            <option value="shadow">Ombre accentuée</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== TYPOGRAPHIE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.typography = !sections.typography" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Typographie</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.typography ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.typography" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille Titre Section</label>
          <select v-model="localProps.sectionTitleSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Extra large</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille Titres Items</label>
            <select v-model="localProps.itemTitleSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.itemTitleWeight" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille Description</label>
          <select v-model="localProps.itemTextSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
            <option value="xs">Extra petit</option>
            <option value="sm">Petit</option>
            <option value="base">Normal</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ===== APPARENCE (Couleurs) ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.appearance = !sections.appearance" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Apparence</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.appearance ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.appearance" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur fond (Section)</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Titre</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Accent</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== BOUTON CTA ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cta = !sections.cta" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Bouton CTA Global</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cta ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.cta" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.showButton" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher le bouton</span>
        </label>
        <div v-if="localProps.showButton">
          <div class="mb-2">
            <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
            <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div class="mb-2">
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
          <div class="mb-2">
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

    <!-- ===== POSITIONNEMENT ===== -->
    <PositioningSection
      :elements="['title', 'subtitle', 'items', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{ 
        titleOffsetY: localProps.titleOffsetY, 
        subtitleOffsetY: localProps.subtitleOffsetY, 
        itemsOffsetY: localProps.itemsOffsetY,
        buttonOffsetY: localProps.buttonOffsetY
      }"
      :labels="{ title: 'Titre', subtitle: 'Sous-titre', items: 'Grille de Boîtes', button: 'Bouton CTA' }"
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="boxes-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
  items: true,
  display: false,
  icon: false,
  card: false,
  typography: false,
  appearance: false,
  cta: false,
  positioning: false,
  advanced: false,
})

const localProps = reactive({
  templateId: props.props.templateId || 'boxes-professional-badge',
  title: props.props.title || 'Ce que nous proposons',
  subtitle: props.props.subtitle || '',
  headerAlignment: props.props.headerAlignment || 'center',
  items: props.props.items || [],
  columns: props.props.columns || 3,
  itemGap: props.props.itemGap || 'medium',
  paddingY: props.props.paddingY || 'large',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  accentColor: props.props.accentColor || '#10b981',
  titleColor: props.props.titleColor || '',
  showIcon: props.props.showIcon !== false,
  iconColor: props.props.iconColor || '',
  iconBgColor: props.props.iconBgColor || '',
  iconRadius: props.props.iconRadius || 'medium',
  iconSize: props.props.iconSize || 'medium',
  cardBgColor: props.props.cardBgColor || '',
  cardBorderRadius: props.props.cardBorderRadius || 'medium',
  cardShadow: props.props.cardShadow || 'none',
  cardBorderWidth: props.props.cardBorderWidth || 'none',
  cardBorderColor: props.props.cardBorderColor || '',
  cardHoverEffect: props.props.cardHoverEffect || 'none',
  cardPadding: props.props.cardPadding || 'medium',
  sectionTitleSize: props.props.sectionTitleSize || 'large',
  itemTitleSize: props.props.itemTitleSize || 'medium',
  itemTitleWeight: props.props.itemTitleWeight || 'semibold',
  itemTextSize: props.props.itemTextSize || 'sm',
  showDescription: props.props.showDescription !== false,
  showBadge: props.props.showBadge || false,
  badge: props.props.badge || 'Informations',
  // Titre personnalisé
  showTitle: props.props.showTitle !== false,
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || 'center',
  titleOpacity: props.props.titleOpacity !== undefined ? props.props.titleOpacity : 100,
  titleMarginBottom: props.props.titleMarginBottom || 16,
  // Sous-titre personnalisé
  showSubtitle: props.props.showSubtitle !== false,
  subtitleSize: props.props.subtitleSize || 'medium',
  subtitleWeight: props.props.subtitleWeight || 'normal',
  subtitleColor: props.props.subtitleColor || '',
  subtitleAlign: props.props.subtitleAlign || 'center',
  subtitleOpacity: props.props.subtitleOpacity !== undefined ? props.props.subtitleOpacity : 70,
  // Bouton CTA
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'Démarrer maintenant',
  buttonUrl: props.props.buttonUrl || '',
  buttonLinkType: props.props.buttonLinkType || 'custom',
  buttonPaymentLinkId: props.props.buttonPaymentLinkId || null,
  buttonTarget: props.props.buttonTarget || '_self',
  buttonSize: props.props.buttonSize || 'md',
  buttonBorderRadius: props.props.buttonBorderRadius || 'full',
  buttonShadow: props.props.buttonShadow || 'lg',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
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

function addItem() {
  if (!localProps.items) localProps.items = []
  const newItem = {
    id: 'box_' + Math.random().toString(36).substr(2, 9),
    title: 'Nouvel élément',
    description: 'Description de votre nouvel élément...',
    icon: 'check',
    badge: '',
    image: ''
  }
  localProps.items.push(newItem)
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  emitUpdate()
}

// Mise à jour de l'image avec valeur explicite pour éviter le problème de timing
function updateItemImage(index: number, value: string) {
  if (localProps.items && localProps.items[index]) {
    localProps.items[index].image = value
    emitUpdate()
  }
}
</script>
