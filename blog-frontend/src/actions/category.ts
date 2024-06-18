'use server'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

interface CategoryVo {
  id: number
  name: string
  pid: number
  description: string
}

export const category = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/category/list`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json() as Promise<Response<Array<CategoryVo>>>
}
