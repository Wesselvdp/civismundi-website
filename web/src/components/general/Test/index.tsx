import React, { useState, Suspense } from "react";
import { Canvas, useThree } from "react-three-fiber";

function Scene({ index, videoUrl }) {
  const { size } = useThree();

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.setAttribute('playsinline', 'playsinline')
    vid.muted = true
    vid.crossOrigin = 'anonymous'
    // video.id = obj.video
    vid.loop = true
    vid.style.display = 'none'
    vid.src = videoUrl
    vid.load()
    vid.play()
    return vid;
  });

  let position;
  if (index === 0) {
    position = [-0.25 * size.width, 0.25 * size.height, 0]
  } else if (index === 1) {
    position = [0.25 * size.width, 0.25 * size.height, 0]
  }
  else if (index === 2) {
    position = [-0.25 * size.width, -0.25 * size.height, 0]
  } else {
    position = [0.25 * size.width, -0.25 * size.height, 0]
  }
  return (
    <mesh position={position} scale={[size.width * 0.5, size.height * 0.5, 1]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

const Test = () => {
  const { size } = useThree();

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
      <Suspense fallback={null}>
        <Canvas
          orthographic
          colorManagement={false}
          camera={{ position: [0, 0, 100] }}
        >
          <Scene index={0} videoUrl="/videos-compressed/stargazing.mp4" />
          <Scene index={1} videoUrl="/videos-compressed/dna.mp4" />
          <Scene index={2} videoUrl="/videos-compressed/armani.mp4" />
          <Scene index={3} videoUrl="/videos-compressed/superbowl.mp4" />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Test
