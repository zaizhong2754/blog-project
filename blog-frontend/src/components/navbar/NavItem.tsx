'use client'

import { NAV_MENUS } from '@/config'
import { Button } from '../ui/button'
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

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen
}: NavItemProps) => {
  return (
    <div className="relative flex" onMouseEnter={handleOpen}>
      <div className="group relative flex flex-col justify-center">
        <Button
          className="gap-1.5 rounded-none bg-transparent text-[#eee] group-hover:bg-transparent group-hover:text-blue-300"
          variant={isOpen ? 'secondary' : 'ghost'}
        >
          {category.icon && (
            <category.icon className="h-5 w-5 fill-white group-hover:fill-blue-300" />
          )}
          {category.href ? (
            <Link href={category.href}>{category.label}</Link>
          ) : (
            category.label
          )}
          {category.children && (
            <ChevronDown
              className={cn(
                'h-4 w-4 stroke-[#eee] text-muted-foreground transition-all group-hover:stroke-blue-300',
                {
                  '-rotate-180': isOpen
                }
              )}
            />
          )}
        </Button>
        <div className="w-0 border-b-2 border-b-blue-300 transition-all group-hover:w-full" />
      </div>

      {isOpen ? (
        <div
          className={cn(
            'absolute left-0 top-full min-w-full rounded-md bg-white text-sm text-muted-foreground',
            'animate-in fade-in-10 slide-in-from-top-5'
          )}
        >
          {category.children?.map(item => (
            <div
              onClick={() => close()}
              key={item.label}
              className="relative flex h-9 items-center text-nowrap px-2 hover:cursor-pointer hover:rounded-md hover:bg-blue-400 sm:text-sm"
            >
              <Link
                href={item.href}
                className="block w-full rounded-none font-medium text-gray-900"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default NavItem
