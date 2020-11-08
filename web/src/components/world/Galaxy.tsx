import React from 'react'

import './styles.scss'

const Galaxy = () => {
  return (
    <div className="galaxy-container">
      <div className="perspective-container">
        <div className="stars large" />
        <div className="stars medium" />
        <div className="stars small" />
      </div>
    </div>
  )
}

export default Galaxy
