import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useHeaderHeights() {
  const config = useAppConfig()

  // Breakpoint detection (mobile-first defaults for SSR)
  const isMobile = ref(true)
  const isTablet = ref(false)

  // Update breakpoints based on window width
  const updateBreakpoints = () => {
    if (typeof window === 'undefined') return
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
  }

  // Get navbar height from global config
  const navbarHeight = computed(() => {
    const heights = config.navbar.heights

    if (isMobile.value) return heights.mobile
    if (isTablet.value) return heights.tablet || heights.desktop
    return heights.desktop
  })

  // Get announcement height (0px if disabled)
  const announcementHeight = computed(() => {
    if (!config.announcement.enabled) return '0px'

    const heights = config.announcement.heights

    if (isMobile.value) return heights.mobile
    if (isTablet.value) return heights.tablet || heights.desktop
    return heights.desktop
  })

  // Combined header offset
  const headerOffset = computed(() => {
    return `calc(${navbarHeight.value} + ${announcementHeight.value})`
  })

  // CSS variables object for :style binding on root element
  const cssVariables = computed(() => ({
    '--navbar-height': navbarHeight.value,
    '--announcement-height': announcementHeight.value,
    '--header-offset': headerOffset.value
  }))

  // Setup resize listener
  onMounted(() => {
    updateBreakpoints()
    window.addEventListener('resize', updateBreakpoints)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateBreakpoints)
    }
  })

  return {
    isMobile,
    isTablet,
    navbarHeight,
    announcementHeight,
    headerOffset,
    cssVariables,
    updateBreakpoints
  }
}
