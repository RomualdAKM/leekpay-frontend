<template>
  <div class="w-full bg-white border-r border-gray-200 h-full flex flex-col">
    <!-- Logo -->
    <div class="px-4 py-5 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <NuxtLink to="/dashboard" class="flex items-center gap-3">
          <div class="w-9 h-9 flex items-center justify-center">
            <img src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png" alt="LeekPay" class="w-full h-full object-contain" />
          </div>
          <span v-if="!collapsed" class="font-semibold text-gray-900">LeekPay</span>
        </NuxtLink>
        <button
          v-if="canCollapse"
          @click="emit('toggle-collapse')"
          class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
        >
          <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
          <ChevronRight v-else class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <!-- Dashboard -->
      <button
        @click="onSectionChange('dashboard')"
        class="w-full flex items-center gap-3 px-3 py-2.5 mb-4 text-sm transition"
        :class="[
          isActive('dashboard') && !isActive('dashboard/') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
          collapsed ? 'justify-center' : ''
        ]"
        title="Tableau de bord"
      >
        <HomeIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="flex-1 text-left">Tableau de bord</span>
      </button>

      <!-- LIENS DE PAIEMENT -->
      <div class="mb-4">
        <div class="flex items-center bg-gray-100 justify-between px-3 py-2.5 mb-1" v-if="!collapsed">
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Liens de paiement</p>
          <button 
            @click="onSectionChange('dashboard/create-link')"
            class="w-6 h-6 flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition"
            title="Créer un lien"
          >
            <PlusIcon class="w-4 h-4" />
          </button>
        </div>
        <button
          @click="onSectionChange('dashboard/links')"
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
          :class="[
            isActive('dashboard/links') || isActive('dashboard/create-link') || isActive('dashboard/edit-link') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
            collapsed ? 'justify-center' : ''
          ]"
          title="Mes liens"
        >
          <LinkIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="flex-1 text-left">Mes liens</span>
        </button>
      </div>
   <!-- PAGES DE VENTE -->
      <div class="mb-4">
        <div class="flex items-center bg-gray-100 py-2.5 justify-between px-3 mb-1" v-if="!collapsed">
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pages de vente</p>
          <button 
            @click="onSectionChange('dashboard/sales-pages/create')"
            class="w-6 h-6 flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition"
            title="Créer une page"
          >
            <PlusIcon class="w-4 h-4" />
          </button>
        </div>
        <button
          @click="onSectionChange('dashboard/sales-pages')"
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
          :class="[
            isActive('dashboard/sales-pages') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
            collapsed ? 'justify-center' : ''
          ]"
          title="Mes pages"
        >
          <LayoutIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="flex-1 text-left">Mes pages</span>
        </button>
      </div>
      <!-- FACTURES -->
      <div class="mb-4">
        <div class="flex items-center bg-gray-100 py-2.5 justify-between px-3 mb-1" v-if="!collapsed">
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Factures</p>
          <button 
            @click="onSectionChange('dashboard/invoices/create')"
            class="w-6 h-6 flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition"
            title="Créer une facture"
          >
            <PlusIcon class="w-4 h-4" />
          </button>
        </div>
        <button
          @click="onSectionChange('dashboard/invoices')"
          class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
          :class="[
            isActive('dashboard/invoices') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
            collapsed ? 'justify-center' : ''
          ]"
          title="Mes factures"
        >
          <FileTextIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="flex-1 text-left">Mes factures</span>
        </button>
      </div>

   

      <!-- Séparateur -->
      <div class="border-t border-gray-100 my-4"></div>

      <!-- FINANCES (collapsible) -->
      <div class="mb-4">
        <button 
          v-if="!collapsed"
          @click="toggleSection('finances')"
          class="w-full flex items-center bg-gray-100 py-2.5 justify-between px-3 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition"
        >
          <span>Finances</span>
          <ChevronDown class="w-3 h-3 transition-transform" :class="openSections.finances ? 'rotate-180' : ''" />
        </button>
        <div v-show="collapsed || openSections.finances" class="space-y-1">
          <button
            @click="onSectionChange('dashboard/transactions')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/transactions') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Transactions"
          >
            <ArrowLeftRightIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Transactions</span>
          </button>
          <button
            @click="onSectionChange('dashboard/withdrawals')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/withdrawals') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Retraits"
          >
            <WalletIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Retraits</span>
          </button>
        </div>
      </div>

      <!-- COMPTE (collapsible) -->
      <div class="mb-4">
        <button 
          v-if="!collapsed"
          @click="toggleSection('compte')"
          class="w-full flex items-center bg-gray-100 py-2.5 justify-between px-3 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition"
        >
          <span>Compte</span>
          <ChevronDown class="w-3 h-3 transition-transform" :class="openSections.compte ? 'rotate-180' : ''" />
        </button>
        <div v-show="collapsed || openSections.compte" class="space-y-1">
       
          <button
            @click="onSectionChange('dashboard/kyc')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/kyc') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Vérification KYC"
          >
            <ShieldCheckIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Vérification KYC</span>
          </button>
          <button
            @click="onSectionChange('dashboard/api-keys')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/api-keys') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Clés API"
          >
            <KeyIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Clés API</span>
          </button>
          <button
            @click="onSectionChange('dashboard/settings')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/settings') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Paramètres"
          >
            <SettingsIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Paramètres</span>
          </button>
             <button
            @click="onSectionChange('dashboard/subscription')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/subscription') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Abonnement"
          >
            <CrownIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Abonnement</span>
            <span v-if="!collapsed && !user?.is_premium" class="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500">Gratuit</span>
          </button>
          <button
            @click="onSectionChange('dashboard/affiliation')"
            class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
            :class="[
              isActive('dashboard/affiliation') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            title="Affiliation"
          >
            <GiftIcon class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">Affiliation</span>
          </button>
        </div>
      </div>

      <!-- ADMIN -->
      <div v-if="isAdmin" class="mb-4">
        <p v-if="!collapsed" class="px-3 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Administration</p>
        <div class="space-y-1">
          <button
            v-for="item in adminItems"
            :key="item.id"
            @click="onSectionChange(item.id)"
            class="w-full flex items-center gap-3 px-3 py-2 text-sm transition"
            :class="[
              isActive(item.id) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
              collapsed ? 'justify-center' : ''
            ]"
            :title="item.label"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="flex-1 text-left">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <!-- SUPPORT -->
      <button
        @click="onSectionChange('dashboard/support')"
        class="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition"
        :class="[
          isActive('dashboard/support') ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50',
          collapsed ? 'justify-center' : ''
        ]"
        title="Support"
      >
        <HeadphonesIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="flex-1 text-left">Support</span>
      </button>
    </nav>

    <!-- Footer: User + Logout -->
    <div class="border-t border-gray-100 p-3">
      <NuxtLink 
        to="/dashboard/settings" 
        class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition"
        :class="collapsed ? 'justify-center' : ''"
      >
        <div class="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-500">
          <UserIcon class="w-4 h-4" />
        </div>
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user?.name || 'Utilisateur' }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
        </div>
      </NuxtLink>

      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-3 py-2 mt-1 text-gray-500 hover:text-red-600 hover:bg-red-50 transition text-sm"
        :class="collapsed ? 'justify-center' : ''"
      >
        <LogOutIcon class="w-4 h-4" />
        <span v-if="!collapsed">Déconnexion</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs, computed, ref } from 'vue'
import {
  HomeIcon,
  LinkIcon,
  FileTextIcon,
  LayoutIcon,
  ArrowLeftRightIcon,
  WalletIcon,
  CrownIcon,
  ShieldCheckIcon,
  KeyIcon,
  SettingsIcon,
  HeadphonesIcon,
  PlusIcon,
  UserIcon,
  LogOutIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BarChart3Icon,
  CreditCardIcon,
  Link2Icon,
  BanknoteIcon,
  UserCheckIcon,
  MailIcon,
  LayoutTemplateIcon,
  GiftIcon,
  ImageIcon
} from 'lucide-vue-next'

const props = defineProps({
  activeSection: { type: String, required: true },
  collapsed: { type: Boolean, default: false },
  canCollapse: { type: Boolean, default: true }
})

const { activeSection, collapsed, canCollapse } = toRefs(props)
const emit = defineEmits(['section-change', 'toggle-collapse'])

const { user, logout, isAdmin } = useAuth()
const router = useRouter()

// État des sections collapsibles
const openSections = ref({
  finances: true,
  compte: true
})

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

const onSectionChange = (section) => emit('section-change', section)

const handleLogout = async () => {
  await logout()
  await router.push('/login')
}

const isActive = (section) => {
  return activeSection.value.startsWith(section)
}

const adminItems = computed(() => [
  { id: 'dashboard/admin/stats', label: 'Statistiques', icon: BarChart3Icon },
  { id: 'dashboard/admin/transactions', label: 'Transactions', icon: CreditCardIcon },
  { id: 'dashboard/admin/links', label: 'Liens', icon: Link2Icon },
  { id: 'dashboard/admin/sales-pages', label: 'Pages de vente', icon: LayoutIcon },
  { id: 'dashboard/admin/invoices', label: 'Factures', icon: FileTextIcon },
  { id: 'dashboard/admin/withdrawals', label: 'Retraits', icon: BanknoteIcon },
  { id: 'dashboard/admin/kyc', label: 'KYC', icon: UserCheckIcon },
  { id: 'dashboard/admin/broadcast', label: 'Communication', icon: MailIcon },
  { id: 'dashboard/admin/templates', label: 'Templates', icon: LayoutTemplateIcon },
  { id: 'dashboard/admin/banners', label: 'Bannières', icon: ImageIcon }
])
</script>
