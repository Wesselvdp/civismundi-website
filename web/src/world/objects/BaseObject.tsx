import World from '..';

export default class BaseObject {
  world: World;
  object: any;

  constructor(world: World) {
    this.world = world
  }
}
