import { graphql } from 'gatsby'
import React from 'react'

import Layout from '@components/Layout'
import SEO from '@components/seo'

import WorldContainer from '@components/World/WorldContainer'

type PageProps = {
  data: {
    allSanityProject: {
      edges: Project
    }
  }
}

const IndexPage = ({ data }: PageProps) => {
  return (
    <Layout>
      <SEO title="Home" />
      <WorldContainer />
    </Layout>
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
