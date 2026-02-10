<template>
  <div v-if="pageConfig" class="bg-backgroundColor">
    <!-- Products page: Custom rendering with category filtering -->
    <PagesProductsPageContent 
      v-if="pageKey === 'products'"
      :page-config="pageConfig"
      :page-sections="pageSections"
    />
    
    <!-- Contact page: Custom form handling -->
    <PagesContactPageContent 
      v-else-if="pageKey === 'contact'"
      :page-config="pageConfig"
    />
    
    <!-- About page: Has bottom padding -->
    <div v-else-if="pageKey === 'about'" class="pb-24 md:pb-32">
      <template v-for="(section, index) in pageSections" :key="section.name">
        <div :style="getSectionSpacingStyle(section, index)">
          <DynamicSection :section="section" />
        </div>
      </template>
    </div>
    
    <!-- Default: Dynamic sections for any other page (including home) -->
    <template v-else>
      <template v-for="(section, index) in pageSections" :key="section.name">
        <div :style="getSectionSpacingStyle(section, index)">
          <DynamicSection :section="section" />
        </div>
      </template>
    </template>
  </div>
  
  <!-- Loading state -->
  <div v-else-if="isLoading" class="min-h-screen flex items-center justify-center bg-backgroundColor">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accentColor1 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
  
  <!-- 404 Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center bg-backgroundColor">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-accentColor1">404</h1>
      <p class="text-2xl mt-4 text-gray-700">Page Not Found</p>
      <p class="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="mt-6 inline-block px-6 py-3 bg-accentColor1 text-white rounded-lg hover:opacity-90 transition-opacity">
        Go Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePagesStore } from '~/stores/pagesStore'
import { useSectionSpacing } from '~/composables/useSectionSpacing'

const route = useRoute()
const pagesStore = usePagesStore()
const config = useAppConfig()
const { getSectionStyle } = useSectionSpacing()

// Resolve page key from route
const pageKey = computed(() => {
  const slug = route.params.slug
  // Handle home page (empty slug or just /)
  if (!slug || (Array.isArray(slug) && slug.length === 0)) return 'home'
  // Handle nested routes like /legal/privacy-policy - skip these (handled by other routes)
  if (Array.isArray(slug) && slug.length > 1) return slug.join('/')
  // Handle single segment routes
  return Array.isArray(slug) ? slug[0] : slug
})

// Get page configuration from store
const pageConfig = computed(() => pagesStore.getPageConfig(pageKey.value))

// Get ordered sections for this page
const pageSections = computed(() => pagesStore.getPageSections(pageKey.value))

// Check if page data is loading
const isLoading = computed(() => pagesStore.isLoading)

// Get section spacing style
const getSectionSpacingStyle = (section: any, index: number) => {
  return getSectionStyle(section, index, pageSections.value.length)
}

// Set page metadata
useHead({
  title: computed(() => pageConfig.value?.title 
    ? `${pageConfig.value.title} | ${config.strings.pageTitle}`
    : config.strings.pageTitle
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => pageConfig.value?.description || config.strings.pageDescription || '')
    }
  ]
})

// Note: Layout is determined dynamically in middleware or via definePageMeta
// Products page uses 'products' layout, others use 'default'
// Since definePageMeta can't be dynamic, we handle this differently:
// - Products page content component handles its own layout needs
// - Default layout is used for all pages from this route
</script>

<style scoped>
/* Dynamic page styles */
</style>
