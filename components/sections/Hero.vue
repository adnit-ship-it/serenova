<template>
  <UiSectionWrapper class="hero-section relative text-black pt-24 lg:pt-32 pb-52" :style="responsiveCSSVars">
    <!-- Background Image -->
    <div v-if="media?.background?.src" class="absolute inset-0 bg-cover bg-no-repeat w-full h-full" :style="{
        backgroundImage: `url('${media?.background?.src}')`,
        backgroundPosition: 'bottom right'
      }" />

    <!-- Gradient Overlay -->
    <div class="absolute w-full h-[256px] -bottom-[128px] z-[1]" style="
        background: linear-gradient(to bottom, rgba(98, 98, 98, 0) 0%, rgba(0, 0, 0, 1) 100%);
      "></div>

    <!-- Hand Vial Image - Bottom Right (Mobile only) -->
    <div
      v-if="media?.foreground?.src"
      class="hero-foreground-mobile absolute md:hidden bottom-8 right-0 z-20 flex items-end justify-end">
      <img v-motion v-bind="fadeUp()" :src="media?.foreground?.src" :alt="media?.foreground?.alt" class="h-full w-auto object-contain" />
    </div>

    <!-- Content - Single Column -->
    <UiSectionContainer class="relative z-30 h-full flex justify-between">
      <div class="space-y-2 md:space-y-4 lg:space-y-10 flex flex-col h-full">
        <div v-if="logo?.show !== false" class="hero-logo">
          <img v-motion v-bind="fadeUp()" :src="logo?.src" class="h-full w-auto object-cover" :alt="logo?.alt" />
        </div>

        <h1 v-if="heading?.show !== false" v-motion v-bind="fadeUp(50)" :class="[
          'text-2xl md:text-3xl lg:text-[48px] font-bold',
          headingColorClass
        ]">
          {{ heading?.text }}
        </h1>

        <h2 v-if="subheading?.show !== false" v-motion v-bind="fadeUp(100)" :class="[
          'text-lg md:text-xl lg:text-[34px]',
          subheadingColorClass
        ]">
          {{ subheading?.text }}
        </h2>

        <!-- Bullet Points -->
        <ul v-if="bulletPoints?.show !== false && bulletPointsItems.length > 0" class="space-y-3">
          <li v-for="(item, index) in bulletPointsItems" :key="index" v-motion v-bind="fadeUp(150 + (index * 50))" class="flex items-center h-[16px] md:h-[26px]">
            <UiIcon 
              :src="bulletPointIconSrc" 
              :icon-color="bulletPointIconColor"
              size="w-[14px] h-[14px] md:w-[26px] md:h-[26px]"
              class="mr-1 md:mr-3"
              alt="Checkmark"
            />
            <span :class="[
              'text-[16px] md:text-[20px] lg:text-[24px] font-medium',
              bulletPointTextColorClass
            ]">{{ item }}</span>
          </li>
        </ul>

        <!-- CTA Button -->
        <div v-if="ctaButton?.show !== false" v-motion v-bind="fadeUp(200)" class="flex flex-col justify-end h-[50px] mt-7 lg:mt-5">
          <NuxtLink to="/consultation">
            <UiButton 
              :background-color="ctaButtonBackgroundColor" 
              :text-color="ctaButtonTextColor" 
              width="var(--hero-button-width)" 
              height="var(--hero-button-height)"
              font-size="var(--hero-button-font-size)"
            >
              {{ ctaButton?.text }}
            </UiButton>
          </NuxtLink>
        </div>
      </div>
      <div v-if="media?.foreground?.src" class="hero-foreground-desktop hidden md:block z-20">
        <img v-motion v-bind="fadeUp()" :src="media?.foreground?.src" :alt="media?.foreground?.alt" class="h-full w-auto object-contain" />
      </div>
    </UiSectionContainer>
  </UiSectionWrapper>
</template>

<script setup>
import { computed } from "vue";
import { useMotionPresets } from "~/composables/useMotionPresets";
import { resolveColorToken, resolveIconColor } from "~/utils/colorTokens";

// Composables
const { fadeUp } = useMotionPresets()

// Define props
const props = defineProps({
  sectionData: {
    type: Object,
    default: null
  }
})

// Extract data from sectionData (NO FALLBACKS - use sections.json only)
const heading = computed(() => props.sectionData?.heading)
const subheading = computed(() => props.sectionData?.subheading)
const logo = computed(() => props.sectionData?.logo)
const media = computed(() => props.sectionData?.media)
const bulletPoints = computed(() => props.sectionData?.bulletPoints)
const ctaButton = computed(() => props.sectionData?.ctaButton)

// Get icon color directly from bulletPoints config
const bulletPointIconColor = computed(() => {
  const iconColorToken = bulletPoints.value?.icon?.color
  if (!iconColorToken) return null
  return resolveIconColor(iconColorToken)
})

// Get icon path from bulletPoints config
const bulletPointIconSrc = computed(() => {
  return bulletPoints.value?.icon?.src || ''
})

// CSS variables for responsive sizes - read directly from sectionData
// These are applied inline and CSS media queries handle the responsive switching
const responsiveCSSVars = computed(() => ({
  '--hero-logo-height': logo.value?.sizes?.mobile || 'auto',
  '--hero-logo-height-tablet': logo.value?.sizes?.tablet || logo.value?.sizes?.desktop || 'auto',
  '--hero-logo-height-desktop': logo.value?.sizes?.desktop || 'auto',
  '--hero-foreground-height': media.value?.foreground?.sizes?.mobile || 'auto',
  '--hero-foreground-height-tablet': media.value?.foreground?.sizes?.tablet || media.value?.foreground?.sizes?.desktop || 'auto',
  '--hero-foreground-height-desktop': media.value?.foreground?.sizes?.desktop || 'auto',
  // Button sizing (mobile defaults, overridden by CSS media queries)
  '--hero-button-width': '320px',
  '--hero-button-height': '48px',
  '--hero-button-font-size': '24px'
}))

// Bullet points items
const bulletPointsItems = computed(() => {
  return bulletPoints.value?.items || []
})

// Resolve color classes using color utilities
const headingColorClass = computed(() => {
  if (!heading.value?.color) return 'text-bodyColor'
  return resolveColorToken(heading.value.color, 'text')
})

const subheadingColorClass = computed(() => {
  if (!subheading.value?.color) return 'text-bodyColor'
  return resolveColorToken(subheading.value.color, 'text')
})

const bulletPointTextColorClass = computed(() => {
  return resolveColorToken('accentColor1', 'text')
})

// CTA Button colors from sections.json
const ctaButtonBackgroundColor = computed(() => {
  return ctaButton.value?.backgroundColor || 'accentColor2'
})

const ctaButtonTextColor = computed(() => {
  return ctaButton.value?.color || 'white'
})
</script>

<style scoped>
/* Responsive logo sizing using CSS variables - no JS flicker */
.hero-logo {
  height: var(--hero-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .hero-logo {
    height: var(--hero-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .hero-logo {
    height: var(--hero-logo-height-desktop);
  }
}

/* Responsive foreground image sizing */
.hero-foreground-mobile {
  height: var(--hero-foreground-height);
}

.hero-foreground-desktop {
  height: var(--hero-foreground-height-tablet);
}

@media (min-width: 1024px) {
  .hero-foreground-desktop {
    height: var(--hero-foreground-height-desktop);
  }
}

/* Responsive button sizing using CSS variables - no JS flicker */
.hero-section {
  --hero-button-width: 192px;
  --hero-button-height: 28px;
  --hero-button-font-size: 16px;
}

@media (min-width: 768px) {
  .hero-section {
    --hero-button-width: 320px;
    --hero-button-height: 48px;
    --hero-button-font-size: 24px;
  }
}
</style>
