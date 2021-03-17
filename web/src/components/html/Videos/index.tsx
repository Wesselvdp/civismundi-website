import React, { useMemo } from 'react'

import { textures } from '@components/webgl/Globe/data'

const Videos = () => {
  const videos = useMemo(
    () =>
      Object.keys(textures).map((key) => ({
        id: key,
        src: `/videos/${textures[key].video}`,
      })),
    []
  )

  return (
    <>
      {videos &&
        videos.map((video) => (
          <video
            autoPlay
            loop
            muted
            playsInline
            id={video.id}
            key={video.id}
            style={{ display: 'none' }}
            crossOrigin="anonymous"
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ))}
    </>
  )
}

export default Videos
