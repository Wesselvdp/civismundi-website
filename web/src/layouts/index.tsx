import React, { FC } from 'react'
import styled from 'styled-components';

import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext, location }) => {
  return (
    <>
      <Navigation location={location} />
      <WorldContainer location={location} layout={pageContext.layout} />
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
