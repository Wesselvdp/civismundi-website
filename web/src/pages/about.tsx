import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { breakpoints } from '@utils/breakpoints'
import { Layout, BackgroundLines, SEO } from '@components/general'

const AboutPage = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 100, friction: 140 } }))

  return (
    <Layout>
      <SEO title="About" />
      <Page>
        <div>
          <BackgroundLines
            subtitle="About us"
            title="Lorem ipsum dolor sit amet"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore"
          />
          <ContactInfo>
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
          </ContactInfo>
        </div>
      </Page>
    </Layout>
  )
}

const Page = styled.div`
  padding-top: 4em;
  min-height: 100vh;
  position: relative;
  
  @media ${breakpoints.tabletLandscapeUp} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${breakpoints.phoneOnly} {
    padding-top: 3em;
  }
`

const ContactInfo = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 2em 0 4em;

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