import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uniqBy } from 'lodash'
import { TransitionState } from 'gatsby-plugin-transition-link'

import { Layout, SEO, BackgroundLines, Select, Button } from '@components/general'
import { ProjectList } from '@components/projects'
import { breakpoints } from '@utils/breakpoints'

import localize from '@utils/localize'
// import console = require('console');

type PageProps = {
  data: {
    allSanityProject: AllProject
  },
  transitionStatus: string
}

const options = [
  { title: 'All directors', value: 'all' }
]

const perPage = 4

const ProjectsPage = ({ data, transitionStatus }: PageProps) => {
  const [page, setPage] = useState(0)
  const [director, setDirector] = useState('all')
  const [selectOptions, setSelectOptions] = useState(options)

  useEffect(() => {
    const directorsUnique = uniqBy(
      [].concat(...data.allSanityProject.edges.map(
        p => p.node.director.map(
          director => ({ 
            title: director.name,
            value: director.id 
          })
        )
      )), director => director.value)

    setSelectOptions([...options, ...directorsUnique])
  }, [])

  useEffect(() => {
    setPage(0)
  }, [director])

  

  return (
    <>
      <SEO title="Projects" />
      <Page>
        <BackgroundLines
          subtitle="Projects"
          title="Lorem ipsum dolor sit amet"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
        >
          <Select
            options={selectOptions}
            value={director}
            onChange={(value) => setDirector(value)}
          />
        </BackgroundLines>
        <ProjectList
          projects={data.allSanityProject}
          page={page}
          perPage={perPage}
          onMore={() => setPage(page + 1)}
          director={director}
        />
      </Page>
    </>
  )
}

const Page = styled.div`
  padding-top: 8em;
  min-height: 100vh;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    padding-top: 3em;
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
          video {
            asset {
              url
            }
          }
          director {
            name,
            id
          }
          title
          id
        }
      }
    }
  }
`

export default localize(ProjectsPage)
