import React, { FC } from 'react'
import styled from 'styled-components';

import { Navigation, GlobeButton } from '.'
import { WorldContainer } from '../world'

type T = any

const Layout: FC<T> = ({ children }) => {
  return (
    <>
      <Navigation />
      <WorldContainer />
      <Main style={style}>
        {children}
      </Main>
      <GlobeButton />
    </>
  )
}

const Main = styled.main`
  overflow-x: hidden;
`

export default Layout
