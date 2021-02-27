import World from '..';
import BaseController from './BaseController';
// import console = require('console');

export default class GlobeController extends BaseController {
  constructor(world: World) {
    super(world);

    this.init();
  }

  init() {
    const globe = this.world.globe;
    globe.controls().enableZoom = false;

    globe.camera().aspect = window.innerWidth / window.innerHeight
    globe.camera().updateProjectionMatrix()

    globe.renderer().setSize( window.innerWidth, window.innerHeight );

    const that = this
    globe.controls().addEventListener('change', () => {
      if (that.world.lightning) {
        console.log('updating lightning')
        that.world.lightning.object.position.copy(this.world.globe.camera().position)
      }
    })
  }
}
