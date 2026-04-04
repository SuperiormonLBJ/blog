import type { PreparedTextWithSegments } from '@chenglou/pretext'
import { isPointInPolygon } from '@/app/wrap-geometry'
import { BODY_FONT, BODY_LINE_HEIGHT } from './constants'
import { buildLayout, evaluateLayout } from './layout-engine'
import { startLogoSpin, updateSpinState } from './logo-animation'
import {
  projectChromeLayout,
  projectTextProjection,
  textProjectionEqual,
} from './projection'
import type {
  DomCache,
  LogoAnimationState,
  LogoHits,
  LogoKind,
  TextProjection,
  WrapHulls,
} from './types'

export function getTypography(): { font: string; lineHeight: number } {
  return { font: BODY_FONT, lineHeight: BODY_LINE_HEIGHT }
}

export type PointerState = { x: number; y: number }

export type EventBucket = {
  mousemove: MouseEvent | null
  click: MouseEvent | null
  blur: boolean
}

export type AboutStageRuntimeState = {
  events: EventBucket
  pointer: PointerState
  currentLogoHits: LogoHits
  hoveredLogo: LogoKind | null
  committedTextProjection: TextProjection | null
  scheduled: { value: boolean }
}

export type AboutStageRuntimeDeps = {
  stage: HTMLDivElement
  domCache: DomCache
  wrapHulls: WrapHulls
  preparedBody: PreparedTextWithSegments
  creditWidth: number
  logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState }
  state: AboutStageRuntimeState
}

export function commitFrame(deps: AboutStageRuntimeDeps, now: number): boolean {
  const { stage, domCache, wrapHulls, preparedBody, creditWidth, logoAnimations, state } = deps
  const { font, lineHeight } = getTypography()
  const pageWidth = stage.clientWidth || stage.offsetWidth || 800
  const pageHeight = Math.max(stage.clientHeight || 0, stage.offsetHeight || 0, 480)
  const animating = updateSpinState(logoAnimations, now)
  const layout = buildLayout(pageWidth, pageHeight, lineHeight)
  const { headlineLines, creditLeft, creditTop, leftLines, rightLines, contentHeight, hits } =
    evaluateLayout(layout, lineHeight, preparedBody, wrapHulls, logoAnimations, creditWidth)

  state.currentLogoHits = hits

  projectChromeLayout(stage, domCache, layout, contentHeight, logoAnimations)

  const bodyLines = [
    ...leftLines.map(line => ({ ...line, className: 'line line--left' })),
    ...rightLines.map(line => ({ ...line, className: 'line line--right' })),
  ]
  const textProjection: TextProjection = {
    pageWidth: layout.pageWidth,
    pageHeight: layout.pageHeight,
    headlineFont: layout.headlineFont,
    headlineLineHeight: layout.headlineLineHeight,
    headlineLines,
    creditLeft,
    creditTop,
    bodyFont: font,
    bodyLineHeight: lineHeight,
    bodyLines,
  }

  if (!textProjectionEqual(state.committedTextProjection, textProjection)) {
    projectTextProjection(stage, domCache, textProjection)
    state.committedTextProjection = textProjection
  }

  stage.style.cursor = state.hoveredLogo === null ? '' : 'pointer'

  return animating
}

export function render(deps: AboutStageRuntimeDeps, now: number): boolean {
  const { stage, state } = deps
  const stageBounds = stage.getBoundingClientRect()
  if (state.events.click !== null) {
    state.pointer.x = state.events.click.clientX - stageBounds.left
    state.pointer.y = state.events.click.clientY - stageBounds.top
  }
  if (state.events.mousemove !== null) {
    state.pointer.x = state.events.mousemove.clientX - stageBounds.left
    state.pointer.y = state.events.mousemove.clientY - stageBounds.top
  }

  const nextHovered = state.events.blur
    ? null
    : isPointInPolygon(state.currentLogoHits.openai, state.pointer.x, state.pointer.y)
      ? 'openai'
      : isPointInPolygon(state.currentLogoHits.claude, state.pointer.x, state.pointer.y)
        ? 'claude'
        : null
  state.hoveredLogo = nextHovered

  if (state.events.click !== null) {
    if (isPointInPolygon(state.currentLogoHits.openai, state.pointer.x, state.pointer.y)) {
      startLogoSpin(deps.logoAnimations, 'openai', -1, now)
    } else if (isPointInPolygon(state.currentLogoHits.claude, state.pointer.x, state.pointer.y)) {
      startLogoSpin(deps.logoAnimations, 'claude', 1, now)
    }
  }

  state.events.mousemove = null
  state.events.click = null
  state.events.blur = false

  return commitFrame(deps, now)
}

export function scheduleRender(
  deps: AboutStageRuntimeDeps,
): void {
  const { state } = deps
  if (state.scheduled.value) return
  state.scheduled.value = true
  requestAnimationFrame(function renderAndMaybeScheduleAnotherRender(now) {
    state.scheduled.value = false
    if (render(deps, now)) scheduleRender(deps)
  })
}

export function hasActiveTextSelection(): boolean {
  const selection = window.getSelection()
  return selection !== null && !selection.isCollapsed && selection.rangeCount > 0
}
