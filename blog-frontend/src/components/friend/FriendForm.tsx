'use client'

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FriendSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useState, useTransition } from 'react'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
import DragUpload from '../DragUpload'
import { uploadImage } from '@/api/upload'
import { sendLink } from '@/api/friend'

const FriendForm = ({
  getFriendList
}: {
  getFriendList: () => Promise<void>
}) => {
  const imageSizeLimit = 1
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [img, setImg] = useState('')

  const form = useForm<z.infer<typeof FriendSchema>>({
    resolver: zodResolver(FriendSchema),
    defaultValues: {
      name: '',
      address: '',
      logo: '',
      description: ''
    }
  })

  const fileHandler = (files: FileList | null | undefined) => {
    startTransition(async () => {
      if (!files || files.length < 1) {
        setError('请正确选择文件')
        return
      }
      if (files.length > 1) {
        setError('请选择单个文件')
        return
      }

      const file = files[0]
      console.log(file)
      if (!file.type.startsWith('image/')) {
        setError('只能上传图片')
        return
      }
      if (file.size / 1024 > imageSizeLimit) {
        setError(`图片不能大于${imageSizeLimit}kb.`)
        return
      }
      setError('')
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadImage(formData)
      console.log(res)
      if (res.code === 0) {
        setSuccess('图片上传成功')
        console.log(res.data)
        setImg(res.data?.url!)
        form.setValue('logo', res.data?.url!)
      } else {
        setError('图片上传失败，请重试')
        setSuccess('')
      }
    })
  }

  const onFileRemove = () => {
    setImg('')
    form.setValue('logo', '')
  }

  const onSubmit = (values: z.infer<typeof FriendSchema>) => {
    startTransition(async () => {
      console.log(values)

      const res = await sendLink(values)
      if (res.code === 0) {
        setError('')
        setSuccess('提交成功，待审核')
        // 刷新友链列表
        getFriendList()
      } else {
        setSuccess('')
        setError('提交失败，请重试')
      }
    })
  }

  return (
    <div className="mx-auto max-w-80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="john"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地址</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="https://www.xxx.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>logo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      className="hidden"
                    />
                  </FormControl>
                  <DragUpload
                    img={img}
                    disabled={isPending}
                    fileHandler={fileHandler}
                    onFileRemove={onFileRemove}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>简介</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="description"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            提交
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FriendForm
