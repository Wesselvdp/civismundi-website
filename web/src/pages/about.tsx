import React, { useState } from 'react'
import styled from 'styled-components'

import { breakpoints } from '@utils/breakpoints'
import { Hero, SEO } from '@components/general'
import { FadeAnim } from '@components/animations'

const TITLE = 'A collective of interdisciplinary creatives';
const CONTENT = 'whose collaborative practice seeks to navigate the confluence of film, music, design and fashion'

const AboutPage = () => {
  const [heroFinished, setHeroFinished] = useState(false)

  return (
    <>
      <SEO title="About" />
      <Page>
        <div>
          <HeroContainer>
            <Hero
              subtitle="About"
              title={TITLE}
              content={CONTENT.toUpperCase()}
              timeout={{ subtitle: 300, title: 500, content: 500 }}
              onFinished={() => setHeroFinished(true)}
            />
          </HeroContainer>
          <FadeAnim in={heroFinished} timeout={1000}>
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
          </FadeAnim>
        </div>
      </Page>
    </>
  )
}

const Page = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeroContainer = styled.div`
  padding: 0 15px 3em;

  @media ${breakpoints.phoneOnly} {
    padding: 0 15px 2em;
  }
`

const ContactInfo = styled.div`
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 2em 0 0;

  @media ${breakpoints.phoneOnly} {
    padding: 0 15px;
  }

  .row {
    display: flex;

    @media ${breakpoints.phoneOnly} {
      flex-wrap: wrap;
    }

    .col {
      flex-basis: 50%;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;

        &:not(:last-child) {
          margin-bottom: 25px;
        }
      }

      .subtitle {
        margin-bottom: 5px;
      }
    }
  }
`

export default AboutPage
