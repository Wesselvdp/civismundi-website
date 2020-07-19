import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { get } from 'lodash'
import handleViewport from 'react-in-viewport';

import { breakpoints } from '@utils/breakpoints'


const ProjectCard = ({ data, forwardedRef, allViewport, id }) => {
  const { title, slug } = data
  const poster = get(data, 'poster.asset.url')
  const video = get(data, 'video.asset.url')

  const ref = useRef()
  const [hidePoster, setHidePoster] = useState(false)

  const playVideo = (pause = false) => {
    setHidePoster(true)
    if (ref.current) ref.current.play()
  }

  const pauseVideo = () => {
    setHidePoster(false)
    if (ref.current) ref.current.pause()
  }

  // useEffect(() => {
  //   if (allViewport && allViewport.length) {
  //     if (id === allViewport[Math.max(0, Math.floor(allViewport.length / 2))]) {
  //       playVideo()
  //     } else {
  //       pauseVideo()
  //     }
  //   }
  // }, [allViewport])

  return (
    <Link to={`/projects/${slug.current}`} ref={forwardedRef}>
      <Card className="card" onMouseEnter={() => playVideo()} onMouseLeave={() => pauseVideo()}>
        <Visual>
          <div className={`poster ${hidePoster ? 'hide' : ''}`} style={{ backgroundImage: `url(${poster})` }}></div>
          <video ref={ref} muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </Visual>
        <Content>
          <h5 className="subtitle">VIDEO DIRECTION</h5>
          <h4>{title}</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            quaerat numquam labore aut excepturi veritatis laboriosam
          </p>
        </Content>
      </Card>
    </Link>
  )
}

export default handleViewport(ProjectCard)

const Card = styled.div`
  text-align: left;
  max-width: 750px;
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
  margin-bottom: 1rem;
  position: relative;
  padding-top: 60%;
  
  .poster, video {
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
