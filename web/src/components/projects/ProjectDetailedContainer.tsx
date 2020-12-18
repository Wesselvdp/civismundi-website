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
// import console = require('console');

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

  console.log(content);
  return (
    <Page>
      {/* Project content */}
      <Element name="content">
        <Section>
          <div className="container">
            <div className="row">
              <div className="col col-1">
                {content && content.left && content.left.map((entry: any) => (
                  <div>
                    <div>
                      <p className={`header ${entry.smallFont && 'smaller'}`}>{entry.header}</p>
                      <p className={`${entry.specialFont && 'dalek-pinpoint'} ${entry.smallFont && 'smaller'}`}>{entry.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col col-2">
                <div className="block-content">
                  {_rawOverview && (
                    <div>
                      <BlockContent blocks={_rawOverview} />
                    </div>
                  )}
                </div>
                <div>
                  {content && content.middle && content.middle.map((entry: any, i: number) => (
                    <div>
                      <div>
                        <p className={`header ${entry.smallFont && 'smaller'}`}>{entry.header}</p>
                        <p className={`${entry.specialFont && 'dalek-pinpoint'} ${entry.smallFont && 'smaller'}`}>{entry.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col col-3">
                {content && content.right && content.right.filter((award: any) => award).map((award: any) => (
                      <div>
                        {award.image && <img className="award-img" key={award.name} src={award.image.asset.url} />}
                        {award.description && <p className="award-text">{award.description}</p>}
                      </div>
                  ))}
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

    @media ${breakpoints.phoneOnly} {
      width: 100% !important;
      padding: 0 !important;

      &-1 {
        order: 1;
      }

      &-2 {
        order: 3;
      }

      &-3 {
        order: 2;
      }
    }

    & > div:not(.block-content) p {
      text-transform: uppercase;
    }

    &-1, &-3 {
      width: 450px;
      flex: 1;
      align-self: flex-start;

      & > div {
        margin-bottom: 25px;

        @media ${breakpoints.phoneOnly} {
          width: 50%;
          flex-grow: 1;
          margin-bottom: 15px;
          text-align: left !important;

          &:nth-child(odd) {
            padding-right: 5px;
          }

          &:nth-child(even) {
            padding-left: 5px;
          }
        }
      }
    }

    &-2 {
      padding: 0 75px;
      flex-grow: 1;

      .block-content > div {
        margin-bottom: 50px;
        padding: 0 15px;

        p {
          line-height: 1.8em;
        }

        @media ${breakpoints.phoneOnly} {
          margin-bottom: 15px;
          padding: 0;
        }
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
          flex-grow: 1;

          & > div {
            display: inline-block;
          }

          @media ${breakpoints.phoneOnly} {
            width: 50%;
            padding: 0;
            margin-bottom: 15px;
            text-align: left !important;

            &:nth-child(odd) {
              padding-right: 5px;
            }

            &:nth-child(even) {
              padding-left: 5px;
            }
          }
        }
      }
    }

    &-3 {
      & > div {
        margin-bottom: 25px;
      }
    }

    .award-img {
      height: 75px;
      width: auto;
      display: block;
      margin-bottom: 10px;
    }

    .award-text {
      line-height: 1em;
      margin: 0;
    }

    .header {
      font-family: 'Druk Wide Super';
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 6px;
      line-height: 1.3em;
      opacity: 1;

      &.smaller {
        font-size: 10px;
      }
    }

    p:not(.header) {
      line-height: 1.2em;

      &.smaller {
        font-size: 14px;
      }
    }
  }
`
