import { graphql } from 'gatsby'
import React from 'react'

import { SEO } from '@components/general'

type PageProps = {
  data: {
    allSanityProject: {
      edges: Project
    }
  }
}

const IndexPage = ({ data }: PageProps) => {
  return <SEO title="Home" />
}

export const query = graphql`
  query IndexQuery {
    allSanityProject {
      edges {
        node {
          _id
          _type
          slug {
            current
          }
          title
          featured
          city
          clients
          location {
            lat
            lng
          }
          locationGroup {
            _id
            title
            location {
              lat
              lng
            }
          }
          poster {
            asset {
              url
            }
          }
          video {
            asset {
              url
            }
          }
        }
      }
    }
  }
`

export default IndexPage
