import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { get } from 'lodash'
import styled from 'styled-components'

import { WorldMode } from '../../actions'

const VideoBackground = ({}) => {
  const world = useSelector((state: any) => state.world)
  const videoRef = useRef(null)

  useEffect(() => {
    if (
      [
        WorldMode.PROJECT_PREVIEW,
        WorldMode.PROJECT_DETAILED,
        WorldMode.AREA_PREVIEW,
      ].includes(world.mode)
    ) {
      videoRef.current && videoRef.current.play()
    } else {
      videoRef.current && videoRef.current.pause()
    }
  }, [world.mode])

  const { active } = world
  if (!active.project && !active.area) return null

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
      } ${world.mode === WorldMode.PROJECT_DETAILED ? 'project-detailed' : ''}`}
    >
      <Transitioner>
        <video
          ref={videoRef}
          key={active.project ? get(world, 'active.project.node.video.asset.url') :  get(world, 'active.areaProjects[0].node.video.asset.url')}
          id="videoBG"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={active.project ? get(world, 'active.project.node.video.asset.url') :  get(world, 'active.areaProjects[0].node.video.asset.url')} type="video/mp4" />
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
