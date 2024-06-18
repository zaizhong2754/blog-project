'use server'

export const popular = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/article/popular`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json()
}

export const list = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/article/list?${query}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json()
}

export const detail = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/article/${id}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      cache: 'no-store'
    }
  )
  return res.json()
}
