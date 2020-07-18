import { useState, useLayoutEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  const [outerSize, setOuterSize] = useState([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
      setOuterSize([window.outerWidth, window.outerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { size, outerSize }
}

export default useWindowSize
