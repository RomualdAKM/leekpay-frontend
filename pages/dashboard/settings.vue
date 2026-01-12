<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Toast notification -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 flex items-center space-x-2"
      >
        <CheckIcon class="h-5 w-5" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Header -->
    <div>
      <p class="text-gray-500 text-sm">Gérez votre compte</p>
    </div>

    <!-- Message de succès global -->
    <div v-if="successMessage" class="border-l-2 border-green-600 text-gray-700 px-4 py-3">
      {{ successMessage }}
    </div>

    <!-- Erreur globale -->
    <div v-if="apiErrors.global" class="border-l-2 border-red-500 text-gray-700 px-4 py-3">
      <ul class="list-disc list-inside">
        <li v-for="error in apiErrors.global" :key="error">{{ error }}</li>
      </ul>
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" defaultValue="profile" class="space-y-6">
      <TabsList class="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <TabsTrigger
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap"
            :class="{
              'border-b-2 border-green-500 text-green-700': activeTab === tab.value,
              'border-transparent text-gray-700 hover:text-gray-900': activeTab !== tab.value
            }"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <!-- Profil -->
      <TabsContent value="profile" class="space-y-6">
        <!-- Informations personnelles -->
        <Card >
          <div class="flex items-center gap-2 mb-3">
            <User class="w-5 h-5 text-gray-400" />
            <h3 class="font-medium text-gray-900">Informations personnelles</h3>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="name" class="text-sm text-gray-600">Nom complet</Label>
              <Input 
                id="name"
                v-model="profile.name" 
                class="text-sm"
                :class="{ 'border-red-500': apiErrors.name }"
              />
              <div v-if="apiErrors.name" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.name" :key="error">{{ error }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="email" class="text-sm text-gray-600">Email</Label>
              <Input 
                id="email" 
                type="email" 
                v-model="profile.email" 
                class="text-sm"
                :class="{ 'border-red-500': apiErrors.email }"
              />
              <div v-if="apiErrors.email" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.email" :key="error">{{ error }}</p>
              </div>
            </div>

            <Button 
              @click="saveProfile" 
              :disabled="profileLoading"
              class="bg-green-600 text-white hover:bg-green-700 text-sm"
            >
              {{ profileLoading ? 'Sauvegarde...' : 'Sauvegarder' }}
            </Button>
          </div>
        </Card>


      </TabsContent>

      <!-- Sécurité -->
      <TabsContent value="security" class="space-y-6">
        <!-- Mot de passe -->
        <Card >
          <div class="flex items-center gap-2 mb-4">
            <Shield class="w-5 h-5 text-gray-400" />
            <h3 class="font-medium text-gray-900">Mot de passe</h3>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="current-password" class="text-sm text-gray-600">Mot de passe actuel</Label>
              <Input 
                id="current-password" 
                v-model="security.currentPassword" 
                type="password" 
                class="text-sm"
                :class="{ 'border-red-500': apiErrors.current_password }"
              />
              <div v-if="apiErrors.current_password" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.current_password" :key="error">{{ error }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="new-password" class="text-sm text-gray-600">Nouveau mot de passe</Label>
              <div class="relative">
                <Input 
                  id="new-password" 
                  v-model="security.newPassword" 
                  :type="showNewPassword ? 'text' : 'password'"
                  class="text-sm pr-10"
                  :class="{ 'border-red-500': apiErrors.password }"
                />
                <button 
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <Eye v-if="!showNewPassword" class="h-4 w-4" />
                  <EyeOff v-else class="h-4 w-4" />
                </button>
              </div>
              <div v-if="apiErrors.password" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.password" :key="error">{{ error }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="confirm-password" class="text-sm text-gray-600">Confirmer</Label>
              <div class="relative">
                <Input 
                  id="confirm-password" 
                  v-model="security.confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="text-sm pr-10"
                  :class="{ 'border-red-500': apiErrors.password_confirmation }"
                />
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <Eye v-if="!showConfirmPassword" class="h-4 w-4" />
                  <EyeOff v-else class="h-4 w-4" />
                </button>
              </div>
              <div v-if="apiErrors.password_confirmation" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.password_confirmation" :key="error">{{ error }}</p>
              </div>
            </div>
            
            <Button
                @click="changePasswordHandler"
                :disabled="!canChangePassword || passwordLoading"
                class="bg-green-600 text-white hover:bg-green-700 text-sm"
            >
              {{ passwordLoading ? 'Changement...' : 'Changer' }}
            </Button>
          </div>
        </Card>


      </TabsContent>

      <!-- Affiliation (visible pour tous) -->
      <TabsContent value="affiliation" class="space-y-6">
        <!-- Message pour non-premium -->
        <div v-if="!user?.is_premium" class="border border-gray-200 p-6">
          <div class="flex items-start gap-4">
            <Gift class="w-6 h-6 text-gray-400 flex-shrink-0" />
            <div class="flex-1">
              <h3 class="font-medium text-gray-900 mb-2">Programme d'affiliation</h3>
              <p class="text-sm text-gray-500 mb-4">
                Passez Premium pour générer votre code promo. 15% pour vos amis, 15% pour vous.
              </p>
              <NuxtLink 
                to="/dashboard/subscription" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
              >
                <span>Passer Premium</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Contenu pour premium -->
        <template v-else>
          <!-- Votre code promo -->
          <Card>
          <div class="flex items-center gap-2 mb-3">
            <Gift class="w-5 h-5 text-gray-400" />
            <h3 class="font-medium text-gray-900">Votre code promo</h3>
          </div>
          <p class="text-sm text-gray-500 mb-4">
            Partagez votre code. {{ affiliation.discount_percent }}% de réduction pour eux, {{ affiliation.commission_percent }}% de commission pour vous.
          </p>

          <div v-if="affiliationLoading" class="py-8 text-center text-gray-500">
            <RefreshCw class="w-5 h-5 animate-spin mx-auto mb-2" />
            Chargement...
          </div>

          <div v-else>
            <!-- Code existant -->
            <div v-if="affiliation.code" class="flex items-center gap-3">
              <div class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 font-mono text-base font-semibold text-center tracking-widest">
                {{ affiliation.code }}
              </div>
              <button
                @click="copyCode"
                class="p-3 bg-green-600 text-white hover:bg-green-700 transition-colors"
                :class="{ 'bg-emerald-600': codeCopied }"
              >
                <Copy class="w-5 h-5" />
              </button>
            </div>

            <!-- Générer un code -->
            <div v-else class="text-center py-4">
              <p class="text-gray-500 mb-4">Aucun code généré</p>
              <Button
                @click="generateCode"
                :disabled="codeGenerating"
                class="gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <RefreshCw v-if="codeGenerating" class="w-4 h-4 animate-spin" />
                <span>{{ codeGenerating ? 'Génération...' : 'Générer mon code' }}</span>
              </Button>
            </div>
          </div>
        </Card>

        <!-- Statistiques -->
        <Card>
          <div class="flex items-center gap-2 mb-4">
            <Users class="w-5 h-5 text-gray-400" />
            <h3 class="font-medium text-gray-900">Statistiques</h3>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 border border-gray-200 text-center">
              <p class="text-2xl font-semibold text-gray-900">{{ affiliation.usage_count }}</p>
              <p class="text-sm text-gray-500">Utilisations</p>
            </div>
            <div class="p-4 border border-gray-200 text-center">
              <p class="text-2xl font-semibold text-gray-900">{{ affiliation.total_earned.toLocaleString() }} FCFA</p>
              <p class="text-sm text-gray-500">Gains totaux</p>
            </div>
          </div>

          <p class="mt-4 text-sm text-gray-500 border-l-2 border-gray-200 pl-3">
            Vos commissions sont créditées dans votre solde. 
            <NuxtLink to="/dashboard/withdrawals" class="text-gray-900 underline">Retirer</NuxtLink>
          </p>
        </Card>
        </template>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Import des icônes nécessaires
import {
  User,
  Shield,
  CheckIcon,
  Eye,
  EyeOff,
  Users,
  Copy,
  RefreshCw,
  Gift,
  Wallet
} from "lucide-vue-next"

// Import des composants UI
import Card from "~/components/ui/Card.vue"
import Button from "~/components/ui/Button.vue"
import Input from "~/components/ui/Input.vue"
import Label from "~/components/ui/Label.vue"
import Textarea from "~/components/ui/Textarea.vue"
import Tabs from "~/components/ui/Tabs.vue"
import TabsList from "~/components/ui/TabsList.vue"
import TabsTrigger from "~/components/ui/TabsTrigger.vue"
import TabsContent from "~/components/ui/TabsContent.vue"

// Composables
const { user, updateProfile, changePassword, token } = useAuth()
const config = useRuntimeConfig()

// État réactif
const activeTab = ref("profile")
const loading = ref(false)
const profileLoading = ref(false)
const passwordLoading = ref(false)
const apiErrors = ref({})
const successMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')

// État pour l'affichage des mots de passe
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Tabs data - Profil, Sécurité et Affiliation (toujours visible)
const tabs = computed(() => {
  return [
    { value: "profile", label: "Profil" },
    { value: "security", label: "Sécurité" },
    { value: "affiliation", label: "Affiliation" }
  ]
})

// Profil - initialisé avec les données utilisateur réelles
const profile = ref({
  name: user.value?.name || '',
  email: user.value?.email || ''
})

// Sécurité
const security = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
})

// Watcher pour mettre à jour le profil quand l'utilisateur change
watch(user, (newUser) => {
  if (newUser) {
    profile.value.name = newUser.name || ''
    profile.value.email = newUser.email || ''
  }
}, { immediate: true })

// Fonction pour afficher le toast
const displayToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Méthodes
const saveProfile = async () => {
  profileLoading.value = true
  apiErrors.value = {}
  successMessage.value = ''

  try {
    const response = await updateProfile({
      name: profile.value.name,
      email: profile.value.email
    })

    displayToast(response.message || 'Profil mis à jour avec succès')
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Une erreur est survenue lors de la mise à jour du profil.'] }
    }
  } finally {
    profileLoading.value = false
  }
}

const changePasswordHandler = async () => {
  if (security.value.newPassword !== security.value.confirmPassword) {
    apiErrors.value = { password_confirmation: ['Les mots de passe ne correspondent pas.'] }
    return
  }

  passwordLoading.value = true
  apiErrors.value = {}
  successMessage.value = ''

  try {
    const response = await changePassword({
      current_password: security.value.currentPassword,
      password: security.value.newPassword,
      password_confirmation: security.value.confirmPassword
    })

    displayToast(response.message || 'Mot de passe changé avec succès')
    
    // Réinitialiser le formulaire
    security.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
    // Réinitialiser l'affichage des mots de passe
    showNewPassword.value = false
    showConfirmPassword.value = false
  } catch (err) {
    if (err.data?.errors) {
      apiErrors.value = err.data.errors
    } else {
      apiErrors.value = { global: [err.data?.message || 'Une erreur est survenue lors du changement de mot de passe.'] }
    }
  } finally {
    passwordLoading.value = false
  }
}

// Calculé
const canChangePassword = computed(() => {
  return security.value.currentPassword && security.value.newPassword && security.value.newPassword === security.value.confirmPassword
})

// === Affiliation ===
const affiliation = ref({
  code: null as string | null,
  usage_count: 0,
  total_earned: 0,
  discount_percent: 15,
  commission_percent: 15
})
const affiliationLoading = ref(false)
const codeGenerating = ref(false)
const codeCopied = ref(false)

const fetchAffiliation = async () => {
  if (!user.value?.is_premium) return
  
  affiliationLoading.value = true
  try {
    const response = await $fetch<any>('/affiliation/my-code', {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success && response.data) {
      affiliation.value = {
        code: response.data.code,
        usage_count: response.data.usage_count || 0,
        total_earned: response.data.total_earnings || 0,
        discount_percent: response.data.discount_percent || 15,
        commission_percent: response.data.commission_percent || 15
      }
    }
  } catch (err) {
    console.error('Erreur fetch affiliation:', err)
  } finally {
    affiliationLoading.value = false
  }
}

const generateCode = async () => {
  codeGenerating.value = true
  try {
    const response = await $fetch<any>('/affiliation/generate-code', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (response.success && response.data) {
      affiliation.value.code = response.data.code
      displayToast('Code promo généré avec succès')
    }
  } catch (err: any) {
    apiErrors.value = { global: [err.data?.message || 'Erreur lors de la génération du code'] }
  } finally {
    codeGenerating.value = false
  }
}

const copyCode = async () => {
  if (!affiliation.value.code) return
  try {
    await navigator.clipboard.writeText(affiliation.value.code)
    codeCopied.value = true
    displayToast('Code copié dans le presse-papier')
    setTimeout(() => { codeCopied.value = false }, 2000)
  } catch (err) {
    console.error('Erreur copie:', err)
  }
}

// Charger les données d'affiliation au montage si premium
onMounted(() => {
  if (user.value?.is_premium) {
    fetchAffiliation()
  }
})

// Watcher pour charger l'affiliation si l'utilisateur devient premium
watch(() => user.value?.is_premium, (isPremium) => {
  if (isPremium) {
    fetchAffiliation()
  }
})
</script>