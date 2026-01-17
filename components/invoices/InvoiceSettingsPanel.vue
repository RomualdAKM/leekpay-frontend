<template>
  <Card class="overflow-hidden">
    <div class="bg-emerald-50 px-4 py-3">
      <p class="text-base font-semibold text-[#0A1F44]">Reglages</p>
    </div>
    <div class="p-4 space-y-4 max-h-[520px] overflow-y-auto">
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
    <div class="p-4 space-y-3">
      <button
        class="w-full bg-[#2ECC71] text-white font-semibold rounded-md py-2.5 text-sm flex items-center justify-center gap-2"
        @click="emit('download')"
      >
        <Download class="w-4 h-4" />
        <span>Telecharger ma facture</span>
        <span class="ml-1 inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">PRO</span>
      </button>
    </div>
  </Card>
</template>

<script setup>
import { Download } from 'lucide-vue-next'
import Card from '~/components/ui/Card.vue'
import BinaryToggle from '~/components/invoices/BinaryToggle.vue'

defineProps({
  settings: {
    type: Object,
    required: true
  },
  currencies: {
    type: Array,
    default: () => []
  },
  currenciesLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['download'])
</script>
