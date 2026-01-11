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
        <p class="text-gray-600 text-sm sm:text-base">Configurez les informations par defaut de vos factures.</p>
      </div>
      <Button variant="outline" class="text-sm py-2" @click="goToInvoices">
        Retour aux factures
      </Button>
    </div>

    <div v-if="loading" class="text-center py-10">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    </div>

    <div v-else class="space-y-6">
      <Card class="p-4 sm:p-6 space-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Building2 class="w-4 h-4 text-gray-500" />
          Profil emetteur
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Nom / Societe</Label>
            <Input v-model="form.issuer.name" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Email</Label>
            <Input v-model="form.issuer.email" type="email" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Telephone</Label>
            <Input v-model="form.issuer.phone" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">TVA</Label>
            <Input v-model="form.issuer.tax_id" class="text-sm py-2" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <Label class="text-xs text-gray-500">Adresse</Label>
            <Textarea v-model="form.issuer.address" rows="3" class="text-sm" />
          </div>
        </div>
      </Card>

      <Card class="p-4 sm:p-6 space-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Hash class="w-4 h-4 text-gray-500" />
          Numerotation
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Prefix</Label>
            <Input v-model="form.numbering.prefix" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Padding</Label>
            <Input v-model="form.numbering.padding" type="number" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Prochain numero</Label>
            <Input v-model="form.numbering.next_number" type="number" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Reset annuel</Label>
            <div class="flex items-center gap-2">
              <Switch :checked="form.numbering.reset_annually" @update:checked="toggleReset" />
              <span class="text-sm text-gray-600">{{ form.numbering.reset_annually ? 'Actif' : 'Inactif' }}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card class="p-4 sm:p-6 space-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Palette class="w-4 h-4 text-gray-500" />
          Theme par defaut
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Couleur principale</Label>
            <Input v-model="form.theme.primary_color" type="color" class="h-10 p-1" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Couleur secondaire</Label>
            <Input v-model="form.theme.secondary_color" type="color" class="h-10 p-1" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <Label class="text-xs text-gray-500">Police</Label>
            <Select v-model="form.theme.font_family" :options="fontOptions" />
          </div>
        </div>
        <div class="rounded-lg border border-gray-200 p-4" :style="{ fontFamily: form.theme.font_family }">
          <p class="text-xs text-gray-500 mb-1">Apercu</p>
          <p class="text-base font-semibold" :style="{ color: form.theme.primary_color }">Facture #2025-001</p>
          <p class="text-sm text-gray-600">Client Demo - Total 150 000 XOF</p>
        </div>
      </Card>

      <Card class="p-4 sm:p-6 space-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <FileText class="w-4 h-4 text-gray-500" />
          Notes et conditions
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Notes par defaut</Label>
            <Textarea v-model="form.defaults.notes" rows="3" class="text-sm" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Conditions par defaut</Label>
            <Textarea v-model="form.defaults.terms" rows="3" class="text-sm" />
          </div>
        </div>
      </Card>

      <Card class="p-4 sm:p-6 space-y-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Image class="w-4 h-4 text-gray-500" />
          Logo
        </div>
        <div class="flex flex-col md:flex-row gap-4 items-start">
          <div class="w-32 h-32 rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            <img v-if="logoPreview" :src="logoPreview" alt="Logo" class="w-full h-full object-contain rounded-lg" />
            <span v-else class="text-xs text-gray-400">Aucun logo</span>
          </div>
          <div class="space-y-2">
            <Button variant="outline" class="text-sm py-2" @click="triggerLogoUpload">
              Choisir un logo
            </Button>
            <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
            <p class="text-xs text-gray-500">PNG, JPG. Taille recommandee 300x300.</p>
          </div>
        </div>
      </Card>

      <div class="flex justify-end">
        <Button
          class="text-sm py-2"
          :style="{ backgroundColor: '#2ECC71', color: 'white' }"
          :disabled="saving"
          @click="saveSettings"
        >
          {{ saving ? 'Sauvegarde...' : 'Sauvegarder' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, XCircle, Building2, Hash, Palette, FileText, Image } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'
import Switch from '~/components/ui/Switch.vue'
import Textarea from '~/components/ui/Textarea.vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const { token } = useAuth()
const config = useRuntimeConfig()
const router = useRouter()

const loading = ref(true)
const saving = ref(false)
const logoInput = ref(null)
const logoFile = ref(null)
const logoPreview = ref('')

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const fontOptions = [
  { label: 'Poppins', value: 'Poppins' },
  { label: 'DejaVu Sans', value: 'DejaVu Sans' },
  { label: 'Bowlby One', value: 'Bowlby One' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Times New Roman', value: 'Times New Roman' }
]

const form = ref({
  issuer: {
    name: '',
    email: '',
    phone: '',
    tax_id: '',
    address: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country_code: 'FR'
  },
  numbering: {
    prefix: '',
    padding: 4,
    next_number: 1,
    reset_annually: false,
    reset_yearly: false
  },
  theme: {
    primary_color: '#2ECC71',
    secondary_color: '#0A1F44',
    font_family: 'Poppins',
    text_color: '#1F2937',
    background_color: '#FFFFFF'
  },
  defaults: {
    notes: '',
    terms: ''
  },
  defaultLayout: []
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const toggleReset = (checked) => {
  form.value.numbering.reset_annually = checked
  form.value.numbering.reset_yearly = checked
}

const triggerLogoUpload = () => {
  if (logoInput.value) logoInput.value.click()
}

const onLogoChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  logoFile.value = file
  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
  logoPreview.value = URL.createObjectURL(file)
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

const splitAddressLines = (value) => {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

const buildAddressPreview = (settings) => {
  const parts = []
  if (settings.address_line1) parts.push(settings.address_line1)
  if (settings.address_line2) parts.push(settings.address_line2)
  const cityLine = [settings.postal_code, settings.city].filter(Boolean).join(' ')
  if (cityLine) parts.push(cityLine)
  return parts.join('\n')
}

const looksLikeSettings = (value) => {
  if (!value || typeof value !== 'object') return false
  return (
    'issuer_name' in value ||
    'company_name' in value ||
    'address_line1' in value ||
    'issuer' in value ||
    'number_prefix' in value ||
    'numbering_prefix' in value ||
    'numbering' in value ||
    'default_theme' in value ||
    'theme' in value ||
    'default_notes' in value ||
    'defaults' in value ||
    'logo' in value ||
    'logo_url' in value
  )
}

const resolveSettings = (response) => {
  if (response?.success === true && response?.data) {
    return response.data
  }
  const candidates = [
    response?.data?.settings,
    response?.settings,
    response?.data?.data,
    response?.data,
    response
  ]
  return candidates.find(looksLikeSettings) || null
}

const applySettings = (settings) => {
  if (!settings) return
  const issuer = settings.issuer || settings.company || {}
  const numbering = settings.numbering || settings.invoice_numbering || {}
  const theme = settings.theme || settings.invoice_theme || settings.default_theme || {}
  const defaults = settings.defaults || settings.invoice_defaults || {}

  form.value.issuer.name = issuer.name || settings.issuer_name || settings.company_name || settings.name || form.value.issuer.name
  form.value.issuer.email = issuer.email || settings.issuer_email || settings.company_email || settings.email || form.value.issuer.email
  form.value.issuer.phone = issuer.phone || settings.issuer_phone || settings.company_phone || settings.phone || form.value.issuer.phone
  form.value.issuer.tax_id = issuer.tax_id || settings.issuer_tax_id || settings.company_tax_id || settings.tax_id || form.value.issuer.tax_id
  form.value.issuer.address_line1 = issuer.address_line1 || settings.address_line1 || form.value.issuer.address_line1
  form.value.issuer.address_line2 = issuer.address_line2 || settings.address_line2 || form.value.issuer.address_line2
  form.value.issuer.city = issuer.city || settings.city || form.value.issuer.city
  form.value.issuer.state = issuer.state || settings.state || form.value.issuer.state
  form.value.issuer.postal_code = issuer.postal_code || settings.postal_code || form.value.issuer.postal_code
  form.value.issuer.country_code = issuer.country_code || settings.country_code || form.value.issuer.country_code || 'FR'
  form.value.issuer.address = buildAddressPreview({
    address_line1: form.value.issuer.address_line1,
    address_line2: form.value.issuer.address_line2,
    postal_code: form.value.issuer.postal_code,
    city: form.value.issuer.city
  }) || form.value.issuer.address

  form.value.numbering.prefix = numbering.prefix || settings.number_prefix || settings.numbering_prefix || settings.prefix || form.value.numbering.prefix
  form.value.numbering.padding = numbering.padding ?? settings.number_padding ?? settings.numbering_padding ?? settings.padding ?? form.value.numbering.padding
  form.value.numbering.next_number = numbering.next_number ?? settings.next_number ?? settings.numbering_next_number ?? settings.next_number ?? form.value.numbering.next_number
  form.value.numbering.reset_annually = Boolean(
    numbering.reset_annually ??
    numbering.reset_yearly ??
    settings.reset_yearly ??
    numbering.reset_yearly ??
    settings.numbering_reset_annually ??
    settings.reset_annually ??
    form.value.numbering.reset_annually
  )
  form.value.numbering.reset_yearly = form.value.numbering.reset_annually

  form.value.theme.primary_color = theme.primary_color || theme.primaryColor || settings.theme_primary_color || form.value.theme.primary_color
  form.value.theme.secondary_color = theme.secondary_color || theme.secondaryColor || settings.theme_secondary_color || form.value.theme.secondary_color
  form.value.theme.font_family = theme.font_family || theme.fontFamily || settings.theme_font_family || form.value.theme.font_family
  form.value.theme.text_color = theme.text_color || theme.textColor || form.value.theme.text_color
  form.value.theme.background_color = theme.background_color || theme.backgroundColor || form.value.theme.background_color

  const notesValue = defaults.notes || settings.default_notes || settings.notes || form.value.defaults.notes
  const termsValue = defaults.terms || settings.default_terms || settings.terms || form.value.defaults.terms
  form.value.defaults.notes = notesValue
  form.value.defaults.terms = termsValue
  form.value.defaultLayout = settings.default_layout || form.value.defaultLayout

  const logoCandidate =
    settings.logo_url ||
    settings.logo_path ||
    settings.logo ||
    settings.company_logo ||
    settings.issuer_logo ||
    settings.issuer_logo_path ||
    issuer.logo_url ||
    issuer.logo ||
    ''
  logoPreview.value = resolveLogoUrl(logoCandidate) || logoPreview.value
}

const loadSettings = async () => {
  loading.value = true
  try {
    if (!token.value) {
      showToast('Connexion requise', 'error')
      return
    }
    const response = await $fetch('/invoices/settings', {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    const settingsData = resolveSettings(response) || response?.data
    if (!settingsData) {
      showToast('Parametres introuvables', 'error')
      return
    }
    applySettings(settingsData)
  } catch (err) {
    console.error('Erreur chargement settings factures:', err)
    showToast('Impossible de charger les parametres', 'error')
  } finally {
    loading.value = false
  }
}

const buildPayload = () => ({
  company_name: form.value.issuer.name,
  email: form.value.issuer.email,
  phone: form.value.issuer.phone,
  tax_id: form.value.issuer.tax_id,
  address_line1: splitAddressLines(form.value.issuer.address)[0] || form.value.issuer.address_line1 || '',
  address_line2: splitAddressLines(form.value.issuer.address).slice(1).join(' ') || form.value.issuer.address_line2 || '',
  city: form.value.issuer.city || null,
  state: form.value.issuer.state || null,
  postal_code: form.value.issuer.postal_code || null,
  country_code: form.value.issuer.country_code || 'FR',
  number_prefix: form.value.numbering.prefix,
  number_padding: Number(form.value.numbering.padding || 0),
  next_number: Number(form.value.numbering.next_number || 0),
  reset_yearly: form.value.numbering.reset_annually ? 1 : 0,
  default_theme: {
    textColor: form.value.theme.text_color,
    fontFamily: form.value.theme.font_family,
    primaryColor: form.value.theme.primary_color,
    secondaryColor: form.value.theme.secondary_color,
    backgroundColor: form.value.theme.background_color
  },
  default_layout: form.value.defaultLayout,
  default_notes: form.value.defaults.notes,
  default_terms: form.value.defaults.terms
})

const saveSettings = async () => {
  if (!token.value) {
    showToast('Connexion requise', 'error')
    return
  }
  saving.value = true
  try {
    const payload = buildPayload()
    if (logoFile.value) {
      const body = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        if (key === 'default_theme' || key === 'default_layout') return
        body.append(key, value ?? '')
      })
      body.append('default_theme[textColor]', payload.default_theme?.textColor || '')
      body.append('default_theme[fontFamily]', payload.default_theme?.fontFamily || '')
      body.append('default_theme[primaryColor]', payload.default_theme?.primaryColor || '')
      body.append('default_theme[secondaryColor]', payload.default_theme?.secondaryColor || '')
      body.append('default_theme[backgroundColor]', payload.default_theme?.backgroundColor || '')
      body.append('default_layout', JSON.stringify(payload.default_layout || []))
      body.append('logo', logoFile.value)
      body.append('_method', 'PUT')

      const response = await $fetch('/invoices/settings', {
        method: 'POST',
        baseURL: config.public.apiBaseURL,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body
      })
      if (response?.success === false) {
        showToast(response.message || 'Erreur lors de la sauvegarde', 'error')
        return
      }
    } else {
      const response = await $fetch('/invoices/settings', {
        method: 'PUT',
        baseURL: config.public.apiBaseURL,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: payload
      })
      if (response?.success === false) {
        showToast(response.message || 'Erreur lors de la sauvegarde', 'error')
        return
      }
    }
    showToast('Parametres sauvegardes')
    await loadSettings()
  } catch (err) {
    console.error('Erreur sauvegarde settings:', err)
    showToast(err?.data?.message || 'Erreur lors de la sauvegarde', 'error')
  } finally {
    saving.value = false
  }
}

const goToInvoices = () => {
  router.push('/dashboard/invoices')
}

onMounted(loadSettings)
</script>
