import React, { useEffect, useMemo } from 'react'

import { videoNames } from '@components/webgl/Globe/data'

const Videos = () => {
  const videos = useMemo(
    () =>
      videoNames.map((video: string) => ({
        id: video,
        src: `/videos/${video}.mp4`,
      })),
    []
  )

  useEffect(() => {
    // Fix autoplay when in low-power mode
    const playVideos = function() {
      document.querySelectorAll('video').forEach(video => video.play())
      document.removeEventListener('click', playVideos)
      document.removeEventListener('touchstart', playVideos)
    }

    document.addEventListener('click', playVideos, false)
    document.addEventListener('touchstart', playVideos, false)
  }, [])


  return (
    <div className="video-container">
      {videos &&
        videos.map((video: any) => (
          <video
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
