import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';
import { slice } from 'lodash'
// import console = require('console');

type T = {
  text: string | undefined
  className?: string
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  style?: {},
  inProp: any,
  timeout: number
  letterSpeedIn: number,
  letterSpeedOut: number
}

type WordObject = {
  position: number
  length: number
}

const letterTransitionDuration = 300

const TextAnimation: FC<T> = ({
  text,
  className,
  tag: Tag,
  style,
  inProp,
  timeout,
  letterSpeedIn = 0.025,
  letterSpeedOut = 0.005,
  ...rest
}) => {
  const [letters, setLetters] = useState<string[]>([])
  const [words, setWords] = useState<WordObject[]>([])

  useEffect(() => {
    if (text) {
      const words = text.split(' ')
      const letters = text.split('').filter(l => l !== '');
      
      let letterPosition = 0;
      const wordObjs = words.map(word => {
        const obj = ({ position: letterPosition, length: word.length })
        letterPosition += word.length + 1;

        return obj;
      })
    
      setWords(wordObjs)
      setLetters(letters);
    }
  }, [text])

  if (!text) return null;

  return (
    <CSSTransition in={inProp} timeout={timeout} classNames="text" {...rest}>
      <Wrapper>
        <Tag className={className} style={style}>
          {words.map((w) => (
            <span style={{ display: 'inline-block' }}>
              {slice(letters, w.position, w.position + w.length).map((l, i) => (
                <span className="letter" style={{ transitionDelay: `${(inProp ? letterSpeedIn : letterSpeedOut) * (w.position + i)}s`}}>{l}</span>
              ))}
              &nbsp;
            </span>
          ))}
        </Tag>
      </Wrapper>
    </CSSTransition>
  );
}

const Wrapper = styled.div`
  pointer-events: none;
  user-select: none;

  .letter {
    margin: 0;
    pointer-events: none;
    display: inline-block;
    will-change: transform;
    opacity: 0;
    transform: scale(0);
    transition: transform ${letterTransitionDuration}ms ease-in-out;
  }

  &.text-enter, &.text-appear {
    .letter {
      transform: scale(0.2);
      transform-origin: 50% 50%;
      opacity: 0;
    }
  }

  &.text-enter-active, &.text-appear-active {
    .letter {
      transform: none;
      opacity: 1;
      transition: transform ${letterTransitionDuration}ms ease-in-out, opacity 0.25s ease-in-out;
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
      transform-origin: 50% 50%;
      transform: scale(0);
    }
  }
`

export default TextAnimation