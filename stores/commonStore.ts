import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  CommonData, 
  NavbarConfig, 
  FooterConfig, 
  AnnouncementConfig, 
  SectionSpacing, 
  StringsConfig,
  LoadingScreenConfig,
  LogoSizeConfig
} from '~/types/common'

export const useCommonStore = defineStore('common', () => {
  const commonData = ref<CommonData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadCommon = async () => {
    if (commonData.value) return // Already loaded
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await import('~/data/common.json')
      commonData.value = data.default as CommonData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load common config'
      error.value = errorMessage
      console.error('Failed to load common.json:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const navbar = computed((): NavbarConfig | null => commonData.value?.navbar || null)
  const footer = computed((): FooterConfig | null => commonData.value?.footer || null)
  const announcement = computed((): AnnouncementConfig | null => commonData.value?.announcement || null)
  const sectionSpacing = computed((): SectionSpacing | null => commonData.value?.sectionSpacing || null)
  const strings = computed((): StringsConfig | null => commonData.value?.strings || null)
  const protectedPages = computed((): string[] => commonData.value?.protectedPages || [])
  const loadingScreen = computed((): LoadingScreenConfig | null => commonData.value?.loadingScreen || null)
  const logoSizes = computed((): Record<string, LogoSizeConfig> => commonData.value?.logoSizes || {})

  const isAnnouncementEnabled = computed((): boolean => announcement.value?.enabled === true)

  const getLogoSize = (key: string): LogoSizeConfig | null => logoSizes.value[key] || null

  return {
    commonData,
    isLoading,
    error,
    loadCommon,
    navbar,
    footer,
    announcement,
    sectionSpacing,
    strings,
    protectedPages,
    loadingScreen,
    logoSizes,
    isAnnouncementEnabled,
    getLogoSize
  }
})
