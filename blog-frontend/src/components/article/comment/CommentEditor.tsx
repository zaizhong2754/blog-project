'use client'

import { Icons } from '../../Icons'
import { Button } from '../../ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useEditor, EditorContent, HTMLContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import { ClipboardEvent, useRef, useState } from 'react'
import DOMPurify from 'isomorphic-dompurify'
import './CommentEditor.css'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import NextImage from 'next/image'
import { GIF_LIST, EMOJI_LIST } from '@/config'
import { getAddress } from '@/api/address'
import { getUserAgent } from '@/actions/userAgent'
import { sendPrimaryComment, sendSecondaryComment } from '@/api/articleComment'
import {
  sendMessageBoardPrimary,
  sendMessageBoardSecondary
} from '@/api/messageBoard'

const CommentEditor = ({
  getPrimaryCommentList,
  getSecondaryCommentList,
  commentType,
  articleId,
  type,
  primaryCommentId,
  replyType,
  replyCommentId,
  replyUserId,
  user
}: {
  getPrimaryCommentList: (
    articleIdOrType: string,
    primaryCommentsPageNum: string,
    order: string
  ) => Promise<void>
  getSecondaryCommentList?: (
    primaryCommentId: string,
    secondaryCommentsPageNum: string
  ) => Promise<void>
  commentType: 'primary' | 'secondary'
  articleId?: string
  type?: string
  primaryCommentId?: number
  replyType?: '1' | '2'
  replyCommentId?: number
  replyUserId?: number
  user?: any
}) => {
  const { toast } = useToast()
  const [content, setContent] = useState('')

  const editChange = (value: HTMLContent) => {
    console.log(value)
    setContent(DOMPurify.sanitize(value))
  }

  // 字数限制
  const wordLimit = 20
  // 图片大小限制
  const imageSizeLimit = 1600

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '欢迎留言🎉🎉🎉'
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'inline'
        }
      }),
      CharacterCount.configure({
        limit: wordLimit
      })
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-24 text-black focus-visible:outline-0'
      }
    },
    onUpdate: ({ editor }) => {
      editChange(editor.getHTML())
    }
  })
  const percentage = editor
    ? Math.round((100 / wordLimit) * editor.storage.characterCount.characters())
    : 0

  // 粘贴图片事件
  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    for (let i = 0; i < e.clipboardData.items.length; i++) {
      const item = e.clipboardData.items[i]
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const blob = item.getAsFile()!
        console.log(blob.size / 1024, 'kb')
        if (blob.size / 1024 > imageSizeLimit) {
          toast({
            variant: 'destructive',
            description: `图片不能大于${imageSizeLimit}kb.`
          })
          break
        }

        const reader = new FileReader()
        reader.onload = function (event: ProgressEvent<FileReader>) {
          console.log(event.target?.result) // 这里是图片的Base64编码
          // 通过图片的Base64编码，将图片显示在页面上
          editor?.commands.setImage({ src: event.target?.result as string })
        }
        reader.readAsDataURL(blob)
      }
    }
  }

  // 上传图片
  const fileInput = useRef<HTMLInputElement>(null)
  const uploadImg = () => {
    fileInput.current?.click()
  }
  const fileChange = () => {
    const file = fileInput.current?.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          description: '只能上传图片'
        })
        return
      }
      if (file.size / 1024 > imageSizeLimit) {
        toast({
          variant: 'destructive',
          description: `图片不能大于${imageSizeLimit}kb.`
        })
        return
      }
      const reader = new FileReader()
      reader.onload = function (event: ProgressEvent<FileReader>) {
        console.log(event.target?.result) // 这里是图片的Base64编码
        // 通过图片的Base64编码，将图片显示在页面上
        editor?.commands.setImage({ src: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  // 提交
  const submitComment = async () => {
    console.log(content)

    if (!user) {
      toast({
        variant: 'destructive',
        description: '请先登录.'
      })
      return
    }

    let address
    let browser
    let device

    // 获取地址
    try {
      const res1 = await getAddress()
      if (res1.status === 0) {
        address = res1.content.address_detail.city || res1.content.address
      }
    } catch (err) {
      console.log(err)
    }

    // 获取浏览器信息和设备信息
    try {
      const userAgent = await getUserAgent()
      browser = userAgent.browser.version
        ? userAgent.browser.name + userAgent.browser.version
        : userAgent.browser.name
      device = userAgent.os.version
        ? userAgent.os.name + userAgent.os.version
        : userAgent.os.name
    } catch (err) {
      console.log(err)
    }
    if (commentType === 'primary') {
      if (type === '1') {
        // 留言评论
        const res2 = await sendMessageBoardPrimary({
          type,
          content,
          address,
          browser,
          device
        })
        console.log(res2)
        if (res2.code === 0) {
          toast({
            description: '发送成功.'
          })
          // 清除内容，同时触发update事件
          editor?.commands.clearContent(true)
          // 重新渲染评论区
          getPrimaryCommentList(type, '1', '1')
        }
      } else {
        // 文章评论
        const res2 = await sendPrimaryComment({
          articleId: Number(articleId),
          content,
          address,
          browser,
          device
        })
        console.log(res2)
        if (res2.code === 0) {
          toast({
            description: '发送成功.'
          })
          // 清除内容，同时触发update事件
          editor?.commands.clearContent(true)
          // 重新渲染评论区
          getPrimaryCommentList(articleId!, '1', '1')
        }
      }
    }

    if (commentType === 'secondary') {
      if (type === '1') {
        // 留言评论
        const res3 = await sendMessageBoardSecondary({
          type,
          primaryCommentId: primaryCommentId!,
          replyType: replyType!,
          replyCommentId: replyCommentId!,
          replyUserId: replyUserId!,
          content,
          address,
          browser,
          device
        })
        console.log(res3)
        if (res3.code === 0) {
          toast({
            description: '发送成功.'
          })
          // 清除内容，同时触发update事件
          editor?.commands.clearContent(true)
          // 重新渲染评论区
          getPrimaryCommentList(type, '1', '1')
          getSecondaryCommentList &&
            getSecondaryCommentList(String(primaryCommentId), '1')
        }
      } else {
        // 文章评论
        const res3 = await sendSecondaryComment({
          articleId: Number(articleId),
          primaryCommentId: primaryCommentId!,
          replyType: replyType!,
          replyCommentId: replyCommentId!,
          replyUserId: replyUserId!,
          content,
          address,
          browser,
          device
        })
        console.log(res3)
        if (res3.code === 0) {
          toast({
            description: '发送成功.'
          })
          // 清除内容，同时触发update事件
          editor?.commands.clearContent(true)
          // 重新渲染评论区
          getPrimaryCommentList(articleId!, '1', '1')
          getSecondaryCommentList &&
            getSecondaryCommentList(String(primaryCommentId), '1')
        }
      }
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 p-3">
      <div className="min-h-24">
        <EditorContent editor={editor} onPaste={onPaste} />
      </div>
      <div className="flex items-center justify-between pt-3">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger className="relative">
              <div className="group" title="添加表情">
                <Icons.emoji className="h-6 w-6 group-hover:cursor-pointer group-hover:fill-blue-400 group-hover:text-blue-400" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="max-h-36 w-full overflow-y-scroll"
            >
              <div className="grid grid-cols-8 gap-2 md:grid-cols-12 md:gap-2">
                {EMOJI_LIST.map(item => (
                  <div
                    className="flex h-8 w-8 items-center justify-center"
                    key={item.title}
                    title={item.title}
                  >
                    <div
                      className="h-5 w-5 hover:cursor-pointer"
                      onClick={() => {
                        editor?.commands.setImage({
                          src: item.url,
                          title: 'emoji'
                        })
                      }}
                    >
                      <NextImage
                        className="h-full w-full"
                        src={item.url}
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="relative">
              <div className="group" title="添加gif">
                <Icons.gif className="h-6 w-6 group-hover:cursor-pointer group-hover:fill-blue-400 group-hover:text-blue-400" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="max-h-36 w-full overflow-y-scroll"
            >
              <div className="grid grid-cols-8 gap-2 md:grid-cols-12 md:gap-2">
                {GIF_LIST.map(item => (
                  <div
                    className="flex h-8 w-8 items-center justify-center"
                    key={item.title}
                    title={item.title}
                  >
                    <div
                      className="h-5 w-5 hover:cursor-pointer"
                      onClick={() => {
                        editor?.commands.setImage({
                          src: item.url,
                          title: 'gif'
                        })
                      }}
                    >
                      <NextImage
                        className="h-full w-full"
                        src={item.url}
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <input
            type="file"
            ref={fileInput}
            className="hidden"
            onChange={fileChange}
          ></input>
          <div className="group" title="上传图片" onClick={uploadImg}>
            <Icons.pic className="h-6 w-6 group-hover:cursor-pointer group-hover:fill-blue-400 group-hover:text-blue-400" />
          </div>
        </div>

        <div className="flex items-center">
          {editor && (
            <div
              className={`flex items-center gap-2 ${editor.storage.characterCount.characters() === wordLimit ? 'text-[#FB5151]' : 'text-[#68CEF8]'}`}
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                className="character-count__graph"
              >
                <circle r="10" cx="10" cy="10" fill="#e9ecef" />
                <circle
                  r="5"
                  cx="10"
                  cy="10"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                  transform="rotate(-90) translate(-20)"
                />
                <circle r="6" cx="10" cy="10" fill="white" />
              </svg>

              <div className="text-xs text-[#868196]">
                {editor.storage.characterCount.characters()}/{wordLimit} 字
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="ml-2 h-8 w-14"
            onClick={submitComment}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommentEditor
