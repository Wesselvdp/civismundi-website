// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';
import { TransitionState } from 'gatsby-plugin-transition-link'

import World from './World'
import TextAnimation from '@components/TextAnimation'
import VideoThumbnail from '@components/VideoThumbnail'
// import console = require('console');

// import console = require('console');

type T = any
type ScreenCoordinates = { x: string, y: string }

enum Phase {
  INITIALIZING = 0,
  LOADING = 1,
  INTRO = 2,
  TUTORIAL = 3,
  EXPLORE = 4
}

type TransitionPhase = Phase

const GLOBE_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion';
const INTRO_DURATION = 4000;

const TUTORIAL_TEXT = [
  'Grab and drag to navigate around the globe',
  'Click on a project to view a project'
];

const WorldContainer = () => {
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

  const onProjectDetailed = () => {
    console.log('going to a project!!');
  }

  return (
      <TransitionState className="test">
       {({ transitionStatus, exit, entry, mount }) => {
        if (transitionStatus === 'exiting' || transitionStatus === 'exited')console.log("[home] current page's transition status is", transitionStatus)

        return (
          <Page className={`page-transition-${transitionStatus}`}>
            <CSSTransition in={transitionPhase >= Phase.LOADING} timeout={GLOBE_TRANSITION_LENGTH} classNames="globe">
              <Wrapper>
                {/* World component*/}
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
                {/* project preview title */}
                {transitionStatus !== 'exiting' && (
                  <>
                    <TextAnimation
                      inProp={!!preview}
                      appear={true}
                      timeout={1000}
                      tag="h1"
                      className="h1--large project-title"
                      text={preview ? preview.node.title : ''}
                      unmountOnExit
                    />
                    {/* project preview thumbnail */}
                    <VideoThumbnail 
                      videoEl={videoEl} 
                      position={videoPos} 
                      preview={preview} 
                      onProjectDetailed={onProjectDetailed}
                    />
                  </>
                )}
              </Wrapper>
            </CSSTransition>
          <ContentContainer>
            {/* introduction text */}
            <TextAnimation 
              inProp={transitionPhase === Phase.LOADING} 
              onEntered={() => setTransitionPhase(Phase.TUTORIAL)}
              unmountOnExit
              timeout={INTRO_DURATION}
              tag="h1"
              className="title"
              text={INTRO_TEXT}
              letterSpeedIn={0.01}
            />
          </ContentContainer>
          <FooterContainer>
            <div className="footer--content">
              {transitionPhase >= Phase.TUTORIAL && (
                <>
                  <img src="/grab-icon.svg" />
                  {TUTORIAL_TEXT.map(text => <p class="p--small">{text}</p>)}
                </>
              )}
              {/* {TUTORIAL_TEXT.map(text => (
                <TextAnimation
                  inProp={transitionPhase >= Phase.TUTORIAL}
                  timeout={{ enter: 10000 }}
                  onEntered={() => setTransitionPhase(Phase.EXPLORE)}
                  tag="p"
                  text={text}
                  className="p--small"
                  letterSpeedIn={0.01}
                />
              ))} */}
            </div>
          </FooterContainer>
        </Page>
     )}}
    </TransitionState>
  );
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

  .project-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  * { outline: 0 };
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

const FooterContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  .footer--content {
    max-width: 400px;
    font-weight: 400;
    padding: 25px;

    img {
      margin-bottom: 10px;
    }

    p {
      line-height: 1.5em;
      margin-bottom: 0;
      opacity: 0.75;
    }
  }
`

const Page = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  will-change: transform;

  &.page-transition {
    &-entered {
      opacity: 1;
      transform: none;
    }

    &-exiting {
      opacity: 0;
      transform: scale(3);
      transition: transform 2s ease-out, opacity 1.75s ease-in;
    }
  }
`