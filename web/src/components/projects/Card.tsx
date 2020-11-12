import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { get } from 'lodash'
import handleViewport from 'react-in-viewport'
import { useDispatch } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import { WorldMode } from '../../actions'
import { setWorldMode } from '../../actions/mode'
import { Quote } from '@components/general'

const ProjectCard = ({ data, skipTransition = false, doAnimation = true }) => {
  const { title, locationGroup, city } = data
  const poster = get(data, 'poster.asset.url')
  const video = get(data, 'video.asset.url')

  const ref = useRef()
  const [hidePoster, setHidePoster] = useState(false)

  const dispatch = useDispatch()

  const playVideo = (pause = false) => {
    setHidePoster(true)
    if (ref.current) ref.current.play()
  }

  const pauseVideo = () => {
    setHidePoster(false)
    if (ref.current) ref.current.pause()
  }

  return (
    <Card
      className="card"
      onClick={() =>
        dispatch(
          setWorldMode(WorldMode.PROJECT_DETAILED, {
            project: { node: data },
            skipInTransition: skipTransition,
            state: {
              fadeVideo: true,
            }
          })
        )
      }
      onMouseEnter={() => playVideo()}
      onMouseLeave={() => pauseVideo()}
    >
      <Visual>
        <div
          className={`poster ${hidePoster ? 'hide' : ''}`}
          style={{ backgroundImage: `url(${poster})` }}
        ></div>
        <video ref={ref} muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </Visual>
      <Content>
        <h5 className="subtitle">
          {locationGroup ? locationGroup.title : city}
        </h5>
        <h4>{title.toUpperCase().split('{BR}').join('')}</h4>
        <Quote project={{ node: data }} animated={false} />
      </Content>
    </Card>
  )
}

export default handleViewport(ProjectCard)

const Card = styled.div`
  text-align: left;
  max-width: 733px;
  cursor: pointer;
`
const Content = styled.div`
  padding-left: 1em;
  text-decoration: none;
  margin-top: -3.5em;

  p {
    max-width: 75%;
    margin: 0;

    @media ${breakpoints.phoneOnly} {
      max-width: none;
    }
  }
`
const Visual = styled.div`
  margin-bottom: 1.25rem;
  position: relative;
  padding-top: 60%;

  .poster,
  video {
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translateY(-100%);
    object-fit: cover;
  }

  video {
    z-index: -2;
  }

  .poster {
    z-index: -1;
    background-size: cover;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;

    &.hide {
      opacity: 0;
    }
  }
`
