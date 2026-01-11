<template>
  <InvoiceEditor :invoice-id="route.params.id" />
</template>

<script setup>
import InvoiceEditor from '~/components/invoices/InvoiceEditor.vue'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
</script>
