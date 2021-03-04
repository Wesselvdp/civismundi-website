import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { World, Galaxy } from '@components/world'
import Div100vh from 'react-div-100vh'

import { breakpoints } from '@utils/breakpoints'

const INTERACTION_THRESHOLD = 150

const WorldContainer = ({}) => {
  const world = useSelector((state: any) => state.world)
  const [showText, setShowText] = useState(false)
  const [finishedGlitch, setFinishedGlitch] = useState(false)
  const interactionTimer: { current: number | null } = useRef(0)

  useEffect(() => {
    if (world.ready) {
      setTimeout(() => {
        world.ref.controller.postprocessing.glitchPass.goWild = false
        world.ref.controller.postprocessing.staticPass.uniforms['amount'].value = 0.10
        setFinishedGlitch(true)

        setTimeout(() => {
          world.ref.controller.postprocessing.glitchPass.range = [540, 660]
          world.ref.controller.postprocessing.glitchPass.generateTrigger()
        }, 10000)
      }, 1000)

      // Add listener
      world.ref.globe.controls().addEventListener('start', () => {
        interactionTimer.current = Date.now()
      })

      world.ref.globe.controls().addEventListener('end', () => {
        if (interactionTimer.current) {
          const elapsed = Date.now() - interactionTimer.current

          if (elapsed > INTERACTION_THRESHOLD) {
            setShowText(false)
          }

          interactionTimer.current = null
        }
      })
    }
  }, [world.ready])

  useEffect(() => {
    function listener() {
      setShowText(true)
    }

    if (finishedGlitch) {
      window.addEventListener('mousewheel', listener)
    }

    return () => window.removeEventListener('mousewheel', listener)
  }, [finishedGlitch])

  return (
    <Home className="home">
      <div className="home__globe">
        <World />
        <Galaxy />
      </div>

      <Div100vh>
        <div className="section">
          <div className="section__title" style={{ opacity: `${showText ? 1 : 0}`}}>
            <h2>
              A <span className="f-bold">DIVERSE</span> GROUP OF HUMANS WHO <br />
              <span className="f-bold">TELL</span> STORIES, <span className="f-bold">WRITE</span> FILMS, <br />
              <span className="f-bold">DEVELOP</span> SHOWS, <span className="f-bold">DESIGN</span> THINGS, <br />
              <span className="f-bold">SUPPORT</span> THE ARTS &amp; <span className="f-bold">CREATE</span> MEMORIES
            </h2>
            <p>CREATIVE LIBERY DEFINES US. RESPONSIBILITY GROUNDS US. WE ARE CITIZENS OF THE WORLD. LET'S ACT LIKE IT.</p>
          </div>
          <div className="section__footer">
            <div className={`${showText || !finishedGlitch ? 'fade' : 'fade in'}`}>
              <div className="scroll-container">
                <div className="scroll-indicator" onClick={() => setShowText(true) }>
                  <div>
                    <img src="/arrow-down.svg" />
                  </div>
                </div>
                <p>MORE TO COME... WORKING ON BEING BETTER</p>
              </div>
            </div>

            <div className={`${showText ? 'fade in' : 'fade'}`}>
              <div>
                <p>&copy; CIVIS MUNDI 2021 ALL RIGHTS RESERVED</p>
              </div>
              <div>
                <p>
                  <a target="_blank" href="mailto: hello@civismundi.world">HELLO@CIVISMUNDI.WORLD</a> &middot; <a target="_blank" href="https://www.instagram.com">INSTAGRAM</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Div100vh>
    </Home>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    outline: 0;
    overflow: hidden;
  }

  .home__content {
    pointer-events: none;
  }

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

                p, a {
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

  .section__title {
    transition: all 1.2s;

    h2 {
      font-size: 3.5vw;
    }

    p {
      font-size: 1.6vw;
    }

    @media ${breakpoints.phoneOnly} {
      padding: 0 15px;

      h2 {
        font-size: 22px;
      }

      p {
        font-size: 16px;
      }

      br {
        display: none;
      }
    }

    h2, p {
      color: rgba(255, 255, 255, 0.85);
      -webkit-background-clip: text;
      background-clip: text;
      background-image: url(https://dl.dropbox.com/s/0nobgmnqhkqce5t/source.gif?dl=0);
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
  }

  .scroll-indicator {
    pointer-events: initial;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid grey;
    position: relative;
    display: block;
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

  .f-bold {
    font-family: 'Druk Wide Super';
    font-weight: 700;
  }
`