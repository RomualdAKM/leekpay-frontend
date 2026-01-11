<template>
  <div class="rounded-2xl border border-gray-200 bg-[#f4f5f7] p-5">
    <div class="mx-auto w-full max-w-[920px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]" :style="sheetStyle">
      <div class="p-8 space-y-6 text-[12px] text-gray-700">
        <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] gap-6">
          <div class="space-y-4">
            <div class="flex items-start gap-4 min-w-0">
              <div
                class="logo-box cursor-pointer"
                @click="triggerLogoUpload"
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
                  <CloudUpload class="w-7 h-7 text-gray-400 mb-2" />
                  <span>Deposez ou cliquez pour ajouter votre logo</span>
                </template>
              </div>
              <div class="min-w-0 flex-1 space-y-2">
                <input v-model="invoice.issuer.name" class="inline-input w-full font-semibold text-[13px]" />
                <input v-model="invoice.issuer.address" class="inline-input w-full" />
                <div class="flex gap-2 min-w-0">
                  <input v-model="invoice.issuer.zip" class="inline-input w-32" />
                  <input v-model="invoice.issuer.city" class="inline-input flex-1 min-w-0" />
                </div>
              </div>
            </div>
            <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
            <p class="text-[11px] text-emerald-600">Infos pre-remplies via LeekPay</p>
            <div class="space-y-2">
              <div v-for="field in invoice.issuer.fields" :key="field.id" class="field-row">
                <input v-model="field.label" placeholder="Libelle" class="inline-input field-label" />
                <input v-model="field.value" class="inline-input field-value" />
                <button class="action-icon" @click="$emit('remove-issuer-field', field.id)">
                  <Minus class="w-3.5 h-3.5" />
                </button>
              </div>
              <button class="action-icon" @click="$emit('add-issuer-field')">
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="text-right space-y-2">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">Facture</p>
              <input v-model="invoice.number" class="inline-input w-full text-right font-semibold" />
            </div>
            <div class="rounded-md border border-gray-200 overflow-hidden">
              <div
                v-for="row in invoice.metaRows"
                :key="row.id"
                class="grid grid-cols-[1fr_1fr] border-b border-gray-200 last:border-b-0"
              >
                <div class="px-3 py-2 text-gray-800 font-semibold" :class="cellBgClass">
                  <input v-model="row.label" placeholder="Libelle" class="inline-input w-full bg-transparent font-semibold" />
                </div>
                <div class="px-3 py-2 flex items-center justify-between gap-2">
                  <input v-model="row.value" class="inline-input w-full text-right flex-1" />
                  <button class="action-icon" @click="$emit('remove-meta-row', row.id)">
                    <Minus class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex justify-center">
              <button class="action-icon" @click="$emit('add-meta-row')">
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-md border border-gray-200 bg-gray-50/60 p-4">
          <div class="flex items-center justify-between gap-3">
            <p class="text-[10px] uppercase tracking-wide text-gray-400">Client</p>
            <p class="text-[11px] text-emerald-600">Infos client pre-remplies via LeekPay</p>
          </div>
          <div class="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
            <div class="space-y-2">
              <input v-model="invoice.client.name" class="inline-input w-full font-semibold" />
              <input v-model="invoice.client.address" class="inline-input w-full" />
              <div class="flex gap-2">
                <input v-model="invoice.client.zip" class="inline-input w-32" />
                <input v-model="invoice.client.city" class="inline-input flex-1 min-w-0" />
              </div>
            </div>
            <div class="space-y-2">
              <div v-for="field in invoice.client.fields" :key="field.id" class="field-row">
                <input v-model="field.label" placeholder="Libelle" class="inline-input field-label" />
                <input v-model="field.value" class="inline-input field-value" />
                <button class="action-icon" @click="$emit('remove-client-field', field.id)">
                  <Minus class="w-3.5 h-3.5" />
                </button>
              </div>
              <button class="action-icon" @click="$emit('add-client-field')">
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="border border-gray-300">
            <table class="min-w-full text-[12px]">
              <thead :class="cellBgClass">
                <tr>
                  <th class="px-3 py-2 text-center font-semibold border-r border-gray-300">Description</th>
                  <th v-if="settings.showQuantity" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Quantite</th>
                  <th v-if="settings.showUnit" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Unite</th>
                  <th class="px-3 py-2 text-center font-semibold border-r border-gray-300">Prix unitaire HT</th>
                  <th v-if="settings.vatEnabled" class="px-3 py-2 text-center font-semibold border-r border-gray-300">Taux TVA</th>
                  <th class="px-3 py-2 text-center font-semibold">Prix total HT</th>
                  <th class="w-8"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in invoice.items"
                  :key="item.id"
                  class="border-t border-gray-300 cursor-grab active:cursor-grabbing"
                  :class="{
                    'bg-emerald-50/40': dragOverId === item.id,
                    'opacity-70': draggingId === item.id
                  }"
                  draggable="true"
                  @dragstart="onDragStart($event, item.id)"
                  @dragover.prevent="onDragOver(item.id)"
                  @drop.prevent="onDrop(item.id)"
                  @dragend="onDragEnd"
                >
                  <td class="px-3 py-2 border-r border-gray-300">
                    <div class="space-y-1">
                      <input v-model="item.title" class="inline-input w-full font-semibold" />
                      <input v-model="item.description" class="inline-input w-full text-gray-500" />
                    </div>
                  </td>
                  <td v-if="settings.showQuantity" class="px-3 py-2 border-r border-gray-300 text-center">
                    <input v-model="item.quantity" type="number" min="0.01" step="0.01" class="inline-input w-16 text-center" />
                  </td>
                  <td v-if="settings.showUnit" class="px-3 py-2 border-r border-gray-300 text-center">
                    <input v-model="item.unit" class="inline-input w-20 text-center" />
                  </td>
                  <td class="px-3 py-2 border-r border-gray-300 text-center">
                    <input v-model="item.unitPrice" type="number" min="0" step="0.01" class="inline-input w-24 text-center" />
                  </td>
                  <td v-if="settings.vatEnabled" class="px-3 py-2 border-r border-gray-300 text-center">
                    <input
                      v-model="item.taxRate"
                      type="number"
                      min="0"
                      max="100"
                      class="inline-input w-16 text-center"
                      :disabled="!settings.vatPerLine"
                    />
                  </td>
                  <td class="px-3 py-2 text-center font-semibold">
                    {{ formatAmount(lineTotal(item)) }} {{ currencySymbol }}
                  </td>
                  <td class="px-2 py-2">
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
            <button class="action-icon" @click="$emit('add-item')">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <div class="w-full max-w-[360px] border border-gray-300">
            <div class="grid grid-cols-[1fr_120px] border-b border-gray-300">
              <div class="px-3 py-2" :class="cellBgClass">Total HT</div>
              <div class="px-3 py-2 text-right">{{ formatAmount(totals.subtotal) }} {{ currencySymbol }}</div>
            </div>
            <div v-if="settings.vatEnabled" class="grid grid-cols-[1fr_120px] border-b border-gray-300">
              <div class="px-3 py-2" :class="cellBgClass">Total TVA</div>
              <div class="px-3 py-2 text-right">{{ formatAmount(totals.taxTotal) }} {{ currencySymbol }}</div>
            </div>
            <div class="grid grid-cols-[1fr_120px]">
              <div class="px-3 py-2 font-semibold" :class="cellBgClass">Total TTC</div>
              <div class="px-3 py-2 text-right font-semibold">{{ formatAmount(totals.total) }} {{ currencySymbol }}</div>
            </div>
          </div>
        </div>

        <div class="max-w-[520px] space-y-1">
          <p class="text-[10px] uppercase text-gray-400">Notes</p>
          <textarea
            v-model="invoice.notes"
            rows="3"
            class="inline-input w-full bg-emerald-50 text-gray-600 resize-none"
          ></textarea>
        </div>

        <div class="max-w-[640px]">
          <textarea
            v-model="invoice.footerNote"
            rows="2"
            class="inline-input w-full text-[10px] text-gray-500 bg-emerald-50 resize-none"
          ></textarea>
        </div>

        <div class="flex justify-end text-[10px] text-gray-400">
          <span class="flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
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

const cellBgClass = computed(() => {
  const color = props.settings.cellColor
  if (color === 'blue') return 'bg-blue-50'
  if (color === 'beige') return 'bg-[#f2ece6]'
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

const sheetStyle = computed(() => ({
  aspectRatio: '210 / 297',
  fontFamily: props.settings.fontFamily || 'Poppins, sans-serif',
  '--accent-color': props.settings.primaryColor || '#2ECC71'
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
  const file = event.target.files?.[0]
  applyLogoFile(file)
}

const onLogoDrop = (event) => {
  const file = event.dataTransfer?.files?.[0]
  applyLogoFile(file)
}

const onDragStart = (event, itemId) => {
  draggingId.value = itemId
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', itemId)
  }
}

const onDragOver = (itemId) => {
  dragOverId.value = itemId
}

const onDrop = (itemId) => {
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
</style>
