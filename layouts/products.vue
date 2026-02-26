<template>
  <div class="min-h-screen bg-white flex flex-col">
    <LayoutAnnouncementBar v-if="config.announcement.enabled" />
    <LayoutNavbar />
    <main class="flex-1 pt-[var(--header-offset)]">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
// Products layout components are auto-imported in Nuxt 3
const config = useAppConfig()
</script>
