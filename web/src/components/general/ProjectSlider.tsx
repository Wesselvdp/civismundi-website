import React, { useEffect, useState, useRef } from 'react'
import { get, debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'
import { SET_SLIDER_SCROLL } from '../../actions/types'

const ProjectSlider = ({ show, location }) => {
  const active = useSelector((state: any) => state.world.active || {})
  const scroll = useSelector((state: any) => state.world.sliderScroll)
  const fading = useSelector(
    (state: any) => state.world.fadingVideo || state.world.fadingPage
  )
  const dispatch = useDispatch()
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = scroll

      ref.current.addEventListener(
        'scroll',
        debounce(() => {
          dispatch({ type: SET_SLIDER_SCROLL, scroll: ref.current.scrollLeft })
        }, 250)
      )
    }
  }, [])

  return (
    <Container ref={ref} className={show && !fading && 'show'}>
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
          />
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
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transform: translate(0, 100%);
  transition: all 0.5s ease;

  @media ${breakpoints.phoneOnly} {
    height: 105px;
    display: block;
  }

  &.show {
    opacity: 1;
    transform: translate(0, 0);
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
  height: 100px;
  width: 160px;
  transition: all 0.5s ease;
  cursor: pointer;

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
`

export default ProjectSlider
