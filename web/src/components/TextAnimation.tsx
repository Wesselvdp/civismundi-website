import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';
import { slice } from 'lodash'
// import console = require('console');

// import console = require('console');
// import console = require('console');

type T = {
  text: string | undefined
  className?: string
  tag: 'h1' | 'h2' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  style?: {},
  inProp: any,
  timeout: number
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
  timeout
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

  console.log(words);

  if (!text) return null;

  return (
    <CSSTransition in={inProp} timeout={timeout} classNames="text">
      <Wrapper>
        <Tag className={className} style={style}>
          {words.map((w) => (
            <span style={{ display: 'inline-block' }}>
              {slice(letters, w.position, w.position + w.length).map((l, i) => (
                <span className="letter" style={{ transitionDelay: `${0.01 * (w.position + i)}s`}}>{l}</span>
              ))}
              &nbsp;&nbsp;
            </span>
          ))}
        </Tag>
      </Wrapper>
    </CSSTransition>
  );
}

const Wrapper = styled.div`
  .letter {
    pointer-events: none;
    display: inline-block;
    will-change: transform;
    opacity: 0;
  }

  &.text-enter {
    .letter {
      transform: scale(0.2);
      transform-origin: 50% 80%;
      opacity: 0;
    }
  }

  &.text-enter-active {
    .letter {
      transform: none;
      opacity: 1;
      transition: transform ${letterTransitionDuration}ms ease-in, opacity 0.25s ease;
    }
  }

  &.text-enter-done {
    .letter {
      transform: none;
      opacity: 1;
    }
  }

  &.text-exit {
    .letter {
      opacity: 1;
      transform-origin: 50% 80%;
      transform: none;
    }
  }

  &.text-exit-active {
    .letter {
      transform: scale(0.2);
      opacity: 0;
      transition: transform ${letterTransitionDuration}ms ease-in,
      opacity 0.8s cubic-bezier(0.1, 0.02, 0.08, 1.1);
    }
  }
`

export default TextAnimation