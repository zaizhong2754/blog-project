'use client'

import Image from 'next/image'
import { MessageCircleMore, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { secondaryCommentList } from '@/actions/articleComment'
import CommentPagination from './CommentPagination'
import SecondaryComment from './SecondaryComment'
import { cn } from '@/lib/utils'
import CommentEditor from './CommentEditor'

const ReplyEditor = ({
  getPrimaryCommentList,
  getSecondaryCommentList,
  articleId,
  type,
  primaryCommentId,
  replyType,
  replyCommentId,
  replyUserId,
  user
}: {
  getPrimaryCommentList: (
    articleIdOrType: string,
    primaryCommentsPageNum: string,
    order: string
  ) => Promise<void>
  getSecondaryCommentList: (
    primaryCommentId: string,
    secondaryCommentsPageNum: string
  ) => Promise<void>
  articleId?: string
  type?: string
  primaryCommentId: number
  replyType: '1' | '2'
  replyCommentId: number
  replyUserId: number
  user?: any
}) => {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <>
      {user && (
        <div className="flex items-center py-2 text-sm">
          <MessageCircleMore className="h-5 w-5" />
          <span
            className={cn('ml-1 mr-3 text-xs', {
              'hover:cursor-pointer': user
            })}
            onClick={() => user && setShowEditor(!showEditor)}
          >
            回复
          </span>
        </div>
      )}

      {showEditor && (
        <div className="mb-2">
          <CommentEditor
            getPrimaryCommentList={getPrimaryCommentList}
            getSecondaryCommentList={getSecondaryCommentList}
            commentType="secondary"
            articleId={articleId}
            type={type}
            primaryCommentId={primaryCommentId}
            replyType={replyType}
            replyCommentId={replyCommentId}
            replyUserId={replyUserId}
            user={user}
          />
        </div>
      )}
    </>
  )
}

export default ReplyEditor
