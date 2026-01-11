<template>
  <div class="space-y-4">
    <Card class="p-0 overflow-hidden">
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-left"
        @click="toggleSection('issuer')"
      >
        <span class="text-sm font-semibold text-gray-900">Emetteur</span>
        <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': openSections.issuer }" />
      </button>
      <div v-if="openSections.issuer" class="px-4 pb-4 space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Nom / Societe</Label>
            <Input v-model="invoice.issuer.name" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Email</Label>
            <Input v-model="invoice.issuer.email" type="email" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Telephone</Label>
            <Input v-model="invoice.issuer.phone" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">TVA</Label>
            <Input v-model="invoice.issuer.taxId" class="text-sm py-2" />
          </div>
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Adresse</Label>
          <Textarea v-model="invoice.issuer.address" rows="3" class="text-sm" />
        </div>
        <div class="flex items-center gap-4">
          <div class="h-16 w-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img v-if="invoice.issuer.logo" :src="invoice.issuer.logo" alt="Logo" class="h-full w-full object-contain" />
            <span v-else class="text-[10px] text-gray-400">Logo</span>
          </div>
          <div>
            <Button variant="outline" class="text-xs py-2" @click="triggerLogoUpload">
              Telecharger un logo
            </Button>
            <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
          </div>
        </div>
      </div>
    </Card>

    <Card class="p-0 overflow-hidden">
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-left"
        @click="toggleSection('client')"
      >
        <span class="text-sm font-semibold text-gray-900">Client</span>
        <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': openSections.client }" />
      </button>
      <div v-if="openSections.client" class="px-4 pb-4 space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Nom / Societe</Label>
            <Input v-model="invoice.client.name" class="text-sm py-2" />
          </div>
          <div class="space-y-2">
            <Label class="text-xs text-gray-500">Email</Label>
            <Input v-model="invoice.client.email" type="email" class="text-sm py-2" />
          </div>
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Adresse</Label>
          <Textarea v-model="invoice.client.address" rows="3" class="text-sm" />
        </div>
      </div>
    </Card>

    <Card class="p-0 overflow-hidden">
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-left"
        @click="toggleSection('invoice')"
      >
        <span class="text-sm font-semibold text-gray-900">Facture</span>
        <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': openSections.invoice }" />
      </button>
      <div v-if="openSections.invoice" class="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Numero</Label>
          <Input v-model="invoice.number" class="text-sm py-2" />
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Devise</Label>
          <Select v-model="invoice.currency" :options="currencyOptions" />
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Date</Label>
          <Input v-model="invoice.issueDate" type="date" class="text-sm py-2" />
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Echeance</Label>
          <Input v-model="invoice.dueDate" type="date" class="text-sm py-2" />
        </div>
      </div>
    </Card>

    <InvoiceItemsTable
      :items="invoice.items"
      :currency="invoice.currency"
      @add="emit('add-item')"
      @remove="emit('remove-item', $event)"
      @reorder="emit('reorder-item', $event)"
    />

    <Card class="p-0 overflow-hidden">
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-left"
        @click="toggleSection('notes')"
      >
        <span class="text-sm font-semibold text-gray-900">Notes / Conditions</span>
        <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': openSections.notes }" />
      </button>
      <div v-if="openSections.notes" class="px-4 pb-4 space-y-3">
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Notes</Label>
          <Textarea v-model="invoice.notes" rows="3" class="text-sm" />
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Conditions</Label>
          <Textarea v-model="invoice.terms" rows="3" class="text-sm" />
        </div>
        <div class="space-y-2">
          <Label class="text-xs text-gray-500">Paiement</Label>
          <Textarea v-model="invoice.paymentInstructions" rows="2" class="text-sm" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Select from '~/components/ui/Select.vue'
import Textarea from '~/components/ui/Textarea.vue'
import InvoiceItemsTable from '~/components/invoices/InvoiceItemsTable.vue'

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-item', 'remove-item', 'reorder-item'])

const logoInput = ref(null)

const openSections = reactive({
  issuer: true,
  client: true,
  invoice: true,
  notes: true
})

const currencyOptions = [
  { label: 'EUR', value: 'EUR' },
  { label: 'XOF', value: 'XOF' },
  { label: 'USD', value: 'USD' },
  { label: 'MAD', value: 'MAD' }
]

const invoice = props.invoice

const toggleSection = (key) => {
  openSections[key] = !openSections[key]
}

const triggerLogoUpload = () => {
  if (logoInput.value) logoInput.value.click()
}

const onLogoChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    invoice.issuer.logo = e.target?.result
  }
  reader.readAsDataURL(file)
}
</script>
