export interface PageSectionReference {
  name: string
  component: string | null
  props: Record<string, any>
  show: boolean
  order: number
  gapBefore?: string
  gapAfter?: string
}

export interface PageConfig {
  title: string
  show: boolean
  order: number
  description: string
  sections: PageSectionReference[]
  // Optional page-specific properties
  pageTitle?: string
  subtitle?: string
  categoryButton?: string
  logo?: {
    src: string
    alt: string
  }
  form?: any
}

export interface PagesData {
  [pageKey: string]: PageConfig
}

export interface SectionRegistryEntry {
  id: string
  name: string
  component: string
  description: string
}

export interface SectionRegistryData {
  sections: SectionRegistryEntry[]
}
