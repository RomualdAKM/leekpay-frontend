<template>
  <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
    <TemplatePicker block-type="features" :model-value="localProps.templateId" @select="updateProp('templateId', $event)"/>
    
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
    
    <!-- ===== FONCTIONNALITÉS ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.items = !sections.items" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Fonctionnalités ({{ localProps.items?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.items ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.items" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addItem" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter</button>
        </div>
        <div v-for="(item, index) in localProps.items" :key="index" class="border border-gray-200 rounded-lg p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">#{{ (index as any) + 1 }}</span>
            <button v-if="localProps.items.length > 1" @click="removeItem(index as any)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <div class="space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Icône</label>
              <select v-model="item.icon" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="check">Coche</option>
                <option value="star">Étoile</option>
                <option value="heart">Coeur</option>
                <option value="lightning">Éclair</option>
                <option value="shield">Bouclier</option>
                <option value="gift">Cadeau</option>
                <option value="clock">Horloge</option>
                <option value="globe">Globe</option>
                <option value="sparkle">Étincelle</option>
                <option value="award">Badge</option>
                <option value="rocket">Fusée</option>
                <option value="users">Utilisateurs</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Titre</label>
              <input v-model="item.title" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea v-model="item.description" @input="emitUpdate" rows="2" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== LAYOUT ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.layout = !sections.layout" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Layout</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.layout ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.layout" class="mt-3 space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Disposition</label>
          <select v-model="localProps.layout" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="grid">Grille</option>
            <option value="list">Liste</option>
            <option value="alternating">Alternée</option>
            <option value="masonry">Masonry</option>
            <option value="carousel">Carousel</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        <div v-if="localProps.layout === 'grid'">
          <label class="block text-xs text-gray-500 mb-1">Colonnes</label>
          <select v-model.number="localProps.columns" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option :value="2">2 colonnes</option>
            <option :value="3">3 colonnes</option>
            <option :value="4">4 colonnes</option>
            <option :value="6">6 colonnes</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement items</label>
          <select v-model="localProps.itemGap" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- ===== ICÔNE ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.icon = !sections.icon" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Icône</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.icon ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.icon" class="mt-3 space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="localProps.showIcon" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher les icônes</span>
        </label>
        <div v-if="localProps.showIcon" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Style</label>
            <select v-model="localProps.iconStyle" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="filled">Rempli</option>
              <option value="outlined">Contour</option>
              <option value="number">Numéroté</option>
              <option value="none">Aucun</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.iconSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
        </div>
        <div v-if="localProps.showIcon && localProps.iconStyle !== 'number'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur icône</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.iconColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.iconColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Fond icône</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.iconBgColor" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.iconBgColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
        </div>
        <div v-if="localProps.showIcon">
          <label class="block text-xs text-gray-500 mb-1">Arrondi icône</label>
          <select v-model="localProps.iconRadius" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="full">Cercle</option>
          </select>
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
            <option value="border">Bordure accent</option>
          </select>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement texte</label>
          <div class="grid grid-cols-3 gap-1">
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('cardTextAlign', a)" :class="['px-3 py-1.5 text-xs rounded border', localProps.cardTextAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'Centre' : 'Droite' }}
            </button>
          </div>
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
        <label class="flex items-center gap-2">
          <input v-model="localProps.showDescription" @change="emitUpdate" type="checkbox" class="rounded text-emerald-500"/>
          <span class="text-xs text-gray-600">Afficher descriptions</span>
        </label>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Police titre section</label>
          <select v-model="localProps.sectionTitleFont" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Par défaut</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Poppins', sans-serif">Poppins</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille titre section</label>
            <select v-model="localProps.sectionTitleSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
              <option value="xlarge">Très grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.sectionTitleWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="light">Léger</option>
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur titre</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
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
          <label class="block text-xs text-gray-500 mb-1">Couleur fond</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.backgroundColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        <div v-if="localProps.backgroundType === 'gradient'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur début</label>
            <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur fin</label>
            <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-full h-8 rounded cursor-pointer border-0"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Couleur accent</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="localProps.accentColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
            <input v-model="localProps.accentColor" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
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
          <label class="block text-xs text-gray-500 mb-1">Animation items</label>
          <select v-model="localProps.animation" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="none">Aucune</option>
            <option value="fade">Fondu</option>
            <option value="slide-up">Glisser haut</option>
            <option value="scale">Zoom</option>
            <option value="stagger">Échelonné</option>
          </select>
        </div>
        <div v-if="localProps.animation !== 'none'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Durée (ms)</label>
            <input type="number" v-model.number="localProps.animationDuration" @input="emitUpdate" min="100" max="2000" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Délai (ms)</label>
            <input type="number" v-model.number="localProps.animationDelay" @input="emitUpdate" min="0" max="2000" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ===== BADGE (Checklist/Tabs uniquement) ===== -->
    <div v-if="localProps.templateId?.includes('checklist') || localProps.templateId?.includes('tabs')" class="border-b border-gray-200 pb-4">
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
          <input v-model="localProps.badge" @input="emitUpdate" type="text" placeholder="CARACTÉRISTIQUES" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
      </div>
    </div>
    
    <!-- ===== ONGLETS (Tabs uniquement) ===== -->
    <div v-if="localProps.templateId?.includes('tabs')" class="border-b border-gray-200 pb-4">
      <button @click="sections.tabs = !sections.tabs" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Onglets ({{ localProps.tabs?.length || 0 }})</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.tabs ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.tabs" class="mt-3 space-y-3">
        <div class="flex justify-end">
          <button @click="addTab" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">+ Ajouter un onglet</button>
        </div>
        <div v-for="(tab, index) in localProps.tabs" :key="index" class="border border-gray-200 rounded-lg p-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-600">Onglet {{ (index as any) + 1 }}</span>
            <button v-if="localProps.tabs.length > 1" @click="removeTab(index as any)" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
          </div>
          <div class="space-y-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Label (bouton)</label>
              <input v-model="tab.label" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Titre</label>
              <input v-model="tab.title" @input="emitUpdate" type="text" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"/>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Description</label>
              <textarea v-model="tab.description" @input="emitUpdate" rows="2" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none"></textarea>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Fonctionnalités (une par ligne)</label>
              <textarea v-model="tabFeaturesText[index as any]" @input="updateTabFeatures(index as any, $event)" rows="3" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none" placeholder="CDN global&#10;Cache intelligent&#10;Compression"></textarea>
            </div>
            <div>
              <UiImageUploader
                v-model="tab.image"
                label="Image"
                @update:model-value="emitUpdate"
              />
            </div>
          </div>
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
          <span class="text-xs text-gray-600">Afficher le bouton</span>
        </label>
        <div v-if="localProps.showButton">
          <div class="mb-2">
            <label class="block text-xs text-gray-500 mb-1">Texte du bouton</label>
            <input v-model="localProps.buttonText" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">URL du bouton</label>
            <input v-model="localProps.buttonUrl" @input="emitUpdate" type="text" placeholder="https://..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== POSITIONNEMENT ===== -->
    <PositioningSection
      :elements="['badge', 'title', 'subtitle', 'features', 'button']"
      :elements-order="localProps.elementsOrder"
      :offsets="{ 
        badgeOffsetY: localProps.badgeOffsetY, 
        titleOffsetY: localProps.titleOffsetY, 
        subtitleOffsetY: localProps.subtitleOffsetY, 
        featuresOffsetY: localProps.featuresOffsetY,
        buttonOffsetY: localProps.buttonOffsetY
      }"
      :labels="{ badge: 'Badge', title: 'Titre', subtitle: 'Sous-titre', features: 'Grille/Liste', button: 'Bouton CTA' }"
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
          <input v-model="localProps.cssId" @input="emitUpdate" type="text" placeholder="features-section" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
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
  layout: false,
  icon: false,
  card: false,
  typography: false,
  appearance: false,
  animation: false,
  badge: true,
  tabs: true,
  cta: false,
  positioning: false,
  advanced: false,
})

const defaultItems = [
  { icon: 'check', title: 'Fonctionnalité 1', description: 'Description de la fonctionnalité' },
  { icon: 'check', title: 'Fonctionnalité 2', description: 'Description de la fonctionnalité' },
  { icon: 'check', title: 'Fonctionnalité 3', description: 'Description de la fonctionnalité' },
]

const localProps = reactive({
  templateId: props.props.templateId || 'features-minimal-grid',
  title: props.props.title || 'Ce que vous allez obtenir',
  subtitle: props.props.subtitle || '',
  headerAlignment: props.props.headerAlignment || 'center',
  items: props.props.items || defaultItems,
  layout: props.props.layout || 'grid',
  columns: props.props.columns || 3,
  itemGap: props.props.itemGap || 'medium',
  showIcon: props.props.showIcon !== false,
  iconStyle: props.props.iconStyle || 'filled',
  iconSize: props.props.iconSize || 'medium',
  iconColor: props.props.iconColor || '#ffffff',
  iconBgColor: props.props.iconBgColor || '',
  iconRadius: props.props.iconRadius || 'full',
  showDescription: props.props.showDescription !== false,
  titleColor: props.props.titleColor || '',
  sectionTitleFont: props.props.sectionTitleFont || '',
  sectionTitleSize: props.props.sectionTitleSize || 'medium',
  sectionTitleWeight: props.props.sectionTitleWeight || 'medium',
  cardBgColor: props.props.cardBgColor || '',
  cardBorderWidth: props.props.cardBorderWidth || 'none',
  cardBorderColor: props.props.cardBorderColor || '',
  cardBorderRadius: props.props.cardBorderRadius || 'none',
  cardPadding: props.props.cardPadding || 'medium',
  cardShadow: props.props.cardShadow || 'none',
  cardHoverEffect: props.props.cardHoverEffect || 'none',
  cardTextAlign: props.props.cardTextAlign || 'center',
  backgroundType: props.props.backgroundType || 'solid',
  backgroundColor: props.props.backgroundColor || '#ffffff',
  gradientStart: props.props.gradientStart || '#f8fafc',
  gradientEnd: props.props.gradientEnd || '#ffffff',
  accentColor: props.props.accentColor || '#10B981',
  paddingY: props.props.paddingY || 'large',
  animation: props.props.animation || 'none',
  animationDuration: props.props.animationDuration || 500,
  animationDelay: props.props.animationDelay || 0,
  showBadge: props.props.showBadge || false,
  badge: props.props.badge || 'Caractéristiques',
  tabs: props.props.tabs || [
    { label: 'Performance', title: 'Vitesse incomparable', description: 'Notre infrastructure est optimisée.', features: ['CDN global', 'Cache intelligent'], image: '' },
    { label: 'Sécurité', title: 'Protection maximale', description: 'Vos données sont protégées.', features: ['SSL', 'Sauvegarde'], image: '' },
  ],
  showButton: props.props.showButton || false,
  buttonText: props.props.buttonText || 'Démarrer maintenant',
  buttonUrl: props.props.buttonUrl || '',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  elementsOrder: props.props.elementsOrder || ['badge', 'title', 'subtitle', 'features', 'button'],
  badgeOffsetY: props.props.badgeOffsetY || 0,
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  featuresOffsetY: props.props.featuresOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['badge', 'title', 'subtitle', 'features', 'button']
requiredElements.forEach(el => {
  if (localProps.elementsOrder && !localProps.elementsOrder.includes(el)) {
    localProps.elementsOrder.push(el)
  }
})

// Texte des features par onglet (pour édition ligne par ligne)
const tabFeaturesText = reactive<string[]>([])

// Init tabFeaturesText
if (localProps.tabs) {
  localProps.tabs.forEach((tab: any, idx: number) => {
    tabFeaturesText[idx] = (tab.features || []).join('\n')
  })
}

const updateTabFeatures = (index: number, event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  tabFeaturesText[index] = value
  if (localProps.tabs && localProps.tabs[index]) {
    localProps.tabs[index].features = value.split('\n').filter(f => f.trim())
  }
  emitUpdate()
}

function addTab() {
  if (!localProps.tabs) localProps.tabs = []
  const newTab = { label: 'Nouvel onglet', title: 'Titre', description: 'Description', features: ['Fonctionnalité 1'], image: '' }
  localProps.tabs.push(newTab)
  tabFeaturesText.push('Fonctionnalité 1')
  emitUpdate()
}

function removeTab(index: number) {
  localProps.tabs.splice(index, 1)
  tabFeaturesText.splice(index, 1)
  emitUpdate()
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
  emitUpdate()
}

function addItem() {
  if (!localProps.items) localProps.items = []
  localProps.items.push({ icon: 'check', title: 'Nouvelle fonctionnalité', description: 'Description' })
  emitUpdate()
}

function removeItem(index: number) {
  localProps.items.splice(index, 1)
  emitUpdate()
}
</script>
