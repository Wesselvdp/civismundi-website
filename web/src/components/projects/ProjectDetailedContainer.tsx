import React, { useState, useEffect } from 'react'
import { Link, Element } from 'react-scroll'
import styled, { keyframes } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'

import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import ModalVideo from 'react-modal-video'

import PlaySVG from '../../assets/play.svg'
import NextSVG from '../../assets/btn-next.svg'
import PrevSVG from '../../assets/btn-prev.svg'
import GlobeSVG from '../../assets/globe-icon.svg'

// Components
import { ProjectList } from '@components/projects'
import { TextAnim, TextImprov } from '@components/animations'
import { GlobeButton, ProjectSlider } from '@components/general'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5,
  SLIDER_IN = 6,
}

const ProjectDetailedContainer = ({ location, data }) => {
  const { title, id, _rawOverview } = data.sanityProject
  const dispatch = useDispatch()
  const world = useSelector((state) => state.world)
  const [state, setState] = useState(ProjectState.LOADING)
  const [videoOpen, openVideo] = useState(false)

  useEffect(() => {
    let timer

    if (world.ready && !world.fading) {
      timer = setTimeout(() => {
        setState(ProjectState.SUBTITLE_IN)
      }, get(location, 'state.delay', 0))
    }

    return () => {
      clearTimeout(timer)
    }
  }, [world.ready, world.fading])

  useEffect(() => {
    if (state === ProjectState.VIDEO_BUTTON_IN) {
      setTimeout(() => {
        setState(ProjectState.SLIDER_IN)
      }, 1500)
    }
  }, [state])

  const locState = location.state || {}
 
  return (
    <>
      <ModalWrapper className={videoOpen ? 'open' : ''}>
        <ModalVideo
          channel="vimeo"
          isOpen={videoOpen}
          videoId="397128195"
          onClose={() => openVideo(false)}
          width={1000}
          height={1000}
        />
        <img
          className="modal-close"
          src="/close.svg"
          onClick={() => openVideo(false)}
        />
      </ModalWrapper>
      <StyledMast className={locState.doAnimation ? 'instant' : 'fade-in'}>
        <Content>
          <div className="upper">
            <TextAnim
              in={!world.fading && state >= ProjectState.SUBTITLE_IN}
              timeout={{ enter: 300 }}
              onEntered={() => setState(ProjectState.TITLE_IN)}
              className="subtitle"
              tag="h2"
              text="Video direction"
            />
            <TextAnim
              in={!world.fading && state >= ProjectState.TITLE_IN}
              timeout={{ enter: 300 }}
              onEntered={() => setState(ProjectState.PARAGRAPH_IN)}
              className="h2"
              tag="h1"
              text={title}
            />
            <TextAnim
              in={!world.fading && state >= ProjectState.PARAGRAPH_IN}
              timeout={{ enter: 600 }}
              onEntered={() =>
                locState.doAnimation && setState(ProjectState.VIDEO_BUTTON_IN)
              }
              tag="p"
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor"
              letterSpeedIn={0.01}
              singleLine={false}
            />
            {(!locState.doAnimation ||
              state >= ProjectState.VIDEO_BUTTON_IN) && (
              <>
                <div className="button-container">
                  {world.active.area && (
                    <PrevSVG
                      className={locState.doAnimation && 'with-anim'}
                      onClick={() =>
                        dispatch(
                          setWorldMode(WorldMode.PROJECT_DETAILED, {
                            marker: world.areaProjects[1],
                            navigate: true,
                          })
                        )
                      }
                    />
                  )}
                  <PlayButton>
                    <PlaySVG
                      className={locState.doAnimation && 'with-anim'}
                      onClick={() => openVideo(true)}
                    />
                  </PlayButton>
                  {world.active.area && (
                    <NextSVG
                      className={locState.doAnimation && 'with-anim'}
                      onClick={() =>
                        dispatch(
                          setWorldMode(WorldMode.PROJECT_DETAILED, {
                            project: world.active.areaProjects[2],
                          })
                        )
                      }
                    />
                  )}
                </div>
                <GlobeIcon
                  className={locState.doAnimation && 'with-anim'}
                  onClick={() =>
                    dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
                  }
                >
                  <img src="/globe-icon.svg" />
                </GlobeIcon>
              </>
            )}
          </div>
        </Content>
        {world.active.area && (
          <SliderWrapper>
            <ProjectSlider
              className="project-slider"
              show={!locState.doAnimation || state === ProjectState.SLIDER_IN}
            />
          </SliderWrapper>
        )}
      </StyledMast>

      {/* Project content */}
      <Element name="content">
        <Section>
          <div className="container">
            <div className="row">
              <div className="col meta">
                <div>
                  <h5 className="subtitle">DIRECTED BY</h5>
                  <h5>NABIL ELDERKIN</h5>
                </div>
                <div>
                  <h5 className="subtitle">LOCATION</h5>
                  <h5>LOS ANGELES</h5>
                </div>
                <div>
                  <h5 className="subtitle">AWARDS</h5>
                  <h5>LOS ANGELES</h5>
                </div>
              </div>
              <div className="col content content--sanity">
                <BlockContent blocks={_rawOverview} />
              </div>
            </div>
          </div>
        </Section>
        <ProjectList
          title="Other projects"
          blockId={id}
          projects={data.allSanityProject}
          limit={2}
          skipTransition
          doAnimation={false}
        />
      </Element>
    </>
  )
}

export default ProjectDetailedContainer

const SliderWrapper = styled.div`
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
`

const svgNavigators = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const GlobeIcon = styled.div`
  position: absolute;
  bottom: -10px;
  transform: translate(-50%, 100%);
  left: 50%;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  opacity: 1;

  &.with-anim {
    opacity: 0;
    animation: ${svgNavigators} 1s forwards;
    animation-delay: 1s;
  }

  cursor: pointer;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 40%;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  padding-bottom: 100px;
  justify-content: center;
  min-height: 525px;

  .upper {
    padding: 0 15px;

    @media ${breakpoints.tabletLandscapeDown} {
      padding: 0 15px;
    }

    p {
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
    }

    .button-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      & > svg {
        cursor: pointer;
      }

      & > svg.with-anim {
        opacity: 0;
        animation: ${svgNavigators} 1s forwards;
        animation-delay: 1s;
      }

      & > svg:first-child {
        margin-right: 24px;
      }

      & > svg:last-child {
        margin-left: 24px;
      }
    }
  }

  img.scroll {
    @media ${breakpoints.tabletLandscapeUp} {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }

    cursor: pointer;
  }

  .h2 {
    @media ${breakpoints.phoneOnly} {
      font-size: 44px;
    }
  }
`

const StyledMast = styled.div`
  position: relative;
  height: 100vh;
  opacity: 1;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  height: 100%;
  width: 100%;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s ease-in-out;

  img.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 40px;
    opacity: 0;
    color: #fff;
    transition: opacity 0.5s ease-in-out;
    cursor: pointer;

    @media ${breakpoints.phoneOnly} {
      top: 10px;
      right: 10px;
      height: 25px;
    }
  }

  &.open {
    background-color: rgba(0, 0, 0, 0.85);
    pointer-events: initial;

    img.modal-close {
      opacity: 1;
    }
  }

  .modal-video-movie-wrap {
    padding-bottom: 0 !important;
  }

  .modal-video,
  .modal-video-body,
  .modal-video-inner,
  .modal-video-movie-wrap {
    height: 100%;
    width: 100%;
    outline: 0;
  }

  .modal-video-close-btn {
    display: none !important;
  }

  iframe {
    height: 100%;
    width: 100%;
    max-width: 90%;
    max-height: 90%;
  }
`

const svgAnim = keyframes`
  0% {
    stroke-dashoffset: 400;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`

const PlayButton = styled.div`
  z-index: 100;

  svg {
    &:hover {
      cursor: pointer;
    }

    circle,
    path {
      stroke-dashoffset: 0;
      opacity: 1;
    }

    &.with-anim {
      circle {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 2s forwards;
      }

      path {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 3s forwards;
        animation-delay: 0.75s;
      }
    }
  }
`

const Section = styled.section`
  padding: 10em 0 5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  @media ${breakpoints.phoneOnly} {
    padding: 2em 0;
  }

  .container {
    max-width: 800px;
    width: 100%;
    padding: 0 20px;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media ${breakpoints.phoneOnly} {
      flex-wrap: nowrap;
      flex-direction: column;
    }
  }

  .col {
    display: flex;
    text-align: left;

    &.meta {
      flex: 0 0 300px;
      flex-wrap: wrap;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
      }

      & > div {
        margin-bottom: 25px;
        width: 100%;

        @media ${breakpoints.phoneOnly} {
          display: flex;
          flex-wrap: wrap;
          flex-basis: 50%;

          &:nth-child(even) {
            text-align: right;
          }

          h5.subtitle {
            display: flex;
            flex-basis: 100%;
          }
        }
      }
    }

    &.content {
      flex: 1 1 auto;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
      }

      & > div {
        width: 100%;
      }

      strong {
        font-weight: 700;
        font-family: 'Druk Wide Super';
        font-size: 14px;
        text-transform: uppercase;
        margin-bottom: -14px;
        display: block;
        color: rgb(255, 255, 255);

        @media ${breakpoints.phoneOnly} {
          font-size: 12px;
        }
      }

      p {
        opacity: 1;
        color: rgba(255, 255, 255, 0.85);
      }
    }

    h5 {
      margin-bottom: 0.5em;
    }
  }
`
