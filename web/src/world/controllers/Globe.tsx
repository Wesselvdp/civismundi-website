// @ts-nocheck
import * as THREE from 'three'
import { throttle } from 'lodash'
import World from '..';
import { calculateCameraZ } from 'src/utils'
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

    globe.globeMaterial().opacity = 0
    globe.renderer().setClearColor( 0x000000, 0 );
    globe.scene().background = null 

    globe.camera().position.setLength(calculateCameraZ())

    const that = this
    globe.controls().addEventListener('change', throttle(onControlsChanged, 100))
    function onControlsChanged() {
      if (that.world.lightning) {
        that.world.lightning.object.position.copy(that.world.globe.camera().position)
      }
    }

    // resize
    function onResize() {
      that.world.globe.camera().aspect = window.innerWidth / window.innerHeight
      that.world.globe.camera().updateProjectionMatrix()
      that.world.globe.renderer().setSize(window.innerWidth, window.innerHeight)
      that.world.globe.camera().position.setLength(calculateCameraZ())
    }
    window.addEventListener('resize', onResize)
    onResize()
  }

  public setGlobeOpacity(value: number) {
    /* To fix opacity */
  }
}
