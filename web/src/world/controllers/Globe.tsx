import World from '..';
import { Mode } from '@components/world/WorldContainer'

export default class GlobeController {
  world: World;

  constructor(world: World) {
    this.world = world;
    this.init();
  }

  init() {
    const globe = this.world.globe;

    globe.controls().enableZoom = false;
    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.3

    globe.camera().aspect = window.innerWidth / window.innerHeight
    globe.camera().updateProjectionMatrix()

    globe.renderer().setSize( window.innerWidth, window.innerHeight );

    globe.globeMaterial().opacity = 0
    globe.renderer().setClearColor( 0x000000, 0 );
    globe.scene().background = null

    const that = this
    globe.controls().addEventListener('change', () => {
      if (that.world.lightning) {
        that.world.lightning.object.position.copy(that.world.globe.camera().position)
      }

      that.world.controller.mode.setMode(Mode.EXPLORE)
    })
  }

  public setGlobeOpacity(value: number) {
    /* To fix opacity */
  }
}
