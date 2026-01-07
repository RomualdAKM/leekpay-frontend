<template>
  <div>
    <ClientOnly>
      <SalesPageBuilder :edit-template-id="templateId" />
      <template #fallback>
        <div class="min-h-screen flex items-center justify-center">
          <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"/>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })

const route = useRoute()
const templateId = computed(() => Number(route.params.id))
</script>
