<!-- components/ui/ImageWithFallback.vue -->
<template>
  <img
      :src="src"
      :alt="alt"
      :class="props.class"
      @error="handleError"
      :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
  />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: ''
  }
})

const handleError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible'
}
</script>