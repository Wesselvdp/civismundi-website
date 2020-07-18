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

const ProjectList: FC<T> = ({ title, projects, page, perPage, onMore, blockId }) => {
  const [projectsVisible, setProjectsVisible] = useState<Project[]>([])
  const [projectsCount, setProjectsCount] = useState<number>(0)

  useEffect(() => {
    const noNodes: Project[] = projects.edges.map(p => p.node)
    setProjectsCount(noNodes.length)

    // Filter if blocked is defined
    const filtered: Project[] = blockId
      ? noNodes.filter(({ id }) => id !== blockId)
      : noNodes

    // slice if limit is defined
    const sliced: Project[] = perPage
      ? filtered.slice(0, ((page || 0) + 1) * perPage)
      : filtered

    setProjectsVisible(sliced)
  }, [projects, page, perPage])

  return (
    <Container>
      <TitleContainer>
        <h3>{title}</h3>
      </TitleContainer>
      <Grid>
        {projectsVisible.map((p: Project) => (
          <GridItem key={p.id}>
            <ProjectCard data={p} />
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

  @media ${breakpoints.phoneOnly} {
    padding: 2em 15px 2em;
  }
`
const GridItem = styled.div`
  flex: 100% 0 0;
  padding: 15px;

  @media ${breakpoints.tabletLandscapeUp} {
    &:nth-child(odd) {
      margin-left: auto;
    }

    &:nth-children(even) {
      margin-right: auto;
    }
  }
  @media ${breakpoints.phoneOnly} {
    padding: 15px 0;
  }

  @media ${breakpoints.tabletLandscapeUp} {
    flex: calc(50% - 30px) 0 0;
  }
`
export default ProjectList
