import { navigate } from 'gatsby'
import { get } from 'lodash'

import { WorldMode, WorldVersion } from '.'
import {
  SET_SKIP_TRANSITION,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_BACKGROUND,
  WORLD_TOGGLE_SLIDER,
  SET_LAST_ACTIVE,
  SET_VIDEO_URLS,
  SET_ACTIVE,
  SET_FADING_PAGE,
  SET_FADING_VIDEO,
  SET_SLIDER_SCROLL,
  SET_ACTIVE_PROJECT_INDEX,
} from './types'

import { toggleFocusedMarker, toggleMarkers } from './marker'
import {
  setCameraInitialPosition,
  moveToMarker,
  moveMarkerToCenter,
  getProjectFromSlug,
} from './helpers'
// import console = require('console');

let timer: any

const setControlsFromMode = (controls: any, mode: WorldMode) => {
  controls.enabled = [
    WorldMode.PROJECT_PREVIEW,
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

    navigate('/')

    let duration = 0
    if (
      w.mode !== WorldMode.PROJECTS_EXPLORE &&
      w.mode !== WorldMode.IN_BACKGROUND
    ) {
      duration = setCameraInitialPosition(w)
    }

    await dispatch({ type: MODE_GO_PROJECTS_EXPLORE })
    dispatch({ type: SET_ACTIVE, active: {} })
    dispatch(toggleFocusedMarker(null))
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
    dispatch({ type: SET_ACTIVE, active: {} })
  }
}

const mod = (n, m) => ((n % m) + m) % m

function setActiveObjectFromProject(project: any, options: any = {}) {
  return function action(dispatch: any, getState: any) {
    if (!project) return

    const w = getState().world

    const active: any = { project, ...options }
    active.projectIndex = w.projects.findIndex(
      (proj: any) => proj.node._id === project.node._id
    )
    active.nextIndex = mod(active.projectIndex + 1, w.projects.length)
    active.prevIndex = mod(active.projectIndex - 1, w.projects.length)

    return dispatch({ type: SET_ACTIVE, active })
  }
}

function navigateProjectDetailed(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (!data.project) return

    if (data.skipInTransition)
      dispatch({ type: SET_SKIP_TRANSITION, payload: true })

    const state = data.state || {}
    console.log('state', state);
    if (!state.doAnimation) {
      const type = state.fadeVideo ? SET_FADING_VIDEO : SET_FADING_PAGE
      dispatch({ type, fading: true })
    }

    if (!state.keepSliderScroll)
      dispatch({ type: SET_SLIDER_SCROLL, scroll: 0 })

    setTimeout(
      async () => {
        navigate(`/projects/${get(data, 'project.node.slug.current')}`, {
          state,
        })

        // set active
        await dispatch(setActiveObjectFromProject(data.project, { fromCarousel: data.fromCarousel }))

        // dispatch mode change
        await dispatch({ type: MODE_GO_PROJECT_DETAILED })

        await dispatch({ type: SET_LAST_ACTIVE })

        if (!state.doAnimation) {
          state.fadeVideo && dispatch({ type: SET_FADING_VIDEO, fading: false })
        }

        // toggle markers
        const mDuration = dispatch(toggleMarkers(false))

        clearTimeout(timer)
        timer = setTimeout(() => {
          setControlsFromMode(
            w.ref.current.controls(),
            WorldMode.PROJECT_DETAILED
          )
          moveToMarker(getState().world, !data.skipInTransition ? duration : 0)
        }, Math.max(mDuration - 250, 0))
      },
      state.doAnimation ? 0 : 500
    )
  }
}

function navigateProjectPreview(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    if (!data.project) {
      console.log('PROJECT SHOULD BE SUPPLIED')
      return
    }

    let w = getState().world

    // dispatch mode change
    setControlsFromMode(w.ref.current.controls(), WorldMode.PROJECT_PREVIEW)

    // set active object
    await dispatch(setActiveObjectFromProject(data.project, { fromCarousel: data.fromCarousel }))
    w = getState().world

    // go to mode
    await dispatch({ type: MODE_GO_PROJECT_PREVIEW })

    dispatch({ type: SET_LAST_ACTIVE })

    if (data.fromCarousel) {
      const hovered = w.markers.find((marker: any) => marker.node._id === data.project.node._id)
      dispatch(toggleFocusedMarker(hovered))
    }
    // if on mobile, center marker
    if (w.version === WorldVersion.MOBILE || data.fromCarousel) moveMarkerToCenter(w)
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

export function setWorldModeFromLocation(location: any = {}, data: any = {}) {
  return function action(dispatch: any, getState: any) {
    if (!location.pathname) return

    if (location.pathname === '/')
      return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE, { force: true }))

    if (
      location.pathname === '/projects' ||
      location.pathname === '/projects/' ||
      location.pathname.includes('/about')
    )
      return dispatch(setWorldMode(WorldMode.IN_BACKGROUND))

    if (location.pathname.includes('/projects/')) {
      const slug = get(location.pathname.split('/'), '[2]')
      const project = getProjectFromSlug(slug, getState().world.projects)

      return dispatch(
        setWorldMode(WorldMode.PROJECT_DETAILED, {
          project,
          skipInTransition:
            typeof data.skipTransition !== 'undefined'
              ? data.skipTransition
              : true,
        })
      )
    }
  }
}

export const toggleSlider = ({ type: WORLD_TOGGLE_SLIDER })
