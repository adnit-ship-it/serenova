export default defineNuxtPlugin(async () => {
  const pagesStore = usePagesStore()
  const legalStore = useLegalStore()
  
  // Load pages, sections, and legal data before render
  // This runs on both server and client
  try {
    await Promise.all([
      pagesStore.loadAll(),
      legalStore.loadLegal()
    ])
  } catch (error) {
    console.error('Failed to load data in plugin:', error)
    // Don't throw - let the app continue with empty data
  }
})

