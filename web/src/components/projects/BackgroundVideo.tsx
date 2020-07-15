import React, { FC } from 'react'
import styled from 'styled-components'

type T = any

const BackgroundVideo: FC<T> = ({ video }) => {
  return (
    <VideoContainer>
      <video playsInline autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </VideoContainer>
  )
}

export default BackgroundVideo
const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  overflow: hidden;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
