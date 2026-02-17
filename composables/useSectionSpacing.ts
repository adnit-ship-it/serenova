import type { PageSectionReference } from '~/types/pages'

export function useSectionSpacing() {
  // Get gap for a specific section (with override support)
  // When no override, uses --section-gap-default from :root (injected by responsive-layout plugin)
  const getSectionGap = (section: PageSectionReference, position: 'before' | 'after'): string => {
    const override = position === 'before' ? section.gapBefore : section.gapAfter
    return override || 'var(--section-gap-default)'
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
    getSectionGap,
    getSectionStyle
  }
}
