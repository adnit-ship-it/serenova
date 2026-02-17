<template>
  <UiSectionWrapper class="products-page pt-12 md:pt-16 pb-24 md:pb-32 flex-col bg-backgroundColor" :style="responsiveCSSVars">
    <!-- Render all sections in order from pages.json -->
    <template v-for="section in pageSections" :key="section.name">
      <!-- Products Hero: Render inline content when component is null -->
      <UiSectionContainer v-if="section.name === 'Products Hero' && section.component === null" class="mb-20">
        <img v-motion v-bind="fadeUp()" :src="productsLogo?.src || '/assets/images/brand/logo-secondary-1.svg'" :alt="productsLogo?.alt || 'brand logo'" class="products-logo object-cover" />
        <h1 v-motion v-bind="fadeUp(25)" class="text-[32px] md:text-[48px] font-semibold mt-2 md:mt-4 lg:mt-8">
          {{ pageConfig?.pageTitle || 'Explore Our Products' }}
        </h1>
        <p v-motion v-bind="fadeUp(50)" class="text-[16px] md:text-[23px] font-extralight mt-2">
          {{ pageConfig?.subtitle || 'Personalized GLP-1 Medication' }}
        </p>
        <div class="h-4 md:h-8"></div>
        <div class="flex gap-4 flex-wrap">
          <!-- Always show "All" button -->
          <UiButton 
            @click="selectedCategory = 'all'"
            :ghost="selectedCategory !== 'all'"
            v-motion v-bind="fadeUp(75)" width="var(--products-button-width)" height="var(--products-button-height)" font-size="var(--products-button-font-size)" background-color="accentColor2">
            All
          </UiButton>
          
          <!-- Dynamically render category buttons only for categories that have products -->
          <UiButton 
            v-for="category in availableCategories"
            :key="category"
            @click="selectedCategory = category"
            :ghost="selectedCategory !== category"
            v-motion v-bind="fadeUp(75)" width="var(--products-button-width)" height="var(--products-button-height)" font-size="var(--products-button-font-size)" background-color="accentColor2">
            {{ categoryLabels[category] }}
          </UiButton>
        </div>
      </UiSectionContainer>
      
      <!-- All other sections: Render via DynamicSection -->
      <DynamicSection 
        v-else
        :section="section"
        :additional-props="getAdditionalPropsForSection(section)"
      />
    </template>
  </UiSectionWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCRMStore } from '~/stores/crmStore';
import { usePagesStore } from '~/stores/pagesStore';
import { products as staticProducts, categoryLabels } from '~/data/intake-form/products';
import type { ProductCategory } from '~/types/intake-form/checkout';
import type { PageConfig, PageSectionReference } from '~/types/pages';
import { useMotionPresets } from '~/composables/useMotionPresets';

const props = defineProps<{
  pageConfig: PageConfig
  pageSections: PageSectionReference[]
}>();

const crmStore = useCRMStore();
const pagesStore = usePagesStore();

// Use shared composables
const { fadeUp } = useMotionPresets();

// Get Products Hero section data from sections.json
const productsHeroData = computed(() => {
  const heroSection = props.pageSections.find(s => s.name === 'Products Hero')
  if (heroSection) {
    return pagesStore.getSectionData(heroSection.name)
  }
  return null
})

// Get logo from section data
const productsLogo = computed(() => productsHeroData.value?.logo)

// CSS variables for responsive sizes (logo and buttons)
const responsiveCSSVars = computed(() => ({
  '--products-logo-height': productsLogo.value?.sizes?.mobile || '34px',
  '--products-logo-height-tablet': productsLogo.value?.sizes?.tablet || productsLogo.value?.sizes?.desktop || '38px',
  '--products-logo-height-desktop': productsLogo.value?.sizes?.desktop || '62px',
  // Button sizing (mobile defaults, overridden by CSS media queries)
  '--products-button-width': '144px',
  '--products-button-height': '20px',
  '--products-button-font-size': '12px'
}))

// Category filter state - defaults to 'all'
const selectedCategory = ref<'all' | ProductCategory>('all' as 'all' | ProductCategory);

// Get all products (from API or static)
const allProducts = computed(() => {
  const apiProducts = crmStore.getProductBundles;
  
  // If we have API products, use them (they'll be filtered in Products.vue)
  if (apiProducts && apiProducts.length > 0) {
    return apiProducts;
  }
  
  // Otherwise use static products
  return staticProducts;
});

// Get available categories dynamically
const availableCategories = computed(() => {
  // Get categories from API products if available
  const apiProducts = crmStore.getProductBundles;
  if (apiProducts && apiProducts.length > 0) {
    const categories = new Set();
    apiProducts.forEach((bundle: any) => {
      if (bundle.products && Array.isArray(bundle.products)) {
        bundle.products.forEach((product: any) => {
          if (product.categories && Array.isArray(product.categories)) {
            product.categories.forEach((cat: any) => {
              // Map API category name to our ProductCategory type
              const categoryName = cat.name?.toLowerCase().replace(/\s+/g, '-');
              if (categoryName && isValidCategory(categoryName)) {
                categories.add(categoryName);
              }
            });
          }
        });
      }
    });
    return Array.from(categories) as ProductCategory[];
  }
  
  // Fallback to static products categories - inline logic to avoid SSR issues
  const categories = new Set<ProductCategory>();
  staticProducts.forEach((product) => {
    if (product.category) {
      categories.add(product.category as ProductCategory);
    }
  });
  return Array.from(categories);
});

// Helper to check if category is valid
function isValidCategory(cat: string): cat is ProductCategory {
  return ['weight-loss', 'sexual health', 'wellness', 'hair', 'skin'].includes(cat);
}

// Filter products based on selected category
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return allProducts.value; // Show all products
  }
  
  const apiProducts = crmStore.getProductBundles;
  
  // If using API products, filter by category
  if (apiProducts && apiProducts.length > 0) {
    return apiProducts.filter((bundle: any) => {
      if (!bundle.products || !Array.isArray(bundle.products)) return false;
      
      return bundle.products.some((product: any) => {
        if (!product.categories || !Array.isArray(product.categories)) return false;
        
        return product.categories.some((cat: any) => {
          const categoryName = cat.name?.toLowerCase().replace(/\s+/g, '-');
          return categoryName === selectedCategory.value;
        });
      });
    });
  }
  
  // Filter static products
  return staticProducts.filter(product => product.category === selectedCategory.value);
});

// Get additional props for specific sections (e.g., filteredProducts for SectionsProducts)
const getAdditionalPropsForSection = (section: PageSectionReference) => {
  if (section.component === 'SectionsProducts') {
    return {
      filteredProducts: filteredProducts.value
    }
  }
  return {}
}
</script>

<style scoped>
/* Responsive logo sizing using CSS variables - no JS flicker */
.products-logo {
  height: var(--products-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .products-logo {
    height: var(--products-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .products-logo {
    height: var(--products-logo-height-desktop);
  }
}

/* Responsive button sizing using CSS variables - no JS flicker */
@media (min-width: 768px) {
  .products-page {
    --products-button-width: 320px;
    --products-button-height: 44px;
    --products-button-font-size: 24px;
  }
}
</style>
