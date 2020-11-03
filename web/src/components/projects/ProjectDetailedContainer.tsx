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

// Components
import { ProjectList } from '@components/projects'
import { TextAnim } from '@components/animations'
import { ProjectSlider } from '@components/general'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'
import { getVideoId, stringifyArray } from '../../utils'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5,
  SLIDER_IN = 6,
}

const ProjectDetailedContainer = ({ location, data }) => {
  const {
    id,
    city,
    locationGroup,
    clients,
    vimeo,
    director,
    awards,
    _rawOverview,
  } = data.sanityProject
  const dispatch = useDispatch()
  const world = useSelector((state) => state.world)
  const [state, setState] = useState(ProjectState.LOADING)
  const [videoOpen, openVideo] = useState(false)
  const [fading, setFading] = useState(true)

  useEffect(() => {
    let timer

    if (world.ready && location.state) {
      if (location.state.doAnimation) {
        timer = setTimeout(() => {
          setState(ProjectState.SUBTITLE_IN)
        }, get(location, 'state.delay', 0))
      } else {
        setState(ProjectState.SLIDER_IN)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [world.ready, location])

  useEffect(() => {
    setFading(world.fadingPage || world.fadingVideo)
  }, [world.fadingPage, world.fadingVideo])

  useEffect(() => {
    if (state === ProjectState.VIDEO_BUTTON_IN) {
      setTimeout(() => {
        setState(ProjectState.SLIDER_IN)
      }, 1500)
    }
  }, [state])

  const getProjectIndex = () =>
    world.active.areaProjects.findIndex(
      (p: any) => p.node._id === world.active.project.node._id
    ) || 0

  const locState = location.state || {}

  return (
    <>
      {vimeo && (
        <ModalWrapper className={videoOpen ? 'open' : ''}>
          <ModalVideo
            channel={vimeo.includes('vimeo') ? 'vimeo' : 'youtube'}
            isOpen={videoOpen}
            videoId={getVideoId(vimeo)}
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
      <StyledMast>
        {(!locState.doAnimation || state >= ProjectState.VIDEO_BUTTON_IN) && (
          <ButtonContainer className="button-container">
            {world.active.area && (
              <PrevSVG
                style={{
                  visibility: getProjectIndex() > 0 ? 'visible' : 'hidden',
                }}
                className={`anim-scale ${locState.doAnimation && 'with-anim'}`}
                onClick={() =>
                  !fading &&
                  dispatch(
                    setWorldMode(WorldMode.PROJECT_DETAILED, {
                      project: world.active.areaProjects[getProjectIndex() - 1],
                      state: { fadeVideo: true, keepSliderScroll: true },
                    })
                  )
                }
              />
            )}
            {vimeo && (
              <PlayButton>
                <PlaySVG
                  className={`anim-scale ${
                    locState.doAnimation && 'with-anim'
                  }`}
                  onClick={() => openVideo(true)}
                />
              </PlayButton>
            )}
            {world.active.area && (
              <NextSVG
                className={`anim-scale ${locState.doAnimation && 'with-anim'}`}
                style={{
                  visibility:
                    getProjectIndex() < world.active.areaProjects.length - 1
                      ? 'visible'
                      : 'hidden',
                }}
                onClick={() =>
                  dispatch(
                    !fading &&
                      setWorldMode(WorldMode.PROJECT_DETAILED, {
                        project:
                          world.active.areaProjects[getProjectIndex() + 1],
                        state: {
                          fadeVideo: true,
                          keepSliderScroll: true,
                        },
                      })
                  )
                }
              />
            )}
          </ButtonContainer>
        )}
        <Content>
          <div className="upper">
            {(!locState.doAnimation ||
              state >= ProjectState.VIDEO_BUTTON_IN) && (
              <ButtonContainer className="button-container">
                {world.active.area && (
                  <PrevSVG
                    style={{
                      visibility: getProjectIndex() > 0 ? 'visible' : 'hidden',
                    }}
                    className={`anim-scale ${
                      locState.doAnimation && 'with-anim'
                    }`}
                    onClick={() =>
                      !fading &&
                      dispatch(
                        setWorldMode(WorldMode.PROJECT_DETAILED, {
                          project:
                            world.active.areaProjects[getProjectIndex() - 1],
                          state: { fadeVideo: true, keepSliderScroll: true },
                        })
                      )
                    }
                  />
                )}
                {vimeo && (
                  <PlayButton>
                    <PlaySVG
                      className={`anim-scale ${
                        locState.doAnimation && 'with-anim'
                      }`}
                      onClick={() => openVideo(true)}
                    />
                  </PlayButton>
                )}
                {world.active.area && (
                  <NextSVG
                    className={`anim-scale ${
                      locState.doAnimation && 'with-anim'
                    }`}
                    style={{
                      visibility:
                        getProjectIndex() < world.active.areaProjects.length - 1
                          ? 'visible'
                          : 'hidden',
                    }}
                    onClick={() =>
                      dispatch(
                        !fading &&
                          setWorldMode(WorldMode.PROJECT_DETAILED, {
                            project:
                              world.active.areaProjects[getProjectIndex() + 1],
                            state: {
                              fadeVideo: true,
                              keepSliderScroll: true,
                            },
                          })
                      )
                    }
                  />
                )}
              </ButtonContainer>
            )}
            {locState.doAnimation ? (
              <div className={`text-content ${fading && 'fading'}`}>
                <TextAnim
                  in={state >= ProjectState.SUBTITLE_IN}
                  timeout={{ enter: 300 }}
                  onEntered={() =>
                    locState.doAnimation && setState(ProjectState.TITLE_IN)
                  }
                  className="subtitle"
                  tag="h2"
                  text={
                    world.active.project &&
                    world.active.project.node.locationGroup
                      ? get(world, 'active.project.node.locationGroup.title')
                      : get(world, 'active.project.node.city')
                  }
                />
                <TextAnim
                  in={state >= ProjectState.TITLE_IN}
                  timeout={{ enter: 300 }}
                  onEntered={() =>
                    locState.doAnimation && setState(ProjectState.PARAGRAPH_IN)
                  }
                  className="h2"
                  tag="h1"
                  text={get(world, 'active.project.node.title')}
                />
                <TextAnim
                  in={state >= ProjectState.PARAGRAPH_IN}
                  timeout={{ enter: 600 }}
                  onEntered={() =>
                    locState.doAnimation &&
                    setState(ProjectState.VIDEO_BUTTON_IN)
                  }
                  tag="p"
                  text={stringifyArray(
                    get(world, 'active.project.node.clients'),
                    '',
                    '  •  '
                  )}
                  letterSpeedIn={0.01}
                  singleLine={false}
                />
              </div>
            ) : (
              <div className={`text-content ${fading && 'fading'}`}>
                <h2 className="subtitle">
                  {world.active.project &&
                  world.active.project.node.locationGroup
                    ? get(world, 'active.project.node.locationGroup.title')
                    : get(world, 'active.project.node.city')}
                </h2>
                <h1 className="h2">
                  {get(world, 'active.project.node.title')}
                </h1>
                <p>
                  {stringifyArray(
                    get(world, 'active.project.node.clients'),
                    '',
                    '  •  '
                  )}
                </p>
              </div>
            )}
          </div>
        </Content>
        <SliderWrapper>
          <ProjectSlider
            className="project-slider"
            show={!locState.doAnimation || state === ProjectState.SLIDER_IN}
          />
        </SliderWrapper>
      </StyledMast>

      {/* Project content */}
      <Element name="content">
        <Section>
          <div className="container">
            <div className="row">
              <div className="col meta">
                <div>
                  <h5 className="subtitle">DIRECTED BY</h5>
                  <h5>{stringifyArray(director, 'name', ', ')}</h5>
                </div>
                <div>
                  <h5 className="subtitle">LOCATION</h5>
                  <h5>{locationGroup ? locationGroup.title : city}</h5>
                </div>
                {awards && awards.length ? (
                  <div>
                    <h5 className="subtitle">AWARDS</h5>
                    {awards
                      .filter((award: any) => award && award.image)
                      .map((award: any) => (
                        <img
                          className="award-img"
                          key={award.name}
                          src={award.image.asset.url}
                        />
                      ))}
                  </div>
                ) : null}
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

  @media ${breakpoints.phoneOnly} {
    bottom: 130px;
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

  &.anim-scale {
    transform: translate(-50%, 100%) scale(1) !important;

    &:hover {
      transform: translate(-50%, 100%) scale(1.1) !important;
    }
  }

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

  @media ${breakpoints.tabletLandscapeUp} {
    transform: translateY(50px);
    padding-top: 50px;
    top: 50%;
    bottom: 20%;
  }

  .button-container {
    @media ${breakpoints.tabletLandscapeUp} {
      display: none;
    }
  }

  .upper {
    padding: 0 15px;

    .text-content {
      opacity: 1;
      transition: opacity 0.5s ease-in-out;

      &.fading {
        opacity: 0;
      }
    }

    @media ${breakpoints.tabletLandscapeDown} {
      padding: 0 15px;
    }

    p {
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
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

  & > .button-container {
    @media ${breakpoints.tabletLandscapeDown} {
      display: none;
    }
  }
`

const ButtonContainer = styled.div`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .anim-scale {
    transform: scale(1);
    transition: 0.25s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media ${breakpoints.tabletLandscapeUp} {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    width: 100%;
    bottom: auto;
    transform: translate(-50%, -50%);
    justify-content: space-between;
    padding: 0 90px;
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

      .award-img {
        height: 75px;
        width: auto;
        display: block;
        margin-bottom: 10px;
      }

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
