import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Loader, Navigation, GlobeButton } from '../components/general'
import { WorldContainer } from '../components/world'

type T = any

const Layout: FC<T> = ({ children, pageContext, location }) => {
  const world = useSelector(state => state.world)

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

  &.fading {
    opacity: 0;
  }
`

export default Layout
