<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
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
        class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
      >
        <CheckIcon class="w-5 h-5" />
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <Button
          variant="outline"
          @click="onBack"
          class="gap-2 w-full sm:w-auto text-sm py-2"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Retour
      </Button>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold" style="color: #0A1F44">Créer un lien de paiement</h1>
        <p class="text-gray-600 text-sm sm:text-base">Configurez votre nouveau lien de paiement</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form -->
      <Card class="p-4 sm:p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6" :class="{ 'opacity-75 pointer-events-none': loading }">
          <!-- Title -->
          <div class="space-y-2">
            <Label for="title" class="text-sm">Titre *</Label>
            <Input
                id="title"
                v-model="formData.title"
                @input="generateUrlFromTitle"
                placeholder="Ex: Formation JavaScript"
                required
                class="text-sm py-2"
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description" class="text-sm">Description *</Label>
            <Textarea
                id="description"
                v-model="formData.description"
                placeholder="Décrivez votre produit ou service..."
                :rows="3"
                required
                class="text-sm py-2"
            />
          </div>

          <!-- Custom URL -->
          <div class="space-y-2">
            <Label for="customUrl" class="text-sm">URL personnalisée *</Label>
            <div class="flex">
              <div class="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-xs sm:text-sm text-gray-600">
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

          <!-- Image Upload -->
          <div class="space-y-2">
            <Label for="image" class="text-sm">Image (optionnel)</Label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <UploadIcon class="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p class="text-xs sm:text-sm text-gray-600 mb-2">
                Cliquez pour sélectionner une image
              </p>
              <Button
                  type="button"
                  variant="outline"
                  @click="$refs.imageInput.click()"
                  class="w-full text-sm py-2 sm:py-3"
              >
                Choisir un fichier
              </Button>
              <input
                  ref="imageInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
              />
              <p v-if="formData.image" class="text-xs text-green-600 mt-2">
                {{ formData.image.name }}
              </p>
            </div>
          </div>

          <!-- PDF Upload -->
          <div class="space-y-2">
            <Label for="pdf" class="text-sm">PDF à télécharger (optionnel)</Label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Button
                  type="button"
                  variant="outline"
                  @click="$refs.pdfInput.click()"
                  class="w-full gap-2 text-sm py-2 sm:py-3"
              >
                <UploadIcon class="w-4 h-4" />
                Ajouter un PDF
              </Button>
              <input
                  ref="pdfInput"
                  type="file"
                  accept=".pdf"
                  @change="handlePdfUpload"
                  class="hidden"
              />
              <p v-if="formData.pdf" class="text-xs text-green-600 mt-2">
                {{ formData.pdf.name }}
              </p>
            </div>
          </div>

          <!-- Amount Configuration -->
          <div class="space-y-4">
            <Label class="text-sm">Type de montant</Label>
            <div class="flex items-center space-x-2">
              <Switch
                  :checked="formData.amountType === 'flexible'"
                  @update:checked="toggleAmountType"
              />
              <span class="text-xs sm:text-sm">
      {{ formData.amountType === 'flexible' ? 'Montant libre' : 'Montant fixe' }}
    </span>
            </div>

            <!-- Champ Montant si fixe -->
            <div v-if="formData.amountType === 'fixed'" class="space-y-2">
              <Label for="amount" class="text-sm">Montant *</Label>
              <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  v-model="formData.fixedAmount"
                  placeholder="0.00"
                  class="text-sm py-2 w-full"
                  required
              />
            </div>
          </div>

          <!-- Expiration Date -->
          <div class="space-y-2">
            <Label for="expiration" class="text-sm">Date d'expiration (optionnel)</Label>
            <Input
                id="expiration"
                type="date"
                v-model="formData.expirationDate"
                class="text-sm py-2"
            />
          </div>

          <!-- Erreur API -->
          <div v-if="error" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <Button
              type="submit"
              :disabled="loading"
              class="w-full gap-2 py-3 text-sm sm:text-base"
              :style="{ backgroundColor: '#2ECC71', color: 'white' }"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Création...' : 'Créer le lien de paiement' }}
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

        <Card v-else class="p-4 sm:p-6">
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
              <p class="text-xs sm:text-sm text-gray-600 mt-1">
                {{ formData.description || 'Description du produit...' }}
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
        <Card class="p-4 sm:p-6 border-l-4" :style="{ borderLeftColor: '#F39C12' }">
          <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: #0A1F44">
            Conseils pour optimiser vos liens
          </h4>
          <ul class="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
            <li>• Utilisez des titres clairs et attractifs</li>
            <li>• Ajoutez une image de haute qualité</li>
            <li>• Créez des URLs courtes et mémorables</li>
            <li>• Définissez une date d'expiration si nécessaire</li>
          </ul>
        </Card>
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
  CheckIcon
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import Input from "~/components/ui/Input.vue"
import Textarea from "~/components/ui/Textarea.vue"
import Switch from "~/components/ui/Switch.vue"
import Label from "~/components/ui/Label.vue"

definePageMeta({
  layout: 'dashboard'
})

const emit = defineEmits(['back'])
const router = useRouter()
const config = useRuntimeConfig()
const { token } = useAuth()

const onBack = () => {
  emit('back')
}

const formData = ref({
  title: '',
  description: '',
  customUrl: '',
  image: null,
  pdf: null,
  amountType: 'fixed',
  fixedAmount: null,
  expirationDate: ''
})

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
let urlCheckTimeout = null

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

watch(() => formData.value.customUrl, () => {
  validateCustomUrl()
})

// Aperçu du lien en temps réel
const previewUrl = computed(() => {
  if (formData.value.customUrl) {
    return `https://leekpay.me/${formData.value.customUrl}`
  }
  return 'https://leekpay.me/votre-lien'
})

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
  if (file) formData.value.pdf = file
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

    if (formData.value.image) {
      body.append('image', formData.value.image)
    }

    if (formData.value.pdf) {
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
    amountType: 'fixed',
    fixedAmount: null,
    expirationDate: ''
  }
  generatedLink.value = null
  qrCodeUrl.value = null
  qrCodeError.value = ''
  error.value = ''
  urlError.value = ''
  isUrlManuallyEdited.value = false
}
</script>