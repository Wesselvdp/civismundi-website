import { navigate } from 'gatsby'
import { get } from 'lodash'

import { MarkerType, WorldMode, WorldVersion } from '.'
import {
  SET_SKIP_TRANSITION,
  MODE_GO_PROJECT_PREVIEW,
  MODE_GO_PROJECT_DETAILED,
  MODE_GO_PROJECTS_EXPLORE,
  MODE_GO_BACKGROUND,
  MODE_GO_AREA_PREVIEW,
  SET_LAST_ACTIVE,
  SET_VIDEO_URLS,
  SET_ACTIVE,
  SET_FADING_PAGE,
  SET_FADING_VIDEO,
  SET_SLIDER_SCROLL,
  SET_ACTIVE_PROJECT_INDEX,
} from './types'

import { toggleMarkers } from './marker'
import {
  setCameraInitialPosition,
  moveToMarker,
  moveMarkerToCenter,
  getProjectFromSlug,
  getProjectsFromArea,
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

    navigate('/')

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

export function incrementActiveProjectIndex() {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world
    const { active } = w

    if (!active.areaProjects) return

    const newIndex =
      ((active.projectIndex || 0) + 1) % active.areaProjects.length

    await dispatch({ type: SET_ACTIVE_PROJECT_INDEX, index: newIndex })

    setTimeout(
      () => dispatch({ type: SET_LAST_ACTIVE, lastShown: MarkerType.AREA }),
      500
    )
  }
}

function setActiveObjectFromProject(project: any) {
  return function action(dispatch: any, getState: any) {
    if (!project) return
    if (project.node._type === 'location') {
      return dispatch(setActiveObjectFromArea(project))
    }

    const w = getState().world

    const active: any = { project }

    if (project.node.locationGroup) {
      // Set area, areaProjects
      active.area = w.areas.find(
        (area: any) => area.node._id === project.node.locationGroup._id
      )
      active.areaProjects = w.projects.filter(
        (proj: any) =>
          proj.node.locationGroup &&
          proj.node.locationGroup._id === active.area.node._id
      )
      active.projectIndex = active.areaProjects.findIndex(
        (proj: any) => proj.node._id === project.node._id
      )
    }

    return dispatch({ type: SET_ACTIVE, active })
  }
}

function setActiveObjectFromArea(area: any) {
  return function action(dispatch: any, getState: any) {
    if (!area) return

    const w = getState().world

    const active: any = { area }
    active.areaProjects = w.projects.filter(
      (proj: any) =>
        proj.node.locationGroup &&
        proj.node.locationGroup._id === active.area.node._id
    )
    active.projectIndex = 0

    return dispatch({ type: SET_ACTIVE, active })
  }
}

function navigateProjectDetailed(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (!data.project && !data.area) return

    if (!data.project) {
      data.project = get(
        w.active,
        `areaProjects[${get(w.active, 'projectIndex', 0)}]`
      )

      if (!data.project)
        data.project = get(getProjectsFromArea(w.projects, data.area), '[0]')
      if (!data.project) return
    }

    if (data.skipInTransition)
      dispatch({ type: SET_SKIP_TRANSITION, payload: true })

    const state = data.state || {}
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
        await dispatch(setActiveObjectFromProject(data.project))

        // dispatch mode change
        await dispatch({ type: MODE_GO_PROJECT_DETAILED })

        await dispatch({
          type: SET_LAST_ACTIVE,
          lastShown:
            getState().world.lastActive.lastShown || MarkerType.PROJECT,
        })

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

function navigateAreaPreview(data: any = {}, duration = 1500) {
  return async function action(dispatch: any, getState: any) {
    if (!data.area) {
      console.log('AREA SHOULD BE PASSED')
      return
    }

    let w = getState().world
    setControlsFromMode(w.ref.current.controls(), WorldMode.AREA_PREVIEW)

    // set active object
    await dispatch(setActiveObjectFromArea(data.area))
    w = getState().world

    // update videos
    const videoUrls = w.active.areaProjects.map((p: any) =>
      get(p, 'node.video.asset.url')
    )
    videoUrls.length &&
      (await dispatch({ type: SET_VIDEO_URLS, urls: videoUrls }))

    // update mode
    await dispatch({ type: MODE_GO_AREA_PREVIEW })

    dispatch({ type: SET_LAST_ACTIVE, lastShown: MarkerType.AREA })

    // toggle markers
    // dispatch(toggleMarkers(true))

    // on mobile, center marker
    if (w.version === WorldVersion.MOBILE) moveMarkerToCenter(w)
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
    await dispatch(setActiveObjectFromProject(data.project))
    w = getState().world

    // update video
    const videoUrl = get(data, 'project.node.video.asset.url')
    videoUrl && (await dispatch({ type: SET_VIDEO_URLS, urls: [videoUrl] }))

    // go to mode
    await dispatch({ type: MODE_GO_PROJECT_PREVIEW })

    dispatch({ type: SET_LAST_ACTIVE, lastShown: MarkerType.PROJECT })

    // toggle markers on
    // dispatch(toggleMarkers(true))

    // if on mobile, center marker
    if (w.version === WorldVersion.MOBILE) moveMarkerToCenter(w)
  }
}

export function setWorldMode(mode: WorldMode, data: any = {}) {
  return function action(dispatch: any, getState: any) {
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
