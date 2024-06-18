'use client'

import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { secondaryCommentList } from '@/actions/articleComment'
import CommentPagination from './CommentPagination'
import SecondaryComment from './SecondaryComment'
import ReplyEditor from './ReplyEditor'
import DOMPurify from 'isomorphic-dompurify'

const PrimaryComment = ({
  getPrimaryCommentList,
  item,
  order,
  user
}: {
  getPrimaryCommentList: (
    articleIdOrType: string,
    primaryCommentsPageNum: string,
    order: string
  ) => Promise<void>
  item: any
  order: string
  user?: any
}) => {
  const [secondaryComments, setSecondaryComments] = useState<any>([])
  const [secondaryCommentsPageNum, setSecondaryCommentsPageNum] =
    useState<any>(1)
  const [secondaryCommentsTotal, setSecondaryCommentsTotal] = useState<any>([])
  const [showReply, setShowReply] = useState(false)

  // 获取二级评论列表
  const getSecondaryCommentList = async (
    primaryCommentId: string,
    secondaryCommentsPageNum: string
  ) => {
    // 当一级评论按最新排序时，二级评论按最早排序，其它情况按最新排序
    const secondaryOrder = order === '1' ? '2' : '1'
    const res = await secondaryCommentList(
      `primaryCommentId=${primaryCommentId}&pageNum=${secondaryCommentsPageNum}&pageSize=2&sort=${secondaryOrder}`
    )
    console.log(res)
    if (res.code === 0) {
      setSecondaryComments(res.data.rows)
      setSecondaryCommentsTotal(res.data.total)
      setSecondaryCommentsPageNum(Number(secondaryCommentsPageNum))
    }
  }

  // 改变排序方式时，隐藏和重置二级评论
  useEffect(() => {
    setShowReply(false)
    setSecondaryComments([])
  }, [order])

  // 控制二级评论的显示/隐藏
  const controlReplyDisplay = (id: number) => {
    if (!showReply) {
      getSecondaryCommentList(String(id), '1')
    } else {
      setSecondaryComments([])
    }
    setShowReply(!showReply)
  }

  return (
    <div className="mx-2 flex" key={item.id}>
      <div className="mx-2 h-12 w-12 overflow-hidden rounded-full bg-blue-300">
        {item.avatar && (
          <Image
            className="h-full w-full"
            src={item.avatar}
            width="0"
            height="0"
            sizes="100vw"
            alt=""
          />
        )}
      </div>
      <div className="flex-1 border-b border-dashed border-gray-400">
        <div>
          <span className="mr-1.5 text-sm font-semibold">{item.nickName}</span>
          <span className="text-xs text-gray-400">{item.createTime}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-stone-400">
          <span className="bg-gray-100 px-1 py-0.5">{item.address}</span>
          <span className="bg-gray-100 px-1 py-0.5">{item.browser}</span>
          <span className="bg-gray-100 px-1 py-0.5">{item.device}</span>
        </div>
        {/* 1th content */}
        <div
          className="my-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
        ></div>
        <ReplyEditor
          getPrimaryCommentList={getPrimaryCommentList}
          getSecondaryCommentList={getSecondaryCommentList}
          articleId={item.articleId}
          type={item.type}
          primaryCommentId={item.id}
          replyType="1"
          replyCommentId={item.id}
          replyUserId={item.createBy}
          user={user}
        />
        {item.secondaryCommentNum > 0 && (
          <>
            <div
              className="my-2 flex items-center gap-2 text-sm text-blue-400 hover:cursor-pointer"
              onClick={() => controlReplyDisplay(item.id)}
            >
              {showReply ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}

              <div>
                <span>{item.secondaryCommentNum}</span>
                <span>&nbsp;</span>
                <span>条回复</span>
              </div>
            </div>

            {showReply && (
              <>
                {/* 2th comment */}
                {secondaryComments.map((seC: any) => (
                  <SecondaryComment
                    getPrimaryCommentList={getPrimaryCommentList}
                    getSecondaryCommentList={getSecondaryCommentList}
                    key={seC.id}
                    seC={seC}
                    user={user}
                    primaryCommentId={item.id}
                  />
                ))}

                {/* 2th pagination */}
                <div className="my-4 ml-16">
                  <CommentPagination
                    whSize={8}
                    pageNum={secondaryCommentsPageNum}
                    pageSize={2}
                    total={secondaryCommentsTotal}
                    articleId={item.articleId}
                    type={item.type}
                    primaryCommentId={item.id}
                    getSecondaryCommentList={getSecondaryCommentList}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PrimaryComment
