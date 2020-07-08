import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'

// Components
import TextAnimated from '@components/TextAnimated'
import GlobeComponent from '@components/GlobeComponent'

type T = any

const SectionGlobe: FC<T> = () => {
  const transitionTime = 2000
  const [globeIn, setGlobeIn] = useState<boolean>(false)
  const [globeOut, setGlobeOut] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')
  const [showText, setShowText] = useState<boolean>(false)

  // Data
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allSanityProject {
        edges {
          node {
            slug {
              current
            }
            title
            location {
              lat
              lng
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    console.log('static data', data)
    setTimeout(() => {
      setGlobeIn(true)
    }, transitionTime)
    return () => {
      setGlobeIn(false)
    }
  }, [])

  // Hover
  const handleProjectHover = (project: any) => {
    if (!project) {
      console.log('mouse off')
      setShowText(false)
      return
      // return setProjectName("");
    }
    console.log('mouse on', project)
    setProjectName(project.label)
    setShowText(true)
  }

  // Click
  const handleProjectClick = (project: any) => {
    setShowText(false)
    setGlobeOut(true)
    setTimeout(() => {
      navigate('/projects/stargazing')
    }, transitionTime)
  }

  return (
    <Wrapper>
      <GlobeWrapper
        className={`${globeIn ? 'in' : ''} ${globeOut ? 'out' : ''}`}
      >
        <GlobeComponent
          onProjectClick={handleProjectClick}
          onProjectHover={handleProjectHover}
          projects={data.allSanityProject.edges}
        />
      </GlobeWrapper>
      <TitleContainer>
        <TextAnimated tag={'h1'} showText={showText} text={projectName} />
      </TitleContainer>
    </Wrapper>
  )
}

export default SectionGlobe

const GlobeWrapper = styled.div`
  transform: scale(0);
  transition: all 1.6s ease;
  opacity: 1;
  &.in {
    transform: scale(1);
  }
  &.out {
    transform: scale(1.9);
    opacity: 0;
  }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: absolute;
`
const TitleContainer = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  pointer-events: none;
`
