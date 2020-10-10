import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import { Logo } from '@components/general'

import { WorldMode } from '../../actions'
import { setWorldMode } from '../../actions/mode'

type T = any

const Navigation: FC<T> = ({ location }) => {
  const dispatch = useDispatch()

  return (
    <Container>
      <Nav>
        {/* Left */}
        <div className="item item--left">
          <Link to="/projects" onClick={() => dispatch(setWorldMode(WorldMode.IN_BACKGROUND))} className={location.pathname === '/projects' ? 'active' : ''}>
            <span className="desktop">All projects</span>
            <span className="mobile">Work</span>
          </Link>
        </div>

        {/* Center logo */}
        <div className="item--center">
          <Logo />
        </div>

        {/* Right */}
        <div className="item item--right">
          <Link to="/about" onClick={() => dispatch(setWorldMode(WorldMode.IN_BACKGROUND))} className={location.pathname === '/about' ? 'active' : ''}>
            <span>About</span>
          </Link>
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
        transition: 0.25s ease-in-out;
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
