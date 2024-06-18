import { popular } from '@/actions/article'
import { Icons } from '../Icons'
import Link from 'next/link'
import Image from 'next/image'

interface PopularArticle {
  id: number
  title: string
  thumbnail: string
  createTime: string
  commentCount: number
}

const PopularArticleCard = async () => {
  let PopularArticleList: Array<PopularArticle> = []
  const res = await popular()
  if (res.code === 0) {
    PopularArticleList = res.data
  }

  return (
    <div className="rounded-lg bg-white px-6 py-5 shadow-md  hover:shadow-2xl">
      <div className="flex items-center gap-1">
        <Icons.fire className="h-4 w-4 fill-red-500" />
        <span>热门文章</span>
      </div>
      <div className="mt-4 grid gap-4">
        {PopularArticleList.map(item => (
          <Link
            href={'/article/' + item.id}
            key={item.id}
            className="group hover:cursor-pointer"
          >
            <div className="flex gap-2">
              <div className="h-16 w-16 bg-blue-300">
                {item.thumbnail && (
                  <Image
                    className="h-full w-full"
                    src={item.thumbnail}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt=""
                  />
                )}
              </div>
              <div className="flex-1">
                <div
                  className="mb-4 line-clamp-2 text-sm group-hover:text-blue-400"
                  title={item.title}
                >
                  {item.title}
                </div>
                <div className="text-xs" title={item.createTime}>
                  {item.createTime}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularArticleCard
