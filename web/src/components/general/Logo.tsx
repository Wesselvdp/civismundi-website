import React, { FC, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import useLogo from '@hooks/useLogo'

import { WorldMode } from '../../actions'
import { setWorldMode } from '../../actions/mode'

type T = any

const Logo: FC<T> = () => {
  const ref = useRef()
  const { hideVideo, setHideVideo } = useLogo()
  const dispatch = useDispatch()
  const world = useSelector(state => state.world)

  useEffect(() => {
    if (world.ready) {
      ref.current.play()

      ref.current.addEventListener('ended', () => setHideVideo(true))
      ref.current.addEventListener('error', () => setHideVideo(true))
    }
  }, [world.ready])

  return (
    <Link to="/">
      <Container>
        <img src="/logo-still.png" className={hideVideo ? '' : 'hidden'} />
        <video ref={ref} className={hideVideo ? 'hidden' : ''} playsInline muted>
          <source src="/cm-logo-3-1.mov" type="video/quicktime" />
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

export default Logo;
