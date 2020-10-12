import { navigate } from 'gatsby'
import { get } from 'lodash'

import { MarkerType, WorldMode, WorldVersion } from '.'
import {
  SET_SKIP_TRANSITION,
  SHOW_PREVIEW_VIDEO,
  SHOW_PREVIEW_AREA,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_BACKGROUND,
  MODE_GO_AREA_PREVIEW,
  SET_SCREEN_COORDS,
} from './types'

import { toggleMarkers } from './marker'
import {
  getProjectsFromArea,
  setCameraInitialPosition,
  getMarkerFromPath,
  moveToMarker,
  moveMarkerToCenter,
} from './helpers'

let timer: any

const setControlsFromMode = (controls: any, mode: WorldMode) => {
  controls.enabled = [
    WorldMode.PROJECT_PREVIEW,
    WorldMode.AREA_PREVIEW,
    WorldMode.PROJECTS_EXPLORE,
  ].includes(mode)

  controls.autoRotate = [
    WorldMode.PROJECTS_EXPLORE,
    WorldMode.IN_BACKGROUND,
  ].includes(mode)
}

function navigateProjectsExplore(data: any = {}) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.mode === WorldMode.PROJECTS_EXPLORE && !data.force) return

    if (data.navigate) navigate('/')

    let duration = 0
    if (
      w.mode !== WorldMode.PROJECTS_EXPLORE &&
      w.mode !== WorldMode.IN_BACKGROUND
    ) {
      duration = setCameraInitialPosition(w)
    }

    await dispatch({ type: MODE_GO_PROJECTS_EXPLORE })
    setControlsFromMode(w.ref.current.controls(), WorldMode.PROJECTS_EXPLORE)

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(toggleMarkers(true))
    }, Math.max(duration - 250, 0))
  }
}

function navigateBackground(data: any = {}) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.mode === WorldMode.IN_BACKGROUND) return

    setControlsFromMode(w.ref.current.controls(), WorldMode.IN_BACKGROUND)
    await dispatch({ type: MODE_GO_BACKGROUND })

    if (data.navigate) navigate(data.navigate)

    let duration = 0
    if (
      w.mode !== WorldMode.PROJECTS_EXPLORE &&
      w.mode !== WorldMode.IN_BACKGROUND
    ) {
      duration = setCameraInitialPosition(w)
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(toggleMarkers(false))
    }, Math.max(duration - 250, 0))

    await dispatch({ type: MODE_GO_BACKGROUND })
  }
}

function navigateProjectDetailed(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (data.skipInTransition)
      dispatch({ type: SET_SKIP_TRANSITION, payload: true })

    // dispatch mode change
    await dispatch({ type: MODE_GO_PROJECT_DETAILED, marker: data.marker })

    // change url
    if (data.navigate)
      navigate(`/projects/${get(data, 'marker.node.slug.current')}`)

    const mDuration = dispatch(toggleMarkers(false))

    clearTimeout(timer)
    timer = setTimeout(() => {
      setControlsFromMode(w.ref.current.controls(), WorldMode.PROJECT_DETAILED)
      moveToMarker(w, data.marker, !data.skipInTransition ? duration : 0)
    }, Math.max(mDuration - 250, 0))
  }
}

function navigateAreaPreview(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    setControlsFromMode(w.ref.current.controls(), WorldMode.AREA_PREVIEW)
    const projects = getProjectsFromArea(w.projects, data.marker)
    await dispatch({
      type: MODE_GO_AREA_PREVIEW,
      marker: data.marker,
      projects,
    })
    await dispatch(toggleMarkers(true))

    moveMarkerToCenter(w, data.marker, 1500)

    setTimeout(() => {
      const screenPos = w.ref.current.getScreenCoords(
        data.marker.node.location.lat,
        data.marker.node.location.lng,
        data.marker.node._type === MarkerType.PROJECT ? 0.05 : 0.08
      )
      dispatch({ type: SET_SCREEN_COORDS, coords: screenPos })
    }, 1500)
  }
}

function navigateProjectPreview(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    // dispatch mode change
    setControlsFromMode(w.ref.current.controls(), WorldMode.PROJECT_PREVIEW)
    await dispatch({ type: MODE_GO_PROJECT_PREVIEW, marker: data.marker })
    dispatch(toggleMarkers(true))

    if (w.version === WorldVersion.MOBILE) moveMarkerToCenter(w, data.marker)
  }
}

export function setWorldMode(mode: WorldMode, data: any = {}) {
  return function action(dispatch: any, getState: any) {
    if (mode != WorldMode.AREA_PREVIEW)
      dispatch({ type: SET_SCREEN_COORDS, coords: null })

    switch (mode) {
      case WorldMode.PROJECTS_EXPLORE:
        return dispatch(navigateProjectsExplore(data))

      case WorldMode.PROJECT_PREVIEW:
        return dispatch(navigateProjectPreview(data))

      case WorldMode.AREA_PREVIEW:
        return dispatch(navigateAreaPreview(data))

      case WorldMode.PROJECT_DETAILED:
        return dispatch(navigateProjectDetailed(data))

      case WorldMode.IN_BACKGROUND:
        return dispatch(navigateBackground(data))

      default:
        break
    }
  }
}

export function setWorldModeFromLocation(location: any = {}, data: any = {}) {
  return function action(dispatch: any, getState: any) {
    if (!location.pathname) return

    if (location.pathname === '/')
      return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE, { force: true }))

    if (location.pathname === '/projects' || location.pathname === '/about')
      return dispatch(setWorldMode(WorldMode.IN_BACKGROUND))

    if (location.pathname.includes('/projects/')) {
      const marker = getMarkerFromPath(
        location.pathname,
        getState().world.projects
      )

      if (marker) {
        return dispatch(
          setWorldMode(WorldMode.PROJECT_DETAILED, {
            marker,
            skipInTransition:
              typeof data.skipTransition !== 'undefined'
                ? data.skipTransition
                : true,
          })
        )
      }
    }
  }
}
