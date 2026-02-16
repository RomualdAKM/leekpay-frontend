<template>
  <!-- LAYOUT: STEPS PROCESS -->
  <section 
    v-if="layoutType === 'steps'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-3xl mx-auto">
      <div class="flex flex-col w-full" :style="{ gap: '1rem', textAlign: props.headerAlignment || 'center', alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start') }">
        <!-- Titre -->
        <div 
          v-if="(props.showTitle !== false && (props.title || isEditMode)) || (props.showTitle === undefined && (props.title || isEditMode))"
          :style="titlePositionStyles"
        >
          <component
            :is="props.titleTag || 'h2'"
            :style="sectionTitleStyles"
            :class="editableClasses('title')"
            :contenteditable="isEditMode"
            data-placeholder="Titre de la section"
            @focus="onFocus('title')"
            @blur="onBlur($event, 'title')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >{{ props.title }}</component>
        </div>
        <!-- Sous-titre -->
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="subtitleStyles" class="mt-4">{{ props.subtitle }}</p>
        </div>
        <!-- Grille/Liste -->
        <div :style="featuresPositionStyles" class="mt-8 w-full">
          <div :style="{ gap: itemGapMap[props.itemGap || 'medium'] }" class="flex flex-col">
            <div v-for="(item, index) in props.items" :key="index" class="flex items-start gap-6">
              <div 
                class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold"
                :style="{ backgroundColor: props.accentColor || '#1f2937', color: props.iconColor || '#ffffff' }"
              >
                {{ index + 1 }}
              </div>
              <div class="pt-2">
                <h3 :style="itemTitleStyles" class="text-xl font-semibold mb-1">{{ item.title }}</h3>
                <p v-if="item.description && props.showDescription" :style="itemDescriptionStyles">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: SERVICES GRID -->
  <section 
    v-else-if="layoutType === 'services'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col w-full" :style="{ gap: '1rem', textAlign: props.headerAlignment || 'center', alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start') }">
        <!-- Titre -->
        <div v-if="(props.showTitle !== false) && (props.title || isEditMode)" :style="titlePositionStyles">
          <component :is="props.titleTag || 'h2'" :style="sectionTitleStyles">{{ props.title }}</component>
        </div>
        <!-- Sous-titre -->
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="subtitleStyles" class="mt-4">{{ props.subtitle }}</p>
        </div>
        <!-- Grille/Liste -->
        <div :style="featuresPositionStyles" class="mt-8 w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" :style="{ gap: itemGapMap[props.itemGap || 'medium'] }">
            <div 
              v-for="(item, index) in props.items" 
              :key="index" 
              :style="cardStyles"
              :class="['rounded-xl p-6 text-left', cardHoverClass]"
            >
              <div 
                v-if="props.showIcon"
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                :style="iconWrapperStyles"
              >
                <svg class="w-6 h-6" :style="{ color: iconTextColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getIconPath(item.icon || 'check')" />
                </svg>
              </div>
              <h3 :style="itemTitleStyles" class="text-lg font-semibold mb-2">{{ item.title }}</h3>
              <p v-if="item.description && props.showDescription" :style="itemDescriptionStyles" class="text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: FEATURE SHOWCASE (alterné avec images) -->
  <section 
    v-else-if="layoutType === 'showcase'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col w-full" :style="{ gap: '1rem', textAlign: props.headerAlignment || 'center', alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start') }">
        <!-- Titre -->
        <div v-if="(props.showTitle !== false) && (props.title || isEditMode)" :style="titlePositionStyles">
          <component :is="props.titleTag || 'h2'" :style="sectionTitleStyles">{{ props.title }}</component>
        </div>
        <!-- Sous-titre -->
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="subtitleStyles" class="mt-4">{{ props.subtitle }}</p>
        </div>
        <!-- Grille/Liste -->
        <div :style="featuresPositionStyles" class="mt-8 w-full">
          <div :style="{ gap: itemGapMap[props.itemGap || 'xlarge'] || '3rem' }" class="flex flex-col">
            <div 
              v-for="(item, index) in displayShowcaseItems" 
              :key="index" 
              :class="['grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center']"
            >
              <div :class="index % 2 === 1 ? 'md:order-2' : ''">
                <h3 :style="itemTitleStyles" class="text-2xl md:text-3xl font-bold mb-4">{{ item.title }}</h3>
                <p v-if="item.description && props.showDescription" :style="itemDescriptionStyles" class="leading-relaxed mb-6">{{ item.description }}</p>
                <a v-if="item.link" :href="item.link" :style="{ color: props.titleColor || textColor }" class="inline-flex items-center gap-2 font-medium hover:underline">
                  {{ item.linkText || 'En savoir plus' }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              <div :class="index % 2 === 1 ? 'md:order-1' : ''">
                <img 
                  :src="item.image || DEFAULT_SHOWCASE_IMAGES[index % DEFAULT_SHOWCASE_IMAGES.length]" 
                  :alt="item.title"
                  :style="{ borderRadius: cardBorderRadiusValue }"
                  class="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: CHECKLIST GRID -->
  <section 
    v-else-if="layoutType === 'checklist'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col w-full" :style="{ gap: '1rem', textAlign: props.headerAlignment || 'center', alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start') }">
        <!-- Badge -->
        <div v-if="props.showBadge" class="flex" :style="badgePositionStyles">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge || 'Caractéristiques' }}
          </span>
        </div>
        <!-- Titre -->
        <div v-if="(props.showTitle !== false) && (props.title || isEditMode)" :style="titlePositionStyles">
          <component :is="props.titleTag || 'h2'" :style="sectionTitleStyles">{{ props.title }}</component>
        </div>
        <!-- Sous-titre -->
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="subtitleStyles" class="mt-4">{{ props.subtitle }}</p>
        </div>
        <!-- Grille/Liste -->
        <div :style="featuresPositionStyles" class="mt-8 w-full">
          <div class="grid grid-cols-1 md:grid-cols-2" :style="{ gap: itemGapMap[props.itemGap || 'medium'] }">
            <div 
              v-for="(item, index) in props.items" 
              :key="index" 
              :style="cardStyles"
              :class="['flex items-center gap-4 p-4 rounded-lg', cardHoverClass]"
            >
              <svg :style="{ color: props.accentColor || '#10B981' }" class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span :style="itemTitleStyles" class="text-base font-medium">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: TABS SHOWCASE -->
  <section 
    v-else-if="layoutType === 'tabs'"
    :id="props.cssId || undefined"
    :class="props.customClasses"
    :style="sectionStyles"
  >
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col w-full" :style="{ gap: '1rem', textAlign: props.headerAlignment || 'center', alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start') }">
        <!-- Badge -->
        <div v-if="props.showBadge" class="flex" :style="badgePositionStyles">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge || 'Caractéristiques' }}
          </span>
        </div>
        <!-- Titre -->
        <div v-if="(props.showTitle !== false) && (props.title || isEditMode)" :style="titlePositionStyles">
          <component :is="props.titleTag || 'h2'" :style="sectionTitleStyles">{{ props.title }}</component>
        </div>
        <!-- Sous-titre -->
        <div v-if="props.subtitle || isEditMode" :style="subtitlePositionStyles">
          <p v-if="props.subtitle" :style="subtitleStyles" class="mt-4">{{ props.subtitle }}</p>
        </div>
        <!-- Grille/Liste -->
        <div :style="featuresPositionStyles" class="mt-4 w-full">
          <!-- Onglets -->
          <div class="flex flex-wrap justify-center gap-2 mb-10">
            <button 
              v-for="(tab, index) in displayTabs" 
              :key="index"
              @click="activeTab = index"
              :style="activeTab === index 
                ? { backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' } 
                : { backgroundColor: 'rgba(0,0,0,0.05)', color: textColor }"
              class="px-6 py-2.5 rounded-full text-sm font-medium transition-colors hover:opacity-80"
            >
              {{ tab.label }}
            </button>
          </div>
          
          <!-- Contenu de l'onglet actif -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 :style="{ color: props.titleColor || textColor }" class="text-2xl font-bold mb-4">{{ displayTabs[activeTab]?.title }}</h3>
              <p :style="{ color: textColor }" class="mb-6 opacity-80">{{ displayTabs[activeTab]?.description }}</p>
              <ul class="space-y-3">
                <li v-for="(feature, idx) in displayTabs[activeTab]?.features" :key="idx" class="flex items-center gap-3">
                  <svg :style="{ color: props.accentColor || '#10B981' }" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :style="{ color: textColor }">{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                :src="displayTabs[activeTab]?.image || DEFAULT_TAB_IMAGE" 
                :alt="displayTabs[activeTab]?.title"
                :style="{ borderRadius: cardBorderRadiusValue }"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT: DÉFAUT -->
  <section 
    v-else
    :id="props.cssId || undefined"
    :class="[template.styles.section, props.customClasses, animationClass]"
    :style="sectionStyles"
  >
    <div :class="template.styles.container">
      <!-- Conteneur flex pour le positionnement -->
      <div class="flex flex-col w-full" :style="{ 
        gap: '1.5rem',
        alignItems: props.headerAlignment === 'center' ? 'center' : (props.headerAlignment === 'right' ? 'flex-end' : 'flex-start'),
        textAlign: props.headerAlignment || 'center'
      }">
        <!-- Badge -->
        <div v-if="props.showBadge" class="flex" :style="badgePositionStyles">
          <span 
            class="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
            :style="{ backgroundColor: props.accentColor || '#1f2937', color: '#ffffff' }"
          >
            {{ props.badge || 'Caractéristiques' }}
          </span>
        </div>

        <!-- Titre -->
        <component 
          :is="props.titleTag || 'h2'"
          v-if="(props.showTitle !== false) && (props.title || isEditMode)"
          :class="[template.styles.title, editableClasses('title')]"
          :style="{ ...sectionTitleStyles, ...titlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Titre de la section'"
          @focus="onFocus('title')"
          @blur="onBlur($event, 'title')"
          @keydown="onKeydown($event, true)"
          @paste="onPaste"
        >{{ props.title }}</component>

        <!-- Sous-titre -->
        <p 
          v-if="props.subtitle || isEditMode"
          :class="[template.styles.subtitle, editableClasses('subtitle')]"
          :style="{ ...subtitleStyles, ...subtitlePositionStyles }"
          :contenteditable="isEditMode"
          :data-placeholder="'Sous-titre (optionnel)'"
          @focus="onFocus('subtitle')"
          @blur="onBlur($event, 'subtitle')"
          @keydown="onKeydown($event, false)"
          @paste="onPaste"
        >{{ props.subtitle }}</p>

        <!-- Bouton CTA global -->
        <div v-if="props.showButton || isEditMode" :style="buttonPositionStyles">
          <a
            :href="isEditMode ? undefined : props.buttonUrl"
            class="inline-flex items-center justify-center font-semibold transition-all hover:opacity-90 active:scale-95"
            :class="[editableClasses('buttonText')]"
            :style="ctaButtonStyles"
            :contenteditable="isEditMode"
            :data-placeholder="'Texte du bouton'"
            @focus="onFocus('buttonText')"
            @blur="onBlur($event, 'buttonText')"
            @keydown="onKeydown($event, true)"
            @paste="onPaste"
          >
            {{ props.buttonText || 'Démarrer maintenant' }}
          </a>
        </div>
      
        <!-- Grille de features -->
        <div :class="gridClasses" :style="featuresPositionStyles" class="w-full">
          <div 
            v-for="(item, index) in props.items"
            :key="index"
            :class="[template.styles.card, cardHoverClass]"
            :style="cardStyles"
          >
            <!-- Icône -->
            <div 
              v-if="props.showIcon"
              :class="template.styles.iconWrapper"
              :style="iconWrapperStyles"
            >
              <!-- Numérotation -->
              <span v-if="props.iconStyle === 'number'" :style="{ color: iconTextColor }">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <!-- Icône SVG -->
              <svg 
                v-else
                :class="template.styles.icon"
                :style="{ color: iconTextColor }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  :stroke-width="props.iconStyle === 'outlined' ? 1.5 : 2" 
                  :d="getIconPath(item.icon || 'check')" 
                />
              </svg>
            </div>
            
            <!-- Contenu -->
            <div :class="props.layout === 'list' || props.layout === 'alternating' ? 'flex-1' : ''">
              <!-- Titre -->
              <h3 
                :class="[template.styles.cardTitle, editableClasses(`items[${index}].title`)]"
                :style="cardTitleStyles"
                :contenteditable="isEditMode"
                :data-placeholder="'Titre'"
                @focus="onArrayFocus('items', index, 'title')"
                @blur="onArrayBlur($event, 'items', index, 'title')"
                @keydown="onKeydown($event, true)"
                @paste="onPaste"
              >{{ item.title }}</h3>
              
              <!-- Description -->
              <p 
                v-if="props.showDescription && (item.description || isEditMode)"
                :class="[template.styles.cardText, editableClasses(`items[${index}].description`)]"
                :style="itemDescriptionStyles"
                :contenteditable="isEditMode"
                :data-placeholder="'Description'"
                @focus="onArrayFocus('items', index, 'description')"
                @blur="onArrayBlur($event, 'items', index, 'description')"
                @keydown="onKeydown($event, false)"
                @paste="onPaste"
              >{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Images par défaut pour le showcase
export const DEFAULT_SHOWCASE_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
]
export const DEFAULT_TAB_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80'

export const DEFAULT_TABS = [
  {
    label: 'Performance',
    title: 'Vitesse incomparable',
    description: 'Notre infrastructure est optimisée pour offrir les meilleures performances du marché.',
    features: ['CDN global', 'Cache intelligent', 'Compression automatique'],
    image: DEFAULT_SHOWCASE_IMAGES[0],
  },
  {
    label: 'Sécurité',
    title: 'Protection maximale',
    description: 'Vos données sont protégées par les meilleurs standards de sécurité.',
    features: ['Chiffrement SSL', 'Sauvegarde quotidienne', 'Conformité RGPD'],
    image: DEFAULT_SHOWCASE_IMAGES[1],
  },
  {
    label: 'Intégrations',
    title: 'Connecté à vos outils',
    description: 'Intégrez facilement vos applications préférées.',
    features: ['API REST', 'Webhooks', '50+ intégrations'],
    image: DEFAULT_SHOWCASE_IMAGES[0],
  },
]
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTemplate } from '~/composables/blockTemplates/index'
import { useInlineEdit } from '~/composables/useInlineEdit'

// Types
type IconStyle = 'filled' | 'outlined' | 'none' | 'number'
type Layout = 'grid' | 'list' | 'alternating' | 'masonry' | 'carousel' | 'timeline'

interface FeatureItem {
  icon?: string
  title: string
  description?: string
}

interface ShowcaseItem extends FeatureItem {
  image?: string
  link?: string
  linkText?: string
}

interface TabItem {
  label: string
  title: string
  description: string
  features: string[]
  image?: string
}

interface Props {
  blockId?: string  // ID du bloc pour l'édition inline
  templateId?: string
  // Contenu
  title?: string
  subtitle?: string
  items?: FeatureItem[]
  // Titre optionnel
  showTitle?: boolean
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  titleFontFamily?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  titleColor?: string
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  titleAlign?: 'left' | 'center' | 'right' | 'justify'
  titleOpacity?: number
  titleMarginBottom?: number
  // Sous-titre optionnel
  showSubtitle?: boolean
  subtitleSize?: 'small' | 'medium' | 'large'
  subtitleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  subtitleColor?: string
  subtitleAlign?: 'left' | 'center' | 'right' | 'justify'
  subtitleOpacity?: number
  // Styles des items (titres des cartes)
  itemTitleSize?: 'small' | 'medium' | 'large'
  itemTitleWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  itemTitleColor?: string
  itemDescriptionSize?: 'small' | 'medium' | 'large'
  itemDescriptionColor?: string
  headerAlignment?: 'left' | 'center' | 'right'
  // Layout
  layout?: Layout
  columns?: 2 | 3 | 4 | 6
  itemGap?: 'small' | 'medium' | 'large' | 'xlarge'
  // Icône
  showIcon?: boolean
  iconStyle?: IconStyle
  iconColor?: string
  iconBgColor?: string
  iconSize?: 'small' | 'medium' | 'large'
  iconRadius?: 'none' | 'small' | 'medium' | 'full'
  // Texte
  showDescription?: boolean
  sectionTitleFont?: string
  sectionTitleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  sectionTitleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  // Apparence
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  backgroundColor?: string
  gradientStart?: string
  gradientEnd?: string
  accentColor?: string
  paddingY?: 'small' | 'medium' | 'large' | 'xlarge'
  // Carte
  cardBgColor?: string
  cardBorderColor?: string
  cardBorderWidth?: 'none' | 'thin' | 'medium' | 'thick'
  cardBorderRadius?: 'none' | 'small' | 'medium' | 'large'
  cardPadding?: 'none' | 'small' | 'medium' | 'large'
  cardShadow?: 'none' | 'small' | 'medium' | 'large'
  cardHoverEffect?: 'none' | 'lift' | 'scale' | 'glow' | 'border'
  cardTextAlign?: 'left' | 'center' | 'right'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'scale' | 'stagger'
  animationDuration?: number
  animationDelay?: number
  // Avancé
  cssId?: string
  customClasses?: string
  // Nouveaux layouts
  showBadge?: boolean
  badge?: string
  tabs?: TabItem[]
  // Bouton CTA
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  buttonTarget?: '_self' | '_blank'
  buttonIcon?: 'none' | 'arrow-right' | 'external'
  buttonVariant?: 'filled' | 'outlined' | 'ghost'
  buttonSize?: 'sm' | 'md' | 'lg'
  buttonBgColor?: string
  buttonTextColor?: string
  buttonBorderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  buttonShadow?: 'none' | 'sm' | 'md' | 'lg'
  buttonAlign?: 'left' | 'center' | 'right'
  // Positionnement
  order?: number
  offsetX?: number
  offsetY?: number
  elementsOrder?: string[]
  badgeOffsetY?: number
  titleOffsetY?: number
  subtitleOffsetY?: number
  featuresOffsetY?: number
  buttonOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'features-minimal-grid',
  title: 'Ce que vous allez obtenir',
  subtitle: '',
  items: () => [
    { icon: 'check', title: 'Fonctionnalité 1', description: 'Description de la fonctionnalité' },
    { icon: 'check', title: 'Fonctionnalité 2', description: 'Description de la fonctionnalité' },
    { icon: 'check', title: 'Fonctionnalité 3', description: 'Description de la fonctionnalité' },
  ],
  // Titre
  showTitle: true,
  titleTag: 'h2',
  titleFontFamily: '',
  titleSize: 'large',
  titleWeight: 'bold',
  titleColor: '',
  titleTransform: 'none',
  titleAlign: 'center',
  titleOpacity: 100,
  titleMarginBottom: 16,
  // Sous-titre
  showSubtitle: true,
  subtitleSize: 'medium',
  subtitleWeight: 'normal',
  subtitleColor: '',
  subtitleAlign: 'center',
  subtitleOpacity: 70,
  // Styles des items
  itemTitleSize: 'medium',
  itemTitleWeight: 'semibold',
  itemTitleColor: '',
  itemDescriptionSize: 'small',
  itemDescriptionColor: '',
  headerAlignment: 'center',
  layout: 'grid',
  columns: 3,
  itemGap: 'medium',
  showIcon: true,
  iconStyle: 'filled',
  iconColor: '#ffffff',
  iconBgColor: '',
  iconSize: 'medium',
  iconRadius: 'full',
  showDescription: true,
  sectionTitleFont: '',
  sectionTitleSize: 'medium',
  sectionTitleWeight: 'medium',
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  gradientStart: '#f8fafc',
  gradientEnd: '#ffffff',
  accentColor: '#10B981',
  paddingY: 'large',
  cardBgColor: '',
  cardBorderColor: '',
  cardBorderWidth: 'none',
  cardBorderRadius: 'none',
  cardPadding: 'medium',
  cardShadow: 'none',
  cardHoverEffect: 'none',
  cardTextAlign: 'center',
  animation: 'none',
  animationDuration: 500,
  animationDelay: 0,
  cssId: '',
  customClasses: '',
  badge: 'Caractéristiques',
  tabs: () => DEFAULT_TABS,
  // Bouton CTA
  showButton: false,
  buttonText: 'Démarrer maintenant',
  buttonUrl: '',
  buttonTarget: '_self',
  buttonIcon: 'none',
  buttonVariant: 'filled',
  buttonSize: 'md',
  buttonBgColor: '#10b981',
  buttonTextColor: '#ffffff',
  buttonBorderRadius: 'md',
  buttonShadow: 'none',
  buttonAlign: 'center',
  // Positionnement
  order: 0,
  offsetX: 0,
  offsetY: 0,
  elementsOrder: () => ['badge', 'title', 'subtitle', 'features', 'button'],
  badgeOffsetY: 0,
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  featuresOffsetY: 0,
  buttonOffsetY: 0,
})

// Onglet actif pour le layout tabs
const activeTab = ref(0)

// Détecte le type de layout à partir du templateId
const layoutType = computed(() => {
  const id = props.templateId || ''
  if (id.includes('steps-process')) return 'steps'
  if (id.includes('services-grid')) return 'services'
  if (id.includes('showcase-alternating')) return 'showcase'
  if (id.includes('checklist-grid')) return 'checklist'
  if (id.includes('tabs-showcase')) return 'tabs'
  return 'default'
})

// Items pour le showcase avec images par défaut
const displayShowcaseItems = computed(() => {
  return (props.items || []).map((item, index) => ({
    ...item,
    image: (item as ShowcaseItem).image || DEFAULT_SHOWCASE_IMAGES[index % DEFAULT_SHOWCASE_IMAGES.length],
    link: (item as ShowcaseItem).link || '#',
    linkText: (item as ShowcaseItem).linkText || 'En savoir plus',
  }))
})

// Onglets avec données par défaut
const displayTabs = computed(() => {
  return props.tabs && props.tabs.length > 0 ? props.tabs : DEFAULT_TABS
})

// Rayon de bordure pour les images
const cardBorderRadiusMap: Record<string, string> = {
  none: '0',
  small: '0.375rem',
  medium: '0.75rem',
  large: '1.5rem',
}
const cardBorderRadiusValue = computed(() => cardBorderRadiusMap[props.cardBorderRadius || 'medium'] || '0.75rem')

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, emitArrayPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

// Champ en cours d'édition
const isFieldActive = (field: string) => activeEditField.value === field

// Classes pour les éléments éditables
const editableClasses = (field: string) => {
  if (!isEditMode.value) return ''
  return [
    'outline-none',
    'cursor-text',
    'transition-all',
    'duration-150',
    'min-w-[20px]',
    isFieldActive(field) 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

// Handlers d'édition - champs simples
const onFocus = (field: string) => {
  if (props.blockId) {
    startEditing(props.blockId, field)
  }
}

const onBlur = (e: FocusEvent, field: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

// Handlers d'édition - champs dans array
const onArrayFocus = (arrayKey: string, index: number, propKey: string) => {
  if (props.blockId) {
    startEditing(props.blockId, `${arrayKey}[${index}].${propKey}`)
  }
}

const onArrayBlur = (e: FocusEvent, arrayKey: string, index: number, propKey: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
  if (props.blockId) {
    emitArrayPropUpdate(props.blockId, arrayKey, index, propKey, newValue)
    stopEditing()
  }
}

const onKeydown = (e: KeyboardEvent, singleLine: boolean) => {
  if (singleLine && e.key === 'Enter') {
    e.preventDefault()
    ;(e.target as HTMLElement).blur()
  }
  if (e.key === 'Escape') {
    ;(e.target as HTMLElement).blur()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

// Template actif
const template = computed(() => {
  return getTemplate('features', props.templateId) || {
    id: 'features-minimal-grid',
    name: 'Default',
    category: 'minimal' as const,
    styles: {
      section: 'py-16 md:py-24 px-6',
      container: 'max-w-5xl mx-auto',
      header: 'text-center mb-8',
      title: 'text-2xl md:text-3xl font-light tracking-tight',
      subtitle: 'text-base opacity-60 mt-2 max-w-2xl mx-auto',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12',
      card: 'text-center',
      iconWrapper: 'w-12 h-12 mx-auto mb-4 flex items-center justify-center',
      icon: 'w-6 h-6',
      cardTitle: 'text-lg font-medium mb-2',
      cardText: 'text-sm opacity-60 leading-relaxed',
    }
  }
})

// Couleur du texte auto
const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Couleur icône auto
const iconBgColorFinal = computed(() => props.iconBgColor || props.accentColor || '#10B981')
const iconTextColor = computed(() => {
  if (props.iconColor) return props.iconColor
  if (props.iconStyle === 'outlined') return iconBgColorFinal.value
  return '#ffffff'
})

// Styles section
const paddingYMap: Record<string, string> = {
  small: '2rem',
  medium: '4rem',
  large: '6rem',
  xlarge: '8rem',
}

const sectionStyles = computed(() => {
  const py = paddingYMap[props.paddingY || 'large'] || '6rem'
  const styles: Record<string, string> = {
    paddingTop: py,
    paddingBottom: py,
  }
  
  if (props.backgroundType === 'gradient') {
    styles.background = `linear-gradient(to bottom, ${props.gradientStart}, ${props.gradientEnd})`
  } else if (props.backgroundType !== 'transparent') {
    styles.backgroundColor = props.backgroundColor || '#ffffff'
  }
  
  return styles
})

// Styles header
const headerStyles = computed(() => ({
  textAlign: props.headerAlignment || 'center',
}))

// Styles titre section
const sectionTitleSizeMap: Record<string, string> = {
  small: '1.5rem',
  medium: '2rem',
  large: '2.5rem',
  xlarge: '3rem',
}

const sectionTitleWeightMap: Record<string, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

const sectionTitleStyles = computed(() => ({
  color: props.titleColor || textColor.value,
  fontFamily: props.titleFontFamily || props.sectionTitleFont || undefined,
  fontSize: fontSizeMap[props.titleSize || 'large'],
  fontWeight: fontWeightMap[props.titleWeight || 'bold'],
  textTransform: props.titleTransform || 'none',
  textAlign: props.titleAlign || 'center',
  opacity: `${props.titleOpacity !== undefined ? props.titleOpacity : 100}%`,
  marginBottom: `${props.titleMarginBottom || 16}px`,
  width: '100%',
}))

// === STYLES DE TITRE HARMONISÉS ===
const fontSizeMap: Record<string, string> = {
  small: '1.5rem',
  medium: '2rem',
  large: '2.5rem',
  xlarge: '3rem',
}

const fontWeightMap: Record<string, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const subtitleStyles = computed(() => ({
  color: props.subtitleColor || textColor.value,
  fontSize: itemSizeMap[props.subtitleSize || 'medium'],
  fontWeight: fontWeightMap[props.subtitleWeight || 'normal'],
  textAlign: props.subtitleAlign || 'center',
  opacity: `${props.subtitleOpacity !== undefined ? props.subtitleOpacity : 70}%`,
  width: '100%',
}))

// Styles des items (titres et descriptions des cartes)
const itemSizeMap: Record<string, string> = {
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem',
}

const itemTitleStyles = computed(() => ({
  color: props.itemTitleColor || textColor.value,
  fontSize: itemSizeMap[props.itemTitleSize || 'medium'],
  fontWeight: fontWeightMap[props.itemTitleWeight || 'semibold'],
}))

const itemDescriptionStyles = computed(() => ({
  color: props.itemDescriptionColor || textColor.value,
  fontSize: itemSizeMap[props.itemDescriptionSize || 'small'],
  opacity: 0.8,
}))

// Classes colonnes dynamiques - OVERRIDE le template avec !important classes
const itemGapMap: Record<string, string> = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
  xlarge: '3rem',
}

const gridClasses = computed(() => {
  const baseClasses = ['gap-6', 'md:gap-8']
  
  switch (props.layout) {
    case 'list':
      return [...baseClasses, 'flex', 'flex-col', 'space-y-6']
    case 'alternating':
      return [...baseClasses, 'flex', 'flex-col', 'space-y-12', 'md:space-y-16']
    case 'masonry':
      return [...baseClasses, 'columns-1', 'md:columns-2', 'lg:columns-3', 'space-y-6']
    case 'carousel':
      return [...baseClasses, 'flex', 'overflow-x-auto', 'snap-x', 'snap-mandatory', 'scrollbar-hide', '-mx-6', 'px-6', 'pb-4']
    case 'timeline':
      return [...baseClasses, 'relative', 'space-y-8']
    case 'grid':
    default:
      // Grille avec colonnes dynamiques
      const colsMap: Record<number, string[]> = {
        2: ['grid', 'grid-cols-1', 'md:grid-cols-2'],
        3: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'],
        4: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4'],
        6: ['grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-6'],
      }
      const cols = colsMap[props.columns || 3] || colsMap[3] || []
      return [...baseClasses, ...cols]
  }
})

// Styles additionnels pour certains layouts
const gridStyles = computed(() => {
  const styles: Record<string, string> = {
    gap: itemGapMap[props.itemGap || 'medium'] || '1.5rem',
  }
  
  if (props.layout === 'timeline') {
    styles.paddingLeft = '3rem'
  }
  return styles
})

// Styles icône wrapper
const iconRadiusMap: Record<string, string> = {
  none: '0',
  small: '0.375rem',
  medium: '0.75rem',
  full: '50%',
}

const iconWrapperStyles = computed(() => {
  const sizeMap: Record<string, string> = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
  }
  const size = sizeMap[props.iconSize || 'medium'] || '3rem'
  const radius = iconRadiusMap[props.iconRadius || 'full'] || '50%'
  
  const styles: Record<string, string> = {
    width: size,
    height: size,
    borderRadius: radius,
  }
  
  if (props.iconStyle === 'filled') {
    styles.backgroundColor = iconBgColorFinal.value
  } else if (props.iconStyle === 'outlined') {
    styles.border = `2px solid ${iconBgColorFinal.value}`
  }
  
  return styles
})

// Styles carte
const cardShadowMap: Record<string, string> = {
  none: 'none',
  small: '0 1px 3px rgba(0,0,0,0.1)',
  medium: '0 4px 6px rgba(0,0,0,0.1)',
  large: '0 10px 25px rgba(0,0,0,0.15)',
}

const cardStyles = computed(() => {
  const styles: Record<string, string> = {
    textAlign: props.cardTextAlign || 'center',
  }
  
  if (props.cardBgColor) {
    styles.backgroundColor = props.cardBgColor
  }
  
  if (props.cardBorderWidth !== 'none') {
    const borderWidthMap: Record<string, string> = {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    }
    styles.borderWidth = borderWidthMap[props.cardBorderWidth] || '1px'
    styles.borderStyle = 'solid'
    styles.borderColor = props.cardBorderColor || textColor.value
  }
  
  if (props.cardBorderRadius !== 'none') {
    const radiusMap: Record<string, string> = {
      small: '0.375rem',
      medium: '0.75rem',
      large: '1.5rem',
    }
    styles.borderRadius = radiusMap[props.cardBorderRadius] || '0.75rem'
  }
  
  if (props.cardPadding !== 'none') {
    const paddingMap: Record<string, string> = {
      small: '1rem',
      medium: '1.5rem',
      large: '2rem',
    }
    const padding = paddingMap[props.cardPadding]
    if (padding) styles.padding = padding
  }
  
  if (props.cardShadow && props.cardShadow !== 'none') {
    const shadow = cardShadowMap[props.cardShadow]
    if (shadow) styles.boxShadow = shadow
  }
  
  return styles
})

// Classe hover carte
const cardHoverClass = computed(() => {
  const effectMap: Record<string, string> = {
    none: '',
    lift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
    scale: 'transition-transform duration-300 hover:scale-105',
    glow: 'transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/20',
    border: 'transition-colors duration-300 hover:border-emerald-500',
  }
  return effectMap[props.cardHoverEffect || 'none'] || ''
})

// Animation
const animationClass = computed(() => {
  if (props.animation === 'none') return ''
  return `animate-${props.animation}`
})

// Styles titre carte
const cardTitleStyles = computed(() => ({
  color: props.itemTitleColor || textColor.value,
  fontSize: itemSizeMap[props.itemTitleSize || 'medium'],
  fontWeight: fontWeightMap[props.itemTitleWeight || 'semibold'],
}))

// ============ STYLES DU BOUTON CTA ============

const buttonSizeMap: Record<string, string> = {
  sm: '0.5rem 1rem',
  md: '0.75rem 1.5rem',
  lg: '1rem 2rem',
}

const buttonRadiusMap: Record<string, string> = {
  none: '0',
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1rem',
  full: '9999px',
}

const buttonShadowMap: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
}

const ctaButtonStyles = computed(() => ({
  backgroundColor: props.buttonBgColor || props.accentColor || '#10B981',
  color: props.buttonTextColor || '#ffffff',
  padding: buttonSizeMap[props.buttonSize || 'md'],
  borderRadius: buttonRadiusMap[props.buttonBorderRadius || 'md'],
  boxShadow: buttonShadowMap[props.buttonShadow || 'none'],
  fontWeight: 600,
  fontSize: props.buttonSize === 'sm' ? '0.875rem' : props.buttonSize === 'lg' ? '1.125rem' : '1rem',
  opacity: props.showButton ? 1 : 0.5,
  transition: 'all 0.2s ease',
}))

// ============ POSITIONNEMENT DES ÉLÉMENTS ============

const getElementOrder = (element: string): number => {
  const defaultOrder = ['badge', 'title', 'subtitle', 'features']
  const order = props.elementsOrder || defaultOrder
  const idx = order.indexOf(element)
  return idx === -1 ? defaultOrder.indexOf(element) : idx
}

const badgePositionStyles = computed(() => ({
  order: getElementOrder('badge'),
  transform: props.badgeOffsetY ? `translateY(${props.badgeOffsetY}px)` : undefined,
  marginBottom: '0.5rem'
}))

const titlePositionStyles = computed(() => ({
  order: getElementOrder('title'),
  transform: props.titleOffsetY ? `translateY(${props.titleOffsetY}px)` : undefined
}))

const subtitlePositionStyles = computed(() => ({
  order: getElementOrder('subtitle'),
  transform: props.subtitleOffsetY ? `translateY(${props.subtitleOffsetY}px)` : undefined,
  marginTop: getElementOrder('subtitle') === getElementOrder('title') + 1 ? '-1rem' : '0'
}))

const featuresPositionStyles = computed(() => ({
  ...gridStyles.value,
  order: getElementOrder('features'),
  transform: props.featuresOffsetY ? `translateY(${props.featuresOffsetY}px)` : undefined,
  marginTop: getElementOrder('features') > 0 ? '2rem' : '0'
}))

const buttonPositionStyles = computed(() => ({
  order: getElementOrder('button'),
  transform: props.buttonOffsetY ? `translateY(${props.buttonOffsetY}px)` : undefined,
  marginTop: '1rem'
}))

// Icônes SVG paths
function getIconPath(icon: string): string {
  const icons: Record<string, string> = {
    check: 'M5 13l4 4L19 7',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    lightning: 'M13 10V3L4 14h7v7l9-11h-7z',
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    gift: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    globe: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    sparkle: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    award: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    rocket: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
    users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  }
  return icons[icon] || 'M5 13l4 4L19 7'
}
</script>
