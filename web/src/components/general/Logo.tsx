import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { breakpoints } from '@utils/breakpoints'

type T = any

// const SPEED = 2.5;

const Logo: FC<T> = () => {
  // const ref = useRef();

  // const setVideoSpeed = () => {
  //   if (ref.current) {
  //     ref.current.playbackRate = SPEED;
  //   }
  // }

  return (
    <Link to="/">
      <Video autoPlay playsInline muted>
        <source src="/logo.webm" type="video/webm" />
      </Video>
    </Link>
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

  @media ${breakpoints.phoneOnly} {
    width: 180px;
    height: auto;
    margin-top: -10px;
    top: 15px;
  }
`

export default Logo;