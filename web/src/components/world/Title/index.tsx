// @ts-nocheck
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { TimelineMax } from 'gsap/all'

import { breakpoints } from '@utils/breakpoints'
import { R } from 'src/utils'

const Title = ({ show = false }) => {
  const SSR = typeof document === 'undefined'

  useEffect(() => {
    if (SSR) return

    const title = document.getElementById('world__title').cloneNode(true)
    document.querySelector('.world__title__wrapper').appendChild(title)
    title.classList.add('overtitle')

    const tl = new TimelineMax({ repeat: -1 })
    for (var i = 50; i--;) {
      tl.to(title, R(0.03,0.17), {
        opacity: R(0,1),
        y: R(-2.5, 2.5),
        x: R(-2.5, 2.5)
      })
    }
  }, [SSR])

  return (
    <Wrapper className={`world__title__wrapper ${show ? 'show' : 'hide'}`}>
      <div id="world__title" className="world__title">
        <h2>
          A <span className="f-bold">DIVERSE</span> GROUP OF HUMANS WHO <br />
          <span className="f-bold">TELL</span> STORIES, <span className="f-bold">WRITE</span> FILMS, <br />
          <span className="f-bold">DEVELOP</span> SHOWS, <span className="f-bold">DESIGN</span> THINGS, <br />
          <span className="f-bold">SUPPORT</span> THE ARTS &amp; <span className="f-bold">CREATE</span> MEMORIES
        </h2>
        <p>CREATIVE LIBERY DEFINES US. RESPONSIBILITY GROUNDS US. WE ARE CITIZENS OF THE WORLD. LET'S ACT LIKE IT.</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;

  .world__title {
    transition: opacity 1.2s;

    h2 {
      font-size: 3.5vw;
    }

    p {
      font-size: 1.6vw;
    }

    @media ${breakpoints.phoneOnly} {
      padding: 0 15px;

      h2 {
        font-size: 22px
      }

      p {
        font-size: 16px;
      }

      br {
        display: none;
      }
    }

    h2, p {
      transition: none;
      color: rgba(255, 255, 255, 0.85);
      -webkit-background-clip: text;
      background-clip: text;
      background-image: url(https://dl.dropbox.com/s/0nobgmnqhkqce5t/source.gif?dl=0);
    }
  }

  .overtitle {
    position: absolute;
    top: 0;
    left: 0;

    h2, p {
      color: rgba(255, 255, 255, 1);
      -webkit-background-clip: initial;
      background-clip: initial;
      background-image: none;
    }
  }

  &.hide {
    .world__title, .overtitle {
      opacity: 0 !important;
    }
  }

  &.show {
    .overtitle, .world__title, overtitle {
      opacity: 1;
    }
  }
`

export default Title
