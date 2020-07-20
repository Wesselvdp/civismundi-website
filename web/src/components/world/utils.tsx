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

      // // directionalLight.position.set(1, 0, 0)
      directionalLight.position.copy(curr.camera().position)
      // curr.camera().add(directionalLight)
      // console.log(curr.camera())
      // console.log(directionalLight)
      // console.log('camera position', curr.camera().position)
      // if (directionalLight) {
      //   directionalLight.position.copy(
      //     curr.camera().position.x,
      //     curr.camera().position.y,
      //     curr.camera().position.z
      //   )

      //   curr.camera().add(directionalLight)
      // }

      
      // const pointLight = new THREE.PointLight( 0xffffff );
      // pointLight.position.set(1,1,2);
      // curr.camera().add(pointLight)

      // if (directionalLight) directionalLight.target = curr.camera()
  
      // if (directionalLight) directionalLight.target = curr.camera()
      resolve(directionalLight);
    })
  })
}

// const initVideoGlobe = (curr: any) => {
//   const texture = new THREE.TextureLoader().load('/stargazing.mp4')
//   const geometry = new THREE.SphereGeometry( 101, 32, 32 );
//   const material = new THREE.MeshBasicMaterial({ color: 0xffff00, map: texture });
//   const video = new THREE.Mesh( geometry, material );

//   video.position.set(0, 0, 0)

//   video.material.transparent = true
//   video.material.opacity = 0

//   curr.scene().add(video);

//   return video;
// }

export const initialize = (curr: any, fullMode = false) => {
  const scene = curr.scene()
  const camera = curr.camera()
  const controls = curr.controls()
  const renderer = curr.renderer()
  
  // control options
  controls.enabled = false
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.3
  if (isMobile) camera.fov = 75

  // custom objects
  const clouds = fullMode && initClouds(curr) 
  const lightning = fullMode && initDirectionalLight(curr)
  // const videoGlobe = fullMode && initVideoGlobe(curr)

  return Promise.all([
    scene,
    camera,
    controls,
    renderer,
    clouds,
    lightning,
    // videoGlobe
  ]);
}

export const labelObject = () => {
  const texture = new THREE.TextureLoader().load('/marker@2x.png')

  return (
    new THREE.Mesh(
      new THREE.CircleGeometry(isMobile ? 7 : 3.5, 25, 25),
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