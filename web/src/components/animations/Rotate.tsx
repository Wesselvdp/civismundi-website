import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

const Rotate = ({ 
  children,
  timeout,
  delay,
  ...props
}) => (
  <CSSTransition {...props} timeout={timeout} classNames="rotatey">
    <RotateWrapper delay={delay} timeout={timeout}>{children}</RotateWrapper>
  </CSSTransition>
)

export default Rotate

const RotateWrapper = styled.div`
  transform: rotate3d(0, 1, 0, -180deg);

  &.rotatey {
    &-enter, &-appear {
      transform: rotate3d(0, 1, 0, -180deg);
    }

    &-enter-active, &-appear-active {
      transform: rotate3d(0, 1, 0, 0);
      transition: transform ${props => props.timeout | 1000}ms ease ${props => props.delay || 0}ms;
    }

    &-enter-done, &-appear-done, &-exit, &-exit-active {
      transform: rotate3d(0, 1, 0, 0);
    }
  }
`
