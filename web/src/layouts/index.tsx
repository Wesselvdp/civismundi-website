import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import 'react-circular-progressbar/dist/styles.css'

import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'
import { SET_READY } from '../actions/types'

type T = any

const MIN_LOADING_TIME = 2000

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const world = useSelector((state) => state.world)
  const [loading, setLoading] = useState(true)
  const [startTime, setStartTime] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setStartTime(new Date().getTime())
  }, [])

  useEffect(() => {
    if (world.initialized) {
      const elapsed = new Date().getTime() - startTime

      setTimeout(() => {
        setLoading(false)
        setTimeout(() => {
          dispatch({ type: SET_READY })
        }, 1000)
      }, Math.max(MIN_LOADING_TIME - elapsed, 0))
    }
  }, [world.initialized])

  return (
    <>
      <WorldContainer location={location} layout={pageContext.layout} />
      <>
        <Navigation location={location} />
        <Main>{children}</Main>
      </>
      {!world.ready && (
        <Loader className={!loading && 'hidden'}>
          <img src="/cm-white.svg" />
          <div className="loader-circle"></div>
          <div className="loader-line-mask">
            <div className="loader-line"></div>
          </div>
        </Loader>
      )}
      {pageContext.layout !== 'home' && <GlobeButton />}
    </>
  )
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000;
  background-color: #000;
  opacity: 1;
  transition: all 1s ease;

  &.hidden {
    opacity: 0;
  }

  .loader-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1);
    margin-left: -100px;
    margin-top: -100px;
  }

  .loader-line-mask {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100px;
    width: 200px;
    margin-left: -100px;
    margin-top: -100px;
    overflow: hidden;
    transform-origin: 100px 100px;
    mask-image: linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    -webkit-mask-image: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    );
    animation-name: ${rotate};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    .loader-line {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.75);
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 150px;
    width: auto;
  }

  // .circle {
  //   height: 225px;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
`

const Main = styled.main`
  overflow-x: hidden;
`

export default Layout
