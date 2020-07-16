import React, { FC } from 'react'
import styled from 'styled-components'

type T = {
  href?: string
  className?: string
  buttonStyle: 'outlined' | 'solid'
  color?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: any
  hover?: boolean
}

type StyleProps = {
  buttonStyle?: 'outlined' | 'solid'
  color?: 'primary' | 'secondary'
  theme: any
}

const ButtonComponent: FC<T> = props => {
  const {
    onClick,
    children,
    disabled,
    href,
    buttonStyle,
    color,
    className,
    hover = true
  } = props

  return (
    <Button
      onClick={onClick}
      className={`${className} ${!hover ? 'no-hover' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      color={color}
      buttonStyle={buttonStyle}
    >
      <span>{children}</span>
    </Button>
  )
}

const Button = styled('button')<StyleProps>`
    border: 2px solid;
    text-transform: uppercase;
    font-weight: bold;
    padding: 1em 4em;
    cursor: pointer;
    box-sizing: border-box;
    font-family: 'Druk Wide Bold';
    border: 2px solid #fff;
    color: #fff;
    background-color: transparent;

    &:hover:not(.no-hover) {
      color: #000;
      background-color:  #fff;
      /* border: 2px solid #000 */
    }


    &.block {
      width: 100%;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: initial;

      &:hover {
        background-color: inherit;
        color: inherit;
      }
    }
/* 
    /* Outlined */
    ${({ buttonStyle, theme }) =>
      buttonStyle === 'outlined' &&
      `
      border: 2px solid #fff
      color: #fff;
      background-color: transparent;

      &:hover:not(.no-hover) {
        color: #000;
        background-color: #fff;
        border: 2px solid #000
      }
  `}

  /* Solid White */
    ${({ buttonStyle, color, theme }) =>
      buttonStyle === 'solid' &&
      color !== 'secondary' &&
      `
      color: #fff
      background-color:  #000;
      border: 2px solid #000;

      &:hover:not(.no-hover) {
        color: #000;
        background-color:  #fff;
        
      }
  `}

  /* Solid Black */
    ${({ buttonStyle, color, theme }) =>
      buttonStyle === 'solid' &&
      color === 'secondary' &&
      `
      color: #000;
      background-color:  #fff;
      border: 2px solid  #fff;

      &:hover:not(.no-hover) {
        color: #fff;
        background-color:  #000;
        border: 2px solid #000

      }
  `} */
   
   a {
     text-decoration: none;
     color: inherit;
   }
`

export default ButtonComponent
