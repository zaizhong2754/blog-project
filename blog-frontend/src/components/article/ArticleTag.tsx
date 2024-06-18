import { tag } from '@/actions/tag'
import Link from 'next/link'

const ArticleTag = ({
  tags
}: {
  tags: Array<{ id: number; name: string }>
}) => {
  return (
    <div className="flex flex-wrap items-center">
      <div>标签：</div>
      {tags.map(item => (
        <Link
          key={item.id}
          href={`/?pageNum=1&pageSize=5&tagId=${item.id}`}
          className="w-fit rounded-e-full rounded-s-full border border-blue-400 px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-400 hover:text-white"
          target="_blank"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default ArticleTag
