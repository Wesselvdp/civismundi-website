import { graphql } from 'gatsby'
import React from 'react'

import Layout from '@components/Layout'
import SEO from '@components/seo'

import GlobeSection from '@components/sections/GlobeSection'
// import { Project } from '@types/interfaces'

import localize from '@utils/localize'
import SectionProjects from '@components/sections/SectionProjects'

type PageProps = {
  data: {
    allSanityProject: AllProject
  }
}

const ProjectsPage = ({ data }: PageProps) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Projets" />
      <SectionProjects projects={data.allSanityProject} />
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
