'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const ModeToggle = () => {
  const { setTheme, theme } = useTheme()

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-400 hover:cursor-pointer"
      onClick={changeTheme}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}

export default ModeToggle
