import React, { FC, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'

type T = any

// const SPEED = 2.5;

const Logo: FC<T> = () => {
  const ref = useRef()
  const { hideVideo, setHideVideo } = useLogo()

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('ended', () => setHideVideo(false));

      return () => ref.current.removeEventListener('ended', setHideVideo)
    }
  }, [ref.current])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" className={hideVideo ? '' : 'hidden'} />
        <video className={hideVideo ? 'hidden' : ''} ref={ref} autoPlay playsInline muted>
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