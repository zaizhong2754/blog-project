'use server'

export const messageBoardPrimaryList = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/messageBoard/primary?${query}`,
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

export const messageBoardSecondaryList = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/messageBoard/secondary?${query}`,
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
