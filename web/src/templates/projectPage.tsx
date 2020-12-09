import React from 'react'

import { graphql } from 'gatsby'

// Components
import { ProjectDetailedContainer } from '@components/projects'
import { SEO } from '@components/general'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5,
}

const ProjectPageTemplate = ({ location, data }) => {
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
      _id
      title
      clients
      director {
        name
      }
      city
      locationGroup {
        _id
        title
      }
      city
      vimeo
      _rawOverview
      content {
        left {
          header
          copy
        }
        middle {
          header
          copy
        }
        right {
          name
          image {
            asset {
              url
            }
          }
        }
      }
    }
    allSanityProject(sort: { fields: order, order: ASC }) {
      edges {
        node {
          order
          _id
          _type
          slug {
            current
          }
          title
          featured
          city
          vimeo
          clients
          quote {
            content
            quotee
          }
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
