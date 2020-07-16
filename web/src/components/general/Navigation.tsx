import React, { FC } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import { breakpoints } from '@utils/breakpoints'
import { Logo } from '@components/general'

type T = any

const Navigation: FC<T> = () => {
  return (
    <Container>
      <Nav>
        {/* Left */}
        <div className="item item--left">
          <span>{isMobile ? 'Work' : 'All projects'}</span>
        </div>

        {/* Center logo */}
        <div className="item--center">
          <Logo />
        </div>

        {/* Right */}
        <div className="item item--right">
          <span>About</span>
        </div>
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  @media ${breakpoints.phoneOnly} {
    padding: 0 10px;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 40px;

  .item {
    flex: 0 0 200px;
    margin-top: -10px;
  
    @media ${breakpoints.phoneOnly} {
      flex: 0 0 auto;
    }

    span {
      text-transform: uppercase;
      font-size: 14px;
      opacity: 0.85;
    }

    &.item--left {
      text-align: left;
    }

    &.item--right {
      text-align: right;
    }
  }

  .item--center {
    flex: 1 1 auto;
  }
`

export default Navigation