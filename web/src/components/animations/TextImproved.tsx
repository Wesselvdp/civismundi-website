import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import usePrevious from '@hooks/usePrevious'
// import console = require('console');

const TextAnimation = ({
  text,
  className,
  tag: Tag,
  style = {},
  durationIn = 0.25, // seconds
  durationOut = 0.25, // seconds
  allowCustomBreaks,
  ...props
}) => {
  const [words, setWords] = useState([])
  const [speed, setSpeed] = useState({ in: 10, out: 20 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)

    if (text) {
      setSpeed({ in: text.length / durationIn, out: text.length / durationOut })
      generateWords()
    }
  }, [text])

  useEffect(() => {
    setTimeout(
      () =>
        setReady(
          words && words.length > 0 && speed.in === text.length / durationIn
        ),
      0
    )
  }, [words])

  const generateWords = () => {
    const words = text.split(' ')
    const objs = words.map((word: string, i: number) => {
      const position = words
        .slice(0, i)
        .reduce((acc: any, word: string) => acc + word.length, 0)
      return {
        value: word,
        position,
      }
    })

    setWords(objs)
  }

  if (!ready) return null

  return (
    <CSSTransition classNames="text" {...props}>
      <Wrapper>
        <Tag className={className} style={style}>
          {words.map((word: any) => {
            if (word.value.toLowerCase() === '{br}') {
              return allowCustomBreaks ? <br /> : null
            }

            return (
              <>
                <span style={{ display: 'inline-block' }}>
                  {word.value &&
                    word.value.split('').map((letter: string, i: number) => (
                      <span
                        key={word.position + i}
                        className="letter"
                        style={{
                          transitionDelay: props.in
                            ? `${(word.position + i) / speed.in}s`
                            : `${(word.position + i) / speed.out}s`,
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                </span>
                <span> </span>
              </>
            )
          })}
        </Tag>
      </Wrapper>
    </CSSTransition>
  )
}

const Wrapper = styled.div`
  pointer-events: none;
  user-select: none;

  .letter {
    margin: 0;
    pointer-events: none;
    display: inline-block;
    will-change: opacity, transform;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    transform-origin: center bottom;
  }

  &.text-enter,
  &.text-appear {
    .letter {
      transform: scale(0.2);
      opacity: 0;
    }
  }

  &.text-enter-active,
  &.text-appear-active {
    .letter {
      transform: none;
      opacity: 1;
      transition: all 0.3s ease;
    }
  }

  &.text-enter-done,
  &.text-appear-done {
    .letter {
      transform: none;
      opacity: 1;
    }
  }

  &.text-exit {
    .letter {
      opacity: 1;
      transform: none;
    }
  }

  &.text-exit-active {
    .letter {
      transform: scale(0);
    }
  }
`

export default TextAnimation
