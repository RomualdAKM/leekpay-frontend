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
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="localProps.showTitle" @change="emitUpdate" class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"/>
          <span class="text-sm text-gray-700">Afficher un titre</span>
        </label>
        <div v-if="localProps.showTitle !== false">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Titre</label>
            <input v-model="localProps.title" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Balise HTML</label>
              <select v-model="localProps.titleTag" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
                <option value="p">Paragraphe</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Police</label>
              <select v-model="localProps.titleFontFamily" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Par défaut</option>
                <option value="'Inter', sans-serif">Inter</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Lora', serif">Lora</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.titleSize" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
                <option value="xlarge">Très grand</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Poids</label>
              <select v-model="localProps.titleWeight" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semi-gras</option>
                <option value="bold">Gras</option>
                <option value="extrabold">Extra gras</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Alignement</label>
              <select v-model="localProps.titleAlign" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Hérité (En-tête)</option>
                <option value="left">Gauche</option>
                <option value="center">Centre</option>
                <option value="right">Droite</option>
                <option value="justify">Justifié</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Transformation</label>
              <select v-model="localProps.titleTransform" @change="emitUpdate" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="none">Aucune</option>
                <option value="uppercase">Majuscules</option>
                <option value="lowercase">Minuscules</option>
                <option value="capitalize">Capitalisé</option>
              </select>
            </div>
          </div>
          
          <!-- Couleur du titre -->
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Couleur du titre</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.titleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.titleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
          
          <!-- Opacité -->
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Opacité: {{ localProps.titleOpacity }}%</label>
            <input v-model.number="localProps.titleOpacity" @input="emitUpdate" type="range" min="0" max="100" class="w-full"/>
          </div>
          
          <!-- Marge basse -->
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Marge basse (px)</label>
            <input v-model.number="localProps.titleMarginBottom" @input="emitUpdate" type="number" min="0" max="100" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Sous-titre</label>
          <input v-model="localProps.subtitle" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
        </div>
        <!-- Styles sous-titre -->
        <div v-if="localProps.subtitle" class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Taille</label>
            <select v-model="localProps.subtitleSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="small">Petit</option>
              <option value="medium">Moyen</option>
              <option value="large">Grand</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Poids</label>
            <select v-model="localProps.subtitleWeight" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="normal">Normal</option>
              <option value="medium">Moyen</option>
              <option value="semibold">Semi-gras</option>
              <option value="bold">Gras</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <div class="flex gap-1">
              <input type="color" v-model="localProps.subtitleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.subtitleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Alignement</label>
            <select v-model="localProps.subtitleAlign" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
              <option value="">Hérité (En-tête)</option>
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </div>
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
    
    <!-- ===== STYLE DES CARTES ===== -->
    <div class="border-b border-gray-200 pb-4">
      <button @click="sections.cardStyles = !sections.cardStyles" class="flex items-center justify-between w-full text-left">
        <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Style des cartes</h4>
        <ChevronDown :class="['w-4 h-4 transition-transform', sections.cardStyles ? 'rotate-180' : '']"/>
      </button>
      <div v-show="sections.cardStyles" class="mt-3 space-y-3">
        <!-- Titre des cartes -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-600">Titre des cartes</label>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
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
                <option value="medium">Moyen</option>
                <option value="semibold">Semi-gras</option>
                <option value="bold">Gras</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur</label>
            <div class="flex gap-1">
              <input type="color" v-model="localProps.itemTitleColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
              <input v-model="localProps.itemTitleColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
            </div>
          </div>
        </div>
        <!-- Description des cartes -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-600">Description des cartes</label>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.itemDescriptionSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur</label>
              <div class="flex gap-1">
                <input type="color" v-model="localProps.itemDescriptionColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.itemDescriptionColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement des cartes</label>
          <div class="grid grid-cols-4 gap-1">
            <button @click="updateProp('cardTextAlign', '')" :class="['px-2 py-1.5 text-[10px] rounded border', !localProps.cardTextAlign ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              Auto
            </button>
            <button v-for="a in ['left','center','right']" :key="a" @click="updateProp('cardTextAlign', a)" :class="['px-2 py-1.5 text-[10px] rounded border', localProps.cardTextAlign === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-300']">
              {{ a === 'left' ? 'Gauche' : a === 'center' ? 'C' : 'Droit' }}
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
            <span class="text-xs font-medium text-gray-600">#{{ Number(index) + 1 }}</span>
            <button v-if="localProps.items.length > 1" @click="removeItem(Number(index))" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
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
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientStart" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientStart" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Couleur fin</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="localProps.gradientEnd" @input="emitUpdate" class="w-8 h-8 rounded cursor-pointer border-0"/>
              <input v-model="localProps.gradientEnd" @input="emitUpdate" type="text" class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"/>
            </div>
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
            <span class="text-xs font-medium text-gray-600">Onglet {{ Number(index) + 1 }}</span>
            <button v-if="localProps.tabs.length > 1" @click="removeTab(Number(index))" class="text-xs text-red-500 hover:text-red-600">Supprimer</button>
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
              <textarea v-model="tabFeaturesText[Number(index)]" @input="updateTabFeatures(Number(index), $event)" rows="3" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm resize-none" placeholder="CDN global&#10;Cache intelligent&#10;Compression"></textarea>
            </div>
            <div>
              <UiImageUploader
                v-model="tab.image"
                label="Image"
                @update:model-value="(val) => updateTabImage(Number(index), val)"
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
        <div v-if="localProps.showButton" class="space-y-3">
          <!-- Texte et URL -->
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
          <!-- Taille et Cible -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Taille</label>
              <select v-model="localProps.buttonSize" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Cible</label>
              <select v-model="localProps.buttonTarget" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="_self">Même onglet</option>
                <option value="_blank">Nouvel onglet</option>
              </select>
            </div>
          </div>
          <!-- Couleurs -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
              <div class="flex gap-1">
                <input type="color" v-model="localProps.buttonBgColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonBgColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Couleur du texte</label>
              <div class="flex gap-1">
                <input type="color" v-model="localProps.buttonTextColor" @input="emitUpdate" class="w-10 h-10 rounded cursor-pointer border-0"/>
                <input v-model="localProps.buttonTextColor" @input="emitUpdate" type="text" placeholder="Auto" class="flex-1 px-2 py-1 border rounded text-xs"/>
              </div>
            </div>
          </div>
          <!-- Bordure et Ombre -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Bordures arrondies</label>
              <select v-model="localProps.buttonBorderRadius" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option value="none">Aucune</option>
                <option value="sm">Petit</option>
                <option value="md">Moyen</option>
                <option value="lg">Grand</option>
                <option value="full">Rond</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Ombre</label>
              <select v-model="localProps.buttonShadow" @change="emitUpdate" class="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
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
import { getTemplate } from '~/composables/blockTemplates/index'
import TemplatePicker from './TemplatePicker.vue'
import PositioningSection from './PositioningSection.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])

const sections = reactive({
  content: true,
  items: false,
  layout: false,
  icon: false,
  cardStyles: true,
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
  // Titre
  showTitle: props.props.showTitle !== false,
  titleTag: props.props.titleTag || 'h2',
  titleFontFamily: props.props.titleFontFamily || '',
  titleSize: props.props.titleSize || 'large',
  titleWeight: props.props.titleWeight || 'bold',
  titleColor: props.props.titleColor || '',
  titleTransform: props.props.titleTransform || 'none',
  titleAlign: props.props.titleAlign || '',
  titleOpacity: props.props.titleOpacity !== undefined ? props.props.titleOpacity : 100,
  titleMarginBottom: props.props.titleMarginBottom || 16,
  // Sous-titre
  showSubtitle: props.props.showSubtitle !== false,
  subtitleSize: props.props.subtitleSize || 'medium',
  subtitleWeight: props.props.subtitleWeight || 'normal',
  subtitleColor: props.props.subtitleColor || '',
  subtitleAlign: props.props.subtitleAlign || '',
  subtitleOpacity: props.props.subtitleOpacity !== undefined ? props.props.subtitleOpacity : 70,
  // Styles des items
  itemTitleSize: props.props.itemTitleSize || 'medium',
  itemTitleWeight: props.props.itemTitleWeight || 'semibold',
  itemTitleColor: props.props.itemTitleColor || '',
  itemDescriptionSize: props.props.itemDescriptionSize || 'small',
  itemDescriptionColor: props.props.itemDescriptionColor || '',
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
  cardTextAlign: props.props.cardTextAlign || '',
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
  buttonLinkType: props.props.buttonLinkType || 'custom',
  buttonPaymentLinkId: props.props.buttonPaymentLinkId || null,
  buttonTarget: props.props.buttonTarget || '_self',
  buttonIcon: props.props.buttonIcon || 'none',
  buttonVariant: props.props.buttonVariant || 'filled',
  buttonSize: props.props.buttonSize || 'md',
  buttonBgColor: props.props.buttonBgColor || '#10b981',
  buttonTextColor: props.props.buttonTextColor || '#ffffff',
  buttonBorderRadius: props.props.buttonBorderRadius || 'md',
  buttonShadow: props.props.buttonShadow || 'none',
  buttonAlign: props.props.buttonAlign || 'center',
  cssId: props.props.cssId || '',
  customClasses: props.props.customClasses || '',
  // Positionnement
  order: props.props.order !== undefined ? props.props.order : 0,
  offsetX: props.props.offsetX || 0,
  offsetY: props.props.offsetY || 0,
  elementsOrder: props.props.elementsOrder || ['badge', 'title', 'subtitle', 'features', 'button'],
  badgeOffsetY: props.props.badgeOffsetY || 0,
  titleOffsetY: props.props.titleOffsetY || 0,
  subtitleOffsetY: props.props.subtitleOffsetY || 0,
  featuresOffsetY: props.props.featuresOffsetY || 0,
  buttonOffsetY: props.props.buttonOffsetY || 0,
})

// S'assurer que les éléments requis sont présents dans elementsOrder
const requiredElements = ['badge', 'title', 'subtitle', 'features', 'button']
if (!localProps.elementsOrder) {
  localProps.elementsOrder = [...requiredElements]
} else {
  // On s'assure que le badge est au début s'il manque
  if (!localProps.elementsOrder.includes('badge')) {
    localProps.elementsOrder.unshift('badge')
  }
  // On ajoute les autres manquants à la fin
  requiredElements.forEach(el => {
    if (el !== 'badge' && !localProps.elementsOrder.includes(el)) {
      localProps.elementsOrder.push(el)
    }
  })
}

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

// Mise à jour de l'image d'un onglet avec valeur explicite
function updateTabImage(index: number, value: string) {
  if (localProps.tabs && localProps.tabs[index]) {
    localProps.tabs[index].image = value
    emitUpdate()
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
  if (key === 'templateId') {
    localProps.templateId = value
    // Sync config from template
    const template = getTemplate('features', value)
    if (template && template.config) {
      Object.keys(template.config).forEach(ckey => {
        if (ckey in localProps) {
          (localProps as any)[ckey] = (template.config as any)[ckey]
        }
      })
    }
  } else {
    (localProps as any)[key] = value
  }
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
