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
`

export default Layout
