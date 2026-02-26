<template>
  <nav 
    :class="[
      'navbar w-full fixed z-50 flex justify-center shadow-lg',
      navbarBackgroundColorClass
    ]"
    :style="navbarStyles"
  >
    <div v-motion v-bind="fadeUpMinimal()" :class="[
        'navbar-inner lg:max-w-[1328px] w-full flex justify-center px-4 md:px-8 pb-2 md:pb-0',
        props.hideNavigation ? 'justify-center' : 'justify-between',
      ]">
      <!-- Mobile hamburger menu on the left -->
      <button v-if="!props.hideNavigation" class="md:hidden rounded" :aria-label="config.strings.accessibility.toggleMenu" @click="toggleMobileMenu">
        <img :src="config.strings.media.hamburgerMenu.src" :alt="config.strings.accessibility.menu" class="h-4 w-4" />
      </button>

      <!-- Logo on center-->
      <div class="flex items-center">
        <NuxtLink to="/">
          <img :src="navbarLogoSrc" :alt="navbarLogoAlt" class="navbar-logo" />
        </NuxtLink>
      </div>
      <div class="flex items-center gap-10">

        <!-- Navigation links in middle -->
        <div v-if="!props.hideNavigation" class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="page in navigationPages" 
            :key="page.key"
            :to="pagesStore.getPageRoute(page.key)"
          >
            <p :class="[navbarTextColorClass, 'text-lg font-medium']">
              {{ page.title }}
            </p>
          </NuxtLink>
        </div>

        <!-- Get Started button on right -->
        <div v-if="!props.hideNavigation" class="flex flex-row items-center md:gap-3 relative">
          <NuxtLink to="/consultation" class="hidden md:block">
            <UiButton background-color="white" text-color="accentColor1" width="176px" height="32px" font-size="20">
              {{ config.strings.buttons.getStarted }}
            </UiButton>
          </NuxtLink>
          <NuxtLink to="/consultation" class="block md:hidden">
            <UiButton background-color="white" text-color="accentColor1" width="144px" height="28px" font-size="18">
              {{ config.strings.buttons.getStarted }}
            </UiButton>
          </NuxtLink>

          <!-- Mobile dropdown menu -->
          <div v-if="isMobileMenuOpen"
            class="lg:hidden absolute top-full right-36 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div class="py-2">
              <NuxtLink 
                v-for="page in navigationPages"
                :key="page.key"
                :to="pagesStore.getPageRoute(page.key)"
                class="block px-4 py-2 text-black text-lg font-medium hover:bg-gray-100"
                @click="closeMobileMenu"
              >
                {{ page.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePagesStore } from '~/stores/pagesStore'
import { useMotionPresets } from '~/composables/useMotionPresets'
import { resolveColorToken } from '~/utils/colorTokens'

const pagesStore = usePagesStore();
const config = useAppConfig();
const navigationPages = computed(() => pagesStore.navigationPages);

// Use shared composables
const { fadeUpMinimal } = useMotionPresets();

// Define the color prop with a default value of 'bg-white'
const props = defineProps({
  color: {
    type: String,
    default: "bg-white",
  },
  hideNavigation: {
    type: Boolean,
    default: false,
  },
});

// Get navbar logo from global config
const navbarLogoSrc = computed(() => config.navbar.logo.src);
const navbarLogoAlt = computed(() => config.navbar.logo.alt || config.strings.accessibility.brandLogo || "Brand logo");

// Navbar colors from config - prop overrides config only when explicitly provided
const navbarBackgroundColorClass = computed(() => {
  // If color prop is explicitly provided (not the default), use it for backward compatibility
  if (props.color !== 'bg-white') {
    return props.color
  }
  // Otherwise use config value from common.json
  const bgToken = config.navbar?.backgroundColor || 'accentColor1'
  return resolveColorToken(bgToken, 'bg')
})

const navbarTextColorClass = computed(() => {
  const textToken = config.navbar?.textColor || 'white'
  return resolveColorToken(textToken, 'text')
})

// CSS variables for responsive sizes from common.json via app.config
const responsiveCSSVars = computed(() => {
  const logoSizes = config.logoSizes?.navbar
  const heights = config.navbar.heights
  const announcementEnabled = config.announcement?.enabled
  const announcementHeights = announcementEnabled ? config.announcement.heights : null
  return {
    '--navbar-height': heights?.mobile || '83px',
    '--navbar-height-tablet': heights?.tablet || heights?.desktop || '68px',
    '--navbar-height-desktop': heights?.desktop || '68px',
    '--navbar-logo-height': logoSizes?.height?.mobile || '24px',
    '--navbar-logo-height-tablet': logoSizes?.height?.tablet || logoSizes?.height?.desktop || '28px',
    '--navbar-logo-height-desktop': logoSizes?.height?.desktop || '28px',
    '--navbar-top': announcementHeights?.mobile || '0px',
    '--navbar-top-tablet': announcementHeights?.tablet || '0px',
    '--navbar-top-desktop': announcementHeights?.desktop || '0px'
  }
})

// Combined navbar styles including positioning
const navbarStyles = computed(() => ({
  ...responsiveCSSVars.value
}))

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest("nav")) {
    closeMobileMenu();
  }
};

// Add click outside listener
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Responsive navbar positioning below announcement bar */
.navbar {
  top: var(--navbar-top);
}

@media (min-width: 768px) {
  .navbar {
    top: var(--navbar-top-tablet);
  }
}

@media (min-width: 1024px) {
  .navbar {
    top: var(--navbar-top-desktop);
  }
}

/* Responsive navbar height using CSS variables - no JS flicker */
.navbar-inner {
  height: var(--navbar-height);
}

@media (min-width: 768px) {
  .navbar-inner {
    height: var(--navbar-height-tablet);
  }
}

@media (min-width: 1024px) {
  .navbar-inner {
    height: var(--navbar-height-desktop);
  }
}

/* Responsive logo sizing using CSS variables - no JS flicker */
.navbar-logo {
  height: var(--navbar-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .navbar-logo {
    height: var(--navbar-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .navbar-logo {
    height: var(--navbar-logo-height-desktop);
  }
}
</style>
