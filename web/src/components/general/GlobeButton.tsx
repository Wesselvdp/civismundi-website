import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const GlobeButton = () => (
  <Link to="/">
    <ButtonStyled>
      <img src="/globe-icon.svg" />
    </ButtonStyled>
  </Link>
)

export default GlobeButton

const ButtonStyled = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  height: 50px;
  width: 50px;
  opacity: 0.80;
  border-radius: 50%;
  border: 1px solid #707070;
  z-index: 10000;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-in-out;
  }

  &:hover img {
    transform: translate(-50%, -50%) scale(1);
  }
`