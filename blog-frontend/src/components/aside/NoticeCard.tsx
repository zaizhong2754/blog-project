import { Icons } from '../Icons'

const NoticeCard = () => {
  return (
    <div className="rounded-lg bg-white px-6 py-5 shadow-md  hover:shadow-2xl">
      <div className="flex items-center gap-1">
        <Icons.bullhorn className="h-4 w-4 animate-bullhorn-shake fill-red-500" />
        <span>公告</span>
      </div>
      <div className="flex">
        <div className="w-0 flex-1 whitespace-normal break-words">
          {
            '如果你在使用中遇到问题，请到 Github Issues 进行反馈，你也可以加入反馈群（扫码或者点击图片跳转）'
          }
        </div>
      </div>
    </div>
  )
}
export default NoticeCard
