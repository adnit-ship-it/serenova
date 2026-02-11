import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Shared breakpoint detection composable
 * Returns reactive breakpoint states for mobile, tablet, and desktop
 * 
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: >= 768px and < 1024px
 * - Desktop: >= 1024px
 */
export function useBreakpoints() {
  // SSR-safe defaults (mobile-first)
  const isMobile = ref(true)
  const isTablet = ref(false)
  
  // Desktop is computed from the other two
  const isDesktop = computed(() => !isMobile.value && !isTablet.value)

  const update = () => {
    if (typeof window === 'undefined') return
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', update)
    }
  })

  return { isMobile, isTablet, isDesktop, update }
}
