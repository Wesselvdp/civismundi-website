import React, { useRef, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { Navigation, Galaxy, Content, Loader, Videos } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = () => {
  const interactionTimer = useRef()
  const [showContent, setShowContent] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  return (
    <>
      <Navigation ready={ready} />
      <Div100vh>
        <Loader progress={progress} onFinish={setReady} />
        {/* <Content show={showContent} setShow={setShowContent} /> */}
        <Canvas
          timerRef={interactionTimer}
          onTimerEnd={setShowContent}
          onProgress={setProgress}
        />
        {/* <Galaxy /> */}
      </Div100vh>

      <Videos />
    </>
  )
}

export default Layout
