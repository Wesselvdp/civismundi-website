import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import usePrevious from '@hooks/usePrevious'

const TextAnimation = ({
  text,
  className,
  tag: Tag,
  style,
  durationIn = 0.25, // seconds
  durationOut = 0.25, // seconds
  ...props
}) => {
  const [speed, setSpeed] = useState({ in: 10, out: 20 })

  useEffect(() => {
    if (text) {
      setSpeed({ in: text.length / durationIn, out: text.length / durationOut })
    }
  }, [text])

  if (!text) return null

  return (
    <CSSTransition classNames="text" {...props}>
      <Wrapper>
        <Tag className={className} style={style}>
          {text.split('').map((letter: string, i: number) => {
            return (
              <span className="letter" style={{width: letter === ' ' ? '0.25em' : 'auto', transitionDelay: props.in ? `${i / speed.in}s` : `${i / speed.out}s`}}>
                {letter}
              </span>
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

  &.text-enter, &.text-appear {
    .letter {
      transform: scale(0.2);
      opacity: 0;
    }
  }

  &.text-enter-active, &.text-appear-active {
    .letter {
      transform: none;
      opacity: 1;
      transition: all 0.3s ease;
    }
  }

  &.text-enter-done, &.text-appear-done {
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