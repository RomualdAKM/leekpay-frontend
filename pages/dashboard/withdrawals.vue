<template>
  <div>
    <div class="p-4 sm:p-6 space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Retraits</h1>
        <p class="text-sm text-gray-600">Gérez vos demandes de retrait et vos méthodes de paiement</p>
      </div>

      <!-- Balance Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500">Solde disponible</p>
              <p class="text-xl font-semibold text-gray-900 mt-1">
                {{ formatCurrency(userBalance.available_balance) }}
              </p>
            </div>
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <Wallet class="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500">En cours de retrait</p>
              <p class="text-xl font-semibold text-gray-900 mt-1">
                {{ formatCurrency(userBalance.pending_balance) }}
              </p>
            </div>
            <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight class="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500">Total retiré</p>
              <p class="text-xl font-semibold text-gray-900 mt-1">
                {{ formatCurrency(userBalance.total_withdrawn) }}
              </p>
            </div>
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle class="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" defaultValue="request" class="w-full">
        <TabsList class="flex w-full border-b border-gray-200">
          <TabsTrigger
              value="request"
              class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
          >
            Nouveau retrait
          </TabsTrigger>
          <TabsTrigger
              value="methods"
              class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
          >
            Moyens de paiement
          </TabsTrigger>
          <TabsTrigger
              value="history"
              class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <!-- Nouvelle Demande -->
        <TabsContent value="request" class="pt-6">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="space-y-6">
              <!-- Montant -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">Montant à retirer</label>
                <div class="relative">
                  <input
                      id="amount"
                      type="number"
                      v-model="withdrawalAmount"
                      :min="minimumWithdrawal"
                      :max="userBalance.available_balance"
                      placeholder="0"
                      class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span class="text-gray-500 text-sm">{{ currencySymbol }}</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Minimum: {{ formatCurrency(minimumWithdrawal) }} • Maximum: {{ formatCurrency(userBalance.available_balance) }}
                </p>
              </div>

              <!-- Résumé Calcul -->
              <div
                  v-if="withdrawalAmount && parseFloat(withdrawalAmount) >= minimumWithdrawal"
                  class="bg-gray-50 rounded-lg p-4"
              >
                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Montant demandé</span>
                    <span class="font-medium">{{ formatCurrency(parseFloat(withdrawalAmount)) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Frais de traitement ({{ feesPercentage * 100 }}%)</span>
                    <span class="font-medium text-red-600">
                      -{{ formatCurrency(calculateFees(parseFloat(withdrawalAmount))) }}
                    </span>
                  </div>
                  <div class="border-t border-gray-200 pt-3">
                    <div class="flex justify-between font-semibold">
                      <span>Montant à recevoir</span>
                      <span class="text-green-600">
                        {{ formatCurrency((parseFloat(withdrawalAmount) - calculateFees(parseFloat(withdrawalAmount)))) }}
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
                      class="p-4 border rounded-lg cursor-pointer transition-colors"
                      :class="
                        selectedMethod === method.id
                          ? 'border-green-500 bg-green-50'
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
                      <div v-if="method.is_default" class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Par défaut
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                  :disabled="
                    !withdrawalAmount ||
                    parseFloat(withdrawalAmount) < minimumWithdrawal ||
                    parseFloat(withdrawalAmount) > userBalance.available_balance ||
                    !selectedMethod ||
                    requestingWithdrawal
                  "
                  class="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  @click="handleWithdrawalRequest"
              >
                <div v-if="requestingWithdrawal" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <Wallet v-else class="w-5 h-5" />
                {{ requestingWithdrawal ? 'Demande en cours...' : 'Demander le retrait' }}
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
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
            <p class="mt-2 text-sm text-gray-500">Chargement des méthodes de retrait...</p>
          </div>
          
          <div v-else-if="withdrawalMethods.length === 0" class="text-center py-12">
            <div class="mx-auto h-12 w-12 text-gray-400">
              <CreditCard class="w-12 h-12" />
            </div>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune méthode de retrait</h3>
            <p class="mt-1 text-sm text-gray-500">Commencez par ajouter une méthode de retrait.</p>
            <div class="mt-6">
              <button
                type="button"
                class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white  hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
                class="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <component :is="getMethodIcon(method.method_type)" class="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">{{ method.provider_name }}</h3>
                    <p class="text-sm text-gray-500">{{ method.account_number }}</p>
                    <div v-if="method.is_default" class="mt-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Méthode par défaut
                    </div>
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
                    <div v-if="updatingMethod" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
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
                    <div v-if="updatingMethod" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
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
                    <div v-if="updatingMethod" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <Check v-else class="w-4 h-4" /> 
                    {{ updatingMethod ? 'Activation...' : 'Activer' }}
                  </button>
                  <button 
                    type="button"
                    class="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-red-700  ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                    @click="deleteMethod(method.id)"
                    :disabled="deletingMethod"
                  >
                    <div v-if="deletingMethod" class="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin"></div>
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
              <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
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
                      <div v-if="loadingHistory" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
                    >
                      Suivant
                      <div v-if="loadingHistory" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
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
                      <div v-if="loadingHistory" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Précédent
                    </button>
                    <button
                      type="button"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      :disabled="historyPagination.current_page === historyPagination.last_page || loadingHistory"
                      @click="fetchWithdrawalHistory(historyPagination.current_page + 1)"
                    >
                      Suivant
                      <div v-if="loadingHistory" class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
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
    <div v-if="showAddMethodModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-5 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Ajouter une méthode de retrait</h3>
            <button 
              type="button" 
              class="text-gray-400 hover:text-gray-500"
              @click="closeAddMethodModal"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form @submit.prevent="submitNewMethod" class="p-6 space-y-5">
          <div>
            <label for="methodType" class="block text-sm font-medium text-gray-700 mb-1">Type de méthode</label>
            <select
              id="methodType"
              v-model="newMethod.method_type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="bank_transfer">Virement bancaire</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="crypto_wallet">Portefeuille crypto</option>
            </select>
          </div>
          
          <div>
            <label for="providerName" class="block text-sm font-medium text-gray-700 mb-1">Nom du fournisseur</label>
            <input
              id="providerName"
              v-model="newMethod.provider_name"
              type="text"
              placeholder="Ex: Orange Money, Wave, etc."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label for="accountNumber" class="block text-sm font-medium text-gray-700 mb-1">Numéro de compte</label>
            <input
              id="accountNumber"
              v-model="newMethod.account_number"
              type="text"
              placeholder="Numéro de compte ou téléphone"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label for="accountName" class="block text-sm font-medium text-gray-700 mb-1">Nom du titulaire</label>
            <input
              id="accountName"
              v-model="newMethod.account_name"
              type="text"
              placeholder="Nom complet du titulaire"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              class="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              @click="closeAddMethodModal"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="flex-1 py-2 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex items-center justify-center"
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
        class="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50"
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

// Calculate fees
const calculateFees = (amount) => {
  return amount * feesPercentage
}

// Handle withdrawal request
const handleWithdrawalRequest = async () => {
  const amount = parseFloat(withdrawalAmount.value)
  if (!amount || amount < minimumWithdrawal || amount > userBalance.value.available_balance || !selectedMethod.value) {
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