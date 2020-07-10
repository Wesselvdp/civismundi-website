// @ts-nocheck

import React, { FC, useEffect, useRef, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'

import * as THREE from 'three'

const Globe = loadable(() => import('react-globe.gl'))

type T = {
  projects: Project[],
  onLoaded: Function,
  activeProject: any,
  setActiveProject: Function,
  setVideoPos: Function,
  activeLabelObj: any,
  setActiveLabelObj: Function,
  titleEl: any,
  videoEl: any
}

const settings = {
  backgroundColor: '#000',
  labelRadius: 3.5,
  labelColor: '#FFF'
}

const calibrateVideoY = (sCoords, titleEl, videoEl) => {
  const titleC = get(titleEl, 'current');
  const videoC = get(videoEl, 'current');
  if (titleC && videoC) {
    const tRect = titleC.getBoundingClientRect();
    const vRect = videoC.getBoundingClientRect();
    const title = { top: tRect.y, bottom: tRect.y + tRect.height };
    const video = { top: sCoords.y, bottom: sCoords.y + vRect.height };
  //   if (video.top < title.top && video.bottom < title.bottom) {
  //     // move up
  //     console.log('moving up!', title, video);
  //     sCoords.y += title.top - video.bottom < vRect.height ? title.top - video.bottom : 0
  //   } else if (video.top > title.top && video.bottom > title.bottom) {
  //     // move down
  //     console.log('moving down!', title, video);
  //     sCoords.y += video.top - title.bottom < vRect.height ? title.bottom - video.top : 0
  //   }
  }

  sCoords.y += 20

  return sCoords;
}

const calibrateVideoPos = (project, current, titleEl, videoEl) => {
    // 1. Get screen coordinates
    let sCoords = current.getScreenCoords(
      get(project, 'location.lat', 0),
      get(project, 'location.lng', 0),
      0.05
    );
    
    
    // 2. Possible calibrate the Y coordinate so that it does not
    //    conflict with title.
    sCoords = calibrateVideoY(sCoords, titleEl, videoEl);
    
    return sCoords;
}

const World: FC<T> = ({ projects, onLoaded, activeProject, setActiveProject, setActiveLabelObj, setVideoPos, titleEl, videoEl }) => {
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
    
    // set position of the video box
    setVideoPos(
      calibrateVideoPos(
        activeProject,
        ref.current,
        titleEl,
        videoEl
      )
    );
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
    !isSSR && (
      <React.Suspense fallback={<div />}>
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
              setActiveProject(obj)
              setActiveLabelObj(obj ? obj.__threeObj : null)
          }}

          // settings
          animateIn={false}
          showAtmosphere={false}
        />
     </React.Suspense>
    )
  )
}

export default World