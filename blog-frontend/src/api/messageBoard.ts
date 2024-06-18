import request from '@/lib/request'

interface Response<T> {
  code: number
  data?: T
  msg?: string
}

interface MessageBoardPrimaryDto {
  type: string // 评论类型（0代表文章评论，1代表友链评论，2代表留言评论，）
  content: string // 评论内容
  address?: string // ip属地
  browser?: string // 浏览器类型
  device?: string // 设备（操作系统）类型
}

export const sendMessageBoardPrimary = async ({
  type,
  content,
  address,
  browser,
  device
}: MessageBoardPrimaryDto) => {
  return request.post<MessageBoardPrimaryDto, Response<null>>(
    '/client/messageBoard/primary/send',
    {
      type,
      content,
      address,
      browser,
      device
    }
  )
}

interface MessageBoardSecondaryDto {
  type: string // 评论类型（0代表文章评论，1代表友链评论，2代表留言评论，）
  primaryCommentId: number // 所属的一级评论id
  replyType: '1' | '2' // 评论回复类型（1代表回复一级评论，2代表回复二级评论）
  replyCommentId: number // 回复评论id
  replyUserId: number // 回复评论所属的用户id
  content: string // 评论内容
  address?: string // ip属地
  browser?: string // 浏览器类型
  device?: string // 设备（操作系统）类型
}

export const sendMessageBoardSecondary = async ({
  type,
  primaryCommentId,
  replyType,
  replyCommentId,
  replyUserId,
  content,
  address,
  browser,
  device
}: MessageBoardSecondaryDto) => {
  return request.post<MessageBoardSecondaryDto, Response<null>>(
    '/client/messageBoard/secondary/send',
    {
      type,
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
