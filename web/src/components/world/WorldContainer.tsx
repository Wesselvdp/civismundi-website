// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'

import World from './World'
import {
  TextAnim,
  TextImprov,
  FadeAnim,
  VerticalAnim,
} from '@components/animations'
import { Button } from '@components/general'
import { breakpoints } from '@utils/breakpoints'

import { WorldMode, WorldVersion } from '../../actions'
import { setWorldMode, setWorldModeFromLocation } from '../../actions/mode'
import { worldHandleResize } from '../../actions/initialize'

import ProjectSlider from './ProjectSlider'

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

const WorldContainer = ({ layout, location }) => {
  const world = useSelector((state) => state.world)
  const [markers, setMarkers] = useState([])
  const [showGrabIcon, setShowGrabIcon] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // back button support
    if (typeof window !== 'undefined') {
      window.onpopstate = (e) => {
        dispatch(
          setWorldModeFromLocation(e.target.location, { skipTransition: false })
        )
      }
    }

    // resize
    function handleResize() {
      dispatch(worldHandleResize())
    }

    window.addEventListener('resize', handleResize)

    const projects = data.allSanityProject.edges.filter(
      (p) => p.node.locationGroup === null
    )
    const areas = data.allSanityLocation.edges.filter((a) =>
      data.allSanityProject.edges.some(
        (p) => p.node.locationGroup && p.node.locationGroup._id === a.node._id
      )
    )
    setMarkers([...areas, ...projects])
  }, [])

  useEffect(() => {
    if (
      world.mode === WorldMode.PROJECTS_EXPLORE ||
      world.mode === WorldMode.PROJECT_PREVIEW
    ) {
      if (!showGrabIcon) setTimeout(() => setShowGrabIcon(true), 2000)
      else setShowGrabIcon(false)
    }
  }, [world.mode, world.ready])

  useLayoutEffect(() => {}, [])

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
      allSanityProject {
        edges {
          node {
            _id
            _type
            slug {
              current
            }
            title
            featured
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

  return (
    <Page className={layout}>
      <>
        <CSSTransition
          in={world.ready}
          timeout={{ enter: 1600 }}
          classNames="globe"
        >
          <AnimatedWrapper
            className={world.skipInTransition ? 'skip-in-transition' : ''}
          >
            <World
              width={window.innerWidth}
              height={window.innerHeight}
              location={location}
              data={data}
              markers={markers}
            />
          </AnimatedWrapper>
        </CSSTransition>
        <MobileContent>
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="h2"
            className="subtitle"
            text="VIDEO DIRECTION"
          />
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="h1"
            text={get(world, 'projectActive.node.title')}
            appear
          />
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="p"
            text="TRAVIS SCOTT  •  LOS ANGELES"
          />
          <FadeAnim
            timeout={1000}
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
          >
            <Button
              className={world.mode}
              buttonStyle="outlined"
              onClick={() =>
                dispatch(
                  setWorldMode(WorldMode.PROJECT_DETAILED, {
                    marker: world.projectActive,
                    navigate: true,
                  })
                )
              }
            >
              VIEW PROJECT
            </Button>
          </FadeAnim>
        </MobileContent>
      </>
      <FooterContainer>
        <div className="footer--content">
          <>
            <VerticalAnim
              in={
                world.ready &&
                showGrabIcon &&
                [
                  WorldMode.PROJECTS_EXPLORE,
                  WorldMode.PROJECT_PREVIEW,
                ].includes(world.mode)
              }
              timeout={{ enter: 5000 }}
            >
              <img src="/grab-icon.svg" />
            </VerticalAnim>
            <TextAnim
              in={
                world.ready &&
                [
                  WorldMode.PROJECTS_EXPLORE,
                  WorldMode.PROJECT_PREVIEW,
                ].includes(world.mode)
              }
              tag="p"
              text={INTRO_TEXT.toUpperCase()}
            />
          </>
        </div>
      </FooterContainer>
      {world.showPreviewVideo && (
        <VideoPreview
          className={`${
            [
              WorldMode.PROJECT_PREVIEW,
              WorldMode.PROJECT_DETAILED,
              WorldMode.AREA_PREVIEW,
            ].includes(world.mode)
              ? 'visible'
              : ''
          } ${
            world.mode === WorldMode.PROJECT_DETAILED ? 'project-detailed' : ''
          }`}
        >
          <video
            key={get(world, 'projectActive.node.video.asset.url')}
            id="videoBG"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src={get(world, 'projectActive.node.video.asset.url')}
              type="video/mp4"
            />
          </video>
        </VideoPreview>
      )}
      <AreaContainer>
        {world.version === WorldVersion.MOBILE && (
          <FadeAnim
            in={world.mode === WorldMode.AREA_PREVIEW}
            timeout={{ enter: 500, exit: 0 }}
          >
            <p>{world.areaProjects.length} PROJECTS</p>
          </FadeAnim>
        )}
        <ProjectSlider
          projects={world.areaProjects}
          show={world.mode === WorldMode.AREA_PREVIEW}
        />
      </AreaContainer>
      {world.mode === WorldMode.AREA_PREVIEW && (
        <CloseMarker
          onClick={() => dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))}
          className={world.screenCoords && 'show'}
          x={get(world, 'screenCoords.x')}
          y={get(world, 'screenCoords.y')}
        >
          <img src="/close-marker.svg" />
        </CloseMarker>
      )}
    </Page>
  )
}

export default WorldContainer

const CloseMarker = styled.div`
  position: fixed;
  z-index: 0;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transform: translate(-50%, -47%);
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: pointer;

  &.show {
    opacity: 1;
  }

  img {
    height: 54px;
    width: 54px;
  }
`

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

  &.skip-in-transition {
    transform: scale(1) !important;
    opacity: 1 !important;
    transition: none;
  }

  * {
    outline: 0;
  }
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

    &.${WorldMode.AREA_PREVIEW} {
      display: initial;
    }

    &.${WorldMode.PROJECT_PREVIEW} {
      @media ${breakpoints.phoneOnly} {
        display: initial;
      }
    }
  }

  p span {
    margin: 0 3px;
    display: inline-block;
  }

  h1 {
    line-height: 0.9em;
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
  pointer-events: none;

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
          font-size: 10px;
          padding: 0 20px;
        }
      }
    }

    .skip-intro {
      cursor: pointer;
    }
  }
`

const AreaContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  p {
    margin-bottom: 0;
  }
`
