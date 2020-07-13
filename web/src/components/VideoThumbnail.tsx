import React, { FC } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import TransitionLink from 'gatsby-plugin-transition-link'
import { get } from 'lodash'
import ReactPlayer from 'react-player'

import TextAnimation from '@components/TextAnimation'
// import console = require('console');

const VideoThumbnail = ({ project, moveToProject, position, ref }) => {
  const video = get(project, 'node.video.asset.url')
  const slug = get(project, 'node.slug.current')

  return (
    <TransitionLink
      to={`/projects/${slug}`}
      exit={{ 
        delay: 0,
        length: 1.75,
        zIndex: 1,
        trigger: () => moveToProject()
      }}
      entry={{ delay: 0, length: 1, zIndex: 0 }}
    >
      <CSSTransition in={project} appear={true} timeout={300} classNames="video">
        <VideoBox ref={ref} style={position ? { left: position.x, top: position.y } : { opacity: 0 }}>
          {video && <ReactPlayer url={video} muted playing={true} loop={true} autoPlay={true} volume={0} />}
          <VideoContent>
            <TextAnimation
              inProp={project}
              timeout={1000}
              appear={true}
              tag="h6"
              text="Video direction"
              className="pre-title small"
            />
            <TextAnimation 
              inProp={project}
              timeout={1000}
              appear={true}
              tag="h4"
              text={get(project, 'node.title', '')}
            />
            <TextAnimation 
              inProp={project}
              timeout={1000}
              appear={true}
              tag="h6"
              text="View project"
            />
          </VideoContent>
        </VideoBox>
      </CSSTransition>
    </TransitionLink>
  )
}

const VideoBox = styled.div`
  position: absolute;
  height: 175px;
  width: 350px;
  display: flex;
  overflow: hidden;
  will-change: transform;

  &.video-enter, &.video-appear {
    transform: scale(0.2);
    transform-origin: 50% 50%;
    opacity: 0;
  } 

  &.video-enter-active, &.video-appear-active {
    transform: none;
    opacity: 1;
    transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s, opacity 250ms ease 0.5s;
  }

  &.video-enter-done, &.video-appear-done {
    transform: none;
    opacity: 1;
  }

  &.video-exit {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: none;
  }

  &.video-exit-active {
    transform: scale(0.8);
    opacity: 0;
    transition: transform 300ms ease, opacity 250ms ease;
  }

  video {
    height: 100%;
    object-fit: cover;
  }
`;

const VideoContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 15px;
  width: 100%;

  h4 {
    margin-bottom: 5px;
    font-size: 30px;
  }
`

export default VideoThumbnail