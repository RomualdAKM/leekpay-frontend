<!-- components/ui/StatCard.vue -->
<template>
  <Card class="p-6 border-l-4" :style="{ borderLeftColor: color }">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm">{{ title }}</p>
        <p class="text-2xl font-semibold mt-1" style="color: #0A1F44">{{ value }}</p>
        <p class="text-sm" :class="`flex items-center mt-2 text-${trendColor}-600`">
          <component :is="ArrowUpRightIcon" class="w-4 h-4 mr-1" />
          {{ trend }}
        </p>
      </div>
      <div
          class="w-12 h-12 rounded-full flex items-center justify-center"
          :class="`bg-${iconBgColor}-100`"
      >
        <component :is="icon" class="w-6 h-6" :style="{ color }" />
      </div>
    </div>
  </Card>
</template>

<script setup>
import {ArrowUpRight, ArrowUpRightIcon} from 'lucide-vue-next'
import Card from "~/components/ui/Card.vue";

const props = defineProps({
  title: String,
  value: String,
  trend: String,
  trendColor: String,
  icon: Object,
  color: String,
  iconBgColor: String
})
</script>