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
        <div className="item">
          <LocalizedLink to="/">
            All projects
          </LocalizedLink>{' '}
        </div>

        {/* Center logo */}
        <div className="item--center">
          <Logo />
        </div>

        {/* Right */}
        <div className="item">
          <LocalizedLink to="/">
            About
          </LocalizedLink>
        </div>
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 15px;
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
    flex: 0 0 100px;
    margin-top: -10px;
  }

  .item--center {
    flex: 1 1 auto;
  }
`

export default Navigation