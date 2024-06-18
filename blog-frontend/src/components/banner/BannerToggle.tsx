'use client'

import { ChevronDown } from 'lucide-react'

const BannerToggle = () => {
  const scrollToContent = () => {
    const content = document.getElementById('content')
    content?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <ChevronDown
      onClick={scrollToContent}
      aria-hidden="true"
      className="h-8 w-full flex-shrink-0  animate-bounce group-hover:text-blue-500"
    />
  )
}

export default BannerToggle
