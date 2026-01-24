<template>
  <div class="min-h-screen bg-[#f2f2f2]">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast.show"
        :class="[
          'fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2',
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        ]"
      >
        <span class="text-sm">{{ toast.message }}</span>
      </div>
    </Transition>

    <div class="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p class="text-sm text-gray-600">Creez, personnalisez et envoyez vos factures en toute simplicite.</p>
          <p v-if="loading" class="text-xs text-gray-400">Chargement...</p>
        </div>
        <div class="text-xs text-gray-500">
          <span v-if="lastSavedAt">Derniere sauvegarde: {{ lastSavedAt }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <InvoiceCanvas
          :invoice="invoice"
          :settings="settings"
          @add-meta-row="addMetaRow"
          @remove-meta-row="removeMetaRow"
          @add-issuer-field="addIssuerField"
          @remove-issuer-field="removeIssuerField"
          @add-client-field="addClientField"
          @remove-client-field="removeClientField"
          @add-item="addItem"
          @remove-item="removeItem"
          @duplicate-item="duplicateItem"
          @reorder-item="reorderItem"
          @upload-logo="uploadLogo"
        />
        <div class="space-y-4">
          <InvoiceQuickActions
            :number="invoice.number"
            :status="invoice.status"
            :invoice-id="invoiceId"
            :last-saved-at="lastSavedAt"
            :saving="saving"
            :sending="sending"
            :pdf-loading="pdfLoading"
            :auto-save="settings.autoSave"
            :is-premium="isPremium"
            @save="saveInvoice"
            @send="openSendModal"
            @preview-pdf="previewPdf"
          />
          <InvoiceSettingsPanel
            :settings="settings"
            :currencies="currencies"
            :currencies-loading="currenciesLoading"
            :templates="premiumTemplates"
            :selected-template-id="selectedTemplateId"
            :is-premium="isPremium"
            @download="downloadPdf"
            @apply-template="applyTemplate"
            @upgrade="() => showToast('Passez au plan Premium pour debloquer cette fonctionnalite.', 'error')"
          />
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="sendModal.open"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeSendModal"
      >
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md">
          <div class="p-6 space-y-4">
            <h3 class="text-lg font-semibold text-gray-900">Envoyer la facture</h3>
            <div class="space-y-2">
              <label class="text-xs text-gray-500">Email destinataire</label>
              <input v-model="sendModal.email" type="email" class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" />
            </div>
            <div class="space-y-2">
              <label class="text-xs text-gray-500">Message</label>
              <textarea v-model="sendModal.message" rows="4" class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"></textarea>
            </div>
            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                @click="closeSendModal"
              >
                Annuler
              </button>
              <button
                class="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                :disabled="sending"
                @click="sendInvoice"
              >
                {{ sending ? 'Envoi...' : 'Envoyer' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="previewModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="previewModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[94vh] overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-200">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Apercu instantane</h3>
              <p class="text-xs text-gray-500">Rendu identique au PDF final.</p>
            </div>
            <button
              class="text-sm text-gray-500 hover:text-gray-900"
              @click="previewModal = false"
            >
              Fermer
            </button>
          </div>
          <div class="p-6 overflow-y-auto max-h-[calc(94vh-72px)]">
            <InvoiceCanvas
              :invoice="invoice"
              :settings="settings"
              :preview="true"
            />
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'
import InvoiceCanvas from '~/components/invoices/InvoiceCanvas.vue'
import InvoiceSettingsPanel from '~/components/invoices/InvoiceSettingsPanel.vue'
import InvoiceQuickActions from '~/components/invoices/InvoiceQuickActions.vue'
import { useAuth } from '~/composables/useAuth'
import { useCurrencies } from '~/composables/useCurrencies'

const props = defineProps({
  invoiceId: {
    type: [String, Number],
    default: null
  }
})

const { token, user } = useAuth()
const { currencies, currenciesLoading } = useCurrencies()
const config = useRuntimeConfig()
const router = useRouter()

const invoiceId = ref(props.invoiceId)
const loading = ref(false)
const saving = ref(false)
const sending = ref(false)
const pdfLoading = ref(false)
const lastSavedAt = ref('')
const isReady = ref(false)

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const previewModal = ref(false)

const settings = reactive({
  vatEnabled: true,
  vatPerLine: true,
  showQuantity: true,
  showUnit: false,
  cellColor: 'gray',
  currency: 'EUR',
  currencyId: null,
  currencySymbol: '',
  countryCode: 'FR',
  vatRate: 20,
  autoSave: false,
  primaryColor: '#2ECC71',
  secondaryColor: '#0A1F44',
  fontFamily: 'Poppins',
  textColor: '#1F2937',
  backgroundColor: '#FFFFFF',
  templateStyle: 'classic',
  headerStyle: 'split',
  tableStyle: 'bordered',
  totalsStyle: 'card',
  density: 'comfortable',
  cornerStyle: 'rounded',
  signatureStyle: 'dot',
  patternStyle: 'none',
  accentStyle: 'none',
  watermarkStyle: 'none',
  watermarkText: '',
  layout: []
})

const premiumTemplates = [
  {
    id: 'leekpay-modern',
    name: 'LeekPay Modern',
    label: 'SaaS clean',
    primaryColor: '#0A1F44',
    secondaryColor: '#2ECC71',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    fontFamily: 'Poppins',
    cellColor: 'sage',
    templateStyle: 'classic',
    headerStyle: 'split',
    tableStyle: 'bordered',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'dot',
    patternStyle: 'none',
    accentStyle: 'top-bar',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'aurora-flow',
    name: 'Aurora Flow',
    label: 'Gradient soft',
    primaryColor: '#16A34A',
    secondaryColor: '#0F172A',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'Poppins',
    cellColor: 'sage',
    templateStyle: 'aurora',
    headerStyle: 'split',
    tableStyle: 'bordered',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'dot',
    patternStyle: 'dots',
    accentStyle: 'left-band',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'noir-executive',
    name: 'Noir Executive',
    label: 'Dark executive',
    primaryColor: '#111827',
    secondaryColor: '#374151',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'DejaVu Sans',
    cellColor: 'slate',
    templateStyle: 'noir',
    headerStyle: 'compact',
    tableStyle: 'minimal',
    totalsStyle: 'inline',
    density: 'compact',
    cornerStyle: 'sharp',
    signatureStyle: 'line',
    patternStyle: 'grid',
    accentStyle: 'top-bar',
    watermarkStyle: 'outline',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    label: 'Bold bandeau',
    primaryColor: '#1D4ED8',
    secondaryColor: '#0EA5E9',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'Poppins',
    cellColor: 'blue',
    templateStyle: 'banner',
    headerStyle: 'split',
    tableStyle: 'bordered',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'badge',
    patternStyle: 'lines',
    accentStyle: 'diagonal',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'copper-heritage',
    name: 'Copper Heritage',
    label: 'Editorial warm',
    primaryColor: '#7C2D12',
    secondaryColor: '#B45309',
    backgroundColor: '#FFF7ED',
    textColor: '#3F1D0B',
    fontFamily: 'DejaVu Sans',
    cellColor: 'amber',
    templateStyle: 'editorial',
    headerStyle: 'stacked',
    tableStyle: 'minimal',
    totalsStyle: 'inline',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'line',
    patternStyle: 'grid',
    accentStyle: 'top-bar',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'contrast-night',
    name: 'Contrast Night',
    label: 'High contrast',
    primaryColor: '#0F172A',
    secondaryColor: '#64748B',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'DejaVu Sans',
    cellColor: 'slate',
    templateStyle: 'contrast',
    headerStyle: 'split',
    tableStyle: 'striped',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'badge',
    patternStyle: 'dots',
    accentStyle: 'left-band',
    watermarkStyle: 'outline',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'paper-ledger',
    name: 'Paper Ledger',
    label: 'Ledger minimal',
    primaryColor: '#111827',
    secondaryColor: '#9CA3AF',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    fontFamily: 'DejaVu Sans',
    cellColor: 'gray',
    templateStyle: 'paper',
    headerStyle: 'stacked',
    tableStyle: 'minimal',
    totalsStyle: 'inline',
    density: 'compact',
    cornerStyle: 'sharp',
    signatureStyle: 'dot',
    patternStyle: 'grid',
    accentStyle: 'none',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'studio-sage',
    name: 'Studio Sage',
    label: 'Soft studio',
    primaryColor: '#0F766E',
    secondaryColor: '#5EEAD4',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'Poppins',
    cellColor: 'sage',
    templateStyle: 'classic',
    headerStyle: 'compact',
    tableStyle: 'striped',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'dot',
    patternStyle: 'lines',
    accentStyle: 'top-bar',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'rose-atelier',
    name: 'Rose Atelier',
    label: 'Soft contrast',
    primaryColor: '#BE185D',
    secondaryColor: '#F472B6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontFamily: 'Poppins',
    cellColor: 'rose',
    templateStyle: 'aurora',
    headerStyle: 'split',
    tableStyle: 'bordered',
    totalsStyle: 'card',
    density: 'comfortable',
    cornerStyle: 'rounded',
    signatureStyle: 'badge',
    patternStyle: 'dots',
    accentStyle: 'diagonal',
    watermarkStyle: 'subtle',
    watermarkText: 'LeekPay Premium'
  },
  {
    id: 'minimal-cloud',
    name: 'Minimal Cloud',
    label: 'Ultra clean',
    primaryColor: '#334155',
    secondaryColor: '#94A3B8',
    backgroundColor: '#F8FAFC',
    textColor: '#0F172A',
    fontFamily: 'DejaVu Sans',
    cellColor: 'slate',
    templateStyle: 'minimal',
    headerStyle: 'compact',
    tableStyle: 'minimal',
    totalsStyle: 'inline',
    density: 'compact',
    cornerStyle: 'sharp',
    signatureStyle: 'none',
    patternStyle: 'none',
    accentStyle: 'none',
    watermarkStyle: 'none',
    watermarkText: ''
  }
]

const normalizeColor = (value) => String(value || '').trim().toLowerCase()
const normalizeFont = (value) => String(value || '').split(',')[0].trim().toLowerCase()

// Temporary: premium access is always enabled; backend gating will be added later.
const isPremium = computed(() => true)

const selectedTemplateId = computed(() => {
  const match = premiumTemplates.find((template) => (
    normalizeColor(template.primaryColor) === normalizeColor(settings.primaryColor) &&
    normalizeColor(template.secondaryColor) === normalizeColor(settings.secondaryColor) &&
    normalizeColor(template.backgroundColor) === normalizeColor(settings.backgroundColor) &&
    normalizeColor(template.textColor) === normalizeColor(settings.textColor) &&
    normalizeFont(template.fontFamily) === normalizeFont(settings.fontFamily) &&
    (template.templateStyle || 'classic') === (settings.templateStyle || 'classic') &&
    (template.tableStyle || 'bordered') === (settings.tableStyle || 'bordered')
  ))
  return match?.id || ''
})

const appliedTemplate = computed(() => premiumTemplates.find((template) => template.id === selectedTemplateId.value))
const appliedTemplateLabel = computed(() => appliedTemplate.value?.name || 'Personnalise')
const appliedTemplateSlug = computed(() => appliedTemplate.value?.id || 'personnalise')

const applyTemplate = (template) => {
  if (!template) return
  if (!isPremium.value) {
    showToast('Option reservee aux abonnements premium.', 'error')
    return
  }
  settings.primaryColor = template.primaryColor
  settings.secondaryColor = template.secondaryColor
  settings.backgroundColor = template.backgroundColor
  settings.textColor = template.textColor
  settings.fontFamily = template.fontFamily
  if (template.cellColor) {
    settings.cellColor = template.cellColor
  }
  if (template.templateStyle) settings.templateStyle = template.templateStyle
  if (template.headerStyle) settings.headerStyle = template.headerStyle
  if (template.tableStyle) settings.tableStyle = template.tableStyle
  if (template.totalsStyle) settings.totalsStyle = template.totalsStyle
  if (template.density) settings.density = template.density
  if (template.cornerStyle) settings.cornerStyle = template.cornerStyle
  if (template.signatureStyle) settings.signatureStyle = template.signatureStyle
  if (template.patternStyle) settings.patternStyle = template.patternStyle
  if (template.accentStyle) settings.accentStyle = template.accentStyle
  if (template.watermarkStyle) settings.watermarkStyle = template.watermarkStyle
  if (Object.prototype.hasOwnProperty.call(template, 'watermarkText')) {
    settings.watermarkText = template.watermarkText
  }
  showToast(`Modele "${template.name}" applique. Il sera utilise au telechargement.`, 'success')
}


const defaultIssueDate = new Date().toISOString().slice(0, 10)

const invoice = reactive({
  number: '',
  status: 'draft',
  currency: 'EUR',
  metaRows: [
    { id: 'meta-1', label: 'Date de facture', value: defaultIssueDate },
    { id: 'meta-2', label: 'Date de livraison', value: '' },
    { id: 'meta-3', label: 'Echeance de paiement', value: '' }
  ],
  issuer: {
    name: '',
    address: '',
    zip: '',
    city: '',
    logo: '',
    fields: [
      { id: 'issuer-1', label: 'Email', value: '' },
      { id: 'issuer-2', label: 'Tel', value: '' },
      { id: 'issuer-3', label: 'N TVA', value: '' }
    ]
  },
  client: {
    name: '',
    address: '',
    zip: '',
    city: '',
    fields: [
      { id: 'client-1', label: 'Email', value: '' },
      { id: 'client-2', label: 'Tel', value: '' }
    ]
  },
  items: [
    {
      id: 'item-1',
      title: '',
      description: '',
      quantity: '',
      unit: '',
      unitPrice: '',
      taxRate: ''
    }
  ],
  notes: '',
  footerNote: ''
})


const sendModal = reactive({
  open: false,
  email: '',
  message: ''
})


const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const normalizeLabel = (label) => String(label || '').toLowerCase().replace(/[^a-z0-9]/g, '')

const cleanValue = (value, placeholders = []) => {
  const str = String(value || '').trim()
  if (!str) return ''
  const normalized = str.toLowerCase()
  if (placeholders.some((placeholder) => normalized === placeholder.toLowerCase())) return ''
  return str
}

const optionalValue = (value) => {
  const str = String(value || '').trim()
  return str ? str : null
}

const placeholders = {
  issuerName: 'Votre nom / societe',
  issuerAddress: 'Adresse',
  issuerZip: 'Code postal',
  issuerCity: 'Ville',
  clientName: 'Nom client',
  clientAddress: 'Adresse',
  clientZip: 'Code postal',
  clientCity: 'Ville'
}

const getFieldValue = (fields, keywords) => {
  const match = fields.find((field) => keywords.some((word) => normalizeLabel(field.label).includes(word)))
  return match?.value || ''
}

const upsertField = (fields, label, value) => {
  const match = fields.find((field) => normalizeLabel(field.label) === normalizeLabel(label))
  if (match) {
    match.value = value || ''
  } else if (value) {
    fields.push({ id: `${label}-${Date.now()}`, label, value })
  }
}

const buildAddress = (address, zip, city) => {
  const parts = []
  if (address) parts.push(address)
  const line2 = [zip, city].filter(Boolean).join(' ')
  if (line2) parts.push(line2)
  return parts.join('\n')
}

const resolveLogoUrl = (url) => {
  if (!url) return ''
  const raw = String(url)
  if (raw.startsWith('http')) return raw
  const base = String(config.public.apiBaseURL || '').replace(/\/$/, '').replace(/\/api$/, '')
  const cleaned = raw.replace(/^\/+/, '')
  const storagePath = cleaned.startsWith('storage/')
    ? cleaned
    : (cleaned.startsWith('invoice-settings/') || cleaned.startsWith('logos/') || cleaned.startsWith('uploads/'))
      ? `storage/${cleaned}`
      : cleaned
  return `${base}/${storagePath}`
}

const parseAddress = (address) => {
  if (!address) return { address: '', zip: '', city: '' }
  const parts = String(address).split('\n')
  const line1 = parts[0] || ''
  const line2 = parts[1] || ''
  const match = line2.match(/^(\d{4,6})\s*(.*)$/)
  return {
    address: line1,
    zip: match ? match[1] : '',
    city: match ? match[2] : line2
  }
}

const splitAddressLines = (value) => {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

const getMetaRowValue = (keyword) => {
  const row = invoice.metaRows.find((entry) => normalizeLabel(entry.label).includes(keyword))
  return row?.value || ''
}

const getMetaRowValueById = (id) => {
  return invoice.metaRows.find((entry) => entry.id === id)?.value || ''
}

const getMetaValue = (id, keyword) => {
  return getMetaRowValueById(id) || getMetaRowValue(keyword)
}

const normalizeDate = (value) => {
  if (!value) return ''
  const str = String(value)
  if (str.length >= 10) return str.slice(0, 10)
  return str
}

const lineTotal = (item) => {
  const quantity = Number(item.quantity || 0)
  const unitPrice = Number(item.unitPrice || 0)
  const lineSubtotal = quantity * unitPrice
  const taxRate = settings.vatEnabled
    ? (settings.vatPerLine ? Number(item.taxRate || 0) : Number(settings.vatRate || 0))
    : 0
  return lineSubtotal + lineSubtotal * (taxRate / 100)
}

const totals = computed(() => {
  let subtotal = 0
  let taxTotal = 0
  invoice.items.forEach((item) => {
    const quantity = Number(item.quantity || 0)
    const unitPrice = Number(item.unitPrice || 0)
    const lineSubtotal = quantity * unitPrice
    const taxRate = settings.vatEnabled
      ? (settings.vatPerLine ? Number(item.taxRate || 0) : Number(settings.vatRate || 0))
      : 0
    subtotal += lineSubtotal
    taxTotal += lineSubtotal * (taxRate / 100)
  })
  return { subtotal, taxTotal, total: subtotal + taxTotal }
})

const currencyMap = computed(() => {
  const map = {}
  currencies.value.forEach((currency) => {
    if (currency?.code) {
      map[currency.code] = currency
    }
  })
  return map
})

const buildItemDescription = (item) => {
  const title = String(item.title || '').trim()
  const description = String(item.description || '').trim()
  const combined = [title, description].filter(Boolean).join('\n')
  return combined.slice(0, 255)
}

const validateInvoice = () => {
  const issues = []
  const issueDate = normalizeDate(getMetaValue('meta-1', 'facture'))
  const dueDate = normalizeDate(getMetaValue('meta-3', 'echeance'))
  const clientName = cleanValue(invoice.client.name, [placeholders.clientName])

  if (!issueDate) issues.push('Date de facture requise')
  if (!clientName) issues.push('Nom client requis')
  if (issueDate && dueDate && dueDate < issueDate) {
    issues.push('Echeance invalide (avant la date de facture)')
  }
  if (!invoice.items.length) issues.push('Ajoutez au moins un article')

  invoice.items.forEach((item, index) => {
    const description = buildItemDescription(item)
    const quantity = Number(item.quantity || 0)
    const unitPrice = Number(item.unitPrice || 0)

    if (!description) issues.push(`Article ${index + 1}: description requise`)
    if (Number.isNaN(quantity) || quantity < 0.01) issues.push(`Article ${index + 1}: quantite minimale 0,01`)
    if (Number.isNaN(unitPrice) || unitPrice < 0) issues.push(`Article ${index + 1}: prix unitaire invalide`)
  })

  return issues
}

const authHeaders = computed(() => {
  const headers = {}
  if (token.value) headers.Authorization = `Bearer ${token.value}`
  return headers
})

const loadSettings = async () => {
  try {
    const response = await $fetch('/invoices/settings', {
      baseURL: config.public.apiBaseURL,
      headers: authHeaders.value
    })
    const data = response.data || response
    if (!data) return

    settings.currency = data.currency || data.default_currency || user.value?.currency?.code || settings.currency
    settings.currencyId = data.currency_id || settings.currencyId || user.value?.currency?.id || null
    settings.countryCode = data.country_code || settings.countryCode
    if (Array.isArray(data.default_layout)) {
      settings.layout = data.default_layout.filter((section) => section !== 'payment')
    }
    const theme = data.theme || data.default_theme || {}
    settings.primaryColor = theme.primary_color || theme.primaryColor || data.theme_primary_color || settings.primaryColor
    settings.secondaryColor = theme.secondary_color || theme.secondaryColor || data.theme_secondary_color || settings.secondaryColor
    settings.fontFamily = theme.font_family || theme.fontFamily || data.theme_font_family || settings.fontFamily
    settings.textColor = theme.text_color || theme.textColor || settings.textColor
    settings.backgroundColor = theme.background_color || theme.backgroundColor || settings.backgroundColor
    settings.templateStyle = theme.template_style || theme.templateStyle || settings.templateStyle
    settings.headerStyle = theme.header_style || theme.headerStyle || settings.headerStyle
    settings.tableStyle = theme.table_style || theme.tableStyle || settings.tableStyle
    settings.totalsStyle = theme.totals_style || theme.totalsStyle || settings.totalsStyle
    settings.density = theme.density || settings.density
    settings.cornerStyle = theme.corner_style || theme.cornerStyle || settings.cornerStyle
    settings.signatureStyle = theme.signature_style || theme.signatureStyle || settings.signatureStyle
    const currencyItem = currencyMap.value[settings.currency]
    if (currencyItem) {
      settings.currencyId = currencyItem.id || settings.currencyId
      settings.currencySymbol = currencyItem.symbol || settings.currencySymbol
    }

    if (!invoiceId.value) {
      invoice.issuer.name = data.issuer_name || data.company_name || data.name || invoice.issuer.name
      const issuerAddressRaw = [data.address_line1, data.address_line2]
        .filter(Boolean)
        .join('\n') || data.issuer_address || data.company_address || data.address || buildAddress(data.address_line1, data.postal_code, data.city)
      invoice.issuer.address = parseAddress(issuerAddressRaw || '').address || invoice.issuer.address
      const issuerAddressParts = parseAddress(issuerAddressRaw || '')
      invoice.issuer.zip = data.postal_code || issuerAddressParts.zip || invoice.issuer.zip
      invoice.issuer.city = data.city || issuerAddressParts.city || invoice.issuer.city
      upsertField(invoice.issuer.fields, 'Email', data.issuer_email || data.company_email || data.email)
      upsertField(invoice.issuer.fields, 'Tel', data.issuer_phone || data.company_phone || data.phone)
      upsertField(invoice.issuer.fields, 'N TVA', data.issuer_tax_id || data.company_tax_id || data.tax_id)

      if (data.numbering_prefix || data.numbering_next_number || data.number_prefix || data.next_number) {
        const prefix = data.numbering_prefix || data.number_prefix || ''
        const padding = Number(data.numbering_padding || data.number_padding || 0)
        const nextNumber = Number(data.numbering_next_number || data.next_number || 1)
        const padded = String(nextNumber).padStart(padding || 0, '0')
        invoice.number = `${prefix}${padded}` || invoice.number
      }

      invoice.footerNote = data.default_terms || data.terms || invoice.footerNote
      invoice.notes = data.default_notes || data.notes || invoice.notes
    }

    const issueRow = invoice.metaRows.find((row) => row.id === 'meta-1')
    if (issueRow && !issueRow.value) {
      issueRow.value = defaultIssueDate
    }

    const logoCandidate =
      data.logo_url ||
      data.logo_path ||
      data.logo ||
      data.company_logo ||
      data.issuer_logo ||
      data.issuer_logo_path
    if (logoCandidate && !invoice.issuer.logo) {
      invoice.issuer.logo = resolveLogoUrl(logoCandidate)
    }
  } catch (err) {
    console.error('Erreur chargement settings facture:', err)
  }
}

const loadInvoice = async () => {
  if (!invoiceId.value) return
  loading.value = true
  try {
    const response = await $fetch(`/invoices/${invoiceId.value}`, {
      baseURL: config.public.apiBaseURL,
      headers: authHeaders.value
    })
    const data = response.data || response
    if (!data) return

    invoice.number = data.number || data.invoice_number || invoice.number
    invoice.status = data.status || invoice.status
    const currencyCode = data.currency?.code || data.currency || settings.currency
    invoice.currency = currencyCode
    settings.currency = currencyCode
    settings.currencyId = data.currency_id || data.currency?.id || settings.currencyId || user.value?.currency?.id || null
    const theme = data.theme || {}
    settings.primaryColor = theme.primaryColor || theme.primary_color || settings.primaryColor
    settings.secondaryColor = theme.secondaryColor || theme.secondary_color || settings.secondaryColor
    settings.fontFamily = theme.fontFamily || theme.font_family || settings.fontFamily
    settings.textColor = theme.textColor || theme.text_color || settings.textColor
    settings.backgroundColor = theme.backgroundColor || theme.background_color || settings.backgroundColor
    settings.templateStyle = theme.templateStyle || theme.template_style || settings.templateStyle
    settings.headerStyle = theme.headerStyle || theme.header_style || settings.headerStyle
    settings.tableStyle = theme.tableStyle || theme.table_style || settings.tableStyle
    settings.totalsStyle = theme.totalsStyle || theme.totals_style || settings.totalsStyle
    settings.density = theme.density || settings.density
    settings.cornerStyle = theme.cornerStyle || theme.corner_style || settings.cornerStyle
    settings.signatureStyle = theme.signatureStyle || theme.signature_style || settings.signatureStyle
    settings.patternStyle = theme.patternStyle || theme.pattern_style || settings.patternStyle
    settings.accentStyle = theme.accentStyle || theme.accent_style || settings.accentStyle
    settings.watermarkStyle = theme.watermarkStyle || theme.watermark_style || settings.watermarkStyle
    settings.watermarkText = theme.watermarkText || theme.watermark_text || settings.watermarkText
    if (theme.cellColor || theme.cell_color) {
      settings.cellColor = theme.cellColor || theme.cell_color
    }
    if (Object.prototype.hasOwnProperty.call(theme, 'showQuantity') || Object.prototype.hasOwnProperty.call(theme, 'show_quantity')) {
      settings.showQuantity = Boolean(theme.showQuantity ?? theme.show_quantity)
    }
    if (Object.prototype.hasOwnProperty.call(theme, 'showUnit') || Object.prototype.hasOwnProperty.call(theme, 'show_unit')) {
      settings.showUnit = Boolean(theme.showUnit ?? theme.show_unit)
    }
    if (Object.prototype.hasOwnProperty.call(theme, 'vatEnabled') || Object.prototype.hasOwnProperty.call(theme, 'vat_enabled')) {
      settings.vatEnabled = Boolean(theme.vatEnabled ?? theme.vat_enabled)
    }
    if (Object.prototype.hasOwnProperty.call(theme, 'vatPerLine') || Object.prototype.hasOwnProperty.call(theme, 'vat_per_line')) {
      settings.vatPerLine = Boolean(theme.vatPerLine ?? theme.vat_per_line)
    }
    if (Object.prototype.hasOwnProperty.call(theme, 'vatRate') || Object.prototype.hasOwnProperty.call(theme, 'vat_rate')) {
      settings.vatRate = Number(theme.vatRate ?? theme.vat_rate ?? settings.vatRate)
    }
    const currencyItem = currencyMap.value[currencyCode]
    if (currencyItem) {
      settings.currencyId = currencyItem.id || settings.currencyId
      settings.currencySymbol = currencyItem.symbol || settings.currencySymbol
    }
    if (Array.isArray(data.layout)) {
      settings.layout = data.layout.filter((section) => section !== 'payment')
    }

    const savedMetaRows = theme.metaRows || theme.meta_rows
    if (Array.isArray(savedMetaRows) && savedMetaRows.length) {
      invoice.metaRows = savedMetaRows.map((row, index) => ({
        id: row.id || `meta-${index + 1}`,
        label: row.label || '',
        value: row.value || ''
      }))
    } else {
      invoice.metaRows = [
        { id: 'meta-1', label: 'Date de facture', value: normalizeDate(data.issue_date) || defaultIssueDate },
        { id: 'meta-2', label: 'Date de livraison', value: normalizeDate(data.delivery_date) },
        { id: 'meta-3', label: 'Echeance de paiement', value: normalizeDate(data.due_date) }
      ]
    }

    const issuerAddressRaw = [data.issuer_address_line1, data.issuer_address_line2]
      .filter(Boolean)
      .join('\n') || data.issuer_address
    const issuerAddress = parseAddress(issuerAddressRaw)
    invoice.issuer.address = issuerAddress.address || invoice.issuer.address
    invoice.issuer.zip = data.issuer_postal_code || issuerAddress.zip || invoice.issuer.zip
    invoice.issuer.city = data.issuer_city || issuerAddress.city || invoice.issuer.city
    invoice.issuer.name = data.issuer_name || invoice.issuer.name

    const clientAddressRaw = [data.client_address_line1, data.client_address_line2]
      .filter(Boolean)
      .join('\n') || data.client_address
    const clientAddress = parseAddress(clientAddressRaw)
    invoice.client.address = clientAddress.address || invoice.client.address
    invoice.client.zip = data.client_postal_code || clientAddress.zip || invoice.client.zip
    invoice.client.city = data.client_city || clientAddress.city || invoice.client.city
    invoice.client.name = data.client_name || invoice.client.name

    const savedIssuerFields = theme.issuerFields || theme.issuer_fields
    if (Array.isArray(savedIssuerFields) && savedIssuerFields.length) {
      invoice.issuer.fields = savedIssuerFields.map((field, index) => ({
        id: field.id || `issuer-${index + 1}`,
        label: field.label || 'Libelle',
        value: field.value || ''
      }))
    } else {
      upsertField(invoice.issuer.fields, 'Email', data.issuer_email)
      upsertField(invoice.issuer.fields, 'Tel', data.issuer_phone)
      upsertField(invoice.issuer.fields, 'N TVA', data.issuer_tax_id)
    }

    const savedClientFields = theme.clientFields || theme.client_fields
    if (Array.isArray(savedClientFields) && savedClientFields.length) {
      invoice.client.fields = savedClientFields.map((field, index) => ({
        id: field.id || `client-${index + 1}`,
        label: field.label || 'Libelle',
        value: field.value || ''
      }))
    } else {
      upsertField(invoice.client.fields, 'Email', data.client_email)
      upsertField(invoice.client.fields, 'Tel', data.client_phone)
    }

    invoice.items = Array.isArray(data.items)
      ? data.items.map((item, index) => {
          const parts = String(item.description || '').split('\n')
          return {
            id: item.id || `item-${index}`,
            title: parts[0] || 'Titre prestation',
            description: parts.slice(1).join('\n') || '',
            quantity: item.quantity ?? 1,
            unit: item.unit || '',
            unitPrice: item.unit_price ?? 0,
            taxRate: item.tax_rate ?? settings.vatRate
          }
        })
      : invoice.items

    invoice.footerNote = data.terms || invoice.footerNote
    invoice.notes = data.notes || invoice.notes
    const logoCandidate =
      data.issuer_logo ||
      data.issuer_logo_path ||
      data.logo_url ||
      data.logo_path ||
      data.logo ||
      data.company_logo
    if (logoCandidate) {
      invoice.issuer.logo = resolveLogoUrl(logoCandidate)
    }

    if (data.updated_at) {
      lastSavedAt.value = new Date(data.updated_at).toLocaleString('fr-FR')
    }
  } catch (err) {
    console.error('Erreur chargement facture:', err)
    showToast('Impossible de charger la facture', 'error')
  } finally {
    loading.value = false
  }
}

const buildPayload = () => {
  const issuerEmail = optionalValue(getFieldValue(invoice.issuer.fields, ['email']))
  const issuerPhone = optionalValue(getFieldValue(invoice.issuer.fields, ['tel', 'telephone']))
  const issuerTax = optionalValue(getFieldValue(invoice.issuer.fields, ['tva']))

  const clientEmail = optionalValue(getFieldValue(invoice.client.fields, ['email']))
  const clientPhone = optionalValue(getFieldValue(invoice.client.fields, ['tel', 'telephone']))
  const issueDate = normalizeDate(getMetaValue('meta-1', 'facture'))
  const dueDate = normalizeDate(getMetaValue('meta-3', 'echeance'))

  const issuerName = cleanValue(invoice.issuer.name, [placeholders.issuerName])
  const issuerAddress = cleanValue(invoice.issuer.address, [placeholders.issuerAddress])
  const issuerZip = cleanValue(invoice.issuer.zip, [placeholders.issuerZip])
  const issuerCity = cleanValue(invoice.issuer.city, [placeholders.issuerCity])

  const clientName = cleanValue(invoice.client.name, [placeholders.clientName])
  const clientAddress = cleanValue(invoice.client.address, [placeholders.clientAddress])
  const clientZip = cleanValue(invoice.client.zip, [placeholders.clientZip])
  const clientCity = cleanValue(invoice.client.city, [placeholders.clientCity])

  const issuerAddressLines = splitAddressLines(issuerAddress)
  const clientAddressLines = splitAddressLines(clientAddress)
  const layout = (settings.layout?.length ? settings.layout : ['header', 'issuer_client', 'items', 'totals', 'notes', 'footer'])
    .filter((section) => section !== 'payment')
  const currencyItem = currencyMap.value[settings.currency]
  const currencyId = settings.currencyId || currencyItem?.id || user.value?.currency?.id || null

  return {
    status: invoice.status || 'draft',
    issue_date: issueDate || null,
    due_date: dueDate || null,
    currency_id: currencyId,
    client_name: clientName || null,
    client_email: clientEmail,
    client_phone: clientPhone,
    client_address_line1: clientAddressLines[0] || null,
    client_address_line2: clientAddressLines.slice(1).join(' ') || null,
    client_city: clientCity || null,
    client_state: null,
    client_postal_code: clientZip || null,
    client_country_code: settings.countryCode || 'FR',
    issuer_name: issuerName || null,
    issuer_email: issuerEmail,
    issuer_phone: issuerPhone,
    issuer_tax_id: issuerTax,
    issuer_address_line1: issuerAddressLines[0] || null,
    issuer_address_line2: issuerAddressLines.slice(1).join(' ') || null,
    issuer_city: issuerCity || null,
    issuer_state: null,
    issuer_postal_code: issuerZip || null,
    issuer_country_code: settings.countryCode || 'FR',
    items: invoice.items.map((item, index) => ({
      description: buildItemDescription(item),
      quantity: Number(item.quantity || 0),
      unit: settings.showUnit ? item.unit : '',
      unit_price: Number(item.unitPrice || 0),
      tax_rate: settings.vatEnabled
        ? (settings.vatPerLine ? Number(item.taxRate || 0) : Number(settings.vatRate || 0))
        : 0,
      position: index + 1
    })),
    notes: invoice.notes || '',
    terms: invoice.footerNote || '',
    layout,
    theme: {
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      backgroundColor: settings.backgroundColor,
      textColor: settings.textColor,
      fontFamily: settings.fontFamily,
      templateStyle: settings.templateStyle,
      headerStyle: settings.headerStyle,
      tableStyle: settings.tableStyle,
      totalsStyle: settings.totalsStyle,
      density: settings.density,
      cornerStyle: settings.cornerStyle,
      signatureStyle: settings.signatureStyle,
      cellColor: settings.cellColor,
      patternStyle: settings.patternStyle,
      accentStyle: settings.accentStyle,
      watermarkStyle: settings.watermarkStyle,
      watermarkText: settings.watermarkText,
      showQuantity: settings.showQuantity,
      showUnit: settings.showUnit,
      vatEnabled: settings.vatEnabled,
      vatPerLine: settings.vatPerLine,
      vatRate: settings.vatRate,
      metaRows: invoice.metaRows.map((row) => ({
        id: row.id,
        label: row.label,
        value: row.value
      })),
      issuerFields: invoice.issuer.fields.map((field) => ({
        id: field.id,
        label: field.label,
        value: field.value
      })),
      clientFields: invoice.client.fields.map((field) => ({
        id: field.id,
        label: field.label,
        value: field.value
      }))
    }
  }
}

const saveInvoice = async (options = {}) => {
  if (saving.value) return
  if (!token.value) {
    showToast('Connexion requise pour sauvegarder', 'error')
    return
  }
  const issues = validateInvoice()
  if (issues.length) {
    if (!options.silent) {
      showToast(issues[0], 'error')
    }
    return
  }
  saving.value = true
  try {
    const payload = buildPayload()
    const response = await $fetch(invoiceId.value ? `/invoices/${invoiceId.value}` : '/invoices', {
      method: invoiceId.value ? 'PUT' : 'POST',
      baseURL: config.public.apiBaseURL,
      headers: authHeaders.value,
      body: payload
    })
    const data = response.data || response
    if (data?.id && !invoiceId.value) {
      invoiceId.value = data.id
      router.push(`/dashboard/invoices/${data.id}`)
    }
    if (data?.number || data?.invoice_number) {
      invoice.number = data.number || data.invoice_number
    }
    if (data?.status) invoice.status = data.status
    lastSavedAt.value = new Date().toLocaleString('fr-FR')
    if (!options.silent) showToast('Facture sauvegardee')
  } catch (err) {
    console.error('Erreur sauvegarde facture:', err)
    const errors = err?.data?.errors
    if (errors && typeof errors === 'object') {
      const first = Object.values(errors).flat().find(Boolean)
      showToast(first || err?.data?.message || 'Erreur lors de la sauvegarde', 'error')
    } else {
      showToast(err?.data?.message || 'Erreur lors de la sauvegarde', 'error')
    }
  } finally {
    saving.value = false
  }
}

const previewPdf = () => {
  if (!isPremium.value) {
    showToast('Apercu instantane reserve au plan Premium.', 'error')
    return
  }
  previewModal.value = true
}

const downloadPdf = async () => {
  if (!isPremium.value) {
    showToast('Le telechargement PDF est reserve au plan Premium.', 'error')
    return
  }
  if (!invoiceId.value) {
    showToast('Sauvegardez la facture avant de telecharger le PDF.', 'error')
    return
  }
  pdfLoading.value = true
  try {
    await saveInvoice({ silent: true })
    const response = await fetch(`${config.public.apiBaseURL}/invoices/${invoiceId.value}/pdf?refresh=1`, {
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : '',
        Accept: 'application/pdf'
      }
    })
    if (!response.ok) throw new Error('PDF error')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `facture-${invoice.number || invoiceId.value}-${appliedTemplateSlug.value}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => window.URL.revokeObjectURL(url), 1500)
    showToast(`Telechargement en cours (modele: ${appliedTemplateLabel.value}).`)
  } catch (err) {
    console.error('Erreur download PDF:', err)
    showToast('Erreur lors du telechargement', 'error')
  } finally {
    pdfLoading.value = false
  }
}

const uploadLogo = async (file) => {
  if (!file) return
  if (!token.value) {
    showToast('Connexion requise pour mettre a jour le logo', 'error')
    return
  }
  try {
    const body = new FormData()
    body.append('logo', file)
    body.append('_method', 'PUT')

    const response = await $fetch('/invoices/settings', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: authHeaders.value,
      body
    })
    const data = response.data || response
    const logoCandidate =
      data?.logo_url ||
      data?.logo_path ||
      data?.logo ||
      data?.company_logo ||
      data?.issuer_logo ||
      data?.issuer_logo_path
    if (logoCandidate) {
      invoice.issuer.logo = resolveLogoUrl(logoCandidate)
    }
    showToast('Logo mis a jour')
  } catch (err) {
    console.error('Erreur upload logo:', err)
    showToast(err?.data?.message || 'Erreur lors de la mise a jour du logo', 'error')
  }
}

const openSendModal = () => {
  if (!isPremium.value) {
    showToast('L\'envoi de facture est reserve au plan Premium.', 'error')
    return
  }
  if (!invoiceId.value) {
    showToast('Sauvegardez d\'abord la facture', 'error')
    return
  }
  const clientEmail = getFieldValue(invoice.client.fields, ['email'])
  sendModal.email = clientEmail
  sendModal.open = true
}

const closeSendModal = () => {
  sendModal.open = false
  sendModal.message = ''
}

const sendInvoice = async () => {
  if (!invoiceId.value) return
  sending.value = true
  try {
    await $fetch(`/invoices/${invoiceId.value}/send`, {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: authHeaders.value,
      body: {
        recipient_email: sendModal.email || undefined,
        message: sendModal.message || undefined
      }
    })
    showToast('Facture envoyee')
    closeSendModal()
  } catch (err) {
    console.error('Erreur envoi facture:', err)
    showToast(err?.data?.message || 'Erreur lors de l\'envoi', 'error')
  } finally {
    sending.value = false
  }
}

const addMetaRow = () => {
  const id = `meta-${Date.now()}`
  invoice.metaRows.push({
    id,
    label: 'Nouvelle ligne',
    value: ''
  })
}

const removeMetaRow = (id) => {
  const index = invoice.metaRows.findIndex((row) => row.id === id)
  if (index === -1) return
  invoice.metaRows.splice(index, 1)
}

const addIssuerField = () => {
  const id = `issuer-${Date.now()}`
  invoice.issuer.fields.push({ id, label: 'Libelle', value: '' })
}

const removeIssuerField = (id) => {
  const index = invoice.issuer.fields.findIndex((field) => field.id === id)
  if (index === -1) return
  invoice.issuer.fields.splice(index, 1)
}

const addClientField = () => {
  const id = `client-${Date.now()}`
  invoice.client.fields.push({ id, label: 'Libelle', value: '' })
}

const removeClientField = (id) => {
  const index = invoice.client.fields.findIndex((field) => field.id === id)
  if (index === -1) return
  invoice.client.fields.splice(index, 1)
}

const addItem = () => {
  const id = `item-${Date.now()}`
  invoice.items.push({
    id,
    title: 'Titre prestation',
    description: 'Description prestation',
    quantity: 1,
    unit: '',
    unitPrice: 0,
    taxRate: settings.vatRate
  })
}

const duplicateItem = (id) => {
  const item = invoice.items.find((entry) => entry.id === id)
  if (!item) return
  const copy = { ...item, id: `item-${Date.now()}` }
  invoice.items.push(copy)
}

const removeItem = (id) => {
  const index = invoice.items.findIndex((item) => item.id === id)
  if (index === -1) return
  invoice.items.splice(index, 1)
}

const reorderItem = ({ from, to }) => {
  const fromIndex = invoice.items.findIndex((item) => item.id === from)
  const toIndex = invoice.items.findIndex((item) => item.id === to)
  if (fromIndex === -1 || toIndex === -1) return
  const updated = [...invoice.items]
  const [moved] = updated.splice(fromIndex, 1)
  updated.splice(toIndex, 0, moved)
  invoice.items.splice(0, invoice.items.length, ...updated)
}

watch(
  () => settings.currency,
  (value) => {
    invoice.currency = value
    const currencyItem = currencyMap.value[value]
    if (currencyItem) {
      settings.currencyId = currencyItem.id || settings.currencyId
      settings.currencySymbol = currencyItem.symbol || settings.currencySymbol
    }
  }
)

watch(
  currencies,
  (list) => {
    if (!list?.length) return
    const byId = list.find((currency) => currency.id === settings.currencyId)
    const byCode = list.find((currency) => currency.code === settings.currency)
    const selected = byId || byCode
    if (selected) {
      settings.currencyId = selected.id || settings.currencyId
      settings.currency = selected.code || settings.currency
      settings.currencySymbol = selected.symbol || settings.currencySymbol
    }
  },
  { immediate: true }
)

const autoSave = useDebounceFn(() => {
  if (!settings.autoSave || !invoiceId.value || saving.value) return
  saveInvoice({ silent: true })
}, 1200)

watch(
  [invoice, settings],
  () => {
    if (!isReady.value) return
    autoSave()
  },
  { deep: true }
)

const init = async () => {
  loading.value = true
  await loadSettings()
  if (invoiceId.value) {
    await loadInvoice()
  }
  loading.value = false
  isReady.value = true
}

watch(
  () => props.invoiceId,
  (value) => {
    invoiceId.value = value
    init()
  }
)

onMounted(init)
</script>
