import { computed } from 'vue'
import { useBreakpoints } from './useBreakpoints'

export function useHeaderHeights() {
  const config = useAppConfig()
  const { isMobile, isTablet } = useBreakpoints()

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

  return {
    isMobile,
    isTablet,
    navbarHeight,
    announcementHeight,
    headerOffset,
    cssVariables
  }
}
