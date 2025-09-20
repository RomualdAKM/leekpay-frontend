<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style="color: #0A1F44">Tableau de Bord</h1>
      <p class="text-gray-600 text-sm sm:text-base">Aperçu de vos performances</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
          title="Total des clics"
          value="2,847"
          trend="+12.5% ce mois"
          trendColor="green"
          :icon="EyeIcon"
          color="#2ECC71"
          iconBgColor="green"
      />
      <StatCard
          title="Revenus totaux"
          value="14,235€"
          trend="+18.2% ce mois"
          trendColor="orange"
          :icon="DollarSignIcon"
          color="#F39C12"
          iconBgColor="orange"
      />
      <StatCard
          title="Liens actifs"
          value="23"
          trend="+3 nouveaux"
          trendColor="blue"
          :icon="Link2Icon"
          color="#0A1F44"
          iconBgColor="blue"
      />
      <StatCard
          title="Taux de conversion"
          value="4.8%"
          trend="+0.5% ce mois"
          trendColor="purple"
          :icon="TrendingUpIcon"
          color="#8E44AD"
          iconBgColor="purple"
      />
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card class="p-4 sm:p-6">
        <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style="color: #0A1F44">Évolution des clics</h3>
        <div class="bg-gray-100 h-56 sm:h-64 md:h-72 rounded-lg flex items-center justify-center">
          <p class="text-gray-500 text-sm sm:text-base">Graphique en attente de données</p>
        </div>
      </Card>

      <Card class="p-4 sm:p-6">
        <h3 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style="color: #0A1F44">Revenus mensuels</h3>
        <div class="bg-gray-100 h-56 sm:h-64 md:h-72 rounded-lg flex items-center justify-center">
          <p class="text-gray-500 text-sm sm:text-base">Graphique en attente de données</p>
        </div>
      </Card>
    </div>

    <!-- Recent Links -->
    <Card class="p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 class="text-lg sm:text-xl font-semibold" style="color: #0A1F44">Liens les plus performants</h3>
        <a href="#" class="text-xs sm:text-sm hover:underline" style="color: #2ECC71">Voir tout</a>
      </div>
      <div class="space-y-3 sm:space-y-4">
        <div
            v-for="(link, index) in recentLinks"
            :key="index"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0"
        >
          <div class="flex items-start sm:items-center gap-3 sm:gap-4">
            <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Link2Icon class="w-4 sm:w-5 h-4 sm:h-5" style="color: #2ECC71" />
            </div>
            <div>
              <h4 class="font-medium text-sm sm:text-base" style="color: #0A1F44">{{ link.title }}</h4>
              <p class="text-xs sm:text-sm text-gray-500">{{ link.clics }} clics • {{ link.revenus }}€ générés</p>
            </div>
          </div>
          <span class="px-2.5 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full whitespace-nowrap self-start sm:self-auto">
            Actif
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

import {
  EyeIcon,
  DollarSignIcon,
  Link2Icon,
  TrendingUpIcon
} from 'lucide-vue-next'

import Card from '~/components/ui/Card.vue'
import StatCard from '~/components/ui/StatCard.vue'

const recentLinks = [
  { title: 'Formation JavaScript', clics: 156, revenus: 780, status: 'active' },
  { title: 'Don pour l\'association', clics: 89, revenus: 445, status: 'active' },
  { title: 'Vente ebook Marketing', clics: 234, revenus: 1170, status: 'active' }
]
</script>