'use client'

import { Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const upcomingLectures = [
  {
    subject: 'Operating Systems',
    time: 'Monday, 10:00 AM - 12:00 PM',
    location: 'Room 2.1',
    lecturer: 'Dr. Kasiita Tawfik'
  },
  {
    subject: 'Data Structures & Algorithms',
    time: 'Tuesday, 2:00 PM - 4:00 PM',
    location: 'Computer Lab 1',
    lecturer: 'Mr. Ndigeza Livingstone'
  },
  {
    subject: 'Software Engineering',
    time: 'Wednesday, 8:00 AM - 10:00 AM',
    location: 'Room 3.2',
    lecturer: 'Dr. Bazigu Alex'
  }
]

export function UpcomingLectures() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [glowEffect, setGlowEffect] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const lecture = upcomingLectures[currentIndex]
    const fullText = `${lecture.subject}\n${lecture.time}\n${lecture.location}\n${lecture.lecturer}`
    let currentChar = 0

    if (!isTyping) return

    const typeInterval = setInterval(() => {
      if (currentChar < fullText.length) {
        setText(fullText.slice(0, currentChar + 1))
        currentChar++
        // Random glow effect while typing
        if (Math.random() > 0.8) {
          setGlowEffect(true)
          setTimeout(() => setGlowEffect(false), 150)
        }
      } else {
        clearInterval(typeInterval)
        // Brief pause before starting next lecture
        setTimeout(() => {
          setIsTyping(false)
          setTimeout(() => {
            setText("")
            setCurrentIndex((prev) => (prev + 1) % upcomingLectures.length)
            setIsTyping(true)
          }, 2000)
        }, 3000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentIndex, isTyping])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <div className="relative h-full rounded-lg border border-gray-800 overflow-hidden">
      {/* Background texture */}
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-[#1a1a1a]/90' : 'bg-white'}`}
        style={{
          backgroundImage: isDark ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232a6fb5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` : 'none'
        }}
      />

      {/* Content */}
      <div className="relative h-full p-6">
        <div className="space-y-4">
          {text.split('\n').map((line, index) => (
            <p 
              key={index} 
              className={`
                text-sm leading-relaxed
                ${index === 0 ? 'text-[#2a6fb5] font-semibold' : isDark ? 'text-blue-100' : 'text-gray-600'}
              `}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
