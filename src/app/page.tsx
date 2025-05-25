import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="pt-20 pb-16 hero-section">
        <div className="apple-container text-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
          </div>
          <h1 className="apple-heading">
            Welcome to My Blog
          </h1>
          <p className="apple-subheading">
            Exploring ideas, sharing insights, and documenting my journey
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/blog" className="apple-button">
              Read Blog
            </a>
            <a href="/about" className="apple-button bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--border)]">
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-[var(--card-background)] featured-section">
        <div className="apple-container">
          <h2 className="text-3xl font-semibold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((post, index) => (
              <article 
                key={post} 
                className="apple-card group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-video bg-[var(--border)] rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 floating"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  Coming Soon: Post Title {post}
                </h3>
                <p className="text-[var(--secondary)]">
                  A brief description of the post that will be published soon...
                </p>
                <div className="mt-4 text-sm text-[var(--secondary)]">
                  Coming soon
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 newsletter-section">
        <div className="apple-container text-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '3s' }}></div>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="apple-subheading mb-8">
            Subscribe to receive updates on new posts and projects
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--card-background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300"
            />
            <button type="submit" className="apple-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
