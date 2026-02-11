<template>
  <Transition enter-active-class="transition-all duration-400 ease-in-out" enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-500 ease-in-out"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isVisible" class="loading-screen fixed inset-0 z-[9999] bg-backgroundColor flex flex-col items-center justify-center"
      :class="{ 'pointer-events-none': isFadingOut }"
      :style="responsiveCSSVars">
      <img v-motion v-bind="fadeUpSubtle()" :src="loadingLogoSrc" :alt="loadingLogoAlt" class="loading-logo mb-6" />
      <p class="text-lg text-gray-600 font-medium">{{ loadingText }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionPresets } from '~/composables/useMotionPresets'

interface Props {
  isVisible: boolean
  isFadingOut: boolean
}

defineProps<Props>()

const config = useAppConfig()

// Use shared composables
const { fadeUpSubtle } = useMotionPresets()

const loadingLogoSrc = computed(() => config.loadingScreen.logo.src)
const loadingLogoAlt = computed(() => config.loadingScreen.logo.alt || config.strings.accessibility.brandLogo || 'Brand logo')
const loadingText = computed(() => config.loadingScreen.text)

// CSS variables for responsive logo sizes from common.json via app.config
const responsiveCSSVars = computed(() => {
  const logoSizes = config.logoSizes?.loadingScreen
  return {
    '--loading-logo-height': logoSizes?.height?.mobile || '20px',
    '--loading-logo-height-tablet': logoSizes?.height?.tablet || logoSizes?.height?.desktop || '80px',
    '--loading-logo-height-desktop': logoSizes?.height?.desktop || '132px'
  }
})
</script>

<style scoped>
/* Ensure the loading screen covers everything */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Responsive logo sizing using CSS variables - no JS flicker */
.loading-logo {
  height: var(--loading-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .loading-logo {
    height: var(--loading-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .loading-logo {
    height: var(--loading-logo-height-desktop);
  }
}
</style>
