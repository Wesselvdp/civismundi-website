import React, { useState, useEffect, useLayoutEffect } from 'react'

import { graphql } from 'gatsby'
import { TransitionState } from 'gatsby-plugin-transition-link'

// Components
import { ProjectDetailedContainer } from '@components/projects'
import { Layout, SEO } from '@components/general'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5
} 

const ProjectPageTemplate= ({ data }) => {
  const { title } = data.sanityProject

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0,1)
    }
  }, [])

  return (
    <Layout>
      <TransitionState>
       {({ transitionStatus }) => {

        return (
          <>
            <SEO title={`${title} | Projects`} />
            <ProjectDetailedContainer data={data} transitionStatus={transitionStatus} />
          </>
        )}}
      </TransitionState>
    </Layout>
  )
}

export const query = graphql`
  query singleProject($id: String!) {
    sanityProject(id: { eq: $id }) {
      title
      slug {
        current
      }
      video {
        asset {
          url
        }
      }
      poster {
        asset {
          url
        }
      }
      id
      _rawOverview
    }
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          title
          id
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

export default ProjectPageTemplate
