import * as THREE from 'three'

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
    const scene = curr.scene()
  
    cloudMesh.renderOrder = 1
    setInterval(
      () => (
        (cloudMesh.rotation.y -= 0.00005), (cloudMesh.rotation.x -= 0.00001)
      ),
      10
    )
    scene.add(cloudMesh)
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

    setTimeout(() => {
      // wait for scene to be populated (asynchronously)
      const directionalLight = curr
        .scene()
        .children.find(obj3d => obj3d.type === 'DirectionalLight')
      directionalLight && directionalLight.position.set(1, 1, 1) // change light position to see the specularMap's effect
    })
}

export const initGlobe = (curr: any) => {
  initClouds(curr);
  initDirectionalLight(curr);
}