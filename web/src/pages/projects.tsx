import { graphql } from 'gatsby'
import React from 'react'

import { Layout, SEO } from '@components/general'
import { ProjectRelatedSection } from '@components/projects'
import localize from '@utils/localize'

type PageProps = {
  data: {
    allSanityProject: AllProject
  }
}

const ProjectsPage = ({ data }: PageProps) => {
  return (
    <Layout>
      <SEO title="Projects" />
      <ProjectRelatedSection projects={data.allSanityProject} />
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          title
          id
        }
      }
    }
  }
`

export default localize(ProjectsPage)
