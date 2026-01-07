<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="text"
      :model-value="props.props.templateId"
      @select="emit('update', { templateId: $event })"
    />
    
    <!-- Contenu -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Contenu</h4>
      <textarea
        :value="props.props.content"
        @input="emit('update', { content: ($event.target as HTMLTextAreaElement).value })"
        rows="6"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="Écrivez votre texte ici... (HTML supporté)"
      />
    </div>
    
    <!-- Typographie -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Typographie</h4>
      
      <!-- Police -->
      <div class="mb-3">
        <label class="block text-xs text-gray-500 mb-1">Police</label>
        <select
          :value="props.props.fontFamily || ''"
          @change="emit('update', { fontFamily: ($event.target as HTMLSelectElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Par défaut</option>
          <option value="'Inter', sans-serif">Inter</option>
          <option value="'Playfair Display', serif">Playfair Display</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
          <option value="'Lora', serif">Lora</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Taille -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Taille</label>
          <select
            :value="props.props.fontSize || 'medium'"
            @change="emit('update', { fontSize: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        
        <!-- Poids -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Poids</label>
          <select
            :value="props.props.fontWeight || 'normal'"
            @change="emit('update', { fontWeight: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="light">Léger</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semi-gras</option>
            <option value="bold">Gras</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Interligne -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Interligne</label>
          <select
            :value="props.props.lineHeight || 'relaxed'"
            @change="emit('update', { lineHeight: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="tight">Serré</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Aéré</option>
            <option value="loose">Très aéré</option>
          </select>
        </div>
        
        <!-- Espacement lettres -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Espacement lettres</label>
          <select
            :value="props.props.letterSpacing || 'normal'"
            @change="emit('update', { letterSpacing: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="tight">Serré</option>
            <option value="normal">Normal</option>
            <option value="wide">Écarté</option>
            <option value="wider">Très écarté</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <!-- Alignement -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Alignement</label>
          <select
            :value="props.props.textAlign || 'left'"
            @change="emit('update', { textAlign: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
            <option value="justify">Justifié</option>
          </select>
        </div>
        
        <!-- Transformation -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Transformation</label>
          <select
            :value="props.props.textTransform || 'none'"
            @change="emit('update', { textTransform: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucune</option>
            <option value="uppercase">MAJUSCULES</option>
            <option value="lowercase">minuscules</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Couleurs -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Couleurs</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Couleur de fond -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Fond</label>
          <div class="flex items-center gap-2">
            <input
              :value="props.props.backgroundColor || '#ffffff'"
              @input="emit('update', { backgroundColor: ($event.target as HTMLInputElement).value })"
              type="color"
              class="w-10 h-10 rounded cursor-pointer border-0"
            />
            <input
              :value="props.props.backgroundColor || '#ffffff'"
              @input="emit('update', { backgroundColor: ($event.target as HTMLInputElement).value })"
              type="text"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
        
        <!-- Couleur du texte -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Texte (auto si vide)</label>
          <div class="flex items-center gap-2">
            <input
              :value="props.props.textColor || ''"
              @input="emit('update', { textColor: ($event.target as HTMLInputElement).value })"
              type="color"
              class="w-10 h-10 rounded cursor-pointer border-0"
            />
            <input
              :value="props.props.textColor || ''"
              @input="emit('update', { textColor: ($event.target as HTMLInputElement).value })"
              type="text"
              placeholder="Auto"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
            />
          </div>
        </div>
      </div>
      
      <!-- Couleur accent -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Couleur accent (bordures)</label>
        <div class="flex items-center gap-2">
          <input
            :value="props.props.accentColor || '#3b82f6'"
            @input="emit('update', { accentColor: ($event.target as HTMLInputElement).value })"
            type="color"
            class="w-10 h-10 rounded cursor-pointer border-0"
          />
          <input
            :value="props.props.accentColor || '#3b82f6'"
            @input="emit('update', { accentColor: ($event.target as HTMLInputElement).value })"
            type="text"
            class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
          />
        </div>
      </div>
    </div>
    
    <!-- Espacement -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Espacement</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Padding vertical -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Vertical</label>
          <select
            :value="props.props.paddingY || 'large'"
            @change="emit('update', { paddingY: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucun</option>
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="xlarge">Très grand</option>
          </select>
        </div>
        
        <!-- Largeur max -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Largeur max</label>
          <select
            :value="props.props.maxWidth || 'medium'"
            @change="emit('update', { maxWidth: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="large">Grand</option>
            <option value="full">Pleine largeur</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Bordure -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Bordure</h4>
      
      <div class="grid grid-cols-2 gap-3 mb-3">
        <!-- Style bordure -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Style</label>
          <select
            :value="props.props.borderStyle || 'none'"
            @change="emit('update', { borderStyle: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="none">Aucune</option>
            <option value="left">Gauche</option>
            <option value="top">Haut</option>
            <option value="bottom">Bas</option>
            <option value="all">Complète</option>
            <option value="card">Carte</option>
          </select>
        </div>
        
        <!-- Épaisseur -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">Épaisseur</label>
          <select
            :value="props.props.borderWidth || 'medium'"
            @change="emit('update', { borderWidth: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="thin">Fine</option>
            <option value="medium">Moyenne</option>
            <option value="thick">Épaisse</option>
          </select>
        </div>
      </div>
      
      <!-- Arrondi -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Arrondi</label>
        <select
          :value="props.props.borderRadius || 'none'"
          @change="emit('update', { borderRadius: ($event.target as HTMLSelectElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="none">Aucun</option>
          <option value="small">Petit</option>
          <option value="medium">Moyen</option>
          <option value="large">Grand</option>
        </select>
      </div>
    </div>
    
    <!-- Animation -->
    <div class="border-t border-gray-200 pt-4">
      <h4 class="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Animation</h4>
      <select
        :value="props.props.animation || 'none'"
        @change="emit('update', { animation: ($event.target as HTMLSelectElement).value })"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
      >
        <option value="none">Aucune</option>
        <option value="fade">Fondu</option>
        <option value="slide-up">Glisser haut</option>
        <option value="slide-left">Glisser gauche</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import TemplatePicker from './TemplatePicker.vue'

interface Props {
  props: Record<string, any>
}
const props = defineProps<Props>()
const emit = defineEmits(['update'])
</script>
