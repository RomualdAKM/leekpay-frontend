<!-- components/ui/Button.vue -->
<template>
  <button
      :class="[
      'px-4 py-2 rounded-lg font-medium transition-colors',
      props.variant === 'outline'
        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
        : 'bg-green-500 text-white hover:bg-green-600',
      props.class
    ]"
      :style="props.style"
      @click="props.onClick"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  style: {
    type: Object,
    default: () => ({})
  },
  onClick: {
    type: Function,
    default: () => {}
  },
  class: {
    type: String,
    default: ''
  }
})
</script>