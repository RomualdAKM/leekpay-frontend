<template>
  <div :class="[
    'flex font-sans overflow-x-hidden',
    forceDesktopMode ? 'min-h-screen' : 'h-screen'
  ]">
    <!-- Overlay (mobile only) -->
    <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
        :class="[
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:shadow-none',
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        ]"
    >
      <DashboardSidebar
          :active-section="currentPage"
          :collapsed="sidebarCollapsed && !isMobile"
          :can-collapse="!isMobile"
          @toggle-collapse="toggleSidebarCollapsed"
          @section-change="handleSectionChange"
      />
    </aside>

    <!-- Main Content -->
    <div :class="[
      'flex-1 flex flex-col ml-0',
      forceDesktopMode ? 'overflow-y-auto' : 'overflow-hidden'
    ]">
      <!-- Header -->
      <header class="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <!-- Hamburger button (mobile) -->
        <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 text-gray-600 hover:text-green-500 transition rounded lg:hidden"
            aria-label="Toggle sidebar"
        >
          <svg v-if="!sidebarOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p class="text-sm font-semibold text-gray-800 ">{{ pageTitle }}</p>
      </header>

      <!-- Page Content -->
      <main :class="[
        'flex-1 p-4 sm:p-6',
        forceDesktopMode ? '' : 'overflow-y-auto'
      ]">
        <slot />
      </main>
    </div>

    <!-- WhatsApp Channel Popup -->
    <WhatsAppPopup />
  </div>
</template>

<script setup>
import DashboardSidebar from '~/components/dashboard/Sidebar.vue'
import WhatsAppPopup from '~/components/dashboard/WhatsAppPopup.vue'
import { useAuth } from '~/composables/useAuth'  

const { requireAuth } = useAuth()  
requireAuth()  

const route = useRoute()
const mobileBreakpoint = 1024 // lg
const isMobile = ref(false)

// Détecter si la page force le mode desktop
const forceDesktopMode = inject('forceDesktopMode', false)

// Réinitialiser le viewport responsive pour le dashboard
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
    }
  ]
})

// État sidebar
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(true) // Par défaut fermé sur desktop

// Calcul de la section active
const currentPage = computed(() => {
  const path = route.path
  
  // Pages admin
  if (path.includes('/dashboard/admin/')) {
    const adminPage = path.split('/dashboard/admin/')[1]?.split('/')[0]
    return `dashboard/admin/${adminPage}`
  }
  
  // Pages spéciales avec sous-routes
  if (path.includes('/dashboard/sales-pages')) return 'dashboard/sales-pages'
  if (path.includes('/dashboard/invoices')) return 'dashboard/invoices'
  if (path.includes('/dashboard/links') || path.includes('/dashboard/edit-link')) return 'dashboard/links'
  if (path.includes('/dashboard/create-link')) return 'dashboard/create-link'
  
  // Pages simples
  const pathParts = path.split('/').filter(p => p)
  if (pathParts.length === 1 && pathParts[0] === 'dashboard') return 'dashboard'
  if (pathParts.length >= 2) return `dashboard/${pathParts[1]}`
  
  return 'dashboard'
})

const pageMap = {
  'dashboard': 'Tableau de bord',
  'dashboard/links': 'Liens de paiement',
  'dashboard/create-link': 'Créer un lien',
  'dashboard/transactions': 'Transactions',
  'dashboard/invoices': 'Factures',
  'dashboard/withdrawals': 'Retraits',
  'dashboard/sales-pages': 'Pages de vente',
  'dashboard/subscription': 'Abonnement',
  'dashboard/affiliation': 'Affiliation',
  'dashboard/kyc': 'Vérification KYC',
  'dashboard/api-keys': 'Clés API',
  'dashboard/settings': 'Paramètres',
  'dashboard/support': 'Support',
  'dashboard/admin/stats': 'Statistiques',
  'dashboard/admin/transactions': 'Transactions',
  'dashboard/admin/links': 'Liens',
  'dashboard/admin/sales-pages': 'Pages de vente',
  'dashboard/admin/invoices': 'Factures',
  'dashboard/admin/withdrawals': 'Retraits',
  'dashboard/admin/kyc': 'KYC',
  'dashboard/admin/broadcast': 'Communication',
  'dashboard/admin/templates': 'Templates',
  'dashboard/admin/banners': 'Bannières'
}

const pageTitle = computed(() => {
  return pageMap[currentPage.value] || 'Dashboard'
})

// Gérer la taille de l'écran
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < mobileBreakpoint
  if (!isMobile.value) {
    // Si mode desktop forcé (création facture), fermer la sidebar
    sidebarOpen.value = forceDesktopMode ? false : true
  } else {
    sidebarOpen.value = false // Fermée par défaut sur mobile
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  
  // Charger la préférence utilisateur APRÈS checkScreenSize
  if (process.client) {
    const saved = localStorage.getItem('leekpay_sidebar_collapsed')
    // Forcer fermé par défaut : si pas de valeur sauvegardée, utiliser true (fermé)
    sidebarCollapsed.value = saved === '0' ? false : true
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const handleSectionChange = (section) => {
  navigateTo(`/${section}`)
  if (isMobile.value) {
    sidebarOpen.value = false // Fermer sidebar après navigation sur mobile
  }
}

const toggleSidebarCollapsed = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  if (process.client) {
    localStorage.setItem('leekpay_sidebar_collapsed', sidebarCollapsed.value ? '1' : '0')
  }
}
</script>

<style scoped>
/* Empêche le scroll horizontal */
html, body {
  overflow-x: hidden;
}
</style>







