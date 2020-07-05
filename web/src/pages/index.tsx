import { graphql } from 'gatsby'
import React from 'react'

import Layout from '@components/Layout'
import SEO from '@components/seo'

import GlobeSection from '@components/sections/GlobeSection'

import localize from '@utils/localize'

type PageProps = {
  data: {
    allSanityProject: {
      cities: [
        {
          slug: {
            current: string
          }
          name: string
        }
      ]
    }
  }
}

const IndexPage = ({ data }: PageProps) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <GlobeSection />
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
        }
      }
    }
  }
`

export default localize(IndexPage)
