import { useState } from 'react'

const useLogo = () => {
  const [hideVideo, setHideVideo] = useState(false)

  return { hideVideo, setHideVideo }
}

export default useLogo
