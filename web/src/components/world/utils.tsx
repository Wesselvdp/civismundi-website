import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { isMobile } from 'react-device-detect'
import { Camera } from 'three';

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

export const initialize = (curr: any, options: any = { full: true }) => {
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
  if (isMobile) camera.fov = 75

  // custom three objects
  let clouds;
  let lightning;
  if (options.full !== false) {
    clouds = initClouds(curr)
    lightning = initDirectionalLight(curr)
  }

  return Promise.all([
    scene,
    camera,
    controls,
    renderer,
    clouds,
    lightning,
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

const direction = new THREE.Vector3();
const binormal = new THREE.Vector3();
const normal = new THREE.Vector3();
const position = new THREE.Vector3();
const lookAt = new THREE.Vector3();

export const moveToMarker = (curr, marker, options = {}) => {
  if (!marker) return

  const camera = curr.camera()
  const scene = curr.scene()
  const controls = curr.controls()

  const coords = curr.getCoords(marker.node.location.lat, marker.node.location.lng, 0.05)

  // path/curve
  const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z ),
    new THREE.Vector3( coords.x, coords.y, coords.z ),
  ] );

  // geometry
  const tubeGeometry = new THREE.TubeBufferGeometry( curve, 200, 2, 3, true);
  const material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
  const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.3, wireframe: true, transparent: true } );
  const mesh = new THREE.Mesh( tubeGeometry, material );
	const wireframe = new THREE.Mesh( tubeGeometry, wireframeMaterial );
	mesh.add( wireframe );
  scene.add(mesh)

  // camera animation
  new TWEEN.Tween({ t: 0})
    .to({ t: 1500 }, 1500)
    .onUpdate(d => {
      tubeGeometry.parameters.path.getPointAt( d.t, position );
      position.multiplyScalar( 1 );

      // interpolation
      const segments = tubeGeometry.tangents.length;
      const pickt = t * segments;
      const pick = Math.floor( pickt );
      const pickNext = ( pick + 1 ) % segments;

      binormal.subVectors( tubeGeometry.binormals[ pickNext ], tubeGeometry.binormals[ pick ] );
      binormal.multiplyScalar( pickt - pick ).add( tubeGeometry.binormals[ pick ] );

      tubeGeometry.parameters.path.getTangentAt( t, direction );
      const offset = 15;

      normal.copy( binormal ).cross( direction );

      // we move on a offset on its binormal

      position.add( normal.clone().multiplyScalar( offset ) );

      camera.position.copy( position );

      // using arclength for stablization in look ahead
      tubeGeometry.parameters.path.getPointAt( ( t + 30 / tubeGeometry.parameters.path.getLength() ) % 1, lookAt );
      lookAt.multiplyScalar( params.scale );

      // camera orientation 2 - up orientation via normal

      if ( ! params.lookAhead ) lookAt.copy( position ).add( direction );
      camera.matrix.lookAt( camera.position, lookAt, normal );
      camera.quaternion.setFromRotationMatrix( camera.matrix );
    })
    .start()

  tubeGeometry.parameters.path.getPointAt( t, position );
  position.multiplyScalar( params.scale );

  // interpolation

  var segments = tubeGeometry.tangents.length;
  var pickt = t * segments;
  var pick = Math.floor( pickt );
  var pickNext = ( pick + 1 ) % segments;

  binormal.subVectors( tubeGeometry.binormals[ pickNext ], tubeGeometry.binormals[ pick ] );
  binormal.multiplyScalar( pickt - pick ).add( tubeGeometry.binormals[ pick ] );

  tubeGeometry.parameters.path.getTangentAt( t, direction );
  var offset = 15;

  normal.copy( binormal ).cross( direction );

  // we move on a offset on its binormal

  position.add( normal.clone().multiplyScalar( offset ) );

  splineCamera.position.copy( position );
  cameraEye.position.copy( position );

  // using arclength for stablization in look ahead

  tubeGeometry.parameters.path.getPointAt( ( t + 30 / tubeGeometry.parameters.path.getLength() ) % 1, lookAt );
  lookAt.multiplyScalar( params.scale );

  // camera orientation 2 - up orientation via normal

  if ( ! params.lookAhead ) lookAt.copy( position ).add( direction );
  splineCamera.matrix.lookAt( splineCamera.position, lookAt, normal );
  splineCamera.quaternion.setFromRotationMatrix( splineCamera.matrix );
}


export const moveFromMarker = (curr, options = {}) => {
  const scene = curr.scene()
  const controls = curr.controls()
  const camera = curr.camera()

  const world = scene.children.find(obj => obj.type === 'Group')
  const clouds = scene.children.find(obj => obj.name === 'Clouds')

  controls.minDistance = 101
  controls.maxDistance = Infinity

  // TODO: fix
  
  const duration = options.duration !== undefined ? options.duration : 1500
  new TWEEN.Tween({ x: controls.target.x, y: controls.target.y, z: controls.target.z })
    .to({ x: 0, y: 0, z: 0}, duration)
    .onUpdate(d => {
      controls.target.set(d.x, d.y, d.z)
    })
    .start()
  
  new TWEEN.Tween({ length: camera.position.sub(world.position).length() })
    .to({ length: 350 })
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