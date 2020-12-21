import React, { useEffect, useState, useRef } from 'react'
import { get, debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import TWEEN from '@tweenjs/tween.js'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode, toggleSlider } from '../../actions/mode'
import { WorldMode, WorldVersion } from '../../actions'

const SCROLL_STEP = 220

const ProjectSlider = ({ show, withAnimation = false }) => {
  const mode = useSelector((state: any) => state.world.mode)
  const projects = useSelector((state: any) => state.world.projects || [])
  const active = useSelector((state: any) => state.world.active || {})
  const version = useSelector((state: any) => state.world.version)

  const [nextActive, setNextActive] = useState(false)
  const [prevActive, setPrevActive] = useState(false)
  const [scrollBusy, setScrollBusy] = useState(false)
  const [scrollSize, setScrollSize] = useState(220)

  const posRef = useRef({ left: 0, x: 0 })
  const mouseDown = useRef(false)
  const dragged = useRef(false)
  const hovered = useRef(null)
  const projectsRef = useRef([])
  const modeRef = useRef(null)

  const dispatch = useDispatch()
  const ref = useRef(null)
  const timeout = useRef(null)

  const onResize = () => {
    if (ref.current) {
      setScrollSize(Math.max(100, ref.current.clientWidth - 100))
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (version === WorldVersion.DESKTOP) {
      ref.current.addEventListener('mousedown', mouseDownHandler)
    } else {
      ref.current.removeEventListener('mousedown', mouseDownHandler)
    }
  }, [version])

  useEffect(() => {
    projectsRef.current = projects
  }, [projects])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    setScrollSize(Math.max(100, ref.current.clientWidth - 100))
  }, [ref.current])

  const mouseDownHandler = function (e) {
    mouseDown.current = true

    posRef.current = {
      left: ref.current.scrollLeft,
      x: e.clientX,
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - posRef.current.x
    if (!dragged.current && Math.abs(dx) > 25) dragged.current = true

    ref.current.scrollLeft = posRef.current.left - dx
  }

  const mouseUpHandler = function () {
    mouseDown.current = false
    setTimeout(() => {
      dragged.current = false
    }, 200)

    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  useEffect(() => {
    if (!active.project || active.fromCarousel) return

    const child = get(ref, 'current.childNodes[0]')
    let tWidth = 0
    if (child) {
      console.log('has child')

      const style = child.currentStyle || window.getComputedStyle(child)
      const width = child.offsetWidth
      const margin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      const padding =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
      tWidth = width + margin - padding

      const center = ref.current.clientWidth / 2
      const thumbnailCenter =
        active.projectIndex * tWidth +
        0.5 * tWidth +
        active.project.areaCount * 40
      const newScroll = Math.max(
        0,
        Math.min(ref.current.scrollWidth, thumbnailCenter - center)
      )

      const scroll = ref.current.scrollLeft
      // const duration = 2000 * (Math.abs(scroll - newScroll) / ref.current.scrollWidth)

      new TWEEN.Tween({ scroll })
        .to({ scroll: newScroll }, 2000)
        .onUpdate((d) => {
          if (ref.current) ref.current.scrollLeft = d.scroll
        })
        .easing(TWEEN.Easing.Cubic.InOut)
        .start()
    }
  }, [active.project])

  const handleMouseHover = (i = null) => {
    hovered.current = i

    if (mouseDown.current || version === WorldVersion.MOBILE) return

    if (![WorldMode.PROJECTS_EXPLORE, WorldMode.PROJECT_PREVIEW].includes(mode))
      return

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      if (
        ![WorldMode.PROJECT_PREVIEW, WorldMode.PROJECTS_EXPLORE].includes(
          modeRef.current
        )
      )
        return

      if (hovered.current === null) {
        return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
      }

      return dispatch(
        setWorldMode(WorldMode.PROJECT_PREVIEW, {
          project: projectsRef.current[hovered.current],
          fromCarousel: true,
        })
      )
    }, 500)
  }

  const buttonActive = (type: string) => {
    if (!ref.current) return false

    if (type === 'prev') {
      return ref.current.scrollLeft > 0
    }

    if (type === 'next') {
      return (
        ref.current.scrollLeft + ref.current.clientWidth <
        ref.current.scrollWidth
      )
    }
  }

  const onScrollClick = (type: string) => {
    if (scrollBusy || !buttonActive(type)) return

    const scroll = ref.current.scrollLeft
    let newScroll = scroll

    if (type === 'prev') {
      newScroll = Math.max(0, newScroll - scrollSize)
    } else {
      newScroll = Math.min(ref.current.scrollWidth, newScroll + scrollSize)
    }

    new TWEEN.Tween({ scroll })
      .to({ scroll: newScroll }, 500)
      .onUpdate((d) => {
        if (ref.current) ref.current.scrollLeft = d.scroll
      })
      .onComplete(() => {
        setScrollBusy(false)
      })
      .easing(TWEEN.Easing.Cubic.InOut)
      .start()

    setScrollBusy(true)
  }

  useEffect(() => {
    ref.current.addEventListener(
      'scroll',
      debounce(() => {
        setNextActive(buttonActive('next'))
        setPrevActive(buttonActive('prev'))
      }, 250)
    )
  }, [buttonActive])

  return (
    <>
      {show && (
        <TopContainer>
          <div>
            {ref.current &&
              ref.current.clientWidth < ref.current.scrollWidth &&
              version === WorldVersion.DESKTOP && (
                <img
                  src="/arrow-down.svg"
                  className={`nav prev ${buttonActive('prev') ? 'active' : ''}`}
                  onClick={() => onScrollClick('prev')}
                />
              )}
          </div>
          {mode !== WorldMode.PROJECT_DETAILED && (
            <HideSlider onClick={() => dispatch(toggleSlider)}>
              <img src="/arrow-down.svg" />
              HIDE PREVIEWS
            </HideSlider>
          )}
          <div>
            {ref.current &&
              ref.current.clientWidth < ref.current.scrollWidth &&
              version === WorldVersion.DESKTOP && (
                <img
                  src="/arrow-down.svg"
                  className={`nav next ${buttonActive('next') ? 'active' : ''}`}
                  onClick={() => onScrollClick('next')}
                />
              )}
          </div>
        </TopContainer>
      )}
      <Container ref={ref} className={show && 'show'}>
        {projects &&
          projects.map((project: any, i: any) => (
            <>
              <Thumbnail
                className={
                  [
                    WorldMode.PROJECT_DETAILED,
                    WorldMode.PROJECT_PREVIEW,
                  ].includes(mode) &&
                  active.project &&
                  active.project.node._id === project.node._id
                    ? 'active'
                    : ''
                }
                onMouseEnter={() => handleMouseHover(i)}
                onMouseLeave={() => handleMouseHover()}
                onClick={() =>
                  !mouseDown.current &&
                  !dragged.current &&
                  (mode !== WorldMode.PROJECT_DETAILED ||
                    !active.project ||
                    active.project.node._id !== project.node._id) &&
                  dispatch(
                    setWorldMode(
                      version === WorldVersion.MOBILE &&
                        mode !== WorldMode.PROJECT_DETAILED
                        ? WorldMode.PROJECT_PREVIEW
                        : WorldMode.PROJECT_DETAILED,
                      {
                        project,
                        fromCarousel: true,
                        state: {
                          doAnimation: withAnimation,
                          delay: withAnimation ? 1500 : 0,
                          fadeVideo: true,
                        },
                      }
                    )
                  )
                }
                key={project.node._id}
                style={{
                  backgroundImage: `url(${get(
                    project,
                    'node.poster.asset.url'
                  )})`,
                }}
              >
                <div className="content">
                  <span>
                    {get(project, 'node.title', '')
                      .toUpperCase()
                      .split('{BR}')
                      .join('')}
                  </span>
                </div>
              </Thumbnail>
              {i < projects.length - 1 &&
                (!project.node.locationGroup ||
                  !projects[i + 1].node.locationGroup ||
                  project.node.locationGroup._id !==
                    projects[i + 1].node.locationGroup._id) && <AreaSpacer />}
            </>
          ))}
      </Container>
    </>
  )
}

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > div {
    min-width: 40px;
  }

  img.nav {
    display: inline-block;
    height: 10px;
    opacity: 0.5;
    cursor: pointer;

    &.active {
      opacity: 1;
    }

    &.next {
      transform: rotate(-90deg);
      margin-right: 15px;
    }

    &.prev {
      transform: rotate(90deg);
      margin-left: 15px;
    }
  }
`

const Container = styled.div`
  white-space: nowrap;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  overflow-scrolling: touch;
  height: auto;
  display: block;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transform: translate(0, 100%);
  transition: all 0.5s ease;
  padding-top: 10px;
  padding-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media ${breakpoints.phoneOnly} {
    padding-bottom: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &.show {
    opacity: 1;
    transform: translate(0, 0);
  }
`

const fill = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`

const HideSlider = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;

  img {
    height: 8px;
    width: auto;
    margin-right: 5px;

    @media ${breakpoints.phoneOnly} {
      height: 10px;
    }
  }
`

const Thumbnail = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  height: 115px;
  width: 200px;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    height: 80px;
    width: 160px;
    margin-right: 7px;
    margin-left: 7px;
  }

  &.active {
    transform: translateY(-10px);
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #fff;
    opacity: 1;

    &.active {
      animation: ${fill} 4s linear forwards;
    }
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    overflow: hidden;
    white-space: pre-wrap;
    user-select: none;
  }

  span {
    transition: 0.25s ease;
    transform: translateY(0);
  }
  &:hover span {
    transform: translateY(-5px);
  }
`

const AreaSpacer = styled.div`
  display: inline-block;
  width: 40px;
  background: transparent;
  pointer-events: none;
`

export default ProjectSlider
