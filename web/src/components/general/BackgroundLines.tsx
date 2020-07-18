import React from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { TextAnim } from '@components/animations'

const BackgroundLines = ({ subtitle, title, content }) => (
  <Wrapper>
    <img src="/lines-circle.svg" />
    <TextAnim
      appear={true}
      inProp={true}
      timeout={5000}
      className="subtitle"
      tag="h2"
      text={subtitle}
    />
    <TextAnim
      appear={true}
      inProp={true}
      timeout={5000}
      className="h2"
      tag="h1"
      text={title}
    />
    <TextAnim
      appear={true}
      inProp={true}
      timeout={5000}
      tag="p"
      text={content}
      letterSpeedIn={0.01}
    />
  </Wrapper>
)

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