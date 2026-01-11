<template>
  <Card class="p-4 sm:p-5 space-y-3">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-900">Sections</p>
        <p class="text-xs text-gray-500">Reordonnez et masquez des blocs.</p>
      </div>
    </div>
    <div class="space-y-2">
      <div
        v-for="sectionId in orderedSections"
        :key="sectionId"
        class="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm cursor-grab active:cursor-grabbing"
        :class="{
          'ring-2 ring-blue-200': dragOverId === sectionId,
          'opacity-70': draggingId === sectionId
        }"
        draggable="true"
        @dragstart="onDragStart($event, sectionId)"
        @dragover.prevent="onDragOver(sectionId)"
        @drop.prevent="onDrop(sectionId)"
        @dragend="onDragEnd"
      >
        <div class="flex items-center gap-3">
          <GripVertical class="w-4 h-4 text-gray-400" />
          <component :is="getIcon(sectionId)" class="w-4 h-4 text-gray-600" />
          <span class="text-sm text-gray-800">{{ getLabel(sectionId) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            title="Monter"
            @click="emit('move', { id: sectionId, direction: -1 })"
          >
            <ChevronUp class="w-4 h-4" />
          </button>
          <button
            class="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            title="Descendre"
            @click="emit('move', { id: sectionId, direction: 1 })"
          >
            <ChevronDown class="w-4 h-4" />
          </button>
          <button
            class="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            :title="visibility?.[sectionId] ? 'Masquer' : 'Afficher'"
            @click="emit('toggle', sectionId)"
          >
            <Eye v-if="visibility?.[sectionId]" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { GripVertical, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-vue-next'
import Card from '~/components/ui/Card.vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  },
  order: {
    type: Array,
    required: true
  },
  visibility: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['move', 'toggle', 'reorder'])

const draggingId = ref(null)
const dragOverId = ref(null)

const orderedSections = computed(() => props.order.filter((id) => props.sections.some((section) => section.id === id)))

const getLabel = (id) => props.sections.find((section) => section.id === id)?.label || id
const getIcon = (id) => props.sections.find((section) => section.id === id)?.icon || 'div'

const onDragStart = (event, sectionId) => {
  draggingId.value = sectionId
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', sectionId)
  }
}

const onDragOver = (sectionId) => {
  dragOverId.value = sectionId
}

const onDrop = (sectionId) => {
  if (!draggingId.value || draggingId.value === sectionId) {
    dragOverId.value = null
    return
  }
  emit('reorder', { from: draggingId.value, to: sectionId })
  dragOverId.value = null
}

const onDragEnd = () => {
  draggingId.value = null
  dragOverId.value = null
}
</script>
