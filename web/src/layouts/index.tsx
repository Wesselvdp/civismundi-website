import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Lottie from 'react-lottie'
import TWEEN from '@tweenjs/tween.js'

import animationData from './lottie-globe.json'
import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'
import {
  WORLD_SET_LOADING,
  WORLD_SET_READY,
  SET_FADING_PAGE,
} from '../actions/types'

type T = any

const MIN_LOADING_TIME = 2000
const CIRCLE_SIZE = 60
const CIRCUMFERENCE = CIRCLE_SIZE * 2 * Math.PI

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const world = useSelector((state) => state.world)
  const dispatch = useDispatch()

  const progressRing = useRef(null)
  const progressRingFinal = useRef(null)
  const [pseudoProgress, setPseudoProgress] = useState(0)
  const [defaultProgress, setDefaultProgress] = useState(0)

  useEffect(() => {
    if (world.loading) {
      setTimeout(() => {
        new TWEEN.Tween({ progress: 0 })
          .to({ progress: 1 }, 3000)
          .onUpdate((d) => {
            setDefaultProgress(d.progress)
          })
          .easing(TWEEN.Easing.Cubic.InOut)
          .start()
      }, 1000)
    }
  }, [world.loading])

  useEffect(() => {
    new TWEEN.Tween({ progress: pseudoProgress })
      .to({ progress: world.progress }, 500)
      .onUpdate((d) => {
        setPseudoProgress(d.progress)
      })
      .easing(TWEEN.Easing.Cubic.InOut)
      .start()
  }, [world.progress])

  useEffect(() => {
    const progress = Math.min(pseudoProgress, defaultProgress)
    const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE

    progressRing.current.style.strokeDashoffset = offset

    if (progress === 1) {
      dispatch({ type: WORLD_SET_LOADING, loading: false })
    }
  }, [pseudoProgress, defaultProgress])

  useEffect(() => {
    if (!world.loading) {
      setTimeout(() => {
        new TWEEN.Tween({ progress: 0 })
          .to({ progress: 1 }, 1000)
          .onStart((d) => {
            progressRingFinal.current.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`
            progressRingFinal.current.style.strokeDashoffset = CIRCUMFERENCE
          })
          .onUpdate((d) => {
            const offset = CIRCUMFERENCE - d.progress * CIRCUMFERENCE
            progressRingFinal.current.style.strokeDashoffset = offset
          })
          .easing(TWEEN.Easing.Cubic.InOut)
          .start()
      }, 250)

      setTimeout(() => {
        dispatch({ type: WORLD_SET_READY, ready: true })
      }, 1250)
    }
  }, [world.loading])

  useEffect(() => {
    let timer

    if (world.fadingPage) {
      timer = setTimeout(
        () => dispatch({ type: SET_FADING_PAGE, fading: false }),
        500
      )
    }

    return () => clearTimeout(timer)
  }, [world.fadingPage])

  return (
    <>
      <WorldWrapper className={world.fadingPage && 'fading'}>
        <WorldContainer location={location} layout={pageContext.layout} />
      </WorldWrapper>
      <>
        <Navigation location={location} />
        <Main className={world.fadingPage && 'fading'}>{children}</Main>
      </>
      <Loader className={world.ready ? 'hidden' : ''}>
        <div>
          <div className="lottie-wrapper">
            <Lottie
              options={defaultOptions}
              height={87}
              width={87}
              isStopped={false}
              isPaused={false}
            />
            <svg
              className="progress-ring"
              width={CIRCLE_SIZE * 2}
              height={CIRCLE_SIZE * 2}
            >
              <circle
                ref={progressRing}
                className="progress-ring__circle"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1"
                fill="transparent"
                r={CIRCLE_SIZE - 2}
                cx={CIRCLE_SIZE}
                cy={CIRCLE_SIZE}
              />
              <circle
                ref={progressRingFinal}
                className="progress-ring__circle"
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="1"
                fill="transparent"
                r={CIRCLE_SIZE - 2}
                cx={CIRCLE_SIZE}
                cy={CIRCLE_SIZE}
              />
            </svg>
          </div>
          <p className={!world.initialized && 'hidden'}>{`${parseInt(
            Math.min(pseudoProgress, defaultProgress) * 100,
            10
          )}%`}</p>
        </div>
      </Loader>
      {pageContext.layout !== 'home' && (
        <GlobeButton transparent={pageContext.layout === 'project-detailed'} />
      )}
    </>
  )
}

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
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hidden,
  .hidden {
    opacity: 0;
  }

  .lottie-wrapper {
    position: relative;
    margin-bottom: 15px;

    .progress-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &__circle {
        stroke-dashoffset: ${CIRCUMFERENCE};
        stroke-dasharray: ${CIRCUMFERENCE} ${CIRCUMFERENCE};
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    }
  }
`

const Main = styled.main`
  overflow-x: hidden;
  opacity: 1;
  transition: opacity 0.5s ease;

  &.fading {
    opacity: 0;
  }
`

const WorldWrapper = styled.div`
  opacity: 1;
  transition: opacity 0.5s ease;

  &.fading {
    opacity: 0;
  }
`

export default Layout
