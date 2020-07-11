// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';

import * as THREE from 'three'

import World from './World'
import TextAnimated from '@components/TextAnimated'
import TextAnimation from '@components/TextAnimation'
import LocalizedLink from '@components/LocalizedLink'
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
        {transitionPhase >= Phase.EXPLORE && (
          <>
            <TextAnimated showText={!!preview} tag="h1" className="title title--main" text={preview ? preview.node.title : ''} />
            <LocalizedLink to={preview ?  `/projects/${preview.node.slug.current}` : ''}>
              <VideoBox ref={videoEl} style={videoPos ? { left: videoPos.x, top: videoPos.y, opacity: 1 } : { opacity: 0 }}>
                  <video id="videoBG" autoPlay muted loop>
                    <source src="/stargazing.mp4" type="video/mp4" />
                  </video>
                  <VideoContent>
                    <TextAnimated tag="h6" showText={!!preview} text="video direction" className="pre-title" />
                    <TextAnimated tag="h6" showText={!!preview} text={preview ? preview.node.title : ''} className="title" />
                  </VideoContent>
              </VideoBox>
            </LocalizedLink>
          </>
        )}
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