import React, { useEffect, useState, useRef } from 'react'
import { get, debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import TWEEN from '@tweenjs/tween.js'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'
import { SET_SLIDER_SCROLL } from '../../actions/types'
// import console = require('console');
// import console = require('console');
// import console = require('console');

const ProjectSlider = ({
  show,
  location,
  showOnFade,
  withProgressBar,
  withAnimation,
}) => {
  const world = useSelector((state: any) => state.world)
  const active = useSelector((state: any) => state.world.active || {})

  const dispatch = useDispatch()
  const ref = useRef(null)
  const [thumbnailWidth, setThumbnailWidth] = useState(0)

  useEffect(() => {
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
    }

    const center = ref.current.clientWidth / 2
    const thumbnailCenter = active.projectIndex * tWidth + 0.5 * tWidth
    const newScroll = Math.max(
      0,
      Math.min(ref.current.scrollWidth, thumbnailCenter - center)
    )
    const curScroll = ref.current.scrollLeft

    new TWEEN.Tween({ scroll: curScroll })
      .to({ scroll: newScroll }, 500)
      .onUpdate((d) => {
        if (ref.current) ref.current.scrollLeft = d.scroll
      })
      .start()
  }, [active.areaProjects, active.projectIndex])

  return (
    <Container ref={ref} className={show && 'show'}>
      {active.areaProjects &&
        active.areaProjects.map((project: any, i: any) => (
          <Thumbnail
            className={active.projectIndex === i && 'active'}
            onClick={() =>
              active.projectIndex !== i &&
              dispatch(
                setWorldMode(WorldMode.PROJECT_DETAILED, {
                  project,
                  state: {
                    withAnimation: false,
                    fadeVideo: true,
                    keepSliderScroll: true,
                  },
                })
              )
            }
            key={project.node._id}
            style={{
              backgroundImage: `url(${get(project, 'node.poster.asset.url')})`,
            }}
          >
            {withProgressBar && (
              <div
                className={`progress-bar ${
                  active.projectIndex === i && show && 'active'
                }`}
              ></div>
            )}
            <div className="content">
              <span>
                {get(project, 'node.title', '')
                  .toUpperCase()
                  .split('{BR}')
                  .join('')}
              </span>
            </div>
          </Thumbnail>
        ))}
    </Container>
  )
}

const Container = styled.div`
  white-space: nowrap;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  overflow-scrolling: touch;
  height: 161px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transform: translate(0, 100%);
  transition: all 0.5s ease;

  @media ${breakpoints.phoneOnly} {
    display: block;
    height: 150px;
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

const Thumbnail = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  height: 115px;
  width: 184px;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    height: 80px;
    width: 132px;
    margin-bottom: 0;
    margin-right: 7px;
    margin-left: 7px;
    transform: translateY(30px);
  }

  &.active {
    transform: translateY(-20px);

    @media ${breakpoints.phoneOnly} {
      transform: translateY(20px);
    }
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

export default ProjectSlider
