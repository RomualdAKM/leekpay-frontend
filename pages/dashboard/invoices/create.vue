<template>
  <InvoiceEditor />
</template>

<script setup>
import InvoiceEditor from '~/components/invoices/InvoiceEditor.vue'

definePageMeta({ 
  layout: 'editor',
  pageTransition: false // Désactiver transition pour éviter conflits viewport
})

// Indiquer au layout editor qu'on force le mode desktop
provide('forceDesktopMode', true)
</script>
