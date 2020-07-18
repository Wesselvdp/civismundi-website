import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { graphql } from 'gatsby'
import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { get } from 'lodash'

// Components
import { BackgroundVideo, ProjectList } from '@components/projects'
import { Layout } from '@components/general'
import { TextAnim, FadeAnim } from '@components/animations'

// Hooks
import useWindowSize from '@hooks/useWindowSize'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5
} 

const ProjectPageTemplate= ({ data }) => {
  const { title, id, video, poster, _rawOverview } = data.sanityProject
  const [state, setState] = useState(ProjectState.LOADING)

  useEffect(() => {
    setState(ProjectState.SUBTITLE_IN)
  }, [])

  const { size, outerSize } = useWindowSize()

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
              <FadeAnim 
                timeout={1000}
                appear={true}
                in={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
              >
                <PlayButton className="mobile">
                  <img src="/play.svg" />
                </PlayButton>
              </FadeAnim>
              <Content>
                <div className="inner">
                  <TextAnim
                    inProp={state >= ProjectState.SUBTITLE_IN}
                    timeout={{ enter: 300 }}
                    onEntered={() => setState(ProjectState.TITLE_IN)}
                    className="subtitle"
                    tag="h2"
                    text="Video direction"
                  />
                  <TextAnim
                    inProp={state >= ProjectState.TITLE_IN}
                    timeout={{ enter: 300 }}
                    onEntered={() => setState(ProjectState.PARAGRAPH_IN)}
                    className="h2"
                    tag="h1"
                    text={title}
                  />
                  <TextAnim
                    inProp={state >= ProjectState.PARAGRAPH_IN}
                    timeout={{ enter: 300 }}
                    tag="p"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor"
                    letterSpeedIn={0.01}
                  />
                  <FadeAnim 
                    timeout={1000}
                    appear={true}
                    in={transitionStatus !== 'entering' && transitionStatus !== 'exiting' && transitionStatus !== 'exited'}
                  >
                    <PlayButton className="desktop">
                      <img src="/play.svg" />
                    </PlayButton>
                  </FadeAnim>
                </div>
              </Content>
            </StyledMast>

            {/* Project content */}
            <Section>
              <div className="container">
                <div className="row">
                  <div className="col meta">
                    <div>
                      <h5 className="subtitle">DIRECTED BY</h5>
                      <h5>NABIL ELDERKIN</h5>
                    </div>
                    <div>
                      <h5 className="subtitle">LOCATION</h5>
                      <h5>LOS ANGELES</h5>
                    </div>
                    <div>
                      <h5 className="subtitle">AWARDS</h5>
                      <h5>LOS ANGELES</h5>
                    </div>
                  </div>
                  <div className="col content content--sanity">
                    <BlockContent blocks={_rawOverview} />
                  </div>
                </div>
              </div>
            </Section>
            <ProjectList
              title="Other projects"
              blockId={id}
              projects={data.allSanityProject}
              perPage={2}
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
    padding-top: 2em;

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
    }
  }
`

const Section = styled.section`
  padding: 10em 0 5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
 
  @media ${breakpoints.phoneOnly} {
    padding: 2em 0;
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

          &:nth-child(even) {
            text-align: right;
          }

          h5.subtitle {
            display: flex;
            flex-basis: 100%;
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
      }

      strong {
        font-weight: 700;
        font-family: 'Druk Wide Bold';
        font-size: 14px;
        text-transform: uppercase;
        margin-bottom: -14px;
        display: block;

        @media ${breakpoints.phoneOnly} {
          font-size: 12px;
        }
      }
    }

    h5 {
      margin-bottom: 0.5em;
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
    opacity: 0.45;
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
      poster {
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
          poster {
            asset {
              url
            }
          }
          video {
            asset {
              url
            }
          }
        }
      }
    }
  }
`

export default ProjectPageTemplate
