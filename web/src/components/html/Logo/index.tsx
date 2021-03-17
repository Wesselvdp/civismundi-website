import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'

const Logo = ({ ready }) => {
  // const ref = useRef()
  // const { hideVideo, setHideVideo } = useLogo()

  // const canPlayLogoVideo = () => {
  //   return true
  //   // return ref.current.canPlayType('video/webm; codecs="vp8, vorbis"')
  // }

  // useEffect(() => {
  //   if (canPlayLogoVideo()) {
  //     ref.current.load()
  //   }

  //   if (ready) {
  //     canPlayLogoVideo() ? ref.current.play() : setHideVideo(true)
  //   }
  // }, [ready])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" />
        {/* <video
          ref={ref}
          className={hideVideo ? 'hidden' : ''}
          playsInline
          muted
        >
        </video> */}
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
