import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'

const ProjectSlider = ({ show }) => {
  const w = useSelector((state: any) => state.world)
  const dispatch = useDispatch()

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const { active } = w
    if (!active || !active.areaProjects || !active.area || !active.project)
      return

    const index = Math.max(
      active.areaProjects.findIndex(
        (p: any) => p.node._id === active.project.node._id
      ),
      0
    )
    setActiveIndex(index)
  }, [w.active])

  const { active } = w
  if (!active || !active.areaProjects || !active.area || !active.project)
    return null

  return (
    <Container className={show && 'show'}>
      {active.areaProjects.map((project: any, i: any) => (
        <Thumbnail
          className={activeIndex === i && 'active'}
          onClick={() =>
            activeIndex !== i &&
            dispatch(
              setWorldMode(WorldMode.PROJECT_DETAILED, {
                project,
                state: { withAnimation: false, fadeVideo: true },
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
