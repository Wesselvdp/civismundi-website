import Clouds from './objects/Clouds';
import Lightning from './objects/Lightning';
import Regions from './objects/Regions';
import Controller from './controllers/Controller';

import { tThreeObject } from '../types/interfaces';

export default class World {
  public globe: any;
  public dispatch: any;
  public controller: any;

  public sphere: any;
  public clouds?: Partial<tThreeObject>;
  public lightning?: Partial<tThreeObject>;
  public regions?: Partial<tThreeObject>;

  constructor(reactGlobeRef: { current: any }, dispatch: any) {
    if (!reactGlobeRef.current) return

    this.globe = reactGlobeRef.current;
    this.dispatch = dispatch;

    // controllers
    this.controller = new Controller(this);

    // threejs objects
    this.sphere = this.globe.scene().children[0];
    // this.regions = new Regions(this);
    this.clouds = new Clouds(this);
    this.lightning = new Lightning(this);
  }
}
