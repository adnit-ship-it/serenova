import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCommonStore } from '~/stores/commonStore'
import type { PageSectionReference } from '~/types/pages'

export function useSectionSpacing() {
  const commonStore = useCommonStore()

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

  // Get default gap based on current breakpoint
  const getDefaultGap = computed(() => {
    const spacing = commonStore.sectionSpacing?.default
    if (!spacing) return '64px'
    
    if (isMobile.value) return spacing.mobile || '48px'
    if (isTablet.value) return spacing.tablet || '56px'
    return spacing.desktop || '64px'
  })

  // Get gap for a specific section (with override support)
  const getSectionGap = (section: PageSectionReference, position: 'before' | 'after'): string => {
    const override = position === 'before' ? section.gapBefore : section.gapAfter
    return override || getDefaultGap.value
  }

  // Get margin style for a section based on its position in the list
  const getSectionStyle = (section: PageSectionReference, index: number, totalSections: number) => {
    const style: Record<string, string> = {}
    
    // First section: no top margin (header already provides spacing)
    // Subsequent sections: use gapBefore or default gap
    if (index > 0) {
      style.marginTop = getSectionGap(section, 'before')
    }
    
    // Last section: use gapAfter if specified
    // Otherwise no extra margin (footer provides spacing)
    if (index < totalSections - 1 && section.gapAfter) {
      style.marginBottom = section.gapAfter
    }
    
    return style
  }

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
    getDefaultGap,
    getSectionGap,
    getSectionStyle,
    updateBreakpoints
  }
}
