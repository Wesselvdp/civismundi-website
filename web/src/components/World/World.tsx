// @ts-nocheck
import React, { FC, useEffect, useRef, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'

import * as THREE from 'three'

const Globe = loadable(() => import('react-globe.gl'))

type T = {
  projects: Project[],
  onLoaded: Function,
  activeProject: Project | null
  setActiveProject: Function,
  setVideoPos: Function,
}

const settings = {
  backgroundColor: '#000',
  labelRadius: 2.5,
  labelColor: '#FFF'
}


const World: FC<T> = ({ projects, onLoaded, activeProject, setActiveProject, setVideoPos }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  // globe ref
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) onLoaded()
  }, [loaded]);

  useEffect(() => {
    if (!activeProject || !ref.current) {
      return setVideoPos(null)
    }
    
    // 1. Get screen coordinates
    const sCoords = ref.current.getScreenCoords(
      get(activeProject, 'location.lat', 0),
      get(activeProject, 'location.lng', 0),
      0.05
    );
      
    // 2. Use these to position video box
    setVideoPos(sCoords);
  }, [activeProject])

  /* THREE label (circle) */
  const labelObject = d => {
    const texture = new THREE.TextureLoader().load('/marker@2x.png');

    return (
      new THREE.Mesh(
        new THREE.CircleGeometry(settings.labelRadius, 25, 25),
        [
          new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            color: 0xffffff
          }),
        ]
      )
    );
  }
  

  return (
     <React.Suspense fallback={<div />}>
      {!isSSR && (
        <Globe
          // ref
          ref={ref}
          // appearance
          globeImageUrl="/earth.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor={settings.backgroundColor}
          // labels
          customLayerData={projects}
          customThreeObject={d => labelObject(d)}
          customThreeObjectUpdate={(obj, d) => {
            Object.assign(obj.position, ref.current.getCoords(
              get(d, 'node.location.lat', 0),
              get(d, 'node.location.lng', 0),
              0.05
            ));
          }}
          onCustomLayerHover={obj => {
            console.log(obj);
            setActiveProject(obj)
          }}

          // settings
          animateIn={false}
          showAtmosphere={false}
        />
      )}
     </React.Suspense>
  )
}

export default World