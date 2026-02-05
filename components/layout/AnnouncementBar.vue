<template>
  <div
    v-if="announcement?.enabled"
    class="w-full fixed top-0 z-50 px-4"
    :style="barStyles"
  >
    <div class="w-full h-full flex items-center justify-center">
    <NuxtLink
      v-if="announcement.link"
      :to="announcement.link"
      class="text-center font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
      :style="{ color: announcement.textColor }"
    >
      {{ announcement.text }}
    </NuxtLink>
    <span
      v-else
      class="text-center font-medium text-sm md:text-base"
      :style="{ color: announcement.textColor }"
    >
      {{ announcement.text }}
    </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePagesStore } from '~/stores/pagesStore'

const pagesStore = usePagesStore()

const announcement = computed(() => pagesStore.announcement)

const barStyles = computed(() => ({
  height: 'var(--announcement-height)',
  backgroundColor: announcement.value?.backgroundColor || '#750021'
}))
</script>
