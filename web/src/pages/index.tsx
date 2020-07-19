import { graphql } from 'gatsby'
import React from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'

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
    <Layout style={{ overflow: 'hidden', height: '100vh' }}>
      <TransitionState>
        {({ transitionStatus }) => {
          return (
            <>
              <SEO title="Home" />
              <WorldContainer transitionStatus={transitionStatus} />
            </>
          )
        }}
      </TransitionState>
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
