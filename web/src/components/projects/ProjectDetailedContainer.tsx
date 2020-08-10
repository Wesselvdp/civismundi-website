import React, { useState, useEffect } from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import styled from 'styled-components'
import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import { get } from 'lodash'
import ModalVideo from 'react-modal-video'

// Components
import { BackgroundVideo, ProjectList } from '@components/projects'
import { TextAnim, FadeAnim } from '@components/animations'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5
} 

const ProjectDetailedContainer = ({ data }) => {
  const { title, id, video, poster, _rawOverview } = data.sanityProject

  const [state, setState] = useState(ProjectState.LOADING)
  const [videoOpen, openVideo] = useState(false)

  useEffect(() => {
    setState(ProjectState.SUBTITLE_IN)
  }, [])


  return (
    <>
      <ModalWrapper className={videoOpen ? 'open' : ''}>
        <ModalVideo
          channel='vimeo'
          isOpen={videoOpen}
          videoId="397128195"
          onClose={() => openVideo(false)}
          width={1000}
          height={1000}
        />
        <img className="modal-close" src="/close.svg" onClick={() => openVideo(false)} /> 
      </ModalWrapper>
      <StyledMast>
        <FadeAnim 
          timeout={1000}
          appear={true}
          in={state >= ProjectState.PARAGRAPH_IN}
        >
          <PlayButton className="mobile">
            <img src="/play.svg" onClick={() => openVideo(true)} />
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
              in={state >= ProjectState.PARAGRAPH_IN}
            >
              <PlayButton className="desktop">
                <img src="/play.svg" onClick={() => openVideo(true)} />
              </PlayButton>
            </FadeAnim>
            <Link to="content" spy={false} smooth={true} offset={50} duration={1000}>
              <img className="scroll" src="/scroll-down.svg" />
            </Link>
          </div>
        </Content>
      </StyledMast>

      {/* Project content */}
      <Element name="content">
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
          limit={2}
        />
      </Element>
    </>
  )
}

export default ProjectDetailedContainer

const StyledMast = styled.div`
  position: relative;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  height: 100%;
  width: 100%;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s ease-in-out;

  img.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 40px;
    opacity: 0;
    color: #fff;
    transition: opacity 0.5s ease-in-out;
    cursor: pointer;

    @media ${breakpoints.phoneOnly} {
      top: 10px;
      right: 10px;
      height: 25px;
    }
  }

  &.open {
    background-color: rgba(0, 0, 0, 0.85);
    pointer-events: initial;

    img.modal-close {
      opacity: 1;
    }
  }

  .modal-video-movie-wrap {
    padding-bottom: 0 !important;
  }

  .modal-video, .modal-video-body, .modal-video-inner, .modal-video-movie-wrap {
    height: 100%;
    width: 100%;
    outline: 0;
  }

  .modal-video-close-btn {
    display: none !important;
  }

  iframe {
    height: 100%;
    width: 100%;
    max-width: 90%;
    max-height: 90%;
  }
`

const PlayButton = styled.div`
  z-index: 100;

  &.mobile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 114px;

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

  img:hover {
    cursor: pointer;
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
      padding: 15px 15px 8em;
    }
  
    p {
      max-width: 450px;
    }
  }

  img.scroll {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
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
        font-family: 'Druk Wide Super';
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
  max-height: 100vh;

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