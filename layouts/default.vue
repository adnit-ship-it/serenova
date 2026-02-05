<template>
  <div class="min-h-screen bg-white flex flex-col" :style="cssVariables">
    <LayoutAnnouncementBar v-if="isAnnouncementEnabled" />
    <LayoutNavbar color="bg-accentColor1" :hideNavigation="isCheckoutOrConsultationPage" />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { useHeaderHeights } from '~/composables/useHeaderHeights'
import { usePagesStore } from '~/stores/pagesStore'

// Layout components are auto-imported in Nuxt 3
const route = useRoute()
const pagesStore = usePagesStore()
const { cssVariables } = useHeaderHeights()

const isCheckoutOrConsultationPage = computed(() => {
  return route.path === "/checkout" || route.path === "/consultation" || route.path === "/welcome"
})

const isAnnouncementEnabled = computed(() => pagesStore.isAnnouncementEnabled)
</script>
