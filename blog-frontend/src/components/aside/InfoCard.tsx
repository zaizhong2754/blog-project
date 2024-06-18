import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Icons } from '../Icons'

const InfoCard = () => {
  return (
    <div className="rounded-lg bg-white px-6 py-5 shadow-md  hover:shadow-2xl">
      <div className="text-center">
        <div className="group mx-auto h-28 w-28">
          <Avatar className="h-full w-full rotate-0 transition-transform group-hover:rotate-[360deg]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>ZZ</AvatarFallback>
          </Avatar>
        </div>
        <div className="h-10 font-serif text-2xl leading-10">Jerry</div>
        <div className="text-sm">
          A Simple and Card UI Design theme for Hexo
        </div>
        <div className="mt-4 grid grid-cols-3">
          <div>
            <div>文章</div>
            <div>19</div>
          </div>
          <div>
            <div>标签</div>
            <div>12</div>
          </div>
          <div>
            <div>分类</div>
            <div>6</div>
          </div>
        </div>
        <div className="ml-4  mt-4 flex justify-center gap-x-8 lg:ml-0">
          <div
            className="transition-transform hover:rotate-[360deg]"
            title="email"
          >
            <Link href="/">
              <Icons.email className="h-6 w-6 fill-gray-600" />
            </Link>
          </div>
          <div
            className="transition-transform hover:rotate-[360deg]"
            title="github"
          >
            <Link href="/">
              <Icons.github className="h-6 w-6 fill-gray-600" />
            </Link>
          </div>
          <div
            className="transition-transform hover:rotate-[360deg]"
            title="qq"
          >
            <Link href="/">
              <Icons.qq className="h-6 w-6 fill-gray-600" />
            </Link>
          </div>
          <div
            className="transition-transform hover:rotate-[360deg]"
            title="wechat"
          >
            <Link href="/">
              <Icons.wechat className="h-6 w-6 fill-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
