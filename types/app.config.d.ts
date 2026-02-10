import type {
  ResponsiveSize,
  LogoSizeConfig,
  NavbarConfig,
  FooterConfig,
  AnnouncementConfig,
  LoadingScreenConfig,
  SectionSpacing,
  StringsConfig
} from './common'

import type {
  IconEntry,
  LogoEntry,
  ImageEntry
} from './media'

declare module 'nuxt/schema' {
  interface AppConfigInput {
    // Common config
    logoSizes: Record<string, LogoSizeConfig>
    navbar: NavbarConfig
    footer: FooterConfig
    announcement: AnnouncementConfig
    loadingScreen: LoadingScreenConfig
    sectionSpacing: SectionSpacing
    protectedPages: string[]
    strings: StringsConfig

    // Media registries
    iconRegistry: Record<string, IconEntry>
    logoRegistry: Record<string, LogoEntry>
    imageRegistry: Record<string, ImageEntry>
  }
}

export {}
