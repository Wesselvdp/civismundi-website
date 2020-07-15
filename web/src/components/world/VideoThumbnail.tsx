import React, { FC } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import TransitionLink from 'gatsby-plugin-transition-link'
import { get } from 'lodash'

import { TextAnim } from '@components/animations'
import { breakpoints } from '@utils/breakpoints'

const VideoThumbnail = ({ project, moveToProject, position, ref }) => {
  const video = get(project, 'node.video.asset.url')
  const poster = get(project, 'node.poster.asset.url')
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
          {video && (
            <video id="videoBG" poster={poster} playsInline autoPlay muted loop>
              <source src={video} type="video/mp4" />
            </video>
          )}
          <VideoContent>
            <TextAnim
              inProp={project}
              timeout={1000}
              appear={true}
              tag="h5"
              className="subtitle"
              text="Video direction"
            />
            <TextAnim 
              inProp={project}
              timeout={1000}
              appear={true}
              tag="h4"
              text={get(project, 'node.title', '')}
            />
            <TextAnim 
              inProp={project}
              timeout={1000}
              appear={true}
              tag="p"
              text="VIEW PROJECT"
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
`

export default VideoThumbnail