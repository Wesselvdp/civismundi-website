import React, { useEffect, useRef, useState } from 'react'

import { Navigation, Galaxy, Content, Loader } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = () => {
  const interactionTimer = useRef()
  const [showContent, setShowContent] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  return (
    <>
      <Navigation ready={ready} />
      <Galaxy />
      <Loader progress={progress} onFinish={setReady} />
      <Content show={showContent} setShow={setShowContent} />
      <Canvas
        timerRef={interactionTimer}
        onTimerEnd={setShowContent}
        onProgress={setProgress}
      />
    </>
  )
}

export default Layout
