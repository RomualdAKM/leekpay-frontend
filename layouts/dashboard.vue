<template>
  <div class="flex h-screen font-sans overflow-x-hidden">
    <!-- Overlay (mobile only) -->
    <div
        v-if="sidebarOpen && isMobile"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
        :class="[
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:shadow-none'
        ]"
    >
      <DashboardSidebar
          :active-section="currentPage"
          @section-change="handleSectionChange"
      />
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:ml-0">
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

        <h1 class="text-xl font-bold text-gray-800 hidden sm:block">{{ pageTitle }}</h1>
        <h1 class="text-lg font-bold text-gray-800 sm:hidden">{{ pageTitleShort }}</h1>

        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-600 hover:text-green-500 transition">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
            </svg>
          </button>
          <img src="~/assets/img/dashboard/avatar.png" alt="Avatar" class="h-8 w-8 rounded-full" />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardSidebar from '~/components/dashboard/Sidebar.vue'

const route = useRoute()
const mobileBreakpoint = 1024 // lg
const isMobile = ref(false)

// État sidebar
const sidebarOpen = ref(false)

// Calcul du titre
const currentPage = computed(() => {
  return route.path.split('/')[2] || 'dashboard'
})

const pageMap = {
  dashboard: 'Tableau de bord',
  links: 'Mes Liens',
  transactions: 'Transactions',
  withdrawals: 'Retraits',
  analytics: 'Analytiques',
  settings: 'Paramètres'
}

const pageTitle = computed(() => {
  return pageMap[currentPage.value] || 'Dashboard'
})

const pageTitleShort = computed(() => {
  const shortMap = {
    dashboard: 'Accueil',
    links: 'Liens',
    transactions: 'Trans.',
    withdrawals: 'Retraits',
    analytics: 'Stats',
    settings: 'Param.'
  }
  return shortMap[currentPage.value] || 'Accueil'
})

// Gérer la taille de l'écran
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < mobileBreakpoint
  if (!isMobile.value) {
    sidebarOpen.value = true // Toujours ouverte sur desktop
  } else {
    sidebarOpen.value = false // Fermée par défaut sur mobile
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
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
</script>

<style scoped>
/* Empêche le scroll horizontal */
html, body {
  overflow-x: hidden;
}
</style>