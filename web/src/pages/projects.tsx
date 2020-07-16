import { graphql } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Layout, SEO, BackgroundLines, Select, Button } from '@components/general'
import { ProjectList } from '@components/projects'
import { breakpoints } from '@utils/breakpoints'

import localize from '@utils/localize'

type PageProps = {
  data: {
    allSanityProject: AllProject
  }
}

const options = [
  { title: 'All directors', value: 'all' },
  { title: 'Director #1', value: 'director-1' },
  { title: 'Director #2', value: 'director-2' }
]

const perPage = 2

const ProjectsPage = ({ data }: PageProps) => {
  const [page, setPage] = useState(0)
  const [director, setDirector] = useState('all')

  return (
    <Layout>
      <SEO title="Projects" />
      <Page>
        <BackgroundLines
          subtitle="Projects"
          title="Lorem ipsum dolor sit amet"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
        />
        <Select
          options={options}
          value={director}
          onChange={(value) => setDirector(value)}
        />
        <ProjectList
          projects={data.allSanityProject}
          page={page}
          perPage={perPage}
          onMore={() => setPage(page + 1)}
        />
      </Page>
    </Layout>
  )
}

const Page = styled.div`
  padding-top: 8em;
  min-height: 100vh;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    padding-top: 3em;
  }

  select {
    margin-top: 25px;

    @media ${breakpoints.phoneOnly} {
      margin-top: 0;
    }
  }
`

export const query = graphql`
  query ProjectsQuery {
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          poster {
            asset {
              url
            }
          }
          title
          id
        }
      }
    }
  }
`

export default localize(ProjectsPage)
