<!-- components/ui/Textarea.vue -->
<template>
  <textarea
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :required="props.required"
      :class="[
      'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent',
      props.class
    ]"
  ></textarea>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  },
  required: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>