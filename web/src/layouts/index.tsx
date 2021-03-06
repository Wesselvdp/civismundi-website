import React, { useRef, useState, useEffect } from 'react'
// import Div100vh from 'react-div-100vh'
import { throttle } from 'lodash'
import { use100vh } from 'react-div-100vh'

import { Navigation, Footer, Galaxy, Loader, Videos } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = ({ children, location, ...props }) => {
  const interactionTimer = useRef()
  const [showContent, _setShowContent] = useState(false)
  const [glitchFinished, setGlitchFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const height = use100vh()
  const showRef = useRef(showContent)
  const isShop = location.pathname.includes('/shop')

  useEffect(() => {
    const listener = throttle(function (event) {
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
      <div style={{ minHeight: `${height}px` }}>
        <Navigation location={location} ready={ready} />
        <Loader progress={progress} onFinish={setReady} />
        {React.cloneElement(children, {
          ...props,
          glitchFinished,
          showContent,
          setShowContent,
          ready,
        })}
        <Galaxy />
        <Footer
          setShow={setShowContent}
          show={showContent}
          glitchFinished={glitchFinished}
          location={location}
          isShop={isShop}
        />
      </div>

      <Videos />

      <Canvas
        timerRef={interactionTimer}
        onTimerEnd={setShowContent}
        onProgress={setProgress}
        onGlitchFinished={setGlitchFinished}
        ready={ready}
        isShop={isShop}
      />
    </>
  )
}

export default Layout
