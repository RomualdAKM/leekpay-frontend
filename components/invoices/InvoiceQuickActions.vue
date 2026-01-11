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
    <div class="grid grid-cols-2 gap-2">
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
        {{ sending ? 'Envoi...' : 'Envoyer' }}
      </button>
      <button
        class="w-full border border-gray-300 rounded-md py-2 text-xs font-semibold text-gray-700"
        :disabled="!invoiceId || markingPaid"
        @click="emit('mark-paid')"
      >
        {{ markingPaid ? 'Maj...' : 'Marquer payee' }}
      </button>
      <button
        class="w-full border border-gray-300 rounded-md py-2 text-xs font-semibold text-gray-700"
        :disabled="!invoiceId || pdfLoading"
        @click="emit('preview-pdf')"
      >
        {{ pdfLoading ? 'PDF...' : 'Apercu PDF' }}
      </button>
    </div>
    <div v-if="publicUrl" class="flex items-center gap-2">
      <input
        :value="publicUrl"
        readonly
        class="flex-1 border border-gray-200 rounded-md px-2 py-1 text-[10px] bg-gray-50"
      />
      <button class="px-2 py-1 text-[10px] border border-gray-200 rounded-md" @click="emit('copy-link')">
        Copier
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
  publicUrl: String,
  lastSavedAt: String,
  saving: Boolean,
  sending: Boolean,
  markingPaid: Boolean,
  pdfLoading: Boolean,
  autoSave: Boolean
})

const emit = defineEmits(['save', 'send', 'mark-paid', 'preview-pdf', 'copy-link'])

const statusLabel = computed(() => props.status || 'Brouillon')

const statusClass = computed(() => {
  if (props.status === 'paid') return 'bg-green-50 text-green-700'
  if (props.status === 'sent') return 'bg-blue-50 text-blue-700'
  if (props.status === 'overdue') return 'bg-red-50 text-red-700'
  return 'bg-gray-100 text-gray-600'
})
</script>
