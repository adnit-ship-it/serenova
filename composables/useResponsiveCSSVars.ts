import { computed, useId } from 'vue'

/**
 * Responsive size configuration with mobile, tablet, and desktop values
 */
export interface ResponsiveSizes {
  mobile: string
  tablet?: string
  desktop: string
}

/**
 * Composable that generates CSS custom properties with media query-based responsive values.
 * This approach avoids JavaScript breakpoint detection, eliminating SSR/hydration flicker.
 * 
 * @param vars - Record of CSS variable names to their responsive size configurations
 * @returns Object with cssVars (inline styles for mobile default) and styleTag (CSS with media queries)
 * 
 * @example
 * ```typescript
 * const { cssVars, styleTag } = useResponsiveCSSVars({
 *   '--logo-height': { mobile: '34px', tablet: '38px', desktop: '62px' }
 * })
 * ```
 */
export function useResponsiveCSSVars(
  vars: Record<string, ResponsiveSizes>
) {
  // Generate a unique scope ID for this component instance
  const scopeId = useId()
  const scopeClass = `responsive-vars-${scopeId.replace(/:/g, '-')}`
  
  // Generate inline CSS variables (mobile-first defaults)
  const cssVars = computed(() => {
    const result: Record<string, string> = {}
    for (const [varName, sizes] of Object.entries(vars)) {
      result[varName] = sizes.mobile
    }
    return result
  })

  // Generate the CSS with media queries for responsive values
  const styleTag = computed(() => {
    let css = ''
    
    // Tablet styles (768px+)
    const tabletVars: string[] = []
    for (const [varName, sizes] of Object.entries(vars)) {
      const tabletValue = sizes.tablet ?? sizes.desktop
      tabletVars.push(`${varName}: ${tabletValue};`)
    }
    if (tabletVars.length > 0) {
      css += `@media (min-width: 768px) { .${scopeClass} { ${tabletVars.join(' ')} } }\n`
    }
    
    // Desktop styles (1024px+)
    const desktopVars: string[] = []
    for (const [varName, sizes] of Object.entries(vars)) {
      desktopVars.push(`${varName}: ${sizes.desktop};`)
    }
    if (desktopVars.length > 0) {
      css += `@media (min-width: 1024px) { .${scopeClass} { ${desktopVars.join(' ')} } }\n`
    }
    
    return css
  })

  return {
    /** CSS variables object with mobile defaults - apply to element style */
    cssVars,
    /** CSS string with media queries - inject via useHead or <style> tag */
    styleTag,
    /** Unique class name to scope the CSS variables */
    scopeClass
  }
}

/**
 * Helper to generate a simple inline style object for responsive height
 * Uses CSS variable that should be set by useResponsiveCSSVars
 * 
 * @param varName - The CSS variable name (e.g., '--logo-height')
 * @returns Style object with height set to the CSS variable and width auto
 */
export function responsiveHeightStyle(varName: string) {
  return {
    height: `var(${varName})`,
    width: 'auto'
  }
}

/**
 * Helper to generate a simple inline style object for responsive size (height only, width auto)
 * Used when sizes are directly available without CSS variables
 * 
 * @param sizes - The responsive sizes object
 * @param breakpoint - Current breakpoint ('mobile' | 'tablet' | 'desktop')
 * @returns Style object with height and width: auto
 */
export function getResponsiveHeight(sizes: ResponsiveSizes | undefined, breakpoint: 'mobile' | 'tablet' | 'desktop'): string {
  if (!sizes) return 'auto'
  if (breakpoint === 'mobile') return sizes.mobile
  if (breakpoint === 'tablet') return sizes.tablet ?? sizes.desktop
  return sizes.desktop
}
