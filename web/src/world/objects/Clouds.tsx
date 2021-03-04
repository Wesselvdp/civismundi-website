import * as THREE from 'three'

import BaseObject from './BaseObject';
import { Version } from '../controllers/Version';
import World from '..';

type TRotation = {
  x: number;
  y: number;
}

export default class Clouds extends BaseObject {
  rotation: TRotation = { x: 0, y: 0 };

  constructor(world: World) {
    super(world);

    this.setRotationFromVersion(this.world.controller.version.version);
    this.init();
  }

  init() {
    const that = this;

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(102, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(
          '/clouds.png',
          (texture) => texture
        ),
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        opacity: 0.5,
      })
    );

    clouds.renderOrder = 1;
    clouds.name = 'Clouds';

    setInterval(
      () => (
        (clouds.rotation.y -= that.rotation.y), (clouds.rotation.x -= that.rotation.x)
      ),
      10
    )

    this.object = clouds;
    this.world.globe.scene().add(this.object);

    const geometry = new THREE.BoxBufferGeometry();
    const material = new THREE.MeshNormalMaterial();
    
    for ( let i = 0; i < 1000; i ++ ) {
    
      const object = new THREE.Mesh( geometry, material );
      object.position.x = Math.random() * 80 - 40;
      object.position.y = Math.random() * 80 - 40;
      object.position.z = Math.random() * 80 - 40;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      this.world.globe.scene().add( object );
          
		}
  }

  setRotationFromVersion(version: Version) {
    const multiplier = version === Version.MOBILE ? 1.2 : 1
    this.rotation = { x: 0.00003 * multiplier, y: 0.00012 * multiplier }
  }
}
