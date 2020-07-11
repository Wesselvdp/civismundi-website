// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import * as THREE from 'three'

import World from './World'
import TextAnimated from '@components/TextAnimated'
import LocalizedLink from '@components/LocalizedLink'

type T = any
type TransitionState = 'transition-in' | 'transition-out'
type ScreenCoordinates = { x: string, y: string }
type IntroStatus = 'show' | 'hide'

const INTRO_TEXT = {
  content: 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion',
  hideAfter: 3000
}

const GLOBE_TRANSITION_TIME = 1.6;

const WorldContainer: FC<T> = () => {
  const titleEl = useRef();
  const videoEl = useRef();

  const [transition, setTransition] = useState<TransitionState | undefined>(undefined)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [videoPos, setVideoPos] = useState<ScreenCoordinates | null>(null)
  const [introStatus, setIntroStatus] = useState<IntroStatus | undefined>(undefined)

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

  const _onInitialized = () => {
    setTransition('transition-in');

    setTimeout(() => {
      setIntroStatus('show');

      setTimeout(() => {
        setIntroStatus('hide');
      }, 3000);
    }, 200);
  }

  return (
    <Page>
      <Wrapper className={transition}>
        <World
          height="100%"
          projects={data.allSanityProject.edges}
          onInitialized={_onInitialized}
          introFinished={introStatus === 'hide'}
          activeProject={activeProject}
          setActiveProject={(project: any) => { setActiveProject(project ? project.node : null)} }
          setVideoPos={(coords: ScreenCoordinates) => { setVideoPos(coords)}}
          titleEl={titleEl}
          videoEl={videoEl}
        />
        <TextAnimated showText={!!activeProject} tag="h1" className="title title--main" text={activeProject ? activeProject.title : ''} />
        <LocalizedLink to={activeProject ?  `/projects/${activeProject.slug.current}` : ''}>
          <VideoBox ref={videoEl} style={videoPos ? { left: videoPos.x, top: videoPos.y, opacity: 1 } : { opacity: 0 }}>
              <video id="videoBG" autoPlay muted loop>
                <source src="/stargazing.mp4" type="video/mp4" />
              </video>
              <VideoContent>
                <TextAnimated tag="h6" showText={!!activeProject} text="video direction" className="pre-title" />
                <TextAnimated tag="h6" showText={!!activeProject} text={activeProject ? activeProject.title : ''} className="title" />
              </VideoContent>
          </VideoBox>
        </LocalizedLink>
      </Wrapper>
      <ContentContainer>
        <TextAnimated showText={introStatus === 'show'} tag="h1" className="title" text={INTRO_TEXT.content} />
      </ContentContainer>
    </Page>
  )
}

export default WorldContainer

const Wrapper = styled.div`
  height: 90%;
  width: auto;
  transform: scale(0);
  transition: all ${GLOBE_TRANSITION_TIME}s ease-out;

  .title--main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 86px;
  }

  .video {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
  }

  * { outline: 0 };

  &.transition-in {
    transform: scale(1);
  }
`

const VideoBox = styled.div`
  position: absolute;
  height: 175px;
  width: 350px;
  display: flex;
  overflow: hidden;
  transform: translate(-50%);

  video {
    height: 100%;
    object-fit: cover;
  }
`;

const VideoContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 15px;
  width: 100%;

  .title {
    margin: 0;
    font-size: 28px;
  }

  .pre-title {
    font-size: 16px;
  }
`

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 750px;
  pointer-events: none;

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