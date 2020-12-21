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
  SET_PROGRESS,
  ADD_MARKER,
  SET_MARKER_FOCUSED,
  SET_VISIBILITY_MARKERS,
  SET_READY,
  SET_LAST_ACTIVE,
  SET_VIDEO_URLS,
  SET_ACTIVE,
  SET_FADING_PAGE,
  SET_FADING_VIDEO,
  SET_SLIDER_SCROLL,
  SET_HOVERED,
  SET_ACTIVE_PROJECT_INDEX,
  WORLD_SET_VERSION,
  WORLD_SET_READY,
  WORLD_SET_LOADING,
  WORLD_SET_RESIZE,
  WORLD_TOGGLE_SLIDER,
} from '../actions/types'

const initialState = {
  initialized: false, // initializing of store
  loading: true, // loading of threejs scene
  ready: false, // if both loaded & initialized
  ref: { current: null },
  mode: WorldMode.PROJECTS_EXPLORE,
  version: WorldVersion.DESKTOP,
  skipInTransition: false,
  projects: [],
  areas: [],
  active: {},
  hovered: null,
  lastActive: {}, // can be project/area, used to make smooth exit animations for title on home
  markers: [],
  markersVisible: true,
  markerFocused: null,
  cameraChanged: false,
  clouds: null,
  lightning: null,
  videos: [],
  fadingPage: false,
  fadingVideo: false,
  sliderScroll: 0,
  resize: false,
  showSlider: false,
  progress: 0,
}

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

    case SET_PROGRESS: {
      return { ...state, progress: action.progress }
    }

    case WORLD_TOGGLE_SLIDER: {
      return { ...state, showSlider: !state.showSlider }
    }
    case WORLD_SET_READY: {
      return { ...state, ready: action.ready }
    }

    case WORLD_SET_LOADING: {
      return { ...state, loading: action.loading }
    }

    case WORLD_SET_RESIZE: {
      return { ...state, resize: action.resize }
    }

    // Init
    case WORLD_INITIALIZE_START: {
      return { ...state, ref: action.ref, version: action.version }
    }

    case WORLD_INITIALIZE_COMPLETE: {
      return { ...state, initialized: true }
    }

    case SET_HOVERED: {
      return { ...state, hovered: action.hovered }
    }

    case WORLD_SET_VERSION: {
      return { ...state, version: action.version }
    }

    // Modes
    case MODE_GO_PROJECT_PREVIEW: {
      return {
        ...state,
        mode: WorldMode.PROJECT_PREVIEW,
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

    case SET_ACTIVE_PROJECT_INDEX: {
      return {
        ...state,
        active: { ...state.active, projectIndex: action.index || 0 },
      }
    }
    // Active
    case SET_ACTIVE: {
      return { ...state, active: action.active }
    }

    case SET_LAST_ACTIVE: {
      return {
        ...state,
        lastActive: { ...state.active  },
      }
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

    case SET_FADING_PAGE: {
      return { ...state, fadingPage: action.fading }
    }

    case SET_FADING_VIDEO: {
      return { ...state, fadingVideo: action.fading }
    }

    case SET_SLIDER_SCROLL: {
      return { ...state, sliderScroll: action.scroll }
    }

    default:
      return state
  }
}

export default reducer
