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
        class="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2"
      >
        <CheckIcon class="h-5 w-5" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Header -->
    <div>
      <!-- <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style="color: #0A1F44">Paramètres</h1> -->
      <p class="text-gray-600 text-sm sm:text-base">Gérez votre compte et configurez vos préférences</p>
    </div>

    <!-- Message de succès global -->
    <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
      {{ successMessage }}
    </div>

    <!-- Erreur globale -->
    <div v-if="apiErrors.global" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
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
            <User class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Informations personnelles</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Gérez vos informations de profil et de contact</p>

          <div class="space-y-3">
            <div class="space-y-2">
              <Label for="name" class="text-xs sm:text-sm">Nom complet</Label>
              <Input 
                id="name"
                v-model="profile.name" 
                class="text-sm py-2"
                :class="{ 'border-red-500': apiErrors.name }"
              />
              <div v-if="apiErrors.name" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.name" :key="error">{{ error }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="email" class="text-xs sm:text-sm">Email</Label>
              <Input 
                id="email" 
                type="email" 
                v-model="profile.email" 
                class="text-sm py-2"
                :class="{ 'border-red-500': apiErrors.email }"
              />
              <div v-if="apiErrors.email" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.email" :key="error">{{ error }}</p>
              </div>
            </div>

            <Button 
              @click="saveProfile" 
              :disabled="profileLoading"
              class="gap-2 py-2 text-sm" 
              style="background-color: #2ECC71; color: white"
            >
              <span v-if="profileLoading">Sauvegarde...</span>
              <span v-else>Sauvegarder</span>
            </Button>
          </div>
        </Card>


      </TabsContent>

      <!-- Sécurité -->
      <TabsContent value="security" class="space-y-6">
        <!-- Mot de passe -->
        <Card >
          <div class="flex items-center gap-2 mb-3">
            <Shield class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Sécurité</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Gérez la sécurité de votre compte</p>

          <div class="space-y-3">
            <div class="space-y-2">
              <Label for="current-password" class="text-xs sm:text-sm">Mot de passe actuel</Label>
              <Input 
                id="current-password" 
                v-model="security.currentPassword" 
                type="password" 
                class="text-sm py-2"
                :class="{ 'border-red-500': apiErrors.current_password }"
              />
              <div v-if="apiErrors.current_password" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.current_password" :key="error">{{ error }}</p>
              </div>
            </div>
            <div class="space-y-2">
              <Label for="new-password" class="text-xs sm:text-sm">Nouveau mot de passe</Label>
              <Input 
                id="new-password" 
                v-model="security.newPassword" 
                type="password" 
                class="text-sm py-2"
                :class="{ 'border-red-500': apiErrors.password }"
              />
              <div v-if="apiErrors.password" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.password" :key="error">{{ error }}</p>
              </div>
            </div>
            <div class="space-y-2">
              <Label for="confirm-password" class="text-xs sm:text-sm">Confirmer le mot de passe</Label>
              <Input 
                id="confirm-password" 
                v-model="security.confirmPassword" 
                type="password" 
                class="text-sm py-2"
                :class="{ 'border-red-500': apiErrors.password_confirmation }"
              />
              <div v-if="apiErrors.password_confirmation" class="text-red-500 text-sm">
                <p v-for="error in apiErrors.password_confirmation" :key="error">{{ error }}</p>
              </div>
            </div>
            <Button
                @click="changePasswordHandler"
                :disabled="!canChangePassword || passwordLoading"
                class="gap-2 py-2 text-sm"
                style="background-color: #2ECC71; color: white"
            >
              <span v-if="passwordLoading">Changement...</span>
              <span v-else>Changer le mot de passe</span>
            </Button>
          </div>
        </Card>


      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

// Import des icônes nécessaires
import {
  User,
  Shield,
  CheckIcon
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
const { user, updateProfile, changePassword } = useAuth()

// État réactif
const activeTab = ref("profile")
const loading = ref(false)
const profileLoading = ref(false)
const passwordLoading = ref(false)
const apiErrors = ref({})
const successMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')

// Tabs data - seulement Profil et Sécurité
const tabs = [
  { value: "profile", label: "Profil" },
  { value: "security", label: "Sécurité" }
]

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
</script>