<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
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
        <h1 class="text-xl sm:text-2xl font-bold" style="color: #0A1F44">
          Modifier le lien de paiement
        </h1>
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
          <!-- Title -->
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

          <!-- Description -->
          <div class="space-y-2">
            <Label for="description" class="text-sm">Description *</Label>
            <Textarea
                id="description"
                v-model="formData.description"
                :rows="3"
                required
                class="text-sm py-2"
            />
          </div>

          <!-- Custom URL -->
          <div class="space-y-2">
            <Label for="customUrl" class="text-sm">URL personnalisée *</Label>
            <div class="flex">
              <div
                  class="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-xs sm:text-sm text-gray-600"
              >
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
            <p v-else-if="urlAvailable && formData.customUrl && hasUrlChanged" class="text-xs text-green-600">URL disponible</p>
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <Label for="image" class="text-sm">Image (optionnel)</Label>
            <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center"
            >
              <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  class="mx-auto h-24 mb-2 object-contain rounded"
              />
              <p v-else class="text-xs sm:text-sm text-gray-500 mb-2">
                Aucune image sélectionnée
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
            <Label for="pdf" class="text-sm">PDF (optionnel)</Label>
            <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
            >
              <Button
                  type="button"
                  variant="outline"
                  @click="$refs.pdfInput.click()"
                  class="w-full gap-2 text-sm py-2 sm:py-3"
              >
                <UploadIcon class="w-4 h-4" />
                Remplacer le PDF
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
                {{ formData.amountType === 'flexible'
                  ? 'Montant libre'
                  : 'Montant fixe' }}
              </span>
            </div>

            <div
                v-if="formData.amountType === 'fixed'"
                class="space-y-2"
            >
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

          <!-- Redirect URL -->
          <div class="space-y-2">
            <Label for="redirectUrl" class="text-sm">URL de redirection (optionnel)</Label>
            <Input
                id="redirectUrl"
                type="url"
                v-model="formData.redirectUrl"
                placeholder="https://example.com/success"
                class="text-sm py-2"
            />
            <p class="text-xs text-gray-500">
              URL vers laquelle rediriger l'utilisateur après un paiement réussi
            </p>
          </div>

          <!-- Messages -->
          <div v-if="error" class="text-red-600 text-sm p-2 bg-red-50 rounded text-center">
            {{ error }}
          </div>

          <!-- Submit -->
          <Button
              type="submit"
              :disabled="loading"
              class="w-full gap-2 py-3 text-sm sm:text-base"
              :style="{ backgroundColor: '#2ECC71', color: 'white' }"
          >
            {{ loading ? 'Mise à jour...' : 'Mettre à jour le lien' }}
          </Button>
        </form>
      </Card>

      <!-- Preview -->
      <div>
        <Card class="p-4 sm:p-6">
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
            <p class="text-sm text-gray-600">
              {{ formData.description || 'Description...' }}
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
import { ArrowLeftIcon, UploadIcon, CheckIcon } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'
import Textarea from '~/components/ui/Textarea.vue'
import Switch from '~/components/ui/Switch.vue'
import Label from '~/components/ui/Label.vue'

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
  amountType: 'fixed',
  fixedAmount: null,
  expirationDate: '',
  redirectUrl: ''
})

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

watch(() => formData.value.customUrl, () => {
  validateCustomUrl()
})

const previewUrl = computed(() => {
  if (formData.value.customUrl) {
    return `https://leekpay.me/${formData.value.customUrl}`
  }
  return 'https://leekpay.me/votre-lien'
})

const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Charger le lien existant
onMounted(async () => {
  try {
    const linkId = route.params.id
    const response = await $fetch(`/payment-links/${linkId}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    const link = response.data

    originalUrl.value = link.custom_url
    
    formData.value = {
      title: link.title,
      description: link.description,
      customUrl: link.custom_url,
      image: null,
      pdf: null,
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
  } catch (err) {
    console.error(err)
    error.value = 'Impossible de charger le lien'
  }
})

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
  if (file) formData.value.pdf = file
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
    if (formData.value.pdf) body.append('pdf', formData.value.pdf)

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
