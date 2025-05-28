"use client";

import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set to 30% volume
      
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented by browser:", error);
        }
      };
      
      playAudio();
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>Beiji's Blog</title>
        <meta name="description" content="Personal thoughts and insights on technology, design, and life." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-[var(--background)]">
        {/* Background Music */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src="/music.mp3" type="audio/mpeg" />
        </audio>

        {/* Music Control Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleMusic}
            className="group flex items-center gap-3 bg-[var(--card-background)]/90 backdrop-blur-md border border-[var(--border)] rounded-full px-4 py-3 hover:scale-105 transition-all duration-300 shadow-lg"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {/* Play/Pause Icon */}
            <div className="w-6 h-6 flex items-center justify-center">
              {isPlaying ? (
                // Pause Icon
                <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                // Play Icon
                <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </div>
            
            {/* Music Title */}
            <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              海浪.mp3 - Deca Joins
            </span>
          </button>
        </div>

        {/* Make header fixed and add backdrop blur */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
          <nav className="apple-container h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-semibold nav-link" style={{ animationDelay: '0s' }}>Li Beiji</a>
            <div className="flex items-center gap-6">
              <a href="/blog" className="nav-link" style={{ animationDelay: '0.2s' }}>Home</a>
              <a href="#contact-section" className="nav-link" style={{ animationDelay: '0.4s' }}>Contact</a>
            </div>
          </nav>
        </header>

        {/* Main content with padding to account for fixed header */}
        <main className="pt-16">
          {children}
        </main>

        <footer className="mt-20 py-8 border-t border-[var(--border)]">
          <div className="apple-container text-center text-[var(--secondary)]">
            <p className="nav-link" style={{ animationDelay: '0.6s' }}>© {new Date().getFullYear()} Beiji. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
