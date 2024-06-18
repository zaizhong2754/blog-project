import { CalendarDays, Inbox, MessageCircleMore, Pin } from 'lucide-react'
import Link from 'next/link'

const ArticleTitle = ({ article }: { article: any }) => {
  return (
    <div>
      <h1 className="mb-8 text-center text-4xl font-black">
        {article.isTop === '1' && (
          <>
            <Pin className="inline h-8 w-8 rotate-45 fill-orange-400 text-orange-400" />
            <span>&nbsp;</span>
          </>
        )}

        <span>{article.title}</span>
      </h1>
      <div className="my-3 flex items-center justify-center text-sm">
        <span className="my-3 flex items-center justify-center text-sm">
          <CalendarDays className="h-4 w-4" />
          <span>&nbsp;发表于&nbsp;</span>
          <span>{article.createTime}</span>
        </span>
        <span>&nbsp;|&nbsp;</span>
        <Link
          className="my-3 flex items-center justify-center text-sm hover:text-blue-400"
          href={`/?pageNum=1&pageSize=5&categoryId=${article.categoryId}`}
          target="_blank"
        >
          <Inbox className="h-4 w-4" />
          <span>&nbsp;</span>
          <span>{article.categoryName}</span>
        </Link>
        <span>&nbsp;|&nbsp;</span>
        <Link
          className="my-3 flex items-center justify-center text-sm hover:text-blue-400"
          href="#comment-section"
        >
          <MessageCircleMore className="h-4 w-4" />
          <span>&nbsp;</span>
          <span>{article.commentCount}</span>
          <span>&nbsp;条评论</span>
        </Link>
      </div>
    </div>
  )
}

export default ArticleTitle
