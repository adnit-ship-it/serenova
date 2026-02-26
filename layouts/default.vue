<template>
  <div class="min-h-screen bg-white flex flex-col">
    <LayoutAnnouncementBar v-if="config.announcement.enabled" />
    <LayoutNavbar :hideNavigation="isCheckoutOrConsultationPage" />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
// Layout components are auto-imported in Nuxt 3
const route = useRoute()
const config = useAppConfig()

const isCheckoutOrConsultationPage = computed(() => {
  return route.path === "/checkout" || route.path === "/consultation" || route.path === "/welcome"
})
</script>
