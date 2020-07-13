import * as THREE from 'three'
import { isMobile } from 'react-device-detect'

const initClouds = (curr: any) => {
  const cloudMesh = new THREE.Mesh(
    new THREE.SphereGeometry(102, 32, 32),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/clouds.png', texture => texture),
      transparent: true,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
      opacity: 0.5
    })
  )
  cloudMesh.renderOrder = 1

  setInterval(
    () => (
      (cloudMesh.rotation.y -= 0.00012), (cloudMesh.rotation.x -= 0.00003)
    ),
    10
  )

  // add clouds to scene
  const scene = curr.scene()
  scene.add(cloudMesh)

  return new Promise((resolve, reject) => resolve(cloudMesh));
}

const initDirectionalLight = (curr: any) => {
  const globeMaterial = curr.globeMaterial()

  globeMaterial.bumpScale = 10
  new THREE.TextureLoader().load(
    '//unpkg.com/three-globe/example/img/earth-water.png',
    texture => {
      globeMaterial.specularMap = texture
      globeMaterial.specular = new THREE.Color('grey')
      globeMaterial.shininess = 15
    }
  )

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const directionalLight = curr
        .scene()
        .children
        .find(obj3d => obj3d.type === 'DirectionalLight')

      directionalLight && directionalLight.position.set(1, 1, 1)
      console.log(directionalLight);
      // if (directionalLight) directionalLight.target = curr.camera()
      resolve(directionalLight);
    })
  })
}

export const initialize = (curr: any) => {
  const scene = curr.scene()
  const camera = curr.camera()
  const controls = curr.controls()
  const renderer = curr.renderer()
  
  // control options
  controls.enabled = false
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.3
  if (isMobile) camera.fov = 70

  // custom objects
  const clouds = initClouds(curr)
  const lightning = initDirectionalLight(curr)

  return Promise.all([
    scene,
    camera,
    controls,
    renderer,
    clouds,
    lightning
  ]);
}

export const labelObject = () => {
  const texture = new THREE.TextureLoader().load('/marker@2x.png')

  return (
    new THREE.Mesh(
      new THREE.CircleGeometry(isMobile ? 5 : 3.5, 25, 25),
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