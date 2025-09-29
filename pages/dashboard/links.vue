<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style="color: #0A1F44">Mes Liens de Paiement</h1>
        <p class="text-gray-600 text-sm sm:text-base">Gérez tous vos liens de paiement</p>
      </div>
      <Button
          @click="navigateToCreateLink"
          class="gap-2 w-full md:w-auto py-2 text-sm sm:text-base"
          :style="{ backgroundColor: '#2ECC71', color: 'white' }"
      >
        <Link2Icon class="w-4 h-4" />
        Créer un lien
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <Card class="p-3 sm:p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Link2Icon class="w-5 h-5" style="color: #0A1F44" />
          </div>
          <div>
            <p class="text-xs sm:text-sm text-gray-600">Total des liens</p>
            <p class="text-lg sm:text-xl font-semibold" style="color: #0A1F44">
              {{ stats.total_links }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-3 sm:p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <EyeIcon class="w-5 h-5" style="color: #2ECC71" />
          </div>
          <div>
            <p class="text-xs sm:text-sm text-gray-600">Total des clics</p>
            <p class="text-lg sm:text-xl font-semibold" style="color: #0A1F44">
              {{ stats.total_clicks }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-3 sm:p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <DollarSignIcon class="w-5 h-5" style="color: #F39C12" />
          </div>
          <div>
            <p class="text-xs sm:text-sm text-gray-600">Total collecté</p>
            <p class="text-lg sm:text-xl font-semibold" style="color: #0A1F44">
              {{ formatAmount(stats.total_collected) }} {{ currencyDisplay }}
            </p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center text-sm text-red-600 p-3 bg-red-50 rounded">
      {{ error }}
    </div>

    <!-- Links Grid -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card
          v-for="link in links"
          :key="link.id"
          class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative">
          <ImageWithFallback
              :src="safeImageSrc(link.image_path)"
              :alt="link.title || 'Image lien'"
              class="w-full aspect-[4/3] min-h-24 sm:min-h-32 max-h-64 object-cover"
          />
          <div class="absolute top-3 sm:top-4 right-3 sm:right-4">
            <component :is="getStatusBadge(link.is_active, link.expires_at)" />
          </div>
        </div>

        <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <h3 class="font-semibold text-base sm:text-lg mb-1 sm:mb-2" style="color: #0A1F44">
              {{ link.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {{ link.description }}
            </p>
          </div>

          <div class="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div class="flex items-center gap-1">
              <EyeIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              {{ link.click_count || 0 }} clics
            </div>
            <div class="flex items-center gap-1">
              <DollarSignIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              {{ formatAmount(link.total_collected) }} {{ getCurrencySymbol(link.currency_id) }}
            </div>
          </div>

          <div class="pt-3 sm:pt-4 border-t border-gray-100">
            <div class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              <p class="mb-1">URL: paylink.pro/{{ link.custom_url }}</p>
              <p v-if="link.amount_type === 'fixed' && link.fixed_amount">
                Montant: {{ link.fixed_amount }} {{ getCurrencySymbol(link.currency_id) }}
              </p>
              <p v-else>Montant: Libre</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mb-3">
              <Button
                  variant="outline"
                  size="sm"
                  @click="copyToClipboard(link.custom_url)"
                  class="flex-1 text-xs py-1.5"
              >
                <CopyIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1" />
                Copier
              </Button>

              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1 text-xs py-1.5"
                  @click="openQr(link.custom_url)"
              >
                <QrCodeIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1" />
                QR Code
              </Button>
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1 text-xs py-1.5"
                  @click="editLink(link.id)"
              >
                <EditIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1" />
                Modifier
              </Button>

              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1 text-xs py-1.5"
                  @click="openLink(link.custom_url)"
              >
                <ExternalLinkIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1" />
                Voir
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div v-if="links.length === 0" class="col-span-full text-center py-8 text-gray-500">
        Aucun lien de paiement pour le moment.
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="text-center py-12">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    </div>
  </div>
</template>

<script setup>
import { h, onMounted, ref } from 'vue'
import {
  Link2Icon,
  EyeIcon,
  DollarSignIcon,
  QrCodeIcon,
  CopyIcon,
  EditIcon,
  ExternalLinkIcon
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import ImageWithFallback from "~/components/ui/ImageWithFallback.vue"
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const router = useRouter()
const config = useRuntimeConfig()
const { token } = useAuth()

// États
const links = ref([])
const stats = ref({
  total_links: 0,
  total_clicks: 0,
  total_collected: 0
})
const loading = ref(true)
const error = ref('')

// Navigation
const navigateToCreateLink = () => {
  router.push('/dashboard/create-link')
}

// Récupère les liens
const fetchLinks = async () => {
  loading.value = true
  error.value = ''
  try {
    if (!token.value) {
      error.value = 'Non autorisé — veuillez vous reconnecter.'
      links.value = []
      stats.value = { total_links: 0, total_clicks: 0, total_collected: 0 }
      return
    }

    const response = await $fetch('/payment-links', {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    // safe assign
    links.value = Array.isArray(response.data) ? response.data : []
    // If API returns stats -> use them, otherwise compute local stats
    if (response.stats) {
      stats.value = {
        total_links: response.stats.total_links ?? links.value.length,
        total_clicks: response.stats.total_clicks ?? links.value.reduce((s, l) => s + (l.click_count || 0), 0),
        total_collected: response.stats.total_collected ?? links.value.reduce((s, l) => s + (Number(l.total_collected) || 0), 0)
      }
    } else {
      stats.value = {
        total_links: links.value.length,
        total_clicks: links.value.reduce((s, l) => s + (l.click_count || 0), 0),
        total_collected: links.value.reduce((s, l) => s + (Number(l.total_collected) || 0), 0)
      }
    }
  } catch (err) {
    console.error('Erreur chargement liens:', err)
    error.value = err?.data?.message || 'Impossible de charger vos liens.'
    links.value = []
    stats.value = { total_links: 0, total_clicks: 0, total_collected: 0 }
  } finally {
    loading.value = false
  }
}

// Utilitaires
const safeImageSrc = (path) => {
  if (!path) return null
  const base = String(config.public.apiBaseURL || '').replace(/\/$/, '')
  const p = String(path).replace(/^\//, '')
  return `${base}/${p}`
}

const formatAmount = (value) => {
  const n = Number(value || 0)
  return n.toLocaleString()
}

const currencyMap = {
  1: 'EUR',
  2: 'USD',
  3: 'XOF',
  4: 'XAF'
}
const currencySymbolMap = {
  EUR: '€',
  USD: '$',
  XOF: 'XOF',
  XAF: 'XAF'
}
const getCurrencySymbol = (currency_id) => {
  const code = currencyMap[currency_id] || 'XOF'
  return currencySymbolMap[code] || code
}

const getStatusBadge = (is_active, expires_at) => {
  if (!is_active) return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700' }, 'Inactif')

  const expires = expires_at ? new Date(expires_at) : null
  if (expires && expires < new Date()) {
    return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700' }, 'Expiré')
  }

  return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700' }, 'Actif')
}

// Actions utilitaires
const copyToClipboard = async (customUrl) => {
  try {
    const full = `https://paylink.pro/${customUrl}`
    await navigator.clipboard.writeText(full)
    // petit retour visuel
    // tu peux remplacer alert par un toast si tu en as un
    alert('Lien copié : ' + full)
  } catch (e) {
    console.error(e)
  }
}

const openQr = (customUrl) => {
  // ouvrir dans un modal ou nouvelle page pour générer le QR (placeholder)
  window.open(`https://paylink.pro/${customUrl}`, '_blank')
}

const editLink = (id) => {
  router.push(`/dashboard/edit-link/${id}`)
}

const openLink = (customUrl) => {
  window.open(`https://paylink.pro/${customUrl}`, '_blank')
}

// Lancement initial
onMounted(fetchLinks)
</script>
