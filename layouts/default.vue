<template>
  <div class="min-h-screen bg-white flex flex-col" :style="cssVariables">
    <LayoutAnnouncementBar v-if="config.announcement.enabled" />
    <LayoutNavbar color="bg-accentColor1" :hideNavigation="isCheckoutOrConsultationPage" />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { useHeaderHeights } from '~/composables/useHeaderHeights'

// Layout components are auto-imported in Nuxt 3
const route = useRoute()
const config = useAppConfig()
const { cssVariables } = useHeaderHeights()

const isCheckoutOrConsultationPage = computed(() => {
  return route.path === "/checkout" || route.path === "/consultation" || route.path === "/welcome"
})
</script>
