<template>
  <div class="p-2 sm:p-2  mx-auto space-y-2">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
      >
        <CheckIcon class="w-5 h-5" />
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </Transition>

    <Button
        variant="outline"
        @click="onBack"
    >
      <ArrowLeftIcon class="w-4 h-4" />
    </Button>
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div>
        <!-- <h1 class="text-xl sm:text-2xl font-bold" style="color: #0A1F44">
          Modifier le lien de paiement
        </h1> -->
        <p class="text-gray-600 text-sm sm:text-base">
          Mettez à jour les informations de votre lien
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form -->
      <Card class="p-4 sm:p-6">
        <form
            @submit.prevent="handleSubmit"
            class="space-y-6"
            :class="{ 'opacity-75 pointer-events-none': loading }"
        >
          <!-- SECTION: Informations principales -->
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="title" class="text-sm">Titre *</Label>
              <Input
                  id="title"
                  v-model="formData.title"
                  @input="generateUrlFromTitle"
                  required
                  class="text-sm py-2"
              />
            </div>

            <div class="space-y-2">
              <Label for="description" class="text-sm">Description *</Label>
              <RichTextEditor
                  v-model="formData.description"
                  placeholder="Entrez la description de votre lien de paiement..."
              />
            </div>

            <div class="space-y-2">
              <Label for="customUrl" class="text-sm">URL personnalisée *</Label>
              <div class="flex">
                <div class="bg-gray-100 px-3 py-2 border border-r-0 text-xs sm:text-sm text-gray-600">
                  leekpay.me/
                </div>
                <Input
                    id="customUrl"
                    v-model="formData.customUrl"
                    @input="onUrlManualEdit"
                    placeholder="mon-lien-unique"
                    class="rounded-l-none text-sm py-2"
                    :class="{
                      'border-red-500': urlError,
                      'border-green-500': urlAvailable && formData.customUrl && hasUrlChanged
                    }"
                    pattern="[a-zA-Z0-9_\-]+"
                    title="Uniquement lettres, chiffres, tirets et underscores"
                    required
                />
              </div>
              <p v-if="urlChecking" class="text-xs text-blue-600">Vérification...</p>
              <p v-else-if="urlError" class="text-xs text-red-600">{{ urlError }}</p>
              <p v-else-if="urlAvailable && formData.customUrl && hasUrlChanged" class="text-xs text-green-600">URL disponible</p>
            </div>
          </div>

          <!-- SECTION: Tarification -->
          <div class="space-y-4 pt-4 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <Label class="text-sm">Montant</Label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">{{ formData.amountType === 'flexible' ? 'Libre' : 'Fixe' }}</span>
                <Switch
                    :checked="formData.amountType === 'flexible'"
                    @update:checked="toggleAmountType"
                />
              </div>
            </div>

            <div v-if="formData.amountType === 'fixed'" class="space-y-2">
              <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  v-model="formData.fixedAmount"
                  placeholder="Montant"
                  class="text-sm py-2 w-full"
                  required
              />
              <p v-if="currencySymbol" class="text-xs text-gray-500">
                Devise: {{ currencySymbol }}
              </p>
            </div>
          </div>

          <!-- SECTION: Média (collapsible) -->
          <div class="border-t border-gray-100">
            <button
              type="button"
              @click="toggleSection('media')"
              class="w-full flex items-center justify-between py-4 text-left"
            >
              <span class="text-sm font-medium text-gray-700">Média</span>
              <div class="flex items-center gap-2">
                <span v-if="formData.image || formData.pdf || formData.invoiceId" class="text-xs text-green-600">Configuré</span>
                <span v-else class="text-xs text-gray-400">Optionnel</span>
                <ChevronDown 
                  class="w-4 h-4 text-gray-400 transition-transform" 
                  :class="{ 'rotate-180': openSections.media }" 
                />
              </div>
            </button>
            
            <div v-show="openSections.media" class="pb-4 space-y-4">
              <div class="space-y-2">
                <Label class="text-sm">Image</Label>
                <div class="flex items-center gap-3">
                  <Button
                      type="button"
                      variant="outline"
                      @click="$refs.imageInput.click()"
                      class="text-sm py-2"
                  >
                    Choisir un fichier
                  </Button>
                  <span v-if="formData.image" class="text-xs text-green-600">{{ formData.image.name }}</span>
                  <span v-else-if="imagePreview" class="text-xs text-gray-500">Image existante</span>
                  <span v-else class="text-xs text-gray-400">Aucun fichier</span>
                </div>
                <img v-if="imagePreview" :src="imagePreview" class="h-20 object-contain" />
                <input
                    ref="imageInput"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                />
              </div>

              <div class="space-y-3">
                <Label class="text-sm">Document</Label>
                
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="documentType = 'pdf'"
                    class="flex-1 py-2 text-sm border transition-colors"
                    :class="documentType === 'pdf' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  >
                    Ajouter un PDF
                  </button>
                  <button
                    type="button"
                    @click="documentType = 'invoice'"
                    class="flex-1 py-2 text-sm border transition-colors"
                    :class="documentType === 'invoice' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  >
                    Lier une facture
                  </button>
                </div>

                <div v-if="documentType === 'invoice'" class="space-y-2">
                  <Input
                      v-model="invoiceSearch"
                      type="text"
                      placeholder="Rechercher une facture..."
                      class="text-sm py-2"
                      @keydown.enter.prevent
                  />
                  <Select
                      v-model="formData.invoiceId"
                      :options="invoiceOptions"
                      placeholder="Sélectionner une facture"
                      class="text-sm"
                  />
                  <p v-if="invoiceError" class="text-xs text-red-600">{{ invoiceError }}</p>
                  <p v-if="selectedInvoice" class="text-xs text-green-600">
                    {{ formatInvoiceLabel(selectedInvoice) }}
                  </p>
                  <button
                      v-if="formData.invoiceId"
                      type="button"
                      @click="clearInvoiceSelection"
                      class="text-xs text-gray-500 underline"
                  >
                    Retirer
                  </button>
                </div>

                <div v-else-if="documentType === 'pdf'" class="space-y-2">
                  <div class="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        @click="$refs.pdfInput.click()"
                        class="text-sm py-2"
                    >
                      Choisir un fichier
                    </Button>
                    <span v-if="formData.pdf" class="text-xs text-green-600">{{ formData.pdf.name }}</span>
                    <span v-else class="text-xs text-gray-400">Aucun fichier</span>
                  </div>
                  <input
                      ref="pdfInput"
                      type="file"
                      accept=".pdf"
                      @change="handlePdfUpload"
                      class="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION: Options avancées (collapsible) -->
          <div class="border-t border-gray-100">
            <button
              type="button"
              @click="toggleSection('advanced')"
              class="w-full flex items-center justify-between py-4 text-left"
            >
              <span class="text-sm font-medium text-gray-700">Options avancées</span>
              <div class="flex items-center gap-2">
                <span v-if="formData.expirationDate || formData.redirectUrl" class="text-xs text-green-600">Configuré</span>
                <span v-else class="text-xs text-gray-400">Optionnel</span>
                <ChevronDown 
                  class="w-4 h-4 text-gray-400 transition-transform" 
                  :class="{ 'rotate-180': openSections.advanced }" 
                />
              </div>
            </button>
            
            <div v-show="openSections.advanced" class="pb-4 space-y-4">
              <div class="space-y-2">
                <Label for="expiration" class="text-sm">Date d'expiration</Label>
                <Input
                    id="expiration"
                    type="date"
                    v-model="formData.expirationDate"
                    class="text-sm py-2"
                />
              </div>

              <div class="space-y-2">
                <Label for="redirectUrl" class="text-sm">URL de redirection après paiement</Label>
                <Input
                    id="redirectUrl"
                    type="url"
                    v-model="formData.redirectUrl"
                    placeholder="https://example.com/success"
                    class="text-sm py-2"
                />
                <p class="text-xs text-gray-500">
                  Redirection automatique après un paiement réussi
                </p>
              </div>
            </div>
          </div>

          <!-- Erreur API -->
          <div v-if="error" class="text-red-600 text-sm p-3 bg-red-50 border border-red-200">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <Button
              type="submit"
              :disabled="loading"
              class="w-full py-3 text-sm"
              :style="{ backgroundColor: '#2ECC71', color: 'white' }"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="w-1 h-1 bg-white rounded-full animate-pulse"></span>
              <span class="w-1 h-1 bg-white rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
              <span class="w-1 h-1 bg-white rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
            </span>
            <span v-else>Mettre à jour</span>
          </Button>
        </form>
      </Card>

      <!-- Preview -->
      <div>
        <Card class="p-4 sm:p-6 hidden sm:block">
          <h3 class="text-lg sm:text-xl font-semibold mb-4" style="color: #0A1F44">
            Aperçu
          </h3>
          <div>
            <img
                v-if="imagePreview"
                :src="imagePreview"
                class="w-full h-40 object-contain rounded-lg"
            />
            <p v-else class="text-gray-500 text-sm">Aucune image</p>
          </div>
          <div class="pt-3">
            <h4 class="font-semibold">{{ formData.title || 'Titre' }}</h4>
            <p v-html="formData.description" class="text-sm text-gray-600">
            </p>
            <p class="text-xs sm:text-sm text-gray-600 mb-1">
              URL:
            </p>
            <p class="text-sm font-medium text-blue-600 break-all">
              {{ previewUrl }}
            </p>
            <p class="text-base font-semibold mt-1" style="color: #2ECC71">
              {{ formData.amountType === 'flexible'
                ? 'Montant libre'
                : formData.fixedAmount
                    ? formData.fixedAmount + ' ' + currencySymbol
                    : '---' }}
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, UploadIcon, CheckIcon, ChevronDown } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'
import RichTextEditor from '~/components/ui/RichTextEditor.vue'
import Switch from '~/components/ui/Switch.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'

definePageMeta({ layout: 'dashboard' })

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { token } = useAuth()

const formData = ref({
  title: '',
  description: '',
  customUrl: '',
  image: null,
  pdf: null,
  invoiceId: null,
  amountType: 'fixed',
  fixedAmount: null,
  expirationDate: '',
  redirectUrl: ''
})

const pdfInput = ref(null)
const imagePreview = ref(null)
const loading = ref(false)
const error = ref('')
const urlError = ref('')
const urlChecking = ref(false)
const urlAvailable = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const isUrlManuallyEdited = ref(false)
const originalUrl = ref('')
const hasUrlChanged = ref(false)
const currencySymbol = ref('')
const invoices = ref([])
const invoiceLoading = ref(false)
const invoiceSearch = ref('')
const invoiceDetails = ref(null)
const invoiceError = ref('')
const invoiceCleared = ref(false)
let urlCheckTimeout = null
let invoiceSearchTimeout = null

const openSections = ref({
  media: false,
  advanced: false
})

const documentType = ref('pdf')

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

// Auto-génération d'URL à partir du titre
const generateUrlFromTitle = () => {
  if (!isUrlManuallyEdited.value) {
    const slug = formData.value.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    formData.value.customUrl = slug
    checkIfUrlChanged()
  }
}

const onUrlManualEdit = () => {
  isUrlManuallyEdited.value = true
  checkIfUrlChanged()
  checkUrlAvailability()
}

const checkIfUrlChanged = () => {
  hasUrlChanged.value = formData.value.customUrl !== originalUrl.value
}

const validateCustomUrl = () => {
  const urlPattern = /^[a-zA-Z0-9-_]+$/
  if (formData.value.customUrl && !urlPattern.test(formData.value.customUrl)) {
    urlError.value = 'Uniquement lettres, chiffres, tirets et underscores'
    return false
  }
  urlError.value = ''
  return true
}

const checkUrlAvailability = async () => {
  if (urlCheckTimeout) {
    clearTimeout(urlCheckTimeout)
  }
  
  if (!formData.value.customUrl || !hasUrlChanged.value) {
    urlAvailable.value = false
    urlChecking.value = false
    return
  }
  
  if (!validateCustomUrl()) {
    urlAvailable.value = false
    urlChecking.value = false
    return
  }
  
  urlChecking.value = true
  
  urlCheckTimeout = setTimeout(async () => {
    try {
      const response = await $fetch(`/payment-links/check-url/${formData.value.customUrl}`, {
        baseURL: config.public.apiBaseURL,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      
      if (response.available) {
        urlAvailable.value = true
        urlError.value = ''
      } else {
        urlAvailable.value = false
        urlError.value = 'Cette URL est déjà utilisée'
      }
    } catch (err) {
      console.error('Erreur vérification URL:', err)
      urlAvailable.value = false
      urlError.value = ''
    } finally {
      urlChecking.value = false
    }
  }, 500)
}

const previewUrl = computed(() => {
  if (formData.value.customUrl) {
    return `https://leekpay.me/${formData.value.customUrl}`
  }
  return 'https://leekpay.me/votre-lien'
})

const formatAmount = (value) => {
  const numberValue = Number(value || 0)
  return numberValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const formatInvoiceLabel = (invoice) => {
  if (!invoice) return 'Facture'
  const number = invoice.number || `#${invoice.id}`
  const client = invoice.client_name || 'Client'
  const total = formatAmount(invoice.total)
  const currency = invoice.currency?.symbol || invoice.currency?.code || ''
  return `${number} • ${client} • ${total} ${currency}`.trim()
}

const normalizeInvoiceList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

const invoiceOptions = computed(() => {
  const base = invoices.value.map((invoice) => ({
    label: formatInvoiceLabel(invoice),
    value: invoice.id
  }))
  if (invoiceDetails.value && !base.some((option) => option.value === invoiceDetails.value.id)) {
    base.unshift({
      label: formatInvoiceLabel(invoiceDetails.value),
      value: invoiceDetails.value.id
    })
  }
  return base
})

const selectedInvoice = computed(() => {
  if (!formData.value.invoiceId) return null
  return (
    invoices.value.find((invoice) => invoice.id === formData.value.invoiceId) ||
    (invoiceDetails.value?.id === formData.value.invoiceId ? invoiceDetails.value : null)
  )
})

const fetchInvoices = async (query = '') => {
  if (!token.value) return
  invoiceLoading.value = true
  invoiceError.value = ''
  try {
    const params = new URLSearchParams({ per_page: '30' })
    if (query) params.append('search', query)
    const response = await $fetch(`/invoices?${params.toString()}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    invoices.value = normalizeInvoiceList(response)
  } catch (err) {
    console.error('Erreur chargement factures:', err)
    invoices.value = []
    invoiceError.value = err?.data?.message || 'Impossible de charger les factures.'
  } finally {
    invoiceLoading.value = false
  }
}

const fetchInvoiceById = async (invoiceId) => {
  if (!token.value || !invoiceId) return
  try {
    const response = await $fetch(`/invoices/${invoiceId}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    invoiceDetails.value = response?.data || response || null
  } catch (err) {
    console.error('Erreur chargement facture:', err)
    invoiceDetails.value = null
  }
}

const debouncedInvoiceSearch = () => {
  if (invoiceSearchTimeout) clearTimeout(invoiceSearchTimeout)
  invoiceSearchTimeout = setTimeout(() => {
    fetchInvoices(invoiceSearch.value)
  }, 400)
}

const clearInvoiceSelection = () => {
  formData.value.invoiceId = null
  invoiceDetails.value = null
  invoiceCleared.value = true
}

watch(() => formData.value.customUrl, () => {
  validateCustomUrl()
})

watch(() => invoiceSearch.value, () => {
  debouncedInvoiceSearch()
})

watch(
  () => formData.value.invoiceId,
  (value) => {
    if (value) {
      formData.value.pdf = null
      if (pdfInput.value) pdfInput.value.value = ''
      invoiceCleared.value = false
      fetchInvoiceById(value)
    } else {
      invoiceDetails.value = null
    }
  }
)

watch(
  () => documentType.value,
  (newType) => {
    if (newType === 'invoice') {
      formData.value.pdf = null
      if (pdfInput.value) pdfInput.value.value = ''
    } else {
      formData.value.invoiceId = null
      invoiceDetails.value = null
      invoiceCleared.value = true
    }
  }
)

const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Charger le lien existant
const loadLink = async () => {
  if (!token.value) return
  try {
    const linkId = route.params.id
    const response = await $fetch(`/payment-links/${linkId}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    const link = response.data
    await fetchInvoices()

    originalUrl.value = link.custom_url
    
    formData.value = {
      title: link.title,
      description: link.description,
      customUrl: link.custom_url,
      image: null,
      pdf: null,
      invoiceId: link.invoice_id || null,
      amountType: link.amount_type,
      fixedAmount: link.fixed_amount,
      expirationDate: link.expires_at ? link.expires_at.substring(0, 10) : '',
      redirectUrl: link.redirect_url || ''
    }

    if (link.currency?.symbol) {
      currencySymbol.value = link.currency.symbol
    }

    if (link.image_url) {
      imagePreview.value = link.image_url.startsWith('http')
          ? link.image_url
          : `${config.public.apiBaseURL}${link.image_url}`
    }

    if (link.invoice) {
      invoiceDetails.value = link.invoice
      documentType.value = 'invoice'
    } else if (link.invoice_id) {
      fetchInvoiceById(link.invoice_id)
      documentType.value = 'invoice'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Impossible de charger le lien'
  }
}

watch(
  () => token.value,
  (value) => {
    if (value) loadLink()
  },
  { immediate: true }
)

const handleImageUpload = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    formData.value.image = file
    if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview.value)
    }
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handlePdfUpload = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    formData.value.pdf = file
    formData.value.invoiceId = null
    invoiceDetails.value = null
    invoiceCleared.value = true
  }
}

const toggleAmountType = (checked) => {
  formData.value.amountType = checked ? 'flexible' : 'fixed'
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  if (!validateCustomUrl()) {
    error.value = 'URL personnalisée invalide.'
    loading.value = false
    return
  }
  
  if (formData.value.amountType === 'fixed' && (!formData.value.fixedAmount || parseFloat(formData.value.fixedAmount) <= 0)) {
    error.value = 'Veuillez entrer un montant valide.'
    loading.value = false
    return
  }
  
  try {
    const body = new FormData()
    body.append('_method', 'PUT')
    body.append('title', formData.value.title)
    body.append('description', formData.value.description)
    body.append('custom_url', formData.value.customUrl)
    body.append('amount_type', formData.value.amountType)
    body.append('is_active', '1')
    
    if (formData.value.amountType === 'fixed') {
      body.append('fixed_amount', formData.value.fixedAmount)
    }
    
    if (formData.value.expirationDate) {
      const date = new Date(formData.value.expirationDate)
      date.setHours(23, 59, 59, 999)
      body.append('expires_at', date.toISOString())
    }
    
    if (formData.value.redirectUrl) {
      body.append('redirect_url', formData.value.redirectUrl)
    }
    
    if (formData.value.image) body.append('image', formData.value.image)
    if (formData.value.invoiceId) {
      body.append('invoice_id', String(formData.value.invoiceId))
    } else if (invoiceCleared.value) {
      body.append('invoice_id', '')
    }
    if (formData.value.pdf && !formData.value.invoiceId) {
      body.append('pdf', formData.value.pdf)
    }

    const response = await $fetch(`/payment-links/${route.params.id}`, {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body
    })

    displayToast('Lien mis à jour avec succès')
    
    setTimeout(() => {
      router.push('/dashboard/links')
    }, 1500)
  } catch (err) {
    console.error(err)
    
    if (err.status === 422 && err.data?.errors) {
      const errors = Object.values(err.data.errors).flat()
      error.value = errors.join(' ')
    } else if (err.status === 401) {
      error.value = 'Votre session a expiré. Veuillez vous reconnecter.'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = err.data?.message || 'Erreur lors de la mise à jour.'
    }
  } finally {
    loading.value = false
  }
}

const onBack = () => router.push('/dashboard/links')
</script>
