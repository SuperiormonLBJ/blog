'use client'; // Add this to enable client-side interactivity

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { featuredPosts } from '@/data/featured-posts';

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="space-y-20">
      {/* Hero Section with About Me */}
      <section className="pt-20 pb-16 hero-section relative min-h-[80vh] flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover"
          >
            <source src="/Welcome-Page.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Optional overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[var(--background)]/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="apple-container text-center relative z-10">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Main Content Container */}
          <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
            {/* Introduction Content */}
            <div className={`transition-all duration-500 ${showAbout ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
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
                <button 
                  onClick={() => setShowAbout(true)}
                  className="apple-button bg-[var(--card-background)] text-[var(--foreground)] hover:bg-[var(--border)]"
                >
              About Me
                </button>
              </div>
            </div>

            {/* About Me Content */}
            <div 
              className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${
                showAbout ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center gap-8">
                {/* Profile and About Content */}
                <div className="flex flex-col md:flex-row items-center gap-20">
                  {/* Profile Picture */}
                  <div className="relative w-[450px] aspect-square rounded-full overflow-hidden border-4 border-[var(--accent)] shadow-lg">
                    <Image
                      src="/profile.jpg"
                      alt="Profile Picture"
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* About Text */}
                  <div className="text-left max-w-2xl">
                    <h2 className="text-3xl font-semibold mb-4">About Me - Li Beiji/李贝基</h2>
                    <p className="text-[var(--secondary)] mb-4">
                      Hi! This incredible journey begins with obsessing over the PC games and getting addicted to the computer world as a whole. Now I'm a passionate software engineer and AI innovator, focused on creating meaningful digital experiences. 
                      I love exploring new technologies and sharing my knowledge with others.
                    </p>
                    <div className="flex gap-6 items-center">
                      <a 
                        href="https://github.com/SuperiormonLBJ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center bg-white"
                      >
                        <Image
                          src="/github.png"
                          alt="github"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/beiji-li/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center bg-white"
                      >
                        <Image
                          src="/linkedin.png"
                          alt="LinkedIn"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </a>
                      <a 
                        href="https://www.instagram.com/superiormon187/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center bg-white"
                      >
                        <Image
                          src="/instagram.png"
                          alt="instagram"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </a>
                      <a 
                        href="https://www.xiaohongshu.com/user/profile/5f282a06000000000100bc5d" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center bg-white"
                      >
                        <Image
                          src="/icon.png"
                          alt="xiaohongshu"
                          width={64}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </a>
                      {/* To do: add <wechat />
                      <backsketball />
                      <diving />
                      <travel />
                      <gym></gym> */}
                    </div>
                  </div>
                </div>

                {/* Back Button with Game Style - Smaller and below content */}
                <button 
                  onClick={() => setShowAbout(false)}
                  className="group relative px-6 py-3 bg-[#2a2a2a] text-[#00ff00] font-mono border-2 border-[#00ff00] 
                             hover:bg-[#00ff00] hover:text-[#2a2a2a] transition-all duration-300
                             before:absolute before:inset-0 before:bg-[#00ff00] before:opacity-0 before:transition-opacity
                             hover:before:opacity-10
                             after:absolute after:inset-0 after:border-2 after:border-[#00ff00] after:translate-x-1 after:translate-y-1
                             hover:after:translate-x-0 hover:after:translate-y-0 after:transition-transform
                             active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-base">←</span>
                    <span className="font-bold tracking-wider text-sm">BACK TO HOME</span>
                  </span>
                  {/* Pixel corner decorations */}
                  <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#00ff00]"></div>
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00ff00]"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00ff00]"></div>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#00ff00]"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-[var(--card-background)] featured-section">
        <div className="apple-container">
          <h2 className="text-3xl font-semibold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                {/* Card Image - Adjusted to show full image content */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain bg-[var(--card-background)] transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  {/* Date Overlay */}
                  <div className="absolute top-4 left-4 bg-[var(--background)]/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {post.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Card Content - Increased padding */}
                <div className="p-8">
                  {/* Title and Description */}
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors">
                    <Link href={post.link} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[var(--secondary)] mb-6 text-lg">
                    {post.description}
                  </p>

                  {/* Tags with Icons - Added lighter background */}
                  <div className="flex flex-wrap gap-3 items-center">
                    {post.tags.map((tag) => (
                      <div 
                        key={tag}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 rounded-full"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#4a4a4a] p-1.5">
                          <Image
                            src={`/${tag.toLowerCase()}`}
                            alt={tag}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Read More Link - Increased size */}
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
                    <span className="text-sm text-[var(--secondary)]">
                      {post.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

          {/* Featured Posts */}
      <section className="py-16 bg-[var(--card-background)] featured-section">
        <div className="apple-container">
          <h2 className="text-3xl font-semibold mb-8">Passion Beyond Tech (BallisLife),
            (Blue Poison)
          </h2>
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
                  hobby {post}
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
