import FilmgrainPass from '../passes/filmgrain'
import World from '..'

export default class PostProcessingController {
  world: any;
  composer: any

  constructor(world: World) {
    this.world = world;

    this.init();
  }

  private init() {
    // Create composer
    const composer = this.world.globe.postProcessingComposer()

    // - Filmgrain pass
    // const filmgrainPass = new FilmgrainPass()
    // filmgrainPass.pass.renderToScreen = true
    // composer.addPass(filmgrainPass.pass)
  }
}
