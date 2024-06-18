'use client'

import { Icons } from '../Icons'
import { detail } from '@/actions/article'
import MarkdownNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ArticleNavbarCard = () => {
  const pathname = usePathname()
  const [content, setContent] = useState('')

  const getArticleContent = async (id: string) => {
    const res = await detail(id)
    if (res.code === 0) {
      setContent(res.data.content)
    }
  }

  useEffect(() => {
    const result = /^\/article\/(\d*)$/.exec(pathname)
    if (result && result[1]) {
      const id = result[1]
      console.log(id)
      getArticleContent(id)
    }
  }, [pathname])

  return (
    content && (
      <div className="rounded-lg bg-white px-6 py-5  shadow-md hover:shadow-2xl">
        <div className="flex items-center gap-1">
          <Icons.bookMarked className="h-4 w-4 fill-red-500" />
          <span>目录</span>
        </div>
        <div className="flex">
          <div className="w-0 flex-1 whitespace-normal break-words">
            {/* 在页面滚动时, 不自动更新浏览器地址的哈希值, 频繁更新哈希值将导致浏览器挂起，而使返回顶部按钮失效 */}
            <MarkdownNavbar
              headingTopOffset={-286}
              ordered={false}
              updateHashAuto={false}
              declarative={true}
              source={content}
            />
          </div>
        </div>
      </div>
    )
  )
}

export default ArticleNavbarCard
