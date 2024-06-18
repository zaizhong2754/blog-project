'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ClientPagination'
import { generatePagination } from '@/lib/utils'

const CommentPagination = ({
  whSize,
  pageNum,
  pageSize,
  total,
  primaryCommentId,
  getSecondaryCommentList,
  articleId,
  type,
  order,
  getPrimaryCommentList
}: {
  whSize: number
  pageNum: number
  pageSize: number
  total: number
  primaryCommentId?: number
  getSecondaryCommentList?: (
    primaryCommentId: string,
    secondaryCommentsPageNum: string
  ) => Promise<void>
  articleId?: string
  type?: string
  order?: string
  getPrimaryCommentList?: (
    articleIdOrType: string,
    primaryCommentsPageNum: string,
    order: string
  ) => Promise<void>
}) => {
  const totalPages = total / pageSize < 1 ? 1 : Math.ceil(total / pageSize)
  const allPages = generatePagination(pageNum, totalPages)

  const changePage = (page: string | number) => {
    console.log(page)
    getSecondaryCommentList &&
      getSecondaryCommentList(String(primaryCommentId), String(page))

    getPrimaryCommentList &&
      articleId &&
      getPrimaryCommentList(String(articleId), String(page), String(order))

    getPrimaryCommentList &&
      type &&
      getPrimaryCommentList(type, String(page), String(order))
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={
            pageNum === 1
              ? 'pointer-events-none text-gray-300'
              : 'hover:cursor-pointer'
          }
          onClick={() => pageNum !== 1 && changePage(pageNum - 1)}
        >
          <PaginationPrevious className={`h-${whSize} w-${whSize}`} />
        </PaginationItem>

        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'
          return position === 'middle' ? (
            <PaginationItem>
              <PaginationEllipsis className={`h-${whSize} w-${whSize}`} />
            </PaginationItem>
          ) : (
            <PaginationItem
              key={page}
              className={
                String(page) === String(pageNum) ? '' : 'hover:cursor-pointer'
              }
              onClick={() =>
                String(page) !== String(pageNum) && changePage(page)
              }
            >
              <PaginationLink
                className={`h-${whSize} w-${whSize}`}
                isActive={String(page) === String(pageNum)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem
          className={
            pageNum === totalPages
              ? 'pointer-events-none text-gray-300'
              : 'hover:cursor-pointer'
          }
          onClick={() => pageNum !== totalPages && changePage(pageNum + 1)}
        >
          <PaginationNext className={`h-${whSize} w-${whSize}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CommentPagination
