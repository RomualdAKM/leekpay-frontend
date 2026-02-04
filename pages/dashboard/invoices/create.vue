<template>
  <InvoiceEditor />
</template>

<script setup>
import InvoiceEditor from '~/components/invoices/InvoiceEditor.vue'

definePageMeta({ 
  layout: 'dashboard',
  pageTransition: false // Désactiver transition pour éviter conflits viewport
})

// Forcer le viewport desktop pour la création de factures
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=1024, initial-scale=0.5, maximum-scale=2.0, user-scalable=yes'
    }
  ]
})

// Indiquer au layout qu'on est en mode desktop forcé
provide('forceDesktopMode', true)
</script>
