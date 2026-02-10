<template>
  <div
    v-if="config.announcement.enabled"
    class="w-full fixed top-0 z-50 px-4"
    :style="barStyles"
  >
    <div class="w-full h-full flex items-center justify-center">
    <NuxtLink
      v-if="config.announcement.link"
      :to="config.announcement.link"
      class="text-center font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
      :style="{ color: config.announcement.textColor }"
    >
      {{ config.announcement.text }}
    </NuxtLink>
    <span
      v-else
      class="text-center font-medium text-sm md:text-base"
      :style="{ color: config.announcement.textColor }"
    >
      {{ config.announcement.text }}
    </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const config = useAppConfig()

const barStyles = computed(() => ({
  height: 'var(--announcement-height)',
  backgroundColor: config.announcement.backgroundColor
}))
</script>
