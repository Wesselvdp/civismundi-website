import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import { TextImprov } from '@components/animations'

export enum LineState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
}

const Hero = ({
  children,
  className,
  subtitle,
  title,
  content,
  timeout = {},
  onFinished = () => {},
}) => {
  const [state, setState] = useState(LineState.LOADING)
  const world = useSelector((state) => state.world)

  useEffect(() => {
    if (world.ready) {
      setState(subtitle ? LineState.SUBTITLE_IN : LineState.TITLE_IN)
    }
  }, [world.ready])

  return (
    <Wrapper className={className}>
      <TextImprov
        in={state >= LineState.SUBTITLE_IN}
        timeout={{ enter: timeout.subtitle || 300 }}
        onEntered={() => setState(LineState.TITLE_IN)}
        className="subtitle"
        tag="h2"
        text={subtitle}
        appear
        durationIn={0.5}
        durationOut={0.5}
        // durationIn={0.2}
      />
      <TextImprov
        in={state >= LineState.TITLE_IN}
        timeout={{ enter: timeout.title || 300 }}
        onEntered={() =>
          content ? setState(LineState.PARAGRAPH_IN) : onFinished()
        }
        className="h2"
        tag="h1"
        text={title}
        appear
        durationIn={0.5}
        durationOut={0.5}
      />
      <TextImprov
        in={state >= LineState.PARAGRAPH_IN}
        timeout={{ enter: timeout.content || 300 }}
        onEntered={() => onFinished()}
        tag="p"
        text={content}
        appear
        durationIn={0.5}
        durationOut={0.5}
      />
      {children && (<div className="children">{children}</div>)}
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.div`
  padding: 0 15px 3em;
  margin: 0 auto;
  position: relative;
  max-width: 1000px;

  @media ${breakpoints.tabletLandscapeDown} {
    padding-top: 6em;
  }

  &.rm-padding-bottom {
    padding-bottom: 0;
  }

  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media ${breakpoints.phoneOnly} {
      max-width: 300px;
    }
  }

  h1 {
    margin: 10px 0 5px;
    @media ${breakpoints.tabletLandscapeUp} {
      font-size: 62px;
    }
  }

  .children {
    margin-top: 50px;

    @media ${breakpoints.phoneOnly} {
      margin-top: 0;
    }
  }

  select {
    background-color: #000;
  }
`
