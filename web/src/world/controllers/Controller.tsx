import World from '..';

import LoadingController from './Loading';
import VersionController from './Version';
import GlobeController from './Globe';
import PostProcessingController from './PostProcessing';
import ModeController from './Mode';

export default class Controller {
  world: World;
  loader: LoadingController;
  version: VersionController;
  mode: ModeController;
  globe: GlobeController;
  postprocessing: PostProcessingController;

  constructor(world: World) {
    this.world = world;
    this.loader = new LoadingController(world);
    this.version = new VersionController(world);
    this.mode = new ModeController(world);
    this.globe = new GlobeController(world);
    this.postprocessing = new PostProcessingController(world);
  }
}
