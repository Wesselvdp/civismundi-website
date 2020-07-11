import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

type T = {
  text: string
  className?: string
  tag: 'h1' | 'h2' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  style?: {},
  inProp: any,
  timeout: number
}

const TextAnimation: FC<T> = ({
  text,
  className,
  tag: Tag,
  style,
  inProp,
  timeout
}) => {
  const [letters, setLetters] = useState<string[]>([''])

  useEffect(() => {
    setLetters(text.split(''))
  }, [])

  console.log(className);

  return (
    <CSSTransition in={inProp} timeout={timeout} classNames="text">
      <Wrapper>
        <Tag className={className} style={style}>
          {letters.map((letter, id) => (
            <span key={id} className='letter' style={{ transitionDelay: `${0.0025 * id}s`}}>
              {`${letter} `}
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
      transition: transform 300ms ease-in, opacity 0.25s ease;
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
      transition: transform 300ms ease-in,
      opacity 0.8s cubic-bezier(0.1, 0.02, 0.08, 1.1);
    }
  }
`

export default TextAnimation