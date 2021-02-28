import React, { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Scroll from 'smooth-scrolling'

import { Loader, Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const world = useSelector(state => state.world)
  const isSSR = typeof document === 'undefined' 

  useEffect(() => {
    if (!isSSR) {
      const scroll = new Scroll({
        native: true,
        direction: 'vertical',
        section: document.querySelector('.home__content'),
      })

      scroll.init()
    }
  }, [isSSR])

  return (
    <>
      <WorldWrapper className={world.fadingPage && 'fading'}>
        <WorldContainer location={location} layout={pageContext.layout} />
      </WorldWrapper>

      <>
        <Navigation location={location} />
        <Main className={world.fadingPage && 'fading'}>{children}</Main>
      </>
      <Loader />
      {pageContext.layout !== 'home' && (
        <GlobeButton transparent={pageContext.layout === 'project-detailed'} />
      )}
    </>
  )
}

const Main = styled.main`
  overflow-x: hidden;
  opacity: 1;
  transition: opacity 0.5s ease;

  &.fading {
    opacity: 0;
  }
`

const WorldWrapper = styled.div`
  opacity: 1;
  transition: opacity 0.5s ease;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  font-size: 0;

  &.fading {
    opacity: 0;
  }
`

export default Layout
