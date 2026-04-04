import type { LogoAnimationState, LogoKind } from './types'

export function easeSpin(t: number): number {
  const oneMinusT = 1 - t
  return 1 - oneMinusT * oneMinusT * oneMinusT
}

function getLogoAnimation(
  logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState },
  kind: LogoKind,
): LogoAnimationState {
  switch (kind) {
    case 'openai':
      return logoAnimations.openai
    case 'claude':
      return logoAnimations.claude
  }
}

export function updateLogoSpin(logo: LogoAnimationState, now: number): boolean {
  if (logo.spin === null) return false

  const progress = Math.min(1, (now - logo.spin.start) / logo.spin.duration)
  logo.angle = logo.spin.from + (logo.spin.to - logo.spin.from) * easeSpin(progress)
  if (progress >= 1) {
    logo.angle = logo.spin.to
    logo.spin = null
    return false
  }
  return true
}

export function updateSpinState(
  logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState },
  now: number,
): boolean {
  const openaiAnimating = updateLogoSpin(logoAnimations.openai, now)
  const claudeAnimating = updateLogoSpin(logoAnimations.claude, now)
  return openaiAnimating || claudeAnimating
}

export function startLogoSpin(
  logoAnimations: { openai: LogoAnimationState; claude: LogoAnimationState },
  kind: LogoKind,
  direction: 1 | -1,
  now: number,
): void {
  const logo = getLogoAnimation(logoAnimations, kind)
  const delta = direction * Math.PI
  logo.spin = {
    from: logo.angle,
    to: logo.angle + delta,
    start: now,
    duration: 900,
  }
}
