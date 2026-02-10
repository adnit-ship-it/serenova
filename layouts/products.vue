<template>
  <div class="min-h-screen bg-white flex flex-col" :style="cssVariables">
    <LayoutAnnouncementBar v-if="config.announcement.enabled" />
    <LayoutNavbar color="bg-accentColor1" />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { useHeaderHeights } from '~/composables/useHeaderHeights'

// Products layout components are auto-imported in Nuxt 3
const config = useAppConfig()
const { cssVariables } = useHeaderHeights()
</script>
