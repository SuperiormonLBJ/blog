'use client'; // Add this to enable client-side interactivity

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { featuredPosts } from '@/data/featured-posts';
import { HobbyPosts } from '@/data/hobby-posts';

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const [welcomePhase, setWelcomePhase] = useState(0); // 0: welcome, 1: transition, 2: content

  // Add useEffect to control the animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setWelcomePhase(1), 500); // 
    const timer2 = setTimeout(() => setWelcomePhase(2), 750); // 
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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
              {/* Welcome text - shows first */}
              <div className={`transition-all duration-500 ${
                welcomePhase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {welcomePhase === 0 && (
                  <h1 className="apple-heading text-6xl">
                    Welcome
                  </h1>
                )}
              </div>

              {/* Main content - shows after welcome disappears */}
              <div className={`transition-all duration-500 ${
                welcomePhase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {welcomePhase === 2 && (
                  <>
                    <p className="apple-subheading text-3xl">
                      Exploring ideas, sharing insights, and documenting my journey
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <button 
                        onClick={() => setShowAbout(true)}
                        className="apple-button bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        About Me
                      </button>
                    </div>
                  </>
                )}
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
                    <h2 className="text-3xl font-semibold mb-4">Li Beiji/李贝基</h2>
                    <p className="text-[var(--secondary)] mb-4">
                      Hi! This incredible journey begins with obsessing over the PC games and getting addicted to the whole computer world in the end. Now I'm a passionate Software Engineer and AI innovator, focused on creating meaningful digital experiences. 
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
          <h2 className="text-3xl font-semibold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
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
                  <div className="absolute top-4 left-4 bg-[#2a2a2a] px-3 py-1 rounded-full text-sm">
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

                  {/* Tags with Icons - Removed background */}
                  <div className="flex flex-wrap gap-3 items-center">
                    {post.tags.map((tag) => (
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

      {/* Passion Beyond Tech Section */}
      <section className="py-16 bg-[var(--card-background)] featured-section">
        <div className="apple-container">
          <h2 className="text-3xl font-semibold mb-8">Passion Beyond Tech</h2>
          {/* Same grid as featured posts - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HobbyPosts.map((post) => (
              <article 
                key={post.id} 
                className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-64"
              >
                {/* Card Background with Emoji */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5">
                  
                  {/* Fixed positioned elements */}
                  {/* Coming Soon - Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  
                  {/* Title - Bottom Right */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs text-[var(--secondary)] mt-1 block">
                      {post.category}
                    </span>
                  </div>
                  
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact-section" className="py-16 newsletter-section">
        <div className="apple-container text-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating" style={{ animationDelay: '3s' }}></div>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Keep In Touch</h2>
          <p className="apple-subheading mb-8">
            Feel free to reach out to me through any of the ways below 😄
          </p>
          
          {/* Contact Information */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="flex items-center justify-center gap-3 p-4 bg-[var(--card-background)] rounded-2xl border border-[var(--border)] hover:scale-105 transition-transform">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <p className="text-sm text-[var(--secondary)]">Phone</p>
                <p className="font-medium">+65 8432 9134</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-center justify-center gap-3 p-4 bg-[var(--card-background)] rounded-2xl border border-[var(--border)] hover:scale-105 transition-transform">
              <span className="text-2xl">✉️</span>
              <div className="text-left">
                <p className="text-sm text-[var(--secondary)]">Email</p>
                <p className="font-medium">libeiji990812@gmail.com</p>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="flex items-center justify-center gap-3 p-4 bg-[var(--card-background)] rounded-2xl border border-[var(--border)] hover:scale-105 transition-transform">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <p className="text-sm text-[var(--secondary)]">WhatsApp</p>
                <p className="font-medium">+65 8432 9134</p>
              </div>
            </div>
            
            {/* LinkedIn */}
            <div className="flex items-center justify-center gap-3 p-4 bg-[var(--card-background)] rounded-2xl border border-[var(--border)] hover:scale-105 transition-transform">
              <span className="text-2xl">💼</span>
              <div className="text-left">
                <p className="text-sm text-[var(--secondary)]">LinkedIn</p>
                <p className="font-medium">linkedin.com/in/beiji-li</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
