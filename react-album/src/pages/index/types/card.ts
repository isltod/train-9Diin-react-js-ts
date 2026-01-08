export interface CardDTO {
  alt_description: string
  alternative_slugs: any
  asset_type: string
  blur_hash: string
  bookmarked: boolean
  breadcrumbs: []
  color: string
  created_at: string
  current_user_collections: []
  description?: string
  height: number
  id: string
  liked_by_user: boolean
  likes: number
  links: Link
  promoted_at?: string
  slug: string
  sponsorship?: string
  tags: Tag[]
  topic_submissions: any
  updated_at: string
  urls: URL
  user: any
  width: number
}
export interface Tag {
  source: {
    ancestry: any
    cover_photo: any
    description: string
    meta_description: string
    meta_title: string
    subtitle: string
    title: string
  }
  title: string
  type: string
}


interface Link {
  self: string
  html: string
  download: string
  download_location: string
}

interface URL {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
}
