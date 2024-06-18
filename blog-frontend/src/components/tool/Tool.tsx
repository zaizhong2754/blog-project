'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { MoveUp } from 'lucide-react'
import ModeToggle from '../theme/ModeToggle'

const Tool = () => {
  const [showTool, setShowTool] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  const getScrollPercent = () => {
    const body = document.body
    const scrollPercent = Math.floor(
      (window.scrollY / (body.scrollHeight - body.clientHeight)) * 100
    )
    return scrollPercent
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const checkScrollTop = () => {
    const scrollPercent = getScrollPercent()
    setScrollPercent(scrollPercent)

    if (scrollPercent > 5) {
      setShowTool(true)
    } else {
      setShowTool(false)
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', checkScrollTop)
    return () => {
      document.removeEventListener('scroll', checkScrollTop)
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-10 z-50 flex flex-col gap-2 transition-all duration-500 ease-in-out',
        {
          '-right-10': !showTool,
          'right-10': showTool
        }
      )}
    >
      <ModeToggle />

      <div
        className="group flex h-9 w-9 items-center justify-center rounded-sm bg-blue-400 hover:cursor-pointer"
        onClick={scrollToTop}
      >
        <span
          className={cn('group-hover:hidden', {
            hidden: scrollPercent === 100
          })}
        >
          {scrollPercent}
        </span>
        <MoveUp
          className={cn('h-5 w-5 group-hover:block', {
            hidden: scrollPercent < 100
          })}
        />
      </div>
    </div>
  )
}

export default Tool
