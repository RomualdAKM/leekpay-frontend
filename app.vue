<script setup>
import { Analytics } from '@vercel/analytics/nuxt';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - LeekPay` : 'LeekPay - Liens de paiement simplifiés';
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Analytics />
  </div>
</template>
