<!-- components/dashboard/Sidebar.vue -->
<template>
  <div class="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
    <!-- Logo -->
    <div class="p-5 sm:p-4  border-gray-200">
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
    <div class="p-2">
      <button
          @click="onSectionChange('dashboard/create-link')"
          class="w-full bg-green-600 flex items-center gap-2 px-4 py-2 rounded-sm text-white font-medium transition-colors"
      >
        <PlusIcon class="w-4 h-4" />
        Créer un lien
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-2 space-y-1">
      <template v-for="item in menuItems" :key="item.id">
        <button
            @click="onSectionChange(item.id)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left transition-colors"
            :class="{ 
              'bg-green-600 text-white': activeSection === item.id, 
              'text-gray-600 hover:bg-gray-50': activeSection !== item.id,
              'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200': item.premium && !user?.is_premium && activeSection !== item.id
            }"
        >
          <component :is="item.icon" class="w-5 h-5" :class="{ 'text-amber-500': item.premium && !user?.is_premium && activeSection !== item.id }" />
          <span class="flex-1">{{ item.label }}</span>
          <span v-if="item.premium && user?.is_premium" class="w-2 h-2 rounded-full bg-amber-400"></span>
        </button>
      </template>
    </nav>

    <!-- User Profile -->
    <div class="p-2 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <NuxtLink to="/dashboard/settings" class="flex-1">
          <div class="flex items-center gap-2">
            <p v-if="user" class="font-medium" style="color: #0A1F44">
              {{ user.name }}
            </p>
            <span 
              v-if="user?.is_premium" 
              class="px-1.5 py-0.5 text-xs font-medium rounded bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center gap-1"
            >
              <Crown class="w-3 h-3" />
              Premium
            </span>
          </div>
          <p v-if="user" class="text-sm text-gray-500">
            {{ user.email }}
          </p>
          <p v-else class="text-sm text-gray-500">Chargement...</p>
        </NuxtLink>
      </div>
    </div>
    <!-- Bouton Déconnexion -->
    <button
        @click="handleLogout"
        class="w-full flex items-center my-2 gap-2 px-2 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition-colors text-sm font-medium"
    >
      <LogOutIcon class="w-4 h-4" />
      Déconnexion
    </button>

  </div>
</template>

<script setup>
import { HomeIcon, PlusIcon, UserIcon, Crown } from 'lucide-vue-next'

const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
})
const { user, logout, isAdmin } = useAuth()
const router = useRouter()
const handleLogout = async () => {
  await logout()
  await router.push('/login')
}

const emit = defineEmits(['section-change'])

const onSectionChange = (section) => {
  emit('section-change', section)
}

const menuItems = computed(() => {
  const baseItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: HomeIcon },
    { id: 'dashboard/links', label: 'Mes Liens', icon: LinkIcon },
    { id: 'dashboard/transactions', label: 'Transactions', icon: CreditCardIcon },
    { id: 'dashboard/withdrawals', label: 'Retraits', icon: WalletIcon },
    // { id: 'dashboard/sales-pages', label: 'Pages de vente', icon: FileTextIcon },
    // { id: 'dashboard/subscription', label: 'Abonnement', icon: CrownIcon, premium: true },
    { id: 'dashboard/kyc', label: 'Vérification KYC', icon: ShieldCheckIcon },
    { id: 'dashboard/api-keys', label: 'Clés API', icon: KeyIcon },
    { id: 'dashboard/support', label: 'Support', icon: HeadphonesIcon },
    { id: 'dashboard/settings', label: 'Paramètres', icon: SettingsIcon },
  ]

   // Ajouter les éléments admin si l'utilisateur est admin
  if (isAdmin.value) {
    baseItems.splice(-2, 0, // Insérer avant "Support" et "Paramètres"
      { id: 'dashboard/admin/stats', label: 'Statistiques Admin', icon: BarChart3Icon },
      { id: 'dashboard/admin/transactions', label: 'Transactions', icon: CreditCardIcon },
      { id: 'dashboard/admin/links', label: 'Liens de Paiement', icon: LinkIcon },
      { id: 'dashboard/admin/withdrawals', label: 'Gestion Retraits', icon: WalletIcon },
      { id: 'dashboard/admin/kyc', label: 'Gestion KYC', icon: UserCheckIcon },
      { id: 'dashboard/admin/broadcast', label: 'Communication', icon: MailIcon }
    )
  }

  return baseItems
})

// Import des icônes manquantes
import { LinkIcon, CreditCardIcon, WalletIcon, BarChart3Icon, SettingsIcon, LogOutIcon, ShieldCheckIcon, HeadphonesIcon, KeyIcon, UserCheckIcon, MailIcon, FileTextIcon, Crown as CrownIcon } from 'lucide-vue-next'
</script>