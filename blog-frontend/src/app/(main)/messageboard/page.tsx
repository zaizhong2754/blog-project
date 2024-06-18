import PageWrapper from '@/components/PageWrapper'
import MessageBoard from '@/components/article/comment/MessageBoard'

const page = () => {
  return (
    <PageWrapper bannerClassName="h-96 bg-reward-bg" title="留言板">
      <div className="overflow-hidden rounded-lg bg-white p-10 shadow-md  hover:shadow-2xl">
        <MessageBoard />
      </div>
    </PageWrapper>
  )
}

export default page
