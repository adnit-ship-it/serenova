import { computed } from 'vue'
import { useBrandingStore } from '~/stores/branding'
import designTokens from '~/data/designTokens.json'

const primaryColors = designTokens.colors?.primary || {}

/**
 * Utility function to get dynamic brand colors from the API
 * Falls back to static design tokens if branding is not loaded
 */
export function useBrandColors() {
  const brandingStore = useBrandingStore()
  
  const getBrandColors = () => {
    const brandColors = brandingStore.getBrandColors()
    
    if (brandColors) {
      return {
        backgroundColor: brandColors.background,
        bodyColor: brandColors.body,
        accentColor1: brandColors.accent1,
        accentColor2: brandColors.accent2,
      }
    }
    
    // Fallback to designTokens.json (single source of truth)
    return {
      backgroundColor: primaryColors.background ?? '#FDFAF6',
      bodyColor: primaryColors.body ?? '#000000',
      accentColor1: primaryColors.accent1 ?? '#750021',
      accentColor2: primaryColors.accent2 ?? '#AA7585',
    }
  }
  
  return {
    getBrandColors,
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}

/**
 * Utility function to get brand logos from the API
 */
export function useBrandLogos() {
  const brandingStore = useBrandingStore()
  
  return {
    logoUrl: computed(() => brandingStore.getLogoUrl()),
    altLogoUrl: computed(() => brandingStore.getAltLogoUrl()),
    organizationName: computed(() => brandingStore.getOrganizationName()),
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}

// Note: getLogoSize function has been removed.
// Logo sizing is now handled via CSS variables and media queries in each component.
// This eliminates SSR/hydration flicker caused by JS breakpoint detection.
// See useResponsiveCSSVars composable for the new approach.
