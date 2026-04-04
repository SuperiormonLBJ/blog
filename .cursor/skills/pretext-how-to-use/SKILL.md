---
name: pretext-how-to-use
description: Explain and provide code examples for using @chenglou/pretext (prepare/layout, prepareWithSegments/layoutWithLines, layoutNextLine, walkLineRanges, setLocale, pre-wrap mode, and height/line rendering patterns). Use when the user asks how to use pretext for multiline measurement, dynamic line layout, streaming layouts, obstacle routing, or font fitting.
---

# Pretext How-To (Guide-Based)

## Mental model (always start here)
Pretext has two phases:

1. `prepare(text, font)` or `prepareWithSegments(text, font)` once (expensive work).
2. `layout(prepared, width, lh)` / `layoutWithLines(prepared, width, lh)` / `layoutNextLine(prepared, cursor, width)` many times (cheap hot path).

The key performance rule: **prepare once, reuse the prepared handle on resize**.

## Agent instructions
When the user asks about using pretext, do the following:

1. Identify the user’s goal:
   - Height prediction (how tall will this block be?) -> `prepare` + `layout`
   - Render explicit lines (manual DOM spans/canvas/SVG/WebGL) -> `prepareWithSegments` + `layoutWithLines`
   - Dynamic/streaming line routing where width varies per row -> `layoutNextLine` with a `LayoutCursor`
   - Font sizing that doesn’t break mid-word -> `measureNaturalWidth` + binary-search pattern
   - Geometry only (no string materialization) -> `walkLineRanges`
   - Editor-style text preserving spaces/newlines -> `prepareWithSegments(..., { whiteSpace: 'pre-wrap' })`
2. Provide a minimal code snippet for the matching API(s), using imports from `@chenglou/pretext`.
3. Call out the “what to cache” rule (prepared handle keyed by `text+font`).
4. If relevant, show how to wire it into UI with `ResizeObserver`.
5. If the user mentions changing languages/fonts, mention `setLocale()` and that it clears caches.

## Reference (full guide)
For the complete API examples and quick reference table, see:
- [`references/pretext-api-guide.md`](references/pretext-api-guide.md)

