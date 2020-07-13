// @ts-nocheck

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import { isMobile } from 'react-device-detect'
import { navigate } from 'gatsby'

import * as THREE from 'three'
import { initGlobe } from './utils'
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');

const Globe = loadable(() => import('react-globe.gl'))

type T = {
  projects: Project[],
  onInitialized: Function,
  introFinished: boolean,
  preview: any,
  setPreview: Function,
  setVideoPos: Function,
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

const World = ({ projects, preview, setPreview, onInitialized, introFinished, setVideoPos }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef();
  // globe
  const [loaded, setLoaded] = useState(false)
  const [isInitialized, setInitialized] = useState(false)
  const [cameraChanged, setCameraChanged] = useState(false)
  const [cameraRotating, setCameraRotating] = useState(true)

  // scene objects
  const [clouds, setClouds] = useState(null);
  const [lightning, setLightning] = useState(null);

  // labels
  const [labels, setLabels] = useState([])
  const [labelHovered, onLabelHovered] = useState(null)
  const [labelClicked, onLabelClicked] = useState(null)

  useEffect(() => {
    if (loaded && ref.current && !isInitialized) {
      initGlobe(ref.current).then(res => {
        setClouds(res[0]);
        setLightning(res[1]);
      })

      // disable controls untill intro has finished
      const controls = ref.current.controls()
      controls.enabled = false
      controls.enableZoom = false
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.3

      if (isMobile) {
        ref.current.camera().fov = 75
      }

      // add event listener that listen on orbit control changes
      ref.current.controls().addEventListener('change', () => {
        if (!cameraChanged) {
          setCameraChanged(true)
        }
      })

      setTimeout(() => {
        setInitialized(true)
        onInitialized()
      }, 1000)
    }
  }, [loaded]);

  // on intro finished
  useEffect(() => {
    if (introFinished && ref.current) {
      const controls = ref.current.controls();

      controls.enabled = true;
    }
  }, [introFinished])

  // on preview selected
  useEffect(() => {

    if (!preview || !ref.current) {
      setCameraRotating(true)
      return setVideoPos(null)
    }

    // update video pos
    setVideoPos(
      ref.current.getScreenCoords(
        get(preview, 'node.location.lat', 0),
        get(preview, 'node.location.lng', 0),
        0.05
      )
    );

    if (!introFinished) return
    setCameraRotating(!(!!preview))
  
  }, [preview])

  // on label hover
  useEffect(() => {
    if (isMobile) return;
    if (!introFinished) return;
    setPreview(labelHovered)

    labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default))
    
    if (labelHovered) {
      Object.assign(labelHovered.__threeObj.scale, scale.large)
    }
  }, [labelHovered])

  // on label click
  useEffect(() => {
    if (!introFinished) return;
    if (!labelClicked) return;
  
    // On desktop, go to project detailed page on click
    if (!isMobile) {
      return navigate(`/projects/${labelClicked.node.slug.current}`)
    }

    // On mobile:
    if (preview && preview.node.slug.current === labelClicked.node.slug.current) {
      return navigate(`/projects/${labelClicked.node.slug.current}`)
    }
    
    setPreview(labelClicked);
  }, [labelClicked]);

  // on camera changed
  useEffect(() => {
    if (!cameraChanged) return;

    // update labels rotation
    const camera = ref.current.camera();
    labels.forEach(label => {
      label.__threeObj.quaternion.copy(camera.quaternion)
    })

    const timer = setTimeout(() => {
      setCameraChanged(false);
    }, 150);
    return () => clearTimeout(timer)
  }, [cameraChanged])

  useEffect(() => {
    if (ref.current) {
      ref.current.controls().autoRotate = cameraRotating
    }
  }, [cameraRotating])

  // window resize listener
  useLayoutEffect(() => {
    function updateSize() {
      const camera = ref.current.camera()
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', () => { if (ref.current) updateSize() })
    return () => window.removeEventListener('resize', updateSize)
  }, []);

  const labelObject = () => {
    const texture = new THREE.TextureLoader().load('/marker@2x.png')

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
    )
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
      )

      if (labels.length !== projects.length && !labels.some(label => label.__threeObj.uuid === d.__threeObj.uuid)) {
        setLabels([...labels, d])
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
          globeImageUrl="/earth-blue-marble-alt.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor={settings.backgroundColor}
          // labels
          customLayerData={projects}
          customThreeObject={() => labelObject()}
          customThreeObjectUpdate={(obj, d) => onLabelUpdate(obj, d)}
          onCustomLayerHover={obj => onLabelHovered(obj)}
          onCustomLayerClick={obj => onLabelClicked(obj)}
          onCustomLayerRightClick={obj => console.log(obj)}
          // settings
          animateIn={false}
          renderConfig={{
            sortObjects: false,
            antialias: true,
            alpha: true 
          }}
          waitForGlobeReady={true}
        />
     </React.Suspense>
    )
  )
}

export default World