import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'
import { isSafari, isMobileSafari } from 'react-device-detect'

const Logo = ({ ready }) => {
  const ref = useRef()

  const canPlayLogoVideo = () => {
    return !isSafari || isMobileSafari
  }

  useEffect(() => {
    if (!canPlayLogoVideo()) return
    ref.current.load()

    if (ready) {
      ref.current.play()
    }
  }, [ready])

  return (
    <Link to="/">
      <Container>
        {!canPlayLogoVideo() && <img src="/logo-still.png" />}
        {canPlayLogoVideo() && (
          <video ref={ref} playsInline muted>
            <source src="/logo4.webm" type="video/webm" />
          </video>
        )}
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
