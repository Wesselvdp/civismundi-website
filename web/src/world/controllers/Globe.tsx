import World from '..';
import { Mode } from '@components/world/WorldContainer'

const calculateCameraZ = () => {
  const base = 350
  if (window.innerWidth > 760) return base

  let aspect = window.innerWidth / window.innerHeight
  if (aspect < 1) aspect = window.innerHeight / window.innerWidth
  aspect = Math.min(aspect, 2)

  // magic
  const multiplier = 0.4
  const z = base + aspect * multiplier * base - multiplier * base

  return z
}


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

    globe.camera().position.z = calculateCameraZ()

    const that = this
    globe.controls().addEventListener('change', () => {
      if (that.world.lightning) {
        that.world.lightning.object.position.copy(that.world.globe.camera().position)
      }

      that.world.controller.mode.setMode(Mode.EXPLORE)
    })

    window.addEventListener('resize', () => {
      that.world.globe.camera().aspect = window.innerWidth / window.innerHeight
      that.world.globe.camera().updateProjectionMatrix()
      that.world.globe.renderer().setSize(window.innerWidth, window.innerHeight)
      globe.camera().position.z = calculateCameraZ()
    })
  }

  public setGlobeOpacity(value: number) {
    /* To fix opacity */
  }
}
