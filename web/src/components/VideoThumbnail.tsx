import React, { FC } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import LocalizedLink from '@components/LocalizedLink'
import TextAnimation from '@components/TextAnimation'

type T = {
  preview: any,
  position: any,
  videoEl: any,
}

const VideoThumbnail: FC<T> = ({
  preview,
  position,
  videoEl,
}) => {
  return (
    <LocalizedLink to={preview ?  `/projects/${preview.node.slug.current}` : ''}>
      <CSSTransition in={!!preview} appear={true} timeout={300} classNames="video">
        <VideoBox ref={videoEl} style={position ? { left: position.x, top: position.y } : { opacity: 0 }}>
          <video id="videoBG" autoPlay muted loop>
            <source src="/stargazing.mp4" type="video/mp4" />
          </video>
          <VideoContent>
            <TextAnimation inProp={!!preview} timeout={1000} appear={true} tag="h6" text="Video direction" className="pre-title" />
            <TextAnimation inProp={!!preview} timeout={1000} appear={true} tag="h6" text={preview ? preview.node.title : ''} className="title" />
          </VideoContent>
        </VideoBox>
      </CSSTransition>
    </LocalizedLink>
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
    transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 250ms;
  }

  &.video-enter-done, &.video-appear-done {
    transform: none;
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

  .title {
    margin: 0;
    font-size: 28px;
  }

  .pre-title {
    font-size: 16px;
  }
`

export default VideoThumbnail