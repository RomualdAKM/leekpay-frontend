<template>
  <div>
    <div class="p-2 sm:p-2 space-y-2">
      <!-- Header -->
      <div>
        <!-- <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Retraits</h1> -->
        <p class="text-sm text-gray-600">Gérez vos demandes de retrait et vos méthodes de paiement</p>
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
      <div class="grid grid-cols-3 gap-4">
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Solde disponible</p>
          <p class="text-xl font-semibold text-gray-900 mt-1">{{ formatCurrency(userBalance.available_balance) }}</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">En cours</p>
          <p class="text-xl font-semibold text-gray-900 mt-1">{{ formatCurrency(userBalance.pending_balance) }}</p>
        </div>
        <div class="border border-gray-200 p-4">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Total retiré</p>
          <p class="text-xl font-semibold text-gray-900 mt-1">{{ formatCurrency(userBalance.total_withdrawn) }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" defaultValue="request" class="w-full">
        <TabsList class="flex w-full border-b border-gray-200">
          <TabsTrigger
              value="request"
              class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-gray-900"
          >
            Nouveau retrait
          </TabsTrigger>
          <TabsTrigger
              value="methods"
              class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-gray-900"
          >
            Moyens de paiement
          </TabsTrigger>
          <TabsTrigger
              value="history"
              class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b data-[state=active]:border-gray-900"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <!-- Nouvelle Demande -->
        <TabsContent value="request" class="pt-6">
          <div class="bg-white">
            <!-- Si aucun moyen de paiement n'est configuré -->
            <div v-if="!loadingMethods && withdrawalMethods.length === 0" class="text-center py-12">
              <!-- <div class="mx-auto h-16 w-16 text-gray-400 mb-4">
                <CreditCard class="w-16 h-16" />
              </div> -->
              <h3 class="text-sm font-semibold text-gray-900 mb-2">Aucune méthode de paiement configurée</h3>
              <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                Pour effectuer un retrait, vous devez d'abord ajouter au moins une méthode de paiement (Mobile Money, Virement bancaire, etc.).
              </p>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-md bg-green-600 px-2 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                @click="openAddMethodModal"
                :disabled="addingMethod"
              >
                <div v-if="addingMethod" class="w-2 h-2 border border-white border-t-transparent rounded-sm animate-spin"></div>
                <Plus v-else class="w-5 h-5" />
                {{ addingMethod ? 'Ajout en cours...' : 'Ajouter une méthode de paiement' }}
              </button>
            </div>

            <!-- Loader pendant le chargement des méthodes -->
            <div v-else-if="loadingMethods" class="text-center py-12">
              <div class="inline-block h-8 w-8 animate-spin rounded-full border border-green-500 border-t-transparent"></div>
              <p class="mt-2 text-sm text-gray-500">Chargement des méthodes de paiement...</p>
            </div>

            <!-- Formulaire de retrait si des méthodes existent -->
            <div v-else class="space-y-6">
              <!-- Montant -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Montant à retirer</label>
                <div class="relative">
                  <input
                      id="amount"
                      type="number"
                      v-model="withdrawalAmount"
                      :min="feesConfig.minimum_withdrawal"
                      :max="userBalance.available_balance"
                      placeholder="0"
                      class="w-full pl-4 pr-12 py-2.5 border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span class="text-gray-500 text-sm">{{ currencySymbol }}</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Minimum: {{ formatCurrency(feesConfig.minimum_withdrawal) }} • Maximum: {{ formatCurrency(userBalance.available_balance) }}
                </p>
              </div>

              <!-- Résumé Calcul -->
              <div
                  v-if="withdrawalAmount && parseFloat(withdrawalAmount) >= feesConfig.minimum_withdrawal"
                  class="border border-gray-200 p-4"
              >
                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Montant demandé</span>
                    <span class="font-medium">{{ formatCurrency(parseFloat(withdrawalAmount)) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Frais totaux ({{ feesConfig.total_percentage }}%)</span>
                    <span class="font-medium text-red-600">
                      -{{ formatCurrency(calculateFees(parseFloat(withdrawalAmount)).totalFees) }}
                    </span>
                  </div>
                  <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between font-semibold">
                      <span>Montant à recevoir</span>
                      <span class="text-green-600">
                        {{ formatCurrency(calculateFees(parseFloat(withdrawalAmount)).netAmount) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sélection Méthode -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Moyen de retrait</label>
                <div class="grid grid-cols-1 gap-3">
                  <div
                      v-for="method in withdrawalMethods"
                      :key="method.id"
                      class="p-4 border cursor-pointer transition-colors"
                      :class="
                        selectedMethod === method.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      "
                      @click="selectedMethod = method.id"
                  >
                    <div class="flex items-center gap-3">
                      <component :is="getMethodIcon(method.method_type)" class="w-5 h-5 text-gray-500" />
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">{{ method.provider_name }}</p>
                        <p class="text-sm text-gray-500">{{ method.account_number }}</p>
                      </div>
                      <span v-if="method.is_default" class="text-xs px-2 py-0.5 border border-gray-300 text-gray-600">
                        Par défaut
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                  :disabled="
                    !withdrawalAmount ||
                    parseFloat(withdrawalAmount) < feesConfig.minimum_withdrawal ||
                    parseFloat(withdrawalAmount) > userBalance.available_balance ||
                    !selectedMethod ||
                    requestingWithdrawal
                  "
                  class="w-full py-2.5 px-4 bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  @click="handleWithdrawalRequest"
              >
                <div v-if="requestingWithdrawal" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {{ requestingWithdrawal ? 'Envoi...' : 'Demander le retrait' }}
              </button>
            </div>
          </div>
        </TabsContent>

        <!-- Moyens de paiement -->
        <TabsContent value="methods" class="pt-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Moyens de paiement configurés</h2>
              <p class="text-sm text-gray-500">Gérez vos méthodes de retrait</p>
            </div>
            <button 
              type="button" 
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              @click="openAddMethodModal"
              :disabled="addingMethod"
            >
              <Plus class="w-4 h-4" />
              {{ addingMethod ? 'Ajout en cours...' : 'Ajouter un moyen' }}
            </button>
          </div>

          <div v-if="loadingMethods" class="text-center py-12">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border border-green-500 border-t-transparent"></div>
            <p class="mt-2 text-sm text-gray-500">Chargement des méthodes de retrait...</p>
          </div>
          
          <div v-else-if="withdrawalMethods.length === 0" class="text-center py-12">
            <!-- <div class="mx-auto h-12 w-12 text-gray-400">
              <CreditCard class="w-12 h-12" />
            </div> -->
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune méthode de retrait</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par ajouter une méthode de retrait.</p>
            <div class="mt-6">
              <button
                type="button"
                class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white  hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                @click="openAddMethodModal"
                :disabled="addingMethod"
              >
                <Plus class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                {{ addingMethod ? 'Ajout en cours...' : 'Ajouter une méthode' }}
              </button>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
                v-for="method in withdrawalMethods"
                :key="method.id"
                class="border border-gray-200 p-4"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3">
                  <component :is="getMethodIcon(method.method_type)" class="w-5 h-5 text-gray-500" />
                  <div>
                    <p class="font-medium text-gray-900">{{ method.provider_name }}</p>
                    <p class="text-sm text-gray-500">{{ method.account_number }}</p>
                    <span v-if="method.is_default" class="inline-block mt-1 text-xs px-2 py-0.5 border border-gray-300 text-gray-600">
                      Par défaut
                    </span>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-if="!method.is_default" 
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click="setDefaultMethod(method.id)"
                    :disabled="updatingMethod"
                  >
                    <div v-if="updatingMethod" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <Star v-else class="w-4 h-4" /> 
                    {{ updatingMethod ? 'Mise à jour...' : 'Définir par défaut' }}
                  </button>
                  <button 
                    v-if="method.is_active" 
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click="toggleMethodStatus(method.id)"
                    :disabled="updatingMethod"
                  >
                    <div v-if="updatingMethod" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <X v-else class="w-4 h-4" /> 
                    {{ updatingMethod ? 'Désactivation...' : 'Désactiver' }}
                  </button>
                  <button 
                    v-else 
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    @click="toggleMethodStatus(method.id)"
                    :disabled="updatingMethod"
                  >
                    <div v-if="updatingMethod" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <Check v-else class="w-4 h-4" /> 
                    {{ updatingMethod ? 'Activation...' : 'Activer' }}
                  </button>
                  <button 
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-red-700  ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                    @click="deleteMethod(method.id)"
                    :disabled="deletingMethod"
                  >
                    <div v-if="deletingMethod" class="w-4 h-4 border border-red-300 border-t-transparent rounded-full animate-spin"></div>
                    <Trash2 v-else class="w-4 h-4" /> 
                    {{ deletingMethod ? 'Suppression...' : 'Supprimer' }}
                  </button>
                </div>
              </div>
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
            
            <div v-else-if="withdrawalHistory.length === 0" class="text-center py-12">
              <div class="mx-auto h-12 w-12 text-gray-400">
                <Calendar class="w-12 h-12" />
              </div>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun historique de retrait</h3>
              <p class="mt-1 text-sm text-gray-500">Vous n'avez pas encore effectué de demande de retrait.</p>
            </div>
            
            <div v-else>
              <!-- Desktop: Table -->
              <div class="hidden md:block">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-white">
                      <tr>
                        <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demande</th> -->
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frais</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyen</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr
                          v-for="withdrawal in withdrawalHistory"
                          :key="withdrawal.id"
                          class="hover:bg-gray-50"
                      >
                        <!-- <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">#{{ withdrawal.id }}</div>
                          <div v-if="withdrawal.admin_notes" class="text-xs text-red-600 mt-1">
                            {{ withdrawal.admin_notes }}
                          </div>
                        </td> -->
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-semibold text-gray-900">
                            {{ formatCurrency(withdrawal.amount) }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          -{{ formatCurrency(withdrawal.total_fees) }}
                        </td>
                        <td class="px-6 py-4">
                          <div class="text-sm text-gray-900">{{ withdrawal.withdrawal_method?.provider_name }}</div>
                          <div class="text-xs text-gray-500">{{ withdrawal.withdrawal_method?.account_number }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div class="flex items-center gap-1">
                            <Calendar class="w-4 h-4" />
                            {{ formatDate(withdrawal.created_at) }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <component :is="getStatusBadge(withdrawal.status)" />
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
                      @click="fetchWithdrawalHistory(historyPagination.current_page - 1)"
                    >
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
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
                      v-for="withdrawal in withdrawalHistory"
                      :key="withdrawal.id"
                      class="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div class="space-y-4">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="text-sm font-medium text-gray-900">#{{ withdrawal.id }}</div>
                          <div class="text-xs text-gray-500">{{ formatDate(withdrawal.created_at) }}</div>
                        </div>
                        <component :is="getStatusBadge(withdrawal.status)" />
                      </div>

                      <div v-if="withdrawal.admin_notes" class="p-3 bg-red-50 rounded-lg">
                        <div class="text-xs text-red-700">{{ withdrawal.admin_notes }}</div>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <div class="text-xs text-gray-500">Montant</div>
                          <div class="font-semibold text-gray-900">{{ formatCurrency(withdrawal.amount) }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Frais</div>
                          <div class="text-red-600">-{{ formatCurrency(withdrawal.total_fees) }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Moyen</div>
                          <div class="text-sm">{{ withdrawal.withdrawal_method?.provider_name }}</div>
                          <div class="text-xs text-gray-500">{{ withdrawal.withdrawal_method?.account_number }}</div>
                        </div>
                        <div>
                          <div class="text-xs text-gray-500">Statut</div>
                          <component :is="getStatusBadge(withdrawal.status)" />
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
                      @click="fetchWithdrawalHistory(historyPagination.current_page - 1)"
                    >
                      <div v-if="loadingHistory" class="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
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
    
    <!-- Modal pour ajouter une méthode de retrait -->
    <div v-if="showAddMethodModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="px-5 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900">Ajouter une méthode de retrait</h3>
            <button 
              type="button" 
              class="text-gray-400 hover:text-gray-500"
              @click="closeAddMethodModal"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form @submit.prevent="submitNewMethod" class="p-5 space-y-4">
          <div>
            <label for="methodType" class="block text-sm text-gray-700 mb-1">Type de méthode</label>
            <select
              id="methodType"
              v-model="newMethod.method_type"
              class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="bank_transfer" disabled class="text-gray-400">Virement bancaire (bientôt)</option>
              <option value="crypto_wallet" disabled class="text-gray-400">Portefeuille crypto (bientôt)</option>
            </select>
          </div>
          
          <div>
            <label for="providerName" class="block text-sm text-gray-700 mb-1">Fournisseur</label>
            <select
              id="providerName"
              v-model="newMethod.provider_name"
              class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            >
              <option value="">Sélectionnez un fournisseur</option>
              <optgroup label="Bénin">
                <option value="MTN Benin">MTN Mobile Money Bénin</option>
                <option value="Moov Benin">Moov Money Bénin</option>
              </optgroup>
              <optgroup label="Sénégal">
                <!-- <option value="E-money Sénégal">E-money Sénégal</option> -->
                <option value="Orange Money Sénégal">Orange Money Sénégal</option>
                <!-- <option value="Wave Sénégal">Wave Sénégal</option> -->
                <option value="Free Money Sénégal">Free Money Sénégal</option>
                <!-- <option value="Djamo Sénégal">Djamo Sénégal</option> -->
              </optgroup>
              <optgroup label="Côte d'Ivoire">
                <option value="Orange Money Côte d'Ivoire">Orange Money Côte d'Ivoire</option>
                <option value="MTN MoMo Côte d'Ivoire">MTN MoMo Côte d'Ivoire</option>
                <!-- <option value="Moov Money Côte d'Ivoire">Moov Money Côte d'Ivoire</option>
                <option value="Wave Côte d'Ivoire">Wave Côte d'Ivoire</option>
                <option value="Djamo Côte d'Ivoire">Djamo Côte d'Ivoire</option> -->
              </optgroup>
              <optgroup label="Togo">
                <option value="T-Money">T-Money (Togocel)</option>
              </optgroup>
              <!-- <optgroup label="Mali">
                <option value="Orange Money Mali">Orange Money Mali</option>
              </optgroup> -->
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
                <!-- <option value="Vodacom M-Pesa RDC">Vodacom M-Pesa RDC</option> -->
              </optgroup>
            </select>
          </div>
          
          <div>
            <label for="accountNumber" class="block text-sm text-gray-700 mb-1">Numéro de compte</label>
            <input
              id="accountNumber"
              v-model="newMethod.account_number"
              type="text"
              placeholder="Ex: 22996123456"
              class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <p class="mt-1 text-xs text-gray-500">Format: indicatif + numéro (sans +, espaces ou tirets)</p>
          </div>
          
          <div>
            <label for="accountName" class="block text-sm text-gray-700 mb-1">Nom du titulaire</label>
            <input
              id="accountName"
              v-model="newMethod.account_name"
              type="text"
              placeholder="Nom complet"
              class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>
          
          <div class="flex items-center">
            <input
              id="isDefault"
              v-model="newMethod.is_default"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label for="isDefault" class="ml-2 block text-sm text-gray-700">Définir comme méthode par défaut</label>
          </div>
          
          <div class="flex gap-3 pt-2">
            <button
              type="button"
              class="flex-1 py-2 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              @click="closeAddMethodModal"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="flex-1 py-2 px-4 bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
              :disabled="submittingMethod"
            >
              <div v-if="submittingMethod" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {{ submittingMethod ? 'Ajout...' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
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
  Trash2,
  ShieldAlert,
  Clock,
  ArrowRight
} from "lucide-vue-next"
import { useAuth } from '~/composables/useAuth'

// Responsive
const isMobile = ref(false)
const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

// Fetch fees configuration
const fetchFeesConfig = async () => {
  try {
    const response = await $fetch('/withdrawal-requests/fees-config', {
      method: 'GET',
      baseURL: config.public.apiBaseURL,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    
    if (response.success) {
      feesConfig.value = response.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la configuration des frais:', error)
    // Garder les valeurs par défaut en cas d'erreur
  }
}

onMounted(() => {
  // Définir le symbole de la devise de l'utilisateur
  if (user.value?.currency?.symbol) {
    currencySymbol.value = user.value.currency.symbol
  }
  
  checkScreen()
  window.addEventListener('resize', checkScreen)
  fetchKycStatus()
  fetchFeesConfig()
  fetchUserBalance()
  fetchWithdrawalMethods()
  fetchWithdrawalHistory()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

// Auth and API
const config = useRuntimeConfig()
const { token, user } = useAuth()

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

// Configuration des frais (sera récupérée depuis l'API)
const feesConfig = ref({
  total_rate: 0.03,
  total_percentage: 3,
  leekpay: {
    share: 0.33,
    percentage: 1
  },
  aggregator: {
    share: 0.67,
    percentage: 2
  },
  minimum_withdrawal: 1000
})

const currencySymbol = ref('CFA')

// KYC Status
const kycStatus = ref('not_submitted')

// KYC Helper functions
const getKycAlertClass = () => {
  switch (kycStatus.value) {
    case 'rejected': return 'bg-red-50 border border-red-200'
    case 'pending': return 'bg-orange-50 border border-orange-200'
    default: return 'bg-orange-50 border border-orange-200'
  }
}

const getKycAlertTextClass = () => {
  return kycStatus.value === 'rejected' ? 'text-red-800' : 'text-orange-800'
}

const getKycAlertDescClass = () => {
  return kycStatus.value === 'rejected' ? 'text-red-700' : 'text-orange-700'
}

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
    default: return 'Pour effectuer des retraits, vous devez d\'abord vérifier votre identité.'
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

// Toast
const toast = ref({
  show: false,
  message: ''
})

// Loading states for specific actions
const requestingWithdrawal = ref(false)
const addingMethod = ref(false)
const updatingMethod = ref(false)
const deletingMethod = ref(false)

// Show toast function
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
    showToast('Erreur lors du chargement du solde')
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
    showToast('Erreur lors du chargement des méthodes de retrait')
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
    showToast('Erreur lors du chargement de l\'historique')
  } finally {
    loadingHistory.value = false
  }
}

// Calculate fees using backend configuration
const calculateFees = (amount) => {
  const totalFees = amount * feesConfig.value.total_rate
  const leekpayFee = totalFees * feesConfig.value.leekpay.share
  const aggregatorFee = totalFees * feesConfig.value.aggregator.share
  return {
    leekpayFee: Math.round(leekpayFee * 100) / 100,
    aggregatorFee: Math.round(aggregatorFee * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    netAmount: Math.round((amount - totalFees) * 100) / 100
  }
}

// Handle withdrawal request
const handleWithdrawalRequest = async () => {
  const amount = parseFloat(withdrawalAmount.value)
  if (!amount || amount < feesConfig.value.minimum_withdrawal || amount > userBalance.value.available_balance || !selectedMethod.value) {
    showToast('Veuillez vérifier les informations de retrait.')
    return
  }
  
  requestingWithdrawal.value = true
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
      showToast('Demande de retrait envoyée avec succès!')
      // Reset form
      withdrawalAmount.value = ""
      // Refresh data
      await fetchUserBalance()
      await fetchWithdrawalHistory()
    } else {
      showToast(response.message || 'Erreur lors de la demande de retrait.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showToast('Erreur lors de la demande de retrait.')
  } finally {
    requestingWithdrawal.value = false
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
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-green-600 text-white" }, "Traité")
    case 'pending':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-gray-200 text-gray-700" }, "En attente")
    case 'rejected':
      return h("span", { class: "inline-flex items-center px-2 py-0.5 text-xs bg-red-600 text-white" }, "Refusé")
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
  addingMethod.value = true
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
      showToast('Méthode de retrait ajoutée avec succès!')
      closeAddMethodModal()
      await fetchWithdrawalMethods()
    } else {
      showToast(response.message || 'Erreur lors de l\'ajout de la méthode.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showToast('Erreur lors de l\'ajout de la méthode de retrait.')
  } finally {
    submittingMethod.value = false
    addingMethod.value = false
  }
}

// Set default withdrawal method
const setDefaultMethod = async (methodId) => {
  updatingMethod.value = true
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
      showToast('Méthode définie par défaut!')
      await fetchWithdrawalMethods()
    } else {
      showToast(response.message || 'Erreur lors de la mise à jour.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showToast('Erreur lors de la mise à jour de la méthode.')
  } finally {
    updatingMethod.value = false
  }
}

// Toggle method status (activate/deactivate)
const toggleMethodStatus = async (methodId) => {
  updatingMethod.value = true
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
      showToast('Statut de la méthode mis à jour!')
      await fetchWithdrawalMethods()
    } else {
      showToast(response.message || 'Erreur lors de la mise à jour.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showToast('Erreur lors de la mise à jour du statut.')
  } finally {
    updatingMethod.value = false
  }
}

// Delete withdrawal method
const deleteMethod = async (methodId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette méthode de retrait?')) {
    return
  }
  
  deletingMethod.value = true
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
      showToast('Méthode de retrait supprimée!')
      await fetchWithdrawalMethods()
    } else {
      showToast(response.message || 'Erreur lors de la suppression.')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showToast('Erreur lors de la suppression de la méthode.')
  } finally {
    deletingMethod.value = false
  }
}
</script>