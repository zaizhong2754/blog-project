import * as z from 'zod'

export const LoginSchema = z.object({
  userName: z.string().min(1, {
    message: '用户名不能为空'
  }),
  password: z.string().min(1, {
    message: '密码不能为空'
  }),
  validateCode: z.string().min(1, {
    message: '验证码不能为空'
  })
})

export const RegisterSchema = z.object({
  userName: z.string().min(1, {
    message: '用户名不能为空'
  }),
  password: z.string().min(6, {
    message: '密码不少于6个字符'
  }),
  nickName: z.string().min(1, {
    message: '昵称不能为空'
  })
})

export const FriendSchema = z.object({
  name: z.string().min(1, {
    message: '名称不能为空'
  }),
  address: z.string().url({
    message: '网站地址格式错误'
  }),
  logo: z.string().url({
    message: '图片地址格式错误'
  }),
  description: z.string().min(1, {
    message: 'NickName is required'
  })
})
