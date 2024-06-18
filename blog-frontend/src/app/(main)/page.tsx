import BannerToggle from '@/components/banner/BannerToggle'
import Motto from '@/components/banner/Motto'
import ArticleList from '@/components/article/ArticleList'
import PageWrapper from '@/components/PageWrapper'

export default function Home() {
  return (
    <PageWrapper
      bannerClassName="h-screen bg-default-bg bg-fixed"
      title="Butterfly"
      motto={<Motto />}
      bannerToggle={<BannerToggle />}
    >
      <ArticleList />
    </PageWrapper>
  )
}
