import World from '..';
import { SET_VERSION } from 'src/actions/types';

export enum Version {
  MOBILE,
  DESKTOP,
}

export default class VersionController  {
  private _version: Version = Version.DESKTOP;

  world: World;

  constructor(world: World) {
    this.world = world;

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