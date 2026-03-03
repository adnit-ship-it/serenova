import designTokens from './data/designTokens.json'

const colors = designTokens.colors?.primary || {}
const accent1 = colors.accent1 ?? '#750021'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Colors from designTokens.json (single source of truth)
        backgroundColor: colors.background ?? '#FDFAF6',
        bodyColor: colors.body ?? '#000000',
        accentColor1: {
          DEFAULT: accent1,
          50: `color-mix(in srgb, ${accent1} 50%, transparent)`,
        },
        accentColor2: colors.accent2 ?? '#AA7585',
      },
      fontFamily: {
        // Fonts automatically loaded from designTokens.json
        headingFont: [designTokens.fonts.heading, "sans-serif"],
        bodyFont: [designTokens.fonts.body, "sans-serif"],
        defaultSerif: [designTokens.fonts.serif, "serif"],
      },
    },
  },
  plugins: [],
};
