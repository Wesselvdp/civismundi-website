import * as THREE from 'three'

import BaseObject from './BaseObject';
import World from '..';

export default class Lightning extends BaseObject {
  constructor(world: World) {
    super(world);

    this.init();
  }

  init() {
    // const material = this.world.globe.globeMaterial()
    // material.bumpScale = 10

    // new THREE.TextureLoader().load(
    //   '//unpkg.com/three-globe/example/img/earth-water.png',
    //   (texture) => {
    //     material.specularMap = texture
    //     material.specular = new THREE.Color('grey')
    //     material.shininess = 15
    //   }
    // )

    setTimeout(() => {
      const directionalLight = this.world.globe.scene()
        .children.find((obj3d: any) => obj3d.type === 'DirectionalLight')

      directionalLight.position.copy(this.world.globe.camera().position)
      directionalLight.intensity = 0.6

      this.object = directionalLight;
      this.world.globe.scene().add(this.object);
    })
  }
}
