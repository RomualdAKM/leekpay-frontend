<!-- components/ui/TabsTrigger.vue -->
<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps({
  value: String,
  class: String
})

const model = inject('tabsModel', null)

const isActive = computed(() => model && model.value === props.value)

const classes = computed(() => [
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer',
  'border-transparent text-gray-700 hover:text-gray-900',
  'data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-700',
  props.class || ''
])

function onClick() {
  if (model) model.value = props.value
}
</script>

<template>
  <button
      type="button"
      data-slot="tabs-trigger"
      @click="onClick"
      :data-state="isActive ? 'active' : 'inactive'"
      :class="classes"
  >
    <slot />
  </button>
</template>