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

import { MarkerType, WorldMode, WorldVersion } from '../../actions'
import { setWorldMode, setWorldModeFromLocation } from '../../actions/mode'
import { worldHandleResize } from '../../actions/initialize'

import VideoBackground from './VideoBackground'

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const WorldContainer = ({ layout, location }) => {
  const world = useSelector((state) => state.world)
  const [markers, setMarkers] = useState([]) // all markers (subset of Projects+Locations)
  const [showGrabIcon, setShowGrabIcon] = useState(false)
  const [width, height] = useWindowSize()

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
    dispatch(worldHandleResize())
  }, [width])

  useEffect(() => {
    if (
      world.mode === WorldMode.PROJECTS_EXPLORE ||
      world.mode === WorldMode.PROJECT_PREVIEW
    ) {
      if (!showGrabIcon) setTimeout(() => setShowGrabIcon(true), 2000)
      else setShowGrabIcon(false)
    }
  }, [world.mode, world.ready])

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
            city
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

  const { lastActive } = world
  return (
    <Page className={layout}>
      <>
        {/* Globe */}
        <CSSTransition
          in={world.ready}
          timeout={{ enter: 1600 }}
          classNames="globe"
        >
          <AnimatedWrapper
            className={world.skipInTransition ? 'skip-in-transition' : ''}
          >
            <World location={location} data={data} markers={markers} />
          </AnimatedWrapper>
        </CSSTransition>

        {/* Copy */}
        <MobileContent>
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="h2"
            className="subtitle"
            text={
              lastActive && lastActive.lastShown === MarkerType.PROJECT
                ? get(world, 'lastActive.project.node.city')
                : get(world, 'lastActive.area.node.title')
            }
            appear
          />
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="h1"
            text={
              lastActive && lastActive.lastShown === MarkerType.PROJECT
                ? get(world, 'lastActive.project.node.title')
                : `${get(world, 'lastActive.area.node.projectCount')} PROJECTS`
            }
            appear
          />
          <TextImprov
            in={
              world.mode === WorldMode.PROJECT_PREVIEW ||
              world.mode === WorldMode.AREA_PREVIEW
            }
            tag="p"
            text={
              lastActive && lastActive.lastShown === MarkerType.PROJECT
                ? 'TRAVIS SCOTT'
                : 'CLICK TO EXPLORE'
            }
          />
          {world.version === WorldVersion.MOBILE && (
            <FadeAnim
              timeout={1000}
              in={
                world.mode === WorldMode.PROJECT_PREVIEW ||
                world.mode === WorldMode.AREA_PREVIEW
              }
              appear
            >
              <Button
                className={world.mode}
                buttonStyle="outlined"
                onClick={() =>
                  dispatch(
                    setWorldMode(WorldMode.PROJECT_DETAILED, {
                      project:
                        world.mode === WorldMode.AREA_PREVIEW
                          ? world.active.areaProjects[0]
                          : world.active.project,
                      state: { doAnimation: true, delay: 1500 },
                    })
                  )
                }
              >
                {`VIEW PROJECT${
                  world.mode === WorldMode.AREA_PREVIEW ? 'S' : ''
                }`}
              </Button>
            </FadeAnim>
          )}
        </MobileContent>
      </>
      {/* Footer content */}
      <FooterContainer>
        <div className="footer--content">
          <>
            <TextAnim
              in={
                world.ready &&
                [
                  WorldMode.PROJECTS_EXPLORE,
                  WorldMode.PROJECT_PREVIEW,
                  WorldMode.AREA_PREVIEW,
                ].includes(world.mode)
              }
              tag="p"
              text={INTRO_TEXT.toUpperCase()}
            />
          </>
        </div>
      </FooterContainer>

      {/* Background video(s) */}
      <VideoBackground />

      {/* Area stuff (project slider) */}
      {/* <AreaContainer>
        {world.version === WorldVersion.MOBILE && (
          <ProjectSlider
            projects={world.areaProjects}
            show={world.mode === WorldMode.PROJECT_DETAILED}
          />
        )}
      </AreaContainer> */}
    </Page>
  )
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

  // h1 {
  //   line-height: 0.9em;
  // }
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
