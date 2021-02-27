import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Div100vh from 'react-div-100vh'

import World from './World'
import Galaxy from './Galaxy'

export enum Mode {
  LOADING,
  EXPLORE,
  CONTENT
}

const WorldContainer = ({ layout, location, isScrolling }) => {
  const world = useSelector(state => state.world)

  // Projects
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allSanityLocation {
        edges {
          node {
            _id
            _type
            title
            location {
              lat
              lng
            }
          }
        }
      }
      allSanityProject(sort: { fields: order, order: ASC }) {
        edges {
          node {
            _id
            _type
            order
            slug {
              current
            }
            title
            featured
            city
            clients
            vimeo
            quote {
              content
              quotee
            }
            location {
              lat
              lng
            }
            locationGroup {
              _id
              title
              location {
                lat
                lng
              }
            }
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
  `)

  return (
    <Div100vh>
      <Home>
        <div className="home__globe">
          <World data={data} />
        </div>

        <Galaxy show={true} />

        <div className={`home__content`}>
          <div className={`home__content--centered fade ${world.mode === Mode.CONTENT ? 'visible' : ''}`}>
            <h2>
              A <span className="f-bold">DIVERSE</span> GROUP OF HUMANS WHO <br />
              <span className="f-bold">TELL</span> STORIES, <span className="f-bold">WRITE</span> FILMS, <br />
              <span className="f-bold">DEVELOP</span> SHOWS, <span className="f-bold">DESIGN</span> THINGS, <br />
              <span className="f-bold">SUPPORT</span> THE ARTS &amp; <span className="f-bold">CREATE</span> MEMORIES
            </h2>
            <p>CREATIVE LIBERY DEFINES US. RESPONSIBILITY GROUNDS US. WE ARE CITIZENS OF THE WORLD. LET'S ACT LIKE IT.</p>
          </div>
          <div className={`home__content--footer ${world.mode === Mode.EXPLORE ? 'visible' : ''}`}>
            <div className={`fade ${world.mode === Mode.CONTENT ? 'visible' : ''}`}>
              <p>&copy; CIVIS MUNDI 2021 ALL RIGHTS RESERVED</p>
            </div>
            <div className={`fade ${world.mode === Mode.EXPLORE ? 'visible' : ''}`}>
              <div className="scroll-indicator" onClick={() => world.world.controller.mode.setMode(Mode.CONTENT)}>
                <div>
                  <img src="/arrow-down.svg" />
                </div>
              </div>
              <p>MORE TO COME... WORKING ON BEING BETTER</p>
            </div>
            <div className={`fade ${world.mode === Mode.CONTENT ? 'visible' : ''}`}>
              <p>HELLO@CIVISMUNDI.WORLD &middot; INSTAGRAM</p>
            </div>
          </div>
        </div>
      </Home>
    </Div100vh>
  )
}

export default WorldContainer

const scrollAnim = keyframes`
  0% {transform: translateY(0)}
  50% {transform: translateY(-7px)}
  55% {transform: translateY(-7px)}
  100% {transform: translateY(0)}
`


const Home = styled.div`
  height: 100%;

  .home__globe {
    height: 100%;
    width: 100%;
    outline: 0;
    overflow: hidden;
  }

  .fade {
    opacity: 0;
    transition: opacity 1s ease-out;

    &.visible {
      opacity: 1;
    }
  }

  .home__content {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;

    &--centered {
      max-width: 1450px;
      margin: 0 auto;
      padding: 0 15px;

      p {
        font-size: 26px;
      }
    }

    &--footer {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0 15px;
      bottom: 15px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      p {
        font-size: 14px;
        margin: 0;
      }

      & > div {
        width: 33.33%;

        &:nth-child(2) {
          text-align: center;
        }

        &:nth-child(3) {
          text-align: right;
        }
      }

      .scroll-indicator {
        pointer-events: initial;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid grey;
        position: relative;
        display: inline-block;
        margin-bottom: 10px;
        cursor: pointer;

        & > div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -25%);

          img {
            width: 14px;
            height: auto;
            animation: ${scrollAnim} 1.7s infinite ease;
          }
        }
      }
    }
  }

  .f-bold {
    font-family: 'Druk Wide Super';
    font-weight: 700;
  }
`
