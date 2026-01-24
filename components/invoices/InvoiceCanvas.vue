<template>
  <div class="rounded-2xl border border-gray-200 bg-[#f4f5f7] p-5">
    <div
      class="mx-auto w-full max-w-[920px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] invoice-sheet"
      :class="[templateClass, densityClass, cornerClass, patternClass]"
      :style="sheetStyle"
    >
      <div v-if="accentVisible" class="accent-layer" :class="accentClass"></div>
      <div v-if="watermarkVisible" class="watermark" :class="watermarkClass">{{ watermarkText }}</div>
      <div class="p-8 space-y-6 text-[12px] text-gray-700 sheet-body">
        <div>
          <div :class="headerLayoutClass">
            <div class="space-y-4">
              <div class="flex items-start gap-4 min-w-0">
                <div
                  v-if="!preview || invoice.issuer.logo"
                  class="logo-box header-card"
                  :class="preview ? '' : 'cursor-pointer'"
                  @click="preview ? null : triggerLogoUpload()"
                  @dragover.prevent
                  @drop.prevent="onLogoDrop"
                >
                  <img
                    v-if="invoice.issuer.logo"
                    :src="invoice.issuer.logo"
                    alt="Logo"
                    class="w-full h-full object-contain"
                  />
                  <template v-else>
                    <CloudUpload v-if="!preview" class="w-7 h-7 text-gray-400 mb-2" />
                    <span v-if="!preview">Deposez ou cliquez pour ajouter votre logo</span>
                  </template>
                </div>
                <div class="min-w-0 flex-1 space-y-2 header-card">
                <template v-if="preview">
                  <div class="text-[13px] font-semibold text-gray-900">{{ invoice.issuer.name || '' }}</div>
                  <div class="text-gray-700">{{ invoice.issuer.address || '' }}</div>
                  <div class="flex gap-2 min-w-0 text-gray-700">
                    <div class="w-32">{{ invoice.issuer.zip || '' }}</div>
                    <div class="flex-1 min-w-0">{{ invoice.issuer.city || '' }}</div>
                  </div>
                </template>
                <template v-else>
                  <input v-model="invoice.issuer.name" class="inline-input w-full font-semibold text-[13px]" placeholder="Votre nom / societe" />
                  <input v-model="invoice.issuer.address" class="inline-input w-full" placeholder="Adresse" />
                  <div class="flex gap-2 min-w-0">
                    <input v-model="invoice.issuer.zip" class="inline-input w-32" placeholder="Code postal" />
                    <input v-model="invoice.issuer.city" class="inline-input flex-1 min-w-0" placeholder="Ville" />
                  </div>
                </template>
              </div>
            </div>
            <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" :disabled="preview" />
            <p v-if="!preview" class="text-[11px] text-emerald-600">Infos pre-remplies via LeekPay</p>
              <div class="space-y-2">
                <div v-for="field in invoice.issuer.fields" :key="field.id" class="field-row">
                <template v-if="preview">
                  <div class="field-label text-gray-900">{{ field.label || '' }}</div>
                  <div class="field-value text-gray-700">{{ field.value || '' }}</div>
                </template>
                <template v-else>
                  <input v-model="field.label" placeholder="Libelle" class="inline-input field-label" />
                  <input v-model="field.value" placeholder="Valeur" class="inline-input field-value" />
                </template>
                <button v-if="!preview" class="action-icon" @click="$emit('remove-issuer-field', field.id)">
                  <Minus class="w-3.5 h-3.5" />
                </button>
              </div>
              <button v-if="!preview" class="action-icon" @click="$emit('add-issuer-field')">
                <Plus class="w-4 h-4" />
              </button>
              </div>
            </div>

            <div class="space-y-4 header-summary">
              <div class="text-right space-y-2">
                <p class="text-[10px] uppercase tracking-wide text-gray-400">Facture</p>
                <template v-if="preview">
                  <div class="text-right font-semibold text-gray-900">{{ invoice.number || '' }}</div>
                </template>
                <template v-else>
                  <input v-model="invoice.number" class="inline-input w-full text-right font-semibold" placeholder="Facture N°" />
                </template>
              </div>
              <div class="rounded-md border border-gray-200 overflow-hidden meta-card">
                <div
                  v-for="row in invoice.metaRows"
                  :key="row.id"
                  class="grid grid-cols-[1fr_1fr] border-b border-gray-200 last:border-b-0"
                >
                  <div class="px-3 py-2 text-gray-800 font-semibold" :class="cellBgClass">
                    <template v-if="preview">
                      <div class="font-semibold text-gray-900">{{ row.label || '' }}</div>
                    </template>
                    <template v-else>
                      <input v-model="row.label" placeholder="Libelle" class="inline-input w-full bg-transparent font-semibold" />
                    </template>
                  </div>
                  <div class="px-3 py-2 flex items-center justify-between gap-2">
                    <template v-if="preview">
                      <div class="w-full text-right text-gray-700">{{ row.value || '' }}</div>
                    </template>
                    <template v-else>
                      <input v-model="row.value" class="inline-input w-full text-right flex-1" :placeholder="metaValuePlaceholder(row.label)" />
                    </template>
                    <button v-if="!preview" class="action-icon" @click="$emit('remove-meta-row', row.id)">
                      <Minus class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex justify-center">
                <button v-if="!preview" class="action-icon" @click="$emit('add-meta-row')">
                  <Plus class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-md border border-gray-200 bg-gray-50/60 p-4 section-card client-card">
          <div class="flex items-center justify-between gap-3">
            <p class="text-[10px] uppercase tracking-wide text-gray-400">Client</p>
            <p v-if="!preview" class="text-[11px] text-emerald-600">Infos client pre-remplies via LeekPay</p>
          </div>
          <div class="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
            <div class="space-y-2">
              <template v-if="preview">
                <div class="font-semibold text-gray-900">{{ invoice.client.name || '' }}</div>
                <div class="text-gray-700">{{ invoice.client.address || '' }}</div>
                <div class="flex gap-2 text-gray-700">
                  <div class="w-32">{{ invoice.client.zip || '' }}</div>
                  <div class="flex-1 min-w-0">{{ invoice.client.city || '' }}</div>
                </div>
              </template>
              <template v-else>
                <input v-model="invoice.client.name" class="inline-input w-full font-semibold" placeholder="Nom client" />
                <input v-model="invoice.client.address" class="inline-input w-full" placeholder="Adresse" />
                <div class="flex gap-2">
                  <input v-model="invoice.client.zip" class="inline-input w-32" placeholder="Code postal" />
                  <input v-model="invoice.client.city" class="inline-input flex-1 min-w-0" placeholder="Ville" />
                </div>
              </template>
            </div>
            <div class="space-y-2">
              <div v-for="field in invoice.client.fields" :key="field.id" class="field-row">
                <template v-if="preview">
                  <div class="field-label text-gray-900">{{ field.label || '' }}</div>
                  <div class="field-value text-gray-700">{{ field.value || '' }}</div>
                </template>
                <template v-else>
                  <input v-model="field.label" placeholder="Libelle" class="inline-input field-label" />
                  <input v-model="field.value" placeholder="Valeur" class="inline-input field-value" />
                </template>
                <button v-if="!preview" class="action-icon" @click="$emit('remove-client-field', field.id)">
                  <Minus class="w-3.5 h-3.5" />
                </button>
              </div>
              <button v-if="!preview" class="action-icon" @click="$emit('add-client-field')">
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="border border-gray-300 items-table-wrapper" :class="tableVariantClass">
            <table class="min-w-full text-[12px]">
              <thead :class="[cellBgClass, tableHeadClass]">
                <tr>
                  <th class="px-3 py-2 text-center font-semibold border-r border-gray-300">Description</th>
                  <th v-if="settings.showQuantity" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Quantite</th>
                  <th v-if="settings.showUnit" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Unite</th>
                  <th class="px-3 py-2 text-center font-semibold border-r border-gray-300">Prix unitaire HT</th>
                  <th v-if="settings.vatEnabled" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Taux TVA</th>
                  <th class="px-3 py-2 text-center font-semibold">Prix total HT</th>
                  <th v-if="!preview" class="w-8"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in invoice.items"
                  :key="item.id"
                  class="border-t border-gray-300 item-row"
                  :class="[
                    preview ? '' : 'cursor-grab active:cursor-grabbing',
                    {
                      'bg-emerald-50/40': dragOverId === item.id,
                      'opacity-70': draggingId === item.id
                    }
                  ]"
                  :draggable="!preview"
                  @dragstart="onDragStart($event, item.id)"
                  @dragover.prevent="onDragOver(item.id)"
                  @drop.prevent="onDrop(item.id)"
                  @dragend="onDragEnd"
                >
                  <td class="px-3 py-2 border-r border-gray-300">
                    <div class="space-y-1">
                      <template v-if="preview">
                        <div class="font-semibold text-gray-900">{{ item.title || item.description || '' }}</div>
                        <div class="text-gray-500 text-[11px]">{{ item.description || '' }}</div>
                      </template>
                      <template v-else>
                        <input v-model="item.title" class="inline-input w-full font-semibold" placeholder="Titre prestation" />
                        <input v-model="item.description" class="inline-input w-full text-gray-500" placeholder="Description prestation" />
                      </template>
                    </div>
                  </td>
                  <td v-if="settings.showQuantity" class="px-3 py-2 border-r border-gray-300 text-center">
                    <template v-if="preview">
                      <div class="text-center">{{ item.quantity || '' }}</div>
                    </template>
                    <template v-else>
                      <input v-model="item.quantity" type="number" min="0.01" step="0.01" class="inline-input w-16 text-center" placeholder="1" />
                    </template>
                  </td>
                  <td v-if="settings.showUnit" class="px-3 py-2 border-r border-gray-300 text-center">
                    <template v-if="preview">
                      <div class="text-center">{{ item.unit || '' }}</div>
                    </template>
                    <template v-else>
                      <input v-model="item.unit" class="inline-input w-20 text-center" placeholder="Unite" />
                    </template>
                  </td>
                  <td class="px-3 py-2 border-r border-gray-300 text-center">
                    <template v-if="preview">
                      <div class="text-center">{{ item.unitPrice || '' }}</div>
                    </template>
                    <template v-else>
                      <input v-model="item.unitPrice" type="number" min="0" step="0.01" class="inline-input w-24 text-center" placeholder="0,00" />
                    </template>
                  </td>
                  <td v-if="settings.vatEnabled" class="px-3 py-2 border-r border-gray-300 text-center">
                    <template v-if="preview">
                      <div class="text-center">{{ item.taxRate !== '' && item.taxRate !== null && item.taxRate !== undefined ? `${item.taxRate}%` : '' }}</div>
                    </template>
                    <template v-else>
                      <input
                        v-model="item.taxRate"
                        type="number"
                        min="0"
                        max="100"
                        class="inline-input w-16 text-center"
                        :disabled="!settings.vatPerLine"
                        placeholder="TVA"
                      />
                    </template>
                  </td>
                  <td class="px-3 py-2 text-center font-semibold">
                    {{ formatAmount(lineTotal(item)) }} {{ currencySymbol }}
                  </td>
                  <td v-if="!preview" class="px-2 py-2">
                    <div class="flex items-center gap-2">
                      <button class="action-icon" @click="$emit('duplicate-item', item.id)">
                        <Copy class="w-3.5 h-3.5" />
                      </button>
                      <button class="action-icon" @click="$emit('remove-item', item.id)">
                        <Minus class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center">
            <button v-if="!preview" class="action-icon" @click="$emit('add-item')">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <div class="w-full max-w-[360px] border border-gray-300 totals-panel" :class="totalsVariantClass">
            <div class="grid grid-cols-[1fr_120px] border-b border-gray-300 totals-row">
              <div class="px-3 py-2 totals-label" :class="cellBgClass">Total HT</div>
              <div class="px-3 py-2 text-right">{{ formatAmount(totals.subtotal) }} {{ currencySymbol }}</div>
            </div>
            <div v-if="settings.vatEnabled" class="grid grid-cols-[1fr_120px] border-b border-gray-300 totals-row">
              <div class="px-3 py-2 totals-label" :class="cellBgClass">Total TVA</div>
              <div class="px-3 py-2 text-right">{{ formatAmount(totals.taxTotal) }} {{ currencySymbol }}</div>
            </div>
            <div class="grid grid-cols-[1fr_120px] totals-row">
              <div class="px-3 py-2 font-semibold totals-label" :class="cellBgClass">Total TTC</div>
              <div class="px-3 py-2 text-right font-semibold">{{ formatAmount(totals.total) }} {{ currencySymbol }}</div>
            </div>
          </div>
        </div>

        <div class="max-w-[640px] space-y-4 note-panel">
          <div class="max-w-[520px] space-y-1 note-panel">
            <p class="text-[10px] uppercase text-gray-400">Notes</p>
            <textarea
              v-if="!preview"
              v-model="invoice.notes"
              rows="3"
              class="inline-input w-full bg-emerald-50 text-gray-600 resize-none"
            ></textarea>
            <div v-else class="text-[11px] text-gray-600 whitespace-pre-line bg-transparent">
              {{ invoice.notes || '' }}
            </div>
          </div>

          <div class="max-w-[640px] note-panel">
            <textarea
              v-if="!preview"
              v-model="invoice.footerNote"
              rows="2"
              class="inline-input w-full text-[10px] text-gray-500 bg-emerald-50 resize-none"
            ></textarea>
            <div v-else class="text-[10px] text-gray-500 whitespace-pre-line bg-transparent">
              {{ invoice.footerNote || '' }}
            </div>
          </div>
        </div>

        <div v-if="signatureVisible" class="flex justify-end text-[10px] text-gray-400 signature" :class="signatureClass">
          <span class="flex items-center gap-1">
            <span v-if="settings.signatureStyle === 'dot'" class="signature-dot"></span>
            <span v-else-if="settings.signatureStyle === 'line'" class="signature-line"></span>
            <span v-else-if="settings.signatureStyle === 'badge'" class="signature-badge">LP</span>
            Propulse par LeekPay
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Minus, CloudUpload, Copy } from 'lucide-vue-next'

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  },
  settings: {
    type: Object,
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'add-meta-row',
  'remove-meta-row',
  'add-issuer-field',
  'remove-issuer-field',
  'add-client-field',
  'remove-client-field',
  'add-item',
  'remove-item',
  'duplicate-item',
  'reorder-item',
  'upload-logo'
])

const logoInput = ref(null)
const logoPreview = ref('')

const draggingId = ref(null)
const dragOverId = ref(null)

const templateClass = computed(() => `template-${props.settings.templateStyle || 'classic'}`)
const densityClass = computed(() => `density-${props.settings.density || 'comfortable'}`)
const cornerClass = computed(() => `corners-${props.settings.cornerStyle || 'rounded'}`)
const patternClass = computed(() => `pattern-${props.settings.patternStyle || 'none'}`)
const accentClass = computed(() => `accent-${props.settings.accentStyle || 'none'}`)
const accentVisible = computed(() => (props.settings.accentStyle || 'none') !== 'none')
const watermarkClass = computed(() => `watermark-${props.settings.watermarkStyle || 'none'}`)
const watermarkVisible = computed(() => (props.settings.watermarkStyle || 'none') !== 'none')
const watermarkText = computed(() => props.settings.watermarkText || 'LeekPay Premium')

const headerLayoutClass = computed(() => {
  const base = 'sheet-header grid gap-6'
  if (props.settings.headerStyle === 'stacked') return `${base} grid-cols-1`
  if (props.settings.headerStyle === 'compact') return `${base} grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px]`
  return `${base} grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px]`
})

const tableVariantClass = computed(() => `table-${props.settings.tableStyle || 'bordered'}`)
const tableHeadClass = computed(() => {
  if (props.settings.tableStyle === 'minimal') return 'table-head-minimal'
  if (props.settings.tableStyle === 'striped') return 'table-head-striped'
  return 'table-head-bordered'
})

const totalsVariantClass = computed(() => `totals-${props.settings.totalsStyle || 'card'}`)
const signatureVisible = computed(() => props.settings.signatureStyle !== 'none')
const signatureClass = computed(() => `signature-${props.settings.signatureStyle || 'dot'}`)

const cellBgClass = computed(() => {
  const color = props.settings.cellColor
  if (color === 'blue') return 'bg-blue-50'
  if (color === 'beige') return 'bg-[#f2ece6]'
  if (color === 'sage') return 'bg-emerald-50'
  if (color === 'amber') return 'bg-amber-50'
  if (color === 'rose') return 'bg-rose-50'
  if (color === 'slate') return 'bg-slate-100'
  return 'bg-[#e8e6e4]'
})

const currencySymbol = computed(() => {
  if (props.settings.currencySymbol) return props.settings.currencySymbol
  if (props.settings.currency === 'XOF') return 'CFA'
  if (props.settings.currency === 'USD') return '$'
  return 'EUR'
})

const totals = computed(() => {
  let subtotal = 0
  let taxTotal = 0
  props.invoice.items.forEach((item) => {
    const quantity = Number(item.quantity || 0)
    const unitPrice = Number(item.unitPrice || 0)
    const lineSubtotal = quantity * unitPrice
    const taxRate = props.settings.vatEnabled
      ? (props.settings.vatPerLine ? Number(item.taxRate || 0) : Number(props.settings.vatRate || 0))
      : 0
    subtotal += lineSubtotal
    taxTotal += lineSubtotal * (taxRate / 100)
  })
  return {
    subtotal,
    taxTotal,
    total: subtotal + taxTotal
  }
})

const lineTotal = (item) => {
  const quantity = Number(item.quantity || 0)
  const unitPrice = Number(item.unitPrice || 0)
  const lineSubtotal = quantity * unitPrice
  const taxRate = props.settings.vatEnabled
    ? (props.settings.vatPerLine ? Number(item.taxRate || 0) : Number(props.settings.vatRate || 0))
    : 0
  return lineSubtotal + lineSubtotal * (taxRate / 100)
}

const formatAmount = (value) => {
  const numberValue = Number(value || 0)
  return numberValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const metaValuePlaceholder = (label) => {
  const lower = String(label || '').toLowerCase()
  if (lower.includes('date') || lower.includes('echeance') || lower.includes('échéance')) {
    return 'JJ/MM/AAAA'
  }
  return 'Valeur'
}

const sheetStyle = computed(() => ({
  aspectRatio: '210 / 297',
  fontFamily: props.settings.fontFamily || 'Poppins, sans-serif',
  '--accent-color': props.settings.primaryColor || '#2ECC71',
  '--secondary-color': props.settings.secondaryColor || '#0A1F44',
  backgroundColor: props.settings.backgroundColor || '#FFFFFF'
}))

const triggerLogoUpload = () => {
  if (logoInput.value) logoInput.value.click()
}

const applyLogoFile = (file) => {
  if (!file) return
  if (logoPreview.value) {
    URL.revokeObjectURL(logoPreview.value)
  }
  logoPreview.value = URL.createObjectURL(file)
  props.invoice.issuer.logo = logoPreview.value
  emit('upload-logo', file)
}

const onLogoChange = (event) => {
  if (props.preview) return
  const file = event.target.files?.[0]
  applyLogoFile(file)
}

const onLogoDrop = (event) => {
  if (props.preview) return
  const file = event.dataTransfer?.files?.[0]
  applyLogoFile(file)
}

const onDragStart = (event, itemId) => {
  if (props.preview) return
  draggingId.value = itemId
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', itemId)
  }
}

const onDragOver = (itemId) => {
  if (props.preview) return
  dragOverId.value = itemId
}

const onDrop = (itemId) => {
  if (props.preview) return
  if (!draggingId.value || draggingId.value === itemId) {
    dragOverId.value = null
    return
  }
  const from = draggingId.value
  dragOverId.value = null
  draggingId.value = null
  emit('reorder-item', { from, to: itemId })
}

const onDragEnd = () => {
  if (props.preview) return
  draggingId.value = null
  dragOverId.value = null
}
</script>

<style scoped>
.inline-input {
  background: #f7faf8;
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  border-radius: 6px;
  outline: none;
  color: inherit;
  min-width: 0;
}

.inline-input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.inline-input.bg-transparent {
  background: transparent;
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
}

.logo-box {
  height: 112px;
  width: 112px;
  border: 1px dashed #cbd5f5;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  color: #64748b;
  flex-shrink: 0;
}

.field-row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) 24px;
  gap: 8px;
  align-items: center;
}

.field-label,
.field-value {
  width: 100%;
}

.field-label {
  font-weight: 600;
  color: #111827;
}

.action-icon {
  height: 22px;
  width: 22px;
  border-radius: 999px;
  background: var(--accent-color, #2ECC71);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.invoice-sheet {
  background: var(--sheet-bg, #ffffff);
  position: relative;
  overflow: hidden;
}

.pattern-dots {
  background-image: radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0);
  background-size: 18px 18px;
}

.pattern-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(15, 23, 42, 0.06),
    rgba(15, 23, 42, 0.06) 1px,
    transparent 1px,
    transparent 18px
  );
}

.pattern-grid {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px);
  background-size: 22px 22px;
}

.accent-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.accent-layer.accent-top-bar,
.accent-layer.accent-left-band,
.accent-layer.accent-diagonal {
  background: none;
}

.accent-layer.accent-top-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--accent-color, #2ECC71), var(--secondary-color, #0A1F44));
}

.accent-layer.accent-left-band::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 8px;
  background: linear-gradient(180deg, var(--accent-color, #2ECC71), var(--secondary-color, #0A1F44));
}

.accent-layer.accent-diagonal::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -120px;
  width: 220px;
  height: 120px;
  background: linear-gradient(135deg, var(--accent-color, #2ECC71), var(--secondary-color, #0A1F44));
  transform: rotate(-12deg);
}

.watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 54px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.08);
  z-index: 0;
  pointer-events: none;
}

.watermark-subtle {
  color: rgba(15, 23, 42, 0.06);
}

.watermark-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(15, 23, 42, 0.15);
  text-stroke: 1px rgba(15, 23, 42, 0.15);
}

.sheet-body {
  position: relative;
  z-index: 2;
}

.density-compact .sheet-body {
  padding: 20px;
  font-size: 11px;
}

.density-compact .sheet-body > * + * {
  margin-top: 16px;
}

.density-compact .inline-input {
  padding: 4px 8px;
}

.corners-sharp .inline-input,
.corners-sharp .logo-box,
.corners-sharp .section-card,
.corners-sharp .items-table-wrapper,
.corners-sharp .totals-panel,
.corners-sharp .meta-card {
  border-radius: 4px !important;
}

.table-minimal {
  border-color: transparent !important;
}

.table-minimal th,
.table-minimal td {
  border-color: transparent !important;
}

.table-minimal .inline-input {
  border-color: transparent;
  background: transparent;
}

.table-striped tbody tr:nth-child(even) {
  background: rgba(15, 23, 42, 0.03);
}

.table-head-minimal {
  background: transparent !important;
}

.table-head-striped {
  background: rgba(15, 23, 42, 0.04) !important;
}

.totals-inline {
  border-color: transparent !important;
  background: transparent !important;
}

.totals-inline .totals-row {
  border-bottom: 1px dashed #e5e7eb;
}

.totals-inline .totals-row:last-child {
  border-bottom: 0;
}

.template-banner .sheet-header {
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
  color: #ffffff;
  padding: 16px;
  border-radius: 14px;
}

.template-banner .sheet-header .text-gray-400,
.template-banner .sheet-header .text-emerald-600 {
  color: rgba(255, 255, 255, 0.78) !important;
}

.template-banner .sheet-header .inline-input {
  background: rgba(255, 255, 255, 0.92);
  border-color: transparent;
  color: #0f172a;
}

.template-banner .logo-box {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.45);
  color: #f8fafc;
}

.template-contrast .sheet-header {
  background: #0f172a;
  color: #f8fafc;
  padding: 16px;
  border-radius: 14px;
}

.template-contrast .sheet-header .text-gray-400,
.template-contrast .sheet-header .text-emerald-600 {
  color: rgba(248, 250, 252, 0.8) !important;
}

.template-contrast .sheet-header .inline-input {
  background: #ffffff;
  border-color: transparent;
  color: #0f172a;
}

.template-minimal .section-card,
.template-minimal .totals-panel,
.template-minimal .items-table-wrapper {
  border-color: #e5e7eb;
  background: transparent;
}

.template-editorial .sheet-body {
  letter-spacing: 0.2px;
}

.template-editorial .items-title {
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-size: 10px;
}

.template-editorial .note-panel {
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
}

.template-editorial .note-panel .text-gray-600 {
  font-style: italic;
}

.template-aurora .sheet-header {
  background: #f8fafc;
  border: 1px solid var(--accent-color, #2ECC71);
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.template-aurora .meta-card {
  border-color: var(--accent-color, #2ECC71);
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);
}

.template-aurora .items-table-wrapper,
.template-aurora .totals-panel {
  border-color: var(--accent-color, #2ECC71);
}

.template-aurora .logo-box {
  border-color: var(--accent-color, #2ECC71);
}

.template-noir .sheet-header {
  background: #0f172a;
  color: #f8fafc;
  padding: 18px;
  border-radius: 12px;
}

.template-noir .sheet-header .text-gray-400,
.template-noir .sheet-header .text-emerald-600 {
  color: rgba(248, 250, 252, 0.8) !important;
}

.template-noir .meta-card {
  border-color: #1f2937;
}

.template-noir .meta-card .bg-slate-100 {
  background: #111827 !important;
  color: #f8fafc;
}

.template-noir .items-table-wrapper {
  border-color: #0f172a;
}

.template-noir .items-table-wrapper thead {
  background: #111827 !important;
  color: #f8fafc;
}

.template-noir .items-table-wrapper th {
  color: #f8fafc;
}

.template-paper .sheet-header {
  background: #ffffff;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 12px;
}

.template-paper .items-table-wrapper,
.template-paper .totals-panel,
.template-paper .meta-card,
.template-paper .section-card {
  border-style: dashed;
}

.template-paper .items-table th,
.template-paper .items-table td {
  border-style: dashed;
}

.signature-dot {
  height: 6px;
  width: 6px;
  border-radius: 999px;
  background: var(--accent-color, #2ECC71);
  display: inline-block;
}

.signature-line {
  height: 2px;
  width: 16px;
  background: var(--accent-color, #2ECC71);
  display: inline-block;
}

.signature-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  border-radius: 999px;
  background: var(--accent-color, #2ECC71);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
}
</style>
