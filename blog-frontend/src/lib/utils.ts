import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mottoStateMachine(
  mottos: { chinese: string; english: string; source: string }[]
) {
  let mottoStateArray: string[] = []
  mottos.forEach((motto, index) => {
    for (const key in motto) {
      if (Object.prototype.hasOwnProperty.call(motto, key)) {
        const element = motto[key as keyof typeof motto]
        mottoStateArray.push(element)
      }
    }
  })

  return mottoStateArray
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}

// 防抖函数
function debounce(fn: Function, delay = 200) {
  let timer: any = null
  return function () {
    // 如果这个函数已经被触发了
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // @ts-ignore 透传 this和参数
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 节流函数
export const throttle = (fn: Function, delay = 200) => {
  let timer: any = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      // @ts-ignore 透传 this和参数
      fn.apply(this as unknown, arguments as unknown)
      timer = null
    }, delay)
  }
}
