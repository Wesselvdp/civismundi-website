import React from 'react'
import styled from 'styled-components'

const Galaxy = ({ show }) => {
  return <GalaxyContainer className={show ? 'show' : ''} />
}

const GalaxyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-image: url('/stars-3.png'), url('/bg-2.jpg');
  background-size: contain;
  background-position: center center;
  background-repeat: repeat;
  z-index: -10;
  opacity: 0;
  transition: opacity 1s;
  transition-delay: 1s;

  &.show {
    opacity: 1;
  }
`
export default Galaxy
