<template>
  <div class="space-y-6">
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
        <CheckCircle v-if="toast.type === 'success'" class="h-5 w-5" />
        <XCircle v-else class="h-5 w-5" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-gray-600 text-sm sm:text-base">Gerez vos factures, suivez les statuts et partagez les PDF.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button
          variant="outline"
          class="text-sm py-2"
          @click="goToSettings"
        >
          Parametres facturation
        </Button>
        <Button
          class="text-sm py-2"
          :style="{ backgroundColor: '#2ECC71', color: 'white' }"
          @click="goToCreate"
        >
          Nouvelle facture
        </Button>
      </div>
    </div>

    <Card class="p-4 space-y-4">
      <div class="flex flex-col lg:flex-row lg:items-end gap-3">
        <div class="flex-1">
          <Label for="invoice-search" class="text-xs text-gray-500">Recherche</Label>
          <Input
            id="invoice-search"
            v-model="filters.search"
            type="text"
            placeholder="Numero, client, email..."
            class="text-sm py-2"
          />
        </div>
        <div class="min-w-[180px]">
          <Label class="text-xs text-gray-500">Statut</Label>
          <Select
            v-model="filters.status"
            :options="statusOptions"
            class="text-sm"
          />
        </div>
        <div class="min-w-[160px]">
          <Label class="text-xs text-gray-500">Date debut</Label>
          <Input
            v-model="filters.dateFrom"
            type="date"
            class="text-sm py-2"
          />
        </div>
        <div class="min-w-[160px]">
          <Label class="text-xs text-gray-500">Date fin</Label>
          <Input
            v-model="filters.dateTo"
            type="date"
            class="text-sm py-2"
          />
        </div>
      </div>
    </Card>

    <Card class="p-0 overflow-hidden">
      <div v-if="error" class="text-center text-sm text-red-600 p-3 bg-red-50">
        {{ error }}
      </div>
      <div v-if="loading" class="text-center py-10">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Facture</th>
              <th class="px-4 py-3 text-left font-semibold">Client</th>
              <th class="px-4 py-3 text-left font-semibold">Statut</th>
              <th class="px-4 py-3 text-left font-semibold">Echeance</th>
              <th class="px-4 py-3 text-left font-semibold">Total</th>
              <th class="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-gray-50">
              <td class="px-4 py-3">
                <div class="font-semibold text-gray-900">{{ invoice.number || invoice.invoice_number || `#${invoice.id}` }}</div>
                <div class="text-xs text-gray-500">Emise le {{ formatDate(invoice.issue_date) }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="text-gray-900">{{ getClientName(invoice) }}</div>
                <div class="text-xs text-gray-500">{{ getClientEmail(invoice) }}</div>
              </td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(resolveStatus(invoice))">
                  {{ getStatusLabel(resolveStatus(invoice)) }}
                </span>
              </td>
              <td :class="resolveStatus(invoice) === 'overdue' ? 'px-4 py-3 text-red-600' : 'px-4 py-3 text-gray-600'">
                {{ formatDate(invoice.due_date) }}
              </td>
              <td class="px-4 py-3 text-gray-900 font-medium">
                <div>{{ formatAmount(getInvoiceTotal(invoice)) }} {{ getCurrencySymbol(invoice) }}</div>
                <div v-if="Number(invoice.paid_amount) > 0" class="text-xs text-emerald-600">
                  Paye: {{ formatAmount(invoice.paid_amount) }} {{ getCurrencySymbol(invoice) }}
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <button
                    class="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    title="Ouvrir"
                    @click="openInvoice(invoice)"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    class="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                    title="PDF"
                    :disabled="pdfLoading === invoice.id"
                    @click="previewPdf(invoice)"
                  >
                    <DownloadIcon v-if="pdfLoading !== invoice.id" class="w-4 h-4" />
                    <div v-else class="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </button>
                  <button
                    :disabled="!isDeletable(invoice)"
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      isDeletable(invoice)
                        ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        : 'text-gray-300 cursor-not-allowed'
                    ]"
                    :title="isDeletable(invoice) ? 'Supprimer' : 'Suppression indisponible pour les factures payees'"
                    @click="confirmDelete(invoice)"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && invoices.length === 0">
              <td colspan="6" class="px-4 py-10 text-center text-gray-500">
                Aucune facture pour le moment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <div v-if="!loading && pagination.total > pagination.per_page" class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-600">
        Affichage de {{ pagination.from }} a {{ pagination.to }} sur {{ pagination.total }} factures
      </p>
      <div class="flex gap-2">
        <Button
          variant="outline"
          class="px-3 py-1.5 text-sm"
          :disabled="pagination.current_page === 1"
          @click="goToPage(pagination.current_page - 1)"
        >
          Precedent
        </Button>
        <div class="flex gap-1">
          <Button
            v-for="page in visiblePages"
            :key="page"
            variant="outline"
            class="px-3 py-1.5 text-sm min-w-[36px]"
            :style="{
              backgroundColor: page === pagination.current_page ? '#2ECC71' : 'transparent',
              color: page === pagination.current_page ? 'white' : '#0A1F44',
              borderColor: page === pagination.current_page ? '#2ECC71' : '#E5E7EB'
            }"
            @click="goToPage(page)"
          >
            {{ page }}
          </Button>
        </div>
        <Button
          variant="outline"
          class="px-3 py-1.5 text-sm"
          :disabled="pagination.current_page === pagination.last_page"
          @click="goToPage(pagination.current_page + 1)"
        >
          Suivant
        </Button>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="deleteModal.open"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeDelete"
      >
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md">
          <div class="p-6 space-y-4">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <TrashIcon class="w-5 h-5 text-red-600" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">Supprimer la facture</h3>
                <p class="text-sm text-gray-600 mt-2">
                  Voulez-vous vraiment supprimer cette facture ? Cette action est irreversible.
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                @click="closeDelete"
              >
                Annuler
              </button>
              <button
                class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                :disabled="deleteModal.loading"
                @click="deleteInvoice"
              >
                <span v-if="deleteModal.loading">Suppression...</span>
                <span v-else>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { CheckCircle, XCircle, DownloadIcon, EditIcon, TrashIcon } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const { token, user } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()

const invoices = ref([])
const loading = ref(false)
const error = ref('')
const pdfLoading = ref(null)

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const filters = ref({
  search: '',
  status: 'all',
  dateFrom: '',
  dateTo: ''
})

const statusOptions = [
  { label: 'Tous', value: 'all' },
  { label: 'Brouillon', value: 'draft' },
  { label: 'Envoyee', value: 'sent' },
  { label: 'Partiellement payee', value: 'partially_paid' },
  { label: 'Payee', value: 'paid' },
  { label: 'En retard', value: 'overdue' },
  { label: 'Annulee', value: 'cancelled' }
]

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0
})

const deleteModal = ref({
  open: false,
  loading: false,
  invoice: null
})

let searchTimeout = null

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.current_page = 1
    fetchInvoices()
  }, 500)
}

const applyFilters = () => {
  pagination.value.current_page = 1
  fetchInvoices()
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    pagination.value.current_page = page
    fetchInvoices()
  }
}

const visiblePages = computed(() => {
  const pages = []
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  const start = Math.max(1, current - 2)
  const end = Math.min(last, current + 2)

  for (let i = start; i <= end; i += 1) {
    pages.push(i)
  }

  return pages
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const fetchInvoices = async () => {
  loading.value = true
  error.value = ''

  try {
    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      per_page: pagination.value.per_page.toString()
    })

    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.status && filters.value.status !== 'all') params.append('status', filters.value.status)
    if (filters.value.dateFrom) params.append('date_from', filters.value.dateFrom)
    if (filters.value.dateTo) params.append('date_to', filters.value.dateTo)

    const response = await $fetch(`/invoices?${params.toString()}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    invoices.value = Array.isArray(response.data) ? response.data : response.data?.data || response.data || []
    const meta = response.meta || response.data?.meta || response.pagination
    if (meta) {
      pagination.value = {
        current_page: meta.current_page || meta.page || 1,
        last_page: meta.last_page || meta.total_pages || 1,
        per_page: meta.per_page || pagination.value.per_page,
        total: meta.total || invoices.value.length,
        from: meta.from || 0,
        to: meta.to || 0
      }
    } else {
      pagination.value = {
        ...pagination.value,
        total: invoices.value.length,
        from: invoices.value.length ? 1 : 0,
        to: invoices.value.length
      }
    }
  } catch (err) {
    console.error('Erreur chargement factures:', err)
    error.value = err?.data?.message || 'Impossible de charger les factures.'
    invoices.value = []
  } finally {
    loading.value = false
  }
}

const getStatusLabel = (status) => {
  const map = {
    draft: 'Brouillon',
    sent: 'Envoyee',
    partially_paid: 'Partiellement payee',
    paid: 'Payee',
    overdue: 'En retard',
    cancelled: 'Annulee'
  }
  return map[status] || status || 'Inconnu'
}

const getStatusClass = (status) => {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'paid':
      return `${base} bg-green-100 text-green-700`
    case 'partially_paid':
      return `${base} bg-amber-100 text-amber-700`
    case 'sent':
      return `${base} bg-blue-100 text-blue-700`
    case 'overdue':
      return `${base} bg-red-100 text-red-700`
    case 'cancelled':
      return `${base} bg-gray-200 text-gray-700`
    case 'draft':
    default:
      return `${base} bg-gray-100 text-gray-700`
  }
}

const resolveStatus = (invoice) => {
  if (invoice?.is_overdue && !['paid', 'cancelled'].includes(invoice?.status)) {
    return 'overdue'
  }
  return invoice?.status
}

const isDeletable = (invoice) => {
  return !['paid', 'partially_paid'].includes(invoice?.status)
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

const getInvoiceTotal = (invoice) => {
  return invoice?.totals?.total ?? invoice?.total ?? invoice?.amount_total ?? 0
}

const getClientName = (invoice) => {
  return invoice?.client_name || invoice?.client?.name || invoice?.client?.company || 'Client'
}

const getClientEmail = (invoice) => {
  return invoice?.client_email || invoice?.client?.email || ''
}

const getCurrencySymbol = (invoice) => {
  const currency = invoice?.currency
  if (currency?.symbol) return currency.symbol
  if (currency?.code) {
    if (currency.code === 'XOF') return 'CFA'
    if (currency.code === 'USD') return '$'
    if (currency.code === 'EUR') return 'EUR'
    return currency.code
  }
  return user.value?.currency?.symbol || user.value?.currency?.code || 'XOF'
}

const openInvoice = (invoice) => {
  router.push(`/dashboard/invoices/${invoice.id}`)
}

const previewPdf = async (invoice) => {
  if (!invoice?.id) return
  pdfLoading.value = invoice.id
  try {
    const response = await fetch(`${config.public.apiBaseURL}/invoices/${invoice.id}/pdf?refresh=1`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/pdf'
      }
    })
    if (!response.ok) throw new Error('PDF error')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => window.URL.revokeObjectURL(url), 1500)
  } catch (err) {
    console.error('Erreur PDF:', err)
    showToast('Erreur lors du chargement du PDF', 'error')
  } finally {
    pdfLoading.value = null
  }
}

const confirmDelete = (invoice) => {
  if (!isDeletable(invoice)) {
    showToast('Impossible de supprimer une facture payee ou partiellement payee.', 'error')
    return
  }
  deleteModal.value = {
    open: true,
    loading: false,
    invoice
  }
}

const closeDelete = () => {
  deleteModal.value = {
    open: false,
    loading: false,
    invoice: null
  }
}

const deleteInvoice = async () => {
  if (!deleteModal.value.invoice) return
  deleteModal.value.loading = true
  try {
    await $fetch(`/invoices/${deleteModal.value.invoice.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    showToast('Facture supprimee')
    closeDelete()
    fetchInvoices()
  } catch (err) {
    console.error('Erreur suppression facture:', err)
    showToast(err?.data?.message || 'Erreur lors de la suppression', 'error')
  } finally {
    deleteModal.value.loading = false
  }
}

const goToCreate = () => {
  router.push('/dashboard/invoices/create')
}

const goToSettings = () => {
  router.push('/dashboard/invoices/settings')
}

onMounted(fetchInvoices)

watch(() => filters.value.status, () => {
  applyFilters()
})

watch(() => filters.value.search, () => {
  debouncedSearch()
})

watch(
  () => [filters.value.dateFrom, filters.value.dateTo],
  () => {
    applyFilters()
  }
)
</script>
