import React, { useEffect, useRef } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import Swiper from 'swiper'
import { useDispatch } from 'react-redux'

import 'swiper/swiper.scss';

import { setActiveProject } from '../../actions/marker'

const ProjectSlider = ({ projects, show }) => {
  const swiper = useRef(null)
  const dispatch = useDispatch()

  useEffect(()=>{
    swiper.current = new Swiper('.swiper-container', {
      spaceBetween: 15,
      centeredSlides: true,
      slidesPerView: 'auto'
    })

  },[])

  useEffect(() => {
      swiper.current.slideTo(0)
      swiper.current.update()
  }, [projects, show])

  const onClick = (i: number) => {
    dispatch(setActiveProject(i))
    swiper.current.slideTo(i)
  }
  return (
    <Wrapper className={show ? 'show' : ''}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {projects.map((p: any, i: number) => (
            <div className="swiper-slide" onClick={() => onClick(i)}>
              <Slide style={{ backgroundImage: `url(${get(p, 'node.poster.asset.url')}` }} />
            </div>
          ))}
          <div className="swiper-slide empty"></div>
        </div>
      </div>
    </Wrapper>
  )
}

const Slide = styled.div`
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
`

const Wrapper = styled.div`
  opacity: 0;

  &.show {
    opacity: 1;
  }
`

export default ProjectSlider
