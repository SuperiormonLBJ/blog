import { getWrapHull } from '@/app/wrap-geometry'
import { BODY_COPY, BODY_FONT, CLAUDE_LOGO_SRC, CREDIT_TEXT, CREDIT_FONT, OPENAI_LOGO_SRC } from './constants'
import { createDomCache, mountStaticNodes } from './dom'
import { getPrepared, getPreparedSingleLineWidth } from './prepared-text'
import {
  commitFrame,
  hasActiveTextSelection,
  scheduleRender,
  type AboutStageRuntimeDeps,
  type AboutStageRuntimeState,
} from './runtime'
import type { LogoAnimationState, WrapHulls } from './types'

const stageNode = document.getElementById('stage')
if (!(stageNode instanceof HTMLDivElement)) throw new Error('#stage not found')
const stage = stageNode

const pageNode = document.querySelector('.page')
if (!(pageNode instanceof HTMLElement)) throw new Error('.page not found')

const domCache = createDomCache(pageNode)

const logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState } = {
  openai: { angle: 0, spin: null },
  claude: { angle: 0, spin: null },
}

const runtimeState: AboutStageRuntimeState = {
  events: { mousemove: null, click: null, blur: false },
  pointer: { x: -Infinity, y: -Infinity },
  currentLogoHits: { openai: [], claude: [] },
  hoveredLogo: null,
  committedTextProjection: null,
  scheduled: { value: false },
}

const [, openaiLayout, claudeLayout, openaiHit, claudeHit] = await Promise.all([
  document.fonts.ready,
  getWrapHull(OPENAI_LOGO_SRC, { smoothRadius: 6, mode: 'mean' }),
  getWrapHull(CLAUDE_LOGO_SRC, { smoothRadius: 6, mode: 'mean' }),
  getWrapHull(OPENAI_LOGO_SRC, { smoothRadius: 3, mode: 'mean' }),
  getWrapHull(CLAUDE_LOGO_SRC, { smoothRadius: 5, mode: 'mean' }),
])

const wrapHulls: WrapHulls = { openaiLayout, claudeLayout, openaiHit, claudeHit }
const preparedBody = getPrepared(BODY_COPY, BODY_FONT)
const preparedCredit = getPrepared(CREDIT_TEXT, CREDIT_FONT)
const creditWidth = Math.ceil(getPreparedSingleLineWidth(preparedCredit))

const runtimeDeps: AboutStageRuntimeDeps = {
  stage,
  domCache,
  wrapHulls,
  preparedBody,
  creditWidth,
  logoAnimations,
  state: runtimeState,
}

function schedule(): void {
  scheduleRender(runtimeDeps)
}

mountStaticNodes(stage, domCache)
commitFrame(runtimeDeps, performance.now())

window.addEventListener('resize', schedule)
pageNode.addEventListener(
  'touchmove',
  event => {
    if (hasActiveTextSelection()) return
    event.preventDefault()
  },
  { passive: false },
)
document.addEventListener('mousemove', event => {
  runtimeState.events.mousemove = event
  schedule()
})
window.addEventListener('blur', () => {
  runtimeState.events.blur = true
  schedule()
})
document.addEventListener('click', event => {
  runtimeState.events.click = event
  schedule()
})
