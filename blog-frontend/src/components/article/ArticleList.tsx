'use client'

import { list } from '@/actions/article'
import { cn } from '@/lib/utils'
import { CalendarDays, Inbox, MessageCircleMore, Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ArticlePagination from './ArticlePagination'
import { Icons } from '../Icons'

interface Article {
  categoryId: number
  categoryName: string
  createTime: string
  id: number
  isTop: string
  summary: string
  thumbnail: string
  title: string
  commentCount: number
}

const ArticleListCard = ({
  article,
  left,
  right,
  reverse
}: {
  article: Article
  left?: React.ReactNode
  right?: React.ReactNode
  reverse?: boolean
}) => {
  return (
    <Link
      href={'/article/' + article.id}
      className="group hover:cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg bg-white shadow-md  hover:shadow-2xl">
        <div
          className={cn('flex flex-col md:flex-row', {
            'flex-col-reverse': reverse
          })}
        >
          {left}
          {right}
        </div>
      </div>
    </Link>
  )
}

const ArticleCover = ({ article }: { article: Article }) => {
  return (
    <div className="h-60 bg-blue-300 md:w-2/5">
      {article.thumbnail && (
        <Image
          className="h-full w-full"
          src={article.thumbnail}
          width="0"
          height="0"
          sizes="100vw"
          alt=""
        />
      )}
    </div>
  )
}

const ArticleInfo = ({ article }: { article: Article }) => {
  return (
    <div className="my-auto px-4 py-10 md:h-60 md:flex-1 md:px-10">
      <div className="line-clamp-2 text-2xl">
        {article.isTop === '1' && (
          <>
            <Pin className="inline h-8 w-8 rotate-45 fill-orange-400 text-orange-400" />
            <span>&nbsp;</span>
          </>
        )}

        <span className="group-hover:text-blue-400">{article.title}</span>
      </div>
      <div className="my-3 flex text-xs md:text-xs">
        <CalendarDays className="h-4 w-4" />
        <span>&nbsp;发表于&nbsp;</span>
        <span>{article.createTime}</span>
        <span>&nbsp;|&nbsp;</span>
        <Inbox className="h-4 w-4" />
        <span>&nbsp;</span>
        <span>{article.categoryName}</span>
        <span>&nbsp;|&nbsp;</span>
        <MessageCircleMore className="h-4 w-4" />
        <span>&nbsp;</span>
        <span>{article.commentCount}</span>
        <span>&nbsp;条评论</span>
      </div>
      <div className="line-clamp-2 text-sm">{article.summary}</div>
    </div>
  )
}

const ArticleList = () => {
  const searchParams = useSearchParams()
  const [articleList, setArticleList] = useState<Array<Article>>([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [total, setTotal] = useState<number>(0)

  const getArticleList = async (query: string) => {
    const res = await list(query)
    console.log(res)
    if (res.code === 0) {
      setArticleList(res.data.rows)
      setTotal(res.data.total)
    }
  }

  useEffect(() => {
    console.log(searchParams.toString())
    console.log(searchParams.keys())
    if (!searchParams.toString().trim()) {
      setPageNum(1)
      setPageSize(5)
      getArticleList('pageNum=1&pageSize=5')
    } else {
      const pageNum = Number(searchParams.get('pageNum') || 1)
      const pageSize = Number(searchParams.get('pageSize') || 5)
      setPageNum(pageNum)
      setPageSize(pageSize)
      getArticleList(searchParams.toString())
    }
  }, [searchParams])
  return total <= 0 ? (
    <div className="overflow-hidden rounded-lg bg-white py-6 shadow-md  hover:shadow-2xl">
      <div className="h-96">
        <Icons.emptyList className="h-full w-full" />
      </div>
      <div className="mt-5 text-center text-gray-400">暂无数据</div>
    </div>
  ) : (
    <>
      <div className="grid gap-4">
        {articleList?.map((article, index) =>
          index % 2 === 0 ? (
            <div key={article.id}>
              <ArticleListCard
                article={article}
                left={<ArticleCover article={article} />}
                right={<ArticleInfo article={article} />}
              />
            </div>
          ) : (
            <div key={article.id}>
              <ArticleListCard
                article={article}
                left={<ArticleInfo article={article} />}
                right={<ArticleCover article={article} />}
                reverse={true}
              />
            </div>
          )
        )}
      </div>
      <div className="mt-4">
        <ArticlePagination
          pageNum={pageNum}
          pageSize={pageSize}
          total={total}
        />
      </div>
    </>
  )
}

export default ArticleList
