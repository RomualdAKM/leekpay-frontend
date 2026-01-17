<!-- components/ui/Select.vue -->
<template>
  <div ref="selectRef" class="relative">
    <button
        type="button"
        @click="isOpen = !isOpen"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between"
        :class="props.class"
    >
      <span v-if="modelValue">{{ selectedLabel }}</span>
      <span v-else class="text-gray-500">{{ props.placeholder || 'Sélectionnez...' }}</span>
      <ChevronDownIcon class="w-4 h-4 text-gray-500" />
    </button>

    <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
    >
      <div
          v-for="option in props.options"
          :key="option.value"
          @click="selectOption(option.value)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
          :class="{ 'bg-green-50 text-green-700': option.value === modelValue }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from 'lucide-vue-next'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  },
  placeholder: String,
  class: String
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectRef = ref(null)

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

const selectOption = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (!selectRef.value) return
  if (!selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
