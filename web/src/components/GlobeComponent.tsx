// @ts-nocheck

import React, { FC, useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import BackgroundVideo from '@components/BackgroundVideo'

import { renderToString } from 'react-dom/server'
import Globe from 'react-globe.gl'
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

type T = {
  onProjectHover: (project: any) => void
  onProjectClick: (project: any) => void
}
// Gen random data

const Thumbnail: FC<Type> = ({ d }) => {
  return (
    <StyledThumbnail>
      <BackgroundVideo />
    </StyledThumbnail>
  )
}

const GlobeComponent: FC<T> = ({ onProjectHover, onProjectClick }) => {
  const globeEl = useRef()
  const [data, setData] = useState([])
  const [autoplay, setAutoplay] = useState(true)

  const handleProjectHover = obj => {
    setAutoplay(!obj)
    onProjectHover(obj)
  }
  const handleProjectClick = obj => {
    setAutoplay(!obj)
    onProjectClick(obj)
  }

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/moon-landing-sites/moon_landings.json'
    )
      .then(r => r.json())
      .then(projects => {
        const a = projects.map(p => ({
          lat: p.lat,
          lng: p.lng,
          label: p.label,
          alt: 0.05,
          radius: 2.5
        }))
        const b = a.map(el => ({ outline: true, ...el }))
        setData([...a, ...b])
      })
  }, [])

  useLayoutEffect(() => {
    globeEl.current.pointOfView({ altitude: 3.5 })
    globeEl.current.controls().autoRotateSpeed = 0.3
    globeEl.current.pointOfView({ lat: 9.6, lng: -34.5, altitude: 1.5 })

    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(102, 32, 32),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('/clouds.png'),
        // side: THREE.DoubleSide,
        transparent: true,
        side: THREE.DoubleSide,
        // depthWrite: false,
        // depthTest: false,
        alphaTest: 0.1,
        opacity: 0.5
      })
    )
    const scene = globeEl.current.scene()

    cloudMesh.renderOrder = 1
    setInterval(
      () => (
        (cloudMesh.rotation.y -= 0.00005), (cloudMesh.rotation.x -= 0.00001)
      ),
      10
    )
    scene.add(cloudMesh)
  }, [])

  useEffect(() => {
    globeEl.current.controls().autoRotate = autoplay
  }, [autoplay])

  useEffect(() => {
    // custom globe material
    const globeMaterial = globeEl.current.globeMaterial()
    globeMaterial.bumpScale = 10
    new THREE.TextureLoader().load(
      '//unpkg.com/three-globe/example/img/earth-water.png',
      texture => {
        globeMaterial.specularMap = texture
        globeMaterial.specular = new THREE.Color('grey')
        globeMaterial.shininess = 15
      }
    )

    setTimeout(() => {
      // wait for scene to be populated (asynchronously)
      const directionalLight = globeEl.current
        .scene()
        .children.find(obj3d => obj3d.type === 'DirectionalLight')
      directionalLight && directionalLight.position.set(1, 1, 1) // change light position to see the specularMap's effect
    })
  }, [])

  return (
    <Globe
      ref={globeEl}
      renderConfig={{
        sortObjects: false
      }}
      waitForGlobeReady={true}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      showAtmosphere={false}
      globeMaterial={{
        transparent: false,
        alphaTest: 0
      }}
      customLayerData={data}
      onCustomLayerHover={(obj, prevObj) => {
        handleProjectHover(obj)
      }}
      onCustomLayerClick={obj => {
        handleProjectClick(obj)
      }}
      customLayerLabel={d => renderToString(<Thumbnail d={d} />)}
      customThreeObject={d => {
        const sphereGeometry = new THREE.SphereBufferGeometry(d.radius)
        const sphereMesh = new THREE.Mesh(
          sphereGeometry,
          new THREE.MeshLambertMaterial({ color: 0x000020 })
        )
        const outlineMesh = new THREE.Mesh(
          sphereGeometry,
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide })
        )
        outlineMesh.scale.multiplyScalar(1.15)

        return d.outline ? sphereMesh : outlineMesh
      }}
      customThreeObjectUpdate={(obj, d) => {
        Object.assign(
          obj.position,
          globeEl.current.getCoords(d.lat, d.lng, d.alt)
        )
      }}
    />
  )
}

const guiData = {
  currentURL: 'models/svg/tiger.svg',
  drawFillShapes: true,
  drawStrokes: true,
  fillShapesWireframe: false,
  strokesWireframe: false
}

const StyledThumbnail = styled.div`
  width: 400px;
  height: 225px;
  position: relative;
`
export default GlobeComponent
