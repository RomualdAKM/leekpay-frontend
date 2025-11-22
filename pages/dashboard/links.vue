<template>
  <div>
    <div class="p-2 sm:p-2 space-y-4">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <!-- <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style="color: #0A1F44">Mes Liens de Paiement</h1> -->
          <p class="text-gray-600 text-sm sm:text-base">Gérez tous vos liens de paiement</p>
        </div>
        <Button
            @click="navigateToCreateLink"
            class="flex items-center gap-2 w-full md:w-auto py-2 text-sm sm:text-base"
            :style="{ backgroundColor: '#2ECC71', color: 'white' }"
        >
          <Link2Icon class="w-4 h-4" /> Créer un lien
        </Button>
      </div>

      <!-- Recherche et filtres -->
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              @input="debouncedSearch"
              type="text"
              placeholder="Rechercher par titre, description ou URL..."
              class="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <select
            v-model="filterStatus"
            @change="applyFilters"
            class="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
          <select
            v-model="filterExpired"
            @change="applyFilters"
            class="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="all">Tous</option>
            <option value="false">Valides</option>
            <option value="true">Expirés</option>
          </select>
        </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card class="p-3 sm:p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
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
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <EyeIcon class="w-5 h-5" style="color: #0A1F44" />
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
            <div class="w-10 h-10 rounded-full bg-gray-100  flex items-center justify-center flex-shrink-0">
              <DollarSignIcon class="w-5 h-5" style="color: #0A1F44" />
            </div>
            <div>
              <p class="text-xs sm:text-sm text-gray-600">Total collecté</p>
              <p class="text-lg sm:text-xl font-semibold" style="color: #0A1F44">
                {{ formatAmount(stats.total_collected) }} {{ user?.currency?.symbol || 'XOF' }}
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
                :src="safeImageSrc(link.image_url)"
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
              <!-- <p v-html="link.description" class="text-xs sm:text-sm text-gray-600 line-clamp-2">
              </p> -->
            </div>

            <div class="flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <EyeIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {{ link.click_count || 0 }} clics
              </div>
              <div class="flex items-center gap-1">
                <!-- <DollarSignIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4" /> -->
                {{ formatAmount(link.total_collected) }} {{ user?.currency?.symbol || 'XOF' }}
              </div>
            </div>

            <div class="pt-3 sm:pt-4 border-t border-gray-100">
              <div class="text-xs sm:text-sm text-gray-600 mb-3">
                <p class="mb-1 break-all">https://leekpay.me/{{ link.custom_url }}</p>
                <p v-if="link.amount_type === 'fixed' && link.fixed_amount" class="text-gray-500">
                  {{ formatAmount(link.fixed_amount) }} {{ user?.currency?.symbol || 'XOF' }}
                </p>
                <p v-else class="text-gray-500">Montant flexible</p>
              </div>

              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1">
                  <button
                    @click="copyToClipboard(link.custom_url)"
                    class="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Copier le lien"
                  >
                    <CopyIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="openQr(link.qr_code_url)"
                    class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Voir le QR Code"
                  >
                    <QrCodeIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="downloadPdf(link.id)"
                    :disabled="downloadingPdf === link.id"
                    class="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Télécharger le rapport PDF"
                  >
                    <DownloadIcon v-if="downloadingPdf !== link.id" class="w-4 h-4" />
                    <div v-else class="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </button>
                  <button
                    @click="openLink(link.custom_url)"
                    class="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Ouvrir le lien"
                  >
                    <ExternalLinkIcon class="w-4 h-4" />
                  </button>
                </div>

                <div class="flex items-center gap-1">
                  <button
                    @click="editLink(link.id)"
                    class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <EditIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="toggleStatus(link)"
                    :class="[
                      'p-2 rounded-lg transition-colors',
                      link.is_active
                        ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                        : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    ]"
                    :title="link.is_active ? 'Désactiver' : 'Activer'"
                  >
                    <PowerIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(link)"
                    class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
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

      <!-- Pagination -->
      <div v-if="!loading && pagination.total > pagination.per_page" class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-600">
          Affichage de {{ pagination.from }} à {{ pagination.to }} sur {{ pagination.total }} liens
        </p>
        <div class="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-1.5 text-sm"
          >
            Précédent
          </Button>
          
          <div class="flex gap-1">
            <Button
              v-for="page in visiblePages"
              :key="page"
              variant="outline"
              size="sm"
              @click="goToPage(page)"
              :style="{
                backgroundColor: page === pagination.current_page ? '#2ECC71' : 'transparent',
                color: page === pagination.current_page ? 'white' : '#0A1F44',
                borderColor: page === pagination.current_page ? '#2ECC71' : '#E5E7EB'
              }"
              class="px-3 py-1.5 text-sm min-w-[36px]"
            >
              {{ page }}
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1.5 text-sm"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div
        v-if="copied"
        class="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50"
      >
        {{ toastMessage }}
      </div>
    </Transition>

    <!-- Modal QR Code -->
    <Transition name="fade">
      <div
        v-if="showQrModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="closeQrModal"
      >
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-sm">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">QR Code</h3>
              <button
                @click="closeQrModal"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div v-if="qrCodeUrl" class="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
              <img
                :src="qrCodeUrl"
                alt="QR Code"
                class="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Suppression -->
    <Transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="cancelDelete"
      >
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md">
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Supprimer le lien</h3>
                <p class="text-sm text-gray-600 mb-6">
                  Voulez-vous vraiment supprimer "{{ linkToDelete?.title }}" ? Cette action est irréversible.
                </p>
                <div class="flex gap-3">
                  <button
                    @click="cancelDelete"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    @click="deleteLink"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { h, onMounted, ref, computed } from 'vue'
import {
  Link2Icon,
  EyeIcon,
  DollarSignIcon,
  QrCodeIcon,
  CopyIcon,
  ExternalLinkIcon,
  EditIcon,
  PowerIcon,
  TrashIcon,
  DownloadIcon
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue"
import Card from "~/components/ui/Card.vue"
import ImageWithFallback from "~/components/ui/ImageWithFallback.vue"
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'dashboard' })

const router = useRouter()
const config = useRuntimeConfig()
const { token, user } = useAuth()


// --- Modal QR Code ---
const showQrModal = ref(false)
const qrCodeUrl = ref('')

// --- Modal Suppression ---
const showDeleteModal = ref(false)
const linkToDelete = ref(null)

const openQr = (qrPath) => {
  if (!qrPath) return
  qrCodeUrl.value = qrPath.startsWith('http')
      ? qrPath
      : `${config.public.apiBaseURL}${qrPath}`
  showQrModal.value = true
}

const closeQrModal = () => {
  showQrModal.value = false
  qrCodeUrl.value = ''
}



// --- Copier le lien ---
const copied = ref(false)
const toastMessage = ref('')

const showToast = (message) => {
  toastMessage.value = message
  copied.value = true
  setTimeout(() => {
    copied.value = false
    toastMessage.value = ''
  }, 2000)
}

const copyToClipboard = async (customUrl) => {
  try {
    const fullLink = `https://leekpay.me/${customUrl}`
    await navigator.clipboard.writeText(fullLink)
    showToast('Lien copié !')
  } catch (e) {
    console.error('Erreur lors de la copie :', e)
    showToast('Erreur lors de la copie')
  }
}



const links = ref([])
const stats = ref({
  total_links: 0,
  total_clicks: 0,
  total_collected: 0
})
const loading = ref(true)
const error = ref('')
const userCurrencySymbol = ref('XOF')

const searchQuery = ref('')
const filterStatus = ref('all')
const filterExpired = ref('all')
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 9,
  total: 0,
  from: 0,
  to: 0
})

let debounceTimeout = null
const debouncedSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    pagination.value.current_page = 1
    fetchLinks()
  }, 500)
}

const applyFilters = () => {
  pagination.value.current_page = 1
  fetchLinks()
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    pagination.value.current_page = page
    fetchLinks()
  }
}

const visiblePages = computed(() => {
  const pages = []
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  
  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...', last)
    } else if (current >= last - 3) {
      pages.push(1, '...')
      for (let i = last - 4; i <= last; i++) pages.push(i)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', last)
    }
  }
  
  return pages.filter(p => p !== '...')
})

// Navigation
const navigateToCreateLink = () => {
  router.push('/dashboard/create-link')
}

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

    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      per_page: pagination.value.per_page.toString()
    })

    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }
    if (filterStatus.value !== 'all') {
      params.append('status', filterStatus.value)
    }
    if (filterExpired.value !== 'all') {
      params.append('expired', filterExpired.value)
    }

    const response = await $fetch(`/payment-links?${params.toString()}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    links.value = Array.isArray(response.data) ? response.data : []
    
    const meta = response.meta || response.data?.meta
    if (meta) {
      pagination.value = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        per_page: meta.per_page,
        total: meta.total,
        from: meta.from || 0,
        to: meta.to || 0
      }
    }

    if (response.stats) {
      stats.value = {
        total_links: response.stats.total_links ?? links.value.length,
        total_clicks: response.stats.total_clicks ?? 0,
        total_collected: response.stats.total_collected ?? 0
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
// const safeImageSrc = (path) => {
//   if (!path) return null
//   const base = String(config.public.apiBaseURL || '').replace(/\/$/, '')
//   const p = String(path).replace(/^\//, '')
//   return `${base}/${p}`
// }


const safeImageSrc = (imageUrl) => {
  if (!imageUrl) return '/Logo_de_LeekPay_avec_arriere-plan.png'
  return imageUrl.startsWith('http')
      ? imageUrl
      : `${config.public.apiBaseURL}${imageUrl}`
}



const formatAmount = (value) => {
  const n = Number(value || 0)
  return n.toLocaleString()
}

// Fonction pour obtenir le symbole de devise
const getCurrencySymbol = (currencyId) => {
  // Utiliser la devise de l'utilisateur connecté
  return user.value?.currency?.symbol || 'XOF'
}

const getStatusBadge = (is_active, expires_at) => {
  if (!is_active) return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700' }, 'Inactif')

  const expires = expires_at ? new Date(expires_at) : null
  if (expires && expires < new Date()) {
    return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700' }, 'Expiré')
  }

  return h('span', { class: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700' }, 'Actif')
}

const editLink = (id) => {
  router.push(`/dashboard/edit-link/${id}`)
}

const openLink = (customUrl) => {
  window.open(`https://leekpay.me/${customUrl}`, '_blank')
}

// Toggle actif/inactif
const toggleStatus = async (link) => {
  try {
    const response = await $fetch(`/payment-links/${link.id}`, {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        is_active: !link.is_active
      }
    })

    link.is_active = !link.is_active
    showToast(link.is_active ? 'Lien activé' : 'Lien désactivé')
  } catch (err) {
    console.error('Erreur toggle:', err)
    showToast('Erreur lors du changement de statut')
  }
}

// Téléchargement PDF
const downloadingPdf = ref(null)

const downloadPdf = async (linkId) => {
  try {
    downloadingPdf.value = linkId
    
    const response = await fetch(`${config.public.apiBaseURL}/payment-links/${linkId}/export-pdf`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/pdf'
      }
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la génération du PDF')
    }

    // Récupérer le blob PDF
    const blob = await response.blob()
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rapport-lien-${linkId}-${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(a)
    a.click()
    
    // Nettoyer
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    showToast('PDF téléchargé avec succès')
  } catch (err) {
    console.error('Erreur téléchargement PDF:', err)
    showToast('Erreur lors du téléchargement du PDF')
  } finally {
    downloadingPdf.value = null
  }
}

// Suppression
const confirmDelete = (link) => {
  linkToDelete.value = link
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  linkToDelete.value = null
}

const deleteLink = async () => {
  if (!linkToDelete.value) return

  try {
    await $fetch(`/payment-links/${linkToDelete.value.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    links.value = links.value.filter(l => l.id !== linkToDelete.value.id)
    stats.value.total_links = stats.value.total_links - 1
    showToast('Lien supprimé avec succès')
    showDeleteModal.value = false
    linkToDelete.value = null
    
    if (links.value.length === 0 && pagination.value.current_page > 1) {
      pagination.value.current_page--
      fetchLinks()
    }
  } catch (err) {
    console.error('Erreur suppression:', err)
    showToast('Erreur lors de la suppression')
  }
}

// Lancement initial
onMounted(fetchLinks)
</script>
