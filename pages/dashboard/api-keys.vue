<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clés API</h1>
        <p class="text-gray-500 mt-1">Gérez vos clés pour l'intégration API</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nouvelle clé API
      </button>
    </div>

    <!-- Liste des clés API -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
      <p class="text-gray-500 mt-2">Chargement...</p>
    </div>

    <div v-else-if="apiKeys.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">Aucune clé API</h3>
      <p class="text-gray-500 mb-4">Créez votre première clé API pour commencer l'intégration</p>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Créer une clé API
      </button>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="key in apiKeys" 
        :key="key.id"
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-medium text-gray-900">{{ key.name }}</h3>
              <span 
                :class="key.is_live ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                class="px-2 py-0.5 rounded text-xs font-medium"
              >
                {{ key.is_live ? 'Live' : 'Test' }}
              </span>
              <span 
                :class="key.is_active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'"
                class="px-2 py-0.5 rounded text-xs font-medium"
              >
                {{ key.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Clé publique:</span>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{{ key.public_key }}</code>
                <button @click="copyToClipboard(key.public_key)" class="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <div v-if="key.webhook_url" class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Webhook:</span>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">{{ key.webhook_url }}</code>
              </div>
              
              <div v-if="key.last_used_at" class="text-sm text-gray-500">
                Dernière utilisation: {{ formatDate(key.last_used_at) }}
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button
              @click="editKey(key)"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="confirmDelete(key)"
              class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Documentation -->
    <div class="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Guide d'intégration rapide</h2>
      
      <div class="space-y-6">
        <!-- Option 1: Widget HTML -->
        <div>
          <h3 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span class="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Widget HTML (Ultra-simple)
          </h3>
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-green-400 text-sm"><code>&lt;!-- Ajouter le script --&gt;
&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;

&lt;!-- Bouton de paiement --&gt;
&lt;button 
  data-leekpay-amount="5000" 
  data-leekpay-currency="XOF"
  data-leekpay-key="{{ apiKeys[0]?.public_key || 'pk_live_xxx' }}"
&gt;
  Payer 5000 CFA
&lt;/button&gt;</code></pre>
          </div>
        </div>

        <!-- Option 2: JavaScript -->
        <div>
          <h3 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            JavaScript (Popup)
          </h3>
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-blue-400 text-sm"><code>LeekPay.checkout({
  amount: 5000,
  currency: 'XOF',
  apiKey: '{{ apiKeys[0]?.public_key || 'pk_live_xxx' }}',
  onSuccess: (tx) => console.log('Payé!', tx),
  onCancel: () => console.log('Annulé')
})</code></pre>
          </div>
        </div>

        <!-- Option 3: API REST -->
        <div>
          <h3 class="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span class="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            API REST (Backend)
          </h3>
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-purple-400 text-sm"><code>curl -X POST https://leekpay.me/api/v1/checkout \
  -H "Authorization: Bearer sk_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000, "currency": "XOF", "return_url": "https://monsite.com/success"}'</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Création -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold mb-4">Nouvelle clé API</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              v-model="newKey.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ex: Production, Mon Site"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL Webhook (optionnel)</label>
            <input
              v-model="newKey.webhook_url"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://monsite.com/webhook/leekpay"
            />
          </div>
          
          <div class="flex items-center gap-2">
            <input
              v-model="newKey.is_live"
              type="checkbox"
              id="is_live"
              class="w-4 h-4 text-green-500"
            />
            <label for="is_live" class="text-sm text-gray-700">Mode Live (production)</label>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="createApiKey"
            :disabled="creating || !newKey.name"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {{ creating ? 'Création...' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal clé créée (affiche la clé secrète UNE SEULE FOIS) -->
    <div v-if="showSecretModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-lg w-full p-6">
        <div class="text-center mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold">Clé API créée !</h3>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p class="text-yellow-800 text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Copiez votre clé secrète maintenant. Elle ne sera plus jamais affichée.
          </p>
        </div>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Clé publique</label>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-gray-100 px-3 py-2 rounded font-mono text-sm break-all">{{ createdKeys.public_key }}</code>
              <button @click="copyToClipboard(createdKeys.public_key)" class="p-2 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm text-gray-500 mb-1">Clé secrète (à conserver)</label>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-red-50 border border-red-200 px-3 py-2 rounded font-mono text-sm break-all text-red-800">{{ createdKeys.secret_key }}</code>
              <button @click="copyToClipboard(createdKeys.secret_key)" class="p-2 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <button
            @click="closeSecretModal"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            J'ai copié ma clé secrète
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

const config = useRuntimeConfig()
const auth = useAuth()
const token = auth.token

const loading = ref(true)
const creating = ref(false)
const apiKeys = ref([])
const showCreateModal = ref(false)
const showSecretModal = ref(false)
const createdKeys = ref({ public_key: '', secret_key: '' })

const newKey = ref({
  name: '',
  webhook_url: '',
  is_live: true
})

onMounted(async () => {
  await fetchApiKeys()
})

async function fetchApiKeys() {
  try {
    loading.value = true
    const response = await $fetch(`${config.public.apiBaseURL}/api-keys`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (response.success) {
      apiKeys.value = response.data
    }
  } catch (error) {
    console.error('Erreur chargement clés API:', error)
  } finally {
    loading.value = false
  }
}

async function createApiKey() {
  if (!newKey.value.name || creating.value) return
  
  try {
    creating.value = true
    const response = await $fetch(`${config.public.apiBaseURL}/api-keys`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: newKey.value
    })
    
    if (response.success) {
      createdKeys.value = {
        public_key: response.data.public_key,
        secret_key: response.data.secret_key
      }
      showCreateModal.value = false
      showSecretModal.value = true
      await fetchApiKeys()
      
      // Reset form
      newKey.value = { name: '', webhook_url: '', is_live: true }
    }
  } catch (error) {
    console.error('Erreur création clé API:', error)
    alert(error.data?.message || 'Erreur lors de la création')
  } finally {
    creating.value = false
  }
}

function closeSecretModal() {
  showSecretModal.value = false
  createdKeys.value = { public_key: '', secret_key: '' }
}

function editKey(key) {
  // TODO: Implémenter l'édition
  alert('Fonctionnalité à venir')
}

function confirmDelete(key) {
  if (confirm(`Supprimer la clé "${key.name}" ? Cette action est irréversible.`)) {
    deleteKey(key.id)
  }
}

async function deleteKey(id) {
  try {
    await $fetch(`${config.public.apiBaseURL}/api-keys/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    await fetchApiKeys()
  } catch (error) {
    console.error('Erreur suppression:', error)
    alert('Erreur lors de la suppression')
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
  alert('Copié !')
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
