import React from 'react'

import { Navigation, Galaxy } from '../components/html'
import { Canvas } from '../components/webgl'

const Layout = () => {
  return (
    <>
      <Navigation />
      <Galaxy />
      <Canvas />
    </>
  )
}

export default Layout
