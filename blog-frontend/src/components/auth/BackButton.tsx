'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

interface BackButtonProps {
  label: string
  href: string
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button variant="link" className="w-full font-normal" asChild>
        <Link href={href}>{label}</Link>
      </Button>
      <Button variant="link" className="w-full font-normal" asChild>
        <Link href="/">继续不登录访问</Link>
      </Button>
    </div>
  )
}

export default BackButton
