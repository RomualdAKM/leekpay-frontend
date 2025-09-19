<!-- pages/dashboard/transactions.vue -->
<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-2" style="color: #0A1F44">Transactions</h1>
        <p class="text-gray-600">Historique de tous vos paiements</p>
      </div>
      <Button
          variant="outline"
          class="gap-2 w-full md:w-auto"
      >
        <DownloadIcon class="w-4 h-4" />
        Exporter
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <DollarSignIcon class="w-5 h-5" style="color: #2ECC71" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Revenus totaux</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ totalRevenue.toLocaleString() }}€
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-600 font-semibold">✓</span>
          </div>
          <div>
            <p class="text-sm text-gray-600">Payées</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ completedCount }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span class="text-yellow-600 font-semibold">⏳</span>
          </div>
          <div>
            <p class="text-sm text-gray-600">En attente</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ pendingCount }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span class="text-red-600 font-semibold">✗</span>
          </div>
          <div>
            <p class="text-sm text-gray-600">Échouées</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ failedCount }}
            </p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Filters -->
    <Card class="p-4">
      <div class="flex flex-col sm:flex-row flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                placeholder="Rechercher par ID, email ou lien..."
                v-model="searchTerm"
                class="pl-10 w-full"
            />
          </div>
        </div>

        <select
            v-model="statusFilter"
            class="px-3 py-2 border rounded-md bg-white min-w-48"
        >
          <option value="all">Tous les statuts</option>
          <option value="completed">Payé</option>
          <option value="pending">En attente</option>
          <option value="failed">Échoué</option>
        </select>

        <select
            v-model="methodFilter"
            class="px-3 py-2 border rounded-md bg-white min-w-48"
        >
          <option value="all">Tous les moyens</option>
          <option value="Carte bancaire">Carte bancaire</option>
          <option value="Orange Money">Orange Money</option>
          <option value="Wave">Wave</option>
          <option value="MTN Money">MTN Money</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>
    </Card>

    <!-- Transactions List -->
    <Card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="border-b">
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Transaction</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Lien</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Client</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Montant</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Moyen</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Date</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Statut</th>
            <th class="text-left p-4 font-medium" style="color: #0A1F44">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="transaction in filteredTransactions"
              :key="transaction.id"
              class="border-b hover:bg-gray-50"
          >
            <td class="p-4">
              <div>
                <p class="font-medium" style="color: #0A1F44">{{ transaction.id }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(transaction.date) }}</p>
              </div>
            </td>
            <td class="p-4">
              <div>
                <p class="font-medium text-sm">{{ transaction.linkTitle }}</p>
                <p class="text-xs text-gray-500">paylink.pro/{{ transaction.linkId }}</p>
              </div>
            </td>
            <td class="p-4">
              <p class="text-sm">{{ transaction.customerEmail }}</p>
            </td>
            <td class="p-4">
              <p class="font-semibold" style="color: #2ECC71">
                {{ transaction.amount.toLocaleString() }} {{ transaction.currency }}
              </p>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2">
                <component :is="getPaymentMethodIcon(transaction.paymentMethod)" class="w-4 h-4" />
                <span class="text-sm">{{ transaction.paymentMethod }}</span>
              </div>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-1 text-sm text-gray-500">
                <CalendarIcon class="w-4 h-4" />
                {{ formatDate(transaction.date) }}
              </div>
            </td>
            <td class="p-4">
              <Badge :class="getStatusBadgeClass(transaction.status)">
                {{ getStatusBadgeText(transaction.status) }}
              </Badge>
            </td>
            <td class="p-4">
              <Button variant="ghost" size="sm" class="gap-1">
                <ExternalLinkIcon class="w-4 h-4" />
                Détails
              </Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <div v-if="filteredTransactions.length === 0" class="text-center py-12">
      <p class="text-gray-500">Aucune transaction trouvée</p>
    </div>
  </div>
</template>

<script setup>
import {
  SearchIcon,
  FilterIcon,
  DollarSignIcon,
  CreditCardIcon,
  SmartphoneIcon,
  CalendarIcon,
  ExternalLinkIcon,
  DownloadIcon
} from 'lucide-vue-next'
import Badge from "~/components/ui/Badge.vue";
import Button from "~/components/ui/Button.vue";
import Card from "~/components/ui/Card.vue";
import Input from "~/components/ui/Input.vue";

definePageMeta({
  layout: 'dashboard'
})

const searchTerm = ref('')
const statusFilter = ref('all')
const methodFilter = ref('all')

const mockTransactions = [
  {
    id: 'TXN-2024-001',
    amount: 299,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    date: '2024-01-15T14:30:00Z',
    status: 'completed',
    customerEmail: 'client@email.com',
    linkTitle: 'Formation JavaScript Avancée',
    linkId: 'formation-js-2024'
  },
  {
    id: 'TXN-2024-002',
    amount: 50,
    currency: 'EUR',
    paymentMethod: 'Orange Money',
    date: '2024-01-14T10:15:00Z',
    status: 'completed',
    customerEmail: 'don@email.com',
    linkTitle: 'Don pour l\'Association',
    linkId: 'don-association-2024'
  },
  {
    id: 'TXN-2024-003',
    amount: 29.99,
    currency: 'EUR',
    paymentMethod: 'Wave',
    date: '2024-01-14T16:45:00Z',
    status: 'completed',
    customerEmail: 'acheteur@email.com',
    linkTitle: 'Ebook Marketing Digital',
    linkId: 'ebook-marketing-digital'
  },
  {
    id: 'TXN-2024-004',
    amount: 150,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    date: '2024-01-13T09:20:00Z',
    status: 'pending',
    customerEmail: 'client2@email.com',
    linkTitle: 'Consultation Business',
    linkId: 'consultation-business'
  },
  {
    id: 'TXN-2024-005',
    amount: 299,
    currency: 'EUR',
    paymentMethod: 'PayPal',
    date: '2024-01-12T11:30:00Z',
    status: 'failed',
    customerEmail: 'test@email.com',
    linkTitle: 'Formation JavaScript Avancée',
    linkId: 'formation-js-2024'
  },
  {
    id: 'TXN-2024-006',
    amount: 75,
    currency: 'EUR',
    paymentMethod: 'MTN Money',
    date: '2024-01-11T15:10:00Z',
    status: 'completed',
    customerEmail: 'donateur@email.com',
    linkTitle: 'Don pour l\'Association',
    linkId: 'don-association-2024'
  }
]

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'failed':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusBadgeText = (status) => {
  switch (status) {
    case 'completed':
      return 'Payé'
    case 'pending':
      return 'En attente'
    case 'failed':
      return 'Échoué'
    default:
      return 'Inconnu'
  }
}

const getPaymentMethodIcon = (method) => {
  if (method.includes('Carte') || method.includes('PayPal')) {
    return CreditCardIcon
  }
  return SmartphoneIcon
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const filteredTransactions = computed(() => {
  return mockTransactions.filter(transaction => {
    const matchesSearch = transaction.linkTitle.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        transaction.customerEmail.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesStatus = statusFilter.value === 'all' || transaction.status === statusFilter.value
    const matchesMethod = methodFilter.value === 'all' || transaction.paymentMethod === methodFilter.value

    return matchesSearch && matchesStatus && matchesMethod
  })
})

const totalRevenue = computed(() => {
  return filteredTransactions.value
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
})

const completedCount = computed(() => {
  return filteredTransactions.value.filter(t => t.status === 'completed').length
})

const pendingCount = computed(() => {
  return filteredTransactions.value.filter(t => t.status === 'pending').length
})

const failedCount = computed(() => {
  return filteredTransactions.value.filter(t => t.status === 'failed').length
})
</script>