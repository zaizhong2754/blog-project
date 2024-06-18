import PopularArticleCard from './PopularArticleCard'
import InfoCard from './InfoCard'
import NoticeCard from './NoticeCard'
import ArticleNavbarCard from '@/components/article/ArticleNavbarCard'

const AsideContent = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <InfoCard />
      <NoticeCard />
      <div className="grid gap-4 lg:sticky lg:top-0">
        <ArticleNavbarCard />
        <PopularArticleCard />
      </div>
    </div>
  )
}

export default AsideContent
