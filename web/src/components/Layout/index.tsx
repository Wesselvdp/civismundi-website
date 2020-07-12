import React, { FC } from 'react'
import styled from 'styled-components';
// Components
import Footer from './Footer'
import Navigation from '../Navigation'

type T = any

const Layout: FC<T> = ({ children, className }) => {
  return (
    <>
      <Navigation />

      <Main className={className}>{children}</Main>

      <Footer />
    </>
  )
}

const Main = styled.main`
  min-height: 100vh;
  overflow-x: hidden;

  &.page-transition {
    &-exited {
      opacity: 0;
    }

    &-entering {
      opacity: 1;
      transition: opacity 2.5s ease;
    }
  }
`

export default Layout
