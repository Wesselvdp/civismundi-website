import React from 'react'

import { Loader, Navigation } from '../components/general'
import { Container as WorldContainer } from '../components/world'

const Layout = ({}) => {
  return (
    <>
      <Loader />
      <Navigation />

      <WorldContainer />
    </>
  )
}

export default Layout
