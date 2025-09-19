<!-- components/ui/Input.vue -->
<template>
  <input
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :class="[
      'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent',
      props.class
    ]"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
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