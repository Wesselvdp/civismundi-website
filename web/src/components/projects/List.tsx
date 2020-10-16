import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { ProjectCard } from '@components/projects'
import { Button } from '@components/general'
import { FadeListItem } from '@components/animations'

// import console = require('console');

type T = {
  title: string
  blockId?: string // We want to block a project id
  projects: AllProject
  limit?: number
}

const ProjectList: FC<T> = ({
  title,
  projects,
  limit,
  director,
  blockId,
  show = true,
  skipTransition = false,
  doAnimation = true,
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  useEffect(() => {
    const noNodes: Project[] = projects.edges.map((p) => p.node)

    // Filter if blockId is defined
    let filtered: Project[] = blockId
      ? noNodes.filter(({ id }) => id !== blockId)
      : noNodes

    // Filter on director
    filtered =
      director && director !== 'all'
        ? filtered.filter(({ director: directors }) =>
            directors.some((d) => d.id === director)
          )
        : filtered

    filtered = limit ? filtered.slice(0, limit) : filtered

    setFilteredProjects(filtered)
  }, [projects, director])

  return (
    <Container>
      <TitleContainer>
        <h3>{title}</h3>
      </TitleContainer>
      <Grid>
        {filteredProjects.map((p: Project) => (
          <GridItem key={p.id}>
            <FadeListItem visible={show && !!limit}>
              <ProjectCard
                doAnimation={doAnimation}
                skipTransition={skipTransition}
                id={p.id}
                data={p}
              />
            </FadeListItem>
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;

  h3 {
    line-height: 40px;
  }

  button {
    margin-bottom: 2em;
  }
`

const TitleContainer = styled.div`
  padding: 0 15px;
`

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 45px 50px;
  justify-content: center;
  max-width: 100%;
  overflow-y: hidden;

  @media ${breakpoints.phoneOnly} {
    padding: 2em 15px 2em;
  }
`
const GridItem = styled.div`
  padding: 15px;

  @media ${breakpoints.tabletLandscapeUp} {
    max-width: 50%;
  }

  @media ${breakpoints.phoneOnly} {
    padding: 15px 0;
  }
`
export default ProjectList
