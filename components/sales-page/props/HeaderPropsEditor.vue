<template>
  <div class="space-y-4">
    <TemplatePicker
      block-type="header"
      :model-value="localProps.templateId"
      @select="localProps.templateId = $event; emitUpdate()"
    />
    
    <div class="border-t border-gray-200 pt-4">
      <label class="block text-xs text-gray-500 mb-1">URL du logo</label>
      <input v-model="localProps.logoUrl" @input="emitUpdate" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://..." />
    </div>
    <div>
      <label class="block text-xs text-gray-500 mb-1">Couleur de fond</label>
      <div class="flex items-center space-x-2">
        <input v-model="localProps.backgroundColor" @input="emitUpdate" type="color" class="w-10 h-10 rounded-lg cursor-pointer border-0" />
        <input v-model="localProps.backgroundColor" @input="emitUpdate" type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <input v-model="localProps.sticky" @change="emitUpdate" type="checkbox" class="rounded" />
      <label class="text-xs text-gray-500">Header fixe</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import TemplatePicker from './TemplatePicker.vue'

const props = defineProps<{ props: Record<string, any> }>()
const emit = defineEmits(['update'])
const localProps = reactive({ ...props.props })
watch(() => props.props, (newVal) => { Object.assign(localProps, newVal) }, { deep: true })
const emitUpdate = () => { emit('update', { ...localProps }) }
</script>
