'use server'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

interface TagVo {
  id: number
  name: string
}

export const tag = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/tag/list`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json() as Promise<Response<Array<TagVo>>>
}
