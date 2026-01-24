<template>
  <div class="rounded-2xl border border-gray-200 bg-[#eef0f4] p-4">
    <div
      class="mx-auto w-full max-w-[520px] bg-white shadow-xl rounded-[12px] preview-sheet"
      :class="[templateClass, densityClass, cornerClass]"
      :style="sheetStyle"
    >
      <div class="h-full w-full p-6 sm:p-8 text-[11px] text-gray-700 preview-body">
        <div v-for="sectionId in orderedSections" :key="sectionId">
          <template v-if="sectionId === 'header'">
            <div class="flex items-start justify-between gap-6 preview-header" :class="headerLayoutClass">
              <div class="flex items-start gap-3">
                <div class="h-14 w-14 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img v-if="invoice.issuer.logo" :src="invoice.issuer.logo" alt="Logo" class="h-full w-full object-contain" />
                  <span v-else class="text-[10px] text-gray-400">Logo</span>
                </div>
                <div>
                  <p class="text-[12px] font-semibold text-gray-900">{{ invoice.issuer.name || 'Nom societe' }}</p>
                  <p>{{ invoice.issuer.address || 'Adresse entreprise' }}</p>
                  <p>{{ invoice.issuer.email }}</p>
                  <p>{{ invoice.issuer.phone }}</p>
                </div>
              </div>
              <div class="text-right preview-header-summary">
                <p class="text-[12px] font-semibold text-gray-900">Facture {{ invoice.number }}</p>
                <p>Date: {{ formatDate(invoice.issueDate) }}</p>
                <p>Echeance: {{ formatDate(invoice.dueDate) }}</p>
                <p>Devise: {{ invoice.currency }}</p>
              </div>
            </div>
            <div class="mt-5 border-t border-gray-200"></div>
          </template>

          <template v-else-if="sectionId === 'issuer_client'">
            <div class="mt-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p class="text-[10px] uppercase tracking-wide text-gray-400">Client</p>
              <p class="text-[12px] font-semibold text-gray-900">{{ invoice.client.name || 'Nom client' }}</p>
              <p>{{ invoice.client.address || 'Adresse client' }}</p>
              <p>{{ invoice.client.email }}</p>
            </div>
          </template>

          <template v-else-if="sectionId === 'items'">
            <div class="mt-5">
              <table class="min-w-full text-[10.5px] border border-gray-200 preview-table" :class="tableVariantClass">
                <thead class="bg-gray-100 text-gray-500 uppercase text-[9px] preview-table-head" :class="tableHeadClass">
                  <tr>
                    <th class="px-2 py-2 text-left font-semibold border-l border-gray-200 first:border-l-0">Description</th>
                    <th class="px-2 py-2 text-right font-semibold border-l border-gray-200">Qte</th>
                    <th class="px-2 py-2 text-right font-semibold border-l border-gray-200">PU</th>
                    <th class="px-2 py-2 text-right font-semibold border-l border-gray-200">TVA</th>
                    <th class="px-2 py-2 text-right font-semibold border-l border-gray-200">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="item in items" :key="item.id">
                    <td class="px-2 py-2 text-left text-gray-700 border-l border-gray-200 first:border-l-0">{{ item.description || 'Prestation' }}</td>
                    <td class="px-2 py-2 text-right border-l border-gray-200">{{ item.quantity }}</td>
                    <td class="px-2 py-2 text-right border-l border-gray-200">{{ formatAmount(item.unitPrice) }}</td>
                    <td class="px-2 py-2 text-right border-l border-gray-200">{{ item.taxRate }}%</td>
                    <td class="px-2 py-2 text-right font-semibold text-gray-900 border-l border-gray-200">
                      {{ formatAmount(lineTotal(item)) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <template v-else-if="sectionId === 'totals'">
            <div class="mt-5 flex justify-end">
              <div class="w-full max-w-[220px] space-y-2 text-[11px] preview-totals" :class="totalsVariantClass">
                <div class="flex items-center justify-between text-gray-600">
                  <span>Total HT</span>
                  <span class="font-medium text-gray-900">{{ formatAmount(totals.subtotal) }} {{ invoice.currency }}</span>
                </div>
                <div class="flex items-center justify-between text-gray-600">
                  <span>TVA</span>
                  <span class="font-medium text-gray-900">{{ formatAmount(totals.taxTotal) }} {{ invoice.currency }}</span>
                </div>
                <div class="flex items-center justify-between text-gray-900 border-t border-gray-200 pt-2 font-semibold">
                  <span>Total TTC</span>
                  <span>{{ formatAmount(totals.total) }} {{ invoice.currency }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="sectionId === 'notes'">
            <div class="mt-5">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 mb-1">Notes</p>
              <p class="text-[11px] text-gray-600 whitespace-pre-line">{{ invoice.notes || '-' }}</p>
            </div>
          </template>

          <template v-else-if="sectionId === 'payment'">
            <div class="mt-4">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 mb-1">Paiement</p>
              <p class="text-[11px] text-gray-600 whitespace-pre-line">{{ invoice.paymentInstructions || '-' }}</p>
            </div>
          </template>

          <template v-else-if="sectionId === 'footer'">
            <div class="mt-4">
              <p class="text-[10px] uppercase tracking-wide text-gray-400 mb-1">Conditions</p>
              <p class="text-[11px] text-gray-600 whitespace-pre-line">{{ invoice.terms || '-' }}</p>
            </div>
          </template>
        </div>
        <div v-if="signatureVisible" class="mt-6 flex justify-end text-[10px] text-gray-400 preview-signature" :class="signatureClass">
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
const props = defineProps({
  invoice: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  order: {
    type: Array,
    required: true
  },
  visibility: {
    type: Object,
    default: () => ({})
  },
  settings: {
    type: Object,
    default: () => ({})
  }
})

const orderedSections = computed(() => props.order.filter((id) => props.visibility?.[id] !== false))

const templateClass = computed(() => `template-${props.settings?.templateStyle || 'classic'}`)
const densityClass = computed(() => `density-${props.settings?.density || 'comfortable'}`)
const cornerClass = computed(() => `corners-${props.settings?.cornerStyle || 'rounded'}`)

const headerLayoutClass = computed(() => {
  if (props.settings?.headerStyle === 'stacked') return 'flex-col items-start'
  if (props.settings?.headerStyle === 'compact') return 'gap-3'
  return 'flex-row'
})

const tableVariantClass = computed(() => `table-${props.settings?.tableStyle || 'bordered'}`)
const tableHeadClass = computed(() => {
  if (props.settings?.tableStyle === 'minimal') return 'table-head-minimal'
  if (props.settings?.tableStyle === 'striped') return 'table-head-striped'
  return 'table-head-bordered'
})

const totalsVariantClass = computed(() => `totals-${props.settings?.totalsStyle || 'card'}`)
const signatureVisible = computed(() => props.settings?.signatureStyle !== 'none')
const signatureClass = computed(() => `signature-${props.settings?.signatureStyle || 'dot'}`)

const totals = computed(() => {
  let subtotal = 0
  let taxTotal = 0
  props.items.forEach((item) => {
    const quantity = Number(item.quantity || 0)
    const unitPrice = Number(item.unitPrice || 0)
    const taxRate = Number(item.taxRate || 0)
    const lineSubtotal = quantity * unitPrice
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
  const taxRate = Number(item.taxRate || 0)
  const subtotal = quantity * unitPrice
  return subtotal + subtotal * (taxRate / 100)
}

const formatAmount = (value) => {
  const numberValue = Number(value || 0)
  return numberValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const formatDate = (value) => {
  if (!value) return '--/--/----'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('fr-FR')
}

const sheetStyle = computed(() => ({
  aspectRatio: '210 / 297',
  fontFamily: props.settings?.fontFamily || 'Poppins, sans-serif',
  color: props.settings?.textColor || '#334155',
  backgroundColor: props.settings?.backgroundColor || '#ffffff',
  '--accent-color': props.settings?.primaryColor || '#2ECC71',
  '--secondary-color': props.settings?.secondaryColor || '#0A1F44'
}))
</script>

<style scoped>
.density-compact .preview-body {
  padding: 18px;
  font-size: 10px;
}

.corners-sharp .preview-sheet {
  border-radius: 6px !important;
}

.table-minimal {
  border-color: transparent !important;
}

.table-minimal th,
.table-minimal td {
  border-color: transparent !important;
}

.table-minimal .preview-table-head {
  background: transparent !important;
}

.table-striped tbody tr:nth-child(even) {
  background: rgba(15, 23, 42, 0.03);
}

.table-head-striped {
  background: rgba(15, 23, 42, 0.04) !important;
}

.totals-inline {
  border: none !important;
  background: transparent !important;
}

.totals-inline .border-t {
  border-color: transparent !important;
}

.template-banner .preview-header {
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
  color: #ffffff;
  padding: 14px;
  border-radius: 12px;
}

.template-banner .preview-header .text-gray-400,
.template-banner .preview-header .text-gray-600 {
  color: rgba(255, 255, 255, 0.8) !important;
}

.template-contrast .preview-header {
  background: #0f172a;
  color: #f8fafc;
  padding: 14px;
  border-radius: 12px;
}

.template-contrast .preview-header .text-gray-400,
.template-contrast .preview-header .text-gray-600 {
  color: rgba(248, 250, 252, 0.8) !important;
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
