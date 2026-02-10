import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MediaData, IconEntry, LogoEntry, ImageEntry } from '~/types/media'

export const useMediaStore = defineStore('media', () => {
  const mediaData = ref<MediaData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadMedia = async () => {
    if (mediaData.value) return // Already loaded
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await import('~/data/media.json')
      mediaData.value = data.default as MediaData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load media'
      error.value = errorMessage
      console.error('Failed to load media.json:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const icons = computed((): Record<string, IconEntry> => mediaData.value?.iconRegistry || {})
  const logos = computed((): Record<string, LogoEntry> => mediaData.value?.logoRegistry || {})
  const images = computed((): Record<string, ImageEntry> => mediaData.value?.imageRegistry || {})

  const getIcon = (key: string): IconEntry | null => icons.value[key] || null
  const getLogo = (key: string): LogoEntry | null => logos.value[key] || null
  const getImage = (key: string): ImageEntry | null => images.value[key] || null

  return {
    mediaData,
    isLoading,
    error,
    loadMedia,
    icons,
    logos,
    images,
    getIcon,
    getLogo,
    getImage
  }
})
