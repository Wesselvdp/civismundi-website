export interface Project {
  slug: {
    current: string
  }
  title: string
  lat?: string
  lng?: string
  location?: {
    lat: number
    lng: number
  }
}

export interface AllProject {
  edges: { node: Project }[]
}
