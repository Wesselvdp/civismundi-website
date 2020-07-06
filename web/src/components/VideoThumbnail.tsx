import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

// components
import BackgroundVideo from '@components/BackgroundVideo'
import TextAnimated from '@components/TextAnimated'

type T = {
  d: {
    title: string,
    slug: string
  }
}

const VideoThumbnail: FC<T> = ({d: {title, slug}}) => {
  const [showText, setShowText] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setShowText(true)
    }, 1000);
  }, [])
  return (
    <Thumbnail>
      <BackgroundVideo />
      <div className="content">
        <div>
          <TextAnimated tag={'span'} className="d-block" text="video direction" showText={showText} />
          <TextAnimated tag={'h2'} className="d-block" text="stargazing" showText={showText} />
        </div>
      </div>
    </Thumbnail>
  )
}

export default VideoThumbnail;

const Thumbnail = styled.div`
  width: 400px;
  height: 225px;
  position: relative;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;   

    .d-block {
      display: block;
    }
  }
`