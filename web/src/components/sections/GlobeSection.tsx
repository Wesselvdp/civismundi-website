import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

// Components
import TitleAnimated from '@components/TitleAnimated'
import GlobeComponent from '@components/GlobeComponent'

type T = any

const SectionGlobe: FC<T> = () => {
  const [globeIn, setGlobeIn] = useState<boolean>(false)
  const [globeOut, setGlobeOut] = useState<boolean>(false)

  const [projectName, setProjectName] = useState<string>('')
  const [showText, setShowText] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setGlobeIn(true)
    }, 2000)
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
    console.log(project)
    setShowText(false)
    setGlobeOut(true)
  }

  return (
    <Wrapper>
      <GlobeWrapper
        className={`${globeIn ? 'in' : ''} ${globeOut ? 'out' : ''}`}
      >
        <GlobeComponent
          onProjectClick={handleProjectClick}
          onProjectHover={handleProjectHover}
        />
      </GlobeWrapper>
      <TitleContainer>
        <TitleAnimated showText={showText} text={projectName} />
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
