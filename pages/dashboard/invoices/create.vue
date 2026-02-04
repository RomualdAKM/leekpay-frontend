<template>
  <InvoiceEditor />
</template>

<script setup>
import InvoiceEditor from '~/components/invoices/InvoiceEditor.vue'

definePageMeta({ layout: 'dashboard' })

// Forcer le viewport desktop pour la création de factures
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=1024, initial-scale=0.5, maximum-scale=2.0, user-scalable=yes'
    }
  ]
})
</script>
