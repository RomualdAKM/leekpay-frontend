<template>
  <InvoiceEditor :invoice-id="route.params.id" />
</template>

<script setup>
import InvoiceEditor from '~/components/invoices/InvoiceEditor.vue'

definePageMeta({ 
  layout: 'editor',
  pageTransition: false
})

provide('forceDesktopMode', true)

const route = useRoute()
</script>
