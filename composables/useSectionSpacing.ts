import { computed } from 'vue'
import { useBreakpoints } from './useBreakpoints'
import type { PageSectionReference } from '~/types/pages'

export function useSectionSpacing() {
  const config = useAppConfig()
  const { isMobile, isTablet } = useBreakpoints()

  // Get default gap based on current breakpoint
  const getDefaultGap = computed(() => {
    const spacing = config.sectionSpacing.default
    
    if (isMobile.value) return spacing.mobile
    if (isTablet.value) return spacing.tablet || spacing.desktop
    return spacing.desktop
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

  return {
    isMobile,
    isTablet,
    getDefaultGap,
    getSectionGap,
    getSectionStyle
  }
}
