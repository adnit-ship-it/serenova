export default defineNuxtPlugin(async () => {
  const pagesStore = usePagesStore()
  const sectionsRegistryStore = useSectionsRegistryStore()
  const legalStore = useLegalStore()
  
  // Load data stores before render
  // Note: common and media config are now loaded via app.config.ts (no async loading needed)
  // This runs on both server and client
  try {
    await Promise.all([
      pagesStore.loadAll(),
      sectionsRegistryStore.loadRegistry(),
      legalStore.loadLegal()
    ])
  } catch (error) {
    console.error('Failed to load data in plugin:', error)
    // Don't throw - let the app continue with empty data
  }
})
