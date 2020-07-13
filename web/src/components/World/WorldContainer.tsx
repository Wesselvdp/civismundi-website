// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';
import { TransitionState } from 'gatsby-plugin-transition-link'
import { isMobile } from 'react-device-detect'
import { get } from 'lodash'

import World from './World'
import TextAnimation from '@components/TextAnimation'
import VideoThumbnail from '@components/VideoThumbnail'
import { breakpoints } from '@utils/breakpoints'
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');

type ScreenCoordinates = { x: string, y: string }

export enum State {
  INITIALIZING = 0,
  LOADING = 1,
  INTRODUCTION = 2,
  TUTORIAL = 3,
  EXPLORE = 4
}

type StateType = State

const GLOBE_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion';

const TUTORIAL_TEXT = [
  'Grab and drag to navigate around the globe',
  'Click on a project to view a project'
];

const WorldContainer = () => {
  const [state, setState] = useState<StateType>(State.INITIALIZING)
  const [project, setProject] = useState<Project | null>(null)
  const [thumbnailPosition, setThumbnailPosition] = useState<ScreenCoordinates | null>(null)
  const [movingToProject, setMovingToProject] = useState(false)

  useEffect(() => {
    console.log('state', state);
  }, [state])

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
      <TransitionState className="test">
       {({ transitionStatus }) => {
    
        return (
          <Page className={`page-transition-${transitionStatus}`}>
            <CSSTransition in={state >= State.LOADING} timeout={GLOBE_TRANSITION_LENGTH} classNames="globe">
              <Wrapper>
                {/* World component*/}
                <World
                  // page state
                  state={state}
                  setState={setState}
                  // projects
                  projects={data.allSanityProject.edges}
                  project={project}
                  setProject={setProject}
                  // thumbnail
                  setThumbnailPosition={setThumbnailPosition}
                  movingToProject={movingToProject}
                />
                {transitionStatus !== 'exiting' && (
                  <>
                    <TextAnimation
                      inProp={project}
                      appear={true}
                      timeout={1000}
                      tag="h1"
                      className="h1--large project-title"
                      text={get(project, 'node.title', '')}
                      unmountOnExit
                    />
                    {/* project preview thumbnail */}
                    <VideoThumbnail 
                      position={thumbnailPosition} 
                      project={project}
                      moveToProject={() => setMovingToProject(true)}
                    />
                  </>
                )}
              </Wrapper>
            </CSSTransition>
          <ContentContainer>
            {/* introduction text */}
            <TextAnimation 
              inProp={state === State.LOADING} 
              onEntered={() => setState(State.INTRODUCTION)}
              onExited={() => setState(State.TUTORIAL)}
              timeout={{ enter: 5000, exit: 1500 }}
              unmountOnExit
              tag="h1"
              className="h3"
              text={INTRO_TEXT}
              letterSpeedIn={0.01}
            />
          </ContentContainer>
          <FooterContainer>
            <div className="footer--content">
              {state >= State.TUTORIAL && (
                <>
                  <img src="/grab-icon.svg" />
                  {TUTORIAL_TEXT.map(text => <p class="p--small">{text}</p>)}
                </>
              )}
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
  width: 100%;
  max-width: 750px;
  pointer-events: none;

  .h3 {
    font-weight: 300;
  }

  ${isMobile ? 
    `
      max-width: 95%;

      .h3 {
        font-size: 24px;
      }
    ` : ''}
`

const FooterContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;

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
      transition: transform 2s ease-in, opacity 1s ease-in 0.5s;
    }
  }
`