import React, { useState, useEffect } from 'react'
import { Element } from 'react-scroll'
import styled, { keyframes } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { breakpoints } from '@utils/breakpoints'
import BlockContent from '@sanity/block-content-to-react'

// Components
import { ProjectList } from '@components/projects'
import { setWorldMode } from '../../actions/mode'
import { WorldMode } from '../../actions'
import { stringifyArray } from '../../utils'

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
    content = {}
  } = data.sanityProject

  const dispatch = useDispatch()
  const world = useSelector((state) => state.world)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setFading(world.fadingPage || world.fadingVideo)
  }, [world.fadingPage, world.fadingVideo])

  const locState = location.state || {}

  return (
    <Page>
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
              <div className="col col-1">
                {content && content.left && content.left.map((entry: any) => (
                  <div>
                    <p className="header">{entry.header}</p>
                    <p>{entry.copy}</p>
                  </div>
                ))}
              </div>
              <div className="col col-2">
                {_rawOverview && (
                  <div className="block-content">
                    <BlockContent blocks={_rawOverview} />
                  </div>
                )}
                <div>
                  {content && content.middle && content.middle.map((entry: any, i: number) => (
                    <div>
                      <div>
                        <p className="header">{entry.header}</p>
                        <p>{entry.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col col-3">
                {content && content.right && content.right.filter((award: any) => award) .map((award: any) =>
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
    </Page>
  )
}

export default ProjectDetailedContainer

const Page = styled.div`
  padding-bottom: 4em;
  background-color: #000;
  min-height: 100vh;
`

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
    max-width: 1200px;
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
    flex-wrap: wrap;

    &-1, &-3 {
      width: 450px;
      flex: 1;
      align-self: flex-start;

      & > div {
        margin-bottom: 25px;
      }
    }

    &-2 {
      padding: 0 75px;

      .block-content {
        margin-bottom: 50px;
      }

      & > div:not(.block-content) {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;

        & > div {
          width: 33.33%;
          margin-bottom: 25px;
          padding: 0 15px;

          &:nth-child(3n + 2) {
            text-align: center;

            & > div {
              text-align: left;
            }
          }

          &:nth-child(3n + 3) {
            text-align: right;
          }

          & > div {
            display: inline-block;
          }
        }
      }
    }

    .award-img {
      height: 75px;
      width: auto;
      display: block;
      margin-bottom: 25px;
    }

    .award-text {
      margin-bottom: 25px;
      line-height: 1em;
    }

    .header {
      font-family: 'Druk Wide Super';
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 6px;
    }

    p:not(.header) {
      line-height: 1.2em;
    }
  }
`
