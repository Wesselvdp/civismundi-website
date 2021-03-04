import World from '../world'

import { WORLD_INITIALIZE_COMPLETE } from './types'

export function initializeWorld(ref: any) {
  return async function action(dispatch: any, getState: any) {
    if (!ref.current) return false

    const world = new World(ref, dispatch);

    await dispatch({ type: WORLD_INITIALIZE_COMPLETE, world })
    return true
  }
}
