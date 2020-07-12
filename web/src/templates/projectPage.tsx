import React, { FC, useEffect } from 'react'

import styled from 'styled-components'
import localize from '@utils/localize'
import { graphql } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import { TransitionState } from 'gatsby-plugin-transition-link'

// Components
import BackgroundVideo from '@components/BackgroundVideo'
import Layout from '@components/Layout'
import TextAnimation from '@components/TextAnimation'
import SectionProjects from '@components/sections/SectionProjects'
// import console = require('console');

type PageProps = {
  data: {
    sanityProject: Project
    allSanityProject: AllProject
  }
}

const ProjectPageTemplate= ({ data }) => {
  const { title, id, _rawOverview } = data.sanityProject

  return (
    <TransitionState>
       {({ transitionStatus }) => {
        console.log(transitionStatus);

        return (
          <Layout className={`page-transition-${transitionStatus}`}>
            {/* Mast */}
            <StyledMast>
              <FixedBackground>
                <div className="overlay" />
                <BackgroundVideo />
              </FixedBackground>
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

                </div>
              </Content>
            </StyledMast>

            {/* Project content */}
            <Section>
              <div className="row">
                <div className="col meta">
                  <div>
                    <p className="pre-title">DIRECTED BY</p>
                    <p className="lead text-lighter">NABIL ELDERKIN</p>
                  </div>
                  <div>
                    <p className="pre-title">AWARDS & FESTIVALS</p>
                    <p className="lead text-lighter">LOS ANGELES</p>
                  </div>
                  <div>
                    <p className="pre-title">LOCATION</p>
                    <p className="lead text-lighter">LOS ANGELES</p>
                  </div>
                </div>
                <div className="col content content--sanity">
                  <BlockContent blocks={_rawOverview} />
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

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media ${breakpoints.tabletLandscapeUp} {
    align-items: center;
  }

  .inner {
    padding: 15px;

    p {
      opacity: 0.75;
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

  .row {
    max-width: 800px;
    display: flex;
  }

  .col {
    &.meta {
      flex: 100% 1 1;
      text-align: left;
      padding-right: 2em;
      @media ${breakpoints.tabletLandscapeUp} {
        flex: 1;
      }
    }

    &.content {
      flex: 2;
      text-align: left;
    }
  }
`

const FixedBackground = styled.div`
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
