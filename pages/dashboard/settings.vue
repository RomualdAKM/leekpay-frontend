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
    <!-- Header -->
    <div>
      <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style="color: #0A1F44">Paramètres</h1>
      <p class="text-gray-600 text-sm sm:text-base">Gérez votre compte et configurez vos préférences</p>
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
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <User class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Informations personnelles</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Gérez vos informations de profil et de contact</p>

          <div class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstName" class="text-xs sm:text-sm">Prénom</Label>
                <Input id="firstName" v-model="profile.firstName" class="text-sm py-2" />
              </div>
              <div class="space-y-2">
                <Label for="lastName" class="text-xs sm:text-sm">Nom</Label>
                <Input id="lastName" v-model="profile.lastName" class="text-sm py-2" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="email" class="text-xs sm:text-sm">Email</Label>
              <Input id="email" type="email" v-model="profile.email" class="text-sm py-2" />
            </div>

            <div class="space-y-2">
              <Label for="phone" class="text-xs sm:text-sm">Téléphone</Label>
              <Input id="phone" type="tel" v-model="profile.phone" class="text-sm py-2" />
            </div>

            <div class="space-y-2">
              <Label for="company" class="text-xs sm:text-sm">Entreprise</Label>
              <Input id="company" v-model="profile.company" class="text-sm py-2" />
            </div>

            <div class="space-y-2">
              <Label for="bio" class="text-xs sm:text-sm">Biographie</Label>
              <Textarea
                  id="bio"
                  v-model="profile.bio"
                  placeholder="Parlez-nous un peu de vous..."
                  class="text-sm py-2"
              />
            </div>

            <Button @click="saveProfile" class="gap-2 py-2 text-sm" style="background-color: #2ECC71; color: white">
              Sauvegarder
            </Button>
          </div>
        </Card>

        <!-- Préférences régionales -->
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <Globe class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Préférences régionales</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4"></p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label class="text-xs sm:text-sm">Langue</Label>
              <Select
                  v-model="preferences.language"
                  :options="[
                    { value: 'fr', label: 'Français' },
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Español' }
                  ]"
                  placeholder="Sélectionnez une langue"
                  class="text-sm py-2"
              />
            </div>

            <div class="space-y-2">
              <Label class="text-xs sm:text-sm">Fuseau horaire</Label>
              <Select
                  v-model="preferences.timezone"
                  :options="[
                    { value: 'europe/paris', label: 'Europe/Paris' },
                    { value: 'africa/abidjan', label: 'Africa/Abidjan' },
                    { value: 'america/new_york', label: 'America/New_York' }
                  ]"
                  placeholder="Sélectionnez un fuseau"
                  class="text-sm py-2"
              />
            </div>
          </div>

          <Button @click="savePreferences" class="gap-2 py-2 text-sm mt-4" style="background-color: #2ECC71; color: white">
            Sauvegarder
          </Button>
        </Card>
      </TabsContent>

      <!-- Paiements -->
      <TabsContent value="payment" class="space-y-6">
        <!-- Méthodes de paiement -->
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <CreditCard class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Méthodes de paiement</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Configurez les moyens de paiement acceptés</p>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <CreditCard class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="font-medium text-sm">Cartes bancaires</p>
                  <p class="text-xs text-gray-500">Visa, Mastercard, American Express</p>
                </div>
              </div>
              <Switch v-model="paymentMethods.card" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Smartphone class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="font-medium text-sm">Mobile Money</p>
                  <p class="text-xs text-gray-500">Orange Money, MTN Money</p>
                </div>
              </div>
              <Switch v-model="paymentMethods.mobileMoney" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Mail class="w-5 h-5 text-gray-500" />
                <div>
                  <p class="font-medium text-sm">Virement bancaire</p>
                  <p class="text-xs text-gray-500">Transfert direct</p>
                </div>
              </div>
              <Switch v-model="paymentMethods.bankTransfer" />
            </div>
          </div>

          <Separator class="my-4" />

          <div class="space-y-2">
            <Label class="text-xs sm:text-sm">Devise par défaut</Label>
            <Select
                v-model="paymentPreferences.currency"
                :options="[
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'XOF', label: 'XOF (CFA)' }
                ]"
                class="text-sm py-2"
            />
          </div>

          <Button @click="savePaymentSettings" class="gap-2 py-2 text-sm mt-4" style="background-color: #2ECC71; color: white">
            Sauvegarder
          </Button>
        </Card>

        <!-- Frais et commissions -->
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <DollarSignIcon class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Frais et commissions</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Aperçu des frais appliqués à vos transactions</p>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span>Cartes bancaires</span>
              <span>2.9% + 0.30€</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Mobile Money</span>
              <span>1.5% + 0.20€</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Virement bancaire</span>
              <span>0.8% + 0.50€</span>
            </div>
          </div>
        </Card>
      </TabsContent>

      <!-- Notifications -->
      <TabsContent value="notifications" class="space-y-6">
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <Bell class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Notifications</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Choisissez quand et comment recevoir les notifications</p>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-sm">Nouveaux paiements</p>
                <p class="text-xs text-gray-500">Recevoir une notification pour chaque paiement reçu</p>
              </div>
              <Switch v-model="notifications.newPayments" />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-sm">Paiements échoués</p>
                <p class="text-xs text-gray-500">Être alerté des tentatives de paiement échouées</p>
              </div>
              <Switch v-model="notifications.failedPayments" />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-sm">Rapport hebdomadaire</p>
                <p class="text-xs text-gray-500">Recevoir un résumé chaque lundi</p>
              </div>
              <Switch v-model="notifications.weeklyReport" />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-sm">Notifications marketing</p>
                <p class="text-xs text-gray-500">Conseils et nouvelles fonctionnalités</p>
              </div>
              <Switch v-model="notifications.marketing" />
            </div>
          </div>

          <Button @click="saveNotifications" class="gap-2 py-2 text-sm mt-4" style="background-color: #2ECC71; color: white">
            Sauvegarder
          </Button>
        </Card>
      </TabsContent>

      <!-- Sécurité -->
      <TabsContent value="security" class="space-y-6">
        <!-- Mot de passe -->
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <Shield class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Sécurité</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Gérez la sécurité de votre compte</p>

          <div class="space-y-3">
            <div class="space-y-2">
              <Label for="current-password" class="text-xs sm:text-sm">Mot de passe actuel</Label>
              <Input id="current-password" v-model="security.currentPassword" type="password" class="text-sm py-2" />
            </div>
            <div class="space-y-2">
              <Label for="new-password" class="text-xs sm:text-sm">Nouveau mot de passe</Label>
              <Input id="new-password" v-model="security.newPassword" type="password" class="text-sm py-2" />
            </div>
            <div class="space-y-2">
              <Label for="confirm-password" class="text-xs sm:text-sm">Confirmer le mot de passe</Label>
              <Input id="confirm-password" v-model="security.confirmPassword" type="password" class="text-sm py-2" />
            </div>
            <Button
                @click="changePassword"
                :disabled="!canChangePassword"
                class="gap-2 py-2 text-sm"
                style="background-color: #2ECC71; color: white"
            >
              Changer le mot de passe
            </Button>
          </div>
        </Card>

        <!-- 2FA -->
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <Key class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Authentification à deux facteurs</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Sécurisez votre compte avec l'authentification à deux facteurs</p>

          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="font-medium text-sm">Authentification à deux facteurs</p>
              <p class="text-xs text-gray-500">Utilisez une application d'authentification pour sécuriser votre compte</p>
            </div>
            <Switch v-model="security.twoFactorEnabled" />
          </div>

          <Button variant="outline" @click="configure2FA" class="gap-2 py-2 text-sm" style="color: #2ECC71; border-color: #2ECC71">
            Configurer 2FA
          </Button>
        </Card>
      </TabsContent>

      <!-- Apparence -->
      <TabsContent value="appearance" class="space-y-6">
        <Card class="border border-gray-200 rounded-lg p-5">
          <div class="flex items-center gap-2 mb-3">
            <Palette class="w-5 h-5 text-gray-500" />
            <h3 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">Apparence</h3>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mb-4">Personnalisez l'apparence de votre tableau de bord</p>

          <div class="space-y-3">
            <div class="space-y-2">
              <Label class="text-xs sm:text-sm">Thème</Label>
              <Select
                  v-model="appearance.theme"
                  :options="[
                    { value: 'light', label: 'Clair' },
                    { value: 'dark', label: 'Sombre' },
                    { value: 'system', label: 'Système' }
                  ]"
                  class="text-sm py-2"
              />
            </div>

            <div class="space-y-2">
              <Label class="text-xs sm:text-sm">Couleur d'accent</Label>
              <div class="flex gap-2">
                <button
                    v-for="color in accentColors"
                    :key="color"
                    class="w-8 h-8 rounded-full border-2 focus:outline-none"
                    :class="appearance.accent === color ? 'border-blue-500' : 'border-transparent'"
                    :style="{ backgroundColor: colorMap[color] }"
                    @click="appearance.accent = color"
                />
              </div>
            </div>

            <Button @click="saveAppearance" class="gap-2 py-2 text-sm mt-4" style="background-color: #2ECC71; color: white">
              Sauvegarder
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

// Import des icônes
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Key,
  Smartphone,
  DollarSignIcon,
  ChevronDownIcon
} from "lucide-vue-next"

// Import des composants UI
import Card from "~/components/ui/Card.vue"
import Button from "~/components/ui/Button.vue"
import Input from "~/components/ui/Input.vue"
import Label from "~/components/ui/Label.vue"
import Switch from "~/components/ui/Switch.vue"
import Textarea from "~/components/ui/Textarea.vue"
import Select from "~/components/ui/Select.vue"
import Separator from "~/components/ui/Separator.vue"
import Tabs from "~/components/ui/Tabs.vue"
import TabsList from "~/components/ui/TabsList.vue"
import TabsTrigger from "~/components/ui/TabsTrigger.vue"
import TabsContent from "~/components/ui/TabsContent.vue"

// État réactif
const activeTab = ref("profile")

// Tabs data
const tabs = [
  { value: "profile", label: "Profil" },
  { value: "payment", label: "Paiements" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Sécurité" },
  { value: "appearance", label: "Apparence" }
]

// Profil
const profile = ref({
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  company: "Digital Solutions SARL",
  bio: "Consultant en marketing digital avec 8 ans d'expérience."
})

// Préférences régionales
const preferences = ref({
  language: "fr",
  timezone: "europe/paris"
})

// Paiements
const paymentMethods = ref({
  card: true,
  mobileMoney: true,
  bankTransfer: false
})

const paymentPreferences = ref({
  currency: "EUR"
})

// Notifications
const notifications = ref({
  newPayments: true,
  failedPayments: true,
  weeklyReport: false,
  marketing: false
})

// Sécurité
const security = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false
})

// Apparence
const appearance = ref({
  theme: "light",
  accent: "blue"
})

const accentColors = ["blue", "green", "purple", "orange"]
const colorMap = {
  blue: "#3B82F6",
  green: "#10B981",
  purple: "#8B5CF6",
  orange: "#F59E0B"
}

// Méthodes
const saveProfile = () => {
  console.log("Profil sauvegardé :", profile.value)
}

const savePreferences = () => {
  console.log("Préférences sauvegardées :", preferences.value)
}

const savePaymentSettings = () => {
  console.log("Paramètres de paiement sauvegardés :", { paymentMethods: paymentMethods.value, currency: paymentPreferences.value.currency })
}

const saveNotifications = () => {
  console.log("Notifications sauvegardées :", notifications.value)
}

const changePassword = () => {
  if (security.value.newPassword !== security.value.confirmPassword) {
    alert("Les mots de passe ne correspondent pas.")
    return
  }
  console.log("Changement de mot de passe demandé")
}

const configure2FA = () => {
  alert("Configuration 2FA ouverte")
}

const saveAppearance = () => {
  console.log("Apparence sauvegardée :", appearance.value)
}

// Calculé
const canChangePassword = computed(() => {
  return security.value.currentPassword && security.value.newPassword && security.value.newPassword === security.value.confirmPassword
})
</script>