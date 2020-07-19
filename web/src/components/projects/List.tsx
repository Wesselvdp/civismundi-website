import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { ProjectCard } from '@components/projects'
import { Button } from '@components/general'
// import console = require('console');

type T = {
  title: string
  blockId?: string // We want to block a project id
  projects: AllProject,
  page?: number,
  perPage?: number,
  onMore?: Function,
}

const ProjectList: FC<T> = ({ title, projects, page, perPage, onMore, director, blockId }) => {
  const [projectsVisible, setProjectsVisible] = useState<Project[]>([])
  const [projectsCount, setProjectsCount] = useState<number>(0)
  const [inViewport, setInViewport] = useState([])

  useEffect(() => {
    const noNodes: Project[] = projects.edges.map(p => p.node)

    // Filter if blocked is defined
    let filtered: Project[] = blockId
      ? noNodes.filter(({ id }) => id !== blockId)
      : noNodes

    console.log('filtered', filtered)
    console.log('director', director)
    filtered = director !== 'all'
      ? filtered.filter(({ director: directors }) => directors.some(d => d.id === director))
      : filtered

    setProjectsCount(filtered.length)

    // slice if limit is defined
    const sliced: Project[] = perPage
      ? filtered.slice(0, ((page || 0) + 1) * perPage)
      : filtered

    setProjectsVisible(sliced)
  }, [projects, page, perPage, director])

  return (
    <Container>
      <TitleContainer>
        <h3>{title}</h3>
      </TitleContainer>
      <Grid>
        {projectsVisible.map((p: Project) => (
          <GridItem key={p.id}>
            <ProjectCard id={p.id} data={p} allViewport={inViewport} onLeaveViewport={() => setInViewport(inViewport.filter(n => n !== p.id))} onEnterViewport={() => setInViewport([...inViewport, p.id])} />
          </GridItem>
        ))}
      </Grid>
      {onMore && projectsVisible.length < projectsCount && (
        <Button buttonStyle="outlined" onClick={onMore}>
          SEE MORE
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
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
