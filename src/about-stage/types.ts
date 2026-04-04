import type { Point, Rect } from '@/app/wrap-geometry'

export type LogoKind = 'openai' | 'claude'

export type SpinState = {
  from: number
  to: number
  start: number
  duration: number
}

export type LogoAnimationState = {
  angle: number
  spin: SpinState | null
}

export type PositionedLine = {
  x: number
  y: number
  width: number
  text: string
}

export type ProjectedBodyLine = PositionedLine & {
  className: string
}

export type TextProjection = {
  pageWidth: number
  pageHeight: number
  headlineFont: string
  headlineLineHeight: number
  headlineLines: PositionedLine[]
  creditLeft: number
  creditTop: number
  bodyFont: string
  bodyLineHeight: number
  bodyLines: ProjectedBodyLine[]
}

export type BandObstacle =
  | {
      kind: 'polygon'
      points: Point[]
      horizontalPadding: number
      verticalPadding: number
    }
  | {
      kind: 'rects'
      rects: Rect[]
      horizontalPadding: number
      verticalPadding: number
    }

export type PageLayout = {
  isNarrow: boolean
  gutter: number
  pageWidth: number
  pageHeight: number
  centerGap: number
  columnWidth: number
  headlineRegion: Rect
  headlineFont: string
  headlineLineHeight: number
  creditGap: number
  copyGap: number
  openaiRect: Rect
  claudeRect: Rect
}

export type LogoHits = { openai: Point[]; claude: Point[] }

export type WrapHulls = {
  openaiLayout: Point[]
  claudeLayout: Point[]
  openaiHit: Point[]
  claudeHit: Point[]
}

export type DomCache = {
  page: HTMLElement
  headline: HTMLHeadingElement
  credit: HTMLParagraphElement
  openaiLogo: HTMLImageElement
  claudeLogo: HTMLImageElement
  headlineLines: HTMLSpanElement[]
  bodyLines: HTMLSpanElement[]
}
