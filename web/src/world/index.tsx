type Ref = { current: any };

import LoadingController from './controllers/LoadingController';
import VersionController from './controllers/VersionController';
import DataController from './controllers/DataController';
import GlobeController from './controllers/GlobeController';
import PostProcessingController from './controllers/PostProcessingController';

import Clouds from './objects/Clouds';
import Lightning from './objects/Lightning';
import Regions from './objects/Regions';

import { tThreeObject, tProject, } from './types';
import { Version } from './controllers/VersionController'

export default class World {
  private _loaderCtrl: LoadingController;
  private _versionCtrl: VersionController;
  private _dataCtrl: DataController;
  private _globeCtrl: GlobeController;

  public globe: any;
  public dispatch: any;

  public sphere: Partial<tThreeObject>;
  public clouds?: Partial<tThreeObject>;
  public lightning?: Partial<tThreeObject>;
  public regions?: Partial<tThreeObject>;

  constructor(reactGlobeRef: Ref, projects: tProject[], dispatch: any) {
    if (!reactGlobeRef.current) return

    this.globe = reactGlobeRef.current;
    this.dispatch = dispatch;

    // controllers
    this._loaderCtrl = new LoadingController(this);
    this._versionCtrl = new VersionController(this);
    this._dataCtrl = new DataController(this, projects);

    // threejs objects
    this.sphere = this.globe.scene().children[0];
    this.regions = new Regions(this);
    this.clouds = new Clouds(this);
    this.lightning = new Lightning(this);

    this._globeCtrl = new GlobeController(this);
    new PostProcessingController(this);
  }

  setVersion() {
    this._versionCtrl.setVersion()
  }

  public getVersion(): Version {
    return this._versionCtrl.version
  }

  public getProjects(): tProject[] {
    return this._dataCtrl.projects
  }
}
