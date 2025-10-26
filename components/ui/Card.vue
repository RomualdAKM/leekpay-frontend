<!-- components/ui/Card.vue -->
<template>
  <div
      class="bg-white rounded-sm "
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