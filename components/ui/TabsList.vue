<script setup>
const props = defineProps({
  class: String
})
</script>

<template>
  <div
      data-slot="tabs-list"
      :class="[
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex',
      props.class || ''
    ]"
  >
    <slot />
  </div>
</template>
