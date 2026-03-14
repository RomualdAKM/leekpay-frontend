<template>
  <div>
    <!-- En-tête -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Clés API</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez vos clés d'intégration</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
      >
        Nouvelle clé
      </button>
    </div>

    <!-- Chargement -->
    <div v-if="loading" class="py-12 text-center">
      <div class="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-900 mx-auto"></div>
    </div>

    <!-- État vide -->
    <div v-else-if="apiKeys.length === 0" class="border border-gray-200 rounded-lg p-8 text-center">
      <p class="text-gray-500 mb-4">Aucune clé API. Créez votre première clé pour commencer.</p>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
      >
        Créer une clé
      </button>
    </div>

    <!-- Liste des clés -->
    <div v-else class="border border-gray-200 rounded-lg divide-y divide-gray-200">
      <div 
        v-for="key in apiKeys" 
        :key="key.id"
        class="p-5"
      >
        <div class="flex justify-between items-start">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="font-medium text-gray-900">{{ key.name }}</span>
              <span class="text-xs text-gray-500 border border-gray-200 px-2 py-0.5 rounded">
                {{ key.is_live ? 'Production' : 'Test' }}
              </span>
              <span v-if="!key.is_active" class="text-xs text-gray-400">
                Inactive
              </span>
            </div>
            
            <div class="flex items-center gap-2">
              <code class="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">{{ key.public_key }}</code>
              <button @click="copyToClipboard(key.public_key)" class="text-gray-400 hover:text-gray-600 text-xs">
                Copier
              </button>
            </div>
            
            <div v-if="key.webhook_url" class="text-sm text-gray-500">
              Webhook: <span class="font-mono">{{ key.webhook_url }}</span>
            </div>
            
            <div v-if="key.last_used_at" class="text-xs text-gray-400">
              Utilisée le {{ formatDate(key.last_used_at) }}
            </div>
          </div>
          
          <div class="flex items-center gap-1">
            <button
              @click="editKey(key)"
              class="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
            >
              Modifier
            </button>
            <button
              @click="confirmDelete(key)"
              class="px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Guide d'intégration -->
    <div class="mt-10">
      <h2 class="text-sm font-medium text-gray-900 mb-4">Intégration rapide</h2>
      
      <div class="border border-gray-200 rounded-lg divide-y divide-gray-200">
        <div class="p-5">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">Widget HTML</span>
            <NuxtLink to="/docs#widget" class="text-xs text-gray-500 hover:text-gray-700">Documentation</NuxtLink>
          </div>
          <div class="bg-gray-900 rounded p-4 overflow-x-auto">
            <pre class="text-sm font-mono"><code class="text-gray-300">&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;
&lt;button data-leekpay-amount="5000" data-leekpay-currency="XOF" data-leekpay-key="{{ apiKeys[0]?.public_key || 'pk_live_xxx' }}"&gt;Payer&lt;/button&gt;</code></pre>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">JavaScript</span>
            <NuxtLink to="/docs#javascript" class="text-xs text-gray-500 hover:text-gray-700">Documentation</NuxtLink>
          </div>
          <div class="bg-gray-900 rounded p-4 overflow-x-auto">
            <pre class="text-sm font-mono"><code class="text-gray-300">LeekPay.checkout({ amount: 5000, currency: 'XOF', apiKey: '{{ apiKeys[0]?.public_key || 'pk_live_xxx' }}' })</code></pre>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">API REST</span>
            <NuxtLink to="/docs#api" class="text-xs text-gray-500 hover:text-gray-700">Documentation</NuxtLink>
          </div>
          <div class="bg-gray-900 rounded p-4 overflow-x-auto">
            <pre class="text-sm font-mono"><code class="text-gray-300">POST /api/v1/checkout  -H "Authorization: Bearer sk_live_xxx"  -d '{"amount": 5000, "currency": "XOF"}'</code></pre>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">Vérification Webhook</span>
            <NuxtLink to="/docs#webhooks" class="text-xs text-gray-500 hover:text-gray-700">Documentation</NuxtLink>
          </div>
          <p class="text-xs text-gray-500 mb-3">
            Utilisez votre <strong>clé publique</strong> pour vérifier la signature <code class="bg-gray-100 px-1 rounded">X-LeekPay-Signature</code>
          </p>
          <div class="bg-gray-900 rounded p-4 overflow-x-auto">
            <pre class="text-sm font-mono"><code class="text-gray-300">$signature = hash_hmac('sha256', $payload, '{{ apiKeys[0]?.public_key || 'pk_live_xxx' }}');</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Création -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-6">Nouvelle clé API</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Nom</label>
            <input
              v-model="newKey.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              placeholder="Production, Mon Site..."
            />
          </div>
          
          <div>
            <label class="block text-sm text-gray-600 mb-1">URL Webhook (optionnel)</label>
            <input
              v-model="newKey.webhook_url"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              placeholder="https://votresite.com/webhook"
            />
          </div>
          
          <!-- <div class="flex items-center gap-2">
            <input
              v-model="newKey.is_live"
              type="checkbox"
              id="is_live"
              class="w-4 h-4 accent-gray-900"
            />
            <label for="is_live" class="text-sm text-gray-600">Mode Production</label>
          </div> -->
        </div>
        
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Annuler
          </button>
          <button
            @click="createApiKey"
            :disabled="creating || !newKey.name"
            class="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {{ creating ? 'Création...' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal clé créée -->
    <div v-if="showSecretModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-lg w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Clé API créée</h3>
        
        <p class="text-sm text-gray-500 mb-6">
          Conservez votre clé secrète. Elle ne sera plus affichée.
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Clé publique</label>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-gray-50 px-3 py-2 rounded font-mono text-sm text-gray-700 break-all">{{ createdKeys.public_key }}</code>
              <button @click="copyToClipboard(createdKeys.public_key)" class="text-xs text-gray-500 hover:text-gray-700 px-2">
                Copier
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-xs text-gray-500 mb-1">Clé secrète</label>
            <div class="flex items-center gap-2">
              <code class="flex-1 bg-gray-900 px-3 py-2 rounded font-mono text-sm text-white break-all">{{ createdKeys.secret_key }}</code>
              <button @click="copyToClipboard(createdKeys.secret_key)" class="text-xs text-gray-500 hover:text-gray-700 px-2">
                Copier
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-100">
          <button
            @click="closeSecretModal"
            class="w-full px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Fermer
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
