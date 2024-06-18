'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

const UserAvatarNav = ({ user, logout }: { user: any; logout: () => void }) => {
  return (
    <div className="group relative h-full">
      <div className="flex h-full items-center">
        <Avatar className="rotate-0 transition-transform group-hover:rotate-[360deg]">
          <AvatarImage src={user?.avatar} alt="@shadcn" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute left-0 top-full hidden text-sm text-muted-foreground group-hover:block group-hover:animate-in group-hover:fade-in-10 group-hover:slide-in-from-top-5">
        <Button size="sm" variant="destructive" onClick={() => logout()}>
          <LogOut className="h-4 w-4 stroke-white text-muted-foreground " />
          退出
        </Button>
      </div>
    </div>
  )
}

export default UserAvatarNav
