<template>
  <div class="mx-auto space-y-6">
    <!-- Toast Notification -->
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

    <!-- Header -->
    <!-- <Button
        variant="outline"
        @click="onBack"
        class="py-2"
    >
      <ArrowLeftIcon class="w-4 h-4" />
      
    </Button> -->
    <div class="flex flex-col px-2 sm:flex-row sm:items-center gap-2">
      <div>
        <!-- <h1 class="text-xl sm:text-2xl font-bold" style="color: #0A1F44">Créer un lien de paiement</h1> -->
        <p class="text-gray-600 text-sm sm:text-base">Configurez votre nouveau lien de paiement</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form -->
      <Card class="p-4 sm:p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6" :class="{ 'opacity-75 pointer-events-none': loading }">
          
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
                  placeholder="Décrivez votre lien de paiement..."
                  class="text-sm"
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
                      'border-green-500': urlAvailable && formData.customUrl
                    }"
                    pattern="[a-zA-Z0-9_\-]+"
                    title="Uniquement lettres, chiffres, tirets et underscores"
                    required
                />
              </div>
              <p v-if="urlChecking" class="text-xs text-blue-600">Vérification...</p>
              <p v-else-if="urlError" class="text-xs text-red-600">{{ urlError }}</p>
              <p v-else-if="urlAvailable && formData.customUrl" class="text-xs text-green-600">URL disponible</p>
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
              <p v-if="user?.currency?.symbol" class="text-xs text-gray-500">
                Devise: {{ user.currency.symbol }}
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
                  <span v-else class="text-xs text-gray-400">Aucun fichier</span>
                </div>
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
            <span v-else>Créer le lien</span>
          </Button>
        </form>
      </Card>

      <!-- Preview / Result -->
      <div class="space-y-6">
        <Card v-if="generatedLink" class="p-4 sm:p-6">
          <h3 class="text-lg sm:text-xl font-semibold mb-4" style="color: #0A1F44">
            Lien créé avec succès
          </h3>

          <div class="space-y-4">
            <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <Label class="text-xs sm:text-sm text-gray-600">Votre lien :</Label>
              <div class="flex flex-col sm:flex-row gap-2 mt-2">
                <Input
                    :value="generatedLink"
                    readonly
                    class="bg-white text-xs sm:text-sm flex-1"
                />
                <Button
                    variant="outline"
                    @click="copyToClipboard"
                    class="gap-2 w-full sm:w-auto"
                >
                  <CheckIcon v-if="copied" class="w-4 h-4 text-green-600" />
                  <CopyIcon v-else class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div class="text-center p-4 sm:p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg">
              <div v-if="qrCodeUrl" class="space-y-3">
                <img 
                  :src="qrCodeUrl" 
                  alt="QR Code" 
                  class="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
                  @error="handleQrCodeError"
                />
                <p class="text-xs sm:text-sm text-green-600">QR Code généré avec succès</p>
                <a 
                  :href="qrCodeUrl" 
                  download="qr-code.svg" 
                  target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  <QrCodeIcon class="w-4 h-4" />
                  Télécharger le QR Code
                </a>
              </div>
              <div v-else-if="qrCodeError" class="space-y-3">
                <QrCodeIcon class="w-12 sm:w-16 h-12 sm:h-16 text-red-400 mx-auto" />
                <p class="text-xs sm:text-sm text-red-600">{{ qrCodeError }}</p>
              </div>
              <div v-else class="space-y-3">
                <QrCodeIcon class="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto" />
                <p class="text-xs sm:text-sm text-gray-600">QR Code en cours de génération...</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <Button
                  variant="outline"
                  class="flex-1 text-sm py-2"
                  @click="resetForm"
              >
                Créer un autre lien
              </Button>
              <Button
                  @click="onBack"
                  class="flex-1 text-sm py-2"
                  :style="{ backgroundColor: '#2ECC71', color: 'white' }"
              >
                Voir mes liens
              </Button>
            </div>
          </div>
        </Card>

        <Card v-else class="p-4 sm:p-6 hidden sm:block">
          <h3 class="text-lg sm:text-xl font-semibold mb-4" style="color: #0A1F44">Aperçu</h3>
          <div class="space-y-4">
            <div class="bg-gray-100 rounded-lg flex items-center justify-center" :class="formData.image ? 'h-40 sm:h-48' : 'h-40'">
              <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  :alt="formData.title || 'Aperçu'"
                  class="w-full h-full object-contain rounded-lg"
              />
              <span v-else class="text-gray-500 text-sm">
                {{ formData.image ? 'Chargement...' : 'Aucune image' }}
              </span>
            </div>

            <div>
              <h4 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">
                {{ formData.title || 'Titre du produit' }}
              </h4>
              <p v-html="formData.description" class="text-xs sm:text-sm text-gray-600 mt-1">
              </p>
            </div>
            <div class="pt-3 sm:pt-4 border-t">
              <p class="text-xs sm:text-sm text-gray-600 mb-1">
                URL:
              </p>
              <p class="text-sm font-medium text-blue-600 break-all">
                {{ previewUrl }}
              </p>
              <p v-if="formData.amountType === 'fixed' && formData.fixedAmount" class="text-base sm:text-lg font-semibold mt-2" style="color: #2ECC71">
                {{ formData.fixedAmount }} (montant fixe)
              </p>
              <p v-else class="text-base sm:text-lg font-semibold mt-2" style="color: #2ECC71">
                Montant libre
              </p>
            </div>
          </div>
        </Card>

        <!-- Tips -->
        <!-- <Card class="p-4 sm:p-6 border-l-4" :style="{ borderLeftColor: '#F39C12' }">
          <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: #0A1F44">
            Conseils pour optimiser vos liens
          </h4>
          <ul class="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
            <li>• Utilisez des titres clairs et attractifs</li>
            <li>• Ajoutez une image de haute qualité</li>
            <li>• Créez des URLs courtes et mémorables</li>
            <li>• Définissez une date d'expiration si nécessaire</li>
          </ul>
        </Card> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeftIcon,
  UploadIcon,
  QrCodeIcon,
  CopyIcon,
  CheckIcon,
  ChevronDown
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import Input from "~/components/ui/Input.vue"
import RichTextEditor from "~/components/ui/RichTextEditor.vue"
import Switch from "~/components/ui/Switch.vue"
import Label from "~/components/ui/Label.vue"
import Select from "~/components/ui/Select.vue"
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'dashboard'
})

const emit = defineEmits(['back'])
const router = useRouter()
const config = useRuntimeConfig()
const { token, user } = useAuth()

const onBack = () => {
  router.push('/dashboard/links')
}

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
const loading = ref(false)
const error = ref('')
const urlError = ref('')
const qrCodeError = ref('')
const generatedLink = ref(null)
const qrCodeUrl = ref(null)
const copied = ref(false)
const imagePreview = ref(null)
const urlChecking = ref(false)
const urlAvailable = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const isUrlManuallyEdited = ref(false)
const invoices = ref([])
const invoiceLoading = ref(false)
const invoiceSearch = ref('')
const invoiceDetails = ref(null)
const invoiceError = ref('')
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
  }
}

// Marquer l'URL comme modifiée manuellement
const onUrlManualEdit = () => {
  isUrlManuallyEdited.value = true
  checkUrlAvailability()
}

// Validation de l'URL personnalisée
const validateCustomUrl = () => {
  const urlPattern = /^[a-zA-Z0-9-_]+$/
  if (formData.value.customUrl && !urlPattern.test(formData.value.customUrl)) {
    urlError.value = 'Uniquement lettres, chiffres, tirets et underscores'
    return false
  }
  urlError.value = ''
  return true
}

// Vérification de disponibilité de l'URL en temps réel
const checkUrlAvailability = async () => {
  if (urlCheckTimeout) {
    clearTimeout(urlCheckTimeout)
  }
  
  if (!formData.value.customUrl) {
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
  }, 500) // Debounce de 500ms
}


// Aperçu du lien en temps réel
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
      fetchInvoiceById(value)
    } else {
      invoiceDetails.value = null
    }
  }
)

watch(
  () => token.value,
  (value) => {
    if (value) fetchInvoices(invoiceSearch.value)
  },
  { immediate: true }
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
    }
  }
)

// Afficher un toast
const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    formData.value.image = file
    if (imagePreview.value) {
      URL.revokeObjectURL(imagePreview.value)
    }
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handlePdfUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    formData.value.pdf = file
    formData.value.invoiceId = null
    invoiceDetails.value = null
  }
}

const handleQrCodeError = () => {
  qrCodeError.value = 'Impossible de charger le QR Code'
  console.error('Erreur chargement QR Code:', qrCodeUrl.value)
}

const toggleAmountType = (checked) => {
  formData.value.amountType = checked ? 'flexible' : 'fixed'
}

const handleSubmit = async (event) => {
  event.preventDefault()
  loading.value = true
  error.value = ''

  if (!formData.value.title || !formData.value.description || !formData.value.customUrl) {
    error.value = 'Veuillez remplir tous les champs obligatoires.'
    loading.value = false
    return
  }

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

    if (formData.value.image) {
      body.append('image', formData.value.image)
    }

    if (formData.value.invoiceId) {
      body.append('invoice_id', String(formData.value.invoiceId))
    } else if (formData.value.pdf) {
      body.append('pdf', formData.value.pdf)
    }

    const response = await $fetch('/payment-links', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body
    })

    if (response.success && response.data) {
      generatedLink.value = response.data.payment_url
      qrCodeUrl.value = response.data.qr_code_url
      
      displayToast('Lien créé avec succès')
      
      console.log('Lien créé:', {
        payment_url: response.data.payment_url,
        qr_code_url: response.data.qr_code_url
      })
      router.push('/dashboard/links')
    }
  } catch (err) {
    console.error('Erreur création lien:', err)
    
    if (err.status === 422 && err.data?.errors) {
      const errors = Object.values(err.data.errors).flat()
      error.value = errors.join(' ')
    } else if (err.status === 401) {
      error.value = 'Votre session a expiré. Veuillez vous reconnecter.'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else if (err.status === 302 || err.status === 301) {
      error.value = 'Erreur d\'authentification. Veuillez vous reconnecter.'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else if (err.statusCode === 422 || err.response?.status === 422) {
      const errData = err.data || err.response?.data
      if (errData?.errors) {
        const errorMessages = []
        for (const field in errData.errors) {
          errorMessages.push(...errData.errors[field])
        }
        error.value = errorMessages.join('. ')
      } else {
        error.value = errData?.message || 'Erreur de validation.'
      }
    } else if (!err.status && err.message?.includes('fetch')) {
      error.value = 'Impossible de contacter le serveur. Vérifiez votre connexion.'
    } else {
      error.value = err.data?.message || err.message || 'Une erreur est survenue lors de la création du lien.'
    }
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  if (generatedLink.value) {
    await navigator.clipboard.writeText(generatedLink.value)
    copied.value = true
    displayToast('Lien copié dans le presse-papier')
    setTimeout(() => copied.value = false, 2000)
  }
}

const resetForm = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
    imagePreview.value = null
  }
  formData.value = {
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
  }
  documentType.value = 'pdf'
  invoiceSearch.value = ''
  invoiceDetails.value = null
  invoiceError.value = ''
  generatedLink.value = null
  qrCodeUrl.value = null
  qrCodeError.value = ''
  error.value = ''
  urlError.value = ''
  isUrlManuallyEdited.value = false
}
</script>
