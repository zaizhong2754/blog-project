'use client'

import Image from 'next/image'
import ReplyEditor from './ReplyEditor'
import DOMPurify from 'isomorphic-dompurify'

const SecondaryComment = ({
  getPrimaryCommentList,
  getSecondaryCommentList,
  primaryCommentId,
  seC,
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
  primaryCommentId: number
  seC: any
  user?: any
}) => {
  return (
    <div className="m-2 flex">
      <div className="mx-2 h-12 w-12 overflow-hidden rounded-full bg-blue-300">
        {seC.avatar && (
          <Image
            className="h-full w-full"
            src={seC.avatar}
            width="0"
            height="0"
            sizes="100vw"
            alt=""
          />
        )}
      </div>
      <div className="flex-1 border-b border-dashed border-gray-400">
        <div>
          <span className="mr-1.5 text-sm font-semibold">{seC.nickName}</span>
          <span className="text-xs text-gray-400">{seC.createTime}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-stone-400">
          <span className="bg-gray-100 px-1 py-0.5">{seC.address}</span>
          <span className="bg-gray-100 px-1 py-0.5">{seC.browser}</span>
          <span className="bg-gray-100 px-1 py-0.5">{seC.device}</span>
        </div>
        {/* 2th content */}
        <div className="my-2">
          {seC.replyType === '2' && (
            <div>
              <span>回复&nbsp;</span>
              <span className="text-blue-400">@{seC.replyUserNickName}</span>
              <span>&nbsp;:&nbsp;</span>
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(seC.content)
            }}
          ></div>
        </div>
        <ReplyEditor
          getPrimaryCommentList={getPrimaryCommentList}
          getSecondaryCommentList={getSecondaryCommentList}
          articleId={seC.articleId}
          type={seC.type}
          primaryCommentId={primaryCommentId}
          replyType="2"
          replyCommentId={seC.id}
          replyUserId={seC.createBy}
          user={user}
        />
      </div>
    </div>
  )
}

export default SecondaryComment
