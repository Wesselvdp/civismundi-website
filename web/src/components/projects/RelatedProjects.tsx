import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { breakpoints } from '@utils/breakpoints'

import { ProjectCard } from '@components/projects'

type T = {
  title: string
  limit?: number // we might want to limit the amount of projects to display
  blockId?: string // We want to block a project id
  projects: AllProject
}

const SectionProjects: FC<T> = ({ title, limit, projects, blockId }) => {
  const [projectsVisible, setProjectsVisible] = useState<Project[]>([])
  console.log(projects)
  useEffect(() => {
    const noNodes: Project[] = projects.edges.map(p => p.node)

    // Filter if blocked is defined
    const filtered: Project[] = blockId
      ? noNodes.filter(({ id }) => id !== blockId)
      : noNodes

    // slice if limit is defined
    const sliced: Project[] = limit ? filtered.slice(0, limit) : filtered
    setProjectsVisible(sliced)
  }, [projects])

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
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 30px;

  h3 {
    line-height: 40px;
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
  margin: 0 auto;
  padding: 15px;

  @media ${breakpoints.phoneOnly} {
    padding: 15px 0;
  }

  @media ${breakpoints.tabletLandscapeUp} {
    flex: calc(50% - 30px) 0 0;
  }
`
export default SectionProjects