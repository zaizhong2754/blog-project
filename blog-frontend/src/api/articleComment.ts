import request from '@/lib/request'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

interface PrimaryCommentDto {
  articleId: number // 评论所属的文章id
  content: string // 评论内容
  address?: string // ip属地
  browser?: string // 浏览器类型
  device?: string // 设备（操作系统）类型
}

export const sendPrimaryComment = async ({
  articleId,
  content,
  address,
  browser,
  device
}: PrimaryCommentDto) => {
  return request.post<PrimaryCommentDto, Response<null>>(
    '/client/articleComment/primary/send',
    {
      articleId,
      content,
      address,
      browser,
      device
    }
  )
}

interface SecondaryCommentDto {
  articleId: number // 评论所属的文章id
  primaryCommentId: number // 所属的一级评论id
  replyType: '1' | '2' // 评论回复类型（1代表回复一级评论，2代表回复二级评论）
  replyCommentId: number // 回复评论id
  replyUserId: number // 回复评论所属的用户id
  content: string // 评论内容
  address?: string // ip属地
  browser?: string // 浏览器类型
  device?: string // 设备（操作系统）类型
}

export const sendSecondaryComment = async ({
  articleId,
  primaryCommentId,
  replyType,
  replyCommentId,
  replyUserId,
  content,
  address,
  browser,
  device
}: SecondaryCommentDto) => {
  return request.post<SecondaryCommentDto, Response<null>>(
    '/client/articleComment/secondary/send',
    {
      articleId,
      primaryCommentId,
      replyType,
      replyCommentId,
      replyUserId,
      content,
      address,
      browser,
      device
    }
  )
}
