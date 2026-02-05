<template>
  <footer class="bg-[#E3D5D4] flex flex-col justify-center pb-4">
    <!-- Main footer row -->
    <div
      class="max-w-[1328px] w-full mx-auto flex items-end justify-between md:justify-center px-4 md:px-8 md:gap-8"
      :style="{ minHeight: footerHeight }"
    >
      <div class="flex items-center">
        <NuxtLink to="/">
          <div class="pb-1" :style="{ height: logoHeight, width: logoWidth }">
            <img
              :src="footerLogoSrc"
              :alt="footerLogoAlt"
              class="h-full w-full"
            />
          </div>
        </NuxtLink>
      </div>
      <div class="md:block h-[1px] mb-1.5 w-full mx-2 md:mx-5 flex-1 bg-accentColor1"></div>

      <!-- Navigation buttons on the right -->
      <div class="flex items-center gap-x-2 md:gap-x-6">
        <NuxtLink
          to="/about"
          class="text-accentColor1 text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.about }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="text-accentColor1 text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.contactUs }}
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-accentColor1 text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.products }}
        </NuxtLink>
      </div>
    </div>

    <!-- Legal links row -->
    <div 
      v-if="legalLinks.length > 0"
      class="max-w-[1328px] w-full mx-auto flex justify-center px-4 md:px-8 mt-2"
    >
      <div class="flex items-center gap-x-2 md:gap-x-4">
        <template v-for="(page, index) in legalLinks" :key="page.id">
          <NuxtLink 
            :to="`/legal/${page.slug}`" 
            class="text-accentColor1 text-[10px] md:text-[12px] opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            {{ page.footerLabel }}
          </NuxtLink>
          <span 
            v-if="index < legalLinks.length - 1" 
            class="text-accentColor1 opacity-50 text-[10px] md:text-[12px]"
          >|</span>
        </template>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { usePagesStore } from '~/stores/pagesStore';
import { useLegalStore } from '~/stores/legalStore';
import { getLogoSize } from '~/utils/branding';

const pagesStore = usePagesStore();
const legalStore = useLegalStore();
const route = useRoute();
const common = computed(() => pagesStore.pages?.common);

// Legal links from legal store
const legalLinks = computed(() => legalStore.footerLinks);

// Get current page name from route
const getCurrentPageName = () => {
  const path = route.path;
  if (path === '/') return 'home';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/products')) return 'products';
  if (path.startsWith('/contact')) return 'contact';
  return 'home'; // Default to home if page not found
};

// Get page-specific config from pages.json
const getPageConfig = computed(() => {
  const pageName = getCurrentPageName();
  return pagesStore.getPageConfig(pageName) || pagesStore.getPageConfig('home');
});

const footerConfig = computed(() => getPageConfig.value?.footer);
const footerLogo = computed(() => footerConfig.value?.logo);
const footerLogoSrc = computed(() => footerLogo.value?.src || "/assets/images/brand/logo-secondary-1.svg");
const footerLogoAlt = computed(() => footerLogo.value?.alt || common.value?.accessibility?.brandLogo || "Brand logo");

// Responsive breakpoint detection
const isMobile = ref(false);
const isTablet = ref(false);

const checkBreakpoints = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width < 1024;
};

// Responsive heights
const footerHeight = computed(() => {
  const heights = footerConfig.value?.heights;
  if (!heights) return '64px';
  if (isMobile.value) return heights.mobile || '64px';
  if (isTablet.value) return heights.tablet || '72px';
  return heights.desktop || '72px';
});

const logoHeight = computed(() => getLogoSize('footer', 'height', isMobile.value, isTablet.value));
const logoWidth = computed(() => getLogoSize('footer', 'width', isMobile.value, isTablet.value));

onMounted(() => {
  checkBreakpoints();
  window.addEventListener("resize", checkBreakpoints);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkBreakpoints);
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
