<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
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
                paylink.pro/
              </div>
              <Input
                  id="customUrl"
                  v-model="formData.customUrl"
                  placeholder="mon-lien-unique"
                  class="rounded-l-none text-sm py-2"
                  required
              />
            </div>
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <Label for="image" class="text-sm">Image *</Label>
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
                ✓ {{ formData.image.name }}
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
                ✓ {{ formData.pdf.name }}
              </p>
            </div>
          </div>

          <!-- Amount Configuration -->
          <div class="space-y-4">
            <Label class="text-sm">Type de montant</Label>
            <div class="flex items-center space-x-2">
              <Switch
                  :checked="formData.amountType === 'free'"
                  @update:checked="toggleAmountType"
              />
              <span class="text-xs sm:text-sm">
      {{ formData.amountType === 'free' ? 'Montant libre' : 'Montant fixe' }}
    </span>
            </div>

            <!-- Sélecteur devise toujours visible -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="currency" class="text-sm">Devise *</Label>
                <select
                    v-model="formData.currencyId"
                    id="currency"
                    class="border rounded-md px-3 py-2 bg-white text-sm w-full"
                >
                  <option disabled value="">-- Sélectionnez une devise --</option>
                  <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                    {{ currency.symbol }} {{ currency.name }} ({{ currency.code }})
                  </option>
                </select>
              </div>

              <!-- Champ Montant uniquement si montant fixe -->
              <div v-if="formData.amountType === 'fixed'" class="space-y-2">
                <Label for="amount" class="text-sm">Montant</Label>
                <Input
                    id="amount"
                    type="number"
                    v-model="formData.fixedAmount"
                    placeholder="0.00"
                    class="text-sm py-2 w-full"
                />
              </div>
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
            Lien créé avec succès ! 🎉
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
              <QrCodeIcon class="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p class="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">QR Code généré automatiquement</p>
              <Button variant="outline" class="gap-2 text-sm py-2">
                <QrCodeIcon class="w-4 h-4" />
                Télécharger le QR Code
              </Button>
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
              <p class="text-xs sm:text-sm text-gray-600">
                URL: paylink.pro/{{ formData.customUrl || 'votre-url' }}
              </p>
              <p class="text-base sm:text-lg font-semibold mt-2" style="color: #2ECC71">
                {{ formData.amountType === 'free'
                  ? 'Montant libre'
                  : formData.fixedAmount
                      ? `${formData.fixedAmount} ${getCurrencySymbol(formData.currencyId)}`
                      : 'Prix non défini'
                }}
              </p>
            </div>
          </div>
        </Card>

        <!-- Tips -->
        <Card class="p-4 sm:p-6 border-l-4" :style="{ borderLeftColor: '#F39C12' }">
          <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: #0A1F44">
            💡 Conseils pour optimiser vos liens
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
  CheckIcon,
  DollarSignIcon
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import Input from "~/components/ui/Input.vue"
import Textarea from "~/components/ui/Textarea.vue"
import Switch from "~/components/ui/Switch.vue"
import Label from "~/components/ui/Label.vue"
import { useCurrencies } from '~/composables/useCurrencies'

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
  fixedAmount: 0,
  currencyId: '',
  expirationDate: ''
})

const loading = ref(false)
const error = ref('')
const generatedLink = ref(null)
const copied = ref(false)
const imagePreview = ref(null)

// 👉 utilisation de ton composable
const { currencies, currenciesLoading } = useCurrencies()

// Quand les devises sont chargées, mettre une valeur par défaut
watchEffect(() => {
  if (!currenciesLoading.value && currencies.value.length > 0 && !formData.value.currencyId) {
    formData.value.currencyId = currencies.value[0].id
  }
})

const getCurrencySymbol = (currencyId) => {
  const currency = currencies.value.find(c => c.id === currencyId)
  return currency ? currency.symbol : 'CFA'
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

const toggleAmountType = (checked) => {
  formData.value.amountType = checked ? 'free' : 'fixed'
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

  if (!formData.value.currencyId) {
    error.value = 'Veuillez sélectionner une devise.'
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
    body.append('currency_id', formData.value.currencyId)

    if (formData.value.amountType === 'fixed') {
      body.append('fixed_amount', formData.value.fixedAmount)
    } else {
      body.append('fixed_amount', 0)
    }

    if (formData.value.expirationDate) {
      const date = new Date(formData.value.expirationDate)
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

    generatedLink.value = `https://paylink.pro/${response.data.custom_url}`

  } catch (err) {
    console.error('Erreur création lien:', err)
    error.value = err.data?.message || 'Une erreur est survenue lors de la création du lien.'
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  if (generatedLink.value) {
    await navigator.clipboard.writeText(generatedLink.value)
    copied.value = true
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
    fixedAmount: '',
    currencyId: currencies.value.length > 0 ? currencies.value[0].id : null,
    expirationDate: ''
  }
  generatedLink.value = null
  error.value = ''
}
</script>