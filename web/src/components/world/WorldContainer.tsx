// @ts-nocheck
import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group';
import { get } from 'lodash'
import {useSpring, animated as a} from 'react-spring'

import World from './World'
import VideoThumbnail from './VideoThumbnail'
import { TextAnim, FadeAnim, RotateAnim } from '@components/animations'
import { breakpoints } from '@utils/breakpoints'

type ScreenCoordinates = { x: string, y: string }

export enum State {
  INITIALIZING = 0,
  LOADING = 1,
  EXPLORE = 2
}

type StateType = State

const GLOBE_TRANSITION_LENGTH = 1600;

const INTRO_TEXT = 'A collective of interdisciplinary creatives whose collaborative practice seeks to navigate the confluence of film, music, design and fashion';

const WorldContainer = ({ transitionStatus }) => {
  const [state, setState] = useState<StateType>(State.INITIALIZING)
  const [project, setProject] = useState<Project | null>(null)

  const [progress, setProgress] = useState({ loaded: 0, total: 1 })

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

  return (
    <>
      <Page className={`page-transition-${transitionStatus}`}>
        <CSSTransition in={state >= State.LOADING} timeout={{ enter: GLOBE_TRANSITION_LENGTH }} onEntered={() => setState(State.EXPLORE)} classNames="globe">
          <Wrapper>
            {/* World component*/}
            <World
              className={`${project ? 'project-active' : ''}`}
              // page state
              state={state}
              setState={setState}
              // projects
              projects={data.allSanityProject.edges}
              project={project}
              setProject={setProject}
              // progress
              setProgress={setProgress}
            />
            {transitionStatus !== 'exiting' && (
              <TextAnim
                inProp={project}
                appear={true}
                timeout={1000}
                tag="h1"
                className="project-title"
                text={get(project, 'node.city', get(project, 'node.title', ''))}
                unmountOnExit
              />
            )}
          </Wrapper>
        </CSSTransition>
      <ContentContainer />
      {transitionStatus !== 'exiting' && (
        <FooterContainer>
          <div className="footer--content">
            <TextAnim 
              in={state > State.LOADING}
              timeout={1000} 
              tag="p"
              text={INTRO_TEXT}
            />
          </div>
        </FooterContainer>
      )}
      <VideoPreview className={project ? 'visible' : ''}>
        {project && (
          <video id="videoBG" poster={get(project, 'node.poster.asset.url')} playsInline autoPlay muted loop>
            <source src={get(project, 'node.video.asset.url')} type="video/mp4" />
          </video>
        )}
      </VideoPreview>
    </Page>
  </>
  );
}

export default WorldContainer

const Wrapper = styled.div`
  transform: scale(0);
  opacity: 0;
  position: relative;
  max-height: 100vh;

  &.globe-enter {
    transform: scale(0);
    opacity: 1;
  }

  &.globe-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: all 1600ms ease-in;
  }

  &.globe-enter-done {
    transform: scale(1);
    opacity: 1;
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
    }
  }

  * { outline: 0 };
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

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  max-width: 90%;
  pointer-events: none;

  @media ${breakpoints.phoneOnly} {
    width: 100%;
    padding: 0 15px;

    .intro {
      font-size: 26px;
    }
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
      margin-bottom: 10px;
      transform: rotate3d(0, 1, 0, -180);
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

const Page = styled.div`
  position: relative;
  height: 100vh;
  height: fill-available;
  max-height: 100vh;
  overflow: hidden;
  will-change: opacity;

  &.page-transition {
    &-entered {
      opacity: 1;
    }

    &-exiting {
      opacity: 0;
      transition: opacity 2s ease-in;
    }
  }

  @media ${breakpoints.phoneOnly} {
    will-change: opacity, transform;

    &.page-transition {
      &-entered {
        transform: scale(1);
      }

      &-exiting {
        opacity: 0;
        transform: scale(3);
        transition: transform 2s ease-in-out, opacity 1s ease-in-out 0.5s;
      }
    }
  }
`