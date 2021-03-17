import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Div100vh from 'react-div-100vh'

import { Title } from '@components/html'
import { breakpoints } from '@utils/breakpoints'

const Content = ({ show, setShow }) => {
  const [finishedGlitch, setFinishedGlitch] = useState(false)

  useEffect(() => {
    function listener() {
      setShow(true)
    }

    if (finishedGlitch) {
      window.addEventListener('mousewheel', listener)
    }

    return () => window.removeEventListener('mousewheel', listener)
  }, [])

  return (
    <Home className="home">
      <div className="section">
        <Title show={show} />

        <div className="section__footer">
          <div className={`${show ? 'fade' : 'fade in'}`}>
            <div className="scroll-container">
              <div className="scroll-indicator" onClick={() => setShow(true)}>
                <div>
                  <img src="/arrow-down.svg" />
                </div>
              </div>
              {/* <p>MORE TO COME... WORKING ON BEING BETTER</p> */}
            </div>
          </div>

          <div className={`${show ? 'fade in' : 'fade'}`}>
            <div>
              <p>&copy; CIVIS MUNDI 2021 ALL RIGHTS RESERVED</p>
            </div>
            <div>
              <p>
                <a target="_blank" href="mailto: hello@civismundi.world">
                  HELLO@CIVISMUNDI.WORLD
                </a>{' '}
                &middot;{' '}
                <a target="_blank" href="https://www.instagram.com">
                  INSTAGRAM
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
==
    </Home>
  )
}

const scrollAnim = keyframes`
  0% {transform: translateY(0)}
  50% {transform: translateY(-4px)}
  55% {transform: translateY(-4px)}
  100% {transform: translateY(0)}
`

const Home = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  pointer-events: none;

  .section {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    position: relative;
    height: 100%;
    pointer-events: none;

    .section__footer {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0 15px;
      bottom: 15px;
      width: 100%;
      pointer-events: initial;

      & > div {
        display: flex;
        align-items: flex-end;

        &:first-child {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          text-align: center;
          transition: all 4s;

          p {
            font-size: 14px;

            @media ${breakpoints.phoneOnly} {
              font-size: 12px;
            }
          }

          &.fade {
            opacity: 0;
            transition: all 1.2s;

            &.in {
              opacity: 1;
              transition: all 4s;
            }
          }
        }

        &:last-child {
          justify-content: space-between;

          &.fade {
            opacity: 0;
            pointer-events: none;
            transition: opacity 1.2s;

            &.in {
              opacity: 1;
              transition: opacity 2s;
              pointer-events: initial;
            }
          }

          @media ${breakpoints.phoneOnly} {
            flex-wrap: wrap;
            text-align: center;

            & > div {
              width: 100%;

              &:first-child {
                order: 2;

                p {
                  font-size: 9px;
                }
              }

              &:last-child {
                order: 1;
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.85);
                margin-bottom: 5px;

                p,
                a {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }

      p {
        font-size: 14px;
        margin: 0;
      }
    }
  }

  .scroll-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    max-width: 315px;
    flex-wrap: wrap;

    p {
      margin-top: 10px !important;
    }

    @media ${breakpoints.phoneOnly} {
      max-width: 280px;
    }
  }

  .scroll-indicator {
    pointer-events: initial;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid grey;
    position: relative;
    display: block;
    cursor: pointer;

    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -35%);

      img {
        width: 10px;
        height: auto;
        animation: ${scrollAnim} 1.7s infinite ease;
      }
    }
  }

  .f-bold {
    font-family: 'Druk Wide Super';
    font-weight: 700;
  }
`

export default Content
