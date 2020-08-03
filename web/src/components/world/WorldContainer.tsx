// @ts-nocheck
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';
import { get } from 'lodash'
import { navigate } from 'gatsby'

import World from './World'
import { TextAnim, VerticalAnim, FadeAnim } from '@components/animations'
import { Button } from '@components/general'
import { breakpoints } from '@utils/breakpoints'
import usePrevious from '@hooks/usePrevious'
// import console = require('console');

export enum State {
  INITIALIZING = 0,
  LOADING = 1,
  BACKGROUND = 2,
  PROJECT_DETAILED = 3,
  EXPLORE = 4,
  PROJECT_HOVERED = 5,
}

type StateType = State

const GLOBE_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion';

const WorldContainer = ({ layout, location }) => {
  const [state, setState] = useState<StateType>(State.INITIALIZING)
  const prevState = usePrevious(state)
  const [skipAnimation, setSkipAnimation] = useState<boolean>(false)
  const [project, setProject] = useState<Project | null>(null)

  // useEffect(() => {
  //   console.log('prevstate', prevState)
  //   console.log('state=', state)
  // }, [state])

  useEffect(() => {
    if (state === State.INITIALIZING && layout === 'project-detailed') {
      setSkipAnimation(true)
    }

    if (state <= State.LOADING) return

    switch (layout) {
      case 'other': 
        return setState(State.BACKGROUND)

      case 'project-detailed':
        return setState(State.PROJECT_DETAILED)

      case 'home':
      default:
        return setState(State.EXPLORE)
    }
  }, [layout])

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
            poster {
              asset {
                url
              }
            }
            video {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `)

  const _initStateFromLayout = () => {
    switch (layout) {
      case 'other': 
        return setState(State.BACKGROUND)

      case 'project-detailed': {
        return setState(State.PROJECT_DETAILED)
      }

      case 'home':
      default:
        return setState(State.EXPLORE)
    }
  }

  return (
    <Page className={layout}>
      <CSSTransition in={state > State.INITIALIZING} timeout={{ enter: GLOBE_TRANSITION_LENGTH }} onEntered={() => _initStateFromLayout()} classNames="globe">
        <AnimatedWrapper
          className={`${skipAnimation ? 'skip-animation' : ''}`}
        >
          {/* World component*/}
          <World
            className={`${state === State.PROJECT_HOVERED || state === State.PROJECT_DETAILED ? 'project-active' : ''}`}
            state={state}
            prevState={prevState}
            setState={setState}
            projects={data.allSanityProject.edges}
            project={project}
            setProject={setProject}
            layout={layout}
            location={location}
          />
        </AnimatedWrapper>
      </CSSTransition>
      {state === State.PROJECT_HOVERED && project && (
        <MobileContent>
          <h2 className="subtitle">Video direction</h2>
          <h1>{get(project, 'node.city', get(project, 'node.title', ''))}</h1>
          <p>TRAVIS SCOTT <span>•</span> LOS ANGELES</p>
          <Button 
            buttonStyle="outlined"
            onClick={() => { 
              setState(State.PROJECT_DETAILED)
              navigate(`/projects/${project.node.slug.current}`)
            }}
          >
            VIEW PROJECT
          </Button>
        </MobileContent>
      )}
      <FooterContainer>
        <div className="footer--content">
          <>
            <VerticalAnim in={state === State.PROJECT_HOVERED || state === State.EXPLORE} timeout={{ enter: 4000 }}>
              <img src="/grab-icon.svg" />
            </VerticalAnim>
            <TextAnim 
              in={state === State.PROJECT_HOVERED || state === State.EXPLORE}
              timeout={1000}
              tag="p"
              text={INTRO_TEXT.toUpperCase()}
            />
          </>
        </div>
      </FooterContainer>
      <VideoPreview className={state === State.PROJECT_HOVERED || state === State.PROJECT_DETAILED ? 'visible' : ''}>
        {project && (
          <video id="videoBG" poster={get(project, 'node.poster.asset.url')} playsInline autoPlay muted loop>
            <source src={get(project, 'node.video.asset.url')} type="video/mp4" />
          </video>
        )}
      </VideoPreview>
    </Page>
  );
}

export default WorldContainer

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;

  &.other {
    z-index: -1;
    opacity: 0.4;
  }

  &.project-detailed {
    position: absolute;
    opacity: 1;
  }
`

const AnimatedWrapper = styled.div`
  position: relative;
  max-height: 100vh;
  opacity: 0;
  transform: scale(1);
  will-change: opacity, transform;

  &.globe-enter {
    transform: scale(0);
    opacity: 0;
  }

  &.globe-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: all 1600ms ease-in-out;
  }

  &.globe-enter-done {
    transform: scale(1);
    opacity: 1;
  }

  &.skip-animation {
    transform: scale(1) !important;
    opacity: 1 !important;
    transition: none;
  }

  .project-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;

    @media ${breakpoints.phoneOnly} {
      padding-top: 100px;
      font-size: 18px;
      display: none;
    }
  }

  * { outline: 0 };
`

const MobileContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 0 15px;
  transform: translate(-50%, -50%);
  pointer-events: none;

  button {
    pointer-events: initial;
    display: none;

    @media ${breakpoints.phoneOnly} {
      padding: 1em 2em;
      font-size: 10px;
      border-width: 0.5px;
    }
  }

  p span {
    margin: 0 3px;
    display: inline-block;
  }
`

const VideoPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &.visible {
    opacity: 1;
  }
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
    max-width: 750px;
    font-weight: 400;
    padding-bottom: 30px;

    img {
      margin-bottom: 20px;
      opacity: 0.75;
    }

    p {
      line-height: 1.5em;
      margin-bottom: 0;
      opacity: 0.75;

      &:not(.skip-intro) {
        @media ${breakpoints.phoneOnly} {
          font-size: 12px;
        }
      }
    }

    .skip-intro {
      cursor: pointer;
    }
  }
`