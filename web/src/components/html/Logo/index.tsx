import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
// import useLogo from '@hooks/useLogo'
import { isSafari, isMobileSafari } from 'react-device-detect'
// const canPlayVideo = !isSafari || isMobileSafari

const Logo = ({ ready }) => {
  const ref = useRef()

  const [canPlayVideo] = useState(!isSafari || isMobileSafari)
  console.log('device safari', isSafari, 'mobile safari', isMobileSafari)
  useEffect(() => {
    if (canPlayVideo) {
      ref.current.load()
    }
  }, [])

  useEffect(() => {
    if (ready && canPlayVideo) {
      ref.current.play()
    }
  }, [ready])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" className={canPlayVideo ? 'hidden' : ''} />
        <video
          ref={ref}
          className={canPlayVideo ? '' : 'hidden'}
          playsInline
          muted
        >
          <source src="/cm-logo-3-1.mov" type="video/quicktime" />
          <source src="/logo4.webm" type="video/webm" />
        </video>
      </Container>
    </Link>
  )
}

const Container = styled.div`
  img,
  video {
    margin-top: -15px;
    height: 75px;
    width: 245px;
    position: fixed;
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

export default Logo
