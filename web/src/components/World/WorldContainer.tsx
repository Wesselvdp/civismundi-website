// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import World from './World'
import TextAnimation from '@components/TextAnimation'
import VideoThumbnail from '@components/VideoThumbnail'

// import console = require('console');

type T = any
type ScreenCoordinates = { x: string, y: string }

enum Phase {
  INITIALIZING = 0,
  LOADING = 1,
  INTRO = 2,
  EXPLORE = 3
}

type TransitionPhase = Phase

const GLOBE_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion';
const INTRO_DURATION = 4000;

const WorldContainer: FC<T> = () => {
  const titleEl = useRef();
  const videoEl = useRef();

  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>(Phase.INITIALIZING);
  const [preview, setPreview] = useState<Project | null>(null)
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

  return (
    <Page>
    <CSSTransition in={transitionPhase >= Phase.LOADING} timeout={GLOBE_TRANSITION_LENGTH} classNames="globe">
      <Wrapper>
        <World
          height="100%"
          projects={data.allSanityProject.edges}
          onInitialized={() => setTransitionPhase(Phase.LOADING)}
          introFinished={transitionPhase > Phase.INTRO}
          preview={preview}
          setPreview={(project: any) => { setPreview(project)} }
          setVideoPos={(coords: ScreenCoordinates) => { setVideoPos(coords)}}
          titleEl={titleEl}
          videoEl={videoEl}
        />
        <TextAnimation
          inProp={!!preview}
          appear={true}
          timeout={1000}
          tag="h1"
          className="title title--main"
          text={preview ? preview.node.title : ''}
          unmountOnExit
        />
        <VideoThumbnail videoEl={videoEl} position={videoPos} preview={preview} />
      </Wrapper>
    </CSSTransition>
    <ContentContainer>
      <TextAnimation 
        inProp={transitionPhase === Phase.LOADING} 
        onEntered={() => setTransitionPhase(Phase.EXPLORE)}
        unmountOnExit
        timeout={INTRO_DURATION}
        tag="h1"
        className="title"
        text={INTRO_TEXT}
        letterSpeedIn={0.01}
      />
    </ContentContainer>
  </Page>
  )
}

export default WorldContainer

const Wrapper = styled.div`
  transform: scale(0);

  &.globe-enter {
    transform: scale(0);
  }

  &.globe-enter-active {
    transform: scale(1);
    transition: all 1600ms ease-out;
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

  * { outline: 0 };
`

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 750px;
  // pointer-events: none;

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