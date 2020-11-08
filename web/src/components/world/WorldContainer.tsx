// @ts-nocheck
import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group'
import { get, debounce } from 'lodash'
import { useDispatch } from 'react-redux'

import World from './World'
import { TextImprov, FadeAnim } from '@components/animations'
import { Button, ProjectSlider } from '@components/general'
import { breakpoints } from '@utils/breakpoints'
import { stringifyArray } from '../../utils'

import { MarkerType, WorldMode, WorldVersion } from '../../actions'
import { setWorldMode, setWorldModeFromLocation } from '../../actions/mode'
import { worldHandleResize } from '../../actions/initialize'

import VideoPlayer from './VideoPlayer'
import Galaxy from './Galaxy'

const INTRO_TEXT = `
  A collective of interdisciplinary creatives whose collaborative
  practice seeks to navigate the confluence of film, music, design and fashion`

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

const WorldContainer = ({ layout, location }) => {
  const world = useSelector((state) => state.world)
  const [markers, setMarkers] = useState([]) // all markers (subset of Projects+Locations)
  const [[width, height], setSize] = useState([0, 0])
  const prevWidth = usePrevious(width)
  const prevHeight = usePrevious(height)
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

    // combine projects and areas for markers
    const projects = data.allSanityProject.edges.filter(
      (p) => p.node.locationGroup === null
    )
    const areas = data.allSanityLocation.edges.filter((a) =>
      data.allSanityProject.edges.some(
        (p) => p.node.locationGroup && p.node.locationGroup._id === a.node._id
      )
    )
    setMarkers([...areas, ...projects])

    // listen on resize
    window.addEventListener(
      'resize',
      debounce(
        () => {
          setSize([window.innerWidth, window.innerHeight])
        },
        500,
        { leading: true, trailing: true }
      )
    )
  }, [])

  useEffect(() => {
    if (width === prevWidth && Math.abs(prevHeight - height) < 30) return

    dispatch(worldHandleResize())
  }, [width, height])

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
        <Content>
          <TextImprov
            in={
              (world.mode === WorldMode.PROJECT_PREVIEW ||
                world.mode === WorldMode.AREA_PREVIEW) &&
              !world.fadingVideo
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
              (world.mode === WorldMode.PROJECT_PREVIEW ||
                world.mode === WorldMode.AREA_PREVIEW) &&
              !world.fadingVideo
            }
            tag="h1"
            allowCustomBreaks
            text={
              lastActive && lastActive.lastShown === MarkerType.PROJECT
                ? get(world, 'lastActive.project.node.title')
                : get(
                    world,
                    `lastActive.areaProjects[${get(
                      world,
                      'lastActive.projectIndex'
                    )}].node.title`
                  )
            }
            appear
          />
          <TextImprov
            in={
              (world.mode === WorldMode.PROJECT_PREVIEW ||
                world.mode === WorldMode.AREA_PREVIEW) &&
              !world.fadingVideo
            }
            tag="p"
            className="lighter"
            text={
              lastActive && lastActive.lastShown === MarkerType.PROJECT
                ? stringifyArray(
                    get(world, 'lastActive.project.node.clients'),
                    '',
                    ' • ',
                    { uppercase: true }
                  )
                : stringifyArray(
                    get(
                      world,
                      `lastActive.areaProjects[${get(
                        world,
                        'lastActive.projectIndex'
                      )}].node.clients`
                    ),
                    '',
                    ' • ',
                    { uppercase: true }
                  )
            }
            appear
          />
          {world.version === WorldVersion.MOBILE && (
            <FadeAnim
              timeout={500}
              in={
                (world.mode === WorldMode.PROJECT_PREVIEW ||
                  world.mode === WorldMode.AREA_PREVIEW) &&
                !world.fadingVideo
              }
            >
              <Button
                className={world.mode}
                buttonStyle="outlined"
                onClick={() =>
                  dispatch(
                    setWorldMode(WorldMode.PROJECT_DETAILED, {
                      project:
                        world.mode === WorldMode.AREA_PREVIEW
                          ? get(
                              world,
                              `active.areaProjects[${get(
                                world,
                                `active.projectIndex`
                              )}]`
                            )
                          : world.active.project,
                      state: { doAnimation: true, delay: 1500 },
                    })
                  )
                }
              >
                VIEW PROJECT
              </Button>
            </FadeAnim>
          )}
        </Content>
      </>
      {/* Footer content */}
      <FooterContainer>
        <div className="footer--content">
          <>
            <TextImprov
              in={
                world.ready && [WorldMode.PROJECTS_EXPLORE].includes(world.mode)
              }
              tag="p"
              text={INTRO_TEXT.toUpperCase()}
            />
          </>
        </div>
      </FooterContainer>

      {/* Background video(s) */}
      <VideoPlayer />

      {/* Galaxy */}
      <Galaxy />

      {/* Area projects slider */}
      <AreaSliderWrapper>
        <ProjectSlider
          className="project-slider"
          show={
            world.mode === WorldMode.AREA_PREVIEW ||
            (world.mode === WorldMode.PROJECT_DETAILED && world.active.area)
          }
          showOnFade
          withProgressBar={world.mode === WorldMode.AREA_PREVIEW}
          withAnimation={world.mode === WorldMode.AREA_PREVIEW}
        />
      </AreaSliderWrapper>
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
    z-index: 1;
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

const Content = styled.div`
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

  .lighter {
    opacity: 0.9;
  }

  h1 {
    line-height: 0.9em;
    margin: 10px 0 5px 0;
  }

  p {
    max-width: 450px;
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

const AreaSliderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  p {
    margin-bottom: 0;
  }
`
