import React, { FC, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'

type T = any

const Logo: FC<T> = () => {
  const ref = useRef()
  const { hideVideo, setHideVideo } = useLogo()

  useEffect(() => {
    if (ref.current) {
      let timeout;

      ref.current.addEventListener('loadstart', () => { timeout = setTimeout(() => setHideVideo(true), 1000)})
      ref.current.addEventListener('play', () => { timeout && clearTimeout(timeout) })
    }
  }, [ref.current])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" className={hideVideo ? '' : 'hidden'} />
        <video ref={ref} className={hideVideo ? 'hidden' : ''} playsInline autoPlay muted>
          <source src="/logo4.webm" type="video/webm" />
        </video>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  img, video {
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

    &.hidden {
      opacity: 0;
    }
  }
`

export default Logo;