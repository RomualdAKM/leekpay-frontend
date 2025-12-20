<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Communication</h1>
        <p class="text-gray-600">Envoyer un message par email aux utilisateurs</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Formulaire d'envoi -->
      <div class="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Nouveau message</h2>
        
        <form @submit.prevent="sendMessage" class="space-y-4">
          <!-- Destinataires -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Destinataires</label>
            <div class="flex gap-4 mb-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="sendToAll" 
                  :value="true"
                  class="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span class="text-sm text-gray-700">Tous les utilisateurs ({{ totalUsers }})</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="sendToAll" 
                  :value="false"
                  class="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span class="text-sm text-gray-700">Sélection personnalisée</span>
              </label>
            </div>

            <!-- Sélection utilisateurs -->
            <div v-if="!sendToAll" class="border rounded-lg p-4 bg-gray-50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-700">
                  {{ selectedUsers.length }} utilisateur(s) sélectionné(s)
                </span>
                <button 
                  type="button"
                  @click="showUserModal = true"
                  class="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Sélectionner les utilisateurs
                </button>
              </div>
              
              <div v-if="selectedUsers.length > 0" class="flex flex-wrap gap-2">
                <span 
                  v-for="user in selectedUsers.slice(0, 5)" 
                  :key="user.id"
                  class="inline-flex items-center gap-1 bg-white border px-2 py-1 rounded text-sm"
                >
                  {{ user.name }}
                  <button type="button" @click="removeUser(user.id)" class="text-gray-400 hover:text-red-500">
                    <X class="w-3 h-3" />
                  </button>
                </span>
                <span v-if="selectedUsers.length > 5" class="text-sm text-gray-500">
                  +{{ selectedUsers.length - 5 }} autres
                </span>
              </div>
              <p v-else class="text-sm text-gray-500">Aucun utilisateur sélectionné</p>
            </div>
          </div>

          <!-- Sujet -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sujet de l'email</label>
            <input
              v-model="subject"
              type="text"
              placeholder="Ex: Nouvelle fonctionnalité disponible !"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <!-- Contenu -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenu du message</label>
            <textarea
              v-model="content"
              rows="8"
              placeholder="Rédigez votre message ici..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">{{ content.length }} / 5000 caractères</p>
          </div>

          <!-- Bouton envoyer -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="sending || !canSend"
              class="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send class="w-5 h-5" />
              {{ sending ? 'Envoi en cours...' : 'Envoyer le message' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Aperçu -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Aperçu</h2>
        
        <div class="border rounded-lg overflow-hidden">
          <!-- Header email -->
          <div class="bg-gray-50 border-b p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-gray-900">LeekPay</p>
                <p class="text-xs text-gray-500">Message de l'équipe</p>
              </div>
              <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">📧 Communication</span>
            </div>
          </div>
          
          <!-- Body email -->
          <div class="p-4">
            <p class="font-medium text-gray-900 mb-2">
              Bonjour [Nom],
            </p>
            <div class="text-sm text-gray-600 whitespace-pre-wrap">{{ content || 'Votre message apparaîtra ici...' }}</div>
          </div>
          
          <!-- Footer email -->
          <div class="bg-gray-50 border-t p-4">
            <p class="text-xs text-gray-500 text-center">LeekPay • leekpay.me</p>
          </div>
        </div>

        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-700">
            <strong>Note :</strong> Le nom de chaque utilisateur sera automatiquement inséré dans l'email.
          </p>
        </div>
      </div>
    </div>

    <!-- Modal sélection utilisateurs -->
    <Teleport to="body">
      <div v-if="showUserModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black bg-opacity-50" @click="showUserModal = false"></div>
          
          <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold">Sélectionner les utilisateurs</h3>
              <button @click="showUserModal = false" class="text-gray-400 hover:text-gray-600">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <div class="p-6">
              <!-- Recherche -->
              <div class="mb-4">
                <input
                  v-model="userSearch"
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  @input="debouncedSearch"
                />
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-600">
                  {{ selectedUsers.length }} sélectionné(s) sur {{ allUsers.length }}
                </span>
                <div class="flex gap-2">
                  <button 
                    type="button"
                    @click="selectAllUsers"
                    class="text-sm text-green-600 hover:text-green-700"
                  >
                    Tout sélectionner
                  </button>
                  <button 
                    type="button"
                    @click="deselectAllUsers"
                    class="text-sm text-red-600 hover:text-red-700"
                  >
                    Tout désélectionner
                  </button>
                </div>
              </div>

              <!-- Liste des utilisateurs -->
              <div class="max-h-80 overflow-y-auto border rounded-lg">
                <div v-if="loadingUsers" class="p-8 text-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                </div>
                
                <div v-else-if="filteredUsers.length === 0" class="p-8 text-center text-gray-500">
                  Aucun utilisateur trouvé
                </div>
                
                <div v-else>
                  <label
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      :checked="isSelected(user.id)"
                      @change="toggleUser(user)"
                      class="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                    />
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">{{ user.name }}</p>
                      <p class="text-sm text-gray-500">{{ user.email }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="sticky bottom-0 bg-white border-t px-6 py-4">
              <button
                @click="showUserModal = false"
                class="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
              >
                Confirmer ({{ selectedUsers.length }} utilisateurs)
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Send, X, Users } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: ['admin']
})

const { token } = useAuth()
const config = useRuntimeConfig()

// State
const sendToAll = ref(true)
const subject = ref('')
const content = ref('')
const sending = ref(false)
const showUserModal = ref(false)
const loadingUsers = ref(false)
const userSearch = ref('')

const allUsers = ref([])
const selectedUsers = ref([])
const totalUsers = ref(0)

let searchTimeout = null

// Computed
const canSend = computed(() => {
  if (!subject.value.trim() || !content.value.trim()) return false
  if (!sendToAll.value && selectedUsers.value.length === 0) return false
  return true
})

const filteredUsers = computed(() => {
  if (!userSearch.value) return allUsers.value
  const search = userSearch.value.toLowerCase()
  return allUsers.value.filter(u => 
    u.name.toLowerCase().includes(search) || 
    u.email.toLowerCase().includes(search)
  )
})

// Methods
const loadUsers = async () => {
  try {
    loadingUsers.value = true
    const response = await $fetch(`${config.public.apiBaseURL}/admin/users?all=true`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (response.success) {
      allUsers.value = response.data
      totalUsers.value = response.total || response.data.length
    }
  } catch (error) {
    console.error('Erreur chargement utilisateurs:', error)
  } finally {
    loadingUsers.value = false
  }
}

const debouncedSearch = () => {
  // La recherche est faite côté client via filteredUsers
}

const isSelected = (userId) => {
  return selectedUsers.value.some(u => u.id === userId)
}

const toggleUser = (user) => {
  if (isSelected(user.id)) {
    selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id)
  } else {
    selectedUsers.value.push(user)
  }
}

const removeUser = (userId) => {
  selectedUsers.value = selectedUsers.value.filter(u => u.id !== userId)
}

const selectAllUsers = () => {
  selectedUsers.value = [...filteredUsers.value]
}

const deselectAllUsers = () => {
  selectedUsers.value = []
}

const sendMessage = async () => {
  if (!canSend.value) return
  
  try {
    sending.value = true
    
    const response = await $fetch(`${config.public.apiBaseURL}/admin/broadcast`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: {
        subject: subject.value,
        content: content.value,
        send_to_all: sendToAll.value,
        user_ids: sendToAll.value ? [] : selectedUsers.value.map(u => u.id)
      }
    })
    
    if (response.success) {
      alert(response.message)
      // Reset form
      subject.value = ''
      content.value = ''
      selectedUsers.value = []
      sendToAll.value = true
    }
  } catch (error) {
    console.error('Erreur envoi:', error)
    alert(error.data?.message || 'Erreur lors de l\'envoi du message')
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>
