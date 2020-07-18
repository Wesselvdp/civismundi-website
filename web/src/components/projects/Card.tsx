import React, { FC, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { get } from 'lodash'

import { breakpoints } from '@utils/breakpoints'

type T = {
  data: Project
}

const ProjectCard: FC<T> = ({ data }) => {
  const { title, slug } = data
  const poster = get(data, 'poster.asset.url')
  const video = get(data, 'video.asset.url')

  const ref = useRef()
  const [hidePoster, setHidePoster] = useState(false)
  
  const _onMouseEnter = () => {
    if (!ref.current) return

    setHidePoster(true)
    ref.current.play()
  }

  const _onMouseLeave = () => {
    if (!ref.current) return

    setHidePoster(false)
    setTimeout(() => {
      ref.current.pause()
    }, 500)
  }

  return (
    <Link to={`/projects/${slug.current}`}>
      <Card onMouseEnter={() => _onMouseEnter()} onMouseLeave={() => _onMouseLeave()}>
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

const Card = styled.div`
  text-align: left;
  max-width: 650px;
  margin: 0 auto;
`
const Content = styled.div`
  padding-left: 1em;
  text-decoration: none;
  margin-top: -3.5em;

  p {
    max-width: 75%;

    @media ${breakpoints.phoneOnly} {
      max-width: none;
    }
  }
`
const Visual = styled.div`
  margin-bottom: 1rem;
  position: relative;
  padding-top: 75%;
  
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

export default ProjectCard
