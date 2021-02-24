import World from '..';

export default class BaseController {
  world: World;

  constructor(_world: World) {
    this.world = _world;
  }
}
