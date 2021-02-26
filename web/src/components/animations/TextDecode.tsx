import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const CHARACTERS_ALLOWED = 'ABCDEFGHIJKLMNOPQRSTUVWXZ'.toLowerCase()
const EXCEPTIONS = [' ', ',']

const TextDecode = ({ className, style, tag: Tag, text, ...rest}) => {
  const [letters, setLetters] = useState([])
  const buffer = useRef()

  useEffect(() => {
    if (!text) return

    doEffect()
  }, [text])


  const doEffect = () => {
    let continueAnimation = false
    let message = ''

    // create buffer
    if (!buffer.current) buffer.current = text.split('').map((l: string, i: number) => ({ c: (Math.floor(Math.random() * 12 )) + 1, l }))

    buffer.current.forEach((fader: any, i: number) => {
      if (fader.c > 0 && !EXCEPTIONS.includes(fader.l)) {
        continueAnimation = true
        buffer.current[i].c = fader.c - 1
        message += CHARACTERS_ALLOWED.charAt(Math.floor(Math.random() * CHARACTERS_ALLOWED.length))
      } else {
        message += fader.l
      }
    })

    console.log('message', message)
    setLetters(message.split(''))

    if (continueAnimation) {
      setTimeout(() => doEffect(), 100)
    }
  }

  const randomString = (length: number) => {
    let r = ''
    while (r.length < length) {
      r += CHARACTERS_ALLOWED.charAt(Math.floor(Math.random() * CHARACTERS_ALLOWED.length))
    }

    return r.split('')
  }

  return (
    <Wrapper>
      <Tag className={className} style={style}>
        {letters.map(letter => <span className={`${letter === ' ' ? 'no-animation' : ''}`}>{letter}</span>)}
      </Tag>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  span {
    font-family: Courier;
  }
`

// const Wrapper = styled.div`
//   pointer-events: none;
//   user-select: none;

//   .letter {
//     margin: 0;
//     pointer-events: none;
//     display: inline-block;
//     will-change: transform;
//     opacity: 0;
//     transform-origin: center bottom;
//     transform: scale(0);
//     transition: transform ${letterTransitionDuration}ms ease;
//   }

//   &.text-enter, &.text-appear {
//     .letter {
//       transform: scale(0.2);
//       opacity: 0;
//     }
//   }

//   &.text-enter-active, &.text-appear-active {
//     .letter {
//       transform: none;
//       opacity: 1;
//       transition: transform ${letterTransitionDuration}ms ease, opacity 0.25s ease;
//     }
//   }

//   &.text-enter-done, &.text-appear-done {
//     .letter {
//       transform: none;
//       opacity: 1;
//     }
//   }

//   &.text-exit {
//     .letter {
//       opacity: 1;
//       transform: none;
//     }
//   }

//   &.text-exit-active {
//     .letter {
//       transform: scale(0);
//     }
//   }
// `

export default TextDecode
