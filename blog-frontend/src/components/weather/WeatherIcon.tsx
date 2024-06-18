'use client'

import 'qweather-icons/font/qweather-icons.css'
import { cn } from '@/lib/utils'

const WeatherIcon = ({
  code,
  className,
  isFill
}: {
  code: string
  className?: string
  isFill?: boolean
}) => {
  return (
    <span
      // xmlns="http://www.w3.org/2000/svg"
      className={cn(`qi-${code}${isFill ? '-fill' : ''}`, className)}
    />
  )
}

export default WeatherIcon
