// @ts-nocheck

import React, { FC, useEffect, useRef, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'

import * as THREE from 'three'
import { initGlobe } from './utils'
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');

const Globe = loadable(() => import('react-globe.gl'))

type T = {
  projects: Project[],
  onInitialized: Function,
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

const scale = {
  default: new THREE.Vector3(1, 1, 1),
  large: new THREE.Vector3(1.3, 1.3, 1.3)
}

const World: FC<T> = ({ projects, onInitialized, activeProject, setActiveProject, setActiveLabelObj, setVideoPos, titleEl, videoEl }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef();
  const [loaded, setLoaded] = useState(false)
  const [isInitialized, setInitialized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [labelActive, setLabelActive] = useState(null);
  const [cameraChanged, setCameraChanged] = useState(false);

  useEffect(() => {
    if (loaded && ref.current && !isInitialized) {
      initGlobe(ref.current);

      // add event listener that listen on orbit control changes
      ref.current.controls().addEventListener('change', () => {
        if (!cameraChanged) {
          setCameraChanged(true);
        }
      })

      setTimeout(() => {
        setInitialized(true);
        onInitialized();
      }, 1000)
    }
  }, [loaded]);

  useEffect(() => {
    if (!activeProject || !ref.current) {
      return setVideoPos(null)
    }
    
    // set position of the video box
    setVideoPos(
      ref.current.getScreenCoords(
        get(activeProject, 'location.lat', 0),
        get(activeProject, 'location.lng', 0),
        0.05
      )
    );
  }, [activeProject])

  useEffect(() => {
    labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default));
    
    if (labelActive) {
      Object.assign(labelActive.__threeObj.scale, scale.large);
    }
  }, [labelActive]);

  useEffect(() => {
    if (!cameraChanged) return;

    // let labels look at the screen
    labels.forEach(label => {
      label.__threeObj.quaternion.copy(ref.current.camera().quaternion);
    })

    setTimeout(() => {
      setCameraChanged(false);
    }, 100);
  }, [cameraChanged]);

  /* ----- Labels ------ */
  const labelObject = () => {
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

  const onLabelUpdate = (obj, d) => {
    if (!loaded) setLoaded(true);

    if (ref.current) {
      Object.assign(
        obj.position,
        ref.current.getCoords(
          get(d, 'node.location.lat', 0),
          get(d, 'node.location.lng', 0),
          0.05
        )
      );

      if (labels.length !== projects.length && !labels.some(label => label.__threeObj.uuid === d.__threeObj.uuid)) {
        setLabels([...labels, d]);
      }
    }
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
          customThreeObject={() => labelObject()}
          customThreeObjectUpdate={(obj, d) => onLabelUpdate(obj, d)}
          onCustomLayerHover={obj => setLabelActive(obj)}
          // settings
          animateIn={false}
          renderConfig={{
            sortObjects: false
          }}
          waitForGlobeReady={true}
        />
     </React.Suspense>
    )
  )
}

export default World