<!-- layouts/dashboard.vue -->
<template>
  <div class="flex h-screen bg-gray-50 font-sans">
    <!-- Sidebar -->
    <DashboardSidebar
        :active-section="currentPage"
        @section-change="handleSectionChange"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">{{ pageTitle }}</h1>
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
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardSidebar from '~/components/dashboard/Sidebar.vue'

const route = useRoute()

const currentPage = computed(() => {
  return route.path.split('/')[2] || 'dashboard'
})

const pageTitle = computed(() => {
  const pageMap = {
    dashboard: 'Tableau de bord',
    links: 'Mes Liens',
    transactions: 'Transactions',
    withdrawals: 'Retraits',
    analytics: 'Analytiques',
    settings: 'Paramètres'
  }
  return pageMap[currentPage.value] || 'Dashboard'
})

const handleSectionChange = (section) => {
  navigateTo(`/${section}`)
}
</script>