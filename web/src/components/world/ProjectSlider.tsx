import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { setActiveProject } from '../../actions/marker'

const ProjectSlider = ({ projects, show }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (projects.length > activeIndex) {
      dispatch(setActiveProject(activeIndex))
    }
  }, [activeIndex])

  useEffect(() => {
    setActiveIndex(0)
  }, [projects])

  return (
    <Container className={show && 'show'}>
      {projects &&
        projects.map((p: any, i: any) => (
          <Thumbnail
            className={activeIndex === i && 'active'}
            onClick={() => setActiveIndex(i)}
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
  opacity: 0;
  transition: opacity 0.5s ease;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  @media ${breakpoints.phoneOnly} {
    height: 70px;
  }

  &.show {
    opacity: 1;
  }
`

const Thumbnail = styled.div`
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  height: 100px;
  width: 160px;
  transition: all 0.5s ease;

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
