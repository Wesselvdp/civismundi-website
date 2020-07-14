import React, { FC, useEffect } from 'react'

import styled from 'styled-components'
import localize from '@utils/localize'
import { graphql } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { get } from 'lodash'

// Components
import BackgroundVideo from '@components/BackgroundVideo'
import Layout from '@components/Layout'
import TextAnimation from '@components/TextAnimation'
import SectionProjects from '@components/sections/SectionProjects'
import Fade from '@components/Fade'

type PageProps = {
  data: {
    sanityProject: Project
    allSanityProject: AllProject
  }
}

const ProjectPageTemplate= ({ data }) => {
  const { title, id, video, poster, _rawOverview } = data.sanityProject

  return (
    <TransitionState>
       {({ transitionStatus }) => {

        return (
          <Layout className={`page-transition-${transitionStatus}`}>
            {/* Mast */}
            <StyledMast>
              <FixedBackground>
                <div className="overlay" />
                <BackgroundVideo video={get(video, 'asset.url')} poster={get(poster, 'asset.url')} />
              </FixedBackground>
              <Fade 
                timeout={1000}
                appear={true}
                in={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
              >
                <PlayButton className="mobile">
                  <img src="/play.svg" />
                </PlayButton>
              </Fade>
              <Content>
                <div className="inner">
                  <TextAnimation
                    appear={true}
                    inProp={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
                    timeout={5000}
                    className="h5 pre-title"
                    tag="h6"
                    text="Video direction"
                  />
                  <TextAnimation
                    appear={true}
                    inProp={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
                    timeout={5000}
                    className="h1"
                    tag="h1"
                    text={title}
                  />
                  <TextAnimation
                    appear={true}
                    inProp={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
                    timeout={5000}
                    tag="p"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor"
                    letterSpeedIn={0.01}
                  />
                  <Fade 
                    timeout={1000}
                    appear={true}
                    in={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
                  >
                    <PlayButton className="desktop">
                      <img src="/play.svg" />
                    </PlayButton>
                  </Fade>
                </div>
              </Content>
            </StyledMast>

            {/* Project content */}
            <Section>
              <div className="container">
                <div className="row">
                  <div className="col meta">
                    <div>
                      <p className="pre-title">DIRECTED BY</p>
                      <p>NABIL ELDERKIN</p>
                    </div>
                    <div>
                      <p className="pre-title">AWARDS</p>
                      <p>LOS ANGELES</p>
                    </div>
                    <div>
                      <p className="pre-title">LOCATION</p>
                      <p>LOS ANGELES</p>
                    </div>
                  </div>
                  <div className="col content content--sanity">
                    <BlockContent blocks={_rawOverview} />
                  </div>
                </div>
              </div>
            </Section>
            <SectionProjects
              title="Other projects"
              blockId={id}
              limit={2}
              projects={data.allSanityProject}
            />
          </Layout>
        )}}
      </TransitionState>
  )
}

const StyledMast = styled.div`
  position: relative;
`

const PlayButton = styled.div`
  &.mobile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media ${breakpoints.tabletLandscapeUp} {
      display: none;
    }
  }

  &.desktop {
    padding-top: 25px;

    @media ${breakpoints.phoneOnly} {
      display: none;
    }
  }
`

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  height: 100vh;
  height: -webkit-fill-available;
  position: relative;
  z-index: 1;

  @media ${breakpoints.tabletLandscapeUp} {
    align-items: center;
  }

  .inner {
    padding: 15px;

    @media ${breakpoints.phoneOnly} {
      padding: 15px 15px 4em;
    }
  
    p {
      max-width: 450px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 10px;
    }

    .pre-title {
      font-size: 18px;
    }
  }
`

const Section = styled.section`
  padding: 10em 0 5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
 
  @media ${breakpoints.phoneOnly} {
    padding: 2em 0 5em;
  }

  .container {
    max-width: 800px;
    width: 100%;
    padding: 0 20px;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media ${breakpoints.phoneOnly} {
      flex-wrap: nowrap;
      flex-direction: column;
    }
  }

  .col {
    display: flex;
    text-align: left;
  
    &.meta {
      flex: 0 0 300px;
      flex-wrap: wrap;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
      }

      & > div {
        margin-bottom: 25px;
        width: 100%;

        @media ${breakpoints.phoneOnly} {
          display: flex;
          flex-wrap: wrap;
          flex-basis: 50%;

          &:nth-child(2) {
            text-align: right;
          }
        }
      }
    }

    &.content {
      flex: 1 1 auto;

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
      }

      & > div {
        width: 100%;
        max-width: 300px;
      }
    }
  }
`

const FixedBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }
`

export const query = graphql`
  query singleProject($id: String!) {
    sanityProject(id: { eq: $id }) {
      title
      slug {
        current
      }
      video {
        asset {
          url
        }
      }
      id
      _rawOverview
    }
    allSanityProject {
      edges {
        node {
          slug {
            current
          }
          title
          id
        }
      }
    }
  }
`

export default ProjectPageTemplate
