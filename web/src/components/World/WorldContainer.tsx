// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import * as THREE from 'three'

import World from './World'
import TextAnimated from '@components/TextAnimated'

type T = any
type TransitionState = 'transition-in' | 'transition-out' | undefined
type ScreenCoordinates = { x: string, y: string }

const INTRO_TEXT = {
  content: 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion',
  hideAfter: 3000
}

const GLOBE_TRANSITION_TIME = 1.6;

const WorldContainer: FC<T> = () => {
  const titleEl = useRef();
  const videoEl = useRef();

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

  const _onInitialized = () => {
    setTransition('transition-in');

    setTimeout(() => {
      setShowIntro(true);

      setTimeout(() => {
        setShowIntro(false);
      }, 3000);
    }, 200);
  }

  return (
    <Page>
      <Wrapper className={transition}>
        <World
          projects={data.allSanityProject.edges}
          onInitialized={_onInitialized}
          activeProject={activeProject}
          setActiveProject={(project: any) => { setActiveProject(project ? project.node : null)} }
          setVideoPos={(coords: ScreenCoordinates) => { setVideoPos(coords)}}
          setActiveLabelObj={(obj: any) => { _setActiveLabelObj(obj); }}
          titleEl={titleEl}
          videoEl={videoEl}
        />
        <TextAnimated showText={!!activeProject} tag="h1" className="title" text={activeProject ? activeProject.title : ''} />
        <VideoBox ref={videoEl} style={videoPos ? { left: videoPos.x, top: videoPos.y, opacity: 1 } : { opacity: 0 }}>
          <video id="videoBG" autoPlay muted loop>
            <source src="/stargazing.mp4" type="video/mp4" />
          </video>
        </VideoBox>
      </Wrapper>
      <ContentContainer>
        <TextAnimated showText={showIntro} tag="h1" className="title" text={INTRO_TEXT.content} />
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
  outline: 0;

  .title {
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
    transform: scale(0.9);
  }
`

const VideoBox = styled.div`
  position: absolute;
  height: 100px;
  width: 200px;
  display: flex;
  overflow: hidden;
  transform: translate(-50%);

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