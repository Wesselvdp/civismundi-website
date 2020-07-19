;`declare module '@sanity/block-content-to-react';`
interface Project {
  slug: {
    current: string
  }
  id: string
  title: string
  lat?: string
  lng?: string
  location: {
    lat: number
    lng: number
  }
  director?: any,
  _rawOverview: any
}

interface AllProject {
  edges: { node: Project }[]
}
