export interface LegalPageSeo {
  title?: string
  description?: string
}

export interface LegalPage {
  id: string
  slug: string
  title: string
  footerLabel: string
  lastUpdated: string
  showInFooter: boolean
  order: number
  seo?: LegalPageSeo
  content: string // HTML from rich text editor
}

export interface LegalData {
  pages: LegalPage[]
}
