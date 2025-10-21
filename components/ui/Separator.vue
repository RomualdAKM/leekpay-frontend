<!-- components/ui/Separator.vue -->
<template>
  <div
      :class="[
        'shrink-0 bg-gray-200',
        props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full'
      ]"
      :style="props.style"
  />
</template>

<script setup>
const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (val) => ['horizontal', 'vertical'].includes(val)
  },
  style: {
    type: Object,
    default: () => ({})
  }
})
</script>