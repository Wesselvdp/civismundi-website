import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { get } from 'lodash'
import styled from 'styled-components'

import { WorldMode } from '../../actions'

const VideoPlayer = () => {
  const dispatch = useDispatch()

  const world = useSelector((state: any) => state.world)
  const active = useSelector((state: any) => get(state, 'world.active', {}))

  const videos = useRef(null)
  const [activeVideo, setActiveVideo] = useState('')
  const [error, setError] = useState(false)
  const [prevVideo, setPrevVideo] = useState(null)
  const timer = useRef(null)

  const getActiveProject = () => {
    return active.project
  }

  const getVideoElem = (projectId: string) =>
    Array.from(videos.current.children).find(
      (child: any) => child.id === `video-${projectId}`
    )

  const makeVideoReady = () => {
    clearTimeout(timer.current)

    const project = getActiveProject()

    if (world.mode === WorldMode.PROJECTS_EXPLORE) {
      setActiveVideo('')
    } else if (project) {
      setActiveVideo(project.node._id)
    }

    if (!project) return

    // DOM modifications
    const elem = getVideoElem(project.node._id)
    if (prevVideo) {
      prevVideo.pause()

      if (prevVideo.id !== elem.id) {
        prevVideo.currentTime = 0
      }
    }
    setPrevVideo(elem)

    if (!elem) return
    elem.play()
  }

  useEffect(() => {
    makeVideoReady()
  }, [active.project, active.area, active.projectIndex, world.mode])

  return (
    <Wrapper
      className={`${
        [
          WorldMode.PROJECT_PREVIEW,
          WorldMode.PROJECT_DETAILED,
        ].includes(world.mode)
          ? 'visible'
          : ''
      } ${
        world.mode === WorldMode.PROJECT_DETAILED ? 'project-detailed' : ''
      } ${world.fadingVideo ? 'fading' : ''}`}
    >
      {!error && (
        <div ref={videos}>
          {world.projects &&
            world.projects.map((project: any, i: number) => {
              const url = get(project, 'node.video.asset.url')
              const id = get(project, 'node._id')

              return url ? (
                <video
                  key={id}
                  id={`video-${id}`}
                  playsInline
                  muted
                  loop
                  preload="auto"
                  className={activeVideo === id ? 'active' : ''}
                >
                  <source src={url} type="video/mp4" />
                </video>
              ) : null
            })}
        </div>
      )}
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

  div {
    height: 100%;
    width: 100%;
    position: relative;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease;

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }

  &.visible {
    opacity: 1;
  }

  &.fading {
    opacity: 0 !important;
  }
`

export default VideoPlayer
