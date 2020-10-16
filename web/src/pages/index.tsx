import { graphql } from 'gatsby'
import React from 'react'

import { Layout, SEO } from '@components/general'
import { WorldContainer } from '@components/world'

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
