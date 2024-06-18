'use server'

export const list = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/client/link/list`,
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
