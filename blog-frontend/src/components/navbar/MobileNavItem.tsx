'use client'

import { NAV_MENUS } from '@/config'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

type Category = (typeof NAV_MENUS)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  close: () => void
  isOpen: boolean
  isAnyOpen: boolean
}

const MobileNavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen
}: NavItemProps) => {
  return (
    <div className="relative" onClick={handleOpen}>
      <div className="h-18 flex items-center justify-between px-5 py-2 hover:cursor-pointer hover:bg-blue-400">
        <div className="flex items-center">
          {category.icon && <category.icon className="mr-4 h-5 w-5" />}
          {category.href ? (
            <Link href={category.href}>{category.label}</Link>
          ) : (
            category.label
          )}
        </div>
        {category.children && (
          <ChevronDown
            className={cn('h-4 w-4 text-muted-foreground transition-all', {
              '-rotate-180': isOpen
            })}
          />
        )}
      </div>

      {isOpen ? (
        <div className="ml-8">
          {category.children?.map(item => (
            <div
              key={item.label}
              className="h-18 flex items-center justify-between  hover:bg-blue-400"
            >
              {item.href ? (
                <Link className="h-full w-full px-5 py-2" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default MobileNavItem
