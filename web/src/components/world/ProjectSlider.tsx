import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

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
  overflow-x: scroll;
  overflow-y: hidden;
  overflow-scrolling: touch;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.show {
    opacity: 1;
  }
`

const Thumbnail = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 80px;
  width: 120px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  transform: translateY(30px);
  transition: all 0.5s ease;

  &.active {
    height: 100px;
    transform: translateY(20px);
  }
`

export default ProjectSlider
