<template>
  <div v-html="content" class="legal-content"></div>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<style scoped>
/* 
  Legal content styles - matched to site patterns:
  - FAQ.vue, AboutBanner.vue, AboutPriority.vue, Hero.vue
*/

.legal-content {
  @apply text-bodyColor leading-relaxed;
}

/* Section headings - match h3 card titles from AboutPriority */
.legal-content :deep(.section-heading) {
  @apply text-[18px] lg:text-[20px] font-semibold text-accentColor1 block mt-8 mb-3;
}

/* h2 - match section headings pattern */
.legal-content :deep(h2) {
  @apply text-[20px] lg:text-[24px] font-semibold text-accentColor1 mt-8 mb-4;
}

/* h3 - match card title pattern */
.legal-content :deep(h3) {
  @apply text-[18px] lg:text-[20px] font-semibold text-bodyColor mt-6 mb-3;
}

/* Paragraphs - match FAQ answer / body text */
.legal-content :deep(p) {
  @apply text-[14px] md:text-[16px] mb-4 leading-relaxed;
}

/* Bold text */
.legal-content :deep(b),
.legal-content :deep(strong) {
  @apply font-semibold;
}

/* Lists - match site patterns */
.legal-content :deep(ul),
.legal-content :deep(ol) {
  @apply pl-6 mb-4 text-[14px] md:text-[16px];
}

.legal-content :deep(li) {
  @apply mb-2;
}

.legal-content :deep(ul) {
  @apply list-disc;
}

.legal-content :deep(ol) {
  @apply list-decimal;
}

/* Links - accent color with underline */
.legal-content :deep(a) {
  @apply text-accentColor1 underline hover:opacity-80 transition-opacity;
}

/* Blockquotes - accent border like section dividers */
.legal-content :deep(blockquote) {
  @apply border-l-4 border-accentColor1 pl-4 italic my-6 text-[14px] md:text-[16px];
}

/* Images */
.legal-content :deep(img) {
  @apply max-w-full h-auto rounded-lg my-6;
}

/* Tables */
.legal-content :deep(table) {
  @apply w-full border-collapse my-6 text-[14px] md:text-[16px];
}

.legal-content :deep(th),
.legal-content :deep(td) {
  @apply border border-bodyColor/20 px-4 py-2 text-left;
}

.legal-content :deep(th) {
  @apply bg-accentColor2 font-semibold;
}

/* Horizontal rule - match accent underline pattern */
.legal-content :deep(hr) {
  @apply h-0.5 bg-accentColor1 border-0 my-8;
}

/* Font-semibold class from template */
.legal-content :deep(.font-semibold) {
  font-weight: 600;
}
</style>
