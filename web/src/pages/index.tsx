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
  return (
    <SEO title="Home" />
  )
}

export const query = graphql`
  query IndexQuery {
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          title
          city
          location {
            lat
            lng
          }
        }
      }
    }
  }
`

export default IndexPage
