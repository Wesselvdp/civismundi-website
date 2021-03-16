import React, { useRef, useState } from 'react'

import { Navigation, Galaxy, Content } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = () => {
  const interactionTimer = useRef()
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      <Navigation />
      <Galaxy />
      <Content show={showContent} setShow={setShowContent} />
      <Canvas timerRef={interactionTimer} onTimerEnd={setShowContent} />
    </>
  )
}

export default Layout
