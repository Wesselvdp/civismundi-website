interface Project {
  slug: {
    current: string
  }
  id: string
  title: string
  lat?: string
  lng?: string
}

interface AllProject {
  edges: { node: Project }[]
}
