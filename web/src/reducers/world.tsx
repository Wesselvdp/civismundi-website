import { WORLD_INITIALIZE_COMPLETE, SET_PROGRESS, SET_READY, SET_VERSION } from '../actions/types'

const initialState = {
  world: {},
  progress: 0,
  ready: false
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case WORLD_INITIALIZE_COMPLETE: {
      return { ...state, world: action.world }
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

    default:
      return state
  }
}

export default reducer
