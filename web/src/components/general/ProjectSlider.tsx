import React, { useEffect, useState, useRef } from 'react'
import { get, debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode, toggleSlider } from '../../actions/mode'
import { WorldMode, WorldVersion } from '../../actions'

const ProjectSlider = ({ show, withAnimation = false, }) => {
  const mode = useSelector((state: any) => state.world.mode)
  const projects = useSelector((state: any) => state.world.projects || [])
  const active = useSelector((state: any) => state.world.active || {})
  const version = useSelector((state: any) => state.world.version);

  const dispatch = useDispatch()
  const ref = useRef(null)

  useEffect(() => {
    if (active.fromCarousel) return

    const child = get(ref, 'current.childNodes[0]')
    let tWidth = 0
    if (child) {
      const style = child.currentStyle || window.getComputedStyle(child)
      const width = child.offsetWidth
      const margin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      const padding =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
      tWidth = width + margin - padding

      const center = ref.current.clientWidth / 2
      const thumbnailCenter = active.projectIndex * tWidth + 0.5 * tWidth
      const newScroll = Math.max(
        0,
        Math.min(ref.current.scrollWidth, thumbnailCenter - center)
      )

      ref.current.scrollLeft = newScroll;
    }
    // TODO: scroll in view on change project
  }, [active.project])

  const handleMouseHover = (i = null) => {
    if (![WorldMode.PROJECTS_EXPLORE, WorldMode.PROJECT_PREVIEW].includes(mode)) return

    if (i === null) {
      return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
    }

    if (active.projectIndex !== i) {
      return dispatch(setWorldMode(WorldMode.PROJECT_PREVIEW, { project: projects[i], fromCarousel: true }))
    }
  }

  return (
    <>
      {show && mode !== WorldMode.PROJECT_DETAILED && (
        <HideSlider onClick={() => dispatch(toggleSlider)}>
          <img src="/arrow-down.svg" />
          HIDE PREVIEWS
        </HideSlider>
      )}
      <Container ref={ref} className={show && 'show'}>
        {projects && projects.map((project: any, i: any) => (
          <>
            <Thumbnail
              className={[WorldMode.PROJECT_DETAILED, WorldMode.PROJECT_PREVIEW].includes(mode) && active.project && active.project.node._id === project.node._id ? 'active' : ''}
              onMouseEnter={() => handleMouseHover(i)}
              onMouseLeave={() => handleMouseHover()}
              onClick={() =>
                (!active.project || active.project.node._id !== project.node._id) &&
                  dispatch(
                    setWorldMode(version === WorldVersion.MOBILE && mode !== WorldMode.PROJECT_DETAILED ? WorldMode.PROJECT_PREVIEW : WorldMode.PROJECT_DETAILED, {
                      project,
                      state: {
                        doAnimation: withAnimation,
                        delay: withAnimation ? 1500 : 0,
                        fadeVideo: true,
                      },
                    })
                  )
              }
              key={project.node._id}
              style={{
                backgroundImage: `url(${get(project, 'node.poster.asset.url')})`,
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
            {/* {i < projects.length - 1 && (!project.node.locationGroup || !projects[i + 1].node.locationGroup || project.node.locationGroup._id !== projects[i + 1].node.locationGroup._id) && (
              <AreaSpacer />
            )} */}
          </>
          ))}
      </Container>
    </>
  )
}

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

  img {
    height: 85%;
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
  margin-bottom: 20px;
  height: 115px;
  width: 200px;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    height: 80px;
    width: 132px;
    margin-bottom: 0;
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
