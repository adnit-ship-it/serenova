/**
 * Reusable motion animation presets for v-motion directive
 * Provides consistent animations across the site
 * 
 * Usage:
 * ```vue
 * <script setup>
 * const { fadeUp } = useMotionPresets()
 * </script>
 * 
 * <template>
 *   <h1 v-motion v-bind="fadeUp(50)">Heading</h1>
 * </template>
 * ```
 */
export function useMotionPresets() {
  /**
   * Standard fade-up animation (100px offset)
   * @param delay - Animation delay in ms (default: 0)
   */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 100 },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 500,
        type: 'ease-in',
        stiffness: 250,
        damping: 25,
        mass: 1,
        delay
      }
    }
  })

  /**
   * Subtle fade-up animation (32px offset)
   * Good for smaller elements or secondary content
   * @param delay - Animation delay in ms (default: 0)
   */
  const fadeUpSubtle = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 400,
        type: 'ease-in',
        stiffness: 250,
        damping: 25,
        mass: 1,
        delay
      }
    }
  })

  /**
   * Fade in only (no movement)
   * Good for background images or overlay elements
   * @param delay - Animation delay in ms (default: 0)
   */
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    visibleOnce: {
      opacity: 1,
      transition: { duration: 400, delay }
    }
  })

  /**
   * Slight fade with small y offset (8px)
   * Good for navbar and subtle UI elements
   * @param delay - Animation delay in ms (default: 0)
   */
  const fadeUpMinimal = (delay = 0) => ({
    initial: { opacity: 0.3, y: 8 },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 400,
        type: 'ease-in',
        stiffness: 250,
        damping: 25,
        mass: 1,
        delay
      }
    }
  })

  return { fadeUp, fadeUpSubtle, fadeIn, fadeUpMinimal }
}
