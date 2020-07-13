import React, { FC } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

type T = any

const BackgroundVideo: FC<T> = ({ video }) => {
  return (
    <VideoContainer>
      <ReactPlayer width="100%" height="100%" className="video" url={video} muted playing={true} loop={true} volume={0} />
    </VideoContainer>
  )
}

export default BackgroundVideo
const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  overflow: hidden;

  video {
    object-fit: cover;
  }
  /*  */
`
