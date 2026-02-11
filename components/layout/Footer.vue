<template>
  <footer :class="['footer flex flex-col justify-center pb-4', footerBackgroundColorClass]" :style="responsiveCSSVars">
    <!-- Main footer row -->
    <div
      class="footer-inner max-w-[1328px] w-full mx-auto flex items-end justify-between md:justify-center px-4 md:px-8 md:gap-8"
    >
      <div class="flex items-center">
        <NuxtLink to="/">
          <div class="footer-logo-wrapper pb-1">
            <img
              :src="footerLogoSrc"
              :alt="footerLogoAlt"
              class="footer-logo"
            />
          </div>
        </NuxtLink>
      </div>
      <div :class="['md:block h-[1px] mb-1.5 w-full mx-2 md:mx-5 flex-1', footerDividerColorClass]"></div>

      <!-- Navigation buttons on the right -->
      <div class="flex items-center gap-x-2 md:gap-x-6">
        <NuxtLink
          to="/about"
          :class="[footerTextColorClass, 'text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200']"
        >
          {{ config.strings.navigation.about }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          :class="[footerTextColorClass, 'text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200']"
        >
          {{ config.strings.navigation.contactUs }}
        </NuxtLink>
        <NuxtLink
          to="/products"
          :class="[footerTextColorClass, 'text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200']"
        >
          {{ config.strings.navigation.products }}
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
            :class="[footerTextColorClass, 'text-[10px] md:text-[12px] opacity-70 hover:opacity-100 transition-opacity duration-200']"
          >
            {{ page.footerLabel }}
          </NuxtLink>
          <span 
            v-if="index < legalLinks.length - 1" 
            :class="[footerTextColorClass, 'opacity-50 text-[10px] md:text-[12px]']"
          >|</span>
        </template>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useLegalStore } from '~/stores/legalStore';
import { resolveColorToken } from '~/utils/colorTokens';

const config = useAppConfig();
const legalStore = useLegalStore();

// Legal links from legal store
const legalLinks = computed(() => legalStore.footerLinks);

// Get footer config from app config
const footerLogoSrc = computed(() => config.footer.logo.src);
const footerLogoAlt = computed(() => config.footer.logo.alt || config.strings.accessibility.brandLogo || "Brand logo");

// Footer colors from config
const footerBackgroundColorClass = computed(() => {
  const bgToken = config.footer?.backgroundColor || '#E3D5D4'
  return resolveColorToken(bgToken, 'bg')
})

const footerTextColorClass = computed(() => {
  const textToken = config.footer?.textColor || 'accentColor1'
  return resolveColorToken(textToken, 'text')
})

const footerDividerColorClass = computed(() => {
  const textToken = config.footer?.textColor || 'accentColor1'
  return resolveColorToken(textToken, 'bg')
})

// CSS variables for responsive sizes from common.json via app.config
const responsiveCSSVars = computed(() => {
  const logoSizes = config.logoSizes?.footer
  const heights = config.footer.heights
  return {
    '--footer-height': heights?.mobile || '64px',
    '--footer-height-tablet': heights?.tablet || heights?.desktop || '72px',
    '--footer-height-desktop': heights?.desktop || '72px',
    '--footer-logo-height': logoSizes?.height?.mobile || '20px',
    '--footer-logo-height-tablet': logoSizes?.height?.tablet || logoSizes?.height?.desktop || '26px',
    '--footer-logo-height-desktop': logoSizes?.height?.desktop || '32px'
  }
})
</script>

<style scoped>
/* Responsive footer height using CSS variables - no JS flicker */
.footer-inner {
  min-height: var(--footer-height);
}

@media (min-width: 768px) {
  .footer-inner {
    min-height: var(--footer-height-tablet);
  }
}

@media (min-width: 1024px) {
  .footer-inner {
    min-height: var(--footer-height-desktop);
  }
}

/* Responsive logo sizing using CSS variables - no JS flicker */
.footer-logo-wrapper {
  height: var(--footer-logo-height);
  width: auto;
}

.footer-logo {
  height: 100%;
  width: auto;
}

@media (min-width: 768px) {
  .footer-logo-wrapper {
    height: var(--footer-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .footer-logo-wrapper {
    height: var(--footer-logo-height-desktop);
  }
}
</style>
