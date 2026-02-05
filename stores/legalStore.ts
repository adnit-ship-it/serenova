import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LegalData, LegalPage } from '~/types/legal'

export const useLegalStore = defineStore('legal', () => {
  const legalData = ref<LegalData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load legal.json
  const loadLegal = async (skipLoadingState = false) => {
    if (legalData.value) return // Already loaded
    
    if (!skipLoadingState) {
      isLoading.value = true
      error.value = null
    }
    
    try {
      const data = await import('~/data/legal.json')
      legalData.value = data.default
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load legal data'
      if (!skipLoadingState) {
        error.value = errorMessage
      }
      console.error('Failed to load legal.json:', err)
      throw err
    } finally {
      if (!skipLoadingState) {
        isLoading.value = false
      }
    }
  }

  // Get all pages
  const pages = computed(() => {
    return legalData.value?.pages || []
  })

  // Get page by slug
  const getPageBySlug = (slug: string): LegalPage | null => {
    if (!legalData.value?.pages) return null
    return legalData.value.pages.find(page => page.slug === slug) || null
  }

  // Get page by id
  const getPageById = (id: string): LegalPage | null => {
    if (!legalData.value?.pages) return null
    return legalData.value.pages.find(page => page.id === id) || null
  }

  // Get footer links (filtered by showInFooter, sorted by order)
  const footerLinks = computed(() => {
    if (!legalData.value?.pages) return []
    
    return legalData.value.pages
      .filter(page => page.showInFooter)
      .sort((a, b) => a.order - b.order)
  })

  return {
    legalData,
    isLoading,
    error,
    loadLegal,
    pages,
    getPageBySlug,
    getPageById,
    footerLinks
  }
})
