import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <>
      <WorldContainer location={location} layout={pageContext.layout} ready={ready} setReady={setReady} progress={progress} setProgress={setProgress} />
      {ready ? (
        <>
          <Navigation location={location} />
          <Main>
            {children}
          </Main>
        </>
      ) : (
        <Loader>
          <CircularProgressbar strokeWidth={1} className="circle" value={progress} styles={buildStyles(
          {
            pathColor: `rgba(255, 255, 255, 1)`,
            trailColor: 'rgba(255, 255, 255, 0)',
          })}
          />
          <img src="/cm-white.svg" />
        </Loader>
      )}
      {pageContext.layout !== 'home' && <GlobeButton />}
    </>
  )
}

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000;
  background-color: #000;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 150px;
    width: auto;
  }

  .circle {
    height: 225px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Main = styled.main`
  overflow-x: hidden;
`

export default Layout
