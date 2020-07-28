import React, { FC } from 'react'
import styled from 'styled-components';

import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext }) => {
  return (
    <>
      <Navigation />
      <WorldContainer layout={pageContext.layout} />
      <Main>
        {children}
      </Main>
      {!pageContext.home && <GlobeButton />}
    </>
  )
}

const Main = styled.main`
  overflow-x: hidden;
`

export default Layout
