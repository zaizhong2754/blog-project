import PageWrapper from '@/components/PageWrapper'
import ArticleDetail from '@/components/article/ArticleDetail'
import { detail } from '@/actions/article'
import ArticleTitle from '@/components/article/ArticleTitle'
import ArticleTag from '@/components/article/ArticleTag'
import ArticleComment from '@/components/article/comment/ArticleComment'

const page = async ({ params }: { params: { id: string } }) => {
  const res = await detail(params.id)

  return (
    <PageWrapper bannerClassName="h-96 bg-friend-bg" title="文章">
      <div className="overflow-hidden rounded-lg bg-white p-10 shadow-md  hover:shadow-2xl">
        <ArticleTitle article={res.code === 0 ? res.data : {}} />
        <ArticleDetail content={res.code === 0 ? res.data.content : ''} />
        <ArticleTag tags={res.code === 0 ? res.data.tags : {}} />
      </div>
      <div
        id="comment-section"
        className="mt-10 overflow-hidden rounded-lg bg-white p-10 shadow-md  hover:shadow-2xl"
      >
        <ArticleComment />
      </div>
    </PageWrapper>
  )
}

export default page
