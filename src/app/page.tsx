'use client'

import { useEffect, useState } from 'react'
import { featuredPosts } from '@/data/featured-posts'
import { HobbyPosts } from '@/data/hobby-posts'
import {
  ContactSection,
  FeaturedProjectsSection,
  HeroSection,
  HobbySection,
} from '@/components/home'

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    if (!showAbout) return
    void import('@/app/dynamic-layout')
  }, [showAbout])

  return (
    <div className="space-y-20">
      <HeroSection
        showAbout={showAbout}
        onShowAbout={() => setShowAbout(true)}
        onBackHome={() => setShowAbout(false)}
      />
      <FeaturedProjectsSection posts={featuredPosts} />
      <HobbySection posts={HobbyPosts} />
      <ContactSection />
    </div>
  )
}
