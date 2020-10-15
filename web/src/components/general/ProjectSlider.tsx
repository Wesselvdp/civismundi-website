import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'

const ProjectSlider = ({ projects, show, activeProject }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    let index =
      projects &&
      projects.findIndex((p: any) => p.node._id === activeProject._id)

    if (index < 0) {
      index = 0
    }

    setActiveIndex(index)
  }, [projects, activeProject])

  return (
    <Container className={show && 'show'}>
      {projects &&
        projects.map((p: any, i: any) => (
          <Thumbnail
            className={activeIndex === i && 'active'}
            onClick={() =>
              dispatch(
                setWorldMode(WorldMode.PROJECT_DETAILED, {
                  marker: projects[i],
                })
              )
            }
            key={p.node._id}
            style={{
              backgroundImage: `url(${get(p, 'node.poster.asset.url')})`,
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
