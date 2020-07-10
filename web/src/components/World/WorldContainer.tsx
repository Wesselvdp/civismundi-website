import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import World from './World'

type T = any
type TransitionState = 'transition-in' | 'transition-out' | undefined
type ScreenCoordinates = { x: string, y: string }

const INTRO_TEXT = {
  content: 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion',
  hideAfter: 3000
}
const WorldContainer: FC<T> = () => {
  const [transition, setTransition] = useState<TransitionState>(undefined);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [videoPos, setVideoPos] = useState<ScreenCoordinates | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  // Projects
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
    setShowIntro(true);
  }, []);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
      }, INTRO_TEXT.hideAfter);

      return () => clearTimeout(timer);
    }
  }, [showIntro])

  return (
    <Page>
      <Wrapper className={transition}>
        <World
          projects={data.allSanityProject.edges}
          onLoaded={() => setTransition('transition-in') }
          activeProject={activeProject}
          setActiveProject={(project: any) => { setActiveProject(project ? project.node : null)} }
          setVideoPos={(coords: ScreenCoordinates) => { setVideoPos(coords)}}
        />
        {activeProject && <h1 className="title">{activeProject.title}</h1>}
        {videoPos && (
          <VideoBox style={{ left: videoPos.x, top: videoPos.y }}>
            <video id="videoBG" autoPlay muted loop>
              <source src="/stargazing.mp4" type="video/mp4" />
            </video>
          </VideoBox>
        )}
      </Wrapper>
      <ContentContainer>
        {showIntro && <h1 className="title">{INTRO_TEXT.content}</h1>}
      </ContentContainer>
    </Page>
  )
}

export default WorldContainer

const Wrapper = styled.div`
  height: 90%;
  width: auto;
  transform: scale(0);
  transition: all 1.6s ease-out;

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 86px;
    pointer-events: none;
  }

  .video {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
  }

  &.transition-in {
    transform: scale(1);
  }
`

const VideoBox = styled.div`
  position: absolute;
  height: 100px;
  width: 200px;
  display: flex;
  overflow: hidden;
  transform: translate(-50%, -50%);

  video {
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 75%;

  .title {
    font-size: 32px;
    margin: 0;
  }
`

const Page = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`