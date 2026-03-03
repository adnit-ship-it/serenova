<template>
  <div
    v-if="config.announcement.enabled"
    class="announcement-bar w-full fixed top-0 z-50 px-4"
    :style="barStyles"
  >
    <div class="w-full h-full flex items-center justify-center">
    <NuxtLink
      v-if="config.announcement.link"
      :to="config.announcement.link"
      class="text-center font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
      :style="{ color: resolvedTextColor }"
    >
      {{ config.announcement.text }}
    </NuxtLink>
    <span
      v-else
      class="text-center font-medium text-sm md:text-base"
      :style="{ color: resolvedTextColor }"
    >
      {{ config.announcement.text }}
    </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveIconColor } from '~/utils/colorTokens'

const config = useAppConfig()

const resolvedTextColor = computed(() =>
  resolveIconColor(config.announcement.textColor) || config.announcement.textColor
)

const barStyles = computed(() => {
  const heights = config.announcement.heights
  return {
    '--announcement-bar-height': heights?.mobile || '60px',
    '--announcement-bar-height-tablet': heights?.tablet || '70px',
    '--announcement-bar-height-desktop': heights?.desktop || '80px',
    backgroundColor: resolveIconColor(config.announcement.backgroundColor) || config.announcement.backgroundColor
  }
})
</script>

<style scoped>
.announcement-bar {
  height: var(--announcement-bar-height);
}

@media (min-width: 768px) {
  .announcement-bar {
    height: var(--announcement-bar-height-tablet);
  }
}

@media (min-width: 1024px) {
  .announcement-bar {
    height: var(--announcement-bar-height-desktop);
  }
}
</style>
