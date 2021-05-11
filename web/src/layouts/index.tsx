import React, { useRef, useState, useEffect } from 'react'
import Div100vh from 'react-div-100vh'
import { throttle } from 'lodash'

import { Navigation, Galaxy, Content, Loader, Videos } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = () => {
  const interactionTimer = useRef()
  const [showContent, _setShowContent] = useState(false)
  const [glitchFinished, setGlitchFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  const showRef = useRef(showContent)

  useEffect(() => {
    const listener = throttle(function(event) {
      const show = event.deltaY > 0 // show if scrolling down, hide if scrolling up
      if (showRef.current !== show) {
        setShowContent(show)
        listener.flush()
      }
    }, 100)

    if (glitchFinished) {
      window.addEventListener('wheel', listener)
    }

    return () => window.removeEventListener('wheel', listener)
  }, [glitchFinished])

  const setShowContent = (value: boolean) => {
    showRef.current = value
    _setShowContent(value)
  }

  return (
    <>
      <Navigation ready={ready} />
      <Div100vh>
        <Loader progress={progress} onFinish={setReady} />
        <Content
          show={showContent}
          setShow={setShowContent}
          glitchFinished={glitchFinished}
        />
        <Canvas
          timerRef={interactionTimer}
          onTimerEnd={setShowContent}
          onProgress={setProgress}
          onGlitchFinished={setGlitchFinished}
          ready={ready}
        />
        <Galaxy />
      </Div100vh>

      <Videos />
    </>
  )
}

export default Layout
