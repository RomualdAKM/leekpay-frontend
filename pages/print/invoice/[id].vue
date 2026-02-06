<template>
  <div class="print-root" :data-ready="ready ? 'true' : 'false'">
    <div v-if="error" class="max-w-3xl mx-auto text-red-600 text-sm bg-white p-4 rounded-lg">
      {{ error }}
    </div>
    <div v-else-if="loading" class="max-w-3xl mx-auto text-gray-500 text-sm">Chargement...</div>
    <InvoiceCanvas
      v-else
      :invoice="invoice"
      :settings="settings"
      :preview="true"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import InvoiceCanvas from '~/components/invoices/InvoiceCanvas.vue'

definePageMeta({
  layout: false,
  ssr: false
})

const route = useRoute()
const config = useRuntimeConfig()

const loading = ref(true)
const error = ref('')

const invoice = reactive({
  number: '',
  status: 'draft',
  currency: 'EUR',
  metaRows: [],
  issuer: {
    name: '',
    address: '',
    zip: '',
    city: '',
    logo: '',
    fields: []
  },
  client: {
    name: '',
    address: '',
    zip: '',
    city: '',
    fields: []
  },
  items: [],
  notes: '',
  footerNote: ''
})

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
  watermarkText: ''
})

const ready = ref(false)

const splitAddressLines = (value) => String(value || '').split('\n').map(v => v.trim()).filter(Boolean)

const applyTheme = (theme = {}) => {
  settings.primaryColor = theme.primaryColor || theme.primary_color || settings.primaryColor
  settings.secondaryColor = theme.secondaryColor || theme.secondary_color || settings.secondaryColor
  settings.backgroundColor = theme.backgroundColor || theme.background_color || settings.backgroundColor
  settings.textColor = theme.textColor || theme.text_color || settings.textColor
  settings.fontFamily = theme.fontFamily || theme.font_family || settings.fontFamily
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
  if (theme.cellColor || theme.cell_color) settings.cellColor = theme.cellColor || theme.cell_color
  if (Object.prototype.hasOwnProperty.call(theme, 'showQuantity')) settings.showQuantity = Boolean(theme.showQuantity)
  if (Object.prototype.hasOwnProperty.call(theme, 'showUnit')) settings.showUnit = Boolean(theme.showUnit)
  if (Object.prototype.hasOwnProperty.call(theme, 'vatEnabled')) settings.vatEnabled = Boolean(theme.vatEnabled)
  if (Object.prototype.hasOwnProperty.call(theme, 'vatPerLine')) settings.vatPerLine = Boolean(theme.vatPerLine)
  if (Object.prototype.hasOwnProperty.call(theme, 'vatRate')) settings.vatRate = Number(theme.vatRate || settings.vatRate)
}

const loadInvoice = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = route.query.token ? String(route.query.token) : ''
    const response = await $fetch(`/invoices/${route.params.id}`, {
      baseURL: config.public.apiBaseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    const data = response.data || response
    if (!data) throw new Error('Facture introuvable')

    invoice.number = data.number || data.invoice_number || ''
    invoice.status = data.status || 'draft'

    const currencyCode = data.currency?.code || data.currency || settings.currency
    settings.currency = currencyCode
    invoice.currency = currencyCode
    settings.currencyId = data.currency_id || data.currency?.id || null
    settings.currencySymbol = data.currency?.symbol || ''

    if (!settings.currencySymbol) {
      if (currencyCode === 'XOF') settings.currencySymbol = 'CFA'
      else if (currencyCode === 'USD') settings.currencySymbol = '$'
      else settings.currencySymbol = 'EUR'
    }

    applyTheme(data.theme || {})

    const metaRows = data.theme?.metaRows || data.theme?.meta_rows
    if (Array.isArray(metaRows) && metaRows.length) {
      invoice.metaRows = metaRows.map((row, index) => ({
        id: row.id || `meta-${index + 1}`,
        label: row.label || '',
        value: row.value || ''
      }))
    } else {
      invoice.metaRows = [
        { id: 'meta-1', label: 'Date de facture', value: data.issue_date || '' },
        { id: 'meta-2', label: 'Date de livraison', value: data.delivery_date || '' },
        { id: 'meta-3', label: 'Echeance de paiement', value: data.due_date || '' }
      ]
    }

    invoice.issuer.name = data.issuer_name || ''
    invoice.issuer.address = splitAddressLines([data.issuer_address_line1, data.issuer_address_line2].filter(Boolean).join('\n')).join('\n')
    invoice.issuer.zip = data.issuer_postal_code || ''
    invoice.issuer.city = data.issuer_city || ''
    invoice.issuer.logo = data.issuer_logo_url || data.issuer_logo_path || ''

    const issuerFields = data.theme?.issuerFields || data.theme?.issuer_fields
    if (Array.isArray(issuerFields) && issuerFields.length) {
      invoice.issuer.fields = issuerFields.map((field, index) => ({
        id: field.id || `issuer-${index + 1}`,
        label: field.label || '',
        value: field.value || ''
      }))
    } else {
      invoice.issuer.fields = [
        { id: 'issuer-1', label: 'Email', value: data.issuer_email || '' },
        { id: 'issuer-2', label: 'Tel', value: data.issuer_phone || '' },
        { id: 'issuer-3', label: 'N TVA', value: data.issuer_tax_id || '' }
      ]
    }

    invoice.client.name = data.client_name || ''
    invoice.client.address = splitAddressLines([data.client_address_line1, data.client_address_line2].filter(Boolean).join('\n')).join('\n')
    invoice.client.zip = data.client_postal_code || ''
    invoice.client.city = data.client_city || ''

    const clientFields = data.theme?.clientFields || data.theme?.client_fields
    if (Array.isArray(clientFields) && clientFields.length) {
      invoice.client.fields = clientFields.map((field, index) => ({
        id: field.id || `client-${index + 1}`,
        label: field.label || '',
        value: field.value || ''
      }))
    } else {
      invoice.client.fields = [
        { id: 'client-1', label: 'Email', value: data.client_email || '' },
        { id: 'client-2', label: 'Tel', value: data.client_phone || '' }
      ]
    }

    invoice.items = Array.isArray(data.items)
      ? data.items.map((item, index) => {
          const parts = String(item.description || '').split('\n')
          return {
            id: item.id || `item-${index + 1}`,
            title: parts[0] || item.title || '',
            description: parts.slice(1).join('\n') || item.description || '',
            quantity: item.quantity ?? 0,
            unit: item.unit || '',
            unitPrice: item.unit_price ?? 0,
            taxRate: item.tax_rate ?? settings.vatRate
          }
        })
      : []

    invoice.notes = data.notes || ''
    invoice.footerNote = data.terms || ''

    await nextTick()
    if (document?.fonts?.ready) {
      await document.fonts.ready
    }
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    ready.value = true
  } catch (err) {
    error.value = 'Impossible de generer l\'aperçu.'
  } finally {
    loading.value = false
  }
}

onMounted(loadInvoice)
</script>

<style>
@page {
  size: A4;
  margin: 0;
}

html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #ffffff;
}

.print-root {
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
