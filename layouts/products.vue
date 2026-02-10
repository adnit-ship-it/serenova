<template>
  <div class="min-h-screen bg-white flex flex-col" :style="cssVariables">
    <LayoutAnnouncementBar v-if="isAnnouncementEnabled" />
    <LayoutNavbar color="bg-accentColor1" />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { useHeaderHeights } from '~/composables/useHeaderHeights'
import { useCommonStore } from '~/stores/commonStore'

// Products layout components are auto-imported in Nuxt 3
const commonStore = useCommonStore()
const { cssVariables } = useHeaderHeights()

const isAnnouncementEnabled = computed(() => commonStore.isAnnouncementEnabled)
</script>
