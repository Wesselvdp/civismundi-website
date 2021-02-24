import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { debounce } from 'lodash'

import World from '..';
import BaseController from './BaseController';
import { SET_PROGRESS } from 'src/actions/types';

const MIN_PROGRESS_TIME: number = 3000;

export default class LoadingController extends BaseController {
  private _threeProgress: number = 0;
  private _minProgress: number = 0;

  progress: number = 0;
  ready: boolean = false;

  constructor(world: World) {
    super(world);

    this.init();
  }

  private init() {
    this.world.globe.pauseAnimation();

    const that = this;
    THREE.DefaultLoadingManager.onProgress = debounce(
      (url, itemsLoaded, itemsTotal) => {
        that.threeProgress = itemsLoaded / itemsTotal
      },
      50,
      {
        leading: true,
        trailing: true,
      }
    )

    THREE.DefaultLoadingManager.onLoad = function () {
      that.world.globe.resumeAnimation();
    };

    this._startMinProgress();
  }

  set threeProgress(percentage: number) {
    this._threeProgress = percentage;
    this._setProgress();
  }

  set minProgress(percentage: number) {
    this._minProgress = percentage;
    this._setProgress();
  }

  private _setProgress() {
    this.progress = Math.min(this._minProgress, this._threeProgress);

    this.world.dispatch({ type: SET_PROGRESS, progress: this.progress })
  }

  private _startMinProgress() {
    const that = this;

    new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, MIN_PROGRESS_TIME)
      .onUpdate(d => {
        that.minProgress = d.progress
      })
      .start()
  }
}
