<script setup lang="ts">
import { computed } from 'vue';
import { useMotionPresets } from '~/composables/useMotionPresets';
import { resolveColorToken } from '~/utils/colorTokens';

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
const logo = computed(() => props.sectionData?.logo)
const heading = computed(() => props.sectionData?.heading)
const subheading = computed(() => props.sectionData?.subheading)
const paragraph = computed(() => props.sectionData?.paragraph)
const media = computed(() => props.sectionData?.media)

// CSS variables for responsive logo sizes - read directly from sectionData
const responsiveCSSVars = computed(() => ({
  '--about-logo-height': logo.value?.sizes?.mobile || 'auto',
  '--about-logo-height-tablet': logo.value?.sizes?.tablet || logo.value?.sizes?.desktop || 'auto',
  '--about-logo-height-desktop': logo.value?.sizes?.desktop || 'auto'
}))

// Resolve color classes using color utilities
const headingColorClass = computed(() => {
  if (!heading.value?.color) return 'text-accentColor1'
  return resolveColorToken(heading.value.color, 'text')
})

const subheadingColorClass = computed(() => {
  if (!subheading.value?.color) return 'text-bodyColor'
  return resolveColorToken(subheading.value.color, 'text')
})

const paragraphColorClass = computed(() => {
  if (!paragraph.value?.color) return 'text-bodyColor'
  return resolveColorToken(paragraph.value.color, 'text')
})
</script>

<template>
    <UiSectionWrapper class="about-banner py-20" :style="responsiveCSSVars">
        <UiSectionContainer>
            <img v-motion v-bind="fadeUp()"
                v-if="logo?.show !== false"
                :src="logo?.src" 
                :alt="logo?.alt"
                class="about-logo object-cover mx-auto"
            />
            <div class="w-full flex flex-col md:flex-row gap-8 lg:gap-20 items-center mt-12 md:mt-6">
                <div class="flex-1 h-full flex flex-col gap-2 lg:gap-6">
                    <h1 v-motion v-bind="fadeUp(50)" :class="[
                        'font-semibold text-[32px] lg:text-[48px] mb-2 lg:mb-4',
                        headingColorClass
                    ]">
                        {{ heading?.text || 'About Us' }}
                    </h1>
                    <h2 
                        v-if="subheading?.show !== false"
                        v-motion 
                        v-bind="fadeUp(100)"
                        :class="[
                            'font-semibold text-[24px] lg:text-[34px]',
                            subheadingColorClass
                        ]"
                    >
                        {{ subheading?.text || 'Quality is our guarantee!' }}
                    </h2>
                    <p 
                        v-if="paragraph?.show !== false"
                        v-motion 
                        v-bind="fadeUp(150)"
                        :class="[
                            'text-[24px] lg:text-[34px] font-light',
                            paragraphColorClass
                        ]"
                    >
                        {{ paragraph?.text || 'Serenova works to change the game in the health and wellness space allowing for certified medical care, made simple and effective.' }}
                    </p>
                </div>
                <div class="w-[160px] lg:w-[288px] h-full">
                    <img v-motion v-bind="fadeUp()" src="/assets/images/products-alt.png" alt="products" class="w-full h-full object-cover" />
                </div>
            </div>
        </UiSectionContainer>
    </UiSectionWrapper>
</template>

<style scoped>
/* Responsive logo sizing using CSS variables - no JS flicker */
.about-logo {
  height: var(--about-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .about-logo {
    height: var(--about-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .about-logo {
    height: var(--about-logo-height-desktop);
  }
}
</style>
