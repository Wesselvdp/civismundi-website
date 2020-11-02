import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uniqBy } from 'lodash'

import { SEO, Hero, Select } from '@components/general'
import { ProjectList } from '@components/projects'
import { FadeAnim } from '@components/animations'
import { breakpoints } from '@utils/breakpoints'

import localize from '@utils/localize'

type PageProps = {
  data: {
    allSanityProject: AllProject
  }
  transitionStatus: string
}

const options = [{ title: 'All directors', value: 'all' }]

const perPage = 4

const ProjectsPage = ({ data, transitionStatus }: PageProps) => {
  const [page, setPage] = useState(0)
  const [director, setDirector] = useState('all')
  const [selectOptions, setSelectOptions] = useState(options)
  const [heroFinished, setHeroFinished] = useState(false)

  useEffect(() => {
    console.log(data)
    const directorsUnique = uniqBy(
      [].concat(
        ...data.allSanityProject.edges.map((p) =>
          p.node.director.map((director) => ({
            title: director.name,
            value: director.id,
          }))
        )
      ),
      (director) => director.value
    )

    setSelectOptions([...options, ...directorsUnique])
  }, [])

  useEffect(() => {
    setPage(0)
  }, [director])

  return (
    <>
      <SEO title="Projects" />
      <Page>
        <Hero
          subtitle="Projects"
          title="Lorem ipsum dolor sit amet"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
          timeout={{ title: 500, content: 1000 }}
          onFinished={() => setHeroFinished(true)}
        />
          {/* <FadeAnim in={heroFinished} timeout={1000}>
            <Select
              options={selectOptions}
              value={director}
              onChange={(value) => setDirector(value)}
            />
  </FadeAnim> */}
        {heroFinished && (
          <ProjectList
            projects={data.allSanityProject}
            page={page}
            perPage={perPage}
            onMore={() => setPage(page + 1)}
            director={director}
            doAnimation={false}
            skipTransition={true}
          />
        )}
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
          _id
          _type
          id
          slug {
            current
          }
          director {
            name
            id
          }
          title
          featured
          city
          clients
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

export default localize(ProjectsPage)
