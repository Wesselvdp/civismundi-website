import World from '..';
import BaseController from './BaseController';

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
  }
}
