import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

const Fade = ({ 
  children,
  timeout,
  ...props
}) => (
  <CSSTransition {...props} timeout={timeout} classNames="fade">
    <FadeWrapper timeout={timeout}>{children}</FadeWrapper>
  </CSSTransition>
)

export default Fade

const FadeWrapper = styled.div`
  opacity: 0;

  &.fade {
    &-enter, &-appear {
      opacity: 0;
    }

    &-enter-active, &-appear-active {
      opacity: 1;
      transition: opacity ${props => props.timeout | 1000}ms ease-in-out;
    }

    &-enter-done, &-appear-done {
      opacity: 1;
    }

    &-exit {
      opacity: 1;
    }

    &-exit-active {
      opacity: 0;
      transition: opacity ${props => props.timeout | 1000}ms ease-in-out;
    }
  }
`

