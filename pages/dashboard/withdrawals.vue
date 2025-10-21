<template>
  <div>
    <div class="p-4 sm:p-6 space-y-6">
      <!-- Header -->
      <div>
        <h1 class="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold" style="color: #0A1F44">Demandes de Retrait</h1>
        <p class="text-gray-600 text-sm sm:text-base">Gérez vos retraits et moyens de paiement</p>
      </div>

      <!-- Balance Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Card class="p-4 sm:p-6 border-l-4" style="border-left-color: #2ECC71">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-xs sm:text-sm">Solde disponible</p>
              <p class="text-lg sm:text-2xl font-semibold mt-1" style="color: #0A1F44">
                {{ formatCurrency(userBalance.available_balance) }}
              </p>
            </div>
            <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Wallet class="w-5 sm:w-6 h-5 sm:h-6" style="color: #2ECC71" />
            </div>
          </div>
        </Card>

        <Card class="p-4 sm:p-6 border-l-4" style="border-left-color: #F39C12">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-xs sm:text-sm">En cours de retrait</p>
              <p class="text-lg sm:text-2xl font-semibold mt-1" style="color: #0A1F44">
                {{ formatCurrency(userBalance.pending_balance) }}
              </p>
            </div>
            <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight class="w-5 sm:w-6 h-5 sm:h-6" style="color: #F39C12" />
            </div>
          </div>
        </Card>

        <Card class="p-4 sm:p-6 border-l-4" style="border-left-color: #0A1F44">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-xs sm:text-sm">Total retiré</p>
              <p class="text-lg sm:text-2xl font-semibold mt-1" style="color: #0A1F44">
                {{ formatCurrency(userBalance.total_withdrawn) }}
              </p>
            </div>
            <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle class="w-5 sm:w-6 h-5 sm:h-6" style="color: #0A1F44" />
            </div>
          </div>
        </Card>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" defaultValue="request" class="w-full">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger
              value="request"
              class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-1.5 sm:py-2 text-sm sm:text-base"
          >
            Nouveau retrait
          </TabsTrigger>
          <TabsTrigger
              value="methods"
              class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-1.5 sm:py-2 text-sm sm:text-base"
          >
            Moyens de paiement
          </TabsTrigger>
          <TabsTrigger
              value="history"
              class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-1.5 sm:py-2 text-sm sm:text-base"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <!-- Nouvelle Demande -->
        <TabsContent value="request" class="space-y-6">
          <Card class="p-4 sm:p-6">
            <h3 class="mb-4 sm:mb-6 text-base sm:text-lg font-semibold" style="color: #0A1F44">
              Faire une demande de retrait
            </h3>

            <div class="space-y-4 sm:space-y-6">
              <!-- Montant -->
              <div class="space-y-2">
                <Label for="amount" class="text-sm">Montant à retirer</Label>
                <div class="relative">
                  <Input
                      id="amount"
                      type="number"
                      v-model="withdrawalAmount"
                      :min="minimumWithdrawal"
                      :max="userBalance.available_balance"
                      :placeholder="`Minimum ${formatCurrency(minimumWithdrawal)}`"
                      class="pr-10 sm:pr-12 text-sm py-2"
                  />
                  <span
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                  >
                    {{ currencySymbol }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-gray-600">
                  Maximum disponible: {{ formatCurrency(userBalance.available_balance) }}
                </p>
              </div>

              <!-- Résumé Calcul -->
              <div
                  v-if="withdrawalAmount && parseFloat(withdrawalAmount) >= minimumWithdrawal"
                  class="bg-gray-50 p-3 sm:p-4 rounded-lg"
              >
                <div class="flex justify-between text-xs sm:text-sm">
                  <span>Montant demandé:</span>
                  <span class="font-medium">{{ formatCurrency(parseFloat(withdrawalAmount)) }}</span>
                </div>
                <div class="flex justify-between text-xs sm:text-sm mt-2">
                  <span>Frais de traitement ({{ feesPercentage * 100 }}%):</span>
                  <span class="font-medium text-red-600">
                    -{{ formatCurrency(calculateFees(parseFloat(withdrawalAmount))) }}
                  </span>
                </div>
                <hr class="my-2" />
                <div class="flex justify-between font-semibold text-sm">
                  <span>Montant à recevoir:</span>
                  <span style="color: #2ECC71">
                    {{ formatCurrency((parseFloat(withdrawalAmount) - calculateFees(parseFloat(withdrawalAmount)))) }}
                  </span>
                </div>
              </div>

              <!-- Sélection Méthode -->
              <div class="space-y-2">
                <Label class="text-sm">Moyen de retrait</Label>
                <div class="grid grid-cols-1 gap-3">
                  <div
                      v-for="method in withdrawalMethods"
                      :key="method.id"
                      class="p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors"
                      :class="
                      selectedMethod === method.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    "
                      @click="selectedMethod = method.id"
                  >
                    <div class="flex items-center gap-3">
                      <component :is="getMethodIcon(method.method_type)" class="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                      <div class="flex-1">
                        <p class="font-medium text-sm">{{ method.provider_name }}</p>
                        <p class="text-xs text-gray-600">{{ method.account_number }}</p>
                      </div>
                      <Badge v-if="method.is_default" class="bg-blue-100 text-blue-700 text-xs py-0.5 px-1.5">
                        Par défaut
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                  :disabled="
                  !withdrawalAmount ||
                  parseFloat(withdrawalAmount) < minimumWithdrawal ||
                  parseFloat(withdrawalAmount) > userBalance.available_balance ||
                  !selectedMethod
                "
                  class="w-full gap-2 py-2 text-sm sm:text-base"
                  style="background-color: #2ECC71; color: white"
                  @click="handleWithdrawalRequest"
              >
                <Wallet class="w-4 h-4" />
                Demander le retrait
              </Button>
            </div>
          </Card>
        </TabsContent>

        <!-- Moyens de paiement -->
        <TabsContent value="methods" class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 class="text-base sm:text-lg font-semibold" style="color: #0A1F44">
              Moyens de paiement configurés
            </h3>
            <Button variant="outline" class="gap-2 text-sm py-1.5" @click="openAddMethodModal">
              <Plus class="w-4 h-4" />
              Ajouter un moyen
            </Button>
          </div>

          <div v-if="loadingMethods" class="text-center py-8">
            <p>Chargement des méthodes de retrait...</p>
          </div>
          
          <div v-else-if="withdrawalMethods.length === 0" class="text-center py-8 text-gray-500">
            <p>Aucune méthode de retrait configurée.</p>
          </div>

          <div v-else class="space-y-4">
            <Card
                v-for="method in withdrawalMethods"
                :key="method.id"
                class="p-4 sm:p-6"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <component :is="getMethodIcon(method.method_type)" class="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-sm sm:text-base" style="color: #0A1F44">{{ method.provider_name }}</h4>
                    <p class="text-xs sm:text-sm text-gray-600">{{ method.account_number }}</p>
                    <Badge v-if="method.is_default" class="bg-blue-100 text-blue-700 mt-1 sm:mt-2 text-xs py-0.5 px-1.5">
                      Méthode par défaut
                    </Badge>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button 
                    v-if="!method.is_default" 
                    variant="outline" 
                    size="sm" 
                    class="gap-2 py-1.5 text-xs"
                    @click="setDefaultMethod(method.id)"
                  >
                    <Star class="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Définir par défaut
                  </Button>
                  <Button 
                    v-if="method.is_active" 
                    variant="outline" 
                    size="sm" 
                    class="gap-2 py-1.5 text-xs"
                    @click="toggleMethodStatus(method.id)"
                  >
                    <X class="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Désactiver
                  </Button>
                  <Button 
                    v-else 
                    variant="outline" 
                    size="sm" 
                    class="gap-2 py-1.5 text-xs"
                    @click="toggleMethodStatus(method.id)"
                  >
                    <Check class="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Activer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    class="gap-2 py-1.5 text-xs"
                    @click="deleteMethod(method.id)"
                  >
                    <Trash2 class="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <!-- Historique -->
        <TabsContent value="history">
          <div v-if="loadingHistory" class="text-center py-8">
            <p>Chargement de l'historique...</p>
          </div>
          
          <div v-else-if="withdrawalHistory.length === 0" class="text-center py-8 text-gray-500">
            <p>Aucun historique de retrait disponible.</p>
          </div>
          
          <div v-else>
            <!-- Desktop: Table -->
            <Card v-if="!isMobile" class="hidden md:block">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                  <tr class="border-b">
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Demande</th>
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Montant</th>
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Frais</th>
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Moyen</th>
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Date</th>
                    <th class="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm" style="color: #0A1F44">Statut</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="withdrawal in withdrawalHistory"
                      :key="withdrawal.id"
                      class="border-b hover:bg-gray-50"
                  >
                    <td class="p-3 sm:p-4">
                      <p class="font-medium text-xs sm:text-sm" style="color: #0A1F44">#{{ withdrawal.id }}</p>
                      <p v-if="withdrawal.admin_notes" class="text-xs text-red-600 mt-1">
                        {{ withdrawal.admin_notes }}
                      </p>
                    </td>
                    <td class="p-3 sm:p-4 font-semibold text-sm" style="color: #0A1F44">
                      {{ formatCurrency(withdrawal.amount) }}
                    </td>
                    <td class="p-3 sm:p-4 text-red-600 text-sm">-{{ formatCurrency(withdrawal.total_fees) }}</td>
                    <td class="p-3 sm:p-4">
                      <p class="font-medium text-xs sm:text-sm">{{ withdrawal.withdrawal_method?.provider_name }}</p>
                      <p class="text-xs text-gray-500">{{ withdrawal.withdrawal_method?.account_number }}</p>
                    </td>
                    <td class="p-3 sm:p-4 flex items-center gap-1 text-xs text-gray-500">
                      <Calendar class="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      {{ formatDate(withdrawal.created_at) }}
                    </td>
                    <td class="p-3 sm:p-4">
                      <component :is="getStatusBadge(withdrawal.status)" class="text-xs py-0.5 px-2" />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div v-if="historyPagination.last_page > 1" class="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <div class="text-sm text-gray-700">
                  Affichage de page {{ historyPagination.current_page }} sur {{ historyPagination.last_page }}
                </div>
                <div class="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="historyPagination.current_page === 1"
                    @click="fetchWithdrawalHistory(historyPagination.current_page - 1)"
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    :disabled="historyPagination.current_page === historyPagination.last_page"
                    @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </Card>

            <!-- Mobile: Cards -->
            <div v-else class="space-y-4 md:hidden">
              <Card
                  v-for="withdrawal in withdrawalHistory"
                  :key="withdrawal.id"
                  class="p-3 sm:p-4"
              >
                <div class="space-y-3">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="font-medium text-sm" style="color: #0A1F44">#{{ withdrawal.id }}</p>
                      <p class="text-xs text-gray-500">{{ formatDate(withdrawal.created_at) }}</p>
                    </div>
                    <component :is="getStatusBadge(withdrawal.status)" class="text-xs py-0.5 px-2" />
                  </div>

                  <div v-if="withdrawal.admin_notes" class="p-2 bg-red-50 rounded">
                    <p class="text-xs text-red-600">{{ withdrawal.admin_notes }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <p class="text-xs text-gray-600">Montant</p>
                      <p class="font-semibold" style="color: #0A1F44">{{ formatCurrency(withdrawal.amount) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-600">Frais</p>
                      <p class="text-red-600">-{{ formatCurrency(withdrawal.total_fees) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-600">Moyen</p>
                      <p>{{ withdrawal.withdrawal_method?.provider_name }}</p>
                      <p class="text-xs text-gray-500">{{ withdrawal.withdrawal_method?.account_number }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-600">Statut</p>
                      <component :is="getStatusBadge(withdrawal.status)" class="text-xs py-0.5 px-2" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <!-- Pagination mobile -->
              <div v-if="historyPagination.last_page > 1" class="flex gap-1 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  :disabled="historyPagination.current_page === 1"
                  @click="fetchWithdrawalHistory(historyPagination.current_page - 1)"
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  :disabled="historyPagination.current_page === historyPagination.last_page"
                  @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
                >
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    
    <!-- Modal pour ajouter une méthode de retrait -->
    <div v-if="showAddMethodModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold" style="color: #0A1F44">Ajouter une méthode de retrait</h3>
            <button @click="closeAddMethodModal" class="text-gray-500 hover:text-gray-700">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <form @submit.prevent="submitNewMethod" class="space-y-4">
            <div class="space-y-2">
              <Label for="methodType" class="text-sm">Type de méthode</Label>
              <select
                id="methodType"
                v-model="newMethod.method_type"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              >
                <option value="">Sélectionnez un type</option>
                <option value="bank_transfer">Virement bancaire</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="crypto_wallet">Portefeuille crypto</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <Label for="providerName" class="text-sm">Nom du fournisseur</Label>
              <Input
                id="providerName"
                v-model="newMethod.provider_name"
                type="text"
                placeholder="Ex: Orange Money, Wave, etc."
                class="w-full"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="accountNumber" class="text-sm">Numéro de compte</Label>
              <Input
                id="accountNumber"
                v-model="newMethod.account_number"
                type="text"
                placeholder="Numéro de compte ou téléphone"
                class="w-full"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="accountName" class="text-sm">Nom du titulaire</Label>
              <Input
                id="accountName"
                v-model="newMethod.account_name"
                type="text"
                placeholder="Nom complet du titulaire"
                class="w-full"
                required
              />
            </div>
            
            <div class="flex items-center">
              <input
                id="isDefault"
                v-model="newMethod.is_default"
                type="checkbox"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label for="isDefault" class="ml-2 text-sm">Définir comme méthode par défaut</Label>
            </div>
            
            <div class="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                class="flex-1"
                @click="closeAddMethodModal"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                class="flex-1"
                style="background-color: #2ECC71; color: white"
                :disabled="submittingMethod"
              >
                {{ submittingMethod ? 'Ajout...' : 'Ajouter' }}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

import { ref, h, onMounted, onBeforeUnmount } from "vue"
import Card from "~/components/ui/Card.vue"
import Button from "~/components/ui/Button.vue"
import Input from "~/components/ui/Input.vue"
import Label from "~/components/ui/Label.vue"
import Badge from "~/components/ui/Badge.vue"
import Tabs from "~/components/ui/Tabs.vue"
import TabsList from "~/components/ui/TabsList.vue"
import TabsTrigger from "~/components/ui/TabsTrigger.vue"
import TabsContent from "~/components/ui/TabsContent.vue"
import {
  Wallet,
  CreditCard,
  Smartphone,
  Plus,
  ArrowUpRight,
  Calendar,
  AlertCircle,
  Star,
  X,
  Check,
  Trash2
} from "lucide-vue-next"
import { useAuth } from '~/composables/useAuth'

// Responsive
const isMobile = ref(false)
const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
  fetchUserBalance()
  fetchWithdrawalMethods()
  fetchWithdrawalHistory()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

// Auth and API
const config = useRuntimeConfig()
const { token } = useAuth()

// Data
const userBalance = ref({
  available_balance: 0,
  pending_balance: 0,
  total_withdrawn: 0
})

const withdrawalMethods = ref([])
const withdrawalHistory = ref([])
const historyPagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
})

const minimumWithdrawal = 1000 // 1000 CFA minimum
const feesPercentage = 0.02 // 2% fees
const currencySymbol = 'CFA'

// UI State
const activeTab = ref("request")
const withdrawalAmount = ref("")
const selectedMethod = ref(null)
const showAddMethodModal = ref(false)
const submittingMethod = ref(false)

// New method form
const newMethod = ref({
  method_type: '',
  provider_name: '',
  account_number: '',
  account_name: '',
  is_default: false
})

// Loading states
const loadingBalance = ref(false)
const loadingMethods = ref(false)
const loadingHistory = ref(false)

// Fetch user balance
const fetchUserBalance = async () => {
  loadingBalance.value = true
  try {
    const response = await $fetch('/balance', {
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      userBalance.value = response.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement du solde:', error)
  } finally {
    loadingBalance.value = false
  }
}

// Fetch withdrawal methods
const fetchWithdrawalMethods = async () => {
  loadingMethods.value = true
  try {
    const response = await $fetch('/withdrawal-methods', {
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      withdrawalMethods.value = response.data
      if (response.data.length > 0) {
        // Set default selected method to the first one or the default one
        const defaultMethod = response.data.find(method => method.is_default) || response.data[0]
        selectedMethod.value = defaultMethod.id
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des méthodes de retrait:', error)
  } finally {
    loadingMethods.value = false
  }
}

// Fetch withdrawal history
const fetchWithdrawalHistory = async (page = 1) => {
  loadingHistory.value = true
  try {
    const response = await $fetch(`/withdrawal-requests?page=${page}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      withdrawalHistory.value = response.data
      if (response.meta) {
        historyPagination.value = {
          current_page: response.meta.current_page,
          last_page: response.meta.last_page,
          per_page: response.meta.per_page,
          total: response.meta.total
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'historique:', error)
  } finally {
    loadingHistory.value = false
  }
}

// Calculate fees
const calculateFees = (amount) => {
  return amount * feesPercentage
}

// Handle withdrawal request
const handleWithdrawalRequest = async () => {
  const amount = parseFloat(withdrawalAmount.value)
  if (!amount || amount < minimumWithdrawal || amount > userBalance.value.available_balance || !selectedMethod.value) {
    alert('Veuillez vérifier les informations de retrait.')
    return
  }
  
  try {
    const response = await $fetch('/withdrawal-requests', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        withdrawal_method_id: selectedMethod.value,
        amount: amount
      }
    })
    
    if (response.success) {
      alert('Demande de retrait envoyée avec succès!')
      // Reset form
      withdrawalAmount.value = ""
      // Refresh data
      await fetchUserBalance()
      await fetchWithdrawalHistory()
    } else {
      alert(response.message || 'Erreur lors de la demande de retrait.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la demande de retrait.')
  }
}

// Get method icon based on type
const getMethodIcon = (methodType) => {
  switch (methodType) {
    case 'bank_transfer':
      return CreditCard
    case 'mobile_money':
      return Smartphone
    case 'crypto_wallet':
      return Wallet
    default:
      return CreditCard
  }
}

// Get status badge
const getStatusBadge = (status) => {
  switch (status) {
    case 'processed':
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700" }, "Traité")
    case 'pending':
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700" }, "En attente")
    case 'rejected':
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700" }, "Refusé")
    default:
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700" }, "Inconnu")
  }
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Modal methods
const openAddMethodModal = () => {
  showAddMethodModal.value = true
}

const closeAddMethodModal = () => {
  showAddMethodModal.value = false
  // Reset form
  newMethod.value = {
    method_type: '',
    provider_name: '',
    account_number: '',
    account_name: '',
    is_default: false
  }
}

// Submit new withdrawal method
const submitNewMethod = async () => {
  submittingMethod.value = true
  try {
    const response = await $fetch('/withdrawal-methods', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: newMethod.value
    })
    
    if (response.success) {
      alert('Méthode de retrait ajoutée avec succès!')
      closeAddMethodModal()
      await fetchWithdrawalMethods()
    } else {
      alert(response.message || 'Erreur lors de l\'ajout de la méthode.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de l\'ajout de la méthode de retrait.')
  } finally {
    submittingMethod.value = false
  }
}

// Set default withdrawal method
const setDefaultMethod = async (methodId) => {
  try {
    const response = await $fetch(`/withdrawal-methods/${methodId}`, {
      method: 'PUT',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        is_default: true
      }
    })
    
    if (response.success) {
      alert('Méthode définie par défaut!')
      await fetchWithdrawalMethods()
    } else {
      alert(response.message || 'Erreur lors de la mise à jour.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la mise à jour de la méthode.')
  }
}

// Toggle method status (activate/deactivate)
const toggleMethodStatus = async (methodId) => {
  try {
    const response = await $fetch(`/withdrawal-methods/${methodId}/toggle`, {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      alert('Statut de la méthode mis à jour!')
      await fetchWithdrawalMethods()
    } else {
      alert(response.message || 'Erreur lors de la mise à jour.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la mise à jour du statut.')
  }
}

// Delete withdrawal method
const deleteMethod = async (methodId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette méthode de retrait?')) {
    return
  }
  
  try {
    const response = await $fetch(`/withdrawal-methods/${methodId}`, {
      method: 'DELETE',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      alert('Méthode de retrait supprimée!')
      await fetchWithdrawalMethods()
    } else {
      alert(response.message || 'Erreur lors de la suppression.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la suppression de la méthode.')
  }
}
</script>