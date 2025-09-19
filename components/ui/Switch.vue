<!-- components/ui/Switch.vue -->
<template>
  <button
      :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
      props.checked ? 'bg-green-500' : 'bg-gray-300'
    ]"
      @click="toggle"
  >
    <span
        :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        props.checked ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:checked'])

const toggle = () => {
  emit('update:checked', !props.checked)
}
</script>