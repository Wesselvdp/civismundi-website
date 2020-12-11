import React from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'

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
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 60px, rgba(0,0,0,0) 61px, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%), url('/stars-dt.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: -10;
  opacity: 0;
  transition: opacity 1s;
  transition-delay: 1s;

  @media ${breakpoints.phoneOnly} {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 60px, rgba(0,0,0,0) 61px, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%), url('/stars-8.jpg');
  }

  &.show {
    opacity: 1;
  }
`
export default Galaxy
