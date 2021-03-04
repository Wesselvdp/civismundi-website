import { WORLD_INITIALIZE_COMPLETE, SET_PROGRESS, SET_READY, SET_VERSION, SET_MODE } from 'src/actions/types'
import { Mode } from 'src/types/enums'

const initialState = {
  ref: {},
  progress: 0,
  ready: false,
  mode: Mode.LOADING
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case WORLD_INITIALIZE_COMPLETE: {
      return { ...state, ref: action.world }
    }

    case SET_PROGRESS: {
      return { ...state, progress: action.progress }
    }

    case SET_READY: {
      return { ...state, ready: action.ready };
    }

    case SET_VERSION: {
      return { ...state, version: action.version };
    }

    case SET_MODE: {
      return { ...state, mode: action.mode }
    }

    default:
      return state
  }
}

export default reducer
