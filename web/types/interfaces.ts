export interface Project {
  slug: {
    current: string
  }
  title: string
  lat?: string
  lng?: string
}

export interface AllProject {
  edges: { node: Project }[]
}
