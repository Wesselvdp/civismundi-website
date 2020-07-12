import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

type T = any

const SPEED = 2.5;

const Logo: FC<T> = () => {
  const ref = useRef();

  const setVideoSpeed = () => {
    if (ref.current) {
      ref.current.playbackRate = SPEED;
    }
  }

return (
    <Video ref={ref} onCanPlay={() => setVideoSpeed()} autoPlay muted>
      <source src="/logo.webm" type="video/webm" />
    </Video>
  );
};

const Video = styled.video`
  margin-top: -15px;
  height: 75px;
  width: 245px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);

  ${isMobile ? `
    width: 200px;
    height: auto;
    margin-top: -10px;
  ` : ''}
`

export default Logo;