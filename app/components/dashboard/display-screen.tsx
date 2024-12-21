'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const slides = [
  {
    type: 'video',
    content: '/shows/video.mp4',
    title: 'VU Showcase',
    duration: 30000 // 30 seconds for video
  },
  {
    type: 'image',
    content: '/vu-logo.png',
    title: 'Welcome to Victoria University',
    duration: 5000
  },
  {
    type: 'text',
    content: 'Experience world-class education at Victoria University',
    title: 'Why Choose VU?',
    duration: 4000
  },
  {
    type: 'text',
    content: 'Join us for the upcoming graduation ceremony',
    title: 'Upcoming Events',
    duration: 4000
  }
]

export function DisplayScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, slides[currentSlide].duration)

    // Handle video playback
    if (slides[currentSlide].type === 'video' && videoRef.current) {
      videoRef.current.play()
    }

    return () => clearInterval(timer)
  }, [currentSlide])

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* TV Frame */}
      <div className="absolute inset-0 border-[16px] border-gray-800 rounded-lg">
        {/* Screen Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Power LED */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] text-green-500">ON AIR</span>
      </div>

      {/* Content Area */}
      <div className="relative h-full flex items-center justify-center p-6 overflow-hidden">
        {/* Water Mark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="relative w-40 h-40">
            <Image
              src="/vu-logo.png"
              alt="VU Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Slide Content */}
        <div className="relative z-10 text-center w-full h-full flex items-center justify-center">
          {slides[currentSlide].type === 'video' ? (
            <video
              ref={videoRef}
              src={slides[currentSlide].content}
              className="w-full h-full object-contain"
              muted
              playsInline
            />
          ) : slides[currentSlide].type === 'image' ? (
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src={slides[currentSlide].content}
                alt={slides[currentSlide].title}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold">
                {slides[currentSlide].title}
              </h3>
              <p className="text-white/90 text-sm">
                {slides[currentSlide].content}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
