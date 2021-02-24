import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Lottie from 'react-lottie'
import TWEEN from '@tweenjs/tween.js'

import animationData from './lottie-globe.json'
import { SET_READY } from '../../../actions/types'

const CIRCLE_SIZE = 60
const CIRCUMFERENCE = CIRCLE_SIZE * 2 * Math.PI
const FINAL_CIRCLE_DURATION = 1000
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const Loader = () => {
  const world = useSelector(state => state.world)
  const dispatch = useDispatch()

  const ring = useRef(null)
  const finalRing = useRef(null)
  const ringTween = useRef(null)

  const [pseudoProgress, setPseudoProgress] = useState(0)

  useEffect(() => {
    if (ringTween.current) ringTween.current.stop()

    ringTween.current = new TWEEN.Tween({ progress: pseudoProgress })
      .to({ progress: world.progress }, 500)
      .onUpdate((d) => {
        setPseudoProgress(d.progress)
      })
      .easing(TWEEN.Easing.Cubic.InOut)
      .start(0)
  }, [world.progress])

  useEffect(() => {
    ring.current.style.strokeDashoffset = CIRCUMFERENCE - pseudoProgress * CIRCUMFERENCE

    if (pseudoProgress === 1) {
      startFinalRing()
    }
  }, [pseudoProgress])

  const startFinalRing = () => {
    new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, FINAL_CIRCLE_DURATION)
      .onStart((d) => {
        finalRing.current.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`
        finalRing.current.style.strokeDashoffset = CIRCUMFERENCE
      })
      .onUpdate((d) => {
        const offset = CIRCUMFERENCE - d.progress * CIRCUMFERENCE
        finalRing.current.style.strokeDashoffset = offset
      })
      .onComplete(() => {
        dispatch({ type: SET_READY, ready: true })
      })
      .easing(TWEEN.Easing.Cubic.InOut)
      .start()
  }

  return (
    <Container className={world.ready ? 'hidden' : ''}>
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
                ref={ring}
                className="progress-ring__circle"
                stroke="rgba(0, 0, 0, 1)"
                strokeWidth="1"
                fill="transparent"
                r={CIRCLE_SIZE - 2}
                cx={CIRCLE_SIZE}
                cy={CIRCLE_SIZE}
              />
              <circle
                ref={finalRing}
                className="progress-ring__circle"
                stroke="rgba(0, 0, 0, 1)"
                strokeWidth="2"
                fill="transparent"
                r={CIRCLE_SIZE - 2}
                cx={CIRCLE_SIZE}
                cy={CIRCLE_SIZE}
              />
            </svg>
          </div>
          <p className={world.ready && 'hidden'}>{`${parseInt(
            pseudoProgress * 100,
            10
          )}%`}</p>
        </div>
      </Container>
  )
}

export default Loader

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000;
  background-color: rgb(248,248,255);
  opacity: 1;
  transition: all 1.5s ease-in-out;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(0, 0);

  &.hidden {
    transform: translate(0, -100%);
  }

  .hidden {
    opacity: 0;
  }

  p {
    color: rgba(0, 0, 0, 1);
    // color: rgba(255, 255, 255, 1);
  }

  .lottie-wrapper {
    position: relative;
    margin-bottom: 25px;

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
