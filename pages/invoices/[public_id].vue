<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">
            Facture {{ invoice?.number || invoice?.invoice_number || `#${invoice?.id || ''}` }}
          </h1>
          <p class="text-sm text-gray-500">Statut: {{ getStatusLabel(invoice?.status) }}</p>
        </div>
        <Button variant="outline" class="text-sm py-2" @click="openPdf">
          Voir PDF
        </Button>
      </div>

      <div v-if="loading" class="text-center py-10">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="text-center text-sm text-red-600 p-3 bg-red-50 rounded">
        {{ error }}
      </div>

      <div v-else class="space-y-6">
        <Card class="p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-xs text-gray-500">Emetteur</p>
              <p class="font-medium text-gray-900">{{ issuer.name || '-' }}</p>
              <p class="text-gray-600">{{ issuer.email }}</p>
              <p class="text-gray-600">{{ issuer.phone }}</p>
              <p class="text-gray-600 whitespace-pre-line">{{ issuer.address }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Client</p>
              <p class="font-medium text-gray-900">{{ client.name || '-' }}</p>
              <p class="text-gray-600">{{ client.email }}</p>
              <p class="text-gray-600">{{ client.phone }}</p>
              <p class="text-gray-600 whitespace-pre-line">{{ client.address }}</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
            <div>
              <p class="text-xs text-gray-500">Date emission</p>
              <p>{{ formatDate(invoice?.issue_date) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Date echeance</p>
              <p>{{ formatDate(invoice?.due_date) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Devise</p>
              <p>{{ invoice?.currency || 'XOF' }}</p>
            </div>
          </div>
        </Card>

        <Card class="p-0 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold">Description</th>
                  <th class="px-4 py-3 text-left font-semibold">Qt</th>
                  <th class="px-4 py-3 text-left font-semibold">Unite</th>
                  <th class="px-4 py-3 text-left font-semibold">PU</th>
                  <th class="px-4 py-3 text-left font-semibold">TVA %</th>
                  <th class="px-4 py-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(item, index) in invoice?.items || []" :key="index">
                  <td class="px-4 py-3">{{ item.description }}</td>
                  <td class="px-4 py-3">{{ item.quantity }}</td>
                  <td class="px-4 py-3">{{ item.unit }}</td>
                  <td class="px-4 py-3">{{ formatAmount(item.unit_price) }}</td>
                  <td class="px-4 py-3">{{ item.tax_rate }}</td>
                  <td class="px-4 py-3 text-right font-medium">{{ formatAmount(item.line_total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-200 space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Sous-total</span>
              <span class="font-medium text-gray-900">{{ formatAmount(invoiceTotals.subtotal) }} {{ invoice?.currency || 'XOF' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">TVA</span>
              <span class="font-medium text-gray-900">{{ formatAmount(invoiceTotals.tax_total) }} {{ invoice?.currency || 'XOF' }}</span>
            </div>
            <div class="flex items-center justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{{ formatAmount(invoiceTotals.total) }} {{ invoice?.currency || 'XOF' }}</span>
            </div>
          </div>
        </Card>

        <Card class="p-4 sm:p-6 space-y-4">
          <div>
            <p class="text-xs text-gray-500">Notes</p>
            <p class="text-sm text-gray-700 whitespace-pre-line">{{ invoice?.notes || '-' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Conditions</p>
            <p class="text-sm text-gray-700 whitespace-pre-line">{{ invoice?.terms || '-' }}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const config = useRuntimeConfig()

const invoice = ref(null)
const loading = ref(true)
const error = ref('')

const issuer = computed(() => ({
  name: invoice.value?.issuer_name || invoice.value?.issuer?.name || '',
  email: invoice.value?.issuer_email || invoice.value?.issuer?.email || '',
  phone: invoice.value?.issuer_phone || invoice.value?.issuer?.phone || '',
  address: invoice.value?.issuer_address || invoice.value?.issuer?.address || ''
}))

const client = computed(() => ({
  name: invoice.value?.client_name || invoice.value?.client?.name || '',
  email: invoice.value?.client_email || invoice.value?.client?.email || '',
  phone: invoice.value?.client_phone || invoice.value?.client?.phone || '',
  address: invoice.value?.client_address || invoice.value?.client?.address || ''
}))

const invoiceTotals = computed(() => ({
  subtotal: invoice.value?.totals?.subtotal ?? invoice.value?.subtotal ?? 0,
  tax_total: invoice.value?.totals?.tax_total ?? invoice.value?.tax_total ?? 0,
  total: invoice.value?.totals?.total ?? invoice.value?.total ?? 0
}))

const getStatusLabel = (status) => {
  const map = {
    draft: 'Brouillon',
    sent: 'Envoyee',
    paid: 'Payee',
    overdue: 'En retard',
    cancelled: 'Annulee'
  }
  return map[status] || status || 'Inconnu'
}

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('fr-FR')
}

const formatAmount = (value) => {
  const numberValue = Number(value || 0)
  return numberValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const openPdf = () => {
  const id = route.params.public_id
  if (!id) return
  window.open(`${config.public.apiBaseURL}/public/invoices/${id}/pdf`, '_blank')
}

const loadInvoice = async () => {
  loading.value = true
  try {
    const response = await $fetch(`/public/invoices/${route.params.public_id}`, {
      baseURL: config.public.apiBaseURL
    })
    invoice.value = response.data || response
  } catch (err) {
    console.error('Erreur facture publique:', err)
    error.value = err?.data?.message || 'Impossible de charger la facture.'
  } finally {
    loading.value = false
  }
}

onMounted(loadInvoice)
</script>
