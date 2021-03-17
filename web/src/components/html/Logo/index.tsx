import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'

const Logo = ({ ready }) => {
  const ref = useRef()
  const { hideVideo, setHideVideo } = useLogo()

  useEffect(() => {
    ref.current.load()
    ref.current.addEventListener('ended', () => setHideVideo(true))
    ref.current.addEventListener('error', () => setHideVideo(true))

    if (ready) {
      ref.current.play()
    }
  }, [ready])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" className={hideVideo ? '' : 'hidden'} />
        <video
          ref={ref}
          className={hideVideo ? 'hidden' : ''}
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
