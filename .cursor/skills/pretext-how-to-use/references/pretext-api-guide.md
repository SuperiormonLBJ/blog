Using @chenglou/pretext — API Reference

Install

npm install @chenglou/pretext

The mental model

Two phases, called at different times:

prepare(text, font)          ← once, when text first appears
    ↓
PreparedText handle          ← store this

layout(prepared, width, lh)  ← on every resize (~0.0002ms)
    ↓
{ lineCount, height }

prepare does all the expensive work (canvas measurement, segmentation). layout is pure arithmetic on the cached
result.

---
1. Height prediction — prepare + layout

The simplest use case: how tall is this text block?

import { prepare, layout } from '@chenglou/pretext'

const font = '16px Inter, sans-serif'
const lineHeight = 24

// Once — when text first appears
const prepared = prepare('Hello world, this is some body copy.', font)

// On every resize
function getHeight(containerWidth: number): number {
  return layout(prepared, containerWidth, lineHeight).height
}

// e.g. in a ResizeObserver
new ResizeObserver(entries => {
  for (const entry of entries) {
    const height = getHeight(entry.contentRect.width)
    entry.target.style.height = `${height}px`
  }
}).observe(container)

layout() returns { lineCount: number, height: number }. Use it for virtualized lists, tooltip sizing, or any "how
tall will this be?" question without touching the DOM.

---
2. Rendered lines — prepareWithSegments + layoutWithLines

When you need to render lines yourself (absolutely-positioned spans, canvas, WebGL):

import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const font = '20px "Iowan Old Style", serif'
const lineHeight = 32

const prepared = prepareWithSegments('Your body copy text here...', font)

function renderLines(container: HTMLElement, maxWidth: number): void {
  const { lines } = layoutWithLines(prepared, maxWidth, lineHeight)

  // lines is LayoutLine[] — each has: text, width, start, end
  container.innerHTML = ''

  for (const line of lines) {
    const span = document.createElement('span')
    span.textContent = line.text
    span.style.cssText = `
      position: absolute;
      white-space: pre;
      left: 0;
      top: ${lines.indexOf(line) * lineHeight}px;
    `
    container.appendChild(span)
  }
}

layoutWithLines returns:
{
  lineCount: number
  height: number
  lines: Array<{
    text: string         // the visible text of this line
    width: number        // measured pixel width
    start: LayoutCursor  // { segmentIndex, graphemeIndex }
    end: LayoutCursor    // exclusive end cursor
  }>
}

Use prepareWithSegments instead of prepare any time you call layoutWithLines, layoutNextLine, or walkLineRanges.
The opaque prepare only works with layout.

---
3. Streaming line-by-line — layoutNextLine

The key API for variable-width columns and obstacle routing (what the dynamic-layout demo uses).
Instead of computing all lines at a fixed width, you ask for the next line at whatever width is available at that row.

import { prepareWithSegments, layoutNextLine, type LayoutCursor } from '@chenglou/pretext'

const prepared = prepareWithSegments(bodyText, font)

// Start at the beginning of the text
let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

// Ask for lines one at a time, each at a potentially different width
while (true) {
  const availableWidth = getWidthAtCurrentRow()  // your logic

  const line = layoutNextLine(prepared, cursor, availableWidth)
  if (line === null) break  // text exhausted

  // line.text   — the visible string for this line
  // line.width  — how wide it actually rendered
  // line.end    — cursor to pass on the next call

  placeLineInDOM(line.text, line.width, currentY)

  cursor = line.end   // ← advance the cursor
  currentY += lineHeight
}

This is how the dynamic-layout demo fills two columns that route around logo shapes:
it calls layoutNextLine in a loop, computing the available slot width from obstacle geometry before each call.

Important: cursor is a plain object { segmentIndex, graphemeIndex }. It's safe to store and resume from — you can
pause the loop, hand the cursor to a second column, etc.

---
4. Natural width (for headline font fitting) — measureNaturalWidth

The dynamic-layout demo uses this to binary-search the largest font size that doesn't break inside a word:

import { prepareWithSegments, walkLineRanges, measureNaturalWidth } from '@chenglou/pretext'

// How wide is this text with no wrapping? (only hard breaks count)
const prepared = prepareWithSegments(headlineText, `700 ${fontSize}px serif`)
const naturalWidth = measureNaturalWidth(prepared)

// Binary search for the largest font that fits the column
function fitFontSize(text: string, maxWidth: number, fontFamily: string): number {
  let lo = 22, hi = 94, best = lo
  while (lo <= hi) {
    const size = Math.floor((lo + hi) / 2)
    const p = prepareWithSegments(text, `700 ${size}px ${fontFamily}`)

    // Check if any line break happens mid-word
    let breaksMidWord = false
    walkLineRanges(p, maxWidth, line => {
      if (line.end.graphemeIndex !== 0) breaksMidWord = true
    })

    if (!breaksMidWord) { best = size; lo = size + 1 }
    else hi = size - 1
  }
  return best
}

---
5. Batch geometry without strings — walkLineRanges

When you only need line widths or cursor positions (e.g. shrinkwrap, bounding box), skip string materialization:

import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, font)

let maxLineWidth = 0
let lineCount = 0

walkLineRanges(prepared, containerWidth, line => {
  // line.width, line.start, line.end — no .text property
  if (line.width > maxLineWidth) maxLineWidth = line.width
  lineCount++
})

// Shrinkwrap: content is exactly as wide as its longest line
container.style.width = `${maxLineWidth}px`

---
6. pre-wrap mode — for editors and code inputs

Pass { whiteSpace: 'pre-wrap' } to preserve spaces, tabs, and \n hard breaks:

import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments(
  'line one\n\ttabbed line\nline three',
  '14px monospace',
  { whiteSpace: 'pre-wrap' },  // ← second arg to prepare
)

const { lines } = layoutWithLines(prepared, 400, 20)

// lines[0].text === 'line one'
// lines[1].text === '\ttabbed line'
// lines[2].text === 'line three'

Tabs use browser-default 8-space tab stops. This mode is for editor/input text, not full CSS pre-wrap surface.

---
7. setLocale — switch language for word segmentation

By default, Intl.Segmenter uses the runtime locale. Override it explicitly when you know the text language:

import { setLocale, prepare, layout } from '@chenglou/pretext'

setLocale('ja')  // Japanese — affects word boundary detection
const prepared = prepare(japaneseText, font)

setLocale()      // reset to runtime default

setLocale clears all caches, so call it before preparing new text, not mid-render.

---
Putting it together — wiring the dynamic-layout pattern

import { prepareWithSegments, layoutNextLine, type LayoutCursor, type PreparedTextWithSegments } from
'@chenglou/pretext'

// ① Prepare once (cache by text+font key yourself)
const cache = new Map<string, PreparedTextWithSegments>()
function getPrepared(text: string, font: string): PreparedTextWithSegments {
  const key = `${font}::${text}`
  if (!cache.has(key)) cache.set(key, prepareWithSegments(text, font))
  return cache.get(key)!
}

// ② Build a NextLineFn for one continuous text stream
function makeNextLineFn(prepared: PreparedTextWithSegments) {
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

  return {
    nextLine: (maxWidth: number) => {
      const line = layoutNextLine(prepared, cursor, maxWidth)
      if (line === null) return null
      cursor = line.end
      return { text: line.text, width: line.width }
    },
    getCursor: () => cursor,
    setCursor: (c: LayoutCursor) => { cursor = c },
  }
}

// ③ On every resize / reflow:
const prepared = getPrepared(bodyText, '20px serif')
const stream = makeNextLineFn(prepared)

// Left column — fills from top, routes around logo
const leftLines = fillColumn(stream.nextLine, leftRegion, lineHeight, leftObstacles)

// Right column — continues the same text stream from where left left off
const rightLines = fillColumn(stream.nextLine, rightRegion, lineHeight, rightObstacles)

fillColumn is exactly what layoutObstacleColumn in the skill folder does:
it loops nextLine(slotWidth) while advancing down the column.

---
Quick reference

Function | When to use | Returns
prepare(text, font) | Fast path, height only | PreparedText (opaque)
prepareWithSegments(text, font) | Any rich/rendering API | PreparedTextWithSegments
layout(p, width, lh) | Resize hot path | { lineCount, height }
layoutWithLines(p, width, lh) | Fixed-width rendered lines | { lineCount, height, lines[] }
layoutNextLine(p, cursor, width) | Streaming / obstacle routing | LayoutLine | null
walkLineRanges(p, width, cb) | Geometry without strings | calls cb per line
measureNaturalWidth(p) | Font size fitting | number
setLocale(locale?) | Change language | void (clears cache)
clearCache() | Font change / memory pressure | void

