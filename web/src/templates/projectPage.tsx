import React, { useState, useEffect, useLayoutEffect } from 'react'

import { graphql } from 'gatsby'

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

const ProjectPageTemplate= ({ location, data }) => {
  const { title } = data.sanityProject

  return (
    <>
      <SEO title={`${title} | Projects`} />
      <ProjectDetailedContainer data={data} location={location} />
    </>
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
      _id
      locationGroup {
        _id
        title
      }
      _rawOverview
    }
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

export default ProjectPageTemplate
