/**
 * App Configuration
 * 
 * This file imports data from JSON files (common.json, media.json) at BUILD TIME.
 * Changes to these JSON files require a dev server restart to take effect.
 * 
 * For hot-reload during development, the server must be restarted after modifying:
 * - data/common.json (navbar, footer, announcement, sectionSpacing, strings, etc.)
 * - data/media.json (icon/logo/image registries)
 */
import common from './data/common.json'
import media from './data/media.json'

export default defineAppConfig({
  // Common config
  logoSizes: common.logoSizes,
  navbar: common.navbar,
  footer: common.footer,
  announcement: common.announcement,
  loadingScreen: common.loadingScreen,
  sectionSpacing: common.sectionSpacing,
  protectedPages: common.protectedPages,
  strings: common.strings,

  // Media registries
  iconRegistry: media.iconRegistry,
  logoRegistry: media.logoRegistry,
  imageRegistry: media.imageRegistry
})
