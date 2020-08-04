import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
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

  cloudMesh.name = 'Clouds'

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

      directionalLight.position.copy(curr.camera().position)
      resolve(directionalLight);
    })
  })
}

const doPulsingTween = (obj, duration = 1000) => {
  console.log()
  new TWEEN.Tween({ scale: 1, opacity: 1 })
    .to({ scale: 2, opacity: 0 }, duration)
    .onUpdate(d => {
      obj.scale.set(d.scale, d.scale, d.scale)
      obj.material.opacity = d.opacity
    })
    .onComplete(d => {
      doPulsingTween(obj, duration)
    })
    .start()
}

const initPulsingLabels = (curr: any, projects: any[]) => {
  const duration = 1000
  const geometry = new THREE.CircleGeometry(isMobile ? 7 : 3.5, 25, 25)
  geometry.vertices.splice(0, 1)
  const material = new THREE.LineBasicMaterial({ color: 'white', transparent: true })
  
  const labels: any[] = []
  projects.forEach(project => {
    if (project.node.slug.current === 'columbus') {
      // Create a ring
      const position = curr.getCoords(project.node.location.lat, project.node.location.lng, 0.05)
      const ring = new THREE.LineLoop(geometry, material)
      ring.position.set(position.x, position.y, position.z)
      curr.scene().add(ring)

      // Animate ring
      doPulsingTween(ring, duration)

      labels.push(ring)
    }
  })

  return new Promise((resolve, reject) => resolve(labels))
}

export const initialize = (curr: any, projects: any[], options: any = { full: true }) => {
  THREE.DefaultLoadingManager.onLoad = function () {
    options.onLoaded && setTimeout(options.onLoaded(), 1000)
  };

  const scene = curr.scene()
  const camera = curr.camera()
  const controls = curr.controls()
  const renderer = curr.renderer()
  
  // control options
  controls.enableZoom = false
  controls.autoRotateSpeed = 0.3
  if (isMobile) camera.position.z = 500

  // custom three objects
  let clouds;
  let lightning;
  let pulsingLabels;
  if (options.full !== false) {
    clouds = initClouds(curr)
    lightning = initDirectionalLight(curr)
    pulsingLabels = initPulsingLabels(curr, projects)
  }

  return Promise.all([
    scene,
    camera,
    controls,
    renderer,
    clouds,
    lightning,
    pulsingLabels
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

const markerCameraPositions = {
  fuckthat: {x: -21.09517134023139, y: -13.842005393559838, z: 158.13052241620738, worldY: -40 },
  columbus: {x: 27.14184364454964, y: -7.805917689107176, z: 157.41942896107605, worldY: -40 },
  DelaMove: {x: 0.21709849267533315, y: -129.60871165915535, z: 124.37075872820836, worldY: -75 },
  stargazing: {x: -157.3196871510831, y: -45.99100074437717, z: -83.3751610249093, worldY: -50 }
}

export const moveToMarker = (curr, marker, options = {}) => {
  if (!marker) return

  const scene = curr.scene()
  const controls = curr.controls()
  const camera = curr.camera()

  const world = scene.children.find(obj => obj.type === 'Group')
  const clouds = scene.children.find(obj => obj.name === 'Clouds')
  const c1 = curr.getCoords(marker.node.location.lat, marker.node.location.lng, 0)

  controls.minDistance = 60
  controls.maxDistance = Infinity
 
  const projectSlug = marker.node.slug.current;
  const markerToPosition = markerCameraPositions[projectSlug] || {}

  const duration = options.duration !== undefined ? options.duration : 1500
  new TWEEN.Tween({ x: controls.target.x, y: controls.target.y, z: controls.target.z })
    .to({ x: c1.x, y: c1.y, z: c1.z}, duration)
    .onUpdate(d => {
      controls.target.set(d.x, d.y, d.z)
    })
    .start()

  new TWEEN.Tween({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
    .to(markerToPosition, duration)
    .onUpdate(d => {
      camera.position.set(d.x, d.y, d.z)
    })
    .start()
  
  new TWEEN.Tween({ x: world.position.x, y: world.position.y, z: world.position.z })
    .to({ x: world.position.x, y: markerToPosition ? markerToPosition.worldY : -25, z: world.position.z }, duration)
    .onUpdate(d => {
      world.position.set(d.x, d.y, d.z)
      clouds.position.set(d.x, d.y, d.z)
    })
    .start()
}


export const moveFromMarker = (curr, options = {}) => {
  const scene = curr.scene()
  const controls = curr.controls()
  const camera = curr.camera()

  const world = scene.children.find(obj => obj.type === 'Group')
  const clouds = scene.children.find(obj => obj.name === 'Clouds')

  controls.minDistance = 101
  controls.maxDistance = Infinity
  
  const duration = options.duration !== undefined ? options.duration : 1500
  new TWEEN.Tween({ x: controls.target.x, y: controls.target.y, z: controls.target.z })
    .to({ x: 0, y: 0, z: 0}, duration)
    .onUpdate(d => {
      controls.target.set(d.x, d.y, d.z)
    })
    .start()
  
  new TWEEN.Tween({ length: camera.position.sub(world.position).length() })
    .to({ length: isMobile ? 500 : 350 })
    .onUpdate(d => {
      camera.position.sub(world.position).setLength(d.length).add(world.position);
    })
    .start()

  new TWEEN.Tween({ x: world.position.x, y: world.position.y, z: world.position.z })
    .to({ x: 0, y: 0, z: 0 }, duration)
    .onUpdate(d => {
      world.position.set(d.x, d.y, d.z)
      clouds.position.set(d.x, d.y, d.z)
    })
    .start()
}

const markerTypes = {
  hidden: { x: 0, y: 0, z: 0 },
  default: { x: 1, y: 1, z: 1 },
  hover: { x: 1.3, y: 1.3, z: 1.3 }
}

export const changeMarkerType = (markers, type, options = {}) => {
  if (!markers || !markers.length) return

  const duration = options.duration !== undefined ? options.duration : 500

  markers.forEach(marker =>
    new TWEEN.Tween({ x: marker.__threeObj.scale.x, y: marker.__threeObj.scale.y, z: marker.__threeObj.scale.z })
      .to(markerTypes[type], duration)
      .onUpdate(d => {
        marker.__threeObj.scale.set(d.x, d.y, d.z)
      })
      .start()
  )
}