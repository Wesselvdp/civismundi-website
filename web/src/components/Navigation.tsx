import React, { FC } from 'react'
import styled from 'styled-components'

import LocalizedLink from '@components/LocalizedLink'
import Logo from '@components/Logo'

type T = any

const Navigation: FC<T> = () => {
  return (
    <Container>
      <Nav>
        {/* Left */}
        <div className="item item--left">
          <LocalizedLink to="/">
            <span>All projects</span>
          </LocalizedLink>{' '}
        </div>

        {/* Center logo */}
        <div className="item--center">
          <Logo />
        </div>

        {/* Right */}
        <div className="item item--right">
          <LocalizedLink to="/">
            <span>About</span>
          </LocalizedLink>
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
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 40px;

  .item {
    flex: 0 0 200px;
    margin-top: -10px;

    span {
      text-transform: uppercase;
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