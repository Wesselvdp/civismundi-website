import React from 'react'
import styled from 'styled-components'

import { Title } from '@components/html'

const Content = ({ show }: any) => {
  return (
    <Home className="home">
      <div className="section">
        <Title show={show} />
      </div>
    </Home>
  )
}

const Home = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  pointer-events: none;

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    position: relative;
    height: 100%;
    pointer-events: none;
  }
`

export default Content
