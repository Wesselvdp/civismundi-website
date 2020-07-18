import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { TextAnim } from '@components/animations'

export enum LineState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4
} 

const BackgroundLines = ({ subtitle, title, content }) => {
  const [state, setState] = useState(LineState.LOADING)

  useEffect(() => {
    setState(LineState.SUBTITLE_IN)
  }, [])

  return (
    <Wrapper>
      <img src="/lines-circle.svg" />
      <TextAnim
        inProp={state >= LineState.SUBTITLE_IN}
        timeout={{ enter: 300 }}
        onEntered={() => setState(LineState.TITLE_IN)}
        className="subtitle"
        tag="h2"
        text={subtitle}
      />
      <TextAnim
        inProp={state >= LineState.TITLE_IN}
        timeout={{ enter: 300 }}
        onEntered={() => setState(LineState.PARAGRAPH_IN)}
        className="h2"
        tag="h1"
        text={title}
      />
      <TextAnim
        inProp={state >= LineState.PARAGRAPH_IN}
        timeout={{ enter: 300 }}
        tag="p"
        text={content}
        letterSpeedIn={0.01}
      />
    </Wrapper>
  )
}

export default BackgroundLines

const Wrapper = styled.div`
  padding: 3em 15px 4em;
  margin: 4em auto;
  position: relative;
  max-width: 1000px;
  
  @media ${breakpoints.phoneOnly} {
    margin: 3em auto;
  }

  img {
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
        font-size: 18px;
      }
    }
  }
`