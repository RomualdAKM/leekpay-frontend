<template>
  <div class="inline-flex rounded-md border border-gray-300 overflow-hidden text-xs">
    <button
      type="button"
      class="px-3 py-1.5 font-medium"
      :class="modelValue ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-white'"
      @click="emit('update:modelValue', false)"
    >
      Non
    </button>
    <button
      type="button"
      class="px-3 py-1.5 font-medium"
      :class="modelValue ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500'"
      @click="emit('update:modelValue', true)"
    >
      Oui
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>
