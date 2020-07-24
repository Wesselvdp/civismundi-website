import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

const Vertical = ({ 
  children,
  timeout,
  ...props
}) => (
  <CSSTransition {...props} unmountOnExit timeout={timeout} classNames="vertical-anim">
    <VerticalWrapper timeout={timeout}>{children}</VerticalWrapper>
  </CSSTransition>
)

export default Vertical

const VerticalWrapper = styled.div`
  will-change: transform, opacity;
  opacity: 0;
  transform: translateY(50%);

  &.vertical-anim {
    &-enter, &-appear {
      opacity: 0;
      transform: translateY(50%);
    }

    &-enter-active, &-appear-active {
      opacity: 1;
      transform: none;
      transition: all 250ms ease-out;
    }

    &-enter-done, &-appear-done {
      opacity: 0;
      transform: translateY(25%);
      transition: all 1000ms ease-out;
    }
  }
`

