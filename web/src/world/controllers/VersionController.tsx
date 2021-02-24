import World from '..';
import BaseController from './BaseController';
import { SET_VERSION } from 'src/actions/types';

export enum Version {
  MOBILE,
  DESKTOP,
}

export default class VersionController extends BaseController {
  private _version: Version = Version.DESKTOP;

  constructor(world: World) {
    super(world);

    this.init();
  }

  init() {
    this.setVersion();
  }

  setVersion() {
    if (typeof window === 'undefined') return;

    const version = window.innerWidth < 600 ||
        (window.matchMedia('(orientation: landscape)').matches &&
          window.innerWidth < 850)
        ? Version.MOBILE
        : Version.DESKTOP

    if (version !== this._version) {
      this._version = version;
      this._onVersionChange();
    }
  }

  private _onVersionChange() {
    this.world.dispatch({ type: SET_VERSION, version: this._version })
  }

  get version() {
    return this._version;
  }
}
