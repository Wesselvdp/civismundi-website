import { WorldMode, WorldVersion } from '../actions'

import {
  SET_DATA,
  WORLD_INITIALIZE_START,
  WORLD_INITIALIZE_COMPLETE,
  SET_LIGHTNING,
  SHOW_PREVIEW_VIDEO,
  SET_SKIP_TRANSITION,
  ADD_MARKER,
  SET_VISIBILITY_MARKERS,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_BACKGROUND,
  MODE_GO_AREA_PREVIEW,
  SET_ACTIVE_PROJECT
} from '../actions/types'

const initialState = {
  ready: false,
  ref: { current: null },
  mode: WorldMode.PROJECTS_EXPLORE,
  version: WorldVersion.DESKTOP,
  skipInTransition: false,
  showPreviewVideo: false,
  projects: [],
  projectActive: null,
  projectDetailed: null,
  areas: [],
  areaProjects: [],
  markers: [],
  markersVisible: undefined,
  cameraChanged: false,
  clouds: null,
  lightning: null
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DATA: {
      return { ...state, projects: action.projects, areaProjects: action.projects, areas: action.areas }
    }

    case WORLD_INITIALIZE_START: {
      return { ...state, ref: action.ref, version: action.version }
    }

    case WORLD_INITIALIZE_COMPLETE: {
      return { ...state, ready: true }
    }

    case MODE_GO_PROJECT_PREVIEW: {
      return { ...state, projectActive: action.marker, showPreviewVideo: true, mode: WorldMode.PROJECT_PREVIEW }
    }

    case MODE_GO_AREA_PREVIEW: {
      return {
        ...state,
        mode: WorldMode.AREA_PREVIEW,
        showPreviewVideo: true,
        areaProjects: action.projects,
        projectActive: action.projects[0]
      }
    }

    case MODE_GO_PROJECTS_EXPLORE: {
      return { ...state, showPreviewVideo: false, mode: WorldMode.PROJECTS_EXPLORE }
    }

    case MODE_GO_PROJECT_DETAILED: {
      return { ...state, projectActive: action.marker, showPreviewVideo: true, mode: WorldMode.PROJECT_DETAILED }
    }

    case MODE_GO_BACKGROUND: {
      return { ...state, projectActive: null, showPreviewVideo: false, mode: WorldMode.IN_BACKGROUND }
    }

    case SET_VISIBILITY_MARKERS: {
      return { ...state, markersVisible: action.payload }
    }

    case SET_LIGHTNING: {
      return { ...state, lightning: action.lightning }
    }

    case SET_SKIP_TRANSITION: {
      return { ...state, skipInTransition: action.payload}
    }

    case SHOW_PREVIEW_VIDEO: {
      return { ...state, showPreviewVideo: action.payload }
    }

    case SET_ACTIVE_PROJECT: {
      return { ...state, projectActive: action.project }
    }


    case ADD_MARKER: {
      return { ...state, markers: [...state.markers, action.marker] }
    }

    default:
      return state
  }
}

export default reducer