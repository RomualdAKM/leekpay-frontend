<template>
  <div class="h-screen w-screen overflow-hidden bg-gray-100">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { requireAuth } = useAuth()
requireAuth()
</script>

<style scoped>
/* Reset pour plein écran */
:deep(body) {
  overflow: hidden;
}
</style>
