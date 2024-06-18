'use client'

import { NAV_MENUS } from '@/config'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { category } from '@/actions/category'
import { tag } from '@/actions/tag'

const NavItems = () => {
  const [navMenus, setNavMenus] = useState(NAV_MENUS)

  const getCategoryListAndTagList = async () => {
    const [res1, res2] = await Promise.allSettled([category(), tag()])

    if (res1.status === 'fulfilled' && res1.value.code === 0) {
      NAV_MENUS[0].children = res1.value.data?.map(item => ({
        label: item.name,
        href: `/?pageNum=1&pageSize=5&categoryId=${item.id}`
      }))
    }
    if (res2.status === 'fulfilled' && res2.value.code === 0) {
      NAV_MENUS[1].children = res2.value.data?.map(item => ({
        label: item.name,
        href: `/?pageNum=1&pageSize=5&tagId=${item.id}`
      }))
    }
    setNavMenus(NAV_MENUS)
  }

  useEffect(() => {
    getCategoryListAndTagList()
  }, [])

  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null)

  const close = () => setActiveIndex(null)

  return (
    <div className="flex h-full gap-4" ref={navRef} onMouseLeave={close}>
      {navMenus.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }

        const isOpen = i === activeIndex

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
