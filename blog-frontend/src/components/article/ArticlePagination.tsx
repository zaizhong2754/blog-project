'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { generatePagination } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

const ArticlePagination = ({
  pageNum,
  pageSize,
  total
}: {
  pageNum: number
  pageSize: number
  total: number
}) => {
  const searchParams = useSearchParams()

  let prevHerf = ''
  let nextHerf = ''
  if (!searchParams.toString().trim()) {
    prevHerf = '/?' + `pageNum=${pageNum - 1}&pageSize=5`
    nextHerf = '/?' + `pageNum=${pageNum + 1}&pageSize=5`
  } else {
    if (searchParams.has('pageNum')) {
      prevHerf =
        '/?' +
        searchParams
          .toString()
          .replace(/pageNum\=\d*/g, `pageNum=${pageNum - 1}`)
      nextHerf =
        '/?' +
        searchParams
          .toString()
          .replace(/pageNum\=\d*/g, `pageNum=${pageNum + 1}`)
    } else {
      prevHerf = '/?' + `pageNum=${pageNum - 1}&` + searchParams.toString()
      nextHerf = '/?' + `pageNum=${pageNum + 1}&` + searchParams.toString()
    }
  }

  const getCurrentHerf = (page: string | number) => {
    if (!searchParams.toString().trim()) {
      return '/?' + `pageNum=${page}&pageSize=5`
    }
    if (!searchParams.has('pageNum')) {
      return '/?' + `pageNum=${page}&` + searchParams.toString()
    }
    return (
      '/?' + searchParams.toString().replace(/pageNum\=\d*/g, `pageNum=${page}`)
    )
  }

  const totalPages = total / pageSize < 1 ? 1 : Math.ceil(total / pageSize)
  const allPages = generatePagination(pageNum, totalPages)
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevHerf}
            className={pageNum === 1 ? 'pointer-events-none text-gray-300' : ''}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'
          return position === 'middle' ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={String(page) === String(pageNum)}
                href={getCurrentHerf(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href={nextHerf}
            className={
              pageNum === totalPages ? 'pointer-events-none text-gray-300' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ArticlePagination
