'use client'

import { Icons } from '../../Icons'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { primaryCommentList } from '@/actions/articleComment'
import CommentPagination from './CommentPagination'
import { cn } from '@/lib/utils'
import PrimaryComment from './PrimaryComment'
import storage from 'store'
import CommentEditor from './CommentEditor'

const ArticleComment = () => {
  const pathname = usePathname()
  const [articleId, setArticleId] = useState('')
  const [order, setOrder] = useState('1')
  const [primaryComments, setPrimaryComments] = useState<any>([])
  const [primaryCommentsPageNum, setPrimaryCommentsPageNum] = useState(1)
  const [primaryCommentsTotal, setPrimaryCommentsTotal] = useState(0)
  const [commentCount, setCommentCount] = useState(0)

  const [user, setUser] = useState<any>()
  useEffect(() => {
    const userInfo = storage.get('userInfo')

    if (userInfo) {
      setUser(userInfo)
    }
  }, [])

  const getPrimaryCommentList = async (
    articleId: string,
    primaryCommentsPageNum: string,
    order: string
  ) => {
    const res = await primaryCommentList(
      `articleId=${articleId}&pageNum=${primaryCommentsPageNum}&pageSize=2&sort=${order}`
    )
    console.log(res)
    if (res.code === 0) {
      setPrimaryComments(res.data.rows)
      setPrimaryCommentsTotal(res.data.total)
      setCommentCount(res.data.commentCount)
      setPrimaryCommentsPageNum(Number(primaryCommentsPageNum))
    }
  }

  useEffect(() => {
    const result = /^\/article\/(\d*)$/.exec(pathname)
    if (result && result[1]) {
      const id = result[1]
      setArticleId(id)
      getPrimaryCommentList(id, '1', '1')
    }
  }, [pathname])

  const changeOrder = (order: string) => {
    setOrder(order)
    getPrimaryCommentList(articleId, '1', order)
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-x-2">
        <Icons.comments className="h-6 w-6" />
        <span className="text-xl font-semibold">评论</span>
      </div>
      <CommentEditor
        commentType="primary"
        user={user}
        articleId={articleId}
        getPrimaryCommentList={getPrimaryCommentList}
      />
      <div className="mx-2 my-5 flex items-center justify-between gap-x-2">
        <div className="text-lg font-semibold">
          <span>{commentCount}</span>
          <span>&nbsp;留言</span>
        </div>
        <div className="flex gap-x-3 text-xs text-gray-400">
          <span
            className={cn({
              'text-blue-400': order === '1',
              'hover:cursor-pointer': order !== '1'
            })}
            onClick={() => changeOrder('1')}
          >
            最新
          </span>
          <span
            className={cn({
              'text-blue-400': order === '2',
              'hover:cursor-pointer': order !== '2'
            })}
            onClick={() => changeOrder('2')}
          >
            最早
          </span>
        </div>
      </div>

      {/* 1th comment */}
      {primaryComments.map((item: any) => (
        <PrimaryComment
          key={item.id}
          item={item}
          order={order}
          user={user}
          getPrimaryCommentList={getPrimaryCommentList}
        />
      ))}

      {/* 1th pagination */}
      {primaryCommentsTotal > 0 && (
        <div className="my-4 ml-16">
          <CommentPagination
            whSize={9}
            pageNum={primaryCommentsPageNum}
            pageSize={2}
            total={primaryCommentsTotal}
            articleId={articleId}
            order={order}
            getPrimaryCommentList={getPrimaryCommentList}
          />
        </div>
      )}
    </div>
  )
}

export default ArticleComment
