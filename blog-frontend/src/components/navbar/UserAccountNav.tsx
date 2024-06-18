'use client'

import Link from 'next/link'
import UserAvatarNav from './UserAvatarNav'
import { buttonVariants } from '../ui/button'
import { useEffect, useState } from 'react'
import storage from 'store'
import { deleteCookie } from 'cookies-next'
import { logout } from '@/api/user'
import { useToast } from '../ui/use-toast'

const UserAccountNav = () => {
  const { toast } = useToast()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const userInfo = storage.get('userInfo')
    if (userInfo) {
      console.log(userInfo)

      setUser(userInfo)
    }
  }, [])

  const logoutFromClient = async () => {
    const res = await logout()
    if (res.code === 0) {
      toast({
        variant: 'default',
        description: '退出成功.'
      })
      setUser(null)
      storage.remove('userInfo')
      deleteCookie('clientToken')
      console.log('logout')
    } else {
      toast({
        variant: 'destructive',
        description: '退出失败.'
      })
    }
  }

  return (
    <div className="hidden h-full lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      {user ? null : (
        <Link
          href="/login"
          className={buttonVariants({
            variant: 'ghost'
          })}
        >
          登录
        </Link>
      )}

      {user ? null : (
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      )}

      {user ? (
        <UserAvatarNav user={user} logout={logoutFromClient} />
      ) : (
        <Link
          href="/register"
          className={buttonVariants({
            variant: 'ghost'
          })}
        >
          注册
        </Link>
      )}
    </div>
  )
}

export default UserAccountNav
