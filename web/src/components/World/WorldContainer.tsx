// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';

import * as THREE from 'three'

import World from './World'
import TextAnimated from '@components/TextAnimated'
import TextAnimation from '@components/TextAnimation'

type T = any
type Phase = 'globe-in'
type ScreenCoordinates = { x: string, y: string }

const GLOBE_TRANSITION_LENGTH = 1600;
const INTRO_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = {
  content: 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion',
  hideAfter: 3000
}


const WorldContainer: FC<T> = () => {
  const titleEl = useRef();
  const videoEl = useRef();

  const [transitionPhase, setTransitionPhase] = useState<Phase | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [videoPos, setVideoPos] = useState<ScreenCoordinates | null>(null)

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
    setTransitionPhase('globe-in');
  }

  return (
    <Page>
      <CSSTransition in={transitionPhase === 'globe-in'} timeout={GLOBE_TRANSITION_LENGTH} classNames="globe">
        <Wrapper>
          <World
            height="100%"
            projects={data.allSanityProject.edges}
            onInitialized={_onInitialized}
            introFinished={!!(transitionPhase && transitionPhase !== 'globe-in')}
            activeProject={activeProject}
            setActiveProject={(project: any) => { setActiveProject(project ? project.node : null)} }
            setVideoPos={(coords: ScreenCoordinates) => { setVideoPos(coords)}}
            titleEl={titleEl}
            videoEl={videoEl}
          />
          <TextAnimated showText={!!activeProject} tag="h1" className="title title--main" text={activeProject ? activeProject.title : ''} />

          <VideoBox ref={videoEl} style={videoPos ? { left: videoPos.x, top: videoPos.y, opacity: 1 } : { opacity: 0 }}>
            <video id="videoBG" autoPlay muted loop>
              <source src="/stargazing.mp4" type="video/mp4" />
            </video>
            <VideoContent>
              <TextAnimated tag="h6" showText={!!activeProject} text="video direction" className="pre-title" />
              <TextAnimated tag="h6" showText={!!activeProject} text={activeProject ? activeProject.title : ''} className="title" />
            </VideoContent>
          </VideoBox>
        </Wrapper>
      </CSSTransition>

      <ContentContainer>
        <TextAnimation inProp={transitionPhase === 'globe-in'} timeout={INTRO_TRANSITION_LENGTH} tag="h1" className="title" text={INTRO_TEXT.content} />
      </ContentContainer>
    </Page>
  )
}

export default WorldContainer

const Wrapper = styled.div`
  height: 90%;
  width: auto;
  transform: scale(0);

  &.globe-enter {
    transform: scale(0);
  }

  &.globe-enter-active {
    transform: scale(1);
    transition: all ${GLOBE_TRANSITION_LENGTH}ms ease-out;
  }

  &.globe-enter-done {
    transform: scale(1);
  }

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