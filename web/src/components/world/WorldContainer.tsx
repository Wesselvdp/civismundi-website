// @ts-nocheck
import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group'
import { get, debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import Div100vh from 'react-div-100vh'
import ModalVideo from 'react-modal-video'

import World from './World'
import { TextImprov, FadeAnim } from '@components/animations'
import { Button, Quote, ProjectSlider } from '@components/general'
import { breakpoints } from '@utils/breakpoints'
import { getVideoId } from '../../utils'

import { WorldMode, WorldVersion } from '../../actions'
import { setWorldMode, toggleSlider, setWorldModeFromLocation } from '../../actions/mode'
import { worldHandleResize } from '../../actions/initialize'

import PlaySVG from '../../assets/play.svg'
import NextSVG from '../../assets/btn-next.svg'
import PrevSVG from '../../assets/btn-prev.svg'

import VideoPlayer from './VideoPlayer'
import Galaxy from './Galaxy'
// import console = require('console');

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

export enum DetailedState {
  LOADING = 1,
  SUBTITLE = 2,
  TITLE = 3,
  PARAGRAPH = 4,
  BUTTONS = 5,
}

const WorldContainer = ({ layout, location, isScrolling }) => {
  const world = useSelector((state: any) => state.world)
  const [markers, setMarkers] = useState([]) // all markers (subset of Projects+Locations)
  const [[width, height], setSize] = useState([0, 0])
  const [videoOpen, openVideo] = useState(false)
  const [fading, setFading] = useState(false)
  const [detailedState, setDetailedState] = useState(DetailedState.LOADING)

  const dispatch = useDispatch()

  const resize = useCallback(() => {
    if (
      window.innerWidth === width &&
      world.version === WorldVersion.MOBILE &&
      world.mode === WorldMode.PROJECT_DETAILED
    )
      return

    setSize([window.innerWidth, window.innerHeight])
  }, [world, width])

  useEffect(() => {
    // set projects as markers
    const projects = data.allSanityProject.edges
    setMarkers(projects)

    window.addEventListener('resize', resize)
    setSize([window.innerWidth, window.innerHeight])

    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    dispatch(worldHandleResize())
  }, [width, height])

  useEffect(() => {
    setFading(world.fadingPage || world.fadingVideo)
  }, [world.fadingPage, world.fadingVideo])

  useEffect(() => {
    if (world.mode !== WorldMode.PROJECT_DETAILED) {
      setDetailedState(DetailedState.LOADING)
    }
  }, [world.mode])

  useEffect(() => {
    // back button support
    if (world.ready && typeof window !== 'undefined') {
      window.onpopstate = (e) => {
        dispatch(
          setWorldModeFromLocation(e.target.location, { skipTransition: false, fadeVideo: true })
        )
      }
    }
  }, [world.ready])

  useEffect(() => {
    let timer

    if (!world.ready) return

    openVideo(false)

    if (location.pathname.includes('/projects')) {
      if (location.state && location.state.doAnimation) {
        timer = setTimeout(() => {
          setDetailedState(DetailedState.SUBTITLE)
        }, get(location, 'state.delay', 0))
      } else {
        setDetailedState(DetailedState.BUTTONS)
      }
    }

    return () => clearTimeout(timer)
  }, [world.ready, location])

  // Projects
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allSanityLocation {
        edges {
          node {
            _id
            _type
            title
            location {
              lat
              lng
            }
          }
        }
      }
      allSanityProject(sort: { fields: order, order: ASC }) {
        edges {
          node {
            _id
            _type
            order
            slug {
              current
            }
            title
            featured
            city
            clients
            vimeo
            quote {
              content
              quotee
            }
            location {
              lat
              lng
            }
            locationGroup {
              _id
              title
              location {
                lat
                lng
              }
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

  const { lastActive, active } = world
  const { doAnimation } = location.state || {}
  const project = active.project ? active.project.node : {}

  return (
    <Page
      className={`${layout} ${videoOpen && project.vimeo ? 'modal-open' : ''}`}
    >
      {/* Globe */}
      <Div100vh className="globe__container" style={{ minHeight: '475px' }}>
        <CSSTransition
          in={world.ready}
          timeout={{ enter: 2000 }}
          classNames="globe"
        >
          <AnimatedWrapper
            className={world.skipInTransition ? 'skip-in-transition' : ''}
          >
            <World
              width={width}
              height={Math.max(height, 475)}
              location={location}
              data={data}
              markers={markers}
            />
          </AnimatedWrapper>
        </CSSTransition>

        {/* Copy HOME */}
        {[
          WorldMode.PROJECTS_EXPLORE,
          WorldMode.PROJECT_PREVIEW,
        ].includes(world.mode) && (
          <ContentHome>
            <TextImprov
              in={
                world.mode === WorldMode.PROJECT_PREVIEW && !world.fadingVideo
              }
              tag="p"
              className="no-mb"
              text={lastActive ? get(world, 'lastActive.project.node.city', '').toUpperCase() : ''}
              appear
            />
            <TextImprov
              in={
                world.mode === WorldMode.PROJECT_PREVIEW &&
                !world.fadingVideo
              }
              tag="h1"
              className="no-mt"
              allowCustomBreaks
              text={lastActive ? get(world, 'lastActive.project.node.title') : ''}
              appear
            />
            <Quote
              in={
                world.mode === WorldMode.PROJECT_PREVIEW &&
                !world.fadingVideo
              }
              tag="p"
              className="lighter"
              appear
              project={world.lastActive ? world.lastActive.project : null}
            />
            {world.version === WorldVersion.MOBILE && (
              <FadeAnim
                timeout={500}
                in={
                  world.mode === WorldMode.PROJECT_PREVIEW &&
                  !world.fadingVideo
                }
              >
                <Button
                  className={world.mode}
                  buttonStyle="outlined"
                  onClick={() =>
                    dispatch(
                      setWorldMode(WorldMode.PROJECT_DETAILED, {
                        project: world.active.project,
                        state: { doAnimation: true, delay: 1500 },
                      })
                    )
                  }
                >
                  VIEW PROJECT
                </Button>
              </FadeAnim>
            )}
          </ContentHome>
        )}

        {/* Copy PROJECT_DETAILED */}
        {world.mode === WorldMode.PROJECT_DETAILED && (
        <>
          {project.vimeo && (
            <ModalWrapper className={videoOpen ? 'open' : ''}>
              <ModalVideo
                channel={
                  project.vimeo.includes('vimeo') ? 'vimeo' : 'youtube'
                }
                isOpen={videoOpen}
                videoId={getVideoId(project.vimeo)}
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
          )}
          <ContentDetailed>
            {detailedState >= DetailedState.PARAGRAPH && (
              <div className="button-container">
                <PrevSVG
                  className={`anim-scale ${
                    doAnimation ? 'with-anim' : ''
                  } nav-button`}
                  onClick={() =>
                    dispatch(
                      setWorldMode(WorldMode.PROJECT_DETAILED, {
                        project:
                          world.projects[world.active.prevIndex],
                        state: {
                          fadeVideo: true,
                          // delay: 1500,
                          // doAnimation: true,
                        }
                      })
                    )
                  }
                />
                <PlayButton
                  style={{
                    visibility: 'visible',
                  }}
                >
                  <PlaySVG
                    className={`anim-scale ${
                      doAnimation && 'with-anim'
                    } play-button`}
                    onClick={() => openVideo(true)}
                  />
                </PlayButton>
                <NextSVG
                  className={`nav-button anim-scale ${
                    doAnimation ? 'with-anim' : ''
                  }`}
                  onClick={() =>
                    dispatch(
                      setWorldMode(WorldMode.PROJECT_DETAILED, {
                        project:
                          world.projects[world.active.nextIndex],
                        state: {
                          fadeVideo: true,
                          // delay: 1500,
                          // doAnimation: true,
                        },
                      })
                    )
                  }
                />
              </div>
            )}
            <div className="copy">
              <div>
                <TextImprov
                  in={!fading && detailedState >= DetailedState.SUBTITLE}
                  onEntered={() =>
                    doAnimation && setDetailedState(DetailedState.TITLE)
                  }
                  tag="p"
                  className="no-mb"
                  text={get(world, 'active.project.node.city', '').toUpperCase()}
                  appear
                  timeout={{ enter: 300 }}
                />
                <TextImprov
                  in={!fading && detailedState >= DetailedState.TITLE}
                  onEntered={() =>
                    doAnimation && setDetailedState(DetailedState.PARAGRAPH)
                  }
                  className="h2"
                  tag="h1"
                  text={get(world, 'active.project.node.title', '')}
                  appear
                  timeout={{ enter: 300 }}
                  allowCustomBreaks
                />
                <Quote
                  in={!fading && detailedState >= DetailedState.PARAGRAPH}
                  tag="p"
                  project={get(world, 'active.project')}
                  appear
                  timeout={{ enter: 600 }}
                />
              </div>
            </div>
          </ContentDetailed>
        </>
        )}

        {/* Footer content */}
        <FooterContainer style={world.showSlider ? { pointerEvents: 'none' } : {}}>
          <div className="footer--content">
            <>
              <TextImprov
                in={
                  !world.showSlider &&
                  world.ready &&
                  [WorldMode.PROJECTS_EXPLORE].includes(world.mode)
                }
                tag="p"
                text={INTRO_TEXT.toUpperCase()}
              />
            </>
            {!world.showSlider && [WorldMode.PROJECTS_EXPLORE].includes(world.mode) && (
              <div className="show-slider" onClick={() => dispatch(toggleSlider)}>
                <p>
                  <img src="/arrow-down.svg" />
                  PROJECT PREVIEWS
                </p>
              </div>
            )}
          </div>
        </FooterContainer>

        {/* Background video(s) */}
        <VideoPlayer />

        {/* Area projects slider */}
        <AreaSliderWrapper style={!(world.showSlider || world.mode === WorldMode.PROJECT_DETAILED) ? { pointerEvents: 'none' } : {}}>
          <ProjectSlider
            className="project-slider"
            show={world.mode !== WorldMode.IN_BACKGROUND && (world.showSlider || world.mode === WorldMode.PROJECT_DETAILED)}
            withAnimation={world.mode === WorldMode.PROJECTS_EXPLORE || world.mode === WorldMode.PROJECT_PREVIEW}
          />
        </AreaSliderWrapper>

        {/* Galaxy */}
        <Galaxy show={world.ready} />
      </Div100vh>
    </Page>
  )
}

export default WorldContainer

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

    #Oval_Copy,
    #Stroke_19 {
      stroke-dashoffset: 0;
      opacity: 1;
    }

    &.with-anim {
      #Oval_Copy {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 2s forwards;
      }

      #Stroke_19 {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 3s forwards;
        animation-delay: 0.75s;
      }
    }
  }
`

const svgNavigators = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ContentDetailed = styled.div`
  position: absolute;
  top: 0;
  bottom: 20%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  pointer-events: none;

  .copy {
    width: 100%;
    min-height: 200px;
    padding: 0 15px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @media ${breakpoints.phoneOnly} {
      min-height: 170px;

      .h2 {
        font-size: 32px;
      }
    }

    h1 {
      margin: 8px 0px 5px;
    }

    p {
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
      line-height: 22px;
    }
  }

  .button-container {
    pointer-events: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    margin-top: 5em;

    .anim-scale {
      transform: scale(1);
      transition: 0.25s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

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

    .nav-button {
      visibility: hidden;
    }

    @media ${breakpoints.phoneOnly} {
      .play-button {
        height: 80px;
        width: 80px;
      }

      .nav-button {
        height: 46px;
        width: 46px;
      }
    }
  }
`

const Page = styled.div`
  position: relative;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;

  &.other {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.55;
  }

  &.project-detailed {
    position: relative;
    opacity: 1;
  }

  &.modal-open {
    z-index: 100 !important;
  }

  // .globe__container {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: -1;
  // }
`

const AnimatedWrapper = styled.div`
  position: relative;
  height: 100%;
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
    transition: all 2000ms cubic-bezier(0.655, 0.005, 0.160, 1.020); /* custom */
    transition-timing-function: cubic-bezier(0.655, 0.005, 0.160, 1.020); /* custom */
  }

  &.globe-enter-done {
    transform: scale(1);
    opacity: 1;
  }

  &.skip-in-transition {
    transform: scale(1) !important;
    opacity: 1 !important;
    transition: none;
  }

  * {
    outline: 0;
  }
`

const ContentHome = styled.div`
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

    &.${WorldMode.PROJECT_PREVIEW} {
      @media ${breakpoints.phoneOnly} {
        display: initial;
      }
    }
  }

  .lighter {
    opacity: 0.9;
  }

  h1 {
    line-height: 0.9em;
    margin: 10px 0 5px 0;

    @media ${breakpoints.phoneOnly} {
      font-size: 34px;
      margin: 7px 0 3px 0;
      line-height: 1em;
    }
  }

  p {
    max-width: 455px;
    margin-left: auto;
    margin-right: auto;
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

    p {
      line-height: 1.5em;
      margin-bottom: 0;
      opacity: 0.75;

      &:not(.skip-intro) {
        @media ${breakpoints.phoneOnly} {
          font-size: 10px;
          padding: 0 20px;
        }
      }
    }

    .show-slider {
      border: 0.5px solid rgba(255, 255, 255, 0.5);
      border-bottom: none;
      padding: 10px 35px 10px;
      display: inline-block;
      margin-top: 25px;
      cursor: pointer;

      @media ${breakpoints.phoneOnly} {
        margin-top: 15px;
        padding: 5px 15px 5px;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        font-size: 12px;
      }

      img {
        height: 8px;
        margin-right: 10px;
        transform: rotate(180deg);

        @media ${breakpoints.phoneOnly} {
          height: 10px;
        }
      }
    }
  }
`

const AreaSliderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  p {
    margin-bottom: 0;
  }
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
