import React, { FC } from 'react'
import { isMobile } from 'react-device-detect'

import styled from 'styled-components'
import LocalizedLink from '@components/LocalizedLink'
import Logo from '@components/Logo'

type T = any

const MainNavigation: FC<T> = () => {
  return (
    <Container>
      <Navigation>
        {/* Left */}
        <div className="item">
          {/* <LocalizedLink to="/"> */}
            <div className="navItem">{isMobile ? 'Work' : 'All projects'}</div>
          {/* </LocalizedLink>{' '} */}
        </div>

        {/* Center logo */}
        <div className="item item--center">
          <Logo />
        </div>

        {/* Right */}
        <div className="item">
          {/* <LocalizedLink to="/"> */}
            <div className="navItem">About</div>
          {/* </LocalizedLink> */}
        </div>
      </Navigation>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 15px;
  position: absolute;
  width: 100%;
  z-index: 1;
`

const Navigation = styled.nav`
  padding: 0 15px;
  display: flex;

  .item {
    &--center {
      flex: 1;
      text-align: center;
    }
  }

  .navItem {
    padding: 1em;
    cursor: pointer;
    text-transform: uppercase;
  }
`

export default MainNavigation
