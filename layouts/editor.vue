<template>
  <div class="h-screen w-screen overflow-hidden bg-gray-100">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { requireAuth } = useAuth()
requireAuth()

// Forcer le viewport desktop pour l'éditeur de pages de vente
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=1024, initial-scale=0.5, maximum-scale=2.0, user-scalable=yes'
    }
  ]
})
</script>

<style scoped>
/* Reset pour plein écran */
:deep(body) {
  overflow: hidden;
}
</style>
