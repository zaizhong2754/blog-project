'use server'

export const primaryCommentList = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/articleComment/primary?${query}`,
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

export const secondaryCommentList = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/articleComment/secondary?${query}`,
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
