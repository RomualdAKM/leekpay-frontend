<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold" style="color: #0A1F44">Paramètres</h1>
      <p class="text-gray-600">Gérez votre compte et configurez vos préférences</p>
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" defaultValue="profile" class="space-y-6">
      <TabsList class="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="payment">Paiements</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="appearance">Apparence</TabsTrigger>
      </TabsList>

      <!-- Profil -->
      <TabsContent value="profile" class="space-y-6">
        <!-- Informations personnelles -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <User class="w-5 h-5" />
              Informations personnelles
            </CardTitle>
            <CardDescription>
              Gérez vos informations de profil et de contact
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstName">Prénom</Label>
                <Input id="firstName" v-model="profile.firstName" />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Nom</Label>
                <Input id="lastName" v-model="profile.lastName" />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" v-model="profile.email" />
            </div>
            <div class="space-y-2">
              <Label for="phone">Téléphone</Label>
              <Input id="phone" type="tel" v-model="profile.phone" />
            </div>
            <div class="space-y-2">
              <Label for="company">Entreprise</Label>
              <Input id="company" v-model="profile.company" />
            </div>
            <div class="space-y-2">
              <Label for="bio">Biographie</Label>
              <Textarea
                  id="bio"
                  v-model="profile.bio"
                  placeholder="Parlez-nous un peu de vous..."
              />
            </div>
            <Button @click="saveProfile">Sauvegarder</Button>
          </CardContent>
        </Card>

        <!-- Préférences régionales -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Globe class="w-5 h-5" />
              Préférences régionales
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>Langue</Label>
                <Select v-model="preferences.language">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select v-model="preferences.timezone">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un fuseau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                    <SelectItem value="africa/abidjan">Africa/Abidjan</SelectItem>
                    <SelectItem value="america/new_york">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button @click="savePreferences">Sauvegarder</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Paiements -->
      <TabsContent value="payment" class="space-y-6">
        <!-- Méthodes de paiement -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <CreditCard class="w-5 h-5" />
              Méthodes de paiement
            </CardTitle>
            <CardDescription>
              Configurez les moyens de paiement acceptés
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <CreditCard class="w-5 h-5 text-gray-500" />
                  <div>
                    <p class="font-medium">Cartes bancaires</p>
                    <p class="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <Switch v-model="paymentMethods.card" />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Smartphone class="w-5 h-5 text-gray-500" />
                  <div>
                    <p class="font-medium">Mobile Money</p>
                    <p class="text-sm text-gray-500">Orange Money, MTN Money</p>
                  </div>
                </div>
                <Switch v-model="paymentMethods.mobileMoney" />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Mail class="w-5 h-5 text-gray-500" />
                  <div>
                    <p class="font-medium">Virement bancaire</p>
                    <p class="text-sm text-gray-500">Transfert direct</p>
                  </div>
                </div>
                <Switch v-model="paymentMethods.bankTransfer" />
              </div>
            </div>
            <Separator />
            <div class="space-y-2">
              <Label>Devise par défaut</Label>
              <Select v-model="paymentPreferences.currency">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="XOF">XOF (CFA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button @click="savePaymentSettings">Sauvegarder</Button>
          </CardContent>
        </Card>

        <!-- Frais et commissions -->
        <Card>
          <CardHeader>
            <CardTitle>Frais et commissions</CardTitle>
            <CardDescription>
              Aperçu des frais appliqués à vos transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Cartes bancaires</span>
                <span>2.9% + 0.30€</span>
              </div>
              <div class="flex justify-between">
                <span>Mobile Money</span>
                <span>1.5% + 0.20€</span>
              </div>
              <div class="flex justify-between">
                <span>Virement bancaire</span>
                <span>0.8% + 0.50€</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Notifications -->
      <TabsContent value="notifications" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Bell class="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choisissez quand et comment recevoir les notifications
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Nouveaux paiements</p>
                  <p class="text-sm text-gray-500">Recevoir une notification pour chaque paiement reçu</p>
                </div>
                <Switch v-model="notifications.newPayments" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Paiements échoués</p>
                  <p class="text-sm text-gray-500">Être alerté des tentatives de paiement échouées</p>
                </div>
                <Switch v-model="notifications.failedPayments" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Rapport hebdomadaire</p>
                  <p class="text-sm text-gray-500">Recevoir un résumé chaque lundi</p>
                </div>
                <Switch v-model="notifications.weeklyReport" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Notifications marketing</p>
                  <p class="text-sm text-gray-500">Conseils et nouvelles fonctionnalités</p>
                </div>
                <Switch v-model="notifications.marketing" />
              </div>
            </div>
            <Button @click="saveNotifications">Sauvegarder</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Sécurité -->
      <TabsContent value="security" class="space-y-6">
        <!-- Mot de passe -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Shield class="w-5 h-5" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Gérez la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="current-password">Mot de passe actuel</Label>
              <Input id="current-password" v-model="security.currentPassword" type="password" />
            </div>
            <div class="space-y-2">
              <Label for="new-password">Nouveau mot de passe</Label>
              <Input id="new-password" v-model="security.newPassword" type="password" />
            </div>
            <div class="space-y-2">
              <Label for="confirm-password">Confirmer le mot de passe</Label>
              <Input id="confirm-password" v-model="security.confirmPassword" type="password" />
            </div>
            <Button @click="changePassword" :disabled="!canChangePassword">Changer le mot de passe</Button>
          </CardContent>
        </Card>

        <!-- 2FA -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Key class="w-5 h-5" />
              Authentification à deux facteurs
            </CardTitle>
            <CardDescription>
              Sécurisez votre compte avec l'authentification à deux facteurs
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Authentification à deux facteurs</p>
                <p class="text-sm text-gray-500">Utilisez une application d'authentification pour sécuriser votre compte</p>
              </div>
              <Switch v-model="security.twoFactorEnabled" />
            </div>
            <Button variant="outline" @click="configure2FA">Configurer 2FA</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Apparence -->
      <TabsContent value="appearance" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Palette class="w-5 h-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Personnalisez l'apparence de votre tableau de bord
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label>Thème</Label>
              <Select v-model="appearance.theme">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label>Couleur d'accent</Label>
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
            <Button @click="saveAppearance">Sauvegarder</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard' // adapte selon ton layout
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
  Smartphone
} from "lucide-vue-next"

// Import des composants UI (à adapter selon ton chemin)
import Card from "~/components/ui/Card.vue"
import CardHeader from "~/components/ui/CardHeader.vue"
import CardTitle from "~/components/ui/CardTitle.vue"
import CardDescription from "~/components/ui/CardDescription.vue"
import CardContent from "~/components/ui/CardContent.vue"
import Button from "~/components/ui/Button.vue"
import Input from "~/components/ui/Input.vue"
import Label from "~/components/ui/Label.vue"
import Switch from "~/components/ui/Switch.vue"
import Textarea from "~/components/ui/Textarea.vue"
/*import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/Select.vue"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "~/components/ui/Tabs.vue"
import Separator from "~/components/ui/Separator.vue"*/

// État réactif
const activeTab = ref("profile")

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
  // Appel API ici
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
  // Appel API ici
}

const configure2FA = () => {
  alert("Configuration 2FA ouverte")
}

const saveAppearance = () => {
  console.log("Apparence sauvegardée :", appearance.value)
  // Tu peux ici stocker dans localStorage ou envoyer au serveur
}

// Calculé
const canChangePassword = computed(() => {
  return security.value.currentPassword && security.value.newPassword && security.value.newPassword === security.value.confirmPassword
})
</script>

<style scoped>
/* Optionnel : si tu veux styliser les tabs activés */

</style>