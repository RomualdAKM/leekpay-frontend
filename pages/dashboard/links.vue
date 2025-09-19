<!-- pages/dashboard/links.vue -->
<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-2" style="color: #0A1F44">Mes Liens de Paiement</h1>
        <p class="text-gray-600">Gérez tous vos liens de paiement</p>
      </div>
      <Button
          @click="navigateToCreateLink"
          class="gap-2 w-full md:w-auto"
          :style="{ backgroundColor: '#2ECC71', color: 'white' }"
      >
        <Link2Icon class="w-4 h-4" />
        Créer un lien
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Link2Icon class="w-5 h-5" style="color: #0A1F44" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total des liens</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ mockLinks.length }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <EyeIcon class="w-5 h-5" style="color: #2ECC71" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total des clics</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ mockLinks.reduce((sum, link) => sum + link.clicks, 0) }}
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <DollarSignIcon class="w-5 h-5" style="color: #F39C12" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total collecté</p>
            <p class="text-xl font-semibold" style="color: #0A1F44">
              {{ mockLinks.reduce((sum, link) => sum + link.totalCollected, 0).toLocaleString() }}€
            </p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
          v-for="link in mockLinks"
          :key="link.id"
          class="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative">
          <ImageWithFallback
              :src="link.image"
              :alt="link.title"
              class="w-full aspect-[4/3] min-h-32 max-h-64 object-cover"
          />
          <div class="absolute top-4 right-4">
            <component :is="getStatusBadge(link.status)" />
          </div>

        </div>

        <div class="p-6 space-y-4">
          <div>
            <h3 class="font-semibold text-lg mb-2" style="color: #0A1F44">
              {{ link.title }}
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ link.description }}
            </p>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center gap-1">
              <EyeIcon class="w-4 h-4" />
              {{ link.clicks }} clics
            </div>
            <div class="flex items-center gap-1">
              <DollarSignIcon class="w-4 h-4" />
              {{ link.totalCollected.toLocaleString() }}€
            </div>
          </div>

          <div class="pt-4 border-t border-gray-100">
            <div class="text-sm text-gray-600 mb-3">
              <p class="mb-1">URL: paylink.pro/{{ link.url }}</p>
              <p v-if="link.amount > 0">
                Montant: {{ link.amount }}{{ link.currency }}
              </p>
              <p v-else>Montant: Libre</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mb-2">
              <Button
                  variant="outline"
                  size="sm"
                  @click="copyToClipboard(link.url)"
                  class="flex-1"
              >
                <CopyIcon class="w-4 h-4 mr-1" />
                Copier
              </Button>

              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1"
              >
                <QrCodeIcon class="w-4 h-4 mr-1" />
                QR Code
              </Button>
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1"
              >
                <EditIcon class="w-4 h-4 mr-1" />
                Modifier
              </Button>

              <Button
                  variant="outline"
                  size="sm"
                  class="flex-1"
              >
                <ExternalLinkIcon class="w-4 h-4 mr-1" />
                Voir
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'
import {
  Link2Icon,
  EyeIcon,
  DollarSignIcon,
  QrCodeIcon,
  CopyIcon,
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  ExternalLinkIcon
} from 'lucide-vue-next'
import Button from "~/components/ui/Button.vue";
import Card from "~/components/ui/Card.vue";
import ImageWithFallback from "~/components/ui/ImageWithFallback.vue";

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()

const navigateToCreateLink = () => {
  router.push('/dashboard/create-link')
}

const mockLinks = [
  {
    id: 1,
    title: 'Formation JavaScript Avancée',
    description: 'Cours complet pour maîtriser JavaScript en 30 jours',
    url: 'formation-js-2024',
    image: 'https://images.unsplash.com/photo-1607609972246-a14762f20d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZGlnaXRhbCUyMGZpbmFuY2UlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3MTcxNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amount: 299,
    currency: 'EUR',
    clicks: 156,
    totalCollected: 4485,
    status: 'active',
    createdAt: '2024-01-15',
    expiresAt: '2024-12-31'
  },
  {
    id: 2,
    title: 'Don pour l\'Association Caritative',
    description: 'Aidez-nous à soutenir les familles dans le besoin',
    url: 'don-association-2024',
    image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwcXIlMjBjb2RlfGVufDF8fHx8MTc1NzA3MzM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amount: 0,
    currency: 'EUR',
    clicks: 89,
    totalCollected: 2340,
    status: 'active',
    createdAt: '2024-02-01',
    expiresAt: null
  },
  {
    id: 3,
    title: 'Ebook Marketing Digital',
    description: 'Guide complet pour développer votre présence en ligne',
    url: 'ebook-marketing-digital',
    image: 'https://images.unsplash.com/photo-1607609972246-a14762f20d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZGlnaXRhbCUyMGZpbmFuY2UlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3MTcxNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amount: 29.99,
    currency: 'EUR',
    clicks: 234,
    totalCollected: 1199.6,
    status: 'active',
    createdAt: '2024-01-20',
    expiresAt: '2024-06-30'
  },
  {
    id: 4,
    title: 'Consultation Business',
    description: 'Séance de conseil personnalisée d\'1 heure',
    url: 'consultation-business',
    image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwcXIlMjBjb2RlfGVufDF8fHx8MTc1NzA3MzM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amount: 150,
    currency: 'EUR',
    clicks: 67,
    totalCollected: 3000,
    status: 'expired',
    createdAt: '2023-12-10',
    expiresAt: '2024-01-10'
  }
]

const getStatusBadge = (status) => {
  switch (status) {
    case 'active':
      return h('span', { class: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700' }, 'Actif')
    case 'expired':
      return h('span', { class: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700' }, 'Expiré')
    default:
      return h('span', { class: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700' }, 'Inconnu')
  }
}

const copyToClipboard = (url) => {
  navigator.clipboard.writeText(`https://paylink.pro/${url}`)
  alert('Lien copié dans le presse-papiers !')
}
</script>