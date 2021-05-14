import React, { useEffect, useMemo } from 'react'
import { usePageVisibility } from 'react-page-visibility'

import { textures } from '@components/webgl/Globe/data'

const Videos = () => {
  const isVisible = usePageVisibility()

  const videos = useMemo(
    () =>
      Object.keys(textures).map((key) => ({
        id: key,
        src: `/${textures[key].video}`,
      })),
    []
  )

  useEffect(() => {
    const playVideos = function( event) {
      console.log('fired event!', event)

      document.querySelectorAll('.video-container video').forEach(video => video.play())
      document.removeEventListener('click', playVideos)
      document.removeEventListener('touchstart', playVideos)
    }

    document.addEventListener('click', playVideos, false)
    document.addEventListener('touchstart', playVideos, false)
  }, [])

  // useEffect(() => {
  //   if (isVisible) {
  //     const videos = document.querySelectorAll('.video-container video')
  //     for (let i = 0; i < videos.length; i += 1) {
  //       videos[i].play()
  //     }
  //   }
  // }, [isVisible])

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
            className="world-video"
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ))}
    </div>
  )
}

export default Videos
