import React from 'react'

const InfiniteScroll = ({ children }) => {
  return (
    <div className="wrap3d">
      <div className="slides slides-scroll">
        <div className="slide-wrap">
          <div className="slide loop-pad" style={{ height: '90vh', pointerEvents: 'none' }}></div>
          {children}
          <div className="slide loop-pad" style={{ height: '100vh', pointerEvents: 'none' }}></div>
        </div>
      </div>
    </div>
  )
}

export default InfiniteScroll
