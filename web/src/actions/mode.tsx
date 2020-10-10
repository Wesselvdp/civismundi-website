import { navigate } from 'gatsby'
import { get } from 'lodash'

import { WorldMode, WorldVersion } from '.'
import {
  SET_SKIP_TRANSITION,
  SHOW_PREVIEW_VIDEO,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_BACKGROUND
} from './types'

import { toggleMarkers } from './marker'
import { setCameraInitialPosition, getMarkerFromPath, moveToMarker, moveMarkerToCenter} from './helpers'

export function setWorldModeFromLocation(location: any = {}) {
  return function action(dispatch: any, getState: any) {
    if (!location.pathname)
      return;

    if (location.pathname === '/')
      return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE, { force: true }))

    if (location.pathname === '/projects' || location.pathnamme === '/about')
      return dispatch(setWorldMode(WorldMode.IN_BACKGROUND))

    if (location.pathname.includes('/projects/')) {
      const marker = getMarkerFromPath(location.pathname, getState().world.markers)

      if (marker) {
        return dispatch(setWorldMode(WorldMode.PROJECT_DETAILED, { marker, skipInTransition: true }))
      }
    }
  }
}

export function setWorldMode(mode: WorldMode, data: any = {}) {
  return function action(dispatch: any, getState: any) {
    switch (mode) {
      case WorldMode.PROJECTS_EXPLORE:
        return dispatch(navigateProjectsExplore(data))

      case WorldMode.PROJECT_PREVIEW:
        return dispatch(navigateProjectPreview(data))

      case WorldMode.PROJECT_DETAILED:
        return dispatch(navigateProjectDetailed(data))

      case WorldMode.IN_BACKGROUND:
        return dispatch(navigateBackground(data))

      default:
        break
    }
  }
}

function navigateProjectsExplore(data: any = {}) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.mode === WorldMode.PROJECTS_EXPLORE && !data.force)
      return

    w.ref.current.controls().enabled = true
    w.ref.current.controls().autoRotate = true

    // dispatch mode change
    dispatch({ type: MODE_GO_PROJECTS_EXPLORE })

    if (data.navigate) navigate('/')

    const duration = setCameraInitialPosition(w)
    setTimeout(() => {
      dispatch(toggleMarkers(true))
    }, Math.max(duration - 250, 0))
  }
}

function navigateBackground(data: any = {}) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.mode === WorldMode.IN_BACKGROUND)
      return

    w.ref.current.controls().enabled = false
    w.ref.current.controls().autoRotate = true

    if (data.navigate)
      navigate(data.navigate)

    // dispatch mode change
    await dispatch({ type: MODE_GO_BACKGROUND })

    const duration = setCameraInitialPosition(w)
    setTimeout(() => {
      dispatch(toggleMarkers(false))
    }, Math.max(duration - 250, 0))
  }
}


function navigateProjectDetailed(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (data.skipInTransition)
      await dispatch({ type: SET_SKIP_TRANSITION, payload: true })

    w.ref.current.controls().enabled = false
    w.ref.current.controls().autoRotate = false

    // dispatch mode change
    await dispatch({ type: MODE_GO_PROJECT_DETAILED, marker: data.marker })

    // change url
    if (data.navigate)
      navigate(`/projects/${get(data, 'marker.node.slug.current')}`)

    const mDuration = dispatch(toggleMarkers(false))
    setTimeout(() => {
      moveToMarker(w, data.marker, !data.skipInTransition ? duration : 0)
    }, Math.max(mDuration - 250, 0))
  }
}

function navigateProjectPreview(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.mode !== WorldMode.PROJECTS_EXPLORE)
      return

    w.ref.current.controls().enabled = true
    w.ref.current.controls().autoRotate = false

    // dispatch mode change
    await dispatch({ type: MODE_GO_PROJECT_PREVIEW, marker: data.marker })
    dispatch(toggleMarkers(true))

    if (w.version === WorldVersion.MOBILE) {
      const mDuration = moveMarkerToCenter(w, data.marker)
      setTimeout(() => {
        dispatch({ type: SHOW_PREVIEW_VIDEO, payload: true })
      }, Math.max(mDuration - 250, 0))
    } else {
      dispatch({ type: SHOW_PREVIEW_VIDEO, payload: true })
    }
  }
}
