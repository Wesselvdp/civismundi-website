import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { useDispatch } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import { WorldMode } from '../../actions'
import { setWorldMode } from '../../actions/mode'

const GlobeButton = () => {
  const dispatch = useDispatch()

  return (
    <Link to="/" onClick={() => dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))}>
      <ButtonStyled>
        <img src="/globe-icon.svg" />
      </ButtonStyled>
    </Link>
  )
}

export default GlobeButton

const ButtonStyled = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #707070;
  z-index: 10000;
  background-color: #000;

  @media ${breakpoints.phoneOnly} {
    left: 10px;
    bottom: 10px;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-in-out;
    opacity: 0.80;
  }

  &:hover img {
    transform: translate(-50%, -50%) scale(1);
  }
`
