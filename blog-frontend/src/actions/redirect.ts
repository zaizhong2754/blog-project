'use server'

import { redirect } from 'next/navigation'

export const redirectToLogin = () => {
  redirect('/login')
}
