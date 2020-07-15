import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { breakpoints } from '@utils/breakpoints'

type T = any

// const SPEED = 2.5;

const Logo: FC<T> = () => {
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
    width: 220px;
    height: auto;
    margin-top: -15px;
    top: 11px;
  }
`

export default Logo;