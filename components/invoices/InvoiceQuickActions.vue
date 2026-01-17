<template>
  <Card class="p-4 space-y-3">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-900">Facture {{ number || 'Nouveau' }}</p>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px]" :class="statusClass">
            {{ statusLabel }}
          </span>
          <span v-if="lastSavedAt">Sauvegarde: {{ lastSavedAt }}</span>
          <span v-else>Non sauvegardee</span>
        </div>
      </div>
      <div v-if="autoSave" class="text-[10px] text-green-600">Auto-save ON</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        class="w-full bg-green-600 text-white rounded-md py-2 text-xs font-semibold"
        :disabled="saving"
        @click="emit('save')"
      >
        {{ saving ? 'Sauvegarde...' : 'Sauvegarder' }}
      </button>
      <button
        class="w-full border border-gray-300 rounded-md py-2 text-xs font-semibold text-gray-700"
        :disabled="!invoiceId || sending"
        @click="emit('send')"
      >
        <span>{{ sending ? 'Envoi...' : 'Envoyer' }}</span>
        <span class="ml-2 inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">PRO</span>
      </button>
      <button
        class="w-full border border-gray-300 rounded-md py-2 text-xs font-semibold text-gray-700 sm:col-span-2 flex items-center justify-center"
        :disabled="!invoiceId || pdfLoading"
        @click="emit('preview-pdf')"
      >
        <span>{{ pdfLoading ? 'PDF...' : 'Apercu PDF' }}</span>
        <span class="ml-2 inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">PRO</span>
      </button>
    </div>
  </Card>
</template>

<script setup>
import Card from '~/components/ui/Card.vue'

const props = defineProps({
  number: String,
  status: String,
  invoiceId: [String, Number],
  lastSavedAt: String,
  saving: Boolean,
  sending: Boolean,
  pdfLoading: Boolean,
  autoSave: Boolean
})

const emit = defineEmits(['save', 'send', 'preview-pdf'])

const statusLabel = computed(() => props.status || 'Brouillon')

const statusClass = computed(() => {
  if (props.status === 'paid') return 'bg-green-50 text-green-700'
  if (props.status === 'sent') return 'bg-blue-50 text-blue-700'
  if (props.status === 'overdue') return 'bg-red-50 text-red-700'
  return 'bg-gray-100 text-gray-600'
})
</script>
