<template>
  <ClientOnly>
    <SalesPageBuilder />
    <template #fallback>
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement du builder...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import SalesPageBuilder from '~/components/sales-page/SalesPageBuilder.vue'

// definePageMeta({ layout: 'dashboard' })
</script>
