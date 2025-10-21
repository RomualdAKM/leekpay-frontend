<!-- components/ui/TabsList.vue -->
<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps({
  class: String
})

const model = inject('tabsModel', null)
</script>

<template>
  <div
      data-slot="tabs-list"
      :class="[
        'flex w-full border-b border-gray-200 overflow-x-auto whitespace-nowrap hide-scrollbar',
        props.class || ''
      ]"
  >
    <slot />
  </div>
</template>