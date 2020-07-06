import React, { FC, useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'

type T = {
  text: string
  showText: boolean
  className?: string
  style?: {}
}

const TitleAnimated: FC<T> = ({
  text = 'Title',
  showText = true,
  className,
  style
}) => {
  const [letters, setLetters] = useState<string[]>([''])
  const [enterActive, setEnterActive] = useState<boolean>(false)
  const [enter, setEnter] = useState<boolean>(true)
  const [exitActive, setExitActive] = useState<boolean>(false)
  const [exit, setExit] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false);

  // Timing
  const duration = 300
  const [durationTotal, setDurationTotal] = useState<number>(0)

  useLayoutEffect(() => {
   if(showText) setVisible(true);
  })

  useEffect(() => {
    if (visible) {
      setEnterActive(true)
      setTimeout(() => {
        setEnter(false)
        setExit(true)
        setEnterActive(false)
      }, durationTotal)
    }
    if (!visible) {
      setExitActive(true)
      setTimeout(() => {
        setEnter(true)
        setExit(false)
        setExitActive(false)
      }, durationTotal)
    }
  }, [visible])

  useEffect(() => {
    setLetters(text.split(''))
    setDurationTotal(setLetters.length * duration)
  }, [text])

  return (
    <Wrapper>
      <h2 className={className} style={style}>
        {letters.map((el, id) => (
          <span
            key={id}
            className={`letter ${enter ? 'enter' : ''} ${
              enterActive ? 'enter-active' : ''
            } ${exit ? 'exit' : ''} ${exitActive ? 'exit-active' : ''}`}
            style={{ transitionDelay: `${0.025 * id}s` }}
          >
            {el}
          </span>
        ))}
      </h2>
    </Wrapper>
  )
}

export default TitleAnimated

const Wrapper = styled.div`
  .letter {
    display: inline-block;
    /* transition: transform 300ms ease-in, opacity 0.1s ease; */
    will-change: transform;

    &.enter {
      transform: scale(0.2);
      transform-origin: 50% 80%;
      opacity: 0;
    }

    &.enter-active {
      transform: none;
      opacity: 1;
      transition: transform 300ms ease-in, opacity 0.25s ease;
    }

    &.exit {
      opacity: 1;
      transform-origin: 50% 80%;
      transform: none;
    }
    &.exit-active {
      transform: scale(0.2);
      opacity: 0;
      transition: transform 300ms ease-in,
        opacity 0.8s cubic-bezier(0.1, 0.02, 0.08, 1.1);
    }
  }
  h2 {
    /* font-size: 78px; */
    white-space: pre-wrap;
  }
  .item {
    transform-origin: 50% 80%;
  }
  .remove-btn {
    margin-right: 0.5rem;
  }

  .item-enter {
  }
  .item-enter-active {
    transform: none;
    opacity: 1;
    transition: transform 300ms ease-in, opacity 0.25s ease;
  }
  .item-exit {
    opacity: 1;
    transform-origin: 50% 80%;
    transform: none;
  }
  .item-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: transform 300ms ease-in, opacity 0.25s ease;
  }
`
