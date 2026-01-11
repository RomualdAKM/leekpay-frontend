<template>
  <div class="bg-[#f6f7f9] rounded-2xl border border-gray-100 p-4 sm:p-6">
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 lg:gap-8">
      <div class="space-y-6 lg:max-h-[calc(100vh-170px)] lg:overflow-y-auto lg:pr-2">
        <slot name="left" />
      </div>
      <div class="lg:sticky lg:top-6 self-start">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
