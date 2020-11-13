import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uniqBy } from 'lodash'

import { SEO, Hero } from '@components/general'
import { ProjectList } from '@components/projects'
import { breakpoints } from '@utils/breakpoints'

import localize from '@utils/localize'

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

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
        <HeroContainer>
          <Hero
            title="All projects"
            subtitle="List view"
            timeout={{ title: 500, subtitle: 300, content: 0 }}
            onFinished={() => setHeroFinished(true)}
          />
        </HeroContainer>
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
  min-height: 100vh;
  position: relative;
  padding-bottom: 2em;
`

const HeroContainer = styled.div`
  padding-top: 11em;

  @media ${breakpoints.phoneOnly} {
    padding-top: 6em;
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

export default localize(ProjectsPage)
