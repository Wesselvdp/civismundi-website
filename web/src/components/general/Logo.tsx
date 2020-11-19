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
    if (!world.loading && ref.current) {
      let timeout;

      // ref.current.addEventListener('loadstart', () => { timeout = setTimeout(() => setHideVideo(true), 1000)})
      ref.current.addEventListener('play', () => { timeout && clearTimeout(timeout) })
      ref.current.addEventListener('ended', () => setHideVideo(true))
      ref.current.addEventListener('error', () => setHideVideo(true))
    }
  }, [world.loading])

  if (world.loading) return null

  return (
    <Link to="/" onClick={() => dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))}>
      <Container>
        <img src="/logo-still.png" className={hideVideo ? '' : 'hidden'} />
        <video ref={ref} className={hideVideo ? 'hidden' : ''} playsInline autoPlay muted>
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
