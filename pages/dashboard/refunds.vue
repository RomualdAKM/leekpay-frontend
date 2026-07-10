<template>
  <div>
    <div class="p-2 sm:p-2 space-y-2">
      <!-- Header -->
      <div>
        <p class="text-sm text-gray-600">Remboursez vos clients directement sur leur compte Mobile Money</p>
      </div>

      <!-- KYC Alert -->
      <div v-if="kycStatus !== 'approved'" class="border border-gray-200 p-4">
        <div class="flex items-start gap-3">
          <ShieldAlert class="w-5 h-5 flex-shrink-0" :class="kycStatus === 'rejected' ? 'text-red-600' : 'text-gray-500'" />
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ getKycAlertTitle() }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ getKycAlertMessage() }}</p>
            <NuxtLink 
              v-if="kycStatus !== 'pending'"
              to="/dashboard/kyc" 
              class="inline-block mt-2 text-sm text-green-600 hover:text-green-700"
            >
              {{ kycStatus === 'rejected' ? 'Nouveaux documents →' : 'Vérifier mon identité →' }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Balance Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Solde disponible</p>
          <p class="text-xl font-semibold text-gray-900 mt-1">{{ formatCurrency(userBalance.available_balance) }}</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">En cours</p>
          <p class="text-xl font-semibold text-gray-900 mt-1">{{ formatCurrency(userBalance.pending_balance) }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" defaultValue="request" class="w-full">
        <TabsList class="flex w-full border-b border-gray-200">
          <TabsTrigger
              value="request"
              class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-gray-900"
          >
            Nouveau remboursement
          </TabsTrigger>
          <TabsTrigger
              value="history"
              class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-gray-900"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <!-- Nouveau remboursement -->
        <TabsContent value="request" class="pt-6">
          <div class="bg-white">
            <div class="space-y-6">
              <!-- Provider / Réseau -->
              <div>
                <label for="providerName" class="block text-sm font-medium text-gray-700 mb-2">Réseau du client</label>
                <select
                  id="providerName"
                  v-model="refundForm.provider_name"
                  class="w-full px-3 py-2.5 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  required
                >
                  <option value="">Sélectionnez un réseau</option>
                  <optgroup label="Bénin">
                    <option value="MTN Benin">MTN Mobile Money Bénin</option>
                    <option value="Moov Benin">Moov Money Bénin</option>
                  </optgroup>
                  <optgroup label="Sénégal">
                    <option value="Orange Money Sénégal">Orange Money Sénégal</option>
                    <option value="Free Money Sénégal">Free Money Sénégal</option>
                  </optgroup>
                  <optgroup label="Côte d'Ivoire">
                    <option value="Orange Money Côte d'Ivoire">Orange Money Côte d'Ivoire</option>
                    <option value="MTN MoMo Côte d'Ivoire">MTN MoMo Côte d'Ivoire</option>
                  </optgroup>
                  <optgroup label="Togo">
                    <option value="T-Money">T-Money (Togocel)</option>
                  </optgroup>
                  <optgroup label="Cameroun">
                    <option value="MTN Cameroun">MTN Mobile Money Cameroun</option>
                    <option value="Orange Money Cameroun">Orange Money Cameroun</option>
                  </optgroup>
                  <optgroup label="Burkina Faso">
                    <option value="Moov Burkina Faso">Moov Money Burkina Faso</option>
                    <option value="Orange Money Burkina Faso">Orange Money Burkina Faso</option>
                  </optgroup>
                  <optgroup label="Gabon">
                    <option value="Airtel Money Gabon">Airtel Money Gabon</option>
                    <option value="Moov Gabon">Moov Money Gabon</option>
                  </optgroup>
                  <optgroup label="Congo-Brazzaville">
                    <option value="Airtel Money Congo">Airtel Money Congo-Brazzaville</option>
                    <option value="MTN Congo">MTN Mobile Money Congo-Brazzaville</option>
                  </optgroup>
                  <optgroup label="RDC (Congo-Kinshasa)">
                    <option value="Airtel Money RDC">Airtel Money RDC</option>
                    <option value="Orange Money RDC">Orange Money RDC</option>
                  </optgroup>
                </select>
              </div>

              <!-- Numéro de téléphone -->
              <div>
                <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone du client</label>
                <input
                    id="phoneNumber"
                    type="tel"
                    v-model="refundForm.phone_number"
                    @input="refundForm.phone_number = refundForm.phone_number.replace(/[^0-9+]/g, '')"
                    placeholder="Ex: 22996123456"
                    class="w-full px-4 py-2.5 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
                <p class="mt-1 text-xs text-gray-500">Format: indicatif + numéro (sans +, espaces ou tirets)</p>
              </div>

              <!-- Nom du bénéficiaire (optionnel) -->
              <div>
                <label for="recipientName" class="block text-sm font-medium text-gray-700 mb-2">Nom du bénéficiaire <span class="text-gray-400">(optionnel)</span></label>
                <input
                    id="recipientName"
                    type="text"
                    v-model="refundForm.recipient_name"
                    placeholder="Nom complet du client"
                    class="w-full px-4 py-2.5 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>

              <!-- Montant -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Montant à rembourser</label>
                <div class="relative">
                  <input
                      id="amount"
                      type="number"
                      v-model="refundForm.amount"
                      :min="1"
                      :max="userBalance.available_balance"
                      placeholder="0"
                      class="w-full pl-4 pr-12 py-2.5 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      @input="onAmountChange"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span class="text-gray-500 text-sm">{{ currencySymbol }}</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Maximum: {{ formatCurrency(userBalance.available_balance) }}
                </p>
              </div>

              <!-- Résumé Calcul des frais -->
              <div
                  v-if="refundForm.amount && parseFloat(refundForm.amount) > 0"
                  class="border border-gray-200 p-4"
              >
                <div v-if="!feesCalculation && !calculatingFees" class="text-center py-2">
                  <p class="text-sm text-gray-500">Impossible de calculer les frais. Veuillez réessayer.</p>
                </div>
                <div v-else-if="calculatingFees" class="text-center py-2">
                  <div class="inline-block h-4 w-4 animate-spin rounded-full border border-green-500 border-t-transparent"></div>
                  <span class="ml-2 text-sm text-gray-500">Calcul des frais...</span>
                </div>
                <div v-else class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Montant demandé</span>
                    <span class="font-medium">{{ formatCurrency(feesCalculation.amount) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Frais ({{ feesCalculation.fee_percentage }}%)</span>
                    <span class="font-medium text-red-600">
                      -{{ formatCurrency(feesCalculation.fees) }}
                    </span>
                  </div>
                  <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between font-semibold">
                      <span>Montant reçu par le client</span>
                      <span class="text-green-600">
                        {{ formatCurrency(feesCalculation.client_receives) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                  :disabled="
                    !refundForm.amount ||
                    parseFloat(refundForm.amount) <= 0 ||
                    parseFloat(refundForm.amount) > userBalance.available_balance ||
                    !refundForm.provider_name ||
                    !refundForm.phone_number ||
                    requestingRefund
                  "
                  class="w-full py-2.5 px-4 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  @click="handleRefundRequest"
              >
                <div v-if="requestingRefund" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {{ requestingRefund ? 'Envoi...' : 'Demander le remboursement' }}
              </button>
            </div>
          </div>
        </TabsContent>

        <!-- Historique -->
        <TabsContent value="history" class="pt-6">
          <div class="bg-white rounded-lg border border-gray-200">
            <div v-if="loadingHistory" class="text-center py-12">
              <div class="inline-block h-8 w-8 animate-spin rounded-full border border-green-500 border-t-transparent"></div>
              <p class="mt-2 text-sm text-gray-500">Chargement de l'historique...</p>
            </div>
            
            <div v-else-if="refundHistory.length === 0" class="text-center py-12">
              <div class="mx-auto h-12 w-12 text-gray-400">
                <Calendar class="w-12 h-12" />
              </div>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun historique de remboursement</h3>
              <p class="mt-1 text-sm text-gray-500">Vous n'avez pas encore effectué de demande de remboursement.</p>
            </div>
            
            <div v-else>
              <!-- Desktop: Table -->
              <div class="hidden md:block">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-white">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frais</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr
                          v-for="refund in refundHistory"
                          :key="refund.id"
                          class="hover:bg-gray-50"
                      >
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-semibold text-gray-900">
                            {{ formatCurrency(refund.amount) }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          -{{ formatCurrency(refund.total_fees) }}
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm text-gray-900">{{ refund.phone_number }}</div>
                          <div class="text-xs text-gray-500">{{ refund.provider_name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div class="flex items-center gap-1">
                            <Calendar class="w-4 h-4" />
                            {{ formatDate(refund.created_at) }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <component :is="getStatusBadge(refund.status)" />
                          <div v-if="refund.status === 'rejected' && refund.admin_notes" class="text-xs text-red-600 mt-1">
                            {{ refund.admin_notes }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <!-- Pagination -->
                <div v-if="historyPagination.last_page > 1" class="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div class="text-sm text-gray-700">
                    Affichage de page {{ historyPagination.current_page }} sur {{ historyPagination.last_page }}
                  </div>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === 1 || loadingHistory"
                      @click="fetchRefundHistory(historyPagination.current_page - 1)"
                    >
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchRefundHistory(historyPagination.current_page + 1)"
                    >
                      Suivant
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Mobile: Cards -->
              <div class="md:hidden">
                <div class="space-y-4 p-4">
                  <div
                      v-for="refund in refundHistory"
                      :key="refund.id"
                      class="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div class="space-y-4">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="text-sm font-medium text-gray-900">#{{ refund.id }}</div>
                          <div class="text-xs text-gray-500">{{ formatDate(refund.created_at) }}</div>
                        </div>
                        <component :is="getStatusBadge(refund.status)" />
                      </div>

                      <div v-if="refund.status === 'rejected' && refund.admin_notes" class="p-3 bg-red-50 rounded-lg">
                        <div class="text-xs text-red-700">{{ refund.admin_notes }}</div>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <div class="text-xs text-gray-500">Montant</div>
                          <div class="font-semibold text-gray-900">{{ formatCurrency(refund.amount) }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Frais</div>
                          <div class="text-red-600">-{{ formatCurrency(refund.total_fees) }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Client</div>
                          <div class="text-sm">{{ refund.phone_number }}</div>
                          <div class="text-xs text-gray-500">{{ refund.provider_name }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Statut</div>
                          <component :is="getStatusBadge(refund.status)" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Pagination mobile -->
                  <div v-if="historyPagination.last_page > 1" class="flex gap-2 justify-center">
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === 1 || loadingHistory"
                      @click="fetchRefundHistory(historyPagination.current_page - 1)"
                    >
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchRefundHistory(historyPagination.current_page + 1)"
                    >
                      Suivant
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    
    <!-- Toast -->
    <Transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 text-sm z-50"
      >
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

import { ref, h, onMounted, onBeforeUnmount } from "vue"
import Tabs from "~/components/ui/Tabs.vue"
import TabsList from "~/components/ui/TabsList.vue"
import TabsTrigger from "~/components/ui/TabsTrigger.vue"
import TabsContent from "~/components/ui/TabsContent.vue"
import {
  Calendar,
  ShieldAlert
} from "lucide-vue-next"
import { useAuth } from '~/composables/useAuth'

// Auth and API
const config = useRuntimeConfig()
const { token, user } = useAuth()

// Responsive
const isMobile = ref(false)
const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  if (user.value?.currency?.symbol) {
    currencySymbol.value = user.value.currency.symbol
  }
  
  checkScreen()
  window.addEventListener('resize', checkScreen)
  fetchKycStatus()
  fetchUserBalance()
  fetchRefundHistory()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

// Data
const userBalance = ref({
  available_balance: 0,
  pending_balance: 0
})

const refundHistory = ref([])
const historyPagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
})

const currencySymbol = ref('CFA')

// KYC Status
const kycStatus = ref('not_submitted')

const getKycAlertTitle = () => {
  switch (kycStatus.value) {
    case 'rejected': return 'Vérification refusée'
    case 'pending': return 'Vérification en cours'
    default: return 'Vérification requise'
  }
}

const getKycAlertMessage = () => {
  switch (kycStatus.value) {
    case 'rejected': return 'Votre vérification d\'identité a été refusée. Veuillez soumettre de nouveaux documents.'
    case 'pending': return 'Votre vérification est en cours d\'examen. Nous vous notifierons par email.'
    default: return 'Pour effectuer des remboursements, vous devez d\'abord vérifier votre identité.'
  }
}

const fetchKycStatus = async () => {
  try {
    const response = await $fetch('/kyc/status', {
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      kycStatus.value = response.data.kyc_status?.value || response.data.kyc_status || 'not_submitted'
    }
  } catch (error) {
    console.error('Erreur lors du chargement du statut KYC:', error)
  }
}

// UI State
const activeTab = ref("request")

// Refund form
const refundForm = ref({
  provider_name: '',
  phone_number: '',
  recipient_name: '',
  amount: ''
})

// Fees calculation
const feesCalculation = ref(null)
const calculatingFees = ref(false)
let feesTimeout = null

// Loading states
const loadingHistory = ref(false)
const requestingRefund = ref(false)

// Toast
const toast = ref({
  show: false,
  message: ''
})

const showToast = (message) => {
  toast.value.message = message
  toast.value.show = true
  setTimeout(() => {
    toast.value.show = false
    toast.value.message = ''
  }, 3000)
}

// Fetch user balance
const fetchUserBalance = async () => {
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
    showToast('Erreur lors du chargement du solde')
  }
}

// Calculate fees via API
const onAmountChange = () => {
  if (feesTimeout) clearTimeout(feesTimeout)
  const amount = parseFloat(refundForm.value.amount)
  if (!amount || amount <= 0) {
    feesCalculation.value = null
    return
  }
  feesTimeout = setTimeout(() => {
    calculateFees(amount)
  }, 500)
}

const calculateFees = async (amount) => {
  calculatingFees.value = true
  try {
    const response = await $fetch('/refund-requests/calculate-fees', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: { amount }
    })
    
    if (response.success) {
      const data = response.data
      feesCalculation.value = {
        amount: data.amount,
        fees: data.total_fees,
        fee_percentage: data.total_fee_percentage,
        client_receives: data.net_amount,
      }
    }
  } catch (error) {
    console.error('Erreur calcul frais:', error)
    feesCalculation.value = null
  } finally {
    calculatingFees.value = false
  }
}

// Fetch refund history
const fetchRefundHistory = async (page = 1) => {
  loadingHistory.value = true
  try {
    const response = await $fetch(`/refund-requests?page=${page}`, {
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      refundHistory.value = response.data
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
    showToast('Erreur lors du chargement de l\'historique')
  } finally {
    loadingHistory.value = false
  }
}

// Handle refund request
const handleRefundRequest = async () => {
  if (requestingRefund.value) return
  const amount = parseFloat(refundForm.value.amount)
  if (!amount || amount <= 0 || amount > userBalance.value.available_balance || !refundForm.value.provider_name || !refundForm.value.phone_number) {
    showToast('Veuillez vérifier les informations du remboursement.')
    return
  }
  
  requestingRefund.value = true
  try {
    const body = {
      amount,
      provider_name: refundForm.value.provider_name,
      phone_number: refundForm.value.phone_number
    }
    if (refundForm.value.recipient_name) {
      body.recipient_name = refundForm.value.recipient_name
    }

    const response = await $fetch('/refund-requests', {
      method: 'POST',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
    
    if (response.success) {
      showToast('Demande de remboursement envoyée avec succès!')
      // Reset form
      refundForm.value = {
        provider_name: '',
        phone_number: '',
        recipient_name: '',
        amount: ''
      }
      feesCalculation.value = null
      // Refresh data
      await fetchUserBalance()
      await fetchRefundHistory()
    } else {
      showToast(response.message || 'Erreur lors de la demande de remboursement.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    const errorMsg = error?.data?.message || 'Erreur lors de la demande de remboursement.'
    showToast(errorMsg)
  } finally {
    requestingRefund.value = false
  }
}

// Get status badge
const getStatusBadge = (status) => {
  switch (status) {
    case 'processed':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-green-600 text-white" }, "Traité")
    case 'pending':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-gray-200 text-gray-700" }, "En attente")
    case 'rejected':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-red-600 text-white" }, "Refusé")
    case 'cancelled':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 text-gray-800" }, "Annulé")
    default:
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-gray-200 text-gray-700" }, "Inconnu")
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
  const currencyCode = user.value?.currency?.code || 'XOF'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>
