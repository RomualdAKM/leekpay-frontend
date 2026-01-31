<template>
  <div class="min-h-screen" :style="pageStyles">
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
    <div v-else-if="error" class="min-h-screen flex items-center justify-center p-4">
      <p class="text-gray-500">Erreur de chargement</p>
    </div>
    <div v-else>
      <!-- Rendu des sections (Phase 3) -->
      <template v-if="pageData?.sections && pageData.sections.length > 0">
        <SalesPageSalesSection
          v-for="section in pageData.sections"
          :key="section.id"
          :section="section"
          :is-edit-mode="false"
          :preview-mode="true"
          :is-selected="false"
          :selected-column-id="null"
          :checkout-url="checkoutUrl"
        />
      </template>

      <!-- Rendu des blocs (Legacy) -->
      <template v-else>
        <SalesPageSalesBlockRenderer
          v-for="block in sortedBlocks"
          :key="block.id"
          :block="block"
          :checkout-url="checkoutUrl"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: false })

const route = useRoute()
const config = useRuntimeConfig()
const { token } = useAuth()

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref(false)

const sortedBlocks = computed(() => {
  if (!pageData.value?.blocks) return []
  return [...pageData.value.blocks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})

const pageStyles = computed(() => {
  const theme = pageData.value?.theme || {}
  return {
    fontFamily: theme.fontFamily ? `'${theme.fontFamily}', sans-serif` : 'inherit',
    '--primary-color': theme.primaryColor || '#10B981',
  }
})

const checkoutUrl = computed(() => {
  if (!pageData.value?.payment_link_id) return ''
  return pageData.value.checkout_url || ''
})

onMounted(async () => {
  try {
    const response = await $fetch<{ data: any }>(`/sales-pages/${route.params.id}`, {
      baseURL: config.public.apiBaseURL,
      headers: { Authorization: `Bearer ${token.value}` },
    })
    pageData.value = response.data
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style>
html, body { margin: 0; padding: 0; }
</style>
