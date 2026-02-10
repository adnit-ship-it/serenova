export interface IconEntry {
  type: string
  path: string
  description: string
}

export interface LogoEntry {
  type: string
  path: string
  description: string
}

export interface ImageEntry {
  id: string
  path: string
  alt: string
}

export interface MediaData {
  iconRegistry: Record<string, IconEntry>
  logoRegistry: Record<string, LogoEntry>
  imageRegistry: Record<string, ImageEntry>
}
