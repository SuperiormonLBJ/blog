import { CLAUDE_LOGO_SRC, CREDIT_TEXT, OPENAI_LOGO_SRC } from './constants'
import type { DomCache } from './types'

export function createHeadline(): HTMLHeadingElement {
  const element = document.createElement('h1')
  element.className = 'headline'
  return element
}

export function createCredit(): HTMLParagraphElement {
  const element = document.createElement('p')
  element.className = 'credit'
  element.textContent = CREDIT_TEXT
  return element
}

export function createLogo(className: string, alt: string, src: string): HTMLImageElement {
  const element = document.createElement('img')
  element.className = className
  element.alt = alt
  element.src = src
  element.draggable = false
  return element
}

export function createDomCache(pageNode: HTMLElement): DomCache {
  return {
    page: pageNode,
    headline: createHeadline(),
    credit: createCredit(),
    openaiLogo: createLogo('logo logo--openai', 'OpenAI symbol', OPENAI_LOGO_SRC),
    claudeLogo: createLogo('logo logo--claude', 'Claude symbol', CLAUDE_LOGO_SRC),
    headlineLines: [],
    bodyLines: [],
  }
}

export function mountStaticNodes(stage: HTMLDivElement, domCache: DomCache): void {
  stage.append(domCache.headline, domCache.credit, domCache.openaiLogo, domCache.claudeLogo)
}
