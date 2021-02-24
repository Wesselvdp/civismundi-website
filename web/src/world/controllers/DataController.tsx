import World from '..';
import BaseController from './BaseController';

import { tProject } from '../types';

export default class DataController extends BaseController {
  projects: tProject[] = []

  constructor(world: World, projects: tProject[]) {
    super(world);

    this.init(projects);
  }

  private init(projects: tProject[]) {
    this.projects = projects
  }
}
