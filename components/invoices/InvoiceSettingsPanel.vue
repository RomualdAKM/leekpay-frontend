<template>
  <Card class="overflow-hidden">
    <div class="bg-emerald-50 px-4 py-3">
      <p class="text-base font-semibold text-[#0A1F44]">Reglages</p>
    </div>
    <div class="p-4 space-y-4 max-h-[520px] overflow-y-auto">
      <div v-if="templates.length" class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-800">Templates</span>
        </div>
        <div class="relative">
          <div class="grid grid-cols-2 gap-3">
          <button
            v-for="template in templates"
            :key="template.id"
            type="button"
            class="border rounded-lg p-2 text-left transition shadow-sm hover:shadow-md relative"
            :class="selectedTemplateId === template.id ? 'border-[#2ECC71] ring-2 ring-emerald-100' : 'border-gray-200'"
            @click="emit('apply-template', template)"
          >
            <div
              class="rounded-md border border-white/70 p-2"
              :style="{ background: template.backgroundColor }"
            >
              <div class="h-2 rounded" :style="{ background: template.primaryColor }"></div>
              <div class="mt-2 space-y-1">
                <div class="h-1 rounded" :style="{ background: template.secondaryColor, opacity: 0.7 }"></div>
                <div class="h-1 rounded" :style="{ background: template.primaryColor, opacity: 0.35, width: '70%' }"></div>
              </div>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <div>
                <p class="text-[11px] font-semibold text-gray-800">{{ template.name }}</p>
                <p class="text-[10px] text-gray-500">{{ template.label }}</p>
              </div>
              <span v-if="template.isFree" class="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-semibold rounded">GRATUIT</span>
              <Lock v-else-if="!isPremium" class="h-3.5 w-3.5 text-amber-500" />
            </div>
          </button>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-800">Personnalisation avancee</span>
          <span class="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">PRO</span>
        </div>
        <div class="relative">
          <div class="grid grid-cols-1 gap-3" :class="!isPremium ? 'opacity-50 pointer-events-none' : ''">
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Style du layout</span>
            <select v-model="settings.templateStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="classic">Classique</option>
              <option value="aurora">Aurora</option>
              <option value="banner">Bandeau</option>
              <option value="noir">Noir</option>
              <option value="minimal">Minimal</option>
              <option value="contrast">Contraste</option>
              <option value="editorial">Editorial</option>
              <option value="paper">Paper</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Style de l'entete</span>
            <select v-model="settings.headerStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="split">Deux colonnes</option>
              <option value="stacked">Empile</option>
              <option value="compact">Compact</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Style du tableau</span>
            <select v-model="settings.tableStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="bordered">Bordures</option>
              <option value="striped">Rayures</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Style des totaux</span>
            <select v-model="settings.totalsStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="card">Carte</option>
              <option value="inline">Lignes</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Densite</span>
            <select v-model="settings.density" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="comfortable">Confort</option>
              <option value="compact">Compact</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Angles</span>
            <select v-model="settings.cornerStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="rounded">Arrondis</option>
              <option value="sharp">Vifs</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Signature LeekPay</span>
            <select v-model="settings.signatureStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="dot">Pastille</option>
              <option value="line">Ligne fine</option>
              <option value="badge">Badge</option>
              <option value="none">Masquee</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Motif de fond</span>
            <select v-model="settings.patternStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="none">Aucun</option>
              <option value="dots">Points</option>
              <option value="lines">Lignes fines</option>
              <option value="grid">Grille</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Accent premium</span>
            <select v-model="settings.accentStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="none">Aucun</option>
              <option value="top-bar">Bandeau haut</option>
              <option value="left-band">Bande laterale</option>
              <option value="diagonal">Diagonale</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Watermark</span>
            <select v-model="settings.watermarkStyle" class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50" :disabled="!isPremium">
              <option value="none">Aucun</option>
              <option value="subtle">Discret</option>
              <option value="outline">Contour</option>
            </select>
          </div>
          <div v-if="settings.watermarkStyle !== 'none'" class="flex items-center justify-between gap-3">
            <span class="text-sm text-gray-700">Texte watermark</span>
            <input
              v-model="settings.watermarkText"
              type="text"
              class="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50"
              placeholder="LeekPay Premium"
            />
          </div>
          </div>
          <div
            v-if="!isPremium"
            class="mt-3 flex items-center justify-center"
          >
            <button
              type="button"
              class="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 shadow-sm"
              @click="emit('upgrade')"
            >
              <Lock class="h-4 w-4" />
              Passer au Premium
            </button>
          </div>
        </div>
      </div>
      <div v-if="variant === 'full'" class="space-y-4">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Activer la TVA</span>
          <BinaryToggle v-model="settings.vatEnabled" />
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Taux TVA variable par ligne</span>
          <BinaryToggle v-model="settings.vatPerLine" />
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Afficher la colonne Quantite</span>
          <BinaryToggle v-model="settings.showQuantity" />
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Afficher la colonne Unite</span>
          <BinaryToggle v-model="settings.showUnit" />
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Couleur des cases</span>
          <select
            v-model="settings.cellColor"
            class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
          >
            <option value="gray">Gris</option>
            <option value="blue">Bleu</option>
            <option value="beige">Beige</option>
            <option value="sage">Vert doux</option>
            <option value="amber">Jaune doux</option>
            <option value="rose">Rose doux</option>
            <option value="slate">Ardoise</option>
          </select>
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Devise</span>
          <select
            v-model="settings.currency"
            class="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-gray-50"
          >
            <option v-if="currenciesLoading" disabled value="">Chargement...</option>
            <option
              v-for="currency in currencies"
              :key="currency.id"
              :value="currency.code"
            >
              {{ currency.symbol }} - {{ currency.name }} ({{ currency.code }})
            </option>
            <option v-if="!currencies.length" value="EUR">EUR</option>
            <option v-if="!currencies.length" value="XOF">XOF</option>
            <option v-if="!currencies.length" value="USD">USD</option>
          </select>
        </div>
        <div v-if="settings.vatEnabled && !settings.vatPerLine" class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Taux TVA</span>
          <input
            v-model="settings.vatRate"
            type="number"
            class="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm bg-gray-50 text-right"
          />
        </div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-gray-700">Sauvegarde auto</span>
          <BinaryToggle v-model="settings.autoSave" />
        </div>
      </div>
    </div>
    <div v-if="variant === 'full'" class="p-4 space-y-3">
      <button
        class="w-full bg-[#2ECC71] text-white font-semibold rounded-md py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="pdfLoading"
        @click="emit('download')"
      >
        <Download class="w-4 h-4" />
        <span>{{ pdfLoading ? 'Telechargement en cours...' : 'Telecharger ma facture' }}</span>
        <span
          v-if="pdfLoading"
          class="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
        ></span>
      </button>
    </div>
  </Card>
</template>

<script setup>
import { Download, Lock } from 'lucide-vue-next'
import Card from '~/components/ui/Card.vue'
import BinaryToggle from '~/components/invoices/BinaryToggle.vue'

defineProps({
  settings: {
    type: Object,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'full'
  },
  templates: {
    type: Array,
    default: () => []
  },
  selectedTemplateId: {
    type: String,
    default: ''
  },
  currencies: {
    type: Array,
    default: () => []
  },
  currenciesLoading: {
    type: Boolean,
    default: false
  },
  pdfLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['download', 'apply-template', 'upgrade'])
</script>
