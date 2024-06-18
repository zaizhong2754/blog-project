'use client'

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import AuthCardWrapper from './AuthCardWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
import { login, validateCode } from '@/api/user'
import { useEffect, useRef, useState, useTransition } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import storage from 'store'
import Image from 'next/image'
import { RefreshCw } from 'lucide-react'
import { throttle } from '@/lib/utils'

const LoginForm = () => {
  const router = useRouter()

  const [showMark, setShowMark] = useState(false)
  const refreshCodeRef = useRef<HTMLDivElement>(null)
  const [validateImg, setValidateImg] = useState('')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: '',
      password: '',
      validateCode: ''
    }
  })

  const getValidateCode = async () => {
    const res = await validateCode()
    console.log(res)
    if (res.code === 0) {
      console.log(res.data)
      storage.set('validateImgKey', res.data?.codeKey)
      setValidateImg(res.data?.codeValue)
    }
  }

  const refreshImg = () => {
    getValidateCode()
    if (refreshCodeRef.current) {
      const rotate = refreshCodeRef.current.style.transform
      const angle = rotate ? parseInt(rotate.split('(')[1].split('deg')[0]) : 0

      refreshCodeRef.current.style.transform =
        'rotate(' + (angle + 360) + 'deg)'
    }
  }

  useEffect(() => {
    getValidateCode()
  }, [])

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const res = await login({
        userName: values.userName,
        password: values.password,
        captcha: values.validateCode,
        codeKey: storage.get('validateImgKey') ?? ''
      })
      // setError(res.error)
      // setSuccess(res.success)
      // if (res.success) {
      //   console.log(res.data)
      // }
      console.log(res)

      if (res.code === 0) {
        console.log(res.data)
        console.log(res.data?.userInfo)
        storage.set('userInfo', res.data?.userInfo)
        setCookie('clientToken', res.data?.token)
        router.push('/')
      } else {
        setError(res.msg?.split(';')[0])
        getValidateCode()
      }
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Welcome to my blog"
      backButtonLabel="没有账号，前往注册"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validateCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <div className="flex gap-x-2">
                    <FormControl>
                      <Input
                        className="w-1/2"
                        {...field}
                        disabled={isPending}
                        type="text"
                        placeholder="****"
                      />
                    </FormControl>
                    <div
                      className="relative h-10 flex-1 overflow-hidden hover:cursor-pointer"
                      onMouseEnter={() => setShowMark(true)}
                      onMouseLeave={() => setShowMark(false)}
                    >
                      {validateImg && (
                        <Image
                          className="h-full w-full"
                          src={validateImg}
                          width="0"
                          height="0"
                          sizes="100vw"
                          alt=""
                        />
                      )}

                      {showMark && (
                        <div
                          className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-gray-400 opacity-50"
                          onClick={throttle(refreshImg, 1000)}
                        >
                          <div
                            className="h-6 w-6 duration-500"
                            ref={refreshCodeRef}
                          >
                            <RefreshCw className="h-6 w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default LoginForm
