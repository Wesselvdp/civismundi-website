import React, { useEffect } from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { Logo } from '@components/html'

const DefaultNavigation = ({ ready }: any) => (
  <>
    {/* Left */}
    <div className="item item--left" />

    {/* Center logo */}
    <div className="item--center">
      <Logo ready={ready} />
    </div>

    {/* Right */}
    <div className="item item--right" />
  </>
)

const ShopNavigation = () => {
  return (
    <>
      <div className="item item--left">TEST</div>

      <div className="item--center"></div>

      {/* Right */}
      <div className="item item--right">TEST</div>
    </>
  )
}

const Navigation = ({ ready, location }: any) => {
  const isWebshop = location && location.pathname.includes('/shop')

  return (
    <Container>
      <Nav>
        {!isWebshop ? <DefaultNavigation ready={ready} /> : <ShopNavigation />}
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

    a {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        width: 0;
        transform: translateX(-50%);
        bottom: -3px;
        height: 0.5px;
        background-color: #fff;
      }

      &.active::before {
        width: 100%;
      }
    }
    span {
      text-transform: uppercase;
      font-size: 14px;
      opacity: 0.85;

      @media ${breakpoints.phoneOnly} {
        font-size: 12px;
      }
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

  .mobile {
    display: none;

    @media ${breakpoints.phoneOnly} {
      display: initial;
    }
  }

  .desktop {
    display: initial;

    @media ${breakpoints.phoneOnly} {
      display: none;
    }
  }
`

export default Navigation
