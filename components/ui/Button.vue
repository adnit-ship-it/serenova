<template>
  <button
    v-if="!props.decorative"
    :class="buttonClasses"
    :style="buttonStyles"
    :disabled="props.disabled || props.loading"
  >
    <slot>{{ props.text }}</slot>
  </button>
  <div v-else :class="buttonClasses" :style="buttonStyles">
    <slot>{{ props.text }}</slot>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { resolveIconColor } from '~/utils/colorTokens';

const props = defineProps({
  height: {
    type: String,
    default: "48px",
  },
  width: {
    type: String,
    default: "full",
  },
  fontSize: {
    type: String,
    default: "16",
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  // New props for integration
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "ghost", "disabled", "loading"].includes(value),
  },
  text: {
    type: String,
    default: "",
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: "right",
    validator: (value) => ["left", "right"].includes(value),
  },
  decorative: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "accentColor1",
  },
  textColor: {
    type: String,
    default: "white",
  },
});

const buttonClasses = computed(() => {
  const baseClasses =
    "flex items-center justify-center font-medium transition-colors rounded-full px-2 md:px-6  ";

  // backgroundColor might already be a resolved Tailwind class (e.g., "bg-accentColor1" or "bg-[green]")
  // or it might be a raw token (e.g., "accentColor1") - we'll use it as-is since Hero component resolves it
  // Handle null/undefined by using default
  const bgValue = props.backgroundColor || 'accentColor1'
  const bgClass = bgValue.startsWith('bg-') 
    ? bgValue 
    : `bg-${bgValue}`;
  
  // Handle null/undefined for textColor
  const textValue = props.textColor || 'white'
  const textClass = textValue.startsWith('text-')
    ? textValue
    : `text-${textValue}`;

  // Handle variant-based styling
  if (props.decorative) {
    // Decorative buttons don't have pointer cursor or button-specific interactions
    if (props.variant === "ghost" || props.ghost) {
      // Use textColor for both text and border, backgroundColor for bg
      const colorValue = props.textColor || 'accentColor1';
      const bgValue = props.backgroundColor || 'white';
      const ghostTextClass = colorValue.startsWith('text-') ? colorValue : `text-${colorValue}`;
      const ghostBorderClass = colorValue.startsWith('border-') ? colorValue : `border-${colorValue}`;
      const ghostBgClass = bgValue.startsWith('bg-') ? bgValue : `bg-${bgValue}`;
      return `${baseClasses} border ${ghostBorderClass} ${ghostTextClass} ${ghostBgClass}`;
    } else if (props.variant === "disabled" || props.disabled) {
      return `${baseClasses} bg-gray-300 text-gray-500`;
    } else if (props.variant === "loading" || props.loading) {
      return `${baseClasses} ${bgClass} ${textClass} opacity-75`;
    } else {
      return `${baseClasses} ${bgClass} ${textClass}`;
    }
  } else {
    // Regular buttons with pointer cursor and button interactions
    if (props.variant === "ghost" || props.ghost) {
      // Use textColor for both text and border, backgroundColor for bg
      const colorValue = props.textColor || 'accentColor1';
      const bgValue = props.backgroundColor || 'white';
      const ghostTextClass = colorValue.startsWith('text-') ? colorValue : `text-${colorValue}`;
      const ghostBorderClass = colorValue.startsWith('border-') ? colorValue : `border-${colorValue}`;
      const ghostBgClass = bgValue.startsWith('bg-') ? bgValue : `bg-${bgValue}`;
      return `${baseClasses} border ${ghostBorderClass} ${ghostTextClass} ${ghostBgClass} cursor-pointer`;
    } else if (props.variant === "disabled" || props.disabled) {
      return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    } else if (props.variant === "loading" || props.loading) {
      return `${baseClasses} ${bgClass} ${textClass} opacity-75 cursor-not-allowed`;
    } else {
      return `${baseClasses} ${bgClass} ${textClass} cursor-pointer`;
    }
  }
});

const buttonStyles = computed(() => {
  // Handle CSS variable values for responsive sizing
  const fontSizeValue = props.fontSize?.startsWith?.('var(') 
    ? props.fontSize 
    : `${props.fontSize}px`;
  
  const baseStyles = {
    height: props.height,
    width: props.width === "full" ? "100%" : props.width,
    fontSize: fontSizeValue,
  }

  // Only apply color inline styles for default variant (not ghost/disabled/loading)
  // Ghost and disabled variants have their own specific styling
  if (!props.ghost && !props.disabled && !props.loading && props.variant === 'default') {
    // Resolve backgroundColor token to hex value for inline style (bulletproof fallback)
    const bgToken = props.backgroundColor || 'accentColor1'
    // Remove 'bg-' prefix if present to get the raw token
    const rawBgToken = bgToken.startsWith('bg-') ? bgToken.slice(3) : bgToken
    const backgroundColorHex = resolveIconColor(rawBgToken) // Gets hex from tailwind.config.js
    
    // Resolve textColor token to hex value for inline style
    const textToken = props.textColor || 'white'
    const rawTextToken = textToken.startsWith('text-') ? textToken.slice(5) : textToken
    const colorHex = resolveIconColor(rawTextToken)

    // BULLETPROOF: Inline styles always work, even if Tailwind class doesn't generate
    baseStyles.backgroundColor = backgroundColorHex
    baseStyles.color = colorHex
  }

  // Ghost button inline style fallback - use textColor for text/border, backgroundColor for bg
  if (props.ghost || props.variant === 'ghost') {
    const colorToken = props.textColor || 'accentColor1';
    const bgToken = props.backgroundColor || 'white';
    const rawColorToken = colorToken.startsWith('text-') ? colorToken.slice(5) : colorToken;
    const rawBgToken = bgToken.startsWith('bg-') ? bgToken.slice(3) : bgToken;
    
    baseStyles.color = resolveIconColor(rawColorToken);
    baseStyles.borderColor = resolveIconColor(rawColorToken);
    baseStyles.backgroundColor = resolveIconColor(rawBgToken);
  }

  return baseStyles
});
</script>

<style scoped></style>
