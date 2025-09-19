<!-- components/ui/TabsTrigger.vue -->
<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: String,
  class: String
})

const model = inject('tabsModel', null)

const isActive = computed(() => model && model.value === props.value)

const classes = computed(() => [
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-1 text-sm font-medium whitespace-nowrap border border-transparent transition-[color,box-shadow] h-[calc(100%-1px)]',
  'disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:outline-1 focus-visible:ring-ring/50 focus-visible:outline-ring',
  'data-[state=active]:bg-card data-[state=active]:text-foreground dark:data-[state=active]:text-foreground dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input',
  // NOTE: on met des double-quotes à l'intérieur d'une string JS entourée par des '
  '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  props.class || ''
])

function onClick() {
  if (model) model.value = props.value
}
</script>

<template>
  <button
      type="button"
      data-slot="tabs-trigger"
      @click="onClick"
      :data-state="isActive ? 'active' : 'inactive'"
      :class="classes"
  >
    <slot />
  </button>
</template>
