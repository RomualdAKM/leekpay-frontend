<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: String,
  class: String
})

const model = inject('tabsModel', null)

const isActive = computed(() => model && model.value === props.value)
</script>

<template>
  <div
      v-show="isActive"
      data-slot="tabs-content"
      :class="['flex-1 outline-none', props.class || '']"
  >
    <slot />
  </div>
</template>
