import { WorldMode, WorldVersion } from '../actions'

import {
  SET_DATA,
  WORLD_INITIALIZE_START,
  WORLD_INITIALIZE_COMPLETE,
  SET_LIGHTNING,
  SET_SKIP_TRANSITION,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_BACKGROUND,
  MODE_GO_AREA_PREVIEW,
  ADD_MARKER,
  SET_MARKER_FOCUSED,
  SET_VISIBILITY_MARKERS,
  SET_READY,
  SET_LAST_ACTIVE,
  SET_VIDEO_URLS,
  SET_ACTIVE,
  SET_FADING,
} from '../actions/types'

const initialState = {
  initialized: false,
  ready: false,
  ref: { current: null },
  mode: WorldMode.PROJECTS_EXPLORE,
  version: WorldVersion.DESKTOP,
  skipInTransition: false,
  projects: [],
  areas: [],
  active: {},
  lastActive: {}, // can be project/area, used to make smooth exit animations for title on home
  markers: [],
  markersVisible: true,
  markerFocused: null,
  cameraChanged: false,
  clouds: null,
  lightning: null,
  videos: [],
  fading: false,
}

// active object
// - type: project/area
// - area: null / area
// - areaProjects: [project] || null
// - project: project

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Data
    case SET_DATA: {
      return {
        ...state,
        projects: action.projects,
        areas: action.areas,
      }
    }

    // Init
    case WORLD_INITIALIZE_START: {
      return { ...state, ref: action.ref, version: action.version }
    }

    case WORLD_INITIALIZE_COMPLETE: {
      return { ...state, initialized: true }
    }

    // Modes
    case MODE_GO_PROJECT_PREVIEW: {
      return {
        ...state,
        mode: WorldMode.PROJECT_PREVIEW,
      }
    }

    case MODE_GO_AREA_PREVIEW: {
      return {
        ...state,
        mode: WorldMode.AREA_PREVIEW,
      }
    }

    case MODE_GO_PROJECTS_EXPLORE: {
      return {
        ...state,
        mode: WorldMode.PROJECTS_EXPLORE,
      }
    }

    case MODE_GO_PROJECT_DETAILED: {
      return {
        ...state,
        mode: WorldMode.PROJECT_DETAILED,
      }
    }

    case MODE_GO_BACKGROUND: {
      return {
        ...state,
        mode: WorldMode.IN_BACKGROUND,
      }
    }

    // Active
    case SET_ACTIVE: {
      return { ...state, active: action.active }
    }

    case SET_LAST_ACTIVE: {
      return { ...state, lastActive: { ...state.active, lastShown: action.lastShown } }
    }

    // Markers
    case ADD_MARKER: {
      return { ...state, markers: [...state.markers, action.marker] }
    }

    case SET_VISIBILITY_MARKERS: {
      return { ...state, markersVisible: action.payload }
    }

    case SET_MARKER_FOCUSED: {
      return { ...state, markerFocused: action.marker }
    }

    case SET_LIGHTNING: {
      return { ...state, lightning: action.lightning }
    }

    case SET_SKIP_TRANSITION: {
      return { ...state, skipInTransition: action.payload }
    }

    case SET_READY: {
      return { ...state, ready: true }
    }

    case SET_VIDEO_URLS: {
      return { ...state, videos: action.urls }
    }

    case SET_FADING: {
      return { ...state, fading: action.fading }
    }

    default:
      return state
  }
}

export default reducer
