import Image from 'next/image'

const SOCIALS = [
  {
    href: 'https://github.com/SuperiormonLBJ',
    src: '/github.png',
    alt: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/beiji-li/',
    src: '/linkedin.png',
    alt: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/superiormon187/',
    src: '/instagram.png',
    alt: 'Instagram',
  },
  {
    href: 'https://www.xiaohongshu.com/user/profile/5f282a06000000000100bc5d',
    src: '/icon.png',
    alt: 'Xiaohongshu',
  },
] as const

const linkClass =
  'w-9 h-9 rounded-full overflow-hidden hover:opacity-80 hover:scale-110 transition-all flex items-center justify-center bg-white'

export function SocialLinks() {
  return (
    <div
      className="flex flex-wrap items-center gap-4 border-l border-[var(--border)] pl-6 min-h-[44px]"
      aria-label="Social links"
    >
      {SOCIALS.map(({ href, src, alt }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <Image src={src} alt={alt} width={36} height={36} className="w-9 h-9 object-contain" />
        </a>
      ))}
    </div>
  )
}
