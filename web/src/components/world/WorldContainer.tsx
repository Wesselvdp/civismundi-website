import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { CSSTransition } from 'react-transition-group'
import { get, debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import Div100vh from 'react-div-100vh'
import ModalVideo from 'react-modal-video'
import TWEEN from '@tweenjs/tween.js'

import World from './World'
import { TextDecode, TextImprov, FadeAnim } from '@components/animations'
import { Button, Quote, ProjectSlider } from '@components/general'
import { breakpoints } from '@utils/breakpoints'
import { getVideoId } from '../../utils'

import { WorldMode, WorldVersion } from '../../actions'
import { setWorldMode, toggleSlider, setWorldModeFromLocation } from '../../actions/mode'
import { worldHandleResize } from '../../actions/initialize'

import PlaySVG from '../../assets/play.svg'
import NextSVG from '../../assets/btn-next.svg'
import PrevSVG from '../../assets/btn-prev.svg'

import VideoPlayer from './VideoPlayer'
import Galaxy from './Galaxy'
// import console = require('console');

const INTRO_TEXT = `
  A DIVERSE GROUP OF HUMANS WHO TELL STORIES, WRITE FILMS, DEVELOP SHOWS, DESIGN THINGS, SUPPORT  THE ARTS & CREATE MEMORIES`

export enum DetailedState {
  LOADING = 1,
  SUBTITLE = 2,
  TITLE = 3,
  PARAGRAPH = 4,
  BUTTONS = 5,
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
    <>
      <World data={data} />
      <Galaxy show={true} />
      {/* {world.ready && (
        <Copy>
          <TextDecode tag="h2" text={INTRO_TEXT}></TextDecode>
        </Copy>
      )} */}
    </>
  )
}

export default WorldContainer

const Copy = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    max-width: 840px;
    margin: 0 auto;
  }
`

const svgAnim = keyframes`
  0% {
    stroke-dashoffset: 400;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`

const PlayButton = styled.div`
  z-index: 100;

  svg {
    &:hover {
      cursor: pointer;
    }

    #Oval_Copy,
    #Stroke_19 {
      stroke-dashoffset: 0;
      opacity: 1;
    }

    &.with-anim {
      #Oval_Copy {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 2s forwards;
      }

      #Stroke_19 {
        stroke-dashoffset: 400;
        opacity: 0;
        animation: ${svgAnim} 3s forwards;
        animation-delay: 0.75s;
      }
    }
  }
`

const svgNavigators = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const arrowScroll = keyframes`
  0% {transform: translateY(0)}
  50% {transform: translateY(-7px)}
  55% {transform: translateY(-7px)}
  100% {transform: translateY(0)}
`

const ContentDetailed = styled.div`
  position: absolute;
  top: 0;
  bottom: 20%;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  pointer-events: none;

  .copy {
    width: 100%;
    min-height: 200px;
    padding: 0 15px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @media ${breakpoints.phoneOnly} {
      min-height: 170px;

      .h2 {
        font-size: 32px;
      }
    }

    h1 {
      margin: 8px 0px 5px;
    }

    p {
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
      line-height: 22px;
    }
  }

  .arrow-scroll__wrap {
    padding-top: 10px;
    pointer-events: initial;
    cursor: pointer;
    display: inline-block;
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    opacity: 0;

    &.show {
      opacity: 1;
    }

    &:hover {
      opacity: .85;
    }

    &_animated {
      animation: ${arrowScroll} 1.7s infinite ease;
    }
  }

  .button-container {
    pointer-events: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    margin-top: 5em;

    .anim-scale {
      transform: scale(1);
      transition: 0.25s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    & > svg {
      cursor: pointer;
    }

    & > svg.with-anim {
      opacity: 0;
      animation: ${svgNavigators} 1s forwards;
      animation-delay: 1s;
    }

    & > svg:first-child {
      margin-right: 24px;
    }

    & > svg:last-child {
      margin-left: 24px;
    }

    .nav-button {
      visibility: hidden;
    }

    @media ${breakpoints.phoneOnly} {
      .play-button {
        height: 80px;
        width: 80px;
      }

      .nav-button {
        height: 46px;
        width: 46px;
      }
    }
  }
`

const Page = styled.div`
  position: relative;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;

  &.other {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.55;
  }

  &.project-detailed {
    position: relative;
    opacity: 1;
  }

  &.modal-open {
    z-index: 100 !important;
  }

  .anim-scale {
    transform: scale(1);
    transition: 0.25s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  // .globe__container {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: -1;
  // }
`

const AnimatedWrapper = styled.div`
  position: relative;
  height: 100%;
  opacity: 0;
  transform: scale(1);
  will-change: opacity, transform;

  &.globe-enter {
    transform: scale(0);
    opacity: 0;
  }

  &.globe-enter-active {
    transform: scale(1);
    opacity: 1;
    transition: all 2000ms cubic-bezier(0.655, 0.005, 0.160, 1.020); /* custom */
    transition-timing-function: cubic-bezier(0.655, 0.005, 0.160, 1.020); /* custom */
  }

  &.globe-enter-done {
    transform: scale(1);
    opacity: 1;
  }

  &.skip-in-transition {
    transform: scale(1) !important;
    opacity: 1 !important;
    transition: none;
  }

  * {
    outline: 0;
  }
`

const ContentHome = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 0 15px;
  transform: translate(-50%, -50%);
  pointer-events: none;

  button {
    pointer-events: initial;
    display: none;

    @media ${breakpoints.phoneOnly} {
      padding: 1em 2em;
      font-size: 10px;
      border-width: 0.5px;
    }

    &.${WorldMode.PROJECT_PREVIEW} {
      @media ${breakpoints.phoneOnly} {
        display: initial;
      }
    }
  }

  .lighter {
    opacity: 0.9;
  }

  h1 {
    line-height: 0.9em;
    margin: 10px 0 5px 0;

    @media ${breakpoints.phoneOnly} {
      font-size: 34px;
      margin: 7px 0 3px 0;
      line-height: 1em;
    }
  }

  p {
    max-width: 455px;
    margin-left: auto;
    margin-right: auto;
  }
`

const FooterContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;

  .footer--content {
    max-width: 750px;
    font-weight: 400;

    p {
      line-height: 1.5em;
      margin-bottom: 0;
      opacity: 0.75;

      &:not(.skip-intro) {
        @media ${breakpoints.phoneOnly} {
          font-size: 10px;
          padding: 0 20px;
        }
      }
    }

    .show-slider {
      border: 0.5px solid rgba(255, 255, 255, 0.5);
      border-bottom: none;
      padding: 10px 35px 10px;
      display: inline-block;
      margin-top: 25px;
      cursor: pointer;

      @media ${breakpoints.phoneOnly} {
        margin-top: 15px;
        padding: 5px 15px 5px;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        font-size: 12px;
      }

      img {
        height: 8px;
        margin-right: 10px;
        transform: rotate(180deg);

        @media ${breakpoints.phoneOnly} {
          height: 10px;
        }
      }
    }
  }
`

const AreaSliderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  p {
    margin-bottom: 0;
  }
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

  .modal-video,
  .modal-video-body,
  .modal-video-inner,
  .modal-video-movie-wrap {
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
