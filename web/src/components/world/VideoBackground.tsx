import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { get } from 'lodash'
import styled from 'styled-components'

import { WorldMode } from '../../actions'
import { incrementActiveProjectIndex } from '../../actions/mode'
import { SET_FADING_VIDEO } from '../../actions/types'

const VideoBackground = () => {
  const dispatch = useDispatch()

  const world = useSelector((state: any) => state.world)
  const active = useSelector((state: any) => state.world && state.world.active)

  const videoRef = useRef(null)
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    const url = active.project
      ? get(active, 'project.node.video.asset.url')
      : get(active, `areaProjects[${active.projectIndex}].node.video.asset.url`)

    if (url && url !== videoUrl) {
      setVideoUrl(url)
    }
  }, [active.project, active.projectIndex])

  useEffect(() => {
    let timer: any

    if (world.fadingVideo) {
      timer = setTimeout(
        () => dispatch({ type: SET_FADING_VIDEO, fading: false }),
        1000
      )
    }

    return () => clearTimeout(timer)
  }, [world.fadingVideo])

  const onVideoEnded = () => {
    active.project
      ? videoRef.current.play()
      : dispatch(incrementActiveProjectIndex())
  }

  return (
    <Wrapper
      className={`${
        [
          WorldMode.PROJECT_PREVIEW,
          WorldMode.PROJECT_DETAILED,
          WorldMode.AREA_PREVIEW,
        ].includes(world.mode)
          ? 'visible'
          : ''
      } ${
        world.mode === WorldMode.PROJECT_DETAILED ? 'project-detailed' : ''
      } ${world.fadingVideo ? 'fading' : ''} `}
    >
      <Transitioner>
        <video
          ref={videoRef}
          key={videoUrl}
          id="videoBG"
          playsInline
          autoPlay
          muted
          onEnded={() => onVideoEnded()}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Transitioner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &.visible {
    opacity: 1;
  }

  &.fading {
    opacity: 0 !important;
  }
`

const Transitioner = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
  transition: opacity 1000ms ease-in-out;

  &.hide {
    opacity: 0;
  }
`

export default VideoBackground
