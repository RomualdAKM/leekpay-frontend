<!-- components/ui/Tabs.vue -->
<script setup lang="ts">
import { ref, provide, inject } from 'vue'

const props = defineProps<{
  defaultValue?: string
  class?: string
}>()

const model = ref(props.defaultValue || '')
provide('tabsModel', model)
</script>

<template>
  <div
      data-slot="tabs"
      :class="['flex flex-col gap-2', props.class]"
  >
    <slot />
  </div>
</template>