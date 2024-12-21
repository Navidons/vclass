'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Switch } from './switch'
import { useEffect, useState } from 'react'

export function ToggleButton() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">Dark Theme</span>
      </div>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </div>
  )
}
