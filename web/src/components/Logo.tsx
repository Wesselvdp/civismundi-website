import React, { FC, useRef } from 'react'
import styled from 'styled-components'

type T = any

const SPEED = 2.5;
const HEIGHT = 60;

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
  height: ${HEIGHT}px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`

export default Logo;