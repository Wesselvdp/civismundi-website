import React, { FC } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

type T = any

const BackgroundVideo: FC<T> = ({ video }) => {
  return (
    <VideoContainer>
      <ReactPlayer url={video} muted playing={true} loop={true} volume={0} />
    </VideoContainer>
  )
}

export default BackgroundVideo
const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  overflow: hidden;

  video {
    /* position: absolute; */
    /* left: 0;
    right: 0;*/
    height: 100%;
    object-fit: cover;
  }
  /*  */
`
