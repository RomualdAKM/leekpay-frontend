<!-- components/ui/Badge.vue -->
<template>
  <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      :class="props.class"
  >
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
</script>