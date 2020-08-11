import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components';

import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <>
      {ready && <Navigation location={location} />}
      <WorldContainer location={location} layout={pageContext.layout} ready={ready} setReady={setReady} progress={progress} setProgress={setProgress} />
      <Main>
        {children}
      </Main>
      {pageContext.layout !== 'home' && <GlobeButton />}
    </>
  )
}

const Main = styled.main`
  overflow-x: hidden;
`

export default Layout
