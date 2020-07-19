import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import TransitionLink from 'gatsby-plugin-transition-link'
import { get } from 'lodash'

import { TextAnim } from '@components/animations'
import { breakpoints } from '@utils/breakpoints'

export enum ThumbnailState {
  OFF = 1,
  VIDEO_IN = 2,
  SUBTITLE_IN = 3,
  TITLE_IN = 4,
  C2A_IN = 5
}
const VideoThumbnail = ({ project, moveToProject, position, ref }) => {
  const video = get(project, 'node.video.asset.url')
  const poster = get(project, 'node.poster.asset.url')
  const slug = get(project, 'node.slug.current')

  const [state, setState] = useState(ThumbnailState.OFF)

  useEffect(() => {
    if (!project) setState(ThumbnailState.OFF)
    else setState(ThumbnailState.VIDEO_IN)
  }, [project])

  return (
    <TransitionLink
      to={`/projects/${slug}`}
      exit={{ 
        delay: 0,
        length: 3,
        zIndex: 1,
        trigger: () => moveToProject()
      }}
      entry={{ delay: 0, length: 1, zIndex: 0 }}
    >
      <CSSTransition
        in={state >= ThumbnailState.VIDEO_IN}
        timeout={{ enter: 100 }}
        onEntered={() => setState(ThumbnailState.SUBTITLE_IN)}
        classNames="video"
      >
        <VideoBox ref={ref} style={position ? { left: position.x, top: position.y } : { left: -1000, top: -1000 }}>
          {video && (
            <video id="videoBG" poster={poster} playsInline autoPlay muted loop>
              <source src={video} type="video/mp4" />
            </video>
          )}
          <VideoContent>
            <TextAnim
              inProp={state >= ThumbnailState.SUBTITLE_IN}
              timeout={{ enter: 200 }}
              onEntered={() => setState(ThumbnailState.TITLE_IN)}
              tag="h5"
              className="subtitle"
              text="Video direction"
            />
            <TextAnim 
              inProp={state >= ThumbnailState.TITLE_IN}
              timeout={{ enter: 200 }}
              onEntered={() => setState(ThumbnailState.C2A_IN)}
              tag="h4"
              text={get(project, 'node.title', '')}
            />
            <TextAnim 
              inProp={state >= ThumbnailState.C2A_IN}
              timeout={{ enter: 200 }}
              tag="p"
              text="VIEW PROJECT"
              className="heading"
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
  overflow: hidden;

  @media ${breakpoints.phoneOnly} {
    top: 75px !important;
    left: 50% !important;
    height: 125px;
  }

  &.video-enter, &.video-appear {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0.2);

    @media ${breakpoints.phoneOnly} {
      transform: translate(-50%, 0) scale(0.2);
      transform: translate(-50%, 0) scale(0.2);
    }
  } 

  &.video-enter-active, &.video-appear-active {
    opacity: 1;
    transform: none;
    transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 250ms ease;

    @media ${breakpoints.phoneOnly} {
      transform: translate(-50%, 0) scale(1);
      transform: translate(-50%, 0) scale(1);
    }
  }

  &.video-enter-done, &.video-appear-done {
    opacity: 1;
    transform: none;

    @media ${breakpoints.phoneOnly} {
      transform: translate(-50%, 0) scale(1);
      transform: translate(-50%, 0) scale(1);
    }
  }

  &.video-exit {
    opacity: 1;
    transform: none;
    transform-origin: 50% 50%;

    @media ${breakpoints.phoneOnly} {
      transform: translate(-50%, 0) scale(1);
      transform: translate(-50%, 0) scale(1);
    }
  }

  &.video-exit-active {
    opacity: 0;
    transform: scale(0.8);
    transition: transform 300ms ease, opacity 250ms ease;

    @media ${breakpoints.phoneOnly} {
      transform: translate(-50%, 0) scale(0.8);
      transform: translate(-50%, 0) scale(0.8);
    }
  }

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;

    @media ${breakpoints.phoneOnly} {
      width: 100%;
      padding: 0 50px;
    }
  }
`;

const VideoContent = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  padding: 0 15px;
  transform: translateY(-50%);

  h4 {
    @media ${breakpoints.phoneOnly} {
      font-size: 28px;
    }
  }

  h4, h5, p {
    margin: 0;

    &.subtitle {
      font-size: 10px;

      @media ${breakpoints.phoneOnly} {
        font-size: 8px;
      }
    }
  }

  p {
    @media ${breakpoints.phoneOnly} {
      font-size: 12px;
    }
  }
`

export default VideoThumbnail