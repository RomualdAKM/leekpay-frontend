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
        <form @submit.prevent="handleSubmit" class="space-y-6" :class="{ 'opacity-75 pointer-events-none': loading }">
          <!-- Title -->
          <div class="space-y-2">
            <Label for="title" class="text-sm">Titre *</Label>
            <Input
                id="title"
                v-model="formData.title"
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
              <div class="bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-xs sm:text-sm text-gray-600">
                paylink.pro/
              </div>
              <Input
                  id="customUrl"
                  v-model="formData.customUrl"
                  class="rounded-l-none text-sm py-2"
                  required
              />
            </div>
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <Label for="image" class="text-sm">Image *</Label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  class="mx-auto h-24 mb-2 object-contain"
              />
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
            <Label for="pdf" class="text-sm">PDF (optionnel)</Label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
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
                ✓ {{ formData.pdf.name }}
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
                    {{ currency.symbol }} {{ currency.name }}
                  </option>
                </select>
              </div>

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
            <Label for="expiration" class="text-sm">Date d'expiration</Label>
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
            <img v-if="imagePreview" :src="imagePreview" class="w-full h-40 object-contain rounded-lg" />
            <p v-else class="text-gray-500 text-sm">Aucune image</p>
          </div>
          <div class="pt-3">
            <h4 class="font-semibold">{{ formData.title || 'Titre' }}</h4>
            <p class="text-sm text-gray-600">{{ formData.description || 'Description...' }}</p>
            <p class="text-xs text-gray-600 mt-2">URL: paylink.pro/{{ formData.customUrl }}</p>
            <p class="text-base font-semibold mt-1" style="color: #2ECC71">
              {{ formData.amountType === 'flexible'
                ? 'Montant libre'
                : formData.fixedAmount ? formData.fixedAmount + ' ' + getCurrencySymbol(formData.currencyId) : '---'
              }}
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, UploadIcon } from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import Input from "~/components/ui/Input.vue"
import Textarea from "~/components/ui/Textarea.vue"
import Switch from "~/components/ui/Switch.vue"
import Label from "~/components/ui/Label.vue"
import { useCurrencies } from '~/composables/useCurrencies'

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
  currencyId: '',
  expirationDate: ''
})

const imagePreview = ref(null)
const loading = ref(false)
const error = ref('')
const { currencies } = useCurrencies()

// Charger lien existant
onMounted(async () => {
  try {
    const linkId = route.params.id
    const response = await $fetch(`/payment-links/${linkId}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    const link = response.data
    formData.value = {
      title: link.title,
      description: link.description,
      customUrl: link.custom_url,
      image: null,
      pdf: null,
      amountType: link.amount_type,
      fixedAmount: link.fixed_amount,
      currencyId: link.currency_id,
      expirationDate: link.expires_at ? link.expires_at.substring(0,10) : ''
    }
    imagePreview.value = link.image_url
  } catch (err) {
    error.value = "Impossible de charger le lien"
  }
})

// Helpers
const getCurrencySymbol = (currencyId) => {
  const c = currencies.value.find(c => c.id === currencyId)
  return c ? c.symbol : ''
}
const handleImageUpload = e => {
  const file = e.target.files?.[0]
  if (file) {
    formData.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}
const handlePdfUpload = e => {
  const file = e.target.files?.[0]
  if (file) formData.value.pdf = file
}
const toggleAmountType = checked => {
  formData.value.amountType = checked ? 'flexible' : 'fixed'
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    const body = new FormData()
    body.append('title', formData.value.title)
    body.append('description', formData.value.description)
    body.append('custom_url', formData.value.customUrl)
    body.append('amount_type', formData.value.amountType)
    body.append('currency_id', formData.value.currencyId)
    if (formData.value.amountType === 'fixed') {
      body.append('fixed_amount', formData.value.fixedAmount)
    }
    if (formData.value.expirationDate) {
      body.append('expires_at', new Date(formData.value.expirationDate).toISOString())
    }
    if (formData.value.image) body.append('image', formData.value.image)
    if (formData.value.pdf) body.append('pdf', formData.value.pdf)

    await $fetch(`/payment-links/${route.params.id}`, {
      method: 'POST', // ⚠️ Si ton API supporte PUT/PATCH mets-le ici
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
      body
    })

    router.push('/links') // retour liste
  } catch (err) {
    error.value = err.data?.message || 'Erreur lors de la mise à jour.'
  } finally {
    loading.value = false
  }
}

const onBack = () => router.push('/links')
</script>
