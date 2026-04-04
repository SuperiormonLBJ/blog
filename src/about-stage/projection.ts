import {
  CREDIT_FONT,
  CREDIT_LINE_HEIGHT,
} from './constants'
import type {
  DomCache,
  LogoAnimationState,
  PageLayout,
  PositionedLine,
  ProjectedBodyLine,
  TextProjection,
} from './types'

export function syncPool<T extends HTMLElement>(
  stage: HTMLDivElement,
  pool: T[],
  length: number,
  create: () => T,
  parent: HTMLElement = stage,
): void {
  while (pool.length < length) {
    const element = create()
    pool.push(element)
    parent.appendChild(element)
  }
  while (pool.length > length) {
    const element = pool.pop()!
    element.remove()
  }
}

export function projectHeadlineLines(
  stage: HTMLDivElement,
  domCache: DomCache,
  lines: PositionedLine[],
  font: string,
  lineHeight: number,
): void {
  syncPool(
    stage,
    domCache.headlineLines,
    lines.length,
    () => {
      const element = document.createElement('span')
      element.className = 'headline-line'
      return element
    },
    domCache.headline,
  )

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]!
    const element = domCache.headlineLines[index]!
    element.textContent = line.text
    element.style.left = `${line.x}px`
    element.style.top = `${line.y}px`
    element.style.font = font
    element.style.lineHeight = `${lineHeight}px`
  }
}

export function projectChromeLayout(
  stage: HTMLDivElement,
  domCache: DomCache,
  layout: PageLayout,
  contentHeight: number,
  logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState },
): void {
  domCache.page.classList.toggle('page--mobile', layout.isNarrow)
  stage.style.height = `${contentHeight}px`

  domCache.openaiLogo.style.left = `${layout.openaiRect.x}px`
  domCache.openaiLogo.style.top = `${layout.openaiRect.y}px`
  domCache.openaiLogo.style.width = `${layout.openaiRect.width}px`
  domCache.openaiLogo.style.height = `${layout.openaiRect.height}px`
  domCache.openaiLogo.style.transform = `rotate(${logoAnimations.openai.angle}rad)`

  domCache.claudeLogo.style.left = `${layout.claudeRect.x}px`
  domCache.claudeLogo.style.top = `${layout.claudeRect.y}px`
  domCache.claudeLogo.style.width = `${layout.claudeRect.width}px`
  domCache.claudeLogo.style.height = `${layout.claudeRect.height}px`
  domCache.claudeLogo.style.transform = `rotate(${logoAnimations.claude.angle}rad)`
}

function positionedLinesEqual(a: PositionedLine[], b: PositionedLine[]): boolean {
  if (a.length !== b.length) return false
  for (let index = 0; index < a.length; index++) {
    const left = a[index]!
    const right = b[index]!
    if (
      left.x !== right.x ||
      left.y !== right.y ||
      left.width !== right.width ||
      left.text !== right.text
    ) {
      return false
    }
  }
  return true
}

function projectedBodyLinesEqual(a: ProjectedBodyLine[], b: ProjectedBodyLine[]): boolean {
  if (a.length !== b.length) return false
  for (let index = 0; index < a.length; index++) {
    const left = a[index]!
    const right = b[index]!
    if (
      left.className !== right.className ||
      left.x !== right.x ||
      left.y !== right.y ||
      left.width !== right.width ||
      left.text !== right.text
    ) {
      return false
    }
  }
  return true
}

export function textProjectionEqual(a: TextProjection | null, b: TextProjection): boolean {
  return (
    a !== null &&
    a.pageWidth === b.pageWidth &&
    a.pageHeight === b.pageHeight &&
    a.headlineFont === b.headlineFont &&
    a.headlineLineHeight === b.headlineLineHeight &&
    a.creditLeft === b.creditLeft &&
    a.creditTop === b.creditTop &&
    a.bodyFont === b.bodyFont &&
    a.bodyLineHeight === b.bodyLineHeight &&
    positionedLinesEqual(a.headlineLines, b.headlineLines) &&
    projectedBodyLinesEqual(a.bodyLines, b.bodyLines)
  )
}

export function projectTextProjection(
  stage: HTMLDivElement,
  domCache: DomCache,
  projection: TextProjection,
): void {
  domCache.headline.style.left = '0px'
  domCache.headline.style.top = '0px'
  domCache.headline.style.width = `${projection.pageWidth}px`
  domCache.headline.style.height = `${projection.pageHeight}px`
  domCache.headline.style.font = projection.headlineFont
  domCache.headline.style.lineHeight = `${projection.headlineLineHeight}px`
  domCache.headline.style.letterSpacing = '0px'

  projectHeadlineLines(
    stage,
    domCache,
    projection.headlineLines,
    projection.headlineFont,
    projection.headlineLineHeight,
  )

  domCache.credit.style.left = `${projection.creditLeft}px`
  domCache.credit.style.top = `${projection.creditTop}px`
  domCache.credit.style.width = 'auto'
  domCache.credit.style.font = CREDIT_FONT
  domCache.credit.style.lineHeight = `${CREDIT_LINE_HEIGHT}px`

  syncPool(stage, domCache.bodyLines, projection.bodyLines.length, () => {
    const element = document.createElement('span')
    element.className = 'line'
    return element
  })
  for (let index = 0; index < projection.bodyLines.length; index++) {
    const line = projection.bodyLines[index]!
    const element = domCache.bodyLines[index]!
    element.className = line.className
    element.textContent = line.text
    element.style.left = `${line.x}px`
    element.style.top = `${line.y}px`
    element.style.font = projection.bodyFont
    element.style.lineHeight = `${projection.bodyLineHeight}px`
  }
}
