import { prepareWithSegments, walkLineRanges, type PreparedTextWithSegments } from '@chenglou/pretext'

const preparedByKey = new Map<string, PreparedTextWithSegments>()

export function getPrepared(text: string, font: string): PreparedTextWithSegments {
  const key = `${font}::${text}`
  const cached = preparedByKey.get(key)
  if (cached !== undefined) return cached
  const prepared = prepareWithSegments(text, font)
  preparedByKey.set(key, prepared)
  return prepared
}

export function getPreparedSingleLineWidth(prepared: PreparedTextWithSegments): number {
  let width = 0
  walkLineRanges(prepared, 100_000, line => {
    width = line.width
  })
  return width
}

export function headlineBreaksInsideWord(
  prepared: PreparedTextWithSegments,
  maxWidth: number,
): boolean {
  let breaksInsideWord = false
  walkLineRanges(prepared, maxWidth, line => {
    if (line.end.graphemeIndex !== 0) breaksInsideWord = true
  })
  return breaksInsideWord
}
