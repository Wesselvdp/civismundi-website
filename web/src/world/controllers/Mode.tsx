import World from '..';
import BaseController from './Controller';
import { Mode } from '@components/world/WorldContainer';
import { SET_MODE } from 'src/actions/types';

export default class ModeController {
  world: World;
  mode: Mode = Mode.LOADING

  constructor(world: World) {
    this.world = world;

    this.setMode(Mode.LOADING)
  }

  setMode(mode: Mode) {
    if (this.mode !== mode) {
      this.world.dispatch({ type: SET_MODE, mode })
    }

    this.mode = mode;
  }
}
