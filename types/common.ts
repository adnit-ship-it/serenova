export interface ResponsiveSize {
  mobile: string
  tablet?: string
  desktop: string
}

export interface LogoConfig {
  src: string
  alt: string
}

export interface LogoSizeConfig {
  height: ResponsiveSize
  width: ResponsiveSize
}

export interface NavbarConfig {
  heights: ResponsiveSize
  logo: LogoConfig
}

export interface FooterConfig {
  heights: ResponsiveSize
  logo: LogoConfig
}

export interface AnnouncementConfig {
  enabled: boolean
  text: string
  link?: string
  backgroundColor: string
  textColor: string
  heights: ResponsiveSize
}

export interface LoadingScreenConfig {
  logo: LogoConfig
  text: string
}

export interface SectionSpacing {
  default: ResponsiveSize
}

export interface ButtonStrings {
  next: string
  submitToProvider: string
  back: string
  getStarted: string
}

export interface NavigationStrings {
  home: string
  about: string
  products: string
  contact: string
  contactUs: string
  product: string
}

export interface AccessibilityStrings {
  toggleMenu: string
  brandLogo: string
  menu: string
}

export interface MediaStrings {
  hamburgerMenu: {
    src: string
    alt: string
  }
}

export interface StringsConfig {
  pageTitle: string
  pageDescription?: string
  buttons: ButtonStrings
  navigation: NavigationStrings
  accessibility: AccessibilityStrings
  media: MediaStrings
}

export interface CommonData {
  logoSizes: Record<string, LogoSizeConfig>
  navbar: NavbarConfig
  footer: FooterConfig
  announcement: AnnouncementConfig
  loadingScreen: LoadingScreenConfig
  sectionSpacing: SectionSpacing
  protectedPages: string[]
  strings: StringsConfig
}
