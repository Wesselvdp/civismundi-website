// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from "gsap";

import { breakpoints } from '@utils/breakpoints'
import { R } from 'src/utils'

const Title = ({ show = false }) => {
  const SSR = typeof document === 'undefined'
  const tl = useRef()

  useEffect(() => {
    if (SSR) return

    const title = document.getElementById('world__title').cloneNode(true)
    document.querySelector('.world__title__wrapper').appendChild(title)
    title.classList.add('overtitle')

    tl.current = gsap.timeline({ repeat: -1 })
    for (var i = 50; i--;) {
      tl.current.to(title, {
        opacity: R(0,1),
        y: R(-2.5, 2.5),
        x: R(-2.5, 2.5),
        duration: R(0.03,0.17)
      })
    }
  }, [SSR])

  useEffect(() => {
    if (tl.current) {
      show ? tl.current.resume() : tl.current.pause()
    }
  }, [show])

  "A diverse group of humans telling stories, writing films, developing shows, designing things, and engaging art in all its forms."
  "Creative liberty defines us. Humanity grounds us."

  return (
    <Wrapper className={`world__title__wrapper ${show ? 'show' : 'hide'}`}>
      <div id="world__title" className="world__title">
        <h2>
          A <span className="f-bold">DIVERSE</span> GROUP OF HUMANS <br />
          <span className="f-bold">TELLING</span> STORIES, <span className="f-bold">WRITING</span> FILMS, <br />
          <span className="f-bold">DEVELOPING</span> SHOWS, <span className="f-bold">DESIGNING</span> THINGS, <br />
          AND <span className="f-bold">ENGAGING</span> ART IN ALL ITS FORMS.
        </h2>
        <p>CREATIVE LIBERY DEFINES US. HUMANITY GROUNDS US.</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

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
