<!-- components/dashboard/Sidebar.vue -->
<template>
  <div class="w-full bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-200">
    <!-- Logo -->
    <div class="p-5 sm:p-4 border-gray-200">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <!-- Logo (image ou SVG) -->
          <div class="w-10 h-10 rounded-lg flex items-center justify-center">
            <img
              src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png"
              alt="LeekPay Logo"
            />
          </div>

          <!-- Texte -->
          <div v-if="!collapsed">
            <h1 class="font-bold text-lg" style="color: #0A1F44">LeekPay</h1>
            <p class="text-xs sm:text-sm text-gray-500">Generateur de liens</p>
          </div>
        </div>
        <button
          v-if="canCollapse"
          class="h-8 w-8 rounded-full border border-green-200 bg-green-50 text-green-700 shadow-sm hover:bg-green-100 hover:text-green-800 transition flex items-center justify-center"
          @click="emit('toggle-collapse')"
          :title="collapsed ? 'Agrandir' : 'Reduire'"
          :aria-label="collapsed ? 'Agrandir le menu' : 'Reduire le menu'"
        >
          <ChevronRight v-if="collapsed" class="w-4 h-4" />
          <ChevronLeft v-else class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Create Link Button -->
    <div class="p-2">
      <button
        @click="onSectionChange('dashboard/create-link')"
        class="w-full bg-green-600 flex items-center gap-2 py-2 rounded-sm text-white font-medium transition-colors"
        :class="collapsed ? 'justify-center px-2' : 'px-4'"
        title="Creer un lien"
      >
        <PlusIcon class="w-4 h-4" />
        <span v-if="!collapsed">Creer un lien</span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-2 space-y-1">
      <template v-for="item in menuItems" :key="item.id">
        <button
          @click="onSectionChange(item.id)"
          class="w-full flex items-center gap-3 py-3 rounded-sm text-left transition-colors"
          :class="[
            activeSection === item.id ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50',
            collapsed ? 'justify-center px-2' : 'px-4'
          ]"
          :title="item.label"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span v-if="!collapsed">{{ item.label }}</span>
        </button>
      </template>
    </nav>

    <!-- User Profile -->
    <div class="p-2 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <NuxtLink to="/dashboard/settings" class="flex items-center gap-2">
          <UserIcon class="w-4 h-4 text-gray-500" />
          <div v-if="!collapsed">
            <p v-if="user" class="font-medium" style="color: #0A1F44">
              {{ user.name }}
            </p>
            <p v-if="user" class="text-sm text-gray-500">
              {{ user.email }}
            </p>
            <p v-else class="text-sm text-gray-500">Chargement...</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- Bouton Deconnexion -->
    <button
      @click="handleLogout"
      class="w-full flex items-center my-2 gap-2 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition-colors text-sm font-medium"
      :class="collapsed ? 'justify-center px-2' : 'px-2'"
      title="Deconnexion"
    >
      <LogOutIcon class="w-4 h-4" />
      <span v-if="!collapsed">Deconnexion</span>
    </button>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import {
  HomeIcon,
  PlusIcon,
  UserIcon,
  LinkIcon,
  CreditCardIcon,
  WalletIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  ShieldCheckIcon,
  HeadphonesIcon,
  KeyIcon,
  UserCheckIcon,
  MailIcon,
  FileTextIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const props = defineProps({
  activeSection: {
    type: String,
    required: true
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  canCollapse: {
    type: Boolean,
    default: true
  }
})

const { activeSection, collapsed, canCollapse } = toRefs(props)

const { user, logout, isAdmin } = useAuth()
const router = useRouter()
const handleLogout = async () => {
  await logout()
  await router.push('/login')
}

const emit = defineEmits(['section-change', 'toggle-collapse'])

const onSectionChange = (section) => {
  emit('section-change', section)
}

const menuItems = computed(() => {
  const baseItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: HomeIcon },
    { id: 'dashboard/links', label: 'Mes Liens', icon: LinkIcon },
    { id: 'dashboard/invoices', label: 'Factures', icon: FileTextIcon },
    { id: 'dashboard/transactions', label: 'Transactions', icon: CreditCardIcon },
    { id: 'dashboard/withdrawals', label: 'Retraits', icon: WalletIcon },
    { id: 'dashboard/kyc', label: 'Verification KYC', icon: ShieldCheckIcon },
    { id: 'dashboard/api-keys', label: 'Cles API', icon: KeyIcon },
    { id: 'dashboard/support', label: 'Support', icon: HeadphonesIcon },
    { id: 'dashboard/settings', label: 'Parametres', icon: SettingsIcon }
  ]

  // Ajouter les elements admin si l'utilisateur est admin
  if (isAdmin.value) {
    baseItems.splice(-2, 0,
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
</script>
