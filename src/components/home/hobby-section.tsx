import Image from 'next/image'
import type { HobbyPost } from '@/types/post'

type HobbySectionProps = {
  posts: HobbyPost[]
}

export function HobbySection({ posts }: HobbySectionProps) {
  return (
    <section className="py-16 bg-[var(--card-background)] featured-section">
      <div className="apple-container">
        <h2 className="text-3xl font-semibold mb-8">Passion Beyond Tech</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <article
              key={post.id}
              className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-64"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/hobby/${post.category.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-1 text-xs bg-[var(--accent)]/20 text-[var(--accent)] rounded-full backdrop-blur-sm">
                    Coming Soon
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 text-right z-10">
                  <h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors text-white">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-300 mt-1 block">{post.category}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
