import React, { useEffect, useMemo } from 'react'
import { usePageVisibility } from 'react-page-visibility'

import { textures } from '@components/webgl/Globe/data'

const Videos = () => {
  const isVisible = usePageVisibility()

  const videos = useMemo(
    () =>
      Object.keys(textures).map((key) => ({
        id: key,
        src: `/videos/${textures[key].video}`,
      })),
    []
  )

  useEffect(() => {
    if (isVisible) {
      const videos = document.querySelectorAll('.video-container video')
      for (let i = 0; i < videos.length; i += 1) {
        videos[i].play()
      }
    }
  }, [isVisible])

  return (
    <div className="video-container">
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
    </div>
  )
}

export default Videos
