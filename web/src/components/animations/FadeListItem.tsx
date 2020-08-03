import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const FadeListItem = ({ children, visible }) => {
  const [isVisible, setVisible] = useState(false)

  const ref = useRef()

  useEffect(() => {
    if (!visible) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting))
      }, { rootMargin: '75px' })

      observer.observe(ref.current)
    }
  }, [])

  return (
    <ItemStyled ref={ref} className={`${visible || isVisible ? 'is-visible' : ''}`}>
      {children}
    </ItemStyled>
  )
}

export default FadeListItem

const ItemStyled = styled.div`
  opacity: 0;
  transform: translateY(20vh);
  visibility: hidden;
  transition: opacity 1200ms ease-out, transform 600ms ease-out,
  visibility 1200ms ease-out;
  will-change: opacity, transform, visibility;

  &.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
`
