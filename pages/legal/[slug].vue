<template>
  <div class="w-screen bg-backgroundColor min-h-screen flex justify-center">
    <UiSectionContainer class="pt-12 md:pt-16 pb-32">
      <h1 class="text-accentColor1 font-semibold text-[32px]/[40px] lg:text-[42px]/[50px] uppercase mb-6 text-center">
        {{ page?.title }}
      </h1>
      <div class="flex flex-col gap-4">
        <LegalContent v-if="page?.content" :content="page.content" />
      </div>
    </UiSectionContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLegalStore } from '~/stores/legalStore'
import { usePagesStore } from '~/stores/pagesStore'

const route = useRoute()
const legalStore = useLegalStore()
const pagesStore = usePagesStore()

// Get slug from route params
const slug = computed(() => route.params.slug as string)

// Ensure legal data is loaded
onMounted(async () => {
  if (!legalStore.legalData) {
    await legalStore.loadLegal()
  }
})

// Get page data by slug (using pages computed for proper reactivity)
const page = computed(() => {
  return legalStore.pages.find(p => p.slug === slug.value) || null
})

// 404 if page not found (after data is loaded)
if (process.client) {
  watchEffect(() => {
    if (legalStore.legalData && !page.value) {
      throw createError({ 
        statusCode: 404, 
        message: 'Legal page not found' 
      })
    }
  })
}

// Set SEO meta tags
const pageTitle = computed(() => {
  if (page.value?.seo?.title) return page.value.seo.title
  if (page.value?.title) return `${page.value.title} | ${pagesStore.pages?.common?.pageTitle || 'Serenova'}`
  return pagesStore.pages?.common?.pageTitle || 'Serenova'
})

const pageDescription = computed(() => {
  if (page.value?.seo?.description) return page.value.seo.description
  const common = pagesStore.pages?.common as { pageDescription?: string } | undefined
  return common?.pageDescription || ''
})

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription }
  ]
})
</script>

<style scoped>
/* Page-level styles if needed */
</style>
