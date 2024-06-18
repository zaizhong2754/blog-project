'use client'

import { AlignJustify } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MobileNavItems from './MobileNavItems'
import { useEffect, useState } from 'react'
import storage from 'store'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { logout } from '@/api/user'
import { useToast } from '../ui/use-toast'

const Drawer = () => {
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
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <AlignJustify
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 group-hover:text-blue-500"
        />
      </SheetTrigger>
      <SheetContent className="flex w-80 flex-col pr-0 text-black">
        <div className="flex items-center justify-center">
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
            <div className="text-center">
              <div className="group mx-auto h-28 w-28">
                <Avatar className="h-full w-full rotate-0 transition-transform group-hover:rotate-[360deg]">
                  <AvatarImage src={user?.avatar} alt="@shadcn" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
              </div>
              <div className="h-10 font-serif text-2xl leading-10">Jerry</div>
              <div className="text-sm font-thin">访客</div>
              <Button
                size="sm"
                variant={null}
                className="bg-transparent text-blue-400"
                onClick={() => logoutFromClient()}
              >
                <LogOut className="h-4 w-4 stroke-blue-400 text-muted-foreground " />
                退出
              </Button>
            </div>
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

        <MobileNavItems />
      </SheetContent>
    </Sheet>
  )
}

export default Drawer
