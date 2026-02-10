import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SectionRegistryData, SectionRegistryEntry } from '~/types/pages'

export const useSectionsRegistryStore = defineStore('sectionsRegistry', () => {
  const registry = ref<SectionRegistryData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadRegistry = async () => {
    if (registry.value) return // Already loaded
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await import('~/data/sections-registry.json')
      registry.value = data.default as SectionRegistryData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load sections registry'
      error.value = errorMessage
      console.error('Failed to load sections-registry.json:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const availableSections = computed((): SectionRegistryEntry[] => registry.value?.sections || [])

  const getSectionById = (id: string): SectionRegistryEntry | undefined => {
    return availableSections.value.find(s => s.id === id)
  }

  const getSectionByComponent = (component: string): SectionRegistryEntry | undefined => {
    return availableSections.value.find(s => s.component === component)
  }

  return {
    registry,
    isLoading,
    error,
    loadRegistry,
    availableSections,
    getSectionById,
    getSectionByComponent
  }
})
