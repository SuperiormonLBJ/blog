import Image from 'next/image'
import Link from 'next/link'
import type { FeaturedPost } from '@/types/post'

type FeaturedProjectsSectionProps = {
  posts: FeaturedPost[]
}

export function FeaturedProjectsSection({ posts }: FeaturedProjectsSectionProps) {
  return (
    <section className="py-16 bg-[var(--card-background)] featured-section">
      <div className="apple-container">
        <h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {posts.map(post => (
            <article
              key={post.id}
              className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain bg-[var(--card-background)] transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#2a2a2a] px-3 py-1 rounded-full text-sm">
                  {post.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors">
                  <Link href={post.link} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[var(--secondary)] mb-6 text-lg">{post.description}</p>

                <div className="flex flex-wrap gap-3 items-center">
                  {post.tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 rounded-full"
                    >
                      <Image
                        src={`/${tag.toLowerCase()}`}
                        alt={tag}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={post.link}
                    className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-base font-medium flex items-center gap-2"
                  >
                    Read More
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <span className="text-sm text-[var(--secondary)]">{post.category}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
