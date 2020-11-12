import React, { useState, useEffect } from 'react'
import { Link, Element } from 'react-scroll'
import styled, { keyframes } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'
import Div100vh from 'react-div-100vh'

import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'
import ModalVideo from 'react-modal-video'

import PlaySVG from '../../assets/play.svg'
import NextSVG from '../../assets/btn-next.svg'
import PrevSVG from '../../assets/btn-prev.svg'

// Components
import { ProjectList } from '@components/projects'
import { TextImprov, FadeAnim } from '@components/animations'
import { Quote } from '@components/general'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'
import { getVideoId, stringifyArray } from '../../utils'

export enum ProjectState {
  LOADING = 1,
  SUBTITLE_IN = 2,
  TITLE_IN = 3,
  PARAGRAPH_IN = 4,
  VIDEO_BUTTON_IN = 5,
  SLIDER_IN = 6,
}

const ProjectDetailedContainer = ({ location, data }) => {
  const {
    id,
    city,
    locationGroup,
    director,
    awards,
    _rawOverview,
  } = data.sanityProject

  console.log('project', data.sanityProject)

  const dispatch = useDispatch()
  const world = useSelector((state) => state.world)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setFading(world.fadingPage || world.fadingVideo)
  }, [world.fadingPage, world.fadingVideo])

  const locState = location.state || {}

  return (
    <>
      <GlobeIcon
        className={`anim-scale ${locState.doAnimation && 'with-anim'}`}
        onClick={() =>
          !fading && dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
        }
      >
        <img src="/globe-icon.svg" />
      </GlobeIcon>

      {/* Project content */}
      <Element name="content">
        <Section>
          <div className="container">
            <div className="row">
              <div className="col meta">
                <div>
                  <h5 className="subtitle">DIRECTED BY</h5>
                  <h5>{stringifyArray(director, 'name', ', ')}</h5>
                </div>
                <div>
                  <h5 className="subtitle">LOCATION</h5>
                  <h5>{locationGroup ? locationGroup.title : city}</h5>
                </div>
                {awards && awards.length ? (
                  <div>
                    <h5 className="subtitle">AWARDS</h5>
                    {awards
                      .filter((award: any) => award)
                      .map((award: any) =>
                        award.image ? (
                          <img
                            className="award-img"
                            key={award.name}
                            src={award.image.asset.url}
                          />
                        ) : (
                          <p className="award-text">{award.name}</p>
                        )
                      )}
                  </div>
                ) : null}
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
          skipTransition
          doAnimation={false}
        />
      </Element>
    </>
  )
}

export default ProjectDetailedContainer

const svgNavigators = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const GlobeIcon = styled.div`
  position: fixed;
  bottom: 25px;
  left: 25px;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  opacity: 1;
  z-index: 1000;

  &.anim-scale {
    transform: scale(1) !important;
    transition: 0.25s ease;

    &:hover {
      transform: scale(1.1) !important;
    }
  }

  &.with-anim {
    opacity: 0;
    animation: ${svgNavigators} 1s forwards;
    animation-delay: 4s;
  }

  cursor: pointer;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

      .award-img {
        height: 75px;
        width: auto;
        display: block;
        margin-bottom: 10px;
      }

      .award-text {
        margin-bottom: 10px;
        line-height: 1em;
      }

      @media ${breakpoints.phoneOnly} {
        flex-basis: 100%;
      }

      & > div {
        margin-bottom: 25px;
        width: 100%;

        @media ${breakpoints.phoneOnly} {
          flex-basis: 50%;
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
        color: rgb(255, 255, 255);

        @media ${breakpoints.phoneOnly} {
          font-size: 12px;
        }
      }

      p {
        opacity: 1;
        color: rgba(255, 255, 255, 0.85);
      }
    }

    h5 {
      margin-bottom: 0.5em;
    }
  }
`
