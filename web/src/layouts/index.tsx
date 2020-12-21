import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Lottie from 'react-lottie'
import TWEEN from '@tweenjs/tween.js'

import animationData from './data.json'
import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'
import {
  WORLD_SET_LOADING,
  WORLD_SET_READY,
  SET_FADING_PAGE,
} from '../actions/types'

type T = any

const MIN_LOADING_TIME = 2000

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

  useEffect(() => {
    const radius = progressRing.current.r.baseVal.value
    const circumference = radius * 2 * Math.PI

    console.log('new tween', pseudoProgress, world.progress)

    new TWEEN.Tween({ progress: pseudoProgress })
      .to({ progress: world.progress }, 500)
      .onUpdate((d) => {
        setPseudoProgress(d.progress)

        const offset = circumference - d.progress * circumference
        progressRing.current.style.strokeDashoffset = offset
      })
      .easing(TWEEN.Easing.Cubic.InOut)
      .start()
  }, [world.progress])

  useEffect(() => {
    if (!world.loading) {
      const radius = progressRing.current.r.baseVal.value
      const circumference = radius * 2 * Math.PI

      setTimeout(() => {
        new TWEEN.Tween({ progress: 0 })
          .to({ progress: 1 }, 1000)
          .onStart((d) => {
            progressRingFinal.current.style.strokeDasharray = `${circumference} ${circumference}`
            progressRingFinal.current.style.strokeDashoffset = circumference
          })
          .onUpdate((d) => {
            const offset = circumference - d.progress * circumference
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
              height={125}
              width={125}
              isStopped={false}
              isPaused={false}
            />
            <svg className="progress-ring" width="140" height="140">
              <circle
                ref={progressRing}
                className="progress-ring__circle"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1"
                fill="transparent"
                r="68"
                cx="70"
                cy="70"
              />
              <circle
                ref={progressRingFinal}
                className="progress-ring__circle"
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="1"
                fill="transparent"
                r="68"
                cx="70"
                cy="70"
              />
            </svg>
          </div>
          <p>{`${parseInt(pseudoProgress * 100, 10)}%`}</p>
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
        stroke-dashoffset: 427;
        stroke-dasharray: 427 427;
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
