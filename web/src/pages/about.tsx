import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { breakpoints } from '@utils/breakpoints'
import { Layout, SEO } from '@components/general'

const calc = (x, y) => [x - window.innerWidth / 3, y - window.innerHeight / 3]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`

const AboutPage = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 100, friction: 140 } }))

  return (
    <Layout>
      <SEO title="About" />
      <Page onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <Wrapper>
          <CenterContent>
            <div>
              <animated.div class="background" style={{ transform: props.xy.interpolate(trans1) }}>
                <img src="/lines-circle.svg" />
              </animated.div>
            </div>
            <h2 className="subtitle">ABOUT</h2>
            <h1 className="h2">Lorem ipsum dolor sit amet</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
          </CenterContent>
          <BottomContent>
            <div className="row">
              <div className="col">
                <h5 className="subtitle">E-MAIL</h5>
                <h6>info@civismundi.com</h6>
              </div>
              <div className="col">
                <h5 className="subtitle">PHONE</h5>
                <h6>+370 495 385 30</h6>
              </div>
            </div>
          </BottomContent>
        </Wrapper>
      </Page>
    </Layout>
  )
}

const Page = styled.div`
  min-height: 100vh;
  position: relative;
`

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  width: 100%;
  max-width: 1000px;
  padding: 0 15px;
  top: 50%;
  transform: translate(-50%, -50%);
`

const CenterContent = styled.div`
  padding-bottom: 200px;
  position: relative;

  @media ${breakpoints.phoneOnly} {
    padding-bottom: 150px;
    margin-top: 150px;
  }

  .h2 {
    opacity: 0.80;

    @media ${breakpoints.phoneOnly} {
      font-size: 36px;
      margin-bottom: 10px;
    }
  }

  p {
    opacity: 0.85;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  & > div {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    img {
      height: 450px;
      
      @media ${breakpoints.phoneOnly} {
        height: auto;
      }
    }
  }

  .background {
    @media ${breakpoints.phoneOnly} {
      transform: none !important;
    }
  }
`

const BottomContent = styled.div`
  .row {
    display: flex;

    @media ${breakpoints.phoneOnly} {
      flex-wrap: wrap;
    }

    .col {
      flex-basis: 50%;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
        margin-bottom: 50px;
      }

      .subtitle {
        margin-bottom: 5px;
      }
    }
  }
`

export default AboutPage