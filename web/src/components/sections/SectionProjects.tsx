import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { breakpoints } from '@utils/breakpoints'

import ProjectCard from '@components/ProjectCard'
import Button from '@components/Button'
import LocalizedLink from '@components/LocalizedLink'
import { ECKeyPairKeyObjectOptions } from 'crypto'

type T = {
  limit?: number // we might want to limit the amount of projects to display
  blockId?: string // We want to block a project id
  projects: AllProject
}

const SectionProjects: FC<T> = ({ limit, projects, blockId }) => {
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
    <>
      <h3>Other projects</h3>
      <Grid>
        {projectsVisible.map((p: Project) => (
          <GridItem key={p.id}>
            <ProjectCard data={p} />
          </GridItem>
        ))}
      </Grid>

      <Button buttonStyle="outlined">
        <LocalizedLink to="/projects">See all </LocalizedLink>
      </Button>
    </>
  )
}

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const GridItem = styled.div`
  flex: 100% 0 0;
  margin: 0 auto;
  padding: 15px;

  @media ${breakpoints.tabletLandscapeUp} {
    flex: calc(50% - 30px) 0 0;
  }
`
export default SectionProjects
