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
