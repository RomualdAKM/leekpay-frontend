<!-- components/dashboard/Sidebar.vue -->
<template>
  <div class="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
    <!-- Logo -->
    <div class="p-5 sm:p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <!-- Logo (image ou SVG) -->
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" >
          <img
              src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png"
              alt="LeekPay Logo"
          />
        </div>

        <!-- Texte -->
        <div>
          <h1 class="font-bold text-lg" style="color: #0A1F44">LeekPay</h1>
          <p class="text-xs sm:text-sm text-gray-500">Générateur de liens</p>
        </div>
      </div>
    </div>

    <!-- Create Link Button -->
    <div class="p-4">
      <button
          @click="onSectionChange('dashboard/create-link')"
          class="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors"
          style="background-color: #2ECC71"
      >
        <PlusIcon class="w-4 h-4" />
        Créer un lien
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <template v-for="item in menuItems" :key="item.id">
        <button
            @click="onSectionChange(item.id)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors"
            :class="{ 'bg-green-500 text-white': activeSection === item.id, 'text-gray-600 hover:bg-gray-50': activeSection !== item.id }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <UserIcon class="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <p class="font-medium" style="color: #0A1F44">John Doe</p>
          <p class="text-sm text-gray-500">john.doe@email.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, PlusIcon, UserIcon } from 'lucide-vue-next'

const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['section-change'])

const onSectionChange = (section) => {
  emit('section-change', section)
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: HomeIcon },
  { id: 'dashboard/links', label: 'Mes Liens', icon: LinkIcon },
  { id: 'dashboard/transactions', label: 'Transactions', icon: CreditCardIcon },
  { id: 'dashboard/withdrawals', label: 'Retraits', icon: WalletIcon },
  { id: 'dashboard/settings', label: 'Paramètres', icon: SettingsIcon },
]

// Import des icônes manquantes
import { LinkIcon, CreditCardIcon, WalletIcon, BarChart3Icon, SettingsIcon } from 'lucide-vue-next'
</script>