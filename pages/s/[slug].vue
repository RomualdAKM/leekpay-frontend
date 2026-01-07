<template>
  <div 
    class="min-h-screen"
    :style="pageStyles"
  >
    <!-- Loading -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
    
    <!-- Erreur 404 -->
    <div v-else-if="error" class="min-h-screen flex flex-col items-center justify-center px-4">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Page non trouvée</h1>
      <p class="text-gray-500 mb-6 text-center">Cette page de vente n'existe pas ou n'est pas publiée.</p>
      <NuxtLink 
        to="/" 
        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
      >
        Retour à l'accueil
      </NuxtLink>
    </div>
    
    <!-- Contenu de la page -->
    <div v-else>
      <!-- SEO Meta -->
      <Head>
        <Title>{{ pageData?.meta_title || pageData?.title }}</Title>
        <Meta name="description" :content="pageData?.meta_description || ''" />
        <Meta property="og:title" :content="pageData?.meta_title || pageData?.title" />
        <Meta property="og:description" :content="pageData?.meta_description || ''" />
        <Link v-if="pageData?.favicon_url" rel="icon" :href="pageData.favicon_url" />
      </Head>
      
      <!-- Rendu des blocs -->
      <SalesPageSalesBlockRenderer
        v-for="block in sortedBlocks"
        :key="block.id"
        :block="block"
        :checkout-url="checkoutUrl"
      />
      
      <!-- Branding LeekPay (si activé) -->
      <div 
        v-if="pageData?.settings?.showBranding"
        class="fixed bottom-4 right-4 z-50"
      >
        <a 
          href="https://leekpay.me" 
          target="_blank" 
          rel="noopener"
          class="flex items-center px-3 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg text-sm text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <span class="mr-1">Propulsé par</span>
          <span class="font-semibold text-emerald-600">LeekPay</span>
        </a>
      </div>
    </div>
    
    <!-- Custom CSS -->
    <component 
      v-if="pageData?.settings?.customCss" 
      :is="'style'" 
      v-html="pageData.settings.customCss" 
    />
    
    <!-- Tracking Code -->
    <div v-if="pageData?.settings?.trackingCode" v-html="pageData.settings.trackingCode" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: false
})

const route = useRoute()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiBaseURL || 'https://leekpay.fr/api'

const slug = computed(() => route.params.slug as string)

const pageData = ref<any>(null)
const loading = ref(true)
const error = ref(false)

const sortedBlocks = computed(() => {
  if (!pageData.value?.blocks) return []
  return [...pageData.value.blocks].sort((a, b) => a.order - b.order)
})

const checkoutUrl = computed(() => {
  return pageData.value?.payment_link?.checkout_url || ''
})

const pageStyles = computed(() => {
  const theme = pageData.value?.theme || {}
  return {
    backgroundColor: theme.backgroundColor || '#ffffff',
    color: theme.textColor || '#1f2937',
    fontFamily: theme.fontFamily ? `${theme.fontFamily}, sans-serif` : 'Poppins, sans-serif',
    '--primary-color': theme.primaryColor || '#10B981',
    '--secondary-color': theme.secondaryColor || '#3B82F6',
  }
})

const fetchPageData = async () => {
  loading.value = true
  error.value = false
  
  try {
    const response = await $fetch<{ success: boolean; data: any }>(
      `${apiBaseUrl}/public/sales-page/${slug.value}`
    )
    
    if (response.success) {
      pageData.value = response.data
    } else {
      error.value = true
    }
  } catch (err) {
    console.error('Erreur chargement page:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchPageData)
</script>

<style>
/* Importer Google Fonts pour les polices personnalisées */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');

/* Reset des liens */
a {
  text-decoration: none;
}

/* Scroll smooth */
html {
  scroll-behavior: smooth;
}

/* Styles de prose pour le contenu texte */
.prose {
  max-width: 65ch;
}

.prose p {
  margin-bottom: 1em;
}

.prose h1, .prose h2, .prose h3 {
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose ul, .prose ol {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.prose li {
  margin-bottom: 0.25em;
}

.prose-invert {
  color: #ffffff;
}

.prose-invert p, .prose-invert li {
  color: rgba(255, 255, 255, 0.9);
}
</style>
