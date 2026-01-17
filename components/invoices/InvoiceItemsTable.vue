<template>
  <Card class="p-4 sm:p-5 space-y-3">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-900">Articles</p>
        <p class="text-xs text-gray-500">Lignes de facturation modifiables.</p>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-50 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left font-semibold border-l border-gray-200 first:border-l-0">Description</th>
            <th class="px-3 py-2 text-left font-semibold border-l border-gray-200">Qte</th>
            <th class="px-3 py-2 text-left font-semibold border-l border-gray-200">Unite</th>
            <th class="px-3 py-2 text-left font-semibold border-l border-gray-200">PU</th>
            <th class="px-3 py-2 text-left font-semibold border-l border-gray-200">TVA %</th>
            <th class="px-3 py-2 text-right font-semibold border-l border-gray-200">Total</th>
            <th class="px-3 py-2 text-right font-semibold border-l border-gray-200"></th>
          </tr>
        </thead>
        <TransitionGroup name="row" tag="tbody" class="divide-y divide-gray-100">
          <tr
            v-for="item in items"
            :key="item.id"
            class="cursor-grab active:cursor-grabbing"
            :class="{
              'bg-blue-50/40': dragOverId === item.id,
              'opacity-70': draggingId === item.id
            }"
            draggable="true"
            @dragstart="onDragStart($event, item.id)"
            @dragover.prevent="onDragOver(item.id)"
            @drop.prevent="onDrop(item.id)"
            @dragend="onDragEnd"
          >
            <td class="px-3 py-2 border-l border-gray-200 first:border-l-0">
              <div class="flex items-center gap-2">
                <GripVertical class="w-3.5 h-3.5 text-gray-400" />
                <Input v-model="item.description" class="text-xs py-2" placeholder="Prestation" />
              </div>
            </td>
            <td class="px-3 py-2 border-l border-gray-200">
              <Input v-model="item.quantity" type="number" class="text-xs py-2 w-20" />
            </td>
            <td class="px-3 py-2 border-l border-gray-200">
              <Input v-model="item.unit" class="text-xs py-2 w-20" />
            </td>
            <td class="px-3 py-2 border-l border-gray-200">
              <Input v-model="item.unitPrice" type="number" class="text-xs py-2 w-24" />
            </td>
            <td class="px-3 py-2 border-l border-gray-200">
              <Input v-model="item.taxRate" type="number" class="text-xs py-2 w-20" />
            </td>
            <td class="px-3 py-2 text-right font-medium text-gray-900 border-l border-gray-200">
              {{ formatAmount(lineTotal(item)) }} {{ currency }}
            </td>
            <td class="px-3 py-2 text-right border-l border-gray-200">
              <button
                class="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                title="Supprimer"
                @click="emit('remove', item.id)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
    <div>
      <Button variant="outline" class="text-sm py-2" @click="emit('add')">
        + Ajouter une ligne
      </Button>
    </div>
  </Card>
</template>

<script setup>
import { Trash2, GripVertical } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import Input from '~/components/ui/Input.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  currency: {
    type: String,
    default: 'EUR'
  }
})

const emit = defineEmits(['add', 'remove', 'reorder'])

const draggingId = ref(null)
const dragOverId = ref(null)

const lineTotal = (item) => {
  const quantity = Number(item.quantity || 0)
  const unitPrice = Number(item.unitPrice || 0)
  const taxRate = Number(item.taxRate || 0)
  const subtotal = quantity * unitPrice
  return subtotal + subtotal * (taxRate / 100)
}

const formatAmount = (value) => {
  const numberValue = Number(value || 0)
  return numberValue.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const onDragStart = (event, itemId) => {
  draggingId.value = itemId
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', itemId)
  }
}

const onDragOver = (itemId) => {
  dragOverId.value = itemId
}

const onDrop = (itemId) => {
  if (!draggingId.value || draggingId.value === itemId) {
    dragOverId.value = null
    return
  }
  emit('reorder', { from: draggingId.value, to: itemId })
  dragOverId.value = null
}

const onDragEnd = () => {
  draggingId.value = null
  dragOverId.value = null
}
</script>

<style scoped>
.row-enter-active,
.row-leave-active {
  transition: all 0.2s ease;
}

.row-enter-from,
.row-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
