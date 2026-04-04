'use client'

import { SocialLinks } from './social-links'

type HeroSectionProps = {
  showAbout: boolean
  onShowAbout: () => void
  onBackHome: () => void
}

const matrixButtonClass =
  'group relative inline-flex shrink-0 items-center px-6 py-3 bg-[#2a2a2a] text-[#00ff00] font-mono border-2 border-[#00ff00] ' +
  'hover:bg-[#00ff00] hover:text-[#2a2a2a] transition-all duration-300 ' +
  'after:absolute after:inset-0 after:border-2 after:border-[#00ff00] after:translate-x-1 after:translate-y-1 ' +
  'hover:after:translate-x-0 hover:after:translate-y-0 after:transition-transform active:scale-95'

export function HeroSection({ showAbout, onShowAbout, onBackHome }: HeroSectionProps) {
  return (
    <section className="pt-20 hero-section relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover">
          <source src="/Welcome-Page.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--background)]/65 backdrop-blur-[2px]" />
      </div>

      <div className="apple-container relative z-10 w-full py-20">
        <div
          className={`transition-all duration-500 ${showAbout ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <p
            className="text-sm font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-4 font-bold"
            style={{ animation: 'slideIn 0.5s ease-out both' }}
          >
            Hello, I&apos;m
          </p>

          <h3 className="text-6xl font-bold tracking-tight leading-none mb-10">Li Beiji / 李贝基</h3>

          <p className="text-4xl font-semibold text-[var(--secondary)] mb-12">
            Software Engineer & AI Innovator
          </p>

          <div
            className="flex flex-wrap items-center gap-6"
            style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}
          >
            <button type="button" onClick={onShowAbout} className={matrixButtonClass}>
              <span className="relative z-10 font-bold tracking-wider text-sm">About Me</span>
            </button>
            <SocialLinks />
          </div>
        </div>

        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${
            showAbout ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="page relative w-full h-full min-h-[70vh]">
            <div id="stage" className="relative w-full h-full min-h-[70vh]" />
          </div>
          <button type="button" onClick={onBackHome} className={`absolute top-4 left-4 ${matrixButtonClass}`}>
            <span className="relative z-10 flex items-center gap-2">
              <span>←</span>
              <span className="font-bold tracking-wider text-sm">BACK TO HOME</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
