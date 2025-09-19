<!-- components/ui/Card.vue -->
<template>
  <div
      class="bg-white rounded-xl shadow-sm border border-gray-200"
      :class="props.class"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
</script>