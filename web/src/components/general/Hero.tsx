import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import { TextAnim } from '@components/animations'

export enum LineState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4
} 

const Hero = ({ children, className, subtitle, title, content, timeout = {}, onFinished = () => {} }) => {
  const [state, setState] = useState(LineState.LOADING)
  const world = useSelector(state => state.world)

  useEffect(() => {
    if (world.ready) {
      setState(LineState.SUBTITLE_IN)
    }
  }, [world.ready])

  return (
    <Wrapper className={className}>
      <TextAnim
        inProp={state >= LineState.SUBTITLE_IN}
        timeout={{ enter: timeout.subtitle || 300 }}
        onEntered={() => setState(LineState.TITLE_IN)}
        className="subtitle"
        tag="h2"
        text={subtitle}
      />
      <TextAnim
        inProp={state >= LineState.TITLE_IN}
        timeout={{ enter: timeout.title || 300 }}
        onEntered={() => setState(LineState.PARAGRAPH_IN)}
        className="h2"
        tag="h1"
        text={title}
      />
      <TextAnim
        inProp={state >= LineState.PARAGRAPH_IN}
        timeout={{ enter: timeout.content || 300 }}
        onEntered={() => onFinished()}
        tag="p"
        text={content}
        letterSpeedIn={0.01}
        singleLine={false}
      />
      <div class="children">
        {children}
      </div>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.div`
  padding: 3em 15px;
  margin: 4em auto 0;
  position: relative;
  max-width: 1000px;

  &.rm-padding-bottom {
    padding-bottom: 0;
  }

  @media ${breakpoints.phoneOnly} {
    margin: 3em auto;
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

  h2 {
    @media ${breakpoints.phoneOnly} {
      margin-bottom: 10px;

      &.subtitle {
        line-height: 6px;
      }
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
