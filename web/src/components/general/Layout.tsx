import React, { FC } from 'react'
import styled from 'styled-components';

import { Navigation, GlobeButton } from '.'

type T = any

const Layout: FC<T> = ({ children, className, style, includeGlobe = true }) => {
  return (
    <>
      <Navigation />
      <Main style={style} className={className}>{children}</Main>
      {includeGlobe && <GlobeButton />}
    </>
  )
}

const Main = styled.main`
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
