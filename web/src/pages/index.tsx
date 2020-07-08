import { graphql } from 'gatsby'
import React from 'react'

import Layout from '@components/Layout'
import SEO from '@components/seo'

import GlobeSection from '@components/sections/GlobeSection'
import VideoThumbnail from '@components/VideoThumbnail'

import localize from '@utils/localize'

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
      <GlobeSection projects={data.allSanityProject} />
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
