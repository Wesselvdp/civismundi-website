import React, { FC } from 'react'
import styled from 'styled-components';

import Navigation from './Navigation'

type T = any

const Layout: FC<T> = ({ children, className }) => {
  return (
    <>
      <Navigation />
      <Main className={className}>{children}</Main>
    </>
  )
}

const Main = styled.main`
  min-height: 100vh;
  min-height: -webkit-fill-available;
  overflow-x: hidden;

  &.page-transition {
    &-exited {
      opacity: 0;
    }

    &-entering {
      opacity: 1;
      transition: opacity 2.5s ease-in-out;
    }
  }
`

export default Layout
