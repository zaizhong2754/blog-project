import PageWrapper from '@/components/PageWrapper'
import Friend from '@/components/friend/Friend'
import FriendForm from '@/components/friend/FriendForm'

const page = () => {
  return (
    <PageWrapper bannerClassName="h-96 bg-friend-bg" title="友链">
      <Friend />
    </PageWrapper>
  )
}

export default page
