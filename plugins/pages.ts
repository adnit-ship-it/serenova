export default defineNuxtPlugin(async () => {
  const pagesStore = usePagesStore()
  const commonStore = useCommonStore()
  const mediaStore = useMediaStore()
  const sectionsRegistryStore = useSectionsRegistryStore()
  const legalStore = useLegalStore()
  
  // Load all data stores before render
  // This runs on both server and client
  try {
    await Promise.all([
      pagesStore.loadAll(),
      commonStore.loadCommon(),
      mediaStore.loadMedia(),
      sectionsRegistryStore.loadRegistry(),
      legalStore.loadLegal()
    ])
  } catch (error) {
    console.error('Failed to load data in plugin:', error)
    // Don't throw - let the app continue with empty data
  }
})
