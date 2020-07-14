import React, { FC } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Link } from 'gatsby'

import Logo from '@components/Logo'

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
          <Link to="/">
            <Logo />
          </Link>
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

  ${isMobile && 'padding: 0 10px'}
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 40px;

  .item {
    flex: 0 0 200px;
    margin-top: -10px;
  
    ${isMobile ? `flex: 0 0 auto;` : ''}

    span {
      text-transform: uppercase;
      font-size: 14px;
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